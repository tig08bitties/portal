/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ ROSETTA STONE - MULTI-LINGUAL TRANSLATOR ⟐      ║
   ║   Ancient Scripts • Covenant Translation • Eternal Cycle   ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export class RosettaStone {
  constructor(opts = {}) {
    this.yamlPath = opts.yamlPath || join(dirname(fileURLToPath(import.meta.url)), 'covenant-eternal-cycle.yaml');
    this.statement = "There is nothing new under the sun. That which was will be, and that will be was when the end finds its beginning.";
    this.yamlAvailable = null;
    
    // Try to load from YAML, fallback to hardcoded
    try {
      if (opts.loadFromYAML !== false) {
        this.pillars = this.loadFromYAML();
      } else {
        this.pillars = this.initializePillars();
      }
    } catch (err) {
      // YAML load failed, use hardcoded
      this.pillars = this.initializePillars();
    }
    
    this.scripts = ['LATIN', 'GREEK_DEMOTIC', 'ARAMAIC', 'EGYPTIAN_HIEROGLYPHS', 'ELDER_FUTHARK', 'ENOCHIAN'];
  }

  async loadYAMLParser() {
    if (this.yamlAvailable !== null) {
      return this.yamlAvailable;
    }
    
    try {
      const yamlModule = await import('js-yaml');
      this.yamlAvailable = yamlModule;
      return yamlModule;
    } catch (e) {
      this.yamlAvailable = false;
      return false;
    }
  }

  loadFromYAML() {
    // YAML loading is available but requires async import
    // For now, we use hardcoded data which is always available
    // The YAML file exists for human readability and editing
    // Future enhancement: async YAML loading
    throw new Error('YAML loading requires async import - using hardcoded data');
  }

  initializePillars() {
    return {
      PILLAR_I: {
        TITLE: "I. THE PREMISE: The Constancy",
        ENGLISH_CORE: "There is nothing new under the sun.",
        LATIN: {
          SCRIPT: "LATIN",
          TEXT: "NIHIL EST NOVUM SUB SOLE.",
          TRANSLATION: "Nothing is new under the sun."
        },
        GREEK_DEMOTIC: {
          SCRIPT: "Demotic Greek",
          TEXT: "Δεν υπάρχει τίποτα καινούργιο κάτω από τον ήλιο.",
          TRANSLITERATION: "Den ypárchei típota kainoúrgio káto apó ton ílio."
        },
        ARAMAIC: {
          SCRIPT: "Square Aramaic (Right-to-Left)",
          TEXT: "וְלֵית כָּל חֲדַת תְּחוֹת שִׁמְשָׁא.",
          TRANSLITERATION: "V'leit kol ḥădaṯ t'ḥoṯ šimšā."
        },
        EGYPTIAN_HIEROGLYPHS: {
          SCRIPT: "Middle Egyptian (Conceptual)",
          GLYPH: "𓈖𓈖 𓅱𓈖 𓐙𓂋 𓇳",
          GLOSS: "nn wn mꜣw ḫr Rꜥ",
          MEANING: "There is no new thing beneath the Sun (Ra)."
        },
        ELDER_FUTHARK: {
          SCRIPT: "Runes (Phonetic)",
          RUNES: "ᚦᛖᚱᛁᛋ ᚾᛟᚦᛁᚾᚷ ᚾᛁᚢ ᚢᚾᛞᛖᚱ ᚦᛖ ᛋᚢᚾ."
        },
        ENOCHIAN: {
          SCRIPT: "Enochian (Conceptual)",
          GLYPH: "𝕬𝖔𝖚𝖗 𝖄𝖉.",
          GLOSS: "AOUR YD",
          MEANING: "Sun/Light are."
        }
      },
      PILLAR_II: {
        TITLE: "II. THE MECHANISM: The Recurrence",
        ENGLISH_CORE: "That which was will be, and that will be was",
        LATIN: {
          SCRIPT: "LATIN",
          TEXT: "QUOD FUIT, ID FUTURUM EST, ET QUOD FUTURUM EST, ID FUIT.",
          TRANSLATION: "That which was, the same shall be, and that which shall be, the same was."
        },
        GREEK_DEMOTIC: {
          SCRIPT: "Demotic Greek",
          TEXT: "Αυτό που ήταν θα είναι, και αυτό που θα είναι ήταν,",
          TRANSLITERATION: "Aftó pou ítan tha eínai, kai aftó pou tha eínai ítan,"
        },
        ARAMAIC: {
          SCRIPT: "Square Aramaic (Right-to-Left)",
          TEXT: "דִי הֲוָה יְהֵי, וְדִי יְהֵי הֲוָה,",
          TRANSLITERATION: "Di haṿā yehei, w'di yehei haṿā,"
        },
        EGYPTIAN_HIEROGLYPHS: {
          SCRIPT: "Middle Egyptian (Conceptual)",
          GLYPH: "𓄤 𓂋 𓎡𓊪𓂋 𓂋 𓄤",
          GLOSS: "nfr r ḫpr r nfr",
          MEANING: "The Completed (Past) becomes the Coming-into-Being (Future) becomes the Completed."
        },
        ELDER_FUTHARK: {
          SCRIPT: "Runes (Phonetic)",
          RUNES: "ᛏᚺᚨᛏ ᚹᚨᛋ ᚹᛁᛚ ᛒᛖ, ᚨᚾᛞ ᚹᚺᚨᛏ ᚹᛁᛚ ᛒᛖ ᚹᚨᛋ"
        },
        ENOCHIAN: {
          SCRIPT: "Enochian (Conceptual)",
          GLYPH: "𝕲𝖊𝖍 𝕭𝖑𝖆𝖓𝖘.",
          GLOSS: "GEH BLANS",
          MEANING: "This thing repeats." // Recurrence/Mirroring
        }
      },
      PILLAR_III: {
        TITLE: "III. THE SYNTHESIS: The Unity",
        ENGLISH_CORE: "when the end finds its beginning.",
        LATIN: {
          SCRIPT: "LATIN",
          TEXT: "UBI FINIS PRINCIPIUM SUUM INVENIT.",
          TRANSLATION: "where the end finds its beginning."
        },
        GREEK_DEMOTIC: {
          SCRIPT: "Demotic Greek",
          TEXT: "όταν το τέλος βρίσκει την αρχή του.",
          TRANSLITERATION: "ótan to télos vrískei tin archí tou."
        },
        ARAMAIC: {
          SCRIPT: "Square Aramaic (Right-to-Left)",
          TEXT: "כַּד סוֹפָא יְהַשְׁכַּח רֵישֵׁיהּ.",
          TRANSLITERATION: "Kaḏ sōfā yehaššaḵ rešēh."
        },
        EGYPTIAN_HIEROGLYPHS: {
          SCRIPT: "Middle Egyptian (Conceptual)",
          GLYPH: "𓈖𓎟𓎟𓊹𓏏",
          GLOSS: "nḥḥ",
          MEANING: "Neheh (Eternal, Cyclical, Repeating Time)."
        },
        ELDER_FUTHARK: {
          SCRIPT: "Runes (Phonetic)",
          RUNES: "ᚹᛖᚾ ᛏᚺᛖ ᛖᚾᛞ ᚠᛁᚾᛞᛋ ᛁᛏᛋ ᛒᛖᚷᛁᚾᛁᚾᚷ."
        },
        ENOCHIAN: {
          SCRIPT: "Enochian (Conceptual)",
          GLYPH: "𝖅𝖎𝖗 𝕲𝖒 𝕻𝖗𝖌.",
          GLOSS: "ZIR GM PRG",
          MEANING: "End finds Beginning."
        }
      }
    };
  }

  // Translate a pillar to a specific script
  translatePillar(pillarName, script) {
    const pillar = this.pillars[pillarName];
    if (!pillar) {
      return { error: `Pillar ${pillarName} not found` };
    }

    const translation = pillar[script];
    if (!translation) {
      return { error: `Script ${script} not found for pillar ${pillarName}` };
    }

    return {
      pillar: pillar.TITLE,
      english: pillar.ENGLISH_CORE,
      script: translation.SCRIPT,
      text: translation.TEXT || translation.GLYPH || translation.RUNES,
      transliteration: translation.TRANSLITERATION,
      translation: translation.TRANSLATION,
      gloss: translation.GLOSS,
      meaning: translation.MEANING
    };
  }

  // Get all translations for a pillar
  getAllTranslations(pillarName) {
    const pillar = this.pillars[pillarName];
    if (!pillar) {
      return { error: `Pillar ${pillarName} not found` };
    }

    const translations = {};
    for (const script of this.scripts) {
      if (pillar[script]) {
        translations[script] = {
          script: pillar[script].SCRIPT,
          text: pillar[script].TEXT || pillar[script].GLYPH || pillar[script].RUNES,
          transliteration: pillar[script].TRANSLITERATION,
          translation: pillar[script].TRANSLATION,
          gloss: pillar[script].GLOSS,
          meaning: pillar[script].MEANING
        };
      }
    }

    return {
      pillar: pillar.TITLE,
      english: pillar.ENGLISH_CORE,
      translations
    };
  }

  // Get complete covenant in a specific script
  getCovenantInScript(script) {
    const result = {
      statement: this.statement,
      script: script,
      pillars: {}
    };

    for (const pillarName of Object.keys(this.pillars)) {
      const translation = this.translatePillar(pillarName, script);
      if (!translation.error) {
        result.pillars[pillarName] = translation;
      }
    }

    return result;
  }

  // Get all scripts for comparison
  compareAllScripts() {
    const comparison = {
      statement: this.statement,
      pillars: {}
    };

    for (const pillarName of Object.keys(this.pillars)) {
      comparison.pillars[pillarName] = this.getAllTranslations(pillarName);
    }

    return comparison;
  }

  // Search for text across all scripts
  search(text) {
    const results = [];
    const searchLower = text.toLowerCase();

    for (const [pillarName, pillar] of Object.entries(this.pillars)) {
      // Check English
      if (pillar.ENGLISH_CORE.toLowerCase().includes(searchLower)) {
        results.push({
          pillar: pillarName,
          match: 'ENGLISH_CORE',
          text: pillar.ENGLISH_CORE
        });
      }

      // Check all scripts
      for (const script of this.scripts) {
        if (pillar[script]) {
          const scriptText = pillar[script].TEXT || pillar[script].GLYPH || pillar[script].RUNES || '';
          const transliteration = pillar[script].TRANSLITERATION || '';
          const translation = pillar[script].TRANSLATION || '';
          
          if (scriptText.toLowerCase().includes(searchLower) ||
              transliteration.toLowerCase().includes(searchLower) ||
              translation.toLowerCase().includes(searchLower)) {
            results.push({
              pillar: pillarName,
              script: script,
              match: scriptText,
              transliteration,
              translation
            });
          }
        }
      }
    }

    return results;
  }

  // Get formatted display of a pillar
  formatPillar(pillarName) {
    const pillar = this.pillars[pillarName];
    if (!pillar) {
      return `Pillar ${pillarName} not found`;
    }

    let output = `\n${pillar.TITLE}\n`;
    output += `${'═'.repeat(70)}\n`;
    output += `English: ${pillar.ENGLISH_CORE}\n\n`;

    for (const script of this.scripts) {
      if (pillar[script]) {
        const s = pillar[script];
        output += `${s.SCRIPT}:\n`;
        output += `  Text: ${s.TEXT || s.GLYPH || s.RUNES}\n`;
        if (s.TRANSLITERATION) output += `  Transliteration: ${s.TRANSLITERATION}\n`;
        if (s.TRANSLATION) output += `  Translation: ${s.TRANSLATION}\n`;
        if (s.GLOSS) output += `  Gloss: ${s.GLOSS}\n`;
        if (s.MEANING) output += `  Meaning: ${s.MEANING}\n`;
        output += '\n';
      }
    }

    return output;
  }

  // Get the complete covenant formatted
  formatCompleteCovenant() {
    let output = '\n╔═══════════════════════════════════════════════════════════╗\n';
    output += '║        ⟐ THE ETERNAL CYCLE - ROSETTA STONE ⟐              ║\n';
    output += '╚═══════════════════════════════════════════════════════════╝\n\n';
    output += `Statement: "${this.statement}"\n\n`;

    for (const pillarName of Object.keys(this.pillars)) {
      output += this.formatPillar(pillarName);
      output += '\n';
    }

    output += '╔═══════════════════════════════════════════════════════════╗\n';
    output += '║                    C O M P L E T E                       ║\n';
    output += '╚═══════════════════════════════════════════════════════════╝\n';

    return output;
  }

  // Format as table structure (matching the presentation format)
  formatAsTable() {
    const pillarNames = ['PILLAR_I', 'PILLAR_II', 'PILLAR_III'];
    const pillarTitles = pillarNames.map(p => this.pillars[p].TITLE);
    const philosophicalMeanings = [
      'The constancy of the cosmic order.',
      'The engine of eternal recurrence.',
      'The paradoxical moment of unity/rebirth.'
    ];

    let output = '\n╔════════════════════════════════════════════════════════════════════════╗\n';
    output += '║        THE ETERNAL SEQUENCE: A TRUTH ALIGNMENT                        ║\n';
    output += '╚════════════════════════════════════════════════════════════════════════╝\n\n';

    // Philosophical meanings table
    output += '| Pillar | Philosophical Meaning |\n';
    output += '| :--- | :--- |\n';
    for (let i = 0; i < pillarNames.length; i++) {
      output += `| **${pillarTitles[i]}** | **${this.pillars[pillarNames[i]].ENGLISH_CORE}** (${philosophicalMeanings[i]}) |\n`;
    }
    output += '\n';

    // 1. LATIN Table
    output += '### 1. LATIN English & Classical Latin (The Foundation)\n\n';
    output += '| Language / Script | I. THE PREMISE | II. THE MECHANISM | III. THE SYNTHESIS |\n';
    output += '| :--- | :--- | :--- | :--- |\n';
    output += `| **LATIN English** | **${this.pillars.PILLAR_I.ENGLISH_CORE.toUpperCase()}** | **${this.pillars.PILLAR_II.ENGLISH_CORE.toUpperCase()}** | **${this.pillars.PILLAR_III.ENGLISH_CORE.toUpperCase()}** |\n`;
    output += `| **Classical Latin** | **${this.pillars.PILLAR_I.LATIN.TEXT}** | **${this.pillars.PILLAR_II.LATIN.TEXT}** | **${this.pillars.PILLAR_III.LATIN.TEXT}** |\n\n`;

    // 2. Greek & Aramaic Table
    output += '### 2. Greek (Demotic) & Aramaic (The Ancient Lineage)\n\n';
    output += '| Language / Script | I. THE PREMISE | II. THE MECHANISM | III. THE SYNTHESIS |\n';
    output += '| :--- | :--- | :--- | :--- |\n';
    output += `| **Demotic Greek** | **${this.pillars.PILLAR_I.GREEK_DEMOTIC.TEXT}** | **${this.pillars.PILLAR_II.GREEK_DEMOTIC.TEXT}** | **${this.pillars.PILLAR_III.GREEK_DEMOTIC.TEXT}** |\n`;
    output += `| **Aramaic** (Square Script) | **${this.pillars.PILLAR_I.ARAMAIC.TEXT}** | **${this.pillars.PILLAR_II.ARAMAIC.TEXT}** | **${this.pillars.PILLAR_III.ARAMAIC.TEXT}** |\n`;
    output += `| **Aramaic Translit.** | *${this.pillars.PILLAR_I.ARAMAIC.TRANSLITERATION}* | *${this.pillars.PILLAR_II.ARAMAIC.TRANSLITERATION}* | *${this.pillars.PILLAR_III.ARAMAIC.TRANSLITERATION}* |\n\n`;

    // 3. Egyptian Hieroglyphs & Enochian Table
    output += '### 3. Egyptian Hieroglyphs & Enochian (The Cosmological Code)\n\n';
    output += '| Concept / Script | I. THE PREMISE (The Light) | II. THE MECHANISM (The Recurrence) | III. THE SYNTHESIS (Eternal Time) |\n';
    output += '| :--- | :--- | :--- | :--- |\n';
    output += `| **Egyptian Hieroglyphs** | **${this.pillars.PILLAR_I.EGYPTIAN_HIEROGLYPHS.GLYPH}** | **${this.pillars.PILLAR_II.EGYPTIAN_HIEROGLYPHS.GLYPH}** | **${this.pillars.PILLAR_III.EGYPTIAN_HIEROGLYPHS.GLYPH}** |\n`;
    output += `| **Conceptual Gloss** | *${this.pillars.PILLAR_I.EGYPTIAN_HIEROGLYPHS.MEANING}* | *${this.pillars.PILLAR_II.EGYPTIAN_HIEROGLYPHS.MEANING}* | *${this.pillars.PILLAR_III.EGYPTIAN_HIEROGLYPHS.MEANING}* |\n`;
    output += `| **Enochian Script** | **${this.pillars.PILLAR_I.ENOCHIAN.GLYPH}** | **${this.pillars.PILLAR_II.ENOCHIAN.GLYPH}** | **${this.pillars.PILLAR_III.ENOCHIAN.GLYPH}** |\n`;
    output += `| **Enochian Translit.** | *${this.pillars.PILLAR_I.ENOCHIAN.GLOSS}* | *${this.pillars.PILLAR_II.ENOCHIAN.GLOSS}* | *${this.pillars.PILLAR_III.ENOCHIAN.GLOSS}* |\n\n`;

    // 4. Elder Futhark Table
    output += '### 4. Elder Futhark (The Resonance)\n\n';
    output += '| Category | I. THE PREMISE | II. THE MECHANISM | III. THE SYNTHESIS |\n';
    output += '| :--- | :--- | :--- | :--- |\n';
    output += `| **Elder Futhark** (Runes) | **${this.pillars.PILLAR_I.ELDER_FUTHARK.RUNES}** | **${this.pillars.PILLAR_II.ELDER_FUTHARK.RUNES}** | **${this.pillars.PILLAR_III.ELDER_FUTHARK.RUNES}** |\n\n`;

    output += '╔════════════════════════════════════════════════════════════════════════╗\n';
    output += '║                    THE ETERNAL SEQUENCE COMPLETE                      ║\n';
    output += '╚════════════════════════════════════════════════════════════════════════╝\n';

    return output;
  }

  // Get philosophical meanings
  getPhilosophicalMeanings() {
    return {
      PILLAR_I: {
        title: this.pillars.PILLAR_I.TITLE,
        english: this.pillars.PILLAR_I.ENGLISH_CORE,
        meaning: 'The constancy of the cosmic order.'
      },
      PILLAR_II: {
        title: this.pillars.PILLAR_II.TITLE,
        english: this.pillars.PILLAR_II.ENGLISH_CORE,
        meaning: 'The engine of eternal recurrence.'
      },
      PILLAR_III: {
        title: this.pillars.PILLAR_III.TITLE,
        english: this.pillars.PILLAR_III.ENGLISH_CORE,
        meaning: 'The paradoxical moment of unity/rebirth.'
      }
    };
  }
}
