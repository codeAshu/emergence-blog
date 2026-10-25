// Chitrakāvya data. Verse 929/930 of the Pādukāsahasra (Vedānta Deśika, c. 1300 CE).

export const verse929 = {
  deva: ["स्थिरागसां सदाराध्या विहताकततामता ।", "सत्पादुके सरसा मा रङ्गराजपदं नय ॥"],
  iast: "sthirāgasāṃ sadārādhyā vihatākatatāmatā / satpāduke sarasā mā raṅgarājapadaṃ naya",
  // 32 akṣaras, row-major on the 4×8 board
  cells: ["स्थि", "रा", "ग", "सां", "स", "दा", "रा", "ध्या", "वि", "ह", "ता", "क", "त", "ता", "म", "ता", "स", "त्पा", "दु", "के", "स", "र", "सा", "मा", "रं", "ग", "रा", "ज", "प", "दं", "न", "य"],
  cellsIast: ["sthi", "rā", "ga", "sāṃ", "sa", "dā", "rā", "dhyā", "vi", "ha", "tā", "ka", "ta", "tā", "ma", "tā", "sa", "tpā", "du", "ke", "sa", "ra", "sā", "mā", "raṃ", "ga", "rā", "ja", "pa", "daṃ", "na", "ya"],
};

export const verse930 = {
  deva: ["स्थिता समयराजत्पागतरामादके गवि ।", "दुरंहसां सन्नतादा साध्यातापकरासरा ॥"],
  iast: "sthitā samayarājatpāgatarāmādake gavi / duraṃhasāṃ sannatādā sādhyātāpakarāsarā",
  syllables: ["स्थि", "ता", "स", "म", "य", "रा", "ज", "त्पा", "ग", "त", "रा", "मा", "द", "के", "ग", "वि", "दु", "रं", "ह", "सां", "स", "न्न", "ता", "दा", "सा", "ध्या", "ता", "प", "क", "रा", "स", "रा"],
};

// Knight's tour: the k-th syllable of verse 930 is read from board cell tour[k].
// Verified by search: it is the unique closed-form tour from the top-left corner
// whose cell sequence spells verse 930 (nasal marks shift with sandhi).
export const tour = [0, 10, 4, 14, 31, 21, 27, 17, 2, 12, 6, 23, 29, 19, 25, 8, 18, 24, 9, 3, 20, 30, 15, 5, 22, 7, 13, 28, 11, 1, 16, 26];

export const moveNumber: number[] = (() => {
  const n = new Array(32).fill(0);
  tour.forEach((cell, k) => (n[cell] = k + 1));
  return n;
})();

// Sarvatōbhadra: Kirātārjunīya 15.25 (Bhāravi). Reads the same in all four directions.
export const sarvatobhadra = {
  rows: [
    ["दे", "वा", "का", "नि", "नि", "का", "वा", "दे"],
    ["वा", "हि", "का", "स्व", "स्व", "का", "हि", "वा"],
    ["का", "का", "रे", "भ", "भ", "रे", "का", "का"],
    ["नि", "स्व", "भ", "व्य", "व्य", "भ", "स्व", "नि"],
    ["नि", "स्व", "भ", "व्य", "व्य", "भ", "स्व", "नि"],
    ["का", "का", "रे", "भ", "भ", "रे", "का", "का"],
    ["वा", "हि", "का", "स्व", "स्व", "का", "हि", "वा"],
    ["दे", "वा", "का", "नि", "नि", "का", "वा", "दे"],
  ],
  verse: "देवाकानिनि कावादे वाहिकास्वस्वकाहि वा । काकारेभभरे काका निस्वभव्यव्यभस्वनि ॥",
  iast: "devākānini kāvāde vāhikāsvasvakāhi vā / kākārebhabhare kākā nisvabhavyavyabhasvani",
};

export type Bandha = {
  key: string;
  name: string;
  skt: string;
  shape: "wheel" | "lotus" | "drum" | "sword" | "snake" | "zigzag" | "grid" | "fish" | "gateway" | "umbrella";
  spokes?: number;
  text: string;
  desc: string;
  rule: string;
  era: "classical" | "nineteenth";
};

