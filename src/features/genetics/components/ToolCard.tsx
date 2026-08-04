'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { GeneticsTool } from '../types';
import { resolveGeneticsIcon } from './icons';

/**
 * Tool card (spec §6). Presents a genetics tool with its status and links to the
 * tool's dedicated page. Both current tools and future placeholders route to a
 * page, so a user can always "see what a tool does before opening it" (spec §4).
 */
export function ToolCard({ tool }: { tool: GeneticsTool }) {
  const t = useTranslations('Genetics');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';
  const Icon = resolveGeneticsIcon(tool.icon);
  const isActive = tool.status === 'active';

  return (
    <Card className="flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <Badge tone={isActive ? 'primary' : 'neutral'} className="gap-1">
          {!isActive && <Clock className="h-3 w-3" aria-hidden="true" />}
          {t(isActive ? 'tools.available' : 'tools.comingSoon')}
        </Badge>
      </div>

      <div className="mt-4 flex-1 space-y-2">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          {tool.title[l]}
        </h3>
        <p className="text-sm text-muted-foreground">{tool.summary[l]}</p>
      </div>

      <div className="mt-5">
        <Button asChild variant="ghost" size="sm" className="justify-start px-0">
          <Link href={`${ROUTES.genetics}/${tool.slug}`}>
            {t(isActive ? 'tools.open' : 'tools.preview')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
