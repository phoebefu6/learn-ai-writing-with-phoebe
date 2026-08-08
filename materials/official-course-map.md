# learn-ai-writing-with-phoebe - official source map

**The first live course on the hub's `aiap` (Applied AI) shelf.** Two tracks, 16 sessions. Leader
track (a1-a6) for managers, editors and anyone who approves writing. Writer track (b1-b10) for anyone
whose name goes on the writing. Palette: terracotta `#B04A2F` + slate `#33475C`.

Running case: one week at **Cadence** (the AI meeting-notes company used across the aidm series) where
the education proposal slips, the evidence changes who the buyer is, one technical assumption is
untested, and a decision is needed on Thursday. The proposal in question is the memo the AI + Research
capstone produces, so the two courses cross-link.

Signature interactive: **`assets/write-live.js`** - the clarity lab. Verified live in-browser before
fan-out.

---

## Scope borders (state these on the pages, do not drift across them)

| Course | Owns |
|---|---|
| **This one** | Writing you are personally accountable for at work: emails, updates, proposals, reports, reviews, difficult messages, long-form drafts. The through-line is your voice surviving the tool. |
| AI + Content (aidm) | Marketing and publishing content, one-idea-many-formats. |
| Tech Writing (docs) | Documentation, with real code. |
| Prompt Engineering (ai) | Prompting as a discipline in its own right. |

---

## The lab's canon numbers (verified in-browser 2026-08-09, do not edit without re-running)

| Rung | Levers on | Score | Words |
|---|---|---|---|
| 0 | none - unbriefed model draft | **48 / 100** | 223 |
| 1 | + brief | **52** | 184 |
| 2 | + voice sample | **68** | 171 |
| 3 | + structure | **70** | 164 |
| 4 | + specifics | **83** | 156 |
| 5 | + cut - shippable | **98** | 102 |
| anti | + "sound more professional" | **62 (-36)** | 144 |

Two facts to repeat across the track: **the score rises as the words fall** (223 → 102 while 48 → 98),
and the two biggest single jumps are **voice +16** and **cut +15** - half the total climb from two
habits, neither of them a prompting trick.

**What is written and what is measured.** The drafts are written examples: one good version plus one
specific kind of damage per missing practice. Every number is computed from the text - hedge and
AI-tell counts against real word lists, passive hits by pattern, sentence-length spread,
nominalisation density (with a whitelist so ordinary words like "evidence" and "institutions" are not
punished), a real Flesch-Kincaid grade with syllable counting, and the share of sentences carrying a
number or a name. Put that honestly on every page that embeds the lab, and say plainly that the
passive check is a heuristic - a be-verb plus a participle - so its count is a flag, not a census.

Weights: hedges 18%, passives 15%, rhythm 15%, AI-tells 15%, specifics 15%, nominalisations 12%,
reading grade 10%.

The lab has a third mode, **`data-mode="own"`**: a textarea that runs the identical seven measures on
whatever the learner pastes, entirely in the browser. Use it in b1, b6 and b10.

---

## The seven measures, and what each catches

1. **Hedges and filler** - just, really, somewhat, arguably, I think, a number of, various, significant.
   Each one moves a sentence further from a commitment.
2. **Passive voice** - hides the actor. "A decision was reached" invites the question nobody answers.
3. **Rhythm** - the spread of sentence lengths. Generated prose settles into a steady 18-to-22-word
   hum; human writing varies. This is the most reliable tell there is, and the one people cannot name.
4. **Nominalisations** - implementation, utilisation, finalisation. Verbs turned into abstract nouns,
   which is how responsibility disappears from a sentence.
5. **AI-tell phrases** - delve, leverage, seamless, robust, landscape, tapestry, underscores,
   furthermore, it's worth noting, do not hesitate. Not wrong; fingerprints.
6. **Reading grade** - the published **Flesch-Kincaid grade level** formula,
   `0.39 x (words/sentences) + 11.8 x (syllables/words) - 15.59`, implemented with a real syllable
   counter. Treat above grade 12 on work writing as unedited rather than sophisticated.
7. **Specifics** - the share of sentences carrying a number or a name. The measure that separates a
   real update from warm noise, and the one that changes behaviour fastest, because fixing it usually
   means going and finding something out.

---

## Verified evidence available for this course

These were fetched from primary sources during the AI + Design build (2026-08-08) and are directly
relevant to the homogenisation and over-reliance arguments here. **Quote them exactly as framed below
and do not extend them** - the caveats matter.

- **Doshi &amp; Hauser, "Generative AI enhances individual creativity but reduces the collective
  diversity of novel content," *Science Advances* 10(28), eadn5290, 12 July 2024.** 293 writers, 600
  evaluators, 3,519 evaluations. Story novelty rose **+5.4%** with one AI idea and **+8.1%** with five;
  the **least creative writers gained most** (novelty +10.7%, usefulness +11.5% in the five-idea
  condition). Stories also became **more similar to each other** within a condition.
  **CAVEAT, do not get this wrong:** the paper's 10.7% and 8.9% similarity figures are a *share of the
  total range* of a similarity coefficient. It is NOT "stories were 10.7% more similar". Say "measurably
  more similar to one another" and cite the paper.
