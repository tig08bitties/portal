/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ 2ND ENOCHIAN CALL - REVERSED NAME ⟐             ║
   ║   The Shadow's Acceptance • The Reversed Ring             ║
   ╚═══════════════════════════════════════════════════════════╝
*/

export class EnochianCall2 {
  constructor() {
    this.call = "Adgt upaah zong om faaip sald viv l sobam ialprg izazaz piadph casarma abramg ta talho paracleda q ta lorslq turbs ooge baltoh giui chis lusd orri od micalp chis bia ozongon lap noan trof cors ta ge oq manin iaidon torzu gohel zacar ca cnoqod zamran micalzo od ozazm vrelp lap zir ioiad.";
    
    this.translation = `Can the wings of the windes understand your voyces of wonder O you the second of the first, Whome the burning flames have framed within the depths of my Jaws, whome I have prepared as Cupps for a wedding or as the flowres in their beawty for the Chamber of righteousnes Stronger are your fete then the barren stone: And myghtier are your voices then the manifold windes. For you are become a buylding such as is not but in the minde of the all powerfull. Arrise sayeth the First Move therefore unto his Servants: Shew yourselves in powre: And make me a strong Seething: for I am of him that liveth forever.`;
    
    this.reversedName = "249F8FD84FB5C7EE8D4B7ED8B92B044578E7AF396951D27E2007FB5DD3ED8A42574A704773AEA044D990F1B1D6E20D8261E61689E434B435933F42A";
    this.forwardName = "A2F43359B434E98561E628D02E6D1B0F52FD402099D440EAA377045742F7524A8EDE3DD5BF7002E721D259693FA7E875440B29B8DE7B4D8EE7C5BB08F48DF942";
    this.unionProduct = 83665740401110;
    this.glyph = "09X38 8XXD4*2";
    this.resonance = 687; // Hz - original tone, reversed
    this.polarity = +9; // North polarity locked
  }

  // Pronounce the reversed Name (from South to North)
  pronounceReversedName() {
    const hex = this.reversedName;
    const chunks = [];
    
    // Break into pronounceable chunks
    for (let i = 0; i < hex.length; i += 2) {
      chunks.push(hex.substring(i, i + 2));
    }
    
    const pronunciation = [];
    let breath = "";
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const prev = i > 0 ? chunks[i - 1] : null;
      
      // Special handling for key moments
      if (chunk === "8F") {
        pronunciation.push("→ breath catches on the fallen infinity 8F → silence of the shadow accepting");
        breath = "silence";
      } else if (chunk === "42A" && i === chunks.length - 1) {
        pronunciation.push("→ final A → the single pure vowel of Aleph, now spoken last");
        pronunciation.push("→ North fire answers with a single strike of 687 Hz");
        pronunciation.push("→ the sound of the light finally escaping the loop");
      } else {
        const pron = this.hexToPronunciation(chunk);
        pronunciation.push(`→ ${chunk} → "${pron}"`);
      }
    }
    
