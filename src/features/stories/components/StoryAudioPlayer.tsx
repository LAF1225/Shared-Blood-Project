'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause, AlertCircle } from 'lucide-react';
import { usePlaybackCoordinator } from './PlaybackCoordinator';

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Story audio player (Module 12 §11/§12/§13). Native <audio>, metadata-first:
 * `preload="none"` means nothing downloads until the user presses play (spec
 * §12/§62). It NEVER autoplays (spec §13), supports play/pause/seek, playback
 * speed and volume, is keyboard-operable with screen-reader labels (spec §61),
 * pauses when another story starts (spec §45), and stops on unmount — i.e. when
 * the user navigates away (spec §44). On failure it shows a message and keeps
 * the transcript available (spec §54).
 */
export function StoryAudioPlayer({
  storyId,
  src,
  durationSeconds,
}: {
  storyId: string;
  src: string;
  durationSeconds?: number;
}) {
  const t = useTranslations('Stories');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { activeId, requestPlay, notifyStopped } = usePlaybackCoordinator();

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(durationSeconds ?? 0);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [errored, setErrored] = useState(false);

  // Single-player coordination (spec §45): pause when another story becomes active.
  useEffect(() => {
    if (activeId !== storyId && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [activeId, storyId, playing]);

  // Stop on unmount → audio stops when leaving the page (spec §44).
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || errored) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      notifyStopped(storyId);
    } else {
      requestPlay(storyId); // pauses any other story first (spec §45)
      audio.playbackRate = rate;
      audio.volume = volume;
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setErrored(true));
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const changeRate = (value: number) => {
    setRate(value);
    if (audioRef.current) audioRef.current.playbackRate = value;
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  if (errored) {
    return (
      <div
        role="alert"
        className="mt-4 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-foreground"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
        <span>{t('audio.error')}</span>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-background p-4">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onError={() => setErrored(true)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
          notifyStopped(storyId);
        }}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t('audio.pause') : t('audio.play')}
          className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 ltr:translate-x-0.5 rtl:-translate-x-0.5" aria-hidden="true" />
          )}
        </button>

        <div className="flex flex-1 items-center gap-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label={t('audio.seek')}
            className="h-1.5 w-full cursor-pointer accent-primary"
          />
          <span className="tnum shrink-0 text-xs text-muted-foreground">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t('audio.speed')}</span>
          <select
            value={rate}
            onChange={(event) => changeRate(Number(event.target.value))}
            className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {PLAYBACK_SPEEDS.map((speed) => (
              <option key={speed} value={speed}>
                {speed}×
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t('audio.volume')}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => changeVolume(Number(event.target.value))}
            aria-label={t('audio.volume')}
            className="h-1.5 w-24 cursor-pointer accent-primary"
          />
        </label>
      </div>
    </div>
  );
}