- **Anderson, Shah &amp; Kreminski, "Homogenization Effects of Large Language Models on Human Creative
  Ideation," C&amp;C 2024, DOI 10.1145/3635636.3656204.** 36 participants: different users produced
  **less semantically distinct ideas** with ChatGPT than with another creativity-support tool, while
  producing more of them, and felt **less ownership** of them. The ownership finding is the one that
  matters for a writing course.
- **Meincke, Mollick &amp; Terwiesch, "Prompting Diverse Ideas," arXiv:2402.01727.** Cosine similarity
  (lower is more diverse): a group of students **0.243**, Chain-of-Thought prompting **0.255**, base
  GPT-4 prompt **0.377**. So a default model idea pool is markedly more internally similar than a human
  crowd, and better prompting closes most of the gap. Useful for b3 and b9.
- **Wenger &amp; Kenett, "Large language models are homogeneously creative," *PNAS Nexus* 5(3),
  pgag042, 24 March 2026.** 102 humans vs 22 LLMs across three divergent-thinking tasks: LLMs show
  markedly lower semantic distance, effect sizes **0.87-1.8**, across model families. The
  "switching models will not save you" citation.
- **Nielsen Norman Group, "Information Foraging with Generative AI," 24 Sept 2023** - 2-week diary
  study, 18 participants, 425 conversations: only **22.43%** of conversations were followed by any
  verification. The strongest available "people do not check the output" number.
- **Disclosure, where it is already mandatory** (use in a4, and say plainly that these are academic and
  research-publishing rules rather than workplace law): ICMJE requires describing AI use "in both the
  cover letter and the submitted work", and says nondisclosure "may require corrective action and may be
  construed as misconduct"; COPE puts the disclosure in Materials and Methods and states AI tools
  "cannot take responsibility for the submitted work"; Springer Nature says LLMs "do not currently
  satisfy our authorship criteria"; Science adds that cited sources "may not be authored or coauthored
  by AI tools"; Elsevier requires a separate published declaration with prescribed wording. For
  commercial research, ICC/ESOMAR Code 2025 Article 9(b) requires disclosing whether AI "played a
  significant role... and to what extent human oversight was involved". **The teachable point: they all
  agree AI cannot be an author and they disagree about where you disclose, so a team needs its own
  written rule rather than a vibe.**
- **EU AI Act Article 50** applies from **2 August 2026** and was NOT delayed by the July 2026 Digital
  Omnibus. It binds *providers* of generative systems to mark synthetic output, and *deployers* to
  disclose deep fakes. Ordinary workplace prose is not in scope - say so rather than implying a legal
  duty that does not exist for an internal memo.

**Do not invent anything beyond this list.** If a page wants a statistic that is not here, argue from
mechanism instead and say that is what you are doing. No made-up survey percentages about how many
people use AI to write.

---

## Per-session coverage

Legend: ✓ taught to the working 80% · ◐ partial, deliberately

| Session | Covers | Depth |
|---|---|---|
| **a1** What changed | The fluent-and-empty quadrant, where the week's writing time goes, why review stopped catching the new failure | ✓ |
| **a2** Reading AI writing | The seven measures at manager altitude, the two send-back checks, why "was this AI?" is the wrong question, over-reliance (NN/g 22.43% verification) | ✓ |
| **a3** House voice | Capturing a voice with samples rather than adjectives, the two-page voice doc, register by audience | ✓ |
| **a4** Disclosure and trust | Where disclosure is already required and how the bodies disagree, what to promise internally, over-reliance and the homogenisation evidence | ✓ with gaps stated |
| **a5** Team writing standard | The one-page standard: ask up front, specifics rule, hedge list, templated formats, what nobody delegates | ✓ |
| **a6** Raising the bar | Measuring the right thing, protecting drafting time, removing review steps, what to stop doing | ✓ |
| **b1** Writer's AI loop | Decide-brief-draft-cut-own, the five levers, the seven measures, the skip rule | ✓ hand-authored template page |
| **b2** The brief | Five slots (reader, decision, ask, facts, register), plausible vagueness, specifics | ✓ |
| **b3** Voice captured | Building a voice sample and style profile from existing writing; diversity evidence (Meincke cosine numbers) | ✓ |
| **b4** Emails and messages | Subject lines, the one-screen rule, unmistakable asks, chat register | ✓ |
| **b5** Updates and memos | Point-three-ask structure, status updates that are not theatre, decision memos | ✓ |
| **b6** Clarity lab | The sixty-second pass, the two cuts, the constrained editor prompt, score-your-own | ✓ hand-authored signature page |
| **b7** Editing | The 40% drill, the paragraph that always goes, restructuring without rewriting, model add-and-agree biases | ✓ |
| **b8** Difficult writing | Bad news, pushback, feedback, saying no, apologies - and the argument that AI is often the wrong tool here, not merely risky | ✓ |
| **b9** Long-form | Outlines that hold, section briefs, argument drift across 3,000 words | ✓ |
| **b10** Capstone | A real week of the learner's own writing, scored before and after, plus a personal standard | ✓ |

## Not covered, by design

- Marketing copy, SEO, social and newsletters - AI + Content owns those.
- Documentation, API references, release notes - Tech Writing owns those.
- Prompting technique as a subject - Prompt Engineering owns it; this course uses prompts as a means.
- Grammar teaching. The course assumes competent prose and works on clarity, specificity and voice.
- Any claim that a detector can identify AI writing. It cannot reliably, and a2 says so explicitly.
