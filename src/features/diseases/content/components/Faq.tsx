import { Accordion } from '@/components/ui/Accordion';

export interface FaqVM {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ Framework (spec §8, §16). Adapts the shared Accordion into an
 * expandable question/answer list. Supports unlimited questions.
 */
export function Faq({ items }: { items: FaqVM[] }) {
  return (
    <Accordion
      items={items.map((item) => ({
        id: item.id,
        title: item.question,
        content: <p className="leading-relaxed">{item.answer}</p>,
      }))}
    />
  );
}
