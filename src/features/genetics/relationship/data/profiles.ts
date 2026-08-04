import type { LocalizedText } from '@/types';
import type { RelationshipProfile } from '../types';

/**
 * Relationship profiles (spec §8/§10). Simple-pedigree inbreeding coefficients
 * only — these describe an idealised relationship pattern, not any real family
 * (spec §11). Language is neutral and educational throughout: the Explorer never
 * judges marriage, only explains genetics (spec §24/§25).
 *
 * Coefficients (spec §10): Double First Cousins 1/8, First Cousins 1/16,
 * First Cousins Once Removed 1/32, Second Cousins 1/64, Third Cousins 1/256.
 * "Unrelated" has no simple-pedigree coefficient (spec §10).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const RELATIONSHIP_PROFILES: readonly RelationshipProfile[] = [
  {
    id: 'unrelated',
    label: L('Unrelated / no known recent biological relationship', 'غیر متعلق / کوئی معلوم حالیہ حیاتیاتی رشتہ نہیں'),
    description: L(
      'The two people have no known recent common ancestor in their documented family lines.',
      'دونوں افراد کی دستاویزی خاندانی شاخوں میں کوئی معلوم حالیہ مشترکہ جدِ امجد نہیں ہے۔',
    ),
    sharedAncestorContext: L(
      'Without a known recent shared ancestor, there is no recent family branch through which the same rare recessive variant is especially likely to reach both partners.',
      'کسی معلوم حالیہ مشترکہ جدِ امجد کے بغیر، کوئی ایسی حالیہ خاندانی شاخ نہیں ہوتی جس کے ذریعے وہی نایاب مغلوب ویریئنٹ دونوں فریقوں تک پہنچنے کا خاص امکان ہو۔',
    ),
    pedigreeDefinition: L(
      'No recent common ancestor is shown: the two family lines are drawn separately.',
      'کوئی حالیہ مشترکہ جدِ امجد نہیں دکھایا جاتا: دونوں خاندانی شاخیں الگ الگ بنائی جاتی ہیں۔',
    ),
    coefficient: null,
    recessiveRiskExplanation: L(
      'Two people without a recent shared ancestor are less likely to have inherited the same rare recessive variant from that ancestor, though everyone still carries some recessive variants, and distant or population-level relatedness can still exist.',
      'جن دو افراد کا کوئی حالیہ مشترکہ جدِ امجد نہ ہو، ان کے اُسی نایاب مغلوب ویریئنٹ کو وراثت میں پانے کا امکان کم ہوتا ہے، تاہم ہر شخص کچھ نہ کچھ مغلوب ویریئنٹس رکھتا ہے، اور دور کی یا آبادی کی سطح کی قرابت پھر بھی ہو سکتی ہے۔',
    ),
    references: ['hamamy-2011'],
  },
  {
    id: 'third-cousins',
    label: L('Third cousins', 'تیسرے درجے کے کزن'),
    description: L(
      'Third cousins share a pair of great-great-grandparents.',
      'تیسرے درجے کے کزن ایک جوڑے پڑ پڑ دادا/نانا کو مشترک رکھتے ہیں۔',
    ),
    sharedAncestorContext: L(
      'Because the shared ancestors are four generations back, any variant they carried has passed through many intervening people, making shared inheritance of the same variant relatively unlikely.',
      'چونکہ مشترکہ اجداد چار نسلیں پیچھے ہیں، اُن کا کوئی بھی ویریئنٹ کئی درمیانی افراد سے گزر چکا ہوتا ہے، جس سے اُسی ویریئنٹ کی مشترکہ وراثت نسبتاً کم امکان بن جاتی ہے۔',
    ),
    pedigreeDefinition: L(
      'A shared pair of great-great-grandparents sits at the top, with two branches descending four generations to each partner.',
      'اوپر ایک مشترکہ جوڑا پڑ پڑ دادا/نانا ہوتا ہے، جہاں سے دو شاخیں چار نسلیں نیچے ہر فریق تک اترتی ہیں۔',
    ),
    coefficient: { fraction: '1/256', value: 1 / 256 },
    recessiveRiskExplanation: L(
      'A rare recessive variant carried by the shared great-great-grandparents could, in principle, reach both third cousins, but across four generations this is comparatively uncommon.',
      'مشترکہ پڑ پڑ دادا/نانا کا کوئی نایاب مغلوب ویریئنٹ اصولی طور پر دونوں تیسرے درجے کے کزن تک پہنچ سکتا ہے، مگر چار نسلوں میں یہ نسبتاً کم عام ہے۔',
    ),
    references: ['bittles-black-2010'],
  },
  {
    id: 'second-cousins',
    label: L('Second cousins', 'دوسرے درجے کے کزن'),
    description: L(
      'Second cousins share a pair of great-grandparents.',
      'دوسرے درجے کے کزن ایک جوڑے پڑدادا/پڑنانا کو مشترک رکھتے ہیں۔',
    ),
    sharedAncestorContext: L(
      'The shared ancestors are three generations back, so a variant they carried has more opportunity to reach both partners than for third cousins, but less than for first cousins.',
      'مشترکہ اجداد تین نسلیں پیچھے ہیں، اس لیے اُن کے کسی ویریئنٹ کے دونوں فریقوں تک پہنچنے کا امکان تیسرے درجے کے کزن سے زیادہ مگر پہلے درجے کے کزن سے کم ہوتا ہے۔',
    ),
    pedigreeDefinition: L(
      'A shared pair of great-grandparents sits at the top, with two branches descending three generations to each partner.',
      'اوپر ایک مشترکہ جوڑا پڑدادا/پڑنانا ہوتا ہے، جہاں سے دو شاخیں تین نسلیں نیچے ہر فریق تک اترتی ہیں۔',
    ),
    coefficient: { fraction: '1/64', value: 1 / 64 },
    recessiveRiskExplanation: L(
      'A rare recessive variant in the shared great-grandparents may be inherited by both second cousins, though the chance is lower than for more closely related pairs.',
      'مشترکہ پڑدادا/پڑنانا میں موجود کوئی نایاب مغلوب ویریئنٹ دونوں دوسرے درجے کے کزن کو وراثت میں مل سکتا ہے، اگرچہ یہ امکان زیادہ قریبی رشتوں سے کم ہے۔',
    ),
    references: ['bittles-black-2010'],
  },
  {
    id: 'first-cousins-once-removed',
    label: L('First cousins once removed', 'پہلے درجے کے کزن ایک نسل کے فرق سے'),
    description: L(
      'One person is the first cousin of the other’s parent; their closest shared ancestors are one person’s grandparents and the other’s great-grandparents.',
      'ایک شخص دوسرے کے والد/والدہ کا پہلے درجے کا کزن ہوتا ہے، ان کے قریب ترین مشترکہ اجداد ایک کے دادا/نانا اور دوسرے کے پڑدادا/پڑنانا ہوتے ہیں۔',
    ),
    sharedAncestorContext: L(
      'Because one partner is a generation closer to the shared ancestors than the other, the expected shared-variant opportunity sits between first and second cousins.',
      'چونکہ ایک فریق مشترکہ اجداد سے دوسرے کی نسبت ایک نسل قریب ہوتا ہے، مشترکہ ویریئنٹ کا متوقع امکان پہلے اور دوسرے درجے کے کزن کے درمیان ہوتا ہے۔',
    ),
    pedigreeDefinition: L(
      'The shared ancestors are the grandparents of one partner and the great-grandparents of the other; branches of unequal length descend to each.',
      'مشترکہ اجداد ایک فریق کے دادا/نانا اور دوسرے کے پڑدادا/پڑنانا ہوتے ہیں؛ غیر مساوی طوالت کی شاخیں ہر ایک تک اترتی ہیں۔',
    ),
    coefficient: { fraction: '1/32', value: 1 / 32 },
    recessiveRiskExplanation: L(
      'A rare recessive variant from the shared ancestors could reach both partners through the two branches, with an expected opportunity between that of first and second cousins.',
      'مشترکہ اجداد کا کوئی نایاب مغلوب ویریئنٹ دو شاخوں کے ذریعے دونوں فریقوں تک پہنچ سکتا ہے، جس کا متوقع امکان پہلے اور دوسرے درجے کے کزن کے درمیان ہوتا ہے۔',
    ),
    references: ['bittles-black-2010'],
  },
  {
    id: 'first-cousins',
    label: L('First cousins', 'پہلے درجے کے کزن'),
    description: L(
      'First cousins share a pair of grandparents.',
      'پہلے درجے کے کزن ایک جوڑے دادا/نانا کو مشترک رکھتے ہیں۔',
    ),
    sharedAncestorContext: L(
      'Because the shared grandparents are only two generations back, a variant they carried has a relatively direct route to both partners.',
      'چونکہ مشترکہ دادا/نانا صرف دو نسلیں پیچھے ہیں، اُن کے کسی ویریئنٹ کے دونوں فریقوں تک پہنچنے کا راستہ نسبتاً براہِ راست ہوتا ہے۔',
    ),
    pedigreeDefinition: L(
      'A shared pair of grandparents sits at the top, with two branches descending two generations to each partner.',
      'اوپر ایک مشترکہ جوڑا دادا/نانا ہوتا ہے، جہاں سے دو شاخیں دو نسلیں نیچے ہر فریق تک اترتی ہیں۔',
    ),
    coefficient: { fraction: '1/16', value: 1 / 16 },
    recessiveRiskExplanation: L(
      'If the shared grandparents carried a rare recessive variant, each grandchild has a meaningful chance of inheriting it, so both first cousins may carry the same variant and pass it to a child.',
      'اگر مشترکہ دادا/نانا کوئی نایاب مغلوب ویریئنٹ رکھتے ہوں تو ہر پوتے/نواسے کے اُسے وراثت میں پانے کا قابلِ ذکر امکان ہوتا ہے، چنانچہ دونوں پہلے درجے کے کزن وہی ویریئنٹ رکھ سکتے اور بچے کو منتقل کر سکتے ہیں۔',
    ),
    references: ['bennett-2002', 'hamamy-2011'],
  },
  {
    id: 'double-first-cousins',
    label: L('Double first cousins', 'دوہرے پہلے درجے کے کزن'),
    description: L(
      'Double first cousins arise when a pair of siblings from one family have children with a pair of siblings from another; the children share both sets of grandparents.',
      'دوہرے پہلے درجے کے کزن اُس وقت بنتے ہیں جب ایک خاندان کے دو بہن بھائی دوسرے خاندان کے دو بہن بھائیوں سے رشتہ کرتے ہیں؛ بچے دونوں جوڑے دادا/نانا کو مشترک رکھتے ہیں۔',
    ),
    sharedAncestorContext: L(
      'Because two full sets of grandparents are shared rather than one, there are more recent shared branches through which the same variant could reach both partners.',
      'چونکہ ایک کے بجائے دو مکمل جوڑے دادا/نانا مشترک ہوتے ہیں، اس لیے زیادہ حالیہ مشترکہ شاخیں ہوتی ہیں جن کے ذریعے وہی ویریئنٹ دونوں فریقوں تک پہنچ سکتا ہے۔',
    ),
    pedigreeDefinition: L(
      'Two shared pairs of grandparents sit at the top, with branches descending two generations to each partner through both sides.',
      'اوپر دو مشترکہ جوڑے دادا/نانا ہوتے ہیں، جہاں سے شاخیں دونوں اطراف سے دو نسلیں نیچے ہر فریق تک اترتی ہیں۔',
    ),
    coefficient: { fraction: '1/8', value: 1 / 8 },
    recessiveRiskExplanation: L(
      'With both sets of grandparents shared, there is more opportunity than for ordinary first cousins for the same rare recessive variant to reach both partners.',
      'دونوں جوڑے دادا/نانا مشترک ہونے کے باعث، عام پہلے درجے کے کزن کی نسبت اُسی نایاب مغلوب ویریئنٹ کے دونوں فریقوں تک پہنچنے کا امکان زیادہ ہوتا ہے۔',
    ),
    references: ['bittles-black-2010'],
  },
];
