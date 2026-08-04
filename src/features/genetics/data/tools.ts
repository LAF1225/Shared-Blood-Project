import type { LocalizedText } from '@/types';
import type { GeneticsTool } from '../types';

/**
 * Genetics Explorer tool registry (spec §6). The single source of truth for
 * every educational tool. Two current tools ('active') carry the full §8 page
 * framework; the interactive maths itself is delivered by Modules 09 and 10
 * (spec §18). Future tools ('coming-soon') are placeholders that already own a
 * dedicated page — demonstrating that new tools integrate by appending an entry
 * with no structural change (spec §14/§16).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GENETICS_TOOLS: readonly GeneticsTool[] = [
  {
    id: 'inheritance-calculator',
    slug: 'inheritance-calculator',
    title: L('Inheritance Probability Calculator', 'وراثت امکان کیلکولیٹر'),
    summary: L(
      'Visualise how a recessive condition may pass from parents to children.',
      'دیکھیں کہ کوئی مغلوب حالت والدین سے بچوں کو کیسے منتقل ہو سکتی ہے۔',
    ),
    icon: 'Calculator',
    status: 'active',
    order: 1,
    interactiveModule: '09',
    overview: [
      L(
        'The Inheritance Probability Calculator is an educational tool that illustrates how inherited conditions can be passed from parents to their children.',
        'وراثت امکان کیلکولیٹر ایک تعلیمی آلہ ہے جو ظاہر کرتا ہے کہ موروثی حالتیں والدین سے ان کے بچوں کو کیسے منتقل ہو سکتی ہیں۔',
      ),
    ],
    purpose: [
      L(
        'It helps families and students understand the chances involved when both parents carry the same recessive gene, turning an abstract idea into a simple, visual outcome.',
        'یہ خاندانوں اور طلبہ کو یہ سمجھنے میں مدد دیتا ہے کہ جب دونوں والدین ایک ہی مغلوب جین کے حامل ہوں تو کیا امکانات ہوتے ہیں، ایک تجریدی خیال کو ایک سادہ، بصری نتیجے میں بدل کر۔',
      ),
    ],
    educationalExplanation: [
      {
        heading: L('How inheritance chances work', 'وراثت کے امکانات کیسے کام کرتے ہیں'),
        paragraphs: [
          L(
            'Many inherited conditions are recessive. A child is usually affected only when they inherit two changed copies of a gene, one from each parent. When both parents are carriers, each pregnancy has the same set of chances, no matter what happened before.',
            'بہت سی موروثی حالتیں مغلوب ہوتی ہیں۔ بچہ عموماً تب متاثر ہوتا ہے جب اسے جین کی دو تبدیل شدہ نقول ملیں، ہر والدین سے ایک۔ جب دونوں والدین حامل ہوں تو ہر حمل میں وہی امکانات ہوتے ہیں، چاہے پہلے کچھ بھی ہوا ہو۔',
          ),
        ],
        points: [
          L('A 1 in 4 chance the child is affected.', 'بچے کے متاثر ہونے کا امکان 4 میں سے 1۔'),
          L('A 2 in 4 chance the child is a carrier.', 'بچے کے حامل ہونے کا امکان 4 میں سے 2۔'),
          L('A 1 in 4 chance the child inherits no changed copy.', 'بچے کے کوئی تبدیل شدہ نقل نہ پانے کا امکان 4 میں سے 1۔'),
        ],
      },
    ],
    interpretation: {
      demonstrates: L(
        'The tool shows the general, statistical chances of inheritance when the parents’ carrier status is known.',
        'یہ آلہ والدین کی حاملیت معلوم ہونے پر وراثت کے عمومی، شماریاتی امکانات دکھاتا ہے۔',
      ),
      resultsMean: L(
        'The results are probabilities for each pregnancy, a way to understand risk in general terms.',
        'نتائج ہر حمل کے امکانات ہیں، خطرے کو عمومی انداز میں سمجھنے کا ایک طریقہ۔',
      ),
      resultsDoNotMean: L(
        'They do not diagnose anyone, do not predict what will actually happen in a specific family, and are not a substitute for genetic testing or counselling.',
        'یہ کسی کی تشخیص نہیں کرتے، کسی خاص خاندان میں حقیقتاً کیا ہوگا اس کی پیش گوئی نہیں کرتے، اور جینیاتی جانچ یا مشاورت کا متبادل نہیں ہیں۔',
      ),
    },
    limitations: [
      L(
        'It assumes a simple recessive pattern and known carrier status; real inheritance can be more complex.',
        'یہ ایک سادہ مغلوب طرز اور معلوم حاملیت فرض کرتا ہے؛ حقیقی وراثت زیادہ پیچیدہ ہو سکتی ہے۔',
      ),
      L(
        'It cannot account for new genetic changes, other genes, or environmental factors.',
        'یہ نئی جینیاتی تبدیلیوں، دیگر جینز، یا ماحولیاتی عوامل کو مدنظر نہیں رکھ سکتا۔',
      ),
      L(
        'Only a qualified professional and genetic testing can assess an individual family’s situation.',
        'صرف ایک مستند ماہر اور جینیاتی جانچ ہی کسی انفرادی خاندان کی صورتحال کا جائزہ لے سکتی ہے۔',
      ),
    ],
    relatedResources: ['understanding-inherited-disorders'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis'],
    references: [
      {
        id: 'medlineplus-inheritance',
        title: L('How are genetic conditions inherited?', 'جینیاتی حالتیں کیسے وراثت میں ملتی ہیں؟'),
        publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
        url: 'https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/',
      },
    ],
  },
  {
    id: 'relationship-risk',
    slug: 'relationship-risk',
    title: L('Relationship & Recessive Risk Explorer', 'رشتہ اور ریسیسِو خطرہ ایکسپلورر'),
    summary: L(
      'Understand why shared ancestry can raise the chance that both parents carry the same recessive variant.',
      'سمجھیں کہ مشترکہ نسب کیوں اس امکان کو بڑھا سکتا ہے کہ دونوں والدین ایک ہی مغلوب ویریئنٹ رکھتے ہوں۔',
    ),
    icon: 'Users',
    status: 'active',
    order: 2,
    interactiveModule: '10',
    overview: [
      L(
        'The Relationship & Recessive Risk Explorer is an educational tool that explains the genetics of shared ancestry. It shows why biological relatives can be more likely than unrelated people to inherit the same rare recessive variant from a common ancestor.',
        'رشتہ اور ریسیسِو خطرہ ایکسپلورر ایک تعلیمی آلہ ہے جو مشترکہ نسب کی جینیات کی وضاحت کرتا ہے۔ یہ بتاتا ہے کہ حیاتیاتی رشتہ دار غیر متعلق افراد کی نسبت کسی مشترکہ جدِ امجد سے وہی نایاب مغلوب ویریئنٹ وراثت میں پانے کا زیادہ امکان کیوں رکھ سکتے ہیں۔',
      ),
    ],
    purpose: [
      L(
        'It builds understanding of shared ancestry and recessive inheritance in neutral, educational terms. It does not judge marriage, and it is not an individualized genetic-risk calculator.',
        'یہ مشترکہ نسب اور مغلوب وراثت کی سمجھ غیر جانبدار، تعلیمی انداز میں پیدا کرتا ہے۔ یہ شادی پر کوئی فیصلہ نہیں دیتا، اور یہ کوئی انفرادی جینیاتی خطرہ کیلکولیٹر نہیں ہے۔',
      ),
    ],
    educationalExplanation: [
      {
        heading: L('Shared ancestry and recessive variants', 'مشترکہ نسب اور مغلوب ویریئنٹس'),
        paragraphs: [
          L(
            'A rare recessive variant carried by a shared ancestor can travel down two family branches and reach both partners. If both carry the same recessive variant, their child may inherit two copies. Relationship category explains this general context; it cannot tell any couple whether they actually carry the same variant.',
            'کسی مشترکہ جدِ امجد کا نایاب مغلوب ویریئنٹ دو خاندانی شاخوں سے اتر کر دونوں فریقوں تک پہنچ سکتا ہے۔ اگر دونوں وہی مغلوب ویریئنٹ رکھتے ہوں تو ان کا بچہ دو نقول وراثت میں پا سکتا ہے۔ رشتے کا زمرہ یہ عمومی سیاق بیان کرتا ہے، یہ کسی جوڑے کو یہ نہیں بتا سکتا کہ آیا وہ حقیقتاً وہی ویریئنٹ رکھتے ہیں۔',
          ),
        ],
      },
    ],
    interpretation: {
      demonstrates: L(
        'The tool explains why biological relatedness can increase the chance of shared recessive variants, and what a relationship category means genetically.',
        'یہ آلہ وضاحت کرتا ہے کہ حیاتیاتی قرابت مشترکہ مغلوب ویریئنٹس کے امکان کو کیوں بڑھا سکتی ہے، اور رشتے کا زمرہ جینیاتی طور پر کیا معنی رکھتا ہے۔',
      ),
      resultsMean: L(
        'The profile provides general shared-ancestry context and, where configured, bounded population-level evidence.',
        'پروفائل عمومی مشترکہ نسب کا سیاق اور، جہاں ترتیب دیا گیا ہو، محدود آبادی کی سطح کے شواہد فراہم کرتی ہے۔',
      ),
      resultsDoNotMean: L(
        'It does not calculate an individual couple\'s disease risk, does not infer anyone\'s genetic status, and is not a diagnosis.',
        'یہ کسی انفرادی جوڑے کے مرض کے خطرے کا حساب نہیں لگاتا، کسی کی جینیاتی حیثیت کا اندازہ نہیں لگاتا، اور تشخیص نہیں ہے۔',
      ),
    },
    limitations: [
      L(
        'Relationship category alone cannot determine whether two people carry the same disease-causing variant.',
        'رشتے کا زمرہ اکیلا یہ طے نہیں کر سکتا کہ آیا دو افراد ایک ہی مرض پیدا کرنے والا ویریئنٹ رکھتے ہیں۔',
      ),
      L(
        'Family history, carrier screening, and genetic testing give far more specific information than relationship alone.',
        'خاندانی تاریخ، حاملیت اسکریننگ اور جینیاتی جانچ رشتے کے مقابلے میں کہیں زیادہ مخصوص معلومات دیتی ہیں۔',
      ),
      L(
        'The coefficients shown are for simple pedigrees; a real family pedigree may differ.',
        'دکھائے گئے کوایفشنٹس سادہ شجروں کے لیے ہیں؛ حقیقی خاندانی شجرہ مختلف ہو سکتا ہے۔',
      ),
    ],
    relatedResources: ['understanding-inherited-disorders'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders'],
    references: [
      {
        id: 'hamamy-2011',
        title: L('Consanguineous marriages, pearls and perils', 'قرابتی شادیاں، فوائد اور خطرات'),
        publication: L('Genetics in Medicine', 'جینیٹکس اِن میڈیسن'),
        url: 'https://doi.org/10.1097/GIM.0b013e3182060bb3',
      },
    ],
  },

  {
    id: 'pakistan-map',
    slug: 'pakistan-map',
    title: L('Pakistan Genetic Disorder Evidence Map', 'پاکستان جینیاتی امراض شواہد نقشہ'),
    summary: L(
      'Explore where evidence about inherited genetic disorders has actually been documented across Pakistan, and where the data is still missing.',
      'دریافت کریں کہ پاکستان میں موروثی جینیاتی امراض کے بارے میں شواہد حقیقتاً کہاں دستاویز ہوئے ہیں، اور ڈیٹا اب بھی کہاں غائب ہے۔',
    ),
    icon: 'MapPin',
    status: 'active',
    order: 3,
    interactiveModule: '11',
    overview: [
      L(
        'The Pakistan Genetic Disorder Evidence Map is an interactive visualization of the documented evidence (population studies, screening studies, hospital and patient cohorts, genetic and mutation studies, registries, and case series) associated with inherited genetic disorders in Pakistan.',
        'پاکستان جینیاتی امراض شواہد نقشہ ان دستاویزی شواہد کی ایک انٹرایکٹو تصویری نمائش ہے (آبادی مطالعات، اسکریننگ مطالعات، ہسپتال و مریض کوہورٹس، جینیاتی و میوٹیشن مطالعات، رجسٹریاں، اور کیس سیریز) جو پاکستان میں موروثی جینیاتی امراض سے وابستہ ہیں۔',
      ),
    ],
    purpose: [
      L(
        'It answers "Where in Pakistan has evidence about these genetic disorders actually been documented?", not "Where are these disorders most common?" More evidence in a place often reflects hospitals, universities, laboratories, or research activity, not higher biological prevalence.',
        'یہ اس سوال کا جواب دیتا ہے کہ "پاکستان میں ان جینیاتی امراض کے بارے میں شواہد حقیقتاً کہاں دستاویز ہوئے ہیں؟"، نہ کہ "یہ امراض کہاں سب سے زیادہ عام ہیں؟" کسی جگہ زیادہ شواہد اکثر ہسپتالوں، جامعات، لیبارٹریوں یا تحقیقی سرگرمی کی عکاسی کرتے ہیں، نہ کہ زیادہ حیاتیاتی شرح کی۔',
      ),
    ],
    interpretation: {
      demonstrates: L(
        'The map shows the locations associated with documented evidence and makes gaps in Pakistan\'s genetic-disorder data visible.',
        'نقشہ دستاویزی شواہد سے وابستہ مقامات دکھاتا ہے اور پاکستان کے جینیاتی امراض کے ڈیٹا میں خالیوں کو نمایاں کرتا ہے۔',
      ),
      resultsMean: L(
        'Each marker means "documented evidence is associated with this location," and each evidence record explains what it can and cannot tell you.',
        'ہر مارکر کا مطلب ہے "دستاویزی شواہد اس مقام سے وابستہ ہیں،" اور ہر شواہد ریکارڈ وضاحت کرتا ہے کہ وہ آپ کو کیا بتا سکتا ہے اور کیا نہیں۔',
      ),
      resultsDoNotMean: L(
        'A marker does not mean people living there have the reported prevalence, and evidence or cluster counts are numbers of records, never patient counts, disease severity, or risk.',
        'ایک مارکر کا مطلب یہ نہیں کہ وہاں رہنے والوں میں رپورٹ شدہ شرح ہے، اور شواہد یا کلسٹر کی گنتی ریکارڈز کی تعداد ہے، کبھی مریضوں کی گنتی، مرض کی شدت، یا خطرہ نہیں۔',
      ),
    },
    limitations: [
      L(
        'The map reflects only evidence currently documented in Shared Blood; a blank area does not mean a disorder is absent from Pakistan.',
        'نقشہ صرف ان شواہد کی عکاسی کرتا ہے جو اس وقت شیئرڈ بلڈ میں دستاویز ہیں؛ ایک خالی علاقہ یہ نہیں بتاتا کہ کوئی مرض پاکستان میں موجود نہیں۔',
      ),
      L(
        'Regional estimates come from different samples and methods and must not be compared as if from one national surveillance system.',
        'علاقائی تخمینے مختلف نمونوں اور طریقوں سے آتے ہیں اور انہیں ایسے موازنہ نہیں کیا جانا چاہیے جیسے وہ ایک قومی نگرانی نظام سے ہوں۔',
      ),
      L(
        'Hospital and patient cohorts describe people who reached a service, not the general population of the surrounding area.',
        'ہسپتال اور مریض کوہورٹس ان لوگوں کی وضاحت کرتے ہیں جو کسی خدمت تک پہنچے، نہ کہ گرد و نواح کی عمومی آبادی کی۔',
      ),
    ],
    relatedResources: ['understanding-inherited-disorders'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders'],
    references: [
      {
        id: 'ahmed-2002-nejm',
        title: L(
          'Screening extended families for genetic haemoglobin disorders in Pakistan',
          'پاکستان میں جینیاتی ہیموگلوبن امراض کے لیے وسیع خاندانوں کی اسکریننگ',
        ),
        publication: L('New England Journal of Medicine', 'نیو انگلینڈ جرنل آف میڈیسن'),
        url: 'https://doi.org/10.1056/NEJMsa013234',
      },
    ],
  },

  // ── Punnett Square Visualizer (Module 22 §33) — now an educational entry ───
  {
    id: 'punnett-square',
    slug: 'punnett-square',
    title: L('Punnett Square Visualizer', 'پنیٹ اسکوائر ویژولائزر'),
    summary: L(
      'See how possible allele combinations connect to inheritance probabilities, through the calculator or an educational scenario.',
      'دیکھیں کہ ممکنہ ایلیل امتزاج وراثت کے امکانات سے کیسے جڑتے ہیں، کیلکولیٹر کے ذریعے یا کسی تعلیمی منظرنامے سے۔',
    ),
    icon: 'Grid3x3',
    status: 'active',
    order: 5,
    interactiveModule: '22',
    overview: [
      L(
        'The Punnett Square Visualizer shows how the alleles two parents could pass on combine into possible outcomes, using the grid method taught in classrooms.',
        'پنیٹ اسکوائر ویژولائزر ظاہر کرتا ہے کہ دو والدین جو ایلیلز منتقل کر سکتے ہیں وہ ممکنہ نتائج میں کیسے ملتے ہیں، کلاس رومز میں پڑھائے جانے والے گرڈ طریقے سے۔',
      ),
    ],
    purpose: [
      L(
        'It visualises the same probabilities the Inheritance Probability Calculator produces; it is a picture of those results, not a separate calculation.',
        'یہ انہی امکانات کو تصویری شکل دیتا ہے جو وراثت امکان کیلکولیٹر پیدا کرتا ہے، یہ ان نتائج کی ایک تصویر ہے، کوئی الگ حساب نہیں۔',
      ),
    ],
    interpretation: {
      demonstrates: L(
        'The square shows how possible allele combinations connect to the probability categories for each pregnancy.',
        'یہ خانہ دکھاتا ہے کہ ممکنہ ایلیل امتزاج ہر حمل کے امکانی زمروں سے کیسے جڑتے ہیں۔',
      ),
      resultsMean: L(
        'Each cell is one equally-likely combination; together they explain the overall probabilities.',
        'ہر خانہ ایک یکساں امکان والا امتزاج ہے؛ مل کر وہ مجموعی امکانات کی وضاحت کرتے ہیں۔',
      ),
      resultsDoNotMean: L(
        'It does not predict what will happen for a specific child, and it is not a diagnosis or a substitute for genetic counselling.',
        'یہ پیش گوئی نہیں کرتا کہ کسی مخصوص بچے کے ساتھ کیا ہوگا، اور یہ تشخیص یا جینیاتی مشاورت کا متبادل نہیں ہے۔',
      ),
    },
    limitations: [
      L(
        'It only visualises simple, supported single-gene scenarios; real inheritance can be more complex.',
        'یہ صرف سادہ، معاون واحد جین منظرناموں کو دکھاتا ہے؛ حقیقی وراثت زیادہ پیچیدہ ہو سکتی ہے۔',
      ),
      L(
        'It does not model conditions without a supported genotype pattern, such as hypermobile EDS.',
        'یہ ان حالتوں کا ماڈل نہیں بناتا جن کا کوئی معاون جینوٹائپ طرز نہ ہو، جیسے ہائپرموبائل ای ڈی ایس۔',
      ),
    ],
    relatedResources: ['understanding-inherited-disorders'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis'],
    references: [
      {
        id: 'medlineplus-inheritance-patterns',
        title: L('Inheritance patterns', 'وراثت کے طرز'),
        publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
        url: 'https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/',
      },
    ],
  },
  // ── Disease-Linked DNA Explorer (Module 22 §6–§21) ────────────────────────
  {
    id: 'dna-explorer',
    slug: 'dna-explorer',
    title: L('Disease-Linked DNA Explorer', 'مرض سے منسلک ڈی این اے ایکسپلورر'),
    summary: L(
      'See how a change connected to a specific gene can affect biological function and contribute to a genetic disorder.',
      'دیکھیں کہ کسی مخصوص جین سے وابستہ تبدیلی کیسے حیاتیاتی فعل کو متاثر کر کے کسی جینیاتی مرض میں حصہ ڈال سکتی ہے۔',
    ),
    icon: 'Microscope',
    status: 'active',
    order: 6,
    interactiveModule: '22',
    overview: [
      L(
        'The Disease-Linked DNA Explorer connects an inherited disorder to the gene involved, the kind of genetic change, the biological function affected, and how that contributes to the condition.',
        'مرض سے منسلک ڈی این اے ایکسپلورر کسی موروثی مرض کو متعلقہ جین، جینیاتی تبدیلی کی نوعیت، متاثرہ حیاتیاتی فعل، اور یہ کیسے مرض میں حصہ ڈالتا ہے سے جوڑتا ہے۔',
      ),
    ],
    purpose: [
      L(
        'It turns an abstract idea ("a change in a gene") into a clear, disease-specific story, without diagnosing anyone or predicting any individual outcome.',
        'یہ ایک تجریدی خیال ("جین میں تبدیلی") کو ایک واضح، مرض کے لحاظ سے مخصوص کہانی میں بدل دیتا ہے، بغیر کسی کی تشخیص یا کسی انفرادی نتیجے کی پیش گوئی کے۔',
      ),
    ],
    interpretation: {
      demonstrates: L(
        'The tool shows a disease-specific path from a gene, through a genetic change and a functional effect, to how a condition can arise.',
        'یہ آلہ ایک جین سے، جینیاتی تبدیلی اور فعلی اثر کے ذریعے، اس تک کہ کوئی حالت کیسے پیدا ہو سکتی ہے، ایک مرض کے لحاظ سے مخصوص راستہ دکھاتا ہے۔',
      ),
      resultsMean: L(
        'Each step is general educational biology for that condition, for example, one gene’s role and the effect of a change.',
        'ہر قدم اس حالت کے لیے عمومی تعلیمی حیاتیات ہے، مثلاً، ایک جین کا کردار اور کسی تبدیلی کا اثر۔',
      ),
      resultsDoNotMean: L(
        'It does not test DNA, interpret variants, diagnose anyone, or predict any individual’s health.',
        'یہ ڈی این اے کی جانچ نہیں کرتا، ویریئنٹس کی تشریح نہیں کرتا، کسی کی تشخیص نہیں کرتا، اور کسی فرد کی صحت کی پیش گوئی نہیں کرتا۔',
      ),
    },
    limitations: [
      L(
        'It uses simplified, example explanations, many different changes in a gene can occur, and no single variant is shown as "the" cause.',
        'یہ سادہ، مثالی وضاحتیں استعمال کرتا ہے، کسی جین میں کئی مختلف تبدیلیاں ہو سکتی ہیں، اور کوئی واحد ویریئنٹ "وجہ" کے طور پر نہیں دکھایا جاتا۔',
      ),
      L(
        'Where the genetic cause is not yet established (such as hypermobile EDS) the tool shows an educational limitation instead of a mechanism.',
        'جہاں جینیاتی وجہ ابھی طے نہیں (جیسے ہائپرموبائل ای ڈی ایس) وہاں آلہ میکانزم کے بجائے ایک تعلیمی حد دکھاتا ہے۔',
      ),
    ],
    relatedResources: ['understanding-inherited-disorders'],
    relatedDiseases: [
      'beta-thalassemia',
      'cystic-fibrosis',
      'lysosomal-storage-disorders',
      'ehlers-danlos-syndrome',
    ],
    references: [
      {
        id: 'medlineplus-gene',
        title: L('What is a gene?', 'جین کیا ہے؟'),
        publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
        url: 'https://medlineplus.gov/genetics/understanding/basics/gene/',
      },
    ],
  },
  // ── Family Tree Explorer — RETIRED (Module 23 §6–§12) ─────────────────────
  // The standalone Family Tree placeholder was retired: its purpose (shared
  // ancestry / how a condition appears across generations) is covered by the
  // Relationship & Recessive Risk Explorer and its pedigree, and Module 22
  // prohibits a second pedigree system. The registry entry has been removed, so
  // it no longer appears in Explorer cards, the coming-soon list, or [slug]
  // static params; /[locale]/genetics/family-tree-explorer now falls through the
  // existing unknown-tool behaviour (notFound). See src/audit/cleanup.ts.
];

/** Ordered tools for display (spec §6). */
export function getGeneticsTools(): GeneticsTool[] {
  return [...GENETICS_TOOLS].sort((a, b) => a.order - b.order);
}

export function getActiveTools(): GeneticsTool[] {
  return getGeneticsTools().filter((tool) => tool.status === 'active');
}

export function getComingSoonTools(): GeneticsTool[] {
  return getGeneticsTools().filter((tool) => tool.status === 'coming-soon');
}

export function getGeneticsToolBySlug(slug: string): GeneticsTool | null {
  return GENETICS_TOOLS.find((tool) => tool.slug === slug) ?? null;
}
