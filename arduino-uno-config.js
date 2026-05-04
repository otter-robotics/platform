// ─────────────────────────────────────────────────────────────
//  Arduino UNO — Component Config
//  Image: arduino-sim1.png (1524×1234 → display 480×389)
//  Pin positions manually calibrated to match physical holes
// ─────────────────────────────────────────────────────────────

const ARDUINO_UNO_CONFIG = {
  name: 'Arduino UNO',
  image: 'arduino-sim1.png',
  width: 480,
  height: 389,

  // TOP header (ly = 23)
  // Order: SDA, SCL, AREF, GND, D13..D8, D7..D0, TX, RX
  topPins: [
    {id:'SDA',  label:'SDA',   lx:138, ly:23, type:'other'},
    {id:'SCL',  label:'SCL',   lx:155, ly:23, type:'other'},
    {id:'AREF', label:'AREF',  lx:174, ly:23, type:'other'},
    {id:'TGND', label:'GND',   lx:192, ly:23, type:'gnd'},
    {id:'D13',  label:'~13',   lx:210, ly:23, type:'digital'},
    {id:'D12',  label:'12',    lx:228, ly:23, type:'digital'},
    {id:'D11',  label:'~11',   lx:247, ly:23, type:'digital'},
    {id:'D10',  label:'~10',   lx:265, ly:23, type:'digital'},
    {id:'D9',   label:'~9',    lx:283, ly:23, type:'digital'},
    {id:'D8',   label:'8',     lx:301, ly:23, type:'digital'},
    // gap between D8 and D7
    {id:'D7',   label:'7',     lx:331, ly:23, type:'digital'},
    {id:'D6',   label:'~6',    lx:349, ly:23, type:'digital'},
    {id:'D5',   label:'~5',    lx:367, ly:23, type:'digital'},
    {id:'D4',   label:'4',     lx:385, ly:23, type:'digital'},
    {id:'D3',   label:'~3',    lx:403, ly:23, type:'digital'},
    {id:'D2',   label:'2',     lx:421, ly:23, type:'digital'},
    {id:'D1',   label:'TX→1',  lx:440, ly:23, type:'serial'},
    {id:'D0',   label:'RX←0',  lx:458, ly:23, type:'serial'},
  ],

  // BOTTOM header (ly = 369)
  // Power section
  powerPins: [
    {id:'IOREF', label:'IOREF', lx:223, ly:369, type:'other'},
    {id:'RST',   label:'RST',   lx:240, ly:369, type:'other'},
    {id:'P3V3',  label:'3.3V',  lx:258, ly:369, type:'pwr33'},
    {id:'P5V',   label:'5V',    lx:276, ly:369, type:'pwr5'},
    {id:'GND1',  label:'GND',   lx:294, ly:369, type:'gnd'},
    {id:'GND2',  label:'GND',   lx:312, ly:369, type:'gnd'},
    {id:'VIN',   label:'Vin',   lx:331, ly:369, type:'vin'},
  ],

  // Analog section
  analogPins: [
    {id:'A0', label:'A0', lx:367, ly:369, type:'analog'},
    {id:'A1', label:'A1', lx:383, ly:369, type:'analog'},
    {id:'A2', label:'A2', lx:402, ly:369, type:'analog'},
    {id:'A3', label:'A3', lx:420, ly:369, type:'analog'},
    {id:'A4', label:'A4', lx:438, ly:369, type:'analog'},
    {id:'A5', label:'A5', lx:456, ly:369, type:'analog'},
  ],

  // LED overlay positions (for simulation)
  leds: {
    l:  {cx:230, cy:167, r:7,  fill:'#22c55e'},
    tx: {cx:133, cy:248, r:5,  fill:'#ef4444'},
    rx: {cx:133, cy:266, r:5,  fill:'#f97316'},
    on: {cx:444, cy:200, r:5,  fill:'#22c55e'},
  },
};