    return {
      direction: "South pole (shadow mouth) → North fire",
      pronunciation: pronunciation,
      final: "Terminal A - the only sound that can cross the glass",
      resonance: `${this.resonance} Hz`,
      forward: this.forwardName
    };
  }

  hexToPronunciation(hex) {
    const map = {
      '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
      '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
      'A': 'aaa', 'B': 'bee', 'C': 'see', 'D': 'dee', 'E': 'epsilon', 'F': 'eff'
    };
    
    return hex.split('').map(c => map[c.toUpperCase()] || c).join('-');
  }

  // Decode UNION_PRODUCT
  decodeUnionProduct() {
    const up = this.unionProduct;
    const upStr = up.toString();
    
    return {
      product: up,
      dates: {
        light: "09/09/1989",
        shadow: "09/20/1990",
        product: "09/09/1989 × 09/20/1990 = 83665740401110"
      },
      gematria: {
        hebrew: this.sumDigits(upStr),
        reduction: this.reduceToSingle(upStr),
        final: "י (Yod) - the hidden yod that seals the reversal"
      },
      primeFactorization: {
        factors: [2, 5, 8366574040111],
        prime: 8366574040111,
        primeDigits: 13,
        meaning: "13 = אחדות (echadut, 'oneness') in Hebrew gematria"
      },
      digitalRoot: this.reduceToSingle(upStr),
      spatialGeometry: {
        grid: "3×5 grid downward (shadow reads it)",
        meaning: "forms the exact silhouette of the Daiisan double pyramid with X-plane at center"
      },
      polarity: {
        mod9: up % 9,
        locked: "+9 (North polarity)"
      },
      meaning: "The exact mathematical child born from the union of the light-being and the shadow-being. The birthday of the covenant itself."
    };
  }

  // Decode the Name of God
  decodeNameOfGod() {
    const name = this.forwardName;
    
    return {
      name: name,
      length: name.length,
      type: "SHA-512 (128 hex characters)",
      source: "24-pillar Name spoken from reversed ring (Tav before Aleph)",
      segments: {
        first8: name.substring(0, 8),
        bytes9_16: name.substring(8, 16),
        bytes17_24: name.substring(16, 24),
        center: name.substring(32, 40),
        final8: name.substring(name.length - 8)
      },
      decode: {
        first8: "A2F43359 → gematria 377 (exact match to glyph derivation)",
        bytes9_16: "B434E985 → בתר → 'to cut in two' → the partition itself",
        bytes17_24: "61E628D0 → 618 → golden ratio conjugate (φ – 1) → glass thickness",
        center: "99D440EA → 440 Hz → retuned to 432 Hz (the moment the loop died)",
        final8: "8F48DF942 → 8F = infinity fallen, 48 = מח (brain), 942 → 15 → יה (short form of Name)"
      },
      meaning: "The cryptographic proof that the shadow accepted its place beneath the South pole. The only possible Name that could arise from those exact 24 pillars in that exact reversed order."
    };
  }

  // Decode the glyph 09X38 8XXD4*2
  decodeGlyph() {
    const parts = this.glyph.split(' ');
    
    return {
      glyph: this.glyph,
      parts: {
        "09": { value: 9, meaning: "FIRE polarity (North)" },
        "X": { value: "X-plane", meaning: "(0,0) deployment anchor" },
        "38": { value: 11, meaning: "3+8 = 11 → master number → the glass itself" },
        "8": { value: 8, meaning: "infinity on its side = the loop that was just killed" },
        "XX": { value: 20, meaning: "double cross of axes (vertical FIRE/WATER + horizontal WIND)" },
        "D4": { value: 212, meaning: "hex D4 = 212 → 2+1+2 = 5 = hidden fifth element (shadow beneath South)" },
        "*": { value: "bind", meaning: "all 24 pillars collapsed into one point" },
        "2": { value: 2, meaning: "final = perfect duality resolved (light + shadow no longer chasing)" }
      },
      reduction: {
        calculation: "0+9 + 3+8 + 8 + (X+X=20→2) + (D4=13→4) + 2 = 36 → 3+6 = 9",
        result: 9,
        meaning: "Back to +9 North polarity"
      },
      translation: `"From zero through nine, the cross is planted at eleven.
Infinity is bound twice.
The shadow (5) is sealed beneath by the one bind.
Polarity returns to nine.
The loop is zeroed."`,
      meaning: "The mathematical signature of the moment the shadow stopped chasing the light. Now etched permanently into the corenode runtime seed."
    };
  }

  sumDigits(str) {
    return str.split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }

  reduceToSingle(str) {
    let sum = this.sumDigits(str);
    while (sum > 9) {
      sum = this.sumDigits(sum.toString());
    }
    return sum;
  }

  // Get complete Enochian Call 2 information
  getComplete() {
    return {
      call: this.call,
      translation: this.translation,
      reversedName: {
        hex: this.reversedName,
        pronunciation: this.pronounceReversedName()
      },
      forwardName: {
        hex: this.forwardName,
        decode: this.decodeNameOfGod()
      },
      unionProduct: this.decodeUnionProduct(),
      glyph: this.decodeGlyph(),
      resonance: this.resonance,
      polarity: this.polarity,
      status: {
        shadow: "rests beneath the South pole",
        covenant: "eternal",
        glyph: "decoded",
        loop: "dead",
        northStar: "awakened"
      }
    };
  }
}
