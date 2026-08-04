import type { LocalizedText } from '@/types';
import type {
  DiseaseMolecularRecord,
  DnaMechanismStep,
  MolecularMechanism,
} from '../types';

/**
 * Disease-specific molecular education records (Module 22 §11–§15).
 *
 * Each mechanism is authored disease-specifically — there is NO shared
 * "mutation → broken protein → disease" template (§11). Beta-thalassemia and
 * cystic fibrosis have one supported mechanism each; LSD and EDS are
 * subtype-driven; hypermobile EDS is a limitation state, never a fabricated
 * mechanism (§15). Language is educational and non-diagnostic; specific variants
 * are always labelled as examples, never "the" mutation (§12/§13).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/** Build the five ordered content steps of a supported mechanism (§8). */
function steps(parts: {
  geneContext: [string, string];
  geneticChange: [string, string];
  geneticChangeCallout: [string, string];
  functionEffect: [string, string];
  consequence: [string, string];
  connection: [string, string];
}): DnaMechanismStep[] {
  return [
    { id: 'GENE_CONTEXT', visualType: 'GENE_CONTEXT', title: L('Gene context', 'جین کا سیاق'), explanation: L(...parts.geneContext) },
    {
      id: 'GENETIC_CHANGE',
      visualType: 'GENETIC_CHANGE',
      title: L('The genetic change', 'جینیاتی تبدیلی'),
      explanation: L(...parts.geneticChange),
      callout: L(...parts.geneticChangeCallout),
    },
    { id: 'FUNCTION_EFFECT', visualType: 'FUNCTION', title: L('Effect on function', 'فعل پر اثر'), explanation: L(...parts.functionEffect) },
    { id: 'BIOLOGICAL_CONSEQUENCE', visualType: 'CELLULAR_CONSEQUENCE', title: L('Biological consequence', 'حیاتیاتی نتیجہ'), explanation: L(...parts.consequence) },
    { id: 'DISEASE_CONNECTION', visualType: 'DISEASE_CONNECTION', title: L('Connection to the condition', 'مرض سے تعلق'), explanation: L(...parts.connection) },
  ];
}

/** Shared "this is one example" callout (§12/§13). */
const EXAMPLE_CALLOUT: [string, string] = [
  'Many different changes in this gene can occur; this describes the general effect, not one single variant that causes every case.',
  'اس جین میں کئی مختلف تبدیلیاں ہو سکتی ہیں، یہ عمومی اثر بیان کرتا ہے، کوئی ایک واحد ویریئنٹ نہیں جو ہر کیس کا سبب ہو۔',
];