export const bandhas: Bandha[] = [
  {
    key: "chakra",
    name: "Chakrabandha",
    skt: "चक्रबन्ध",
    shape: "wheel",
    spokes: 8,
    text: "रामासःराकविचरपुरःविदश्री",
    desc: "Syllables sit on the rim, hub and spokes of an n-spoked wheel. Found from Daṇḍin's Kāvyādarśa onward and richly developed in chapter 30 of the Pādukāsahasra.",
    rule: "Read anti-clockwise around the rim for one verse. Read along the spokes, rim to hub, for a second.",
    era: "classical",
  },
  {
    key: "padma",
    name: "Padmabandha",
    skt: "पद्मबन्ध",
    shape: "lotus",
    spokes: 8,
    text: "सातःरमकविसिद्धपद्म",
    desc: "An eight-petalled lotus with a calyx. Each petal carries a unit of the verse.",
    rule: "Syllables shared at petal joins serve two readings at once, which forces dense lexical play.",
    era: "classical",
  },
  {
    key: "muraja",
    name: "Murajabandha",
    skt: "मुरजबन्ध",
    shape: "drum",
    text: "रघुवीरशीरामचन्द्रशीशारदपूर्ण",
    desc: "A grid shaped like a muraja (mṛdaṅga) drum. The Agnipurāṇa fixes its metrical rules.",
    rule: "Read across the parallel skins for one verse. Read along the curving body for another.",
    era: "classical",
  },
  {
    key: "khadga",
    name: "Khadgabandha",
    skt: "खड्गबन्ध",
    shape: "sword",
    text: "शस्त्रमेवाशुसार",
    desc: "Syllables arranged along a sword's silhouette: hilt, guard, fuller and edge. Māgha (7th century) is the locus classicus; canto XIX of the Śiśupālavadha holds a celebrated example.",
    rule: "Reading follows the silhouette from hilt to point.",
    era: "classical",
  },
  {
    key: "naga",
    name: "Nāgabandha",
    skt: "नागबन्ध",
    shape: "snake",
    text: "अहिरूपेणविश्वरूप",
    desc: "The verse coils along a serpent's body. A favourite of the temple-inscriptional tradition, with instances at Kanchi and Tirumala.",
    rule: "Begin at the tail and end at the hood. Mirror readings double back.",
    era: "classical",
  },
  {
    key: "gomutrika",
    name: "Gomūtrikābandha",
    skt: "गोमूत्रिका",
    shape: "zigzag",
    text: "करुणासारःकरूणिसारम्",
    desc: "Two lines of verse arranged so that a zigzag path through them yields a third. An unusually compact case of information shared across line boundaries.",
    rule: "Read the lines straight for two verses, then alternate along the zigzag for a third, grammatically valid verse.",
    era: "classical",
  },
  {
    key: "sarvatobhadra",
    name: "Sarvatōbhadra",
    skt: "सर्वतोभद्र",
    shape: "grid",
    text: "",
    desc: "A 4×4 or 8×8 grid in which the same śloka reads the same left-to-right, right-to-left, top-to-bottom and bottom-to-top. Each row, each column and the verse as a whole is a palindrome.",
    rule: "Read in any cardinal direction; the syllabic sequence repeats.",
    era: "classical",
  },
  {
    key: "matsya",
    name: "Matsyabandha",
    skt: "मत्स्यबन्ध",
    shape: "fish",
    text: "",
    desc: "Verse fitted to a fish's silhouette: body, tail, gill, eye. Late-Vaiṣṇava poets used it for invocations of Viṣṇu's matsya avatar.",
    rule: "Reading starts at the mouth and runs along the spine.",
    era: "nineteenth",
  },
  {
    key: "torana",
    name: "Toraṇabandha",
    skt: "तोरणबन्ध",
    shape: "gateway",
    text: "तंवन्देखिलनायकंहितार्थिनापुनःपुंसासलानीमिभूरिःपाप्यउच्य",
    desc: "The lintel carries the opening line; two pillars carry mirrored secondary lines descending in parallel. Common on praise inscriptions at Tirupati and Srirangam.",
    rule: "Lintel first, then each pillar top to bottom.",
    era: "nineteenth",
  },
  {
    key: "chatra",
    name: "Chatrabandha",
    skt: "छत्रबन्ध",
    shape: "umbrella",
    text: "सदातनदीनशादीनाशनपाहि",
    desc: "Canopy syllables read across the curved arc; staff syllables descend the vertical. An arrow marks the start of reading.",
    rule: "Arc first, then down the staff.",
    era: "nineteenth",
  },
  {
    key: "padma12",
    name: "Padmabandha (12)",
    skt: "पद्मबन्ध",
    shape: "lotus",
    spokes: 12,
    text: "सदारमसं",
    desc: "The eight-petal lotus elaborated to twelve, with a syllabic centre. One verse spirals inward and a second appears in the calyx.",
    rule: "Reading direction is given by an external arrow.",
    era: "nineteenth",
  },
  {
    key: "chakra16",
    name: "Chakrabandha (16)",
    skt: "चक्रबन्ध",
    shape: "wheel",
    spokes: 16,
    text: "किविचदयेदवंतेसा",
    desc: "The classical wheel doubled to sixteen spokes, so two interlocking verses share a hub syllable. Appears in late-19th-century stuti literature, at Pandharpur, and in Maithili anthologies.",
    rule: "Two interlocking rim readings; the hub syllable belongs to both.",
    era: "nineteenth",
  },
  {
    key: "chakra-simple",
    name: "Chakrabandha (simple)",
    skt: "चक्रबन्ध",
    shape: "wheel",
    spokes: 6,
    text: "दतेविसायदवंजक्षौ",
    desc: "A tighter wheel with two concentric reading rings, used as a mnemonic in 19th-century pāṭhaśālā instruction.",
    rule: "Reading directions differ between the outer rim and the inner ring.",
    era: "nineteenth",
  },
];

