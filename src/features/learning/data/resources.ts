import type { LocalizedText } from '@/types';
import type { LearningResource, ResourceCategoryFilterId } from '../types';

/**
 * Parent Learning Centre resource dataset (Module 07). The single source of
 * truth for educational resources. Adding a resource = append an entry here; no
 * component or logic changes are required (spec §19).
 *
 * Downloadable files are prepared here as metadata only — the files themselves
 * are managed by the Downloads module (Module 15, spec §14).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LEARNING_RESOURCES: readonly LearningResource[] = [
  {
    id: 'understanding-inherited-disorders',
    slug: 'understanding-inherited-disorders',
    title: L('Understanding Inherited Genetic Disorders', 'موروثی جینیاتی امراض کو سمجھنا'),
    summary: L(
      'A plain-language introduction to what inherited genetic disorders are, how they are passed down, and what families can do.',
      'موروثی جینیاتی امراض کیا ہیں، یہ کیسے منتقل ہوتے ہیں، اور خاندان کیا کر سکتے ہیں، اس کا سادہ زبان میں تعارف۔',
    ),
    category: 'understanding-genetics',
    type: 'booklet',
    featured: true,
    keywords: ['genetics', 'inheritance', 'booklet', 'carrier', 'genes', 'جینیات', 'وراثت'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Our bodies are built using instructions carried in our genes, which we inherit from our parents. An inherited genetic disorder happens when there is a change in one of these instructions that is passed from parent to child. These conditions are not caused by anything a parent did or did not do.',
            'ہمارے جسم اُن ہدایات سے بنتے ہیں جو ہمارے جینز میں ہوتی ہیں، جو ہمیں والدین سے وراثت میں ملتی ہیں۔ موروثی جینیاتی مرض اُس وقت ہوتا ہے جب ان ہدایات میں سے کسی ایک میں تبدیلی والدین سے بچے کو منتقل ہوتی ہے۔ یہ حالتیں کسی والدین کے کسی عمل یا کوتاہی کی وجہ سے نہیں ہوتیں۔',
          ),
        ],
      },
      {
        heading: L('Carriers and inheritance', 'حاملین اور وراثت'),
        paragraphs: [
          L(
            'Many people are healthy "carriers" of a changed gene without knowing it. When both parents carry the same change, there is a chance in each pregnancy that a child may inherit the condition. A simple blood test can identify carriers, and genetic counseling helps families understand what this means.',
            'بہت سے لوگ تبدیل شدہ جین کے صحت مند "حامل" ہوتے ہیں بغیر جانے۔ جب دونوں والدین ایک ہی تبدیلی کے حامل ہوں تو ہر حمل میں امکان ہوتا ہے کہ بچہ یہ حالت وراثت میں پائے۔ ایک سادہ خون کا ٹیسٹ حاملین کی نشاندہی کر سکتا ہے، اور جینیاتی مشاورت خاندانوں کو اس کا مطلب سمجھنے میں مدد دیتی ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Ask about carrier testing before marriage or pregnancy', 'شادی یا حمل سے پہلے حامل ٹیسٹنگ کے بارے میں پوچھیں'),
      L('Keep a simple record of any conditions that run in the family', 'خاندان میں چلنے والی کسی بھی حالت کا سادہ ریکارڈ رکھیں'),
      L('Consider genetic counseling to understand your options', 'اپنے اختیارات سمجھنے کے لیے جینیاتی مشاورت پر غور کریں'),
    ],
    keyTakeaways: [
      L('Inherited disorders are passed through genes, not caused by blame', 'موروثی امراض جینز کے ذریعے منتقل ہوتے ہیں، کسی کے قصور سے نہیں'),
      L('Healthy carriers often have no symptoms', 'صحت مند حاملین میں اکثر کوئی علامت نہیں ہوتی'),
      L('Testing and counseling help families plan with confidence', 'ٹیسٹنگ اور مشاورت خاندانوں کو اعتماد سے منصوبہ بندی میں مدد دیتے ہیں'),
    ],
    relatedResources: ['early-symptoms-guide', 'caregiver-handbook'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis'],
    download: { format: 'pdf' },
  },
  {
    id: 'early-symptoms-guide',
    slug: 'early-symptoms-guide',
    title: L('Recognising Early Symptoms', 'ابتدائی علامات کی پہچان'),
    summary: L(
      'A practical guide to the early signs that are worth noticing, and when to talk to a doctor.',
      'ابتدائی علامات جن پر توجہ دینا اہم ہے، اور ڈاکٹر سے کب بات کرنی چاہیے، اس کی عملی رہنمائی۔',
    ),
    category: 'early-symptoms',
    type: 'guide',
    featured: true,
    keywords: ['symptoms', 'early signs', 'warning signs', 'checklist', 'علامات', 'ابتدائی'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Noticing early signs helps children get support sooner. Every child is different, but some patterns are worth paying attention to, especially if they continue or appear together. Trust your instincts: if something feels off, it is always okay to ask a doctor.',
            'ابتدائی علامات کو محسوس کرنا بچوں کو جلد مدد دلانے میں معاون ہے۔ ہر بچہ مختلف ہوتا ہے، لیکن کچھ نمونے توجہ کے لائق ہیں، خاص طور پر اگر وہ جاری رہیں یا ایک ساتھ ظاہر ہوں۔ اپنی جبلت پر بھروسہ کریں: اگر کچھ ٹھیک نہ لگے تو ڈاکٹر سے پوچھنا ہمیشہ درست ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Watch for ongoing tiredness, paleness, or poor appetite', 'مسلسل تھکن، پیلا پن یا بھوک کی کمی پر نظر رکھیں'),
      L('Note slow growth or delays in reaching milestones', 'سست نشوونما یا سنگِ میل میں تاخیر نوٹ کریں'),
      L('Keep track of repeated infections or unusual symptoms', 'بار بار انفیکشن یا غیر معمولی علامات کا ریکارڈ رکھیں'),
      L('Write down what you notice to share with the doctor', 'جو آپ محسوس کریں اسے لکھ لیں تاکہ ڈاکٹر کے ساتھ شیئر کر سکیں'),
    ],
    keyTakeaways: [
      L('Early recognition leads to earlier support', 'جلد پہچان جلد مدد کی طرف لے جاتی ہے'),
      L('Persistent or combined signs are worth checking', 'مسلسل یا مشترکہ علامات کی جانچ اہم ہے'),
      L('Asking a doctor early is always reasonable', 'ڈاکٹر سے جلد پوچھنا ہمیشہ مناسب ہے'),
    ],
    relatedResources: ['understanding-inherited-disorders', 'hospital-preparation-guide'],
    relatedDiseases: ['beta-thalassemia', 'ehlers-danlos-syndrome'],
    download: { format: 'checklist' },
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
    keywords: ['development', 'milestones', 'growth', 'motor', 'speech', 'نشوونما', 'سنگ میل'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Children develop at their own pace, but milestones give a helpful general guide to what many children do at different ages, such as smiling, sitting, walking, and talking. Milestones are a guide, not a test. If a child reaches them a little earlier or later, that is often completely normal.',
            'بچے اپنی رفتار سے نشوونما پاتے ہیں، لیکن سنگِ میل ایک مفید عمومی رہنمائی دیتے ہیں کہ مختلف عمروں میں بہت سے بچے کیا کرتے ہیں، جیسے مسکرانا، بیٹھنا، چلنا اور بولنا۔ سنگِ میل ایک رہنمائی ہیں، امتحان نہیں۔ اگر بچہ ان تک تھوڑا پہلے یا بعد میں پہنچے تو یہ اکثر بالکل معمول کی بات ہے۔',
          ),
        ],
      },
      {
        heading: L('Areas of development', 'نشوونما کے شعبے'),
        points: [
          L('Movement (motor skills) (from holding the head up to walking and running', 'حرکت (موٹر مہارتیں)) سر سنبھالنے سے لے کر چلنے اور دوڑنے تک'),
          L('Speech and language (from first sounds to words and sentences', 'گفتار اور زبان) پہلی آوازوں سے الفاظ اور جملوں تک'),
          L('Social and emotional (smiling, playing, and connecting with others', 'سماجی اور جذباتی) مسکرانا، کھیلنا، اور دوسروں سے جڑنا'),
        ],
      },
    ],
    practicalGuidance: [
      L('Talk, read, and play with your child every day', 'روزانہ اپنے بچے سے بات کریں، پڑھیں اور کھیلیں'),
      L('Celebrate progress at your child’s own pace', 'اپنے بچے کی اپنی رفتار پر پیش رفت کا جشن منائیں'),
      L('Share any concerns about development with your doctor', 'نشوونما سے متعلق کوئی بھی تشویش ڈاکٹر کے ساتھ شیئر کریں'),
    ],
    keyTakeaways: [
      L('Every child develops at their own pace', 'ہر بچہ اپنی رفتار سے نشوونما پاتا ہے'),
      L('Milestones are a guide, not a strict schedule', 'سنگِ میل ایک رہنمائی ہیں، سخت شیڈول نہیں'),
      L('Share concerns early (support helps most when it starts sooner', 'تشویش جلد بتائیں) مدد جلد شروع ہونے پر سب سے زیادہ فائدہ دیتی ہے'),
    ],
    relatedResources: ['recognising-developmental-delays', 'caregiver-handbook'],
    relatedDiseases: ['lysosomal-storage-disorders'],
    download: { format: 'infographic' },
  },
  {
    id: 'caregiver-handbook',
    slug: 'caregiver-handbook',
    title: L('Caregiver Handbook', 'نگہداشت کنندہ ہینڈ بک'),
    summary: L(
      'A practical companion for day-to-day caregiving, from routines and appointments to looking after yourself.',
      'روزمرہ نگہداشت کے لیے ایک عملی ساتھی، معمولات اور اپائنٹمنٹس سے لے کر اپنا خیال رکھنے تک۔',
    ),
    category: 'caring-for-child',
    type: 'booklet',
    featured: true,
    keywords: ['caregiver', 'handbook', 'daily care', 'routine', 'support', 'نگہداشت', 'ہینڈ بک'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Caring for a child with a health condition can feel like a lot at first. A steady routine, good organisation, and support from others make it more manageable. Remember that you are the expert on your own child, and the care team is there to help you.',
            'کسی صحت کی حالت والے بچے کی دیکھ بھال ابتدا میں بہت زیادہ محسوس ہو سکتی ہے۔ ایک مستقل معمول، اچھی ترتیب، اور دوسروں کی مدد اسے زیادہ قابلِ انتظام بناتی ہے۔ یاد رکھیں کہ آپ اپنے بچے کے سب سے بڑے ماہر ہیں، اور نگہداشت کی ٹیم آپ کی مدد کے لیے موجود ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Keep a folder or phone note with medicines, doses, and appointment dates', 'دواؤں، خوراک اور اپائنٹمنٹ کی تاریخوں کے ساتھ ایک فولڈر یا فون نوٹ رکھیں'),
      L('Prepare questions before each appointment', 'ہر اپائنٹمنٹ سے پہلے سوالات تیار کریں'),
      L('Share caregiving tasks with family where possible', 'جہاں ممکن ہو نگہداشت کے کام خاندان کے ساتھ بانٹیں'),
      L('Take breaks and look after your own health and rest', 'وقفے لیں اور اپنی صحت اور آرام کا خیال رکھیں'),
    ],
    keyTakeaways: [
      L('A simple routine reduces stress for the whole family', 'ایک سادہ معمول پورے خاندان کے لیے دباؤ کم کرتا ہے'),
      L('You are a key part of your child’s care team', 'آپ اپنے بچے کی نگہداشت ٹیم کا اہم حصہ ہیں'),
      L('Caring for yourself helps you care for your child', 'اپنا خیال رکھنا آپ کو اپنے بچے کی دیکھ بھال میں مدد دیتا ہے'),
    ],
    relatedResources: ['feeding-support', 'emotional-wellbeing', 'hospital-preparation-guide'],
    relatedDiseases: ['beta-thalassemia', 'cystic-fibrosis'],
    download: { format: 'pdf' },
  },
  {
    id: 'hospital-preparation-guide',
    slug: 'hospital-preparation-guide',
    title: L('Preparing for Medical Appointments', 'طبی اپائنٹمنٹس کی تیاری'),
    summary: L(
      'How to prepare for hospital visits and appointments so you get the most from your time with the care team.',
      'ہسپتال کے دوروں اور اپائنٹمنٹس کی تیاری کیسے کریں تاکہ نگہداشت ٹیم کے ساتھ وقت سے بھرپور فائدہ اٹھا سکیں۔',
    ),
    category: 'medical-appointments',
    type: 'guide',
    featured: true,
    keywords: ['hospital', 'appointment', 'visit', 'preparation', 'checklist', 'ہسپتال', 'اپائنٹمنٹ'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'A little preparation helps appointments go smoothly and makes sure your questions get answered. Bringing the right information and knowing what to ask helps you and the care team make the best decisions together.',
            'تھوڑی سی تیاری اپائنٹمنٹس کو ہموار بناتی ہے اور یقینی بناتی ہے کہ آپ کے سوالات کے جواب ملیں۔ درست معلومات لانا اور یہ جاننا کہ کیا پوچھنا ہے، آپ اور نگہداشت ٹیم کو مل کر بہترین فیصلے کرنے میں مدد دیتا ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Bring past reports, a list of medicines, and your child’s health record', 'پرانی رپورٹس، دواؤں کی فہرست، اور بچے کا صحت ریکارڈ ساتھ لائیں'),
      L('Write down your questions and concerns beforehand', 'اپنے سوالات اور خدشات پہلے سے لکھ لیں'),
      L('Note down the answers, or bring someone to help you remember', 'جوابات نوٹ کریں، یا یاد رکھنے میں مدد کے لیے کسی کو ساتھ لائیں'),
      L('Ask about next steps and who to contact if you need help', 'اگلے اقدامات اور ضرورت پڑنے پر رابطے کے بارے میں پوچھیں'),
    ],
    keyTakeaways: [
      L('Preparation helps you get answers to your questions', 'تیاری آپ کے سوالات کے جواب پانے میں مدد دیتی ہے'),
      L('Bring records and a written list of questions', 'ریکارڈ اور سوالات کی تحریری فہرست ساتھ لائیں'),
      L('It’s fine to ask for anything to be explained again', 'کسی بھی چیز کو دوبارہ سمجھانے کے لیے کہنا بالکل ٹھیک ہے'),
    ],
    relatedResources: ['caregiver-handbook', 'early-symptoms-guide'],
    relatedDiseases: ['cystic-fibrosis'],
    download: { format: 'checklist' },
  },
  {
    id: 'feeding-support',
    slug: 'feeding-support',
    title: L('Feeding & Nutrition Support', 'خوراک اور غذائیت کی مدد'),
    summary: L(
      'Everyday tips to support healthy eating and good nutrition for your child.',
      'اپنے بچے کے لیے صحت مند کھانے اور اچھی غذائیت میں مدد کے روزمرہ مشورے۔',
    ),
    category: 'caring-for-child',
    type: 'guide',
    keywords: ['feeding', 'nutrition', 'diet', 'eating', 'خوراک', 'غذائیت'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Good nutrition supports growth, energy, and overall health. Some children need extra support with feeding, whether because of appetite, digestion, or a specific condition. A dietitian can give advice tailored to your child’s needs.',
            'اچھی غذائیت نشوونما، توانائی اور مجموعی صحت میں مدد دیتی ہے۔ کچھ بچوں کو خوراک میں اضافی مدد کی ضرورت ہوتی ہے، چاہے بھوک، ہاضمے یا کسی مخصوص حالت کی وجہ سے ہو۔ ایک غذائی ماہر آپ کے بچے کی ضروریات کے مطابق مشورہ دے سکتا ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Offer balanced meals with a variety of foods', 'مختلف قسم کے کھانوں کے ساتھ متوازن غذا فراہم کریں'),
      L('Keep mealtimes calm, regular, and unhurried', 'کھانے کے اوقات پُرسکون، باقاعدہ اور بغیر جلدی کے رکھیں'),
      L('Follow any specific advice from your doctor or dietitian', 'اپنے ڈاکٹر یا غذائی ماہر کی کسی بھی خاص ہدایت پر عمل کریں'),
    ],
    keyTakeaways: [
      L('Balanced, regular meals support growth and energy', 'متوازن، باقاعدہ کھانے نشوونما اور توانائی میں مدد دیتے ہیں'),
      L('Ask a dietitian for advice suited to your child', 'اپنے بچے کے لیے موزوں مشورے کے لیے غذائی ماہر سے پوچھیں'),
    ],
    relatedResources: ['caregiver-handbook', 'development-milestones'],
    relatedDiseases: ['cystic-fibrosis', 'beta-thalassemia'],
    download: { format: 'checklist' },
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
    keywords: ['emotional', 'wellbeing', 'mental health', 'support', 'stress', 'جذباتی', 'سکون'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'A health condition affects feelings as well as the body, for children and for those who care for them. Talking openly, keeping familiar routines, and reaching out for support all help. You do not have to manage everything alone.',
            'صحت کی حالت جسم کے ساتھ ساتھ احساسات کو بھی متاثر کرتی ہے، بچوں کے لیے بھی اور اُن کے لیے بھی جو ان کی دیکھ بھال کرتے ہیں۔ کھل کر بات کرنا، مانوس معمولات برقرار رکھنا، اور مدد کے لیے رابطہ کرنا سب مددگار ہیں۔ آپ کو ہر چیز اکیلے سنبھالنے کی ضرورت نہیں۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Listen to your child and answer questions honestly and gently', 'اپنے بچے کی بات سنیں اور سوالات کا ایمانداری اور نرمی سے جواب دیں'),
      L('Keep routines and small joys part of everyday life', 'معمولات اور چھوٹی خوشیوں کو روزمرہ زندگی کا حصہ رکھیں'),
      L('Reach out to family, friends, or support groups', 'خاندان، دوستوں یا سپورٹ گروپس سے رابطہ کریں'),
      L('Seek professional support if worry or sadness feels overwhelming', 'اگر پریشانی یا اداسی بہت زیادہ محسوس ہو تو پیشہ ورانہ مدد لیں'),
    ],
    keyTakeaways: [
      L('Emotional health matters as much as physical health', 'جذباتی صحت جسمانی صحت جتنی ہی اہم ہے'),
      L('Open, gentle conversation helps children feel secure', 'کھلی، نرم گفتگو بچوں کو محفوظ محسوس کرنے میں مدد دیتی ہے'),
      L('Support for caregivers is a strength, not a weakness', 'نگہداشت کنندگان کے لیے مدد لینا کمزوری نہیں، طاقت ہے'),
    ],
    relatedResources: ['caregiver-handbook', 'school-support'],
    relatedDiseases: ['ehlers-danlos-syndrome'],
    download: { format: 'poster' },
  },
  {
    id: 'school-support',
    slug: 'school-support',
    title: L('School & Education Support', 'اسکول اور تعلیم میں مدد'),
    summary: L(
      'Helping your child take part fully at school, with practical steps for working with teachers.',
      'اپنے بچے کو اسکول میں بھرپور شرکت میں مدد دینا، اساتذہ کے ساتھ کام کرنے کے عملی اقدامات کے ساتھ۔',
    ),
    category: 'school-education',
    type: 'guide',
    keywords: ['school', 'education', 'teachers', 'learning', 'اسکول', 'تعلیم'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'With a little understanding and planning, most children with a health condition take a full part in school life. Sharing helpful information with teachers, and agreeing simple adjustments where needed, helps your child learn and belong.',
            'تھوڑی سی سمجھ بوجھ اور منصوبہ بندی کے ساتھ، صحت کی حالت والے زیادہ تر بچے اسکول کی زندگی میں بھرپور حصہ لیتے ہیں۔ اساتذہ کے ساتھ مفید معلومات بانٹنا، اور ضرورت پڑنے پر سادہ سہولتوں پر اتفاق کرنا، آپ کے بچے کو سیکھنے اور شامل ہونے میں مدد دیتا ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Share key information with teachers at the start of the year', 'سال کے آغاز میں اساتذہ کے ساتھ اہم معلومات بانٹیں'),
      L('Agree simple adjustments, such as rest or medicine times', 'سادہ سہولتوں پر اتفاق کریں، جیسے آرام یا دوا کے اوقات'),
      L('Keep in touch with the school about how your child is doing', 'اپنے بچے کی کارکردگی کے بارے میں اسکول سے رابطہ رکھیں'),
    ],
    keyTakeaways: [
      L('Most children can take a full part in school', 'زیادہ تر بچے اسکول میں بھرپور حصہ لے سکتے ہیں'),
      L('Sharing information with teachers helps your child thrive', 'اساتذہ کے ساتھ معلومات بانٹنا آپ کے بچے کو پھلنے پھولنے میں مدد دیتا ہے'),
    ],
    relatedResources: ['emotional-wellbeing', 'caregiver-handbook'],
    relatedDiseases: ['ehlers-danlos-syndrome'],
    download: { format: 'checklist' },
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
    keywords: ['delay', 'development', 'early intervention', 'support', 'تاخیر', 'نشوونما'],
    version: '1.0',
    publicationDate: '2026-07-01',
    content: [
      {
        paragraphs: [
          L(
            'Sometimes a child takes longer than usual to reach certain milestones. Noticing this early means support can start sooner, which often makes a real difference. A developmental delay is not a judgement; it simply means a child may benefit from extra help in one or more areas.',
            'کبھی کبھی بچہ بعض سنگِ میل تک پہنچنے میں معمول سے زیادہ وقت لیتا ہے۔ اسے جلد محسوس کرنے کا مطلب ہے کہ مدد جلد شروع ہو سکتی ہے، جو اکثر حقیقی فرق ڈالتی ہے۔ نشوونما میں تاخیر کوئی فیصلہ نہیں، اس کا سیدھا مطلب ہے کہ بچے کو ایک یا زیادہ شعبوں میں اضافی مدد سے فائدہ ہو سکتا ہے۔',
          ),
        ],
      },
    ],
    practicalGuidance: [
      L('Compare progress gently with general milestone guides', 'پیش رفت کا عمومی سنگِ میل رہنماؤں سے نرمی سے موازنہ کریں'),
      L('Note if a child loses skills they had already learned', 'نوٹ کریں اگر بچہ پہلے سیکھی ہوئی مہارتیں کھو دے'),
      L('Talk to your doctor about an assessment if you are concerned', 'اگر آپ فکرمند ہوں تو ڈاکٹر سے جانچ کے بارے میں بات کریں'),
    ],
    keyTakeaways: [
      L('Early support often makes the biggest difference', 'جلد مدد اکثر سب سے بڑا فرق ڈالتی ہے'),
      L('A delay means a child may need extra help, not blame', 'تاخیر کا مطلب ہے بچے کو اضافی مدد چاہیے، قصور نہیں'),
      L('Ask your doctor about assessment and early intervention', 'اپنے ڈاکٹر سے جانچ اور ابتدائی مداخلت کے بارے میں پوچھیں'),
    ],
    relatedResources: ['development-milestones', 'early-symptoms-guide'],
    relatedDiseases: ['lysosomal-storage-disorders'],
    download: { format: 'infographic' },
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
