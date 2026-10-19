import type { LocalizedText } from '@/types';
import type { LearningResource, ResourceCategoryFilterId } from '../types';

/**
 * Parent Learning Centre resource dataset (Module 07). The single source of
 * truth for educational resources. Adding a resource = append an entry here; no
 * component or logic changes are required (spec §19).
 *
 * Each resource's text is drawn from its downloadable file, which is served from
 * `public/resources/<slug>.<ext>` (see `downloads.test.ts`).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LEARNING_RESOURCES: readonly LearningResource[] = [
  {
    id: 'understanding-inherited-disorders',
    slug: 'understanding-inherited-disorders',
    title: L('Understanding Inherited Genetic Disorders', 'موروثی جینیاتی امراض کو سمجھنا'),
    summary: L(
      'A plain-language booklet on what inherited genetic disorders are, how carriers pass them on, and what families can do if they are worried.',
      'سادہ زبان میں ایک کتابچہ: موروثی جینیاتی امراض کیا ہیں، کیریئر انہیں کیسے آگے منتقل کرتے ہیں، اور فکرمند خاندان کیا کر سکتے ہیں۔',
    ),
    category: 'understanding-genetics',
    type: 'booklet',
    featured: true,
    keywords: [
      'genetics',
      'inheritance',
      'booklet',
      'carrier',
      'genes',
      'recessive',
      'dominant',
      'cousin marriage',
      'carrier testing',
      'جینیات',
      'وراثت',
      'کیریئر',
      'کزن میرج',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        heading: L('What is an inherited genetic disorder?', 'موروثی جینیاتی مرض کیا ہے؟'),
        paragraphs: [
          L(
            'Our bodies are built using instructions stored in our DNA. You can think of DNA as a very large instruction book, and genes as smaller sections inside it that tell the body how to grow, develop and work. We usually get one copy of each gene from our mother and one from our father. Sometimes a gene contains a change that affects how the body works. If that change causes a health condition and can be passed from parent to child, it may cause an inherited genetic disorder.',
            'ہمارے جسم اُن ہدایات کے ذریعے بنتے ہیں جو ہمارے ڈی این اے میں محفوظ ہوتی ہیں۔ ڈی این اے کو ہدایات کی ایک بہت بڑی کتاب سمجھیں، اور جینز کو اس کے چھوٹے حصے جو جسم کو بتاتے ہیں کہ کیسے بڑھنا، نشوونما پانا اور کام کرنا ہے۔ ہمیں عام طور پر ہر جین کی ایک کاپی ماں سے اور ایک والد سے ملتی ہے۔ بعض اوقات کسی جین میں ایسی تبدیلی ہوتی ہے جو جسم کے کام کو متاثر کرتی ہے۔ اگر یہ تبدیلی صحت کا مسئلہ پیدا کرے اور والدین سے بچے کو منتقل ہو سکے تو یہ موروثی جینیاتی مرض کا سبب بن سکتی ہے۔',
          ),
          L(
            'Examples include beta thalassemia, cystic fibrosis and lysosomal storage disorders. Having an inherited genetic disorder does not mean that anyone did something wrong. These conditions come from the way genes are naturally passed through families.',
            'اس کی مثالوں میں بیٹا تھیلیسیمیا، سسٹک فائبروسس اور لائسوسومل اسٹوریج ڈس آرڈرز شامل ہیں۔ موروثی جینیاتی مرض کا مطلب یہ نہیں کہ کسی نے کچھ غلط کیا ہے۔ یہ حالتیں اس قدرتی طریقے سے پیدا ہوتی ہیں جس سے جینز خاندانوں میں منتقل ہوتے ہیں۔',
          ),
        ],
      },
      {
        heading: L('What is a carrier?', 'کیریئر کیا ہے؟'),
        paragraphs: [
          L(
            'For many recessive disorders, a person needs to inherit a changed copy of the same gene from both parents to develop the condition. A person with only one changed copy is usually called a carrier. Carriers are often completely healthy and may never know unless they are tested, someone in the family is diagnosed, or they have a child with the condition. This is why a disorder can seem to appear suddenly in a family: the gene change may have been present for generations.',
            'بہت سے ریسیسو (recessive) امراض میں، مرض ہونے کے لیے انسان کو دونوں والدین سے ایک ہی جین کی تبدیل شدہ کاپی ورثے میں ملنی ضروری ہوتی ہے۔ جس شخص میں صرف ایک تبدیل شدہ کاپی ہو اسے عام طور پر کیریئر کہا جاتا ہے۔ کیریئر اکثر مکمل طور پر صحت مند ہوتے ہیں اور شاید کبھی نہ جان پائیں، جب تک ان کا ٹیسٹ نہ ہو، خاندان میں کسی کی تشخیص نہ ہو، یا ان کے ہاں اس مرض والا بچہ پیدا نہ ہو۔ اسی لیے کوئی مرض خاندان میں اچانک ظاہر ہوتا محسوس ہو سکتا ہے: جین کی تبدیلی کئی نسلوں سے موجود ہو سکتی ہے۔',
          ),
        ],
      },
      {
        heading: L('What happens if both parents are carriers?', 'اگر والدین دونوں کیریئر ہوں تو کیا ہوتا ہے؟'),
        paragraphs: [
          L(
            'If both parents carry the same recessive condition, each pregnancy usually has:',
            'اگر والدین دونوں ایک ہی ریسیسو مرض کے کیریئر ہوں تو ہر حمل میں عام طور پر یہ امکانات ہوتے ہیں:',
          ),
        ],
        points: [
          L('a 25% chance that the child has the condition', '25 فیصد امکان کہ بچے کو یہ مرض ہو'),
          L('a 50% chance that the child is a healthy carrier', '50 فیصد امکان کہ بچہ صحت مند کیریئر ہو'),
          L(
            'a 25% chance that the child neither has the condition nor is a carrier',
            '25 فیصد امکان کہ بچے کو نہ مرض ہو اور نہ ہی وہ کیریئر ہو',
          ),
        ],
      },
      {
        paragraphs: [
          L(
            'These chances start again with every pregnancy. It does not mean that exactly one in every four children will have the disorder. Having one affected child does not make the next child automatically affected, and having one healthy child does not remove the risk for the next pregnancy.',
            'یہ امکانات ہر حمل کے ساتھ نئے سرے سے لاگو ہوتے ہیں۔ اس کا مطلب یہ نہیں کہ ہر چار میں سے ایک بچے کو یقینی طور پر یہ مرض ہوگا۔ ایک متاثرہ بچے کا مطلب یہ نہیں کہ اگلا بچہ بھی خود بخود متاثر ہوگا، اور ایک صحت مند بچہ اگلے حمل کا خطرہ ختم نہیں کرتا۔',
          ),
        ],
      },
      {
        heading: L(
          'Are all genetic disorders inherited in the same way?',
          'کیا تمام جینیاتی امراض ایک ہی طریقے سے منتقل ہوتے ہیں؟',
        ),
        points: [
          L(
            'Recessive: a child usually needs a changed gene copy from both parents, for example beta thalassemia and cystic fibrosis.',
            'ریسیسو (مغلوب): بچے کو عام طور پر دونوں والدین سے جین کی تبدیل شدہ کاپی درکار ہوتی ہے، مثلاً بیٹا تھیلیسیمیا اور سسٹک فائبروسس۔',
          ),
          L(
            'Dominant: one changed copy can be enough to cause the disorder, so an affected parent may pass it on. Some forms of Ehlers-Danlos syndrome follow this pattern.',
            'ڈومیننٹ (غالب): ایک تبدیل شدہ کاپی ہی مرض کے لیے کافی ہو سکتی ہے، اس لیے متاثرہ والدین اسے آگے منتقل کر سکتے ہیں۔ ایہلرز ڈینلوس سنڈروم کی کچھ اقسام اسی طرز پر چلتی ہیں۔',
          ),
          L(
            'X-linked: the condition is linked to the X chromosome and can affect boys and girls differently. Haemophilia and Duchenne muscular dystrophy are examples.',
            'ایکس سے منسلک (X-linked): مرض X کروموسوم سے جڑا ہوتا ہے اور لڑکوں اور لڑکیوں کو مختلف طرح متاثر کر سکتا ہے۔ ہیموفیلیا اور ڈوشین مسکولر ڈسٹروفی اس کی مثالیں ہیں۔',
          ),
        ],
      },
      {
        heading: L(
          'What does cousin marriage have to do with inherited disorders?',
          'کزن میرج کا موروثی امراض سے کیا تعلق ہے؟',
        ),
        paragraphs: [
          L(
            'Biological relatives share some of the same genes because they have common ancestors, so they are more likely than unrelated people to carry the same recessive gene change. If they have a child together, there is a greater chance the child inherits the changed gene from both sides of the family.',
            'حیاتیاتی رشتہ داروں کے آباؤ اجداد مشترک ہونے کی وجہ سے ان میں کچھ جینز ایک جیسے ہوتے ہیں، اس لیے غیر رشتہ دار افراد کی نسبت ان میں ایک ہی ریسیسو جین کی تبدیلی پائے جانے کا امکان زیادہ ہوتا ہے۔ اگر ان کے ہاں اولاد ہو تو اس بات کا امکان بڑھ جاتا ہے کہ بچے کو خاندان کے دونوں اطراف سے تبدیل شدہ جین ملے۔',
          ),
          L(
            'Cousin marriage does not create genetic disorders; the gene change was already in the family. Many children of related parents are healthy, and unrelated parents can both be carriers too, especially for conditions that are common in a population, such as beta thalassemia in Pakistan. Testing and family history tell you far more about risk than the relationship alone.',
            'کزن میرج جینیاتی امراض پیدا نہیں کرتی؛ جین کی تبدیلی خاندان میں پہلے سے موجود ہوتی ہے۔ رشتہ دار والدین کے بہت سے بچے صحت مند ہوتے ہیں، اور غیر رشتہ دار والدین بھی دونوں کیریئر ہو سکتے ہیں، خاص طور پر ان امراض میں جو کسی آبادی میں عام ہوں، جیسے پاکستان میں بیٹا تھیلیسیمیا۔ خطرے کو سمجھنے کے لیے ٹیسٹ اور خاندانی طبی تاریخ محض رشتہ داری سے کہیں زیادہ مفید ہیں۔',
          ),
        ],
      },
      {
        heading: L('What types of genetic tests are there?', 'جینیاتی ٹیسٹ کی کون سی اقسام ہیں؟'),
        points: [
          L(
            'Diagnostic testing: used when someone already has symptoms, to find out whether a genetic condition is the cause.',
            'تشخیصی ٹیسٹ: جب کسی میں پہلے سے علامات موجود ہوں، یہ جاننے کے لیے کہ کیا ان کی وجہ کوئی جینیاتی حالت ہے۔',
          ),
          L(
            'Carrier testing: shows whether a healthy person carries a gene change for a recessive disorder.',
            'کیریئر ٹیسٹ: یہ بتاتا ہے کہ کیا کوئی صحت مند شخص کسی ریسیسو مرض کی جین کی تبدیلی کا حامل ہے۔',
          ),
          L(
            'Testing during pregnancy: certain tests can check for specific genetic conditions.',
            'حمل کے دوران ٹیسٹ: بعض ٹیسٹ مخصوص جینیاتی حالتوں کی جانچ کر سکتے ہیں۔',
          ),
          L(
            'Testing before pregnancy: some couples choose carrier testing before having children, particularly when there is a family history.',
            'حمل سے پہلے ٹیسٹ: کچھ جوڑے اولاد سے پہلے کیریئر ٹیسٹ کرواتے ہیں، خاص طور پر جب خاندان میں اس کی تاریخ موجود ہو۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Learn about your family health history', 'اپنے خاندان کی طبی تاریخ کے بارے میں معلومات حاصل کریں'),
      L('Keep medical reports together and safe', 'طبی رپورٹس ایک جگہ محفوظ رکھیں'),
      L('Ask about carrier testing, especially before marriage or pregnancy', 'کیریئر ٹیسٹ کے بارے میں پوچھیں، خاص طور پر شادی یا حمل سے پہلے'),
      L('Speak to a doctor or genetic counsellor', 'ڈاکٹر یا جینیاتی مشیر سے بات کریں'),
    ],
    keyTakeaways: [
      L('Inherited disorders are passed through genes, not caused by blame', 'موروثی امراض جینز کے ذریعے منتقل ہوتے ہیں، کسی کے قصور سے نہیں'),
      L('Healthy carriers often have no symptoms and do not know they are carriers', 'صحت مند کیریئر میں اکثر کوئی علامت نہیں ہوتی اور انہیں علم بھی نہیں ہوتا'),
      L('When both parents are carriers, the chances apply again in every pregnancy', 'جب والدین دونوں کیریئر ہوں تو یہ امکانات ہر حمل میں دوبارہ لاگو ہوتے ہیں'),
      L('Testing and family history explain risk better than relationship alone', 'ٹیسٹ اور خاندانی تاریخ خطرے کو محض رشتہ داری سے بہتر واضح کرتے ہیں'),
    ],
    relatedResources: ['early-symptoms-guide', 'caregiver-handbook'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders'],
    download: {
      format: 'pdf',
      fileUrl: '/resources/understanding-inherited-disorders.pdf',
      sizeLabel: '1.5 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'early-symptoms-guide',
    slug: 'early-symptoms-guide',
    title: L('Recognising Early Symptoms', 'ابتدائی علامات کی پہچان'),
    summary: L(
      'A simple checklist of signs worth discussing with a doctor, and what to tell them when you go.',
      'ان علامات کی ایک سادہ چیک لسٹ جن پر ڈاکٹر سے بات کرنا مفید ہے، اور ملاقات میں انہیں کیا بتانا ہے۔',
    ),
    category: 'early-symptoms',
    type: 'guide',
    featured: true,
    keywords: [
      'symptoms',
      'early signs',
      'warning signs',
      'checklist',
      'paleness',
      'cough',
      'bruising',
      'family history',
      'علامات',
      'ابتدائی',
      'چیک لسٹ',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Most childhood symptoms have ordinary causes, and one symptom does not mean that your child has a genetic disorder. What matters more is a pattern: symptoms that keep returning, become worse over time, affect growth or development, or appear alongside a family history of an inherited condition. You do not need to diagnose your child yourself. This checklist simply highlights signs worth discussing with a healthcare professional.',
            'بچپن کی زیادہ تر علامات کی وجوہات معمولی ہوتی ہیں، اور کسی ایک علامت کا مطلب یہ نہیں کہ آپ کے بچے کو کوئی جینیاتی مرض ہے۔ اہم بات علامات کا مجموعی انداز ہے: ایسی علامات جو بار بار ظاہر ہوں، وقت کے ساتھ بڑھتی جائیں، نشوونما پر اثر ڈالیں، یا کسی موروثی مرض کی خاندانی تاریخ کے ساتھ ظاہر ہوں۔ آپ کو خود اپنے بچے کی تشخیص کرنے کی ضرورت نہیں۔ یہ چیک لسٹ صرف ان علامات کی نشاندہی کرتی ہے جن پر کسی طبی ماہر سے بات کرنا مفید ہے۔',
          ),
        ],
      },
      {
        heading: L('Energy, colour and growth', 'توانائی، رنگت اور نشوونما'),
        points: [
          L('Unusual paleness', 'غیر معمولی پیلا پن'),
          L('Tiredness or weakness that does not improve', 'ایسی تھکاوٹ یا کمزوری جو بہتر نہ ہو'),
          L('Becoming breathless very easily', 'بہت جلد سانس پھول جانا'),
          L('Poor feeding or poor weight gain', 'ٹھیک سے نہ کھانا یا وزن کا مناسب طور پر نہ بڑھنا'),
          L('Growth that seems to have slowed', 'نشوونما سست محسوس ہونا'),
          L('Yellowing of the skin or eyes', 'جلد یا آنکھوں کا پیلا پڑ جانا'),
        ],
      },
      {
        heading: L('Breathing and digestion', 'سانس اور نظامِ ہاضمہ'),
        points: [
          L('A cough that does not go away', 'ایسی کھانسی جو ختم نہ ہو'),
          L('Repeated chest infections', 'سینے کے بار بار انفیکشن'),
          L('Wheezing or breathlessness', 'سانس میں سیٹی جیسی آواز یا سانس پھولنا'),
          L('Poor weight gain despite eating normally', 'معمول کے مطابق کھانے کے باوجود وزن نہ بڑھنا'),
          L('Frequent bulky, greasy or oily stools', 'بار بار بھاری، چکنا یا روغنی پاخانہ'),
        ],
      },
      {
        heading: L('Development and movement', 'نشوونما اور حرکت'),
        points: [
          L('Development appears to slow significantly', 'نشوونما نمایاں طور پر سست دکھائی دے'),
          L('Unusual muscle weakness, or seeming very floppy', 'پٹھوں کی غیر معمولی کمزوری، یا جسم بہت ڈھیلا محسوس ہونا'),
          L('Sitting, standing or walking is significantly delayed', 'بیٹھنے، کھڑے ہونے یا چلنے میں نمایاں تاخیر'),
          L('Losing a skill they could previously do', 'کوئی ایسی مہارت کھو دینا جو پہلے کر سکتا تھا'),
        ],
        paragraphs: [
          L(
            'Loss of previously learned skills is particularly important to mention, for example a child who could walk starts losing that ability, or a child who used words stops. Developmental slowing or regression can occur in some inherited metabolic and lysosomal storage disorders.',
            'پہلے سیکھی ہوئی مہارتوں کا کھو جانا خاص طور پر بتانا ضروری ہے، مثلاً جو بچہ چل سکتا تھا وہ یہ صلاحیت کھونے لگے، یا جو بچہ الفاظ بولتا تھا وہ بولنا چھوڑ دے۔ کچھ موروثی میٹابولک اور لائسوسومل اسٹوریج امراض میں نشوونما سست ہو سکتی ہے یا پیچھے جا سکتی ہے۔',
          ),
        ],
      },
      {
        heading: L('Abdomen, bones and body changes', 'پیٹ، ہڈیاں اور جسمانی تبدیلیاں'),
        points: [
          L('An abdomen that remains unusually enlarged', 'پیٹ کا غیر معمولی طور پر بڑا رہنا'),
          L('Unexplained enlargement around the liver or spleen area', 'جگر یا تلی کے حصے میں بلاوجہ سوجن یا بڑھاؤ'),
          L('Unusual changes in the shape of bones or joints', 'ہڈیوں یا جوڑوں کی ساخت میں غیر معمولی تبدیلیاں'),
          L('Increasing stiffness or difficulty moving', 'بڑھتی ہوئی اکڑن یا حرکت میں دشواری'),
          L('Changes in appearance or body shape that become more noticeable over time', 'ظاہری شکل یا جسمانی ساخت میں ایسی تبدیلیاں جو وقت کے ساتھ زیادہ نمایاں ہوں'),
        ],
      },
      {
        heading: L('Joints, skin and bruising', 'جوڑ، جلد اور نیل پڑنا'),
        points: [
          L('Unusually flexible joints together with pain or repeated injuries', 'جوڑ غیر معمولی طور پر لچکدار ہوں اور ساتھ درد یا بار بار چوٹیں لگیں'),
          L('Joints that repeatedly come partly or completely out of place', 'جوڑ بار بار جزوی یا مکمل طور پر اپنی جگہ سے ہٹ جائیں'),
          L('Frequent sprains after minor activity', 'معمولی سرگرمی کے بعد بھی اکثر موچ آ جانا'),
          L('Skin that seems unusually stretchy or fragile', 'جلد غیر معمولی طور پر کھنچنے والی یا نازک ہو'),
          L('Wounds that heal with unusual scars', 'زخم بھرنے کے بعد غیر معمولی نشان رہ جائیں'),
          L('Frequent or unusually easy bruising', 'اکثر یا بہت آسانی سے نیل پڑ جانا'),
        ],
      },
      {
        heading: L('Family history is an important clue', 'خاندانی تاریخ ایک اہم اشارہ ہے'),
        points: [
          L('Another family member has a diagnosed genetic disorder', 'خاندان کے کسی اور فرد میں جینیاتی مرض کی تشخیص ہوئی ہو'),
          L('One or both parents are known carriers of an inherited condition', 'والدین میں سے ایک یا دونوں کسی موروثی مرض کے معلوم کیریئر ہوں'),
          L('Several relatives have the same unexplained illness', 'کئی رشتہ دار ایک ہی بلاوجہ بیماری کا شکار ہوں'),
          L('Several family members have needed regular blood transfusions', 'خاندان کے کئی افراد کو باقاعدگی سے خون لگوانے کی ضرورت پڑی ہو'),
          L('There have been unexplained deaths of babies or young children in the family', 'خاندان میں شیر خوار یا کم عمر بچوں کی بلاوجہ اموات ہوئی ہوں'),
        ],
        paragraphs: [
          L(
            'Family history does not mean your child has inherited a disorder, but it helps a doctor decide whether further testing is appropriate.',
            'خاندانی تاریخ کا مطلب یہ نہیں کہ آپ کے بچے کو مرض ورثے میں ملا ہے، لیکن اس سے ڈاکٹر کو یہ فیصلہ کرنے میں مدد ملتی ہے کہ مزید ٹیسٹ مناسب ہیں یا نہیں۔',
          ),
        ],
      },
      {
        heading: L('When should I speak to a doctor?', 'مجھے ڈاکٹر سے کب بات کرنی چاہیے؟'),
        points: [
          L('A symptom keeps returning or does not improve', 'کوئی علامت بار بار ظاہر ہو یا بہتر نہ ہو'),
          L('Several unusual symptoms appear together', 'کئی غیر معمولی علامات ایک ساتھ ظاہر ہوں'),
          L('Growth or development seems to be slowing', 'نشوونما سست ہوتی محسوس ہو'),
          L('Symptoms are becoming progressively worse', 'علامات بتدریج بگڑتی جائیں'),
          L('Your child loses a skill they previously had', 'بچہ کوئی ایسی مہارت کھو دے جو پہلے موجود تھی'),
          L('There is a known inherited condition in the family', 'خاندان میں کوئی معلوم موروثی مرض موجود ہو'),
        ],
        paragraphs: [
          L(
            'You do not need to wait until you are certain something is wrong.',
            'آپ کو یہ یقین ہونے تک انتظار کرنے کی ضرورت نہیں کہ واقعی کوئی مسئلہ ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Notice symptoms that persist, repeat or appear together', 'غور کریں: ایسی علامات پر توجہ دیں جو برقرار رہیں، بار بار ظاہر ہوں یا ایک ساتھ آئیں'),
      L('Record what you see, when it started and how often it happens', 'ریکارڈ کریں: جو دیکھیں، وہ کب شروع ہوا اور کتنی بار ہوتا ہے، لکھ لیں'),
      L('Ask a healthcare professional when you are concerned', 'پوچھیں: جب فکر ہو تو کسی طبی ماہر سے مشورہ کریں'),
      L('Bring photos, short videos, growth records and previous reports if you have them', 'اگر ہوں تو تصاویر، مختصر ویڈیوز، نشوونما کا ریکارڈ اور پچھلی رپورٹس ساتھ لائیں'),
    ],
    keyTakeaways: [
      L('One symptom on its own rarely means a genetic disorder', 'اکیلی ایک علامت کا مطلب شاذ و نادر ہی جینیاتی مرض ہوتا ہے'),
      L('Patterns, worsening symptoms and family history are what matter most', 'علامات کا انداز، بگڑتی علامات اور خاندانی تاریخ سب سے اہم ہیں'),
      L('Losing a skill a child already had should always be mentioned', 'بچے کا پہلے سے سیکھی ہوئی مہارت کھو دینا ہمیشہ بتانا چاہیے'),
      L('Recognising an unusual pattern early helps a child get the right assessment sooner', 'غیر معمولی انداز کی جلد پہچان بچے کو جلد درست جانچ دلانے میں مدد دیتی ہے'),
    ],
    relatedResources: ['understanding-inherited-disorders', 'hospital-preparation-guide'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis', 'ehlers-danlos-syndrome'],
    download: {
      format: 'checklist',
      fileUrl: '/resources/early-symptoms-guide.pdf',
      sizeLabel: '1.5 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'development-milestones',
    slug: 'development-milestones',
    title: L('Development Milestones', 'نشوونما کے سنگِ میل'),
    summary: L(
      'A general guide to how children grow and develop, and the milestones many reach along the way.',
      'بچے کیسے بڑھتے اور نشوونما پاتے ہیں، اور راستے میں بہت سے بچے کن سنگِ میل تک پہنچتے ہیں، اس کی عمومی رہنمائی۔',
    ),
    category: 'child-development',
    type: 'development',
    featured: true,
    keywords: ['development', 'milestones', 'growth', 'motor', 'speech', 'infographic', 'نشوونما', 'سنگ میل'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        heading: L('What are milestones?', 'سنگِ میل کیا ہیں؟'),
        paragraphs: [
          L(
            'Development milestones are skills many children reach as they grow. They include movement, communication, play, learning and everyday skills. Children develop at different speeds, so milestones are a guide, not a judgement.',
            'نشوونما کے سنگِ میل وہ مہارتیں ہیں جن تک بہت سے بچے بڑھتے ہوئے پہنچتے ہیں۔ ان میں حرکت، بات چیت، کھیل، سیکھنا اور روزمرہ کی مہارتیں شامل ہیں۔ بچے مختلف رفتار سے نشوونما پاتے ہیں، اس لیے سنگِ میل ایک رہنمائی ہیں، فیصلہ نہیں۔',
          ),
        ],
      },
      {
        heading: L('Milestones many children reach', 'سنگِ میل جن تک بہت سے بچے پہنچتے ہیں'),
        points: [
          L('By 6 months: smiles and laughs, reaches for toys, rolls from tummy to back', '6 ماہ تک: مسکراتا اور ہنستا ہے، کھلونوں کی طرف ہاتھ بڑھاتا ہے، پیٹ کے بل سے کمر کے بل پلٹتا ہے'),
          L('By 1 year: says “mama” or “dada”, plays simple games like pat-a-cake, pulls up to stand', '1 سال تک: “ماما” یا “بابا” کہتا ہے، تالی بجانے جیسے سادہ کھیل کھیلتا ہے، سہارا لے کر کھڑا ہوتا ہے'),
          L('By 2 years: says at least two words together, kicks a ball, follows simple instructions', '2 سال تک: کم از کم دو الفاظ ملا کر بولتا ہے، گیند کو ٹھوکر مارتا ہے، سادہ ہدایات پر عمل کرتا ہے'),
          L('By 3 years: talks in short conversations, joins other children in play, uses a fork', '3 سال تک: مختصر بات چیت کرتا ہے، دوسرے بچوں کے ساتھ کھیلتا ہے، کانٹا استعمال کرتا ہے'),
          L('By 4 years: names some colours, answers simple questions, plays cooperatively', '4 سال تک: کچھ رنگوں کے نام بتاتا ہے، سادہ سوالوں کے جواب دیتا ہے، مل جل کر کھیلتا ہے'),
          L('By 5 years: follows rules in simple games, uses simple rhymes, hops on one foot', '5 سال تک: سادہ کھیلوں کے اصول مانتا ہے، سادہ نظمیں بولتا ہے، ایک پاؤں پر اچھلتا ہے'),
        ],
      },
      {
        heading: L('When to pay closer attention', 'کب زیادہ توجہ دیں'),
        points: [
          L('A child loses skills they had already learned', 'بچہ پہلے سے سیکھی ہوئی مہارتیں کھو دے'),
          L('Progress seems to stop for a long time', 'پیش رفت لمبے عرصے تک رکی ہوئی لگے'),
          L('Concerns appear in several areas at once', 'ایک ساتھ کئی شعبوں میں خدشات ظاہر ہوں'),
          L('You feel something is not right', 'آپ کو محسوس ہو کہ کچھ ٹھیک نہیں'),
        ],
        paragraphs: [
          L(
            'Losing previously learned skills should always be discussed with a doctor.',
            'پہلے سے سیکھی ہوئی مہارتوں کا کھو جانا ہمیشہ ڈاکٹر سے زیرِ بحث لانا چاہیے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Compare progress gently with milestone guides', 'پیش رفت کا سنگِ میل رہنماؤں سے نرمی سے موازنہ کریں'),
      L('Write down what you notice', 'جو محسوس کریں اسے لکھ لیں'),
      L('Talk to your child’s doctor if you are concerned', 'فکر ہو تو اپنے بچے کے ڈاکٹر سے بات کریں'),
      L('Ask whether a developmental assessment is needed', 'پوچھیں کہ کیا نشوونما کی جانچ کی ضرورت ہے'),
      L('Seek early support if it is available', 'اگر دستیاب ہو تو ابتدائی مدد حاصل کریں'),
    ],
    keyTakeaways: [
      L('Every child develops at their own pace', 'ہر بچہ اپنی رفتار سے نشوونما پاتا ہے'),
      L('Milestones are a guide, not a diagnosis', 'سنگِ میل ایک رہنمائی ہیں، تشخیص نہیں'),
      L('Losing a learned skill is always worth raising with a doctor', 'سیکھی ہوئی مہارت کا کھو جانا ہمیشہ ڈاکٹر کو بتانا چاہیے'),
    ],
    relatedResources: ['recognising-developmental-delays', 'caregiver-handbook'],
    relatedDiseases: ['lysosomal-storage-disorders'],
    download: {
      format: 'infographic',
      fileUrl: '/resources/development-milestones.png',
      sizeLabel: '1.8 MB',
      languages: 'en',
    },
  },
  {
    id: 'caregiver-handbook',
    slug: 'caregiver-handbook',
    title: L('Caregiver Learning Booklet', 'نگہداشت کنندگان کے لیے تعلیمی کتابچہ'),
    summary: L(
      'A guide to the four inherited conditions covered on Shared Blood: what each one is, the signs to look for, and how to support your child at home and at school.',
      'شیئرڈ بلڈ پر شامل چار موروثی امراض کی رہنمائی: ہر مرض کیا ہے، کن علامات پر نظر رکھیں، اور گھر اور اسکول میں اپنے بچے کی مدد کیسے کریں۔',
    ),
    category: 'caring-for-child',
    type: 'booklet',
    featured: true,
    keywords: [
      'caregiver',
      'handbook',
      'booklet',
      'learning booklet',
      'daily care',
      'beta thalassemia',
      'cystic fibrosis',
      'lysosomal storage disorders',
      'ehlers-danlos syndrome',
      'نگہداشت',
      'کتابچہ',
      'تھیلیسیمیا',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        heading: L('Beta thalassemia', 'بیٹا تھیلیسیمیا'),
        paragraphs: [
          L(
            'An inherited blood disorder in which the body cannot make enough healthy haemoglobin, the protein in red blood cells that carries oxygen. Children with severe forms develop anaemia and may need lifelong care. It is inherited in an autosomal recessive pattern and is one of the most common inherited disorders in Pakistan. Symptoms often appear from around six months of age.',
            'ایک موروثی خونی مرض جس میں جسم کافی صحت مند ہیموگلوبن نہیں بنا پاتا، جو خون کے سرخ خلیوں میں آکسیجن لے جانے والا پروٹین ہے۔ شدید اقسام والے بچوں میں خون کی کمی ہو جاتی ہے اور انہیں زندگی بھر علاج کی ضرورت پڑ سکتی ہے۔ یہ آٹوسومل ریسیسو طرز پر منتقل ہوتا ہے اور پاکستان کے سب سے عام موروثی امراض میں سے ہے۔ علامات اکثر تقریباً چھ ماہ کی عمر سے ظاہر ہوتی ہیں۔',
          ),
        ],
        points: [
          L('Pale or yellowish skin, weakness and tiredness', 'زرد یا پیلی جلد، کمزوری اور تھکاوٹ'),
          L('Poor weight gain, delayed growth and loss of appetite', 'وزن کا کم بڑھنا، نشوونما میں تاخیر اور بھوک کی کمی'),
          L('Enlarged abdomen and frequent infections', 'پیٹ کا بڑھ جانا اور بار بار انفیکشن'),
        ],
      },
      {
        heading: L('Cystic fibrosis', 'سسٹک فائبروسس'),
        paragraphs: [
          L(
            'An inherited disorder that causes the body to produce thick, sticky mucus that can block the lungs and digestive system, leading to breathing difficulties, infections and problems with growth. It is inherited in an autosomal recessive pattern and is believed to be underdiagnosed in Pakistan because many symptoms resemble common childhood illnesses.',
            'ایک موروثی مرض جس میں جسم گاڑھا اور چپچپا بلغم بناتا ہے جو پھیپھڑوں اور نظامِ ہاضمہ کو بند کر سکتا ہے، جس سے سانس میں دشواری، انفیکشن اور نشوونما کے مسائل پیدا ہوتے ہیں۔ یہ آٹوسومل ریسیسو طرز پر منتقل ہوتا ہے اور خیال ہے کہ پاکستان میں اس کی تشخیص کم ہوتی ہے کیونکہ اس کی بہت سی علامات بچپن کی عام بیماریوں سے ملتی جلتی ہیں۔',
          ),
        ],
        points: [
          L('Frequent coughing, wheezing and recurrent chest infections', 'بار بار کھانسی، سانس میں سیٹی کی آواز اور سینے کے بار بار انفیکشن'),
          L('Difficulty gaining weight despite a good appetite', 'اچھی بھوک کے باوجود وزن بڑھنے میں دشواری'),
          L('Greasy or foul-smelling stools, salty-tasting skin', 'چکنا یا بدبودار پاخانہ، جلد کا ذائقہ نمکین ہونا'),
        ],
      },
      {
        heading: L('Lysosomal storage disorders', 'لائسوسومل اسٹوریج ڈس آرڈرز'),
        paragraphs: [
          L(
            'A group of more than 50 rare inherited diseases in which enzymes that break down fats, sugars and other materials inside cells do not work properly. Substances gradually build up and can damage organs such as the brain, liver, heart, bones and lungs. Many are inherited in an autosomal recessive pattern, so they are more common where marriages between relatives are frequent.',
            'پچاس سے زائد نایاب موروثی امراض کا ایک گروپ جس میں خلیوں کے اندر چربی، شکر اور دیگر مادوں کو توڑنے والے انزائمز ٹھیک سے کام نہیں کرتے۔ یہ مادے آہستہ آہستہ جمع ہو کر دماغ، جگر، دل، ہڈیوں اور پھیپھڑوں جیسے اعضاء کو نقصان پہنچا سکتے ہیں۔ ان میں سے بہت سے آٹوسومل ریسیسو طرز پر منتقل ہوتے ہیں، اس لیے یہ وہاں زیادہ عام ہیں جہاں رشتہ داروں میں شادیاں زیادہ ہوتی ہیں۔',
          ),
        ],
        points: [
          L('Delayed milestones, or difficulty sitting, crawling or walking', 'سنگِ میل میں تاخیر، یا بیٹھنے، رینگنے یا چلنے میں دشواری'),
          L('Enlarged abdomen, liver or spleen, and poor growth', 'پیٹ، جگر یا تلی کا بڑھ جانا، اور کمزور نشوونما'),
          L('Muscle weakness, feeding difficulties, hearing or vision problems', 'پٹھوں کی کمزوری، کھانے میں دشواری، سننے یا دیکھنے کے مسائل'),
        ],
      },
      {
        heading: L('Ehlers-Danlos syndrome', 'ایہلرز ڈینلوس سنڈروم'),
        paragraphs: [
          L(
            'A group of inherited disorders that affect connective tissue, the body’s support system for skin, joints, blood vessels and organs. Changes in genes for collagen make tissues weaker or more elastic than usual. Some forms are inherited in an autosomal dominant pattern and others recessively. Some children show signs in infancy; others are diagnosed much later.',
            'موروثی امراض کا ایک گروپ جو کنیکٹیو ٹشو کو متاثر کرتا ہے، جو جلد، جوڑوں، خون کی نالیوں اور اعضاء کے لیے جسم کا سہارا ہے۔ کولیجن سے متعلق جینز میں تبدیلی ٹشوز کو معمول سے زیادہ کمزور یا لچکدار بنا دیتی ہے۔ کچھ اقسام آٹوسومل ڈومیننٹ اور کچھ ریسیسو طرز پر منتقل ہوتی ہیں۔ کچھ بچوں میں علامات بچپن میں ظاہر ہو جاتی ہیں، جبکہ کچھ کی تشخیص بہت بعد میں ہوتی ہے۔',
          ),
        ],
        points: [
          L('Joint hypermobility, frequent sprains or dislocations', 'جوڑوں کی غیر معمولی لچک، بار بار موچ یا جوڑ اترنا'),
          L('Soft or stretchy skin and frequent bruising', 'نرم یا کھنچنے والی جلد اور بار بار نیل پڑنا'),
          L('Low muscle tone, delayed walking, chronic pain and fatigue', 'پٹھوں میں کمزوری، چلنے میں تاخیر، دائمی درد اور تھکاوٹ'),
        ],
      },
      {
        heading: L('Supporting your child', 'اپنے بچے کی مدد'),
        paragraphs: [
          L(
            'With the right treatment and support, many children with these conditions attend school, take part in activities and pursue their goals. The booklet gives condition-specific advice on emotional health, physical health and school support for each disorder.',
            'درست علاج اور مدد کے ساتھ، ان امراض والے بہت سے بچے اسکول جاتے ہیں، سرگرمیوں میں حصہ لیتے ہیں اور اپنے مقاصد حاصل کرتے ہیں۔ کتابچے میں ہر مرض کے لیے جذباتی صحت، جسمانی صحت اور اسکول میں مدد سے متعلق الگ الگ مشورے دیے گئے ہیں۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Follow treatment plans, transfusion schedules and prescribed medicines carefully', 'علاج کے منصوبوں، خون لگوانے کے شیڈول اور تجویز کردہ دواؤں پر احتیاط سے عمل کریں'),
      L('Attend regular check-ups and keep a record of symptoms', 'باقاعدہ معائنوں پر جائیں اور علامات کا ریکارڈ رکھیں'),
      L('Keep a balanced diet as advised by your doctor', 'ڈاکٹر کے مشورے کے مطابق متوازن غذا رکھیں'),
      L('Encourage hobbies, friendships and talking openly about the condition', 'مشاغل اور دوستیوں کی حوصلہ افزائی کریں اور مرض کے بارے میں کھل کر بات کریں'),
      L('Tell teachers about appointments, possible fatigue and any activity limits', 'اساتذہ کو اپائنٹمنٹس، ممکنہ تھکاوٹ اور سرگرمیوں کی پابندیوں کے بارے میں بتائیں'),
    ],
    keyTakeaways: [
      L('Early diagnosis is extremely important', 'جلد تشخیص انتہائی ضروری ہے'),
      L('Many children do well at school and socially with the right support', 'درست مدد کے ساتھ بہت سے بچے اسکول اور سماجی زندگی میں اچھا کرتے ہیں'),
      L('Emotional support matters as much as physical care', 'جذباتی مدد جسمانی دیکھ بھال جتنی ہی اہم ہے'),
    ],
    relatedResources: ['feeding-support', 'emotional-wellbeing', 'hospital-preparation-guide'],
    relatedDiseases: [
      'beta-thalassemia',
      'cystic-fibrosis',
      'lysosomal-storage-disorders',
      'ehlers-danlos-syndrome',
    ],
    download: {
      format: 'pdf',
      fileUrl: '/resources/caregiver-handbook.pdf',
      sizeLabel: '2.3 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'hospital-preparation-guide',
    slug: 'hospital-preparation-guide',
    title: L('Preparing for Medical Appointments', 'طبی اپائنٹمنٹس کی تیاری'),
    summary: L(
      'A simple checklist for before, during and after appointments, so the care team has what it needs and you leave knowing what happens next.',
      'اپائنٹمنٹ سے پہلے، دوران اور بعد کے لیے ایک سادہ چیک لسٹ، تاکہ طبی ٹیم کے پاس ضروری معلومات ہوں اور آپ جانتے ہوں کہ آگے کیا ہوگا۔',
    ),
    category: 'medical-appointments',
    type: 'guide',
    featured: true,
    keywords: [
      'hospital',
      'appointment',
      'visit',
      'preparation',
      'checklist',
      'medicine list',
      'questions',
      'ہسپتال',
      'اپائنٹمنٹ',
      'ملاقات',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Medical appointments can feel rushed, especially when your child has several symptoms, medicines, test results or specialists involved. You do not need to understand every medical term beforehand. Your job is simply to bring the important information, explain what you have noticed, ask your questions, and make sure you understand what happens next.',
            'طبی اپائنٹمنٹس میں اکثر جلد بازی محسوس ہو سکتی ہے، خاص طور پر جب بچے میں کئی علامات ہوں، کئی دوائیں چل رہی ہوں، ٹیسٹ کے نتائج ہوں یا کئی ماہرین شامل ہوں۔ آپ کے لیے ہر طبی اصطلاح پہلے سے سمجھنا ضروری نہیں۔ آپ کا کام صرف یہ ہے کہ اہم معلومات ساتھ لائیں، جو محسوس کیا ہے وہ بتائیں، اپنے سوالات پوچھیں، اور یقینی بنائیں کہ آپ سمجھ گئے ہیں کہ آگے کیا ہوگا۔',
          ),
        ],
      },
      {
        heading: L('Before the appointment', 'اپائنٹمنٹ سے پہلے'),
        points: [
          L('Know the main reason for the visit and the 2 to 3 most important things to discuss', 'ملاقات کی بنیادی وجہ اور زیرِ بحث لانے کے لیے 2 سے 3 اہم ترین باتیں طے کریں'),
          L('Write down each symptom: when it started, how often it happens, and whether it is getting better or worse', 'ہر علامت لکھیں: کب شروع ہوئی، کتنی بار ہوتی ہے، اور بہتر ہو رہی ہے یا بگڑ رہی ہے'),
          L('Note whether it affects eating, sleeping, walking, playing or school', 'نوٹ کریں کہ کیا یہ کھانے، سونے، چلنے، کھیلنے یا اسکول پر اثر ڈالتی ہے'),
          L('Bring previous test results, genetic reports, specialist letters and health or growth records', 'پچھلے ٹیسٹ کے نتائج، جینیاتی رپورٹس، ماہرین کے خطوط اور صحت یا نشوونما کا ریکارڈ ساتھ لائیں'),
          L('If your child has a genetic diagnosis, bring the actual laboratory report, not only the name of the condition', 'اگر بچے میں جینیاتی مرض کی تشخیص ہو چکی ہے تو صرف مرض کا نام نہیں بلکہ اصل لیبارٹری رپورٹ ساتھ لائیں'),
        ],
      },
      {
        heading: L('Make a medicine list', 'ادویات کی فہرست بنائیں'),
        paragraphs: [
          L(
            'Write down every medicine your child takes, including prescription and non-prescription medicines, vitamins, supplements and herbal remedies. For each one, note the name, the dose, how often it is taken and why. Photos of the packets also help. An up-to-date list helps clinicians check doses, interactions, allergies and treatment changes.',
            'بچے کی تمام ادویات لکھیں، بشمول ڈاکٹر کی تجویز کردہ اور بغیر نسخے کی ادویات، وٹامنز، سپلیمنٹس اور جڑی بوٹیوں کے نسخے۔ ہر دوا کا نام، خوراک، استعمال کا وقفہ اور وجہ لکھیں۔ پیکٹوں کی تصاویر بھی مددگار ہیں۔ تازہ ترین فہرست سے ڈاکٹروں کو خوراک، دواؤں کے باہمی اثرات، الرجی اور علاج میں تبدیلیوں کو جانچنے میں مدد ملتی ہے۔',
          ),
        ],
      },
      {
        heading: L('If a genetic disorder is being investigated', 'اگر جینیاتی مرض کی جانچ ہو رہی ہو'),
        points: [
          L('Does anyone else in the family have the same condition, or similar unexplained symptoms?', 'کیا خاندان میں کسی اور کو یہی مرض یا ایسی ہی بلاوجہ علامات ہیں؟'),
          L('Are any relatives known carriers, or have any had genetic testing?', 'کیا کوئی رشتہ دار معلوم کیریئر ہے، یا کسی نے جینیاتی ٹیسٹ کروایا ہے؟'),
          L('Are the parents biologically related?', 'کیا والدین آپس میں خونی رشتہ دار ہیں؟'),
          L('Have there been unexplained deaths of babies or children, or repeated pregnancy losses?', 'کیا خاندان میں بچوں کی بلاوجہ اموات یا بار بار حمل ضائع ہونے کے واقعات ہوئے ہیں؟'),
        ],
        paragraphs: [
          L(
            'Share what you know and say when you are unsure. You do not need your entire family history.',
            'جو جانتے ہیں وہ بتائیں اور جہاں یقین نہ ہو وہاں کہہ دیں۔ پوری خاندانی تاریخ جاننا ضروری نہیں۔',
          ),
        ],
      },
      {
        heading: L('During the appointment', 'اپائنٹمنٹ کے دوران'),
        paragraphs: [
          L(
            'Start with your main concern, and be specific about changes. Instead of “He has been unwell for a while”, try “He started coughing around six weeks ago. It happens every day, and he has had two chest infections since then.”',
            'سب سے اہم فکر سے آغاز کریں، اور تبدیلیوں کے بارے میں واضح رہیں۔ “وہ کچھ عرصے سے بیمار ہے” کہنے کے بجائے کہیں: “اسے تقریباً چھ ہفتے پہلے کھانسی شروع ہوئی۔ یہ روزانہ ہوتی ہے، اور تب سے اسے دو بار سینے کا انفیکشن ہو چکا ہے۔”',
          ),
        ],
      },
      {
        heading: L('Before you leave', 'جانے سے پہلے'),
        points: [
          L('Are any tests needed, and where and when will they happen?', 'کیا کوئی ٹیسٹ درکار ہیں، اور وہ کہاں اور کب ہوں گے؟'),
          L('How will we receive results, and who do we contact if they do not arrive?', 'نتائج کیسے ملیں گے، اور نہ ملنے پر کس سے رابطہ کریں؟'),
          L('Is another appointment or specialist needed?', 'کیا ایک اور اپائنٹمنٹ یا کسی ماہر کی ضرورت ہے؟'),
          L('For a new medicine: the dose and timing, what to do if a dose is missed, and important side effects', 'نئی دوا کے لیے: خوراک اور وقت، خوراک چھوٹ جانے پر کیا کریں، اور اہم ضمنی اثرات'),
          L('What should improve, how long it may take, and which symptoms need urgent help', 'کیا بہتر ہونا چاہیے، اس میں کتنا وقت لگ سکتا ہے، اور کن علامات پر فوری مدد لینی ہے'),
        ],
      },
      {
        heading: L('After the appointment', 'اپائنٹمنٹ کے بعد'),
        points: [
          L('Write down anything important while you still remember it', 'اہم باتیں فوراً لکھ لیں جب تک یاد ہیں'),
          L('Update the medicine list and keep new reports together', 'ادویات کی فہرست اپ ڈیٹ کریں اور نئی رپورٹس ایک جگہ رکھیں'),
          L('Note the next appointment and complete any tests or referrals', 'اگلی اپائنٹمنٹ نوٹ کریں اور ٹیسٹ یا ریفرل مکمل کریں'),
          L('Contact the clinic if expected results do not arrive', 'متوقع نتائج نہ ملیں تو کلینک سے رابطہ کریں'),
        ],
      },
    ],
    practicalGuidance: [
      L('Appointment details, main concerns and questions written down', 'اپائنٹمنٹ کی تفصیلات، اہم خدشات اور سوالات تحریری شکل میں'),
      L('Medicine list and allergies', 'ادویات کی فہرست اور الرجی کی تفصیلات'),
      L('Previous reports, test results and genetic reports, if relevant', 'پرانی رپورٹس، ٹیسٹ کے نتائج اور جینیاتی رپورٹس، اگر متعلقہ ہوں'),
      L('Family history information, if relevant', 'خاندانی طبی تاریخ کی معلومات، اگر متعلقہ ہو'),
      L('A phone or notebook, and a trusted person if you would like support', 'نوٹس کے لیے فون یا نوٹ بک، اور اگر چاہیں تو کوئی قابلِ اعتماد ساتھی'),
    ],
    keyTakeaways: [
      L('Prepare the important information before the appointment', 'تیاری کریں: اہم معلومات اپائنٹمنٹ سے پہلے تیار کر لیں'),
      L('Ask questions whenever something is unclear', 'پوچھیں: جب بھی کوئی بات واضح نہ ہو تو سوال کریں'),
      L('Confirm what happens next before you leave', 'تصدیق کریں: جانے سے پہلے طے کر لیں کہ آگے کیا ہوگا'),
    ],
    relatedResources: ['caregiver-handbook', 'early-symptoms-guide'],
    relatedDiseases: ['cystic-fibrosis', 'beta-thalassemia'],
    download: {
      format: 'checklist',
      fileUrl: '/resources/hospital-preparation-guide.pdf',
      sizeLabel: '1.5 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'feeding-support',
    slug: 'feeding-support',
    title: L('Feeding & Nutrition Support', 'خوراک اور غذائیت کی مدد'),
    summary: L(
      'Everyday nutrition advice for parents and caregivers, and the signs that a child may need extra nutritional support.',
      'والدین اور دیکھ بھال کرنے والوں کے لیے روزمرہ غذائیت کے مشورے، اور وہ علامات جو بتاتی ہیں کہ بچے کو اضافی غذائی مدد درکار ہو سکتی ہے۔',
    ),
    category: 'caring-for-child',
    type: 'guide',
    keywords: [
      'feeding',
      'nutrition',
      'diet',
      'eating',
      'meals',
      'supplements',
      'breastfeeding',
      'checklist',
      'خوراک',
      'غذائیت',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Good nutrition supports your child’s growth, energy, immunity and development. This is general everyday advice only. It is not a treatment plan and does not replace guidance from your child’s doctor, dietitian or specialist. Some inherited conditions affect appetite, digestion, growth or how the body uses nutrients. If your child has a diagnosed genetic or metabolic condition, always follow their individual medical nutrition plan, even if it differs from the advice below.',
            'اچھی غذائیت آپ کے بچے کی نشوونما، توانائی اور قوتِ مدافعت میں مدد دیتی ہے۔ یہ صرف روزمرہ کے عمومی مشورے ہیں۔ یہ علاج کا منصوبہ نہیں اور بچے کے ڈاکٹر، ماہرِ غذائیت یا ماہرِ طب کی رہنمائی کا متبادل نہیں۔ کچھ موروثی امراض بھوک، ہاضمے، نشوونما یا جسم میں غذائی اجزاء کے استعمال کو متاثر کرتے ہیں۔ اگر آپ کے بچے میں کسی جینیاتی یا میٹابولک مرض کی تشخیص ہو چکی ہے تو ہمیشہ اس کے انفرادی طبی غذائی منصوبے پر عمل کریں، چاہے وہ نیچے دیے گئے مشوروں سے مختلف ہو۔',
          ),
        ],
      },
      {
        heading: L('Build balanced meals', 'متوازن کھانے تیار کریں'),
        points: [
          L('Fruit and vegetables', 'پھل اور سبزیاں'),
          L('Rice, roti, potatoes, oats or other grains', 'چاول، روٹی، آلو، جئی یا دیگر اناج'),
          L('Protein such as eggs, meat, fish, lentils, beans or chickpeas', 'پروٹین جیسے انڈے، گوشت، مچھلی، دالیں، پھلیاں یا چنے'),
          L('Milk, yoghurt, cheese or another suitable alternative', 'دودھ، دہی، پنیر یا کوئی اور مناسب متبادل'),
          L('Water throughout the day', 'دن بھر پانی'),
        ],
      },
      {
        heading: L('Keep a regular routine', 'باقاعدہ معمول رکھیں'),
        points: [
          L('Offer meals and snacks at regular times', 'کھانا اور ہلکی غذا مقررہ اوقات پر دیں'),
          L('Give smaller meals more often if large portions are a struggle', 'اگر بڑی مقدار مشکل ہو تو تھوڑا تھوڑا اور زیادہ بار دیں'),
          L('Allow enough time to eat without rushing', 'جلدی کے بغیر کھانے کے لیے کافی وقت دیں'),
          L('Encourage eating without forcing or pressuring your child', 'زبردستی یا دباؤ کے بغیر کھانے کی ترغیب دیں'),
          L('Keep mealtimes calm and positive when possible', 'جہاں ممکن ہو کھانے کا وقت پُرسکون اور خوشگوار رکھیں'),
        ],
      },
      {
        heading: L('Watch growth and eating patterns', 'نشوونما اور کھانے کے انداز پر نظر رکھیں'),
        paragraphs: [
          L(
            'Tell your child’s healthcare team if you notice:',
            'اگر آپ یہ محسوس کریں تو بچے کی طبی ٹیم کو بتائیں:',
          ),
        ],
        points: [
          L('Poor weight gain or unexplained weight loss', 'وزن کا کم بڑھنا یا بلاوجہ وزن کم ہونا'),
          L('Frequent difficulty finishing meals', 'کھانا ختم کرنے میں بار بار دشواری'),
          L('Ongoing vomiting, diarrhoea or unusual stools', 'مسلسل الٹی، اسہال یا غیر معمولی پاخانہ'),
          L('Eating becoming unusually tiring', 'کھانا غیر معمولی طور پر تھکا دینے والا ہو جانا'),
          L('A major change in appetite, or difficulty chewing or swallowing', 'بھوک میں بڑی تبدیلی، یا چبانے یا نگلنے میں دشواری'),
        ],
      },
      {
        heading: L('Follow condition-specific advice', 'مرض سے متعلق مخصوص مشوروں پر عمل کریں'),
        points: [
          L('Follow the diet recommended by your child’s doctor or dietitian', 'ڈاکٹر یا ماہرِ غذائیت کی تجویز کردہ غذا پر عمل کریں'),
          L('Ask before starting vitamins, iron, supplements or herbal remedies', 'وٹامنز، آئرن، سپلیمنٹس یا جڑی بوٹیوں کے نسخے شروع کرنے سے پہلے پوچھیں'),
          L('Check whether any foods or supplements should be limited', 'معلوم کریں کہ کیا کسی غذا یا سپلیمنٹ کو محدود کرنا ہے'),
          L('Ask whether your child needs extra calories, protein or other nutrients', 'پوچھیں کہ کیا بچے کو اضافی کیلوریز، پروٹین یا دیگر غذائی اجزاء کی ضرورت ہے'),
        ],
        paragraphs: [
          L(
            'Do not give extra supplements simply because a child has a genetic disorder. Nutritional needs can differ greatly between conditions.',
            'صرف اس وجہ سے اضافی سپلیمنٹس نہ دیں کہ بچے کو جینیاتی مرض ہے۔ مختلف امراض میں غذائی ضروریات بہت مختلف ہو سکتی ہیں۔',
          ),
        ],
      },
      {
        heading: L('For babies and young children', 'شیر خوار اور چھوٹے بچوں کے لیے'),
        paragraphs: [
          L(
            'For most infants, current WHO guidance recommends exclusive breastfeeding for the first 6 months when possible, introducing safe, nutritious foods from around 6 months, and continuing breastfeeding alongside other foods up to 2 years or beyond if desired.',
            'زیادہ تر شیر خوار بچوں کے لیے عالمی ادارہ صحت (WHO) کی موجودہ رہنمائی یہ ہے کہ جہاں ممکن ہو پہلے 6 ماہ صرف ماں کا دودھ پلایا جائے، تقریباً 6 ماہ کی عمر سے محفوظ اور غذائیت سے بھرپور غذائیں شروع کی جائیں، اور اگر چاہیں تو دیگر غذاؤں کے ساتھ ماں کا دودھ 2 سال یا اس سے زیادہ عمر تک جاری رکھا جائے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Offer a varied and balanced diet', 'پیش کریں: متنوع اور متوازن غذا دیں'),
      L('Observe changes in eating, digestion, weight or growth', 'مشاہدہ کریں: کھانے، ہاضمے، وزن یا نشوونما میں تبدیلیوں پر نظر رکھیں'),
      L('Ask your healthcare team when something seems unusual or your child may need special nutrition', 'پوچھیں: جب کچھ غیر معمولی لگے یا بچے کو خصوصی غذائیت کی ضرورت ہو تو طبی ٹیم سے مشورہ کریں'),
    ],
    keyTakeaways: [
      L('Balanced, regular meals support growth and energy', 'متوازن اور باقاعدہ کھانے نشوونما اور توانائی میں مدد دیتے ہیں'),
      L('A diagnosed condition’s nutrition plan always comes first', 'تشخیص شدہ مرض کا غذائی منصوبہ ہمیشہ مقدم ہے'),
      L('The goal is not a perfect diet, but a child who is nourished and enjoys food safely', 'مقصد بے عیب غذا نہیں، بلکہ یہ کہ بچے کو مناسب غذائیت ملے اور وہ محفوظ طریقے سے کھانے سے لطف اٹھائے'),
    ],
    relatedResources: ['caregiver-handbook', 'development-milestones'],
    relatedDiseases: ['cystic-fibrosis', 'beta-thalassemia', 'lysosomal-storage-disorders'],
    download: {
      format: 'checklist',
      fileUrl: '/resources/feeding-support.pdf',
      sizeLabel: '1.1 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'emotional-wellbeing',
    slug: 'emotional-wellbeing',
    title: L('Emotional Wellbeing for Families', 'خاندانوں کے لیے جذباتی سکون'),
    summary: L(
      'Caring for the emotional health of your child and yourself while managing a health condition.',
      'صحت کی حالت سنبھالتے ہوئے اپنے بچے اور اپنے جذباتی سکون کا خیال رکھنا۔',
    ),
    category: 'emotional-support',
    type: 'guide',
    keywords: [
      'emotional',
      'wellbeing',
      'mental health',
      'support',
      'stress',
      'caregiver stress',
      'poster',
      'جذباتی',
      'سکون',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        heading: L('Support your child', 'اپنے بچے کا ساتھ دیں'),
        points: [
          L('Listen to their worries and feelings', 'ان کی پریشانیاں اور احساسات سنیں'),
          L('Explain the condition in simple, age-appropriate words', 'مرض کو سادہ اور عمر کے مطابق الفاظ میں سمجھائیں'),
          L('Keep routines as steady as possible', 'معمولات کو جتنا ممکن ہو مستقل رکھیں'),
          L('Praise effort, courage and small wins', 'محنت، ہمت اور چھوٹی کامیابیوں کی تعریف کریں'),
        ],
      },
      {
        heading: L('Look after yourself', 'اپنا خیال رکھیں'),
        points: [
          L('Ask for help when you need it', 'ضرورت ہو تو مدد مانگیں'),
          L('Rest when you can', 'جب ممکن ہو آرام کریں'),
          L('Talk to someone you trust', 'کسی قابلِ اعتماد شخص سے بات کریں'),
          L('Remember that caregiver stress is real', 'یاد رکھیں کہ دیکھ بھال کرنے والوں کا دباؤ حقیقی ہے'),
        ],
      },
      {
        heading: L('Build support around you', 'اپنے گرد مدد کا نظام بنائیں'),
        points: [
          L('Stay in touch with doctors and teachers', 'ڈاکٹروں اور اساتذہ سے رابطے میں رہیں'),
          L('Involve family members who can help', 'خاندان کے ان افراد کو شامل کریں جو مدد کر سکتے ہیں'),
          L('Connect with support groups or trusted communities', 'سپورٹ گروپس یا قابلِ اعتماد برادریوں سے جڑیں'),
          L('Let others know what kind of help is useful', 'دوسروں کو بتائیں کہ کس قسم کی مدد مفید ہے'),
        ],
      },
      {
        heading: L('When to seek extra help', 'اضافی مدد کب لیں'),
        points: [
          L('Sadness or worry that does not improve', 'ایسی اداسی یا پریشانی جو کم نہ ہو'),
          L('Major changes in sleep, eating or behaviour', 'نیند، کھانے یا رویے میں بڑی تبدیلیاں'),
          L('School avoidance or withdrawal from others', 'اسکول سے کترانا یا دوسروں سے الگ تھلگ ہو جانا'),
          L('Stress that feels too heavy to manage alone', 'ایسا دباؤ جو اکیلے سنبھالنا بہت مشکل لگے'),
        ],
        paragraphs: [
          L(
            'If you are worried about your child or yourself, speak to a doctor or mental health professional.',
            'اگر آپ اپنے بچے یا اپنے بارے میں فکرمند ہیں تو کسی ڈاکٹر یا ذہنی صحت کے ماہر سے بات کریں۔',
          ),
        ],
      },
    ],
    keyTakeaways: [
      L('Emotional health matters as much as physical health', 'جذباتی صحت جسمانی صحت جتنی ہی اہم ہے'),
      L('Caring for yourself helps you care for your child', 'اپنا خیال رکھنا آپ کو اپنے بچے کی دیکھ بھال میں مدد دیتا ہے'),
      L('You do not have to manage everything alone', 'آپ کو ہر چیز اکیلے سنبھالنے کی ضرورت نہیں'),
    ],
    relatedResources: ['caregiver-handbook', 'school-support'],
    relatedDiseases: ['ehlers-danlos-syndrome', 'beta-thalassemia'],
    download: {
      format: 'poster',
      fileUrl: '/resources/emotional-wellbeing.png',
      sizeLabel: '1.8 MB',
      languages: 'en',
    },
  },
  {
    id: 'school-support',
    slug: 'school-support',
    title: L('School & Education Support', 'اسکول اور تعلیم میں مدد'),
    summary: L(
      'A simple checklist for working with your child’s school so they can learn, take part and feel included while their health needs are understood.',
      'اپنے بچے کے اسکول کے ساتھ مل کر کام کرنے کی ایک سادہ چیک لسٹ، تاکہ بچہ سیکھ سکے، حصہ لے سکے اور شامل محسوس کرے جبکہ اس کی طبی ضروریات بھی سمجھی جائیں۔',
    ),
    category: 'school-education',
    type: 'guide',
    keywords: [
      'school',
      'education',
      'teachers',
      'learning',
      'school health plan',
      'checklist',
      'اسکول',
      'تعلیم',
      'اساتذہ',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'A health condition can sometimes affect a child’s energy, attendance, movement, concentration or ability to take part in certain activities. Clear communication with the school helps prevent misunderstandings and makes it easier for teachers to give the right support. The aim is not to make your child feel different, but to make sure they can learn, participate and feel included.',
            'طبی مسئلہ بعض اوقات بچے کی توانائی، حاضری، نقل و حرکت، توجہ یا مخصوص سرگرمیوں میں حصہ لینے کی صلاحیت پر اثر ڈال سکتا ہے۔ اسکول سے واضح رابطہ غلط فہمیوں سے بچاتا ہے اور اساتذہ کے لیے درست مدد فراہم کرنا آسان بناتا ہے۔ مقصد بچے کو دوسروں سے مختلف محسوس کروانا نہیں، بلکہ یہ یقینی بنانا ہے کہ وہ سیکھ سکے، حصہ لے سکے اور خود کو شامل محسوس کرے۔',
          ),
        ],
      },
      {
        heading: L('Tell the school what matters', 'اسکول کو اہم معلومات دیں'),
        points: [
          L('Your child’s condition, if diagnosed', 'بچے کی طبی حالت، اگر تشخیص ہو چکی ہو'),
          L('Symptoms that may appear during the school day', 'وہ علامات جو اسکول کے اوقات میں ظاہر ہو سکتی ہیں'),
          L('Medicines or treatments needed at school', 'اسکول میں درکار ادویات یا علاج'),
          L('Activities your child may need to avoid or adapt', 'وہ سرگرمیاں جن سے بچے کو پرہیز کرنا یا جنہیں بدلنا پڑ سکتا ہے'),
          L('Signs that mean your child needs rest, medical help, or for you to be called', 'وہ علامات جن کا مطلب ہے کہ بچے کو آرام، طبی مدد، یا آپ سے رابطے کی ضرورت ہے'),
          L('Who to call in an emergency', 'ہنگامی صورت میں کس سے رابطہ کیا جائے'),
        ],
      },
      {
        heading: L('Agree on practical support', 'عملی مدد پر اتفاق کریں'),
        points: [
          L('Extra rest or short breaks', 'اضافی آرام یا مختصر وقفے'),
          L('Easy access to water, food, toilets or medication', 'پانی، کھانے، بیت الخلا یا دوا تک آسان رسائی'),
          L('Extra time between classes', 'کلاسوں کے درمیان اضافی وقت'),
          L('Adjustments during PE or sports', 'جسمانی تعلیم (PE) یا کھیلوں میں مناسب تبدیلیاں'),
          L('Help catching up after hospital visits, absences or periods of fatigue', 'ہسپتال کے دوروں، غیر حاضری یا تھکاوٹ کے بعد پڑھائی پوری کرنے میں مدد'),
        ],
        paragraphs: [
          L(
            'The aim is to help your child take part safely rather than automatically excluding them from activities.',
            'مقصد بچے کو سرگرمیوں سے خود بخود باہر رکھنا نہیں، بلکہ محفوظ طریقے سے ان میں حصہ لینے میں مدد دینا ہے۔',
          ),
        ],
      },
      {
        heading: L('Make a simple school health plan', 'اسکول کے لیے صحت کا ایک سادہ منصوبہ بنائیں'),
        points: [
          L('What staff should do if symptoms appear', 'علامات ظاہر ہونے پر عملہ کیا کرے'),
          L('Where medicines are kept and who gives or supervises them', 'ادویات کہاں رکھی جاتی ہیں اور کون دیتا یا نگرانی کرتا ہے'),
          L('When parents should be contacted, and what counts as an emergency', 'والدین سے کب رابطہ کیا جائے، اور ہنگامی صورت کسے سمجھا جائے'),
          L('Any instructions from your child’s doctor', 'بچے کے ڈاکٹر کی دی گئی کوئی بھی ہدایات'),
        ],
      },
      {
        heading: L('Keep teachers updated, and build independence', 'اساتذہ کو باخبر رکھیں اور خود مختاری بڑھائیں'),
        paragraphs: [
          L(
            'Tell the school when medicines, symptoms, hospital admissions or activity restrictions change. As your child grows, encourage them to understand their condition in simple terms, tell an adult when they feel unwell, ask for a break or help when needed, and take part in decisions about their school support.',
            'جب ادویات، علامات، ہسپتال میں داخلے یا سرگرمیوں کی پابندیوں میں تبدیلی آئے تو اسکول کو بتائیں۔ جیسے جیسے بچہ بڑا ہو، اسے حوصلہ دیں کہ وہ اپنی حالت کو سادہ الفاظ میں سمجھے، طبیعت خراب ہونے پر کسی بڑے کو بتائے، ضرورت پر وقفہ یا مدد مانگے، اور اسکول میں ملنے والی مدد سے متعلق فیصلوں میں حصہ لے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Inform the school about important medical needs', 'آگاہ کریں: اسکول کو اہم طبی ضروریات کے بارے میں بتائیں'),
      L('Plan simple adjustments that help your child take part safely', 'منصوبہ بنائیں: ایسی سادہ تبدیلیاں طے کریں جو بچے کو محفوظ طریقے سے حصہ لینے میں مدد دیں'),
      L('Review the plan whenever your child’s needs change', 'جائزہ لیں: جب بھی بچے کی ضروریات بدلیں تو منصوبے کا دوبارہ جائزہ لیں'),
    ],
    keyTakeaways: [
      L('Most children can take a full part in school with the right support', 'درست مدد کے ساتھ زیادہ تر بچے اسکول میں بھرپور حصہ لے سکتے ہیں'),
      L('Clear, up-to-date information helps staff respond consistently', 'واضح اور تازہ معلومات عملے کو یکساں ردعمل دینے میں مدد دیتی ہیں'),
      L('The goal is support and inclusion, not treating your child differently', 'مقصد مدد اور شمولیت ہے، بچے کے ساتھ مختلف سلوک نہیں'),
    ],
    relatedResources: ['emotional-wellbeing', 'caregiver-handbook'],
    relatedDiseases: ['ehlers-danlos-syndrome', 'cystic-fibrosis'],
    download: {
      format: 'checklist',
      fileUrl: '/resources/school-support.pdf',
      sizeLabel: '1.1 MB',
      languages: 'bilingual',
    },
  },
  {
    id: 'recognising-developmental-delays',
    slug: 'recognising-developmental-delays',
    title: L('Recognising Developmental Delays', 'نشوونما میں تاخیر کی پہچان'),
    summary: L(
      'How to notice when a child may need extra developmental support, and where to turn.',
      'یہ کیسے پہچانیں کہ بچے کو اضافی نشوونمائی مدد کی ضرورت ہو سکتی ہے، اور کہاں رجوع کریں۔',
    ),
    category: 'child-development',
    type: 'development',
    keywords: [
      'delay',
      'development',
      'early intervention',
      'support',
      'speech',
      'movement',
      'infographic',
      'تاخیر',
      'نشوونما',
    ],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Children develop at different speeds, and sometimes a child takes longer than usual to learn certain skills. A developmental delay is not a judgement; it simply means a child may need extra support. Noticing concerns early can help a child get help sooner.',
            'بچے مختلف رفتار سے نشوونما پاتے ہیں، اور کبھی کبھی کوئی بچہ بعض مہارتیں سیکھنے میں معمول سے زیادہ وقت لیتا ہے۔ نشوونما میں تاخیر کوئی فیصلہ نہیں؛ اس کا سیدھا مطلب ہے کہ بچے کو اضافی مدد کی ضرورت ہو سکتی ہے۔ خدشات کو جلد محسوس کرنا بچے کو جلد مدد دلانے میں معاون ہے۔',
          ),
        ],
      },
      {
        heading: L('Signs worth noticing', 'قابلِ توجہ علامات'),
        points: [
          L('Movement: delayed sitting, standing or walking; seeming unusually floppy or weak; difficulty using hands for simple tasks', 'حرکت: بیٹھنے، کھڑے ہونے یا چلنے میں تاخیر؛ جسم غیر معمولی طور پر ڈھیلا یا کمزور لگنا؛ سادہ کاموں میں ہاتھ استعمال کرنے میں دشواری'),
          L('Speech and communication: very few words for age; not responding consistently to their name; difficulty understanding simple instructions', 'گفتگو اور بات چیت: عمر کے لحاظ سے بہت کم الفاظ؛ اپنا نام سن کر مسلسل ردعمل نہ دینا؛ سادہ ہدایات سمجھنے میں دشواری'),
          L('Social and play: limited eye contact or interaction; little interest in playing with others; not copying simple actions or gestures', 'سماجی رویہ اور کھیل: آنکھ ملانے یا میل جول میں کمی؛ دوسروں کے ساتھ کھیلنے میں کم دلچسپی؛ سادہ حرکات یا اشاروں کی نقل نہ کرنا'),
          L('Learning and daily skills: trouble feeding or chewing for age; difficulty with simple routines; needing much more help than expected', 'سیکھنا اور روزمرہ مہارتیں: عمر کے لحاظ سے کھانے یا چبانے میں مشکل؛ سادہ معمولات میں دشواری؛ توقع سے کہیں زیادہ مدد کی ضرورت'),
        ],
      },
      {
        heading: L('Important warning signs', 'اہم انتباہی علامات'),
        points: [
          L('A child loses skills they had already learned', 'بچہ پہلے سے سیکھی ہوئی مہارتیں کھو دے'),
          L('Progress stops for a long time', 'پیش رفت لمبے عرصے تک رکی رہے'),
          L('Concerns appear in several areas at once', 'ایک ساتھ کئی شعبوں میں خدشات ظاہر ہوں'),
          L('You feel something is not right, even if you are unsure', 'آپ کو محسوس ہو کہ کچھ ٹھیک نہیں، چاہے یقین نہ ہو'),
        ],
        paragraphs: [
          L(
            'Losing previously learned skills should always be discussed with a doctor.',
            'پہلے سے سیکھی ہوئی مہارتوں کا کھو جانا ہمیشہ ڈاکٹر سے زیرِ بحث لانا چاہیے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Compare progress gently with general milestone guides', 'پیش رفت کا عمومی سنگِ میل رہنماؤں سے نرمی سے موازنہ کریں'),
      L('Write down what you notice and when it started', 'جو محسوس کریں اور وہ کب شروع ہوا، لکھ لیں'),
      L('Talk to your child’s doctor about your concerns', 'اپنے خدشات کے بارے میں بچے کے ڈاکٹر سے بات کریں'),
      L('Ask whether a developmental assessment is needed', 'پوچھیں کہ کیا نشوونما کی جانچ کی ضرورت ہے'),
      L('Ask if hearing, vision, speech or movement support may help', 'پوچھیں کہ کیا سماعت، بینائی، گفتگو یا حرکت سے متعلق مدد فائدہ دے سکتی ہے'),
      L('Seek early support services if they are available', 'اگر دستیاب ہوں تو ابتدائی مدد کی خدمات حاصل کریں'),
    ],
    keyTakeaways: [
      L('Early support often makes the biggest difference', 'جلد مدد اکثر سب سے بڑا فرق ڈالتی ہے'),
      L('A delay means a child may need extra help, not blame', 'تاخیر کا مطلب ہے بچے کو اضافی مدد چاہیے، قصور نہیں'),
      L('This resource is for awareness and does not replace medical advice', 'یہ وسیلہ آگاہی کے لیے ہے اور طبی مشورے کا متبادل نہیں'),
    ],
    relatedResources: ['development-milestones', 'early-symptoms-guide'],
    relatedDiseases: ['lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    download: {
      format: 'infographic',
      fileUrl: '/resources/recognising-developmental-delays.png',
      sizeLabel: '1.8 MB',
      languages: 'en',
    },
  },
];

/** Featured resources for the homepage (spec §6). */
export function getFeaturedResources(): LearningResource[] {
  return LEARNING_RESOURCES.filter((resource) => resource.featured);
}

