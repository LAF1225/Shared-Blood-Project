import { notFound } from 'next/navigation';

/** Any unmatched localized route falls through to the localized 404. */
export default function CatchAllPage() {
  notFound();
}
