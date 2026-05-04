// ─────────────────────────────────────────────────────────────
//  Breadboard — Component Config
//  Image: breadboard.png (1794×1142 → display 480×306)
//  Pin positions pixel-accurate from image analysis
//  Physical connectivity:
//    - Rows a–e (col N) → all tied vertically (bottom section)
//    - Rows f–j (col N) → all tied vertically (top section)
//    - Top +rail (ppt1–ppt30) → one net
//    - Top −rail (pmt1–pmt30) → one net
//    - Bottom −rail (pmb1–pmb30) → one net
//    - Bottom +rail (ppb1–ppb30) → one net
// ─────────────────────────────────────────────────────────────

const BREADBOARD_CONFIG = {
  name: 'Breadboard',
  image: 'breadboard.png',
  width: 480,
  height: 306,

  // 30 columns, spacing 14px, first column at x=40
  colX: Array.from({length: 30}, (_, i) => 40 + i * 14),

  // Top power rails
  topPowerRails: [
    { id: 'pmt', label: '−', ly: 21, type: 'gnd'  },  // top minus
    { id: 'ppt', label: '+', ly: 35, type: 'pwr5' },  // top plus
  ],

  // Top main section — rows j, i, h, g, f
  topRows: [
    { r: 'j', ly: 76  },
    { r: 'i', ly: 90  },
    { r: 'h', ly: 104 },
    { r: 'g', ly: 118 },
    { r: 'f', ly: 132 },
  ],

  // Bottom main section — rows e, d, c, b, a
  botRows: [
    { r: 'e', ly: 174 },
    { r: 'd', ly: 188 },
    { r: 'c', ly: 201 },
    { r: 'b', ly: 215 },
    { r: 'a', ly: 229 },
  ],

  // Bottom power rails
  botPowerRails: [
    { id: 'pmb', label: '−', ly: 271, type: 'gnd'  },  // bottom minus
    { id: 'ppb', label: '+', ly: 286, type: 'pwr5' },  // bottom plus
  ],

  // Connectivity rules
  // group key format: col_top_N (rows f–j), col_bot_N (rows a–e),
  //                   rail_plus_top, rail_minus_top, rail_plus_bot, rail_minus_bot
  groupKey(pinId) {
    if (/^ppt\d+$/.test(pinId)) return 'rail_plus_top';
    if (/^pmt\d+$/.test(pinId)) return 'rail_minus_top';
    if (/^ppb\d+$/.test(pinId)) return 'rail_plus_bot';
    if (/^pmb\d+$/.test(pinId)) return 'rail_minus_bot';
    const m = pinId.match(/^([a-j])(\d+)$/);
    if (m) {
      const section = 'abcde'.includes(m[1]) ? 'bot' : 'top';
      return `col_${section}_${m[2]}`;
    }
    return null;
  },
};