export function getResourceBySlug(slug: string): LearningResource | null {
  return LEARNING_RESOURCES.find((resource) => resource.slug === slug) ?? null;
}

export function getResourcesByType(type: LearningResource['type']): LearningResource[] {
  return LEARNING_RESOURCES.filter((resource) => resource.type === type);
}

/** Resources that have a downloadable file prepared (spec §14). */
export function getDownloadableResources(): LearningResource[] {
  return LEARNING_RESOURCES.filter((resource) => resource.download);
}

/**
 * Related resources (spec §13). Uses the explicit list where present, otherwise
 * auto-generates from shared category metadata. Never includes the resource itself.
 */
export function getRelatedResources(slug: string): LearningResource[] {
  const resource = getResourceBySlug(slug);
  if (!resource) return [];
  const explicit = (resource.relatedResources ?? [])
    .map((relatedSlug) => getResourceBySlug(relatedSlug))
    .filter((item): item is LearningResource => item !== null);
  if (explicit.length > 0) return explicit;
  return LEARNING_RESOURCES.filter(
    (item) => item.slug !== slug && item.category === resource.category,
  ).slice(0, 3);
}

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

/** Reload-free resource search across title, keywords, and category (spec §12). */
export function matchesResourceQuery(
  resource: LearningResource,
  query: string,
): boolean {
  const q = normalize(query);
  if (!q) return true;
  const haystack = [
    resource.title.en,
    resource.title.ur,
    resource.summary.en,
    ...resource.keywords,
  ];
  return haystack.some((term) => normalize(term).includes(q));
}

export function matchesResourceCategory(
  resource: LearningResource,
  category: ResourceCategoryFilterId,
): boolean {
  return category === 'all' || resource.category === category;
}

/** Combined discovery: category filter + text search (spec §12). */
export function queryResources(
  category: ResourceCategoryFilterId,
  query: string,
): LearningResource[] {
  return LEARNING_RESOURCES.filter(
    (resource) =>
      matchesResourceCategory(resource, category) &&
      matchesResourceQuery(resource, query),
  );
}