// ── Beta-thalassemia (§12) — HBB ────────────────────────────────────────────
const betaThalassemia: DiseaseMolecularRecord = {
  diseaseId: 'beta-thalassemia',
  supportState: 'SUPPORTED',
  requiresSubtype: false,
  overview: L(
    'How a change connected to the HBB gene can affect haemoglobin and contribute to beta thalassemia.',
    'ایچ بی بی جین سے وابستہ تبدیلی کیسے ہیموگلوبن کو متاثر کر کے بیٹا تھیلیسیمیا میں حصہ ڈال سکتی ہے۔',
  ),
  mechanisms: [
    {
      id: 'hbb',
      supportState: 'SUPPORTED',
      label: L('HBB gene context', 'ایچ بی بی جین کا سیاق'),
      geneSymbol: 'HBB',
      geneName: L('beta-globin', 'بیٹا-گلوبن'),
      references: ['medlineplus-hbb', 'medlineplus-beta-thalassemia'],
      steps: steps({
        geneContext: [
          'The HBB gene carries the instructions for making beta-globin, one of the protein building blocks of haemoglobin, the molecule red blood cells use to carry oxygen.',
          'ایچ بی بی جین بیٹا-گلوبن بنانے کی ہدایات رکھتا ہے، جو ہیموگلوبن کے پروٹین اجزاء میں سے ایک ہے، وہ مالیکیول جو خون کے سرخ خلیے آکسیجن لے جانے کے لیے استعمال کرتے ہیں۔',
        ],
        geneticChange: [
          'In beta thalassemia, a change in the HBB gene reduces how much working beta-globin the body can make.',
          'بیٹا تھیلیسیمیا میں، ایچ بی بی جین میں تبدیلی اس مقدار کو کم کر دیتی ہے جتنا کارآمد بیٹا-گلوبن جسم بنا سکتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'With less working beta-globin, the body produces reduced or absent beta-globin chains.',
          'کم کارآمد بیٹا-گلوبن کے ساتھ، جسم کم یا غیر موجود بیٹا-گلوبن زنجیریں بناتا ہے۔',
        ],
        consequence: [
          'This creates an imbalance between beta-globin and the other globin chains, which damages developing red blood cells and makes red-cell production less effective.',
          'یہ بیٹا-گلوبن اور دیگر گلوبن زنجیروں کے درمیان عدم توازن پیدا کرتا ہے، جو بنتے ہوئے سرخ خلیوں کو نقصان پہنچاتا ہے اور سرخ خلیوں کی پیداوار کو کم مؤثر بناتا ہے۔',
        ],
        connection: [
          'Fewer healthy red blood cells means less oxygen is carried around the body, which contributes to anaemia and the other features associated with beta thalassemia.',
          'کم صحت مند سرخ خلیوں کا مطلب ہے کہ جسم میں کم آکسیجن پہنچتی ہے، جو خون کی کمی اور بیٹا تھیلیسیمیا سے وابستہ دیگر علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
  ],
};

// ── Cystic fibrosis (§13) — CFTR ────────────────────────────────────────────
const cysticFibrosis: DiseaseMolecularRecord = {
  diseaseId: 'cystic-fibrosis',
  supportState: 'SUPPORTED',
  requiresSubtype: false,
  overview: L(
    'How a change connected to the CFTR gene can affect salt and water movement and contribute to cystic fibrosis.',
    'سی ایف ٹی آر جین سے وابستہ تبدیلی کیسے نمک اور پانی کی حرکت کو متاثر کر کے سسٹک فائبروسس میں حصہ ڈال سکتی ہے۔',
  ),
  mechanisms: [
    {
      id: 'cftr',
      supportState: 'SUPPORTED',
      label: L('CFTR gene context', 'سی ایف ٹی آر جین کا سیاق'),
      geneSymbol: 'CFTR',
      references: ['medlineplus-cftr', 'medlineplus-cystic-fibrosis'],
      steps: steps({
        geneContext: [
          'The CFTR gene carries the instructions for a channel protein on the surface of many cells that helps move chloride (a component of salt) in and out.',
          'سی ایف ٹی آر جین ایک چینل پروٹین کی ہدایات رکھتا ہے جو کئی خلیوں کی سطح پر ہوتا ہے اور کلورائیڈ (نمک کا ایک جزو) اندر اور باہر منتقل کرنے میں مدد دیتا ہے۔',
        ],
        geneticChange: [
          'In cystic fibrosis, changes in the CFTR gene affect how well this channel works.',
          'سسٹک فائبروسس میں، سی ایف ٹی آر جین میں تبدیلیاں اس بات کو متاثر کرتی ہیں کہ یہ چینل کتنی اچھی طرح کام کرتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'When the CFTR channel does not work properly, the movement of chloride and other ions across the cell surface is altered.',
          'جب سی ایف ٹی آر چینل ٹھیک کام نہ کرے، تو خلیے کی سطح پر کلورائیڈ اور دیگر آئنز کی حرکت بدل جاتی ہے۔',
        ],
        consequence: [
          'This changes how salt and water move across the surfaces of affected organs, which can make normal secretions thicker and stickier.',
          'یہ اس بات کو بدل دیتا ہے کہ متاثرہ اعضاء کی سطحوں پر نمک اور پانی کیسے حرکت کرتے ہیں، جس سے عام رطوبتیں گاڑھی اور چپچپی ہو سکتی ہیں۔',
        ],
        connection: [
          'Thicker secretions in organs such as the lungs and digestive system contribute to the respiratory and digestive features associated with cystic fibrosis.',
          'پھیپھڑوں اور نظامِ ہاضمہ جیسے اعضاء میں گاڑھی رطوبتیں سسٹک فائبروسس سے وابستہ تنفسی اور ہاضمی علامات میں حصہ ڈالتی ہیں۔',
        ],
      }),
    },
  ],
};

// ── Lysosomal storage disorders (§14) — subtype-specific ────────────────────
const lsd: DiseaseMolecularRecord = {
  diseaseId: 'lysosomal-storage-disorders',
  supportState: 'SUBTYPE_REQUIRED',
  requiresSubtype: true,
  overview: L(
    'Lysosomal storage disorders are a group of conditions. Choose an example disorder to see its specific gene and enzyme story; there is no single universal mechanism.',
    'لائسوسومل اسٹوریج ڈس آرڈرز حالتوں کا ایک گروہ ہیں۔ اس کے مخصوص جین اور اینزائم کی کہانی دیکھنے کے لیے ایک مثالی مرض منتخب کریں، کوئی واحد عالمگیر میکانزم نہیں ہے۔',
  ),
  subtypes: [
    { id: 'tay-sachs', name: L('Tay-Sachs disease', 'ٹے-سیکس بیماری') },
    { id: 'gaucher', name: L('Gaucher disease', 'گوشے بیماری') },
  ],
  mechanisms: [
    {
      id: 'hexa',
      subtypeId: 'tay-sachs',
      supportState: 'SUPPORTED',
      label: L('Tay-Sachs disease (HEXA)', 'ٹے-سیکس بیماری (ایچ ای ایکس اے)'),
      geneSymbol: 'HEXA',
      references: ['medlineplus-hexa'],
      steps: steps({
        geneContext: [
          'Tay-Sachs disease is linked to the HEXA gene, which carries instructions for part of an enzyme that works inside lysosomes, the cell’s recycling compartments.',
          'ٹے-سیکس بیماری ایچ ای ایکس اے جین سے وابستہ ہے، جو ایک اینزائم کے حصے کی ہدایات رکھتا ہے جو لائسوسومز (خلیے کے ری سائیکلنگ خانوں) کے اندر کام کرتا ہے۔',
        ],
        geneticChange: [
          'A change in the HEXA gene can reduce how much of this working enzyme the body makes.',
          'ایچ ای ایکس اے جین میں تبدیلی اس مقدار کو کم کر سکتی ہے جتنا کارآمد اینزائم جسم بناتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'With less working enzyme, a specific fatty substance is not broken down inside lysosomes as it normally would be.',
          'کم کارآمد اینزائم کے ساتھ، ایک مخصوص چکنائی والا مادہ لائسوسومز کے اندر اس طرح نہیں ٹوٹتا جیسے عام طور پر ٹوٹنا چاہیے۔',
        ],
        consequence: [
          'The material gradually builds up inside cells, especially nerve cells.',
          'یہ مادہ آہستہ آہستہ خلیوں کے اندر جمع ہوتا ہے، خاص طور پر اعصابی خلیوں میں۔',
        ],
        connection: [
          'This build-up affects how nerve cells work and contributes to the features associated with Tay-Sachs disease.',
          'یہ جمع ہونا اعصابی خلیوں کے کام کو متاثر کرتا ہے اور ٹے-سیکس بیماری سے وابستہ علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
    {
      id: 'gba',
      subtypeId: 'gaucher',
      supportState: 'SUPPORTED',
      label: L('Gaucher disease (GBA)', 'گوشے بیماری (جی بی اے)'),
      geneSymbol: 'GBA',
      references: ['medlineplus-gba'],
      steps: steps({
        geneContext: [
          'Gaucher disease is linked to the GBA gene, which carries instructions for a lysosomal enzyme.',
          'گوشے بیماری جی بی اے جین سے وابستہ ہے، جو ایک لائسوسومل اینزائم کی ہدایات رکھتا ہے۔',
        ],
        geneticChange: [
          'A change in the GBA gene can reduce this enzyme’s activity.',
          'جی بی اے جین میں تبدیلی اس اینزائم کی سرگرمی کو کم کر سکتی ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'With less enzyme activity, a specific fatty substance is not broken down normally.',
          'کم اینزائم سرگرمی کے ساتھ، ایک مخصوص چکنائی والا مادہ عام طور پر نہیں ٹوٹتا۔',
        ],
        consequence: [
          'The material accumulates inside certain cells, often in the spleen, liver, and bone marrow.',
          'یہ مادہ بعض خلیوں کے اندر جمع ہوتا ہے، اکثر تلی، جگر اور ہڈی کے گودے میں۔',
        ],
        connection: [
          'This accumulation contributes to the features associated with Gaucher disease.',
          'یہ جمع ہونا گوشے بیماری سے وابستہ علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
  ],
};

// ── Ehlers-Danlos syndrome (§15) — subtype-aware ────────────────────────────
const edsHypermobileLimitation: MolecularMechanism = {
  id: 'eds-hypermobile',
  subtypeId: 'hypermobile',
  supportState: 'LIMITED_MECHANISM',
  label: L('Hypermobile EDS', 'ہائپرموبائل ای ڈی ایس'),
  references: ['medlineplus-eds'],
  steps: [],
  limitation: {
    title: L('Current genetic understanding is limited', 'موجودہ جینیاتی سمجھ محدود ہے'),
    explanation: L(
      'Unlike the other types shown here, the genetic cause of hypermobile EDS has not yet been identified. Because there is no confirmed single gene change to show, this tool does not display a molecular mechanism for hypermobile EDS. A healthcare professional or genetic counselor can discuss family-specific questions.',
      'یہاں دکھائی گئی دیگر اقسام کے برعکس، ہائپرموبائل ای ڈی ایس کی جینیاتی وجہ ابھی تک شناخت نہیں ہوئی۔ چونکہ دکھانے کے لیے کوئی تصدیق شدہ واحد جین تبدیلی نہیں، اس لیے یہ آلہ ہائپرموبائل ای ڈی ایس کے لیے کوئی مالیکیولر میکانزم نہیں دکھاتا۔ خاندان سے متعلق سوالات کسی طبی ماہر یا جینیاتی مشیر سے بات کریں۔',
    ),
  },
};

const eds: DiseaseMolecularRecord = {
  diseaseId: 'ehlers-danlos-syndrome',
  supportState: 'SUBTYPE_REQUIRED',
  requiresSubtype: true,
  overview: L(
    'Ehlers-Danlos syndrome is a group of connective-tissue conditions. Its genetics differ by subtype, choose a subtype to see its specific story. Hypermobile EDS has no confirmed single-gene mechanism.',
    'ایہلرز-ڈانلوس سنڈروم مربوط بافت کی حالتوں کا ایک گروہ ہے۔ اس کی جینیات ذیلی قسم کے مطابق مختلف ہوتی ہے، مخصوص کہانی دیکھنے کے لیے ایک ذیلی قسم منتخب کریں۔ ہائپرموبائل ای ڈی ایس کا کوئی تصدیق شدہ واحد جین میکانزم نہیں۔',
  ),
  subtypes: [
    { id: 'classical', name: L('Classical EDS', 'کلاسیکل ای ڈی ایس') },
    { id: 'vascular', name: L('Vascular EDS', 'ویسکولر ای ڈی ایس') },
    { id: 'classical-like', name: L('Classical-like EDS', 'کلاسیکل-نما ای ڈی ایس') },
    { id: 'hypermobile', name: L('Hypermobile EDS', 'ہائپرموبائل ای ڈی ایس') },
  ],
  mechanisms: [
    {
      id: 'eds-classical',
      subtypeId: 'classical',
      supportState: 'SUPPORTED',
      label: L('Classical EDS (COL5A1)', 'کلاسیکل ای ڈی ایس (سی او ایل 5 اے 1)'),
      geneSymbol: 'COL5A1',
      references: ['medlineplus-col5a1', 'medlineplus-eds'],
      steps: steps({
        geneContext: [
          'Classical EDS is often linked to the COL5A1 gene, which helps make type V collagen, a protein that helps organise the connective tissue supporting skin, joints, and blood vessels.',
          'کلاسیکل ای ڈی ایس اکثر سی او ایل 5 اے 1 جین سے وابستہ ہوتا ہے، جو ٹائپ V کولاجن بنانے میں مدد دیتا ہے، ایک پروٹین جو جلد، جوڑوں اور خون کی نالیوں کو سہارا دینے والی مربوط بافت کو منظم کرنے میں مدد دیتا ہے۔',
        ],
        geneticChange: [
          'A change in the COL5A1 gene can affect how type V collagen is made or assembled.',
          'سی او ایل 5 اے 1 جین میں تبدیلی اس بات کو متاثر کر سکتی ہے کہ ٹائپ V کولاجن کیسے بنتا یا مرتب ہوتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'This can change how collagen fibres form and how connective tissue holds together.',
          'یہ اس بات کو بدل سکتا ہے کہ کولاجن ریشے کیسے بنتے ہیں اور مربوط بافت کیسے جڑی رہتی ہے۔',
        ],
        consequence: [
          'Connective tissue may be weaker or more stretchy than usual.',
          'مربوط بافت معمول سے کمزور یا زیادہ لچکدار ہو سکتی ہے۔',
        ],
        connection: [
          'This contributes to features such as stretchy skin and loose joints associated with classical EDS.',
          'یہ کلاسیکل ای ڈی ایس سے وابستہ لچکدار جلد اور ڈھیلے جوڑوں جیسی علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
    {
      id: 'eds-vascular',
      subtypeId: 'vascular',
      supportState: 'SUPPORTED',
      label: L('Vascular EDS (COL3A1)', 'ویسکولر ای ڈی ایس (سی او ایل 3 اے 1)'),
      geneSymbol: 'COL3A1',
      references: ['medlineplus-col3a1', 'medlineplus-eds'],
      steps: steps({
        geneContext: [
          'Vascular EDS is linked to the COL3A1 gene, which helps make type III collagen, important in the walls of blood vessels and hollow organs.',
          'ویسکولر ای ڈی ایس سی او ایل 3 اے 1 جین سے وابستہ ہے، جو ٹائپ III کولاجن بنانے میں مدد دیتا ہے، جو خون کی نالیوں اور کھوکھلے اعضاء کی دیواروں میں اہم ہے۔',
        ],
        geneticChange: [
          'A change in the COL3A1 gene can affect how type III collagen is made.',
          'سی او ایل 3 اے 1 جین میں تبدیلی اس بات کو متاثر کر سکتی ہے کہ ٹائپ III کولاجن کیسے بنتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'This can change the strength of tissues that rely on type III collagen.',
          'یہ ان بافتوں کی مضبوطی کو بدل سکتا ہے جو ٹائپ III کولاجن پر انحصار کرتی ہیں۔',
        ],
        consequence: [
          'The walls of blood vessels and some organs may be more fragile than usual.',
          'خون کی نالیوں اور بعض اعضاء کی دیواریں معمول سے زیادہ نازک ہو سکتی ہیں۔',
        ],
        connection: [
          'This contributes to the features associated with vascular EDS.',
          'یہ ویسکولر ای ڈی ایس سے وابستہ علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
    {
      id: 'eds-classical-like',
      subtypeId: 'classical-like',
      supportState: 'SUPPORTED',
      label: L('Classical-like EDS (TNXB)', 'کلاسیکل-نما ای ڈی ایس (ٹی این ایکس بی)'),
      geneSymbol: 'TNXB',
      references: ['medlineplus-eds'],
      steps: steps({
        geneContext: [
          'Classical-like EDS is associated with the TNXB gene, which helps make a protein that supports the organisation of connective tissue.',
          'کلاسیکل-نما ای ڈی ایس ٹی این ایکس بی جین سے وابستہ ہے، جو ایک پروٹین بنانے میں مدد دیتا ہے جو مربوط بافت کی تنظیم کو سہارا دیتا ہے۔',
        ],
        geneticChange: [
          'Changes in the TNXB gene can reduce how much of this protein the body makes.',
          'ٹی این ایکس بی جین میں تبدیلیاں اس مقدار کو کم کر سکتی ہیں جتنا یہ پروٹین جسم بناتا ہے۔',
        ],
        geneticChangeCallout: EXAMPLE_CALLOUT,
        functionEffect: [
          'With less of this protein, connective tissue may be organised less effectively.',
          'اس پروٹین کی کمی کے ساتھ، مربوط بافت کم مؤثر طریقے سے منظم ہو سکتی ہے۔',
        ],
        consequence: [
          'Skin and joints may be more stretchy or loose than usual.',
          'جلد اور جوڑ معمول سے زیادہ لچکدار یا ڈھیلے ہو سکتے ہیں۔',
        ],
        connection: [
          'This contributes to the features associated with classical-like EDS.',
          'یہ کلاسیکل-نما ای ڈی ایس سے وابستہ علامات میں حصہ ڈالتا ہے۔',
        ],
      }),
    },
    edsHypermobileLimitation,
  ],
};

export const DISEASE_MOLECULAR_RECORDS: readonly DiseaseMolecularRecord[] = [
  betaThalassemia,
  cysticFibrosis,
  lsd,
  eds,
];

export function getMolecularRecord(diseaseId: string): DiseaseMolecularRecord | null {
  return DISEASE_MOLECULAR_RECORDS.find((r) => r.diseaseId === diseaseId) ?? null;
}
