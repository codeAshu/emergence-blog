// The six darśana explainers: a series of notes on the orthodox schools of
// Indian philosophy. Each post lives at /darsana/<slug>; the content itself is
// generated into app/darsana/<slug>/content.ts from the standalone pages.

export type DarsanaPost = {
  slug: string;
  n: number;
  school: string;
  title: string;
  excerpt: string;
  read: string;
};

export const darsanaSeries = {
  title: "Notes on the six darśanas",
  date: "2026-10-17",
  category: "Notes",
  excerpt:
    "Six illustrated explainers on the orthodox schools of Indian philosophy, written as a compiler's notes: Sāṃkhya, Yoga, Nyāya, Vaiśeṣika, Mīmāṃsā and Vedānta, with original diagrams and a few things to try.",
};

export const darsanaPosts: DarsanaPost[] = [
  {
    slug: "samkhya",
    n: 1,
    school: "Sāṃkhya",
    title: "The clay before the pot",
    excerpt:
      "The oldest of the six and the one most often called scientific. Its first move is the question every creation story skips: a maker can shape a pot, but where did the clay come from?",
    read: "18 min",
  },
  {
    slug: "yoga",
    n: 2,
    school: "Yoga",
    title: "A road out of the clay",
    excerpt:
      "Sāṃkhya explained how consciousness gets caught in matter, and admitted it had no way out. Patañjali's Yoga is that way: a discipline rather than a theory, and the word does not mean what the studios think it means.",
    read: "22 min",
  },
  {
    slug: "nyaya",
    n: 3,
    school: "Nyāya",
    title: "Where there is smoke",
    excerpt:
      "The school of how we know and how we argue: four roads to knowledge, one shape for every inference, and a complete catalogue of the ways a losing opponent cheats.",
    read: "24 min",
  },
  {
    slug: "vaisheshika",
    n: 4,
    school: "Vaiśeṣika",
    title: "An inventory of everything",
    excerpt:
      "Nyāya's partner: the realist's list of what there is, down to the atom, with space and time counted as things rather than gaps.",
    read: "18 min",
  },
  {
    slug: "mimamsa",
    n: 5,
    school: "Mīmāṃsā",
    title: "The act keeps its own books",
    excerpt:
      "The school that defended the Vedic rite when the Buddhists had all but buried it: the word is older than the god, a text with no author cannot be wrong, and nobody is needed to pay out the fruit of an act.",
    read: "28 min",
  },
  {
    slug: "vedanta",
    n: 6,
    school: "Vedānta",
    title: "The seer who saw both",
    excerpt:
      "The end of the Veda and, its teachers insist, the end of thought. One set of texts read four ways: the world as appearance, as God's body, as God's dependent, as God himself.",
    read: "42 min",
  },
];
