/* write-live.js - the clarity lab: real text, really measured.
   Usage:
     <div class="wlbox" data-mode="lab" data-levers=""></div>
     <div class="wlbox" data-mode="ladder"></div>
     <div class="wlbox" data-mode="own"></div>
   data-levers = which levers start ON (comma list of: brief,voice,structure,specifics,cut,pro).

   HONESTY RAIL: the drafts below are written examples - a realistic Cadence update at six levels of
   direction. The MEASUREMENT is not written, it is computed: hedge and filler density, passive-voice
   hits, sentence-length variance, nominalisation density, AI-tell phrases, a real Flesch-Kincaid grade
   with syllable counting, and the share of sentences carrying something concrete. Paste your own
   writing into the "score your own" box and the identical seven measures run on it.

   The passive-voice count is a heuristic (a be-verb followed by a participle), so it misses some and
   over-flags a few. That is stated on the page rather than hidden.

   The sixth lever, "sound more professional", is an ANTI-lever. It applies the substitutions a model
   reaches for when you ask for a more professional tone - and the score falls, because every one of
   them is a hedge, a passive, or a nominalisation.
*/
(function () {
  "use strict";

  var LEVERS = [
    { key: "brief",     label: "Brief",        hint: "Say who is reading, what they must decide, and what you want to happen. Without it, the draft opens with a windup instead of the point." },
    { key: "voice",     label: "Voice sample", hint: "Give the model three paragraphs of your own writing and tell it to match the register. Without it you get corporate default: utilise, leverage, facilitate." },
    { key: "structure", label: "Structure",    hint: "Decide the shape before drafting: the point, then the three things behind it, then the ask. Without it you get one undifferentiated wall." },
    { key: "specifics", label: "Specifics",    hint: "Feed it the real numbers, names and dates. Without them the model writes plausible vagueness - significant, several, various." },
    { key: "cut",       label: "Cut",          hint: "Delete the closing paragraph that restates the opening, and every hedge you would not say out loud." },
    { key: "pro",       label: "Sound more professional", hint: "The most requested edit in the world. Try it on a finished draft and watch what it does." }
  ];

  /* ---------- the draft: one base, and one damage transform per missing lever ----------
     Written the way the lesson works: the good version is what you get when all five practices are
     in place, and each missing practice does a specific, measurable kind of damage to it. */

  var BASE = [
    "The education proposal is slipping two weeks. I need a decision from you on Thursday.",
    "The evidence says institutions hold the budget, not students, which changes both who we sell to and how long a deal takes to close.",
    "Recording lectures needs documented consent in both markets. Procurement runs 6 to 12 months, based on a study of 31 institutions.",
    "One thing we do not know: whether our notes engine transfers to lecture audio. The only evidence is a vendor-funded preprint with 48 samples, so I want to run a two-week benchmark before we price anything.",
    "Say yes on Thursday and we start Monday."
  ];

  /* missing CUT: the closing paragraph nobody reads, plus the hedges you would not say out loud */
  function unCut(paras) {
    var p = paras.slice();
    p[0] = p[0].replace("is slipping two weeks", "is, I think, slipping by roughly two weeks or so");
    p[1] = p[1].replace("The evidence says", "The evidence seems to suggest that");
    p[3] = p[3].replace("so I want to run", "so I would quite like to possibly run");
    p.push("Thanks so much for your time and attention on this, and please do not hesitate to reach out if you have any questions at all or would like me to provide any additional context or information on any of the above points.");
    return p;
  }

  /* missing SPECIFICS: plausible vagueness in place of every number, date and name */
  function unSpecific(paras) {
    return paras.map(function (s) {
      return s
        .replace(/two weeks/g, "a fair amount")
        .replace(/on Thursday/g, "at some point soon")
        .replace("6 to 12 months", "considerably longer than we had anticipated")
        .replace("based on a study of 31 institutions", "based on various conversations we have had")
        .replace("a vendor-funded preprint with 48 samples", "some early third-party research")
        .replace("a two-week benchmark", "a benchmarking exercise")
        .replace("Say yes on Thursday and we start Monday.", "It would be great to get your thoughts on this when you have a moment.");
    });
  }

  /* missing STRUCTURE: nothing deleted, just welded into long flat compounds - the rhythm dies */
  function unStructured(paras) {
    var joined = paras.join(" ")
      .replace(/\. I need/g, ", and I need")
      .replace(/\. Procurement/g, ", while procurement")
      .replace(/\. The only evidence/g, ", and the only evidence")
      .replace(/\. Say yes/g, ", so if you could say yes")
      .replace(/\. It would be great/g, ", and it would be great");
    return [joined];
  }

  /* missing VOICE SAMPLE: the corporate default register the model reaches for on its own */
  var CORP = [
    [/\bThe evidence says\b/g, "The research indicates"],
    [/\bI need a decision from you\b/g, "we would benefit from a decision"],
    [/\bchanges both who we sell to\b/g, "necessitates a revision of both our go-to-market motion"],
    [/\bneeds documented consent\b/g, "is subject to documented consent requirements"],
    [/\bI want to run\b/g, "it would be beneficial to leverage"],
    [/\bbefore we price anything\b/g, "prior to the finalisation of pricing"],
    [/\bSay yes on Thursday and we start Monday\b/g, "Your approval on Thursday would facilitate commencement of the workstream early next week"],
    [/\bOne thing we do not know\b/g, "One area of residual uncertainty"],
    [/\bhow long a deal takes to close\b/g, "the duration of the sales cycle"],
    [/\bRecording lectures needs documented consent\b/g, "It is understood that recorded lecture content is required to be accompanied by documented consent"],
    [/\bProcurement runs\b/g, "Procurement is estimated to be"],
    [/\bwe start Monday\b/g, "the workstream is commenced early next week"]
  ];
  function unVoiced(paras) {
    return paras.map(function (s) { CORP.forEach(function (p) { s = s.replace(p[0], p[1]); }); return s; });
  }

  /* missing BRIEF: a windup instead of the point, and no ask anyone can act on */
  function unBriefed(paras) {
    var p = paras.slice();
    /* no brief means three separate failures: no reader, no point up front, no actionable ask */
    p[0] = "There are a few things I wanted to flag on the education work, and I think it is probably worth us aligning on where we have got to as a group before we go very much further with any of it.";
    p.unshift("I wanted to reach out and share a quick update on where things currently stand with the education initiative that we have been exploring over the past few weeks, as there have been a number of developments that I think would be valuable for everyone to have visibility of.");
    p[p.length - 1] = "Happy to discuss any of this further at some point if that would be useful.";
    return p;
  }

  function draftFor(L) {
    var paras = BASE.slice();
    if (!L.cut) paras = unCut(paras);
    if (!L.specifics) paras = unSpecific(paras);
    if (!L.voice) paras = unVoiced(paras);
    if (!L.brief) paras = unBriefed(paras);
    if (!L.structure) paras = unStructured(paras);
    var text = paras.join("\n\n");
    if (L.pro) text = professionalise(text);
    return text;
  }

  /* the anti-lever: exactly the substitutions a model makes when asked for a professional tone */
  var PRO_SUBS = [
    [/\bI need\b/g, "It would be appreciated if we could obtain"],
    [/\bI want\b/g, "It is my recommendation that we"],
    [/\bwe start\b/g, "commencement can be facilitated"],
    [/\bis slipping\b/g, "has been subject to a degree of schedule adjustment"],
    [/\bsays\b/g, "would appear to indicate"],
    [/\bchanges\b/g, "has implications for"],
    [/\bneeds\b/g, "is understood to require"],
    [/\bruns\b/g, "is estimated to be in the region of"],
    [/\bwe do not know\b/g, "remains somewhat uncertain at this juncture"],
    [/\bA two-week benchmark would settle it\b/g, "It is worth noting that a benchmarking exercise of approximately two weeks in duration could arguably provide clarification"],
    [/\bSay yes on Thursday\b/g, "Furthermore, in the event that approval is granted on Thursday"]
  ];

  function professionalise(t) {
    PRO_SUBS.forEach(function (p) { t = t.replace(p[0], p[1]); });
    return t;
  }

  /* ---------- the seven measures, all computed ---------- */

  var HEDGES = ["just", "really", "very", "quite", "somewhat", "arguably", "perhaps", "possibly", "maybe",
    "basically", "actually", "essentially", "fairly", "rather", "slightly", "a bit", "kind of", "sort of",
    "i think", "i feel", "it seems", "seems to", "appear to", "appears to", "would appear", "might",
    "could potentially", "generally", "typically", "in some cases", "to some extent", "a number of",
    "various", "several", "significant", "considerably", "relatively", "at this juncture", "currently"];

  var TELLS = ["delve", "in today's fast-paced", "it's worth noting", "it is worth noting", "leverage",
    "leveraging", "seamless", "seamlessly", "robust", "tapestry", "landscape", "underscores", "furthermore",
    "moreover", "in conclusion", "navigate the complexities", "game-changer", "unlock", "elevate",
    "streamline", "holistic", "synergy", "utilise", "utilize", "plethora", "myriad", "pivotal",
    "testament to", "dive deep", "at the end of the day", "reach out and share", "do not hesitate",
    "please do not hesitate", "necessitates", "facilitate", "commencement", "in the region of"];

  function words(t) { return (t.toLowerCase().match(/[a-z']+/g) || []); }

  function sentences(t) {
    return t.split(/(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 1; });
  }

  function syllables(w) {
    w = w.toLowerCase().replace(/[^a-z]/g, "");
    if (w.length <= 3) return 1;
    w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
    var m = w.match(/[aeiouy]{1,2}/g);
    return m ? m.length : 1;
  }

  function countPhrases(t, list) {
    var low = " " + t.toLowerCase().replace(/[^a-z' ]/g, " ").replace(/\s+/g, " ") + " ";
    var n = 0, hits = [];
    list.forEach(function (p) {
      var idx = 0, needle = " " + p + " ";
      while ((idx = low.indexOf(needle, idx)) !== -1) { n++; if (hits.indexOf(p) === -1) hits.push(p); idx += needle.length - 1; }
    });
    return { n: n, hits: hits };
  }

  var PASSIVE = /\b(is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|known|given|taken|made|seen|done|shown|held|built|written|sent|found|granted|understood|estimated|required|appreciated|anticipated)\b/gi;
  var NOMINAL = /\b\w{4,}(tion|sion|ment|ance|ence|ity|isation|ization)s?\b/gi;
  /* concrete everyday nouns that happen to carry an abstract ending - not the habit we are teaching */
  var NOMINAL_OK = ["education", "institution", "institutions", "evidence", "information", "question",
    "questions", "decision", "decisions", "attention", "version", "section", "condition", "position",
    "addition", "tradition", "audience", "reference", "conference", "difference", "experience", "sentence",
    "quality", "community", "opportunity", "security", "priority", "majority", "minority", "city",
    "university", "universities", "duration", "conversations", "conversation"];

  /* band: 1 when v <= good, 0 when v >= bad, linear between */
  function band(v, good, bad) {
    if (v <= good) return 1;
    if (v >= bad) return 0;
    return 1 - (v - good) / (bad - good);
  }

  function measure(text) {
    var W = words(text), S = sentences(text);
    var wc = W.length || 1, sc = S.length || 1;
    var per100 = function (n) { return (n / wc) * 100; };

    var hedge = countPhrases(text, HEDGES);
    var tell = countPhrases(text, TELLS);
    var passives = (text.match(PASSIVE) || []).length;
    var nominals = (text.match(NOMINAL) || []).filter(function (w) {
      return NOMINAL_OK.indexOf(w.toLowerCase()) === -1;
    }).length;

    var lens = S.map(function (s) { return (s.match(/[A-Za-z']+/g) || []).length; });
    var mean = lens.reduce(function (a, b) { return a + b; }, 0) / sc;
    var sd = Math.sqrt(lens.reduce(function (a, b) { return a + Math.pow(b - mean, 2); }, 0) / sc);

    var syl = W.reduce(function (a, w) { return a + syllables(w); }, 0);
    var grade = 0.39 * (wc / sc) + 11.8 * (syl / wc) - 15.59;

    var concrete = S.filter(function (s) {
      if (/\d/.test(s)) return true;
      var caps = s.match(/(?!^)\b[A-Z][a-z]{2,}/g);
      return !!(caps && caps.length);
    }).length;
    var concreteShare = concrete / sc;

    /* sub-scores, each from a real count */
    var sHedge = band(per100(hedge.n), 0.8, 5);
    var sPassive = band(passives / sc, 0.05, 0.5);
    var sRhythm = sd >= 4 ? 1 : sd <= 1.2 ? 0 : (sd - 1.2) / 2.8;
    var sNominal = band(per100(nominals), 2.5, 9);
    var sTell = band(per100(tell.n), 0.3, 3);
    var sGrade = grade <= 11 ? 1 : grade >= 18 ? 0 : 1 - (grade - 11) / 7;
    var sConcrete = concreteShare >= 0.6 ? 1 : concreteShare / 0.6;

    var total = Math.round((sHedge * 0.18 + sPassive * 0.15 + sRhythm * 0.15 + sNominal * 0.12 +
      sTell * 0.15 + sGrade * 0.10 + sConcrete * 0.15) * 100);

    return {
      total: total, wc: wc, sc: sc,
      rows: [
        { k: "Hedges and filler", ok: sHedge > 0.85, pct: sHedge,
          why: hedge.n + " in " + wc + " words (" + per100(hedge.n).toFixed(1) + " per 100)" +
            (hedge.hits.length ? " - " + hedge.hits.slice(0, 4).join(", ") : "") },
        { k: "Passive voice", ok: sPassive > 0.85, pct: sPassive,
          why: passives + " passive construction" + (passives === 1 ? "" : "s") + " across " + sc + " sentences" },
        { k: "Rhythm", ok: sRhythm > 0.85, pct: sRhythm,
          why: "sentence length " + mean.toFixed(0) + " words on average, spread " + sd.toFixed(1) +
            (sd < 5 ? " - too even, the flat-rhythm tell" : " - varied, reads human") },
        { k: "Nominalisations", ok: sNominal > 0.85, pct: sNominal,
          why: nominals + " abstract nouns (" + per100(nominals).toFixed(1) + " per 100 words)" },
        { k: "AI-tell phrases", ok: sTell > 0.85, pct: sTell,
          why: tell.n ? tell.n + " found - " + tell.hits.slice(0, 4).join(", ") : "none found" },
        { k: "Reading grade", ok: sGrade > 0.85, pct: sGrade,
          why: "Flesch-Kincaid grade " + grade.toFixed(1) + (grade > 12 ? " - harder than it needs to be" : " - fine for a work audience") },
        { k: "Specifics", ok: sConcrete > 0.85, pct: sConcrete,
          why: concrete + " of " + sc + " sentences carry a number or a name" }
      ]
    };
  }

  /* ---------- UI ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function scoreClass(n) { return n >= 85 ? "ag-pass" : n >= 60 ? "ag-mid" : "ag-fail"; }

  function keysToObj(list) {
    var o = {};
    LEVERS.forEach(function (l) { o[l.key] = list.indexOf(l.key) !== -1; });
    return o;
  }

  function renderScore(host, res) {
    host.innerHTML = "";
    var big = el("div", "ag-score-big " + scoreClass(res.total));
    big.textContent = "Clarity score " + res.total + " / 100 · " + res.wc + " words, " + res.sc + " sentences";
    host.appendChild(big);
    var tbl = el("div", "ag-score-table");
    res.rows.forEach(function (r) {
      var row = el("div", "ag-score-row " + (r.ok ? "ag-row-pass" : "ag-row-fail"));
      row.appendChild(el("span", "ag-mark", r.ok ? "✓" : "✗"));
      var q = el("span", "ag-q", r.k + " - " + Math.round(r.pct * 100) + "%");
      row.appendChild(q);
      row.appendChild(el("span", "ag-out", r.why));
      tbl.appendChild(row);
    });
    host.appendChild(tbl);
  }

  function buildLab(box) {
    var on = (box.getAttribute("data-levers") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var L = keysToObj(on);

    var bar = el("div", "ag-levers");
    LEVERS.forEach(function (lv) {
      var b = el("button", "ag-lever" + (L[lv.key] ? " ag-on" : "") + (lv.key === "pro" ? " wl-anti" : ""), lv.label);
      b.title = lv.hint;
      b.addEventListener("click", function () {
        L[lv.key] = !L[lv.key];
        b.classList.toggle("ag-on", L[lv.key]);
        paint();
      });
      bar.appendChild(b);
    });
    box.appendChild(bar);

    var brief = el("div", "wl-brief");
    brief.appendChild(el("span", "wl-blabel", "The writing job"));
    brief.appendChild(el("p", null, "An update to Cadence's exec team: the education proposal is slipping, the evidence changed who the buyer is, and one technical assumption is untested. You need a decision on Thursday."));
    box.appendChild(brief);

    var paper = el("div", "wl-paper");
    var chrome = el("div", "wl-chrome");
    chrome.appendChild(el("span", null, "To: exec@cadence"));
    chrome.appendChild(el("span", null, "Subject: Education proposal - decision needed Thursday"));
    paper.appendChild(chrome);
    var body = el("div", "wl-body");
    paper.appendChild(body);
    box.appendChild(paper);

    var host = el("div", "wl-score");
    box.appendChild(host);

    var rail = el("p", "ag-rail");
    rail.textContent = "The drafts are written examples. Every number in the scorecard is computed from the text " +
      "above it - hedge and tell counts, passive hits, sentence-length spread, nominalisation density, a real " +
      "Flesch-Kincaid grade, and the share of sentences carrying something concrete. The passive check is a " +
      "heuristic, so treat its count as a flag rather than a census. Hover a lever to see what it changes.";
    box.appendChild(rail);

    function paint() {
      var t = draftFor(L);
      body.innerHTML = "";
      t.split("\n\n").forEach(function (p) { if (p.trim()) body.appendChild(el("p", null, p.trim())); });
      renderScore(host, measure(t));
    }
    paint();
  }

  function buildLadder(box) {
    var rungs = [
      { t: "“Write an update about the education thing”", set: [] },
      { t: "+ Brief", set: ["brief"] },
      { t: "+ Voice sample", set: ["brief", "voice"] },
      { t: "+ Structure", set: ["brief", "voice", "structure"] },
      { t: "+ Specifics", set: ["brief", "voice", "structure", "specifics"] },
      { t: "+ Cut (shippable)", set: ["brief", "voice", "structure", "specifics", "cut"] },
      { t: "Then “sound more professional” (the anti-lever)", set: ["brief", "voice", "structure", "specifics", "cut", "pro"], anti: true }
    ];
    var tbl = el("div", "ag-score-table wl-ladder");
    var prev = null;
    rungs.forEach(function (r) {
      var res = measure(draftFor(keysToObj(r.set)));
      var row = el("div", "ag-score-row " + (r.anti ? "ag-row-fail" : "ag-row-pass"));
      row.appendChild(el("span", "ag-mark wl-num", r.anti ? "✗" : String(res.total)));
      row.appendChild(el("span", "ag-q", r.t));
      var delta = prev === null ? "baseline" : (res.total - prev >= 0 ? "+" : "") + (res.total - prev) + " points";
      row.appendChild(el("span", "ag-out", res.total + " / 100 - " + delta + " · " + res.wc + " words" +
        (r.anti ? ". Longer, vaguer, worse." : "")));
      tbl.appendChild(row);
      prev = res.total;
    });
    box.appendChild(tbl);
    var rail = el("p", "ag-rail");
    rail.textContent = "Each row is measured in your browser right now by assembling that version of the draft " +
      "and running the same seven checks over it. No number here is hard-coded.";
    box.appendChild(rail);
  }

  function buildOwn(box) {
    var head = el("div", "wl-brief");
    head.appendChild(el("span", "wl-blabel", "Score your own writing"));
    head.appendChild(el("p", null, "Paste anything you have written - an email you sent, a paragraph a model drafted for you, a page of your report. It runs the same seven measures. Nothing leaves your browser."));
    box.appendChild(head);

    var ta = el("textarea", "wl-input");
    ta.setAttribute("rows", "9");
    ta.setAttribute("placeholder", "Paste your text here and the scorecard updates as you type.");
    ta.value = draftFor(keysToObj(["brief", "voice", "structure", "specifics"]));
    box.appendChild(ta);

    var host = el("div", "wl-score");
    box.appendChild(host);

    var rail = el("p", "ag-rail");
    rail.textContent = "Same engine as the lab. A low score is not a verdict on your writing - it is a list of " +
      "specific, checkable habits, and the hedge and tell counts name the exact words. Use it on a draft, not on a finished piece you already like.";
    box.appendChild(rail);

    function paint() { renderScore(host, measure(ta.value || " ")); }
    ta.addEventListener("input", paint);
    paint();
  }

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".wlbox"), function (box) {
      var mode = box.getAttribute("data-mode") || "lab";
      if (mode === "ladder") buildLadder(box);
      else if (mode === "own") buildOwn(box);
      else buildLab(box);
    });
  });

  window.WRITE_LIVE = {
    score: function (list) { return measure(draftFor(keysToObj(list || []))); },
    measure: measure,
    draft: function (list) { return draftFor(keysToObj(list || [])); }
  };
})();