export const resources = {
  primary: [
    ["Pādukāsahasra (overview)", "Vedānta Deśika, c. 1300 CE", "https://en.wikipedia.org/wiki/Paduka_Sahasra", "Wikipedia"],
    ["Pādukāsahasra, full text with translation", "Vedānta Deśika", "https://www.prapatti.com/categories/paadukaasahasram.php", "prapatti.com"],
    ["Pādukāsahasra, public-domain edition", "Vedānta Deśika", "https://archive.org/details/in.ernet.dli.2015.495568", "Internet Archive"],
    ["Kāvyālaṅkāra", "Rudraṭa, c. 9th c. CE", "https://en.wikipedia.org/wiki/Rudrata", "Earliest extant treatise with the knight's-tour figure (turagapadabandha)"],
    ["Śiśupālavadha", "Māgha, c. 7th–8th c. CE", "https://en.wikipedia.org/wiki/Shishupala_Vadha", "Canto XIX: chitrakāvya and bandha experiments"],
    ["Kirātārjunīya", "Bhāravi", "https://en.wikipedia.org/wiki/Kir%C4%81t%C4%81rjun%C4%ABya", "Early palindromic and dual-reading verses"],
    ["Kāvyādarśa", "Daṇḍin", "", "Taxonomy of citra and alaṅkāra; standard reference"],
  ],
  papers: [
    ["The Knight's Tour Problem and Rudraṭa's Verse (Resonance 25(8): 1095–1116)", "S. Joshi, S. Sridharan, 2020", "https://link.springer.com/article/10.1007/s12045-020-1026-7", "Also open access at ias.ac.in"],
    ["Sound, Image and Meaning: Many Aspects of Sanskrit Figurative Poetry", "A. Pollastri", "https://academia.edu/8786970/Sound_image_and_meaning._Many_aspects_of_Sanskrit_figurative_poetry", "Open-access PDF"],
    ["Finding Knight's Tours on an M×N Chessboard with O(MN) Algorithm", "S. Ghosh, R. Sridhar", "https://www.iiitb.ac.in/Ganaka/projects/Chitrakavya/downloads/00281427.pdf", "IIITB Ganaka mirror"],
    ["Knight's Tour in the Pādukāsahasra, Haravijaya, etc.", "IIITB-CSL", "https://www.iiitb.ac.in/Ganaka/projects/paduka/paduka.html", "Project page"],
  ],
  essays: [
    ["Chitrakavya · Chitrabandha (essay series)", "Sreenivasa Rao", "https://sreenivasaraos.com/2012/10/10/chitrakavya-chitrabandha/", "The most readable long-form English introduction"],
    ["Introduction to Sanskrit Chitrakavya", "Open Pathshala", "https://openpathshala.com/sanskrit-chitrakavya", ""],
    ["Pādukāsahasram by Vedanta Desika", "Bridge-India", "http://bridge-india.blogspot.com/2011/08/paduka-sahasram-by-vedanta-desika.html", ""],
    ["A spatial palindrome śloka", "Vagartham", "https://vagartham.wordpress.com/2007/10/24/a-spatial-palindrome-sloka/", ""],
    ["Citrakāvya (4): Bandhas", "Wisdomlib", "https://www.wisdomlib.org/hinduism/essay/shishupala-vadha-study/d/doc1150140.html", "Canto-by-canto digest"],
    ["The Dexterous Deśika", "Sridhārśanam", "https://sridharshanam.org/wp-content/uploads/2019/01/Dextreous-Desika_1.pdf", "Hagiographic, informative"],
  ],
  wiki: [
    ["Chitra-kavya", "https://en.wikipedia.org/wiki/Chitra-kavya"],
    ["Knight's tour", "https://en.wikipedia.org/wiki/Knight%27s_tour"],
    ["Hamiltonian path", "https://en.wikipedia.org/wiki/Hamiltonian_path"],
    ["Magic square", "https://en.wikipedia.org/wiki/Magic_square"],
    ["Constrained writing", "https://en.wikipedia.org/wiki/Constrained_writing"],
    ["Oulipo", "https://en.wikipedia.org/wiki/Oulipo"],
    ["Anuṣṭubh metre", "https://en.wikipedia.org/wiki/Anu%E1%B9%A3%E1%B9%ADubh"],
    ["Devanāgarī", "https://en.wikipedia.org/wiki/Devanagari"],
    ["Haravijaya", "https://en.wikipedia.org/wiki/Haravijaya"],
  ],
  code: [
    ["koushikr/Chitrakavya", "https://github.com/koushikr/Chitrakavya", "NLP toolkit for tagging Sanskrit corpora"],
    ["vrraghy/chitrakaavya", "https://vrraghy.github.io/chitrakaavya/", "Sister site cataloguing constrained Sanskrit verses"],
    ["sgalal/knights-tour-visualization", "https://github.com/sgalal/knights-tour-visualization", "Divide-and-conquer solver with visualisation"],
    ["oliver-pham/knights-tour", "https://github.com/oliver-pham/knights-tour", "Warnsdorff's heuristic"],
    ["lostjared/Knights_Tour.JavaScript", "https://github.com/lostjared/Knights_Tour.JavaScript", "HTML5 canvas, easy to read"],
    ["ambuda-org/vidyut", "https://github.com/ambuda-org/vidyut", "Sanskrit software infrastructure: sandhi, derivation, tagging"],
    ["AI4Bharat/indicnlp_catalog", "https://github.com/AI4Bharat/indicnlp_catalog", "Catalogue of Indic NLP resources"],
  ],
};

// Split a Devanagari string into akṣaras (one glyph cluster each).
export function aksharas(s: string): string[] {
  const re = /[अ-औॠॡ][ँ-ः]?|(?:[क-हक़-य़]्)*[क-हक़-य़][ा-ौॢॣ]?[ँ-ः]?|[ँ-ः]/g;
  return s.match(re) ?? [];
}
