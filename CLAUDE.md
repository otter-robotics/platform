# Otter Robotics — CLAUDE.md

Полная документация проекта для Claude. Читай этот файл в начале каждой сессии.

---

## Структура проекта

```
OtterRobotics/
├── platforma.html          ← Главная платформа (Duolingo-стиль, Firebase)
├── landing.html            ← Лендинг
├── AuthOtter.html          ← Страница авторизации
├── otter_logo.png          ← Логотип (используется во всех страницах)
├── arduino-sim1.png        ← Изображение Arduino UNO для симулятора
├── breadboard.png          ← Изображение breadboard для симулятора
├── arduino-uno-config.js   ← (не используется активно)
├── breadboard-config.js    ← (не используется активно)
├── Lesson-1/
│   ├── index.html          ← Урок 1: Мигающий LED (Blink)
│   ├── quiz-lesson1.html   ← Тест урока 1
│   └── simulator.html      ← Симулятор урока 1
├── Lesson-2/
│   ├── index.html          ← Урок 2: LED с резистором
│   ├── quiz-lesson2.html   ← Тест урока 2
│   └── simulator.html      ← Симулятор урока 2
├── Lesson-3/
│   ├── index.html          ← Урок 3: Кнопка управляет светодиодом
│   ├── quiz-lesson3.html   ← Тест урока 3
│   └── simulator.html      ← Симулятор урока 3
└── Final/                  ← Архивные версии (не трогать)
```

---

## Дизайн-система

### Цвета (используются везде одинаково)
| Переменная / hex | Назначение |
|---|---|
| `#3A86FF` | Основной синий (кнопки, акценты) |
| `#1D4ED8` | Тень синей кнопки (box-shadow) |
| `#2563EB` | Hover синей кнопки |
| `#8B5CF6` | Фиолетовый (прогресс, decorative) |
| `#06D6A0` | Зелёный (правильный ответ, успех) |
| `#EF4444` | Красный (ошибка, удаление) |
| `#F59E0B` / `#FFB703` | Золото (баллы, звёзды) |
| `#1E293B` | Основной тёмный текст |
| `#64748B` | Серый текст (subtext) |
| `#94A3B8` | Светло-серый (labels) |
| `#E2E8F0` | Граница / разделитель |
| `#F0F4FF` | Фон страниц урока/квиза |
| `#1a1a2e` | Фон симулятора (тёмно-синий) |
| `#16213e` | Правая панель симулятора |
| `#0f172a` | Карточки компонентов |

### Шрифты
- **Nunito** (400/600/700/800/900) — весь UI
- **Fira Code** (400/500) — редактор кода в симуляторе

### Border-radius
- Карточки/страницы: `14px–24px`
- Кнопки: `12px–14px`
- Чипы/теги: `8px–20px`
- Логотип: `10px–11px`

### Кнопки (стандартный стиль)
```css
background: #3A86FF; color: #fff; border: none;
border-radius: 12px; padding: 0 32px; height: 48px;
font-family: 'Nunito'; font-size: 15px; font-weight: 800;
box-shadow: 0 4px 0 #1D4ED8; cursor: pointer;
transition: all .2s;
/* hover: */ background: #2563EB; transform: translateY(-1px);
```

---

## platforma.html — Главная платформа

### Технологии
- Firebase Auth (Google Sign-In)
- Firebase Firestore — хранение данных пользователя
- Firebase CDN: `https://www.gstatic.com/firebasejs/10.12.2/`

### Firebase конфиг
```javascript
firebase.initializeApp({
  apiKey: "...",
  authDomain: "otterarduino.firebaseapp.com",
  projectId: "otterarduino",
  storageBucket: "otterarduino.firebasestorage.app",
  // ...
});
```

### Структура данных пользователя (Firestore: collection `users`, doc = uid)
```javascript
userData = {
  email: "...",
  name: "...",           // из email до @
  score: 0,             // сумма всех lessonScores
  lessonsCompleted: [], // массив индексов завершённых уроков
  lessonScores: {},     // { "0": 100, "1": 85, ... }
}
```

### Навигация по урокам
```javascript
var LESSON_URLS = {
  0: 'Lesson-1/index.html',
  1: 'Lesson-2/index.html',
  2: 'Lesson-3/index.html',
  // Lesson-4 и далее — добавлять сюда
};

function openLesson(index) {
  if (LESSON_URLS[index]) {
    window.location.href = LESSON_URLS[index];
  } else {
    completeLesson(index); // для уроков без страницы
  }
}
```

### Макет платформы
- **Sidebar (248px)**: логотип, nav-items (Учёба, Задания, Рейтинг, Профиль)
- **Center**: путь с узлами уроков в стиле Duolingo (зигзаг)
- **Right panel (300px)**: статистика, достижения

### Узлы пути (lessons)
- Уроки 0–4 — Модуль 1 (Arduino основы)
- Узел = кружок с иконкой. Завершённые — зелёные с галочкой, текущий — синий пульсирующий, заблокированные — серые

---

## Структура каждого урока (index.html)

Все уроки имеют одинаковый шаблон:

### Навигация (nav)
```html
<nav> <!-- sticky, белый, border-bottom -->
  <a href="../platforma.html"> логотип </a>
  <a href="../platforma.html">← Платформа</a>
  <div>Модуль 1 · Урок N из 5</div>
</nav>
```

### Секции страницы
1. **lesson-header** — тег урока (`🔘 Урок 3`), заголовок h1, подзаголовок
2. **intro-badge** — жёлтая полоска с описанием (border-left: 4px solid #F59E0B)
3. **video-wrap** — `<video>` с прогресс-баром
4. **learn-grid** — 4 карточки "Что ты узнаешь" (2×2 grid)
5. **code-block** — блок кода на тёмном фоне (#1E293B) с подсветкой
6. **info-card** — блок с важной информацией (фиолетовая или зелёная полоска)
7. **bottom-bar** — фиксированная панель внизу с кнопкой "Дальше →"

### Кнопка "Дальше →" ведёт на `quiz-lessonN.html`

---

## Структура квиза (quiz-lessonN.html)

- **5 вопросов** с 4 вариантами ответа (A/B/C/D)
- Прогресс-бар вверху
- Счётчик баллов ⭐
- После выбора — зелёная/красная подсветка + объяснение
- Кнопка "Ответить" → "Следующий вопрос →" → "Завершить тест"

### Экран результата (result-screen)
- Emoji + заголовок + баллы
- **Только одна кнопка**: "Перейти к симулятору 🔧" → `simulator.html`
- ❌ НЕТ кнопок "Вернуться к уроку" и "Пройти ещё раз"

### Оценки:
- 5/5 → 🏆 Превосходно!
- 4/5 → ⭐ Отличная работа!
- 3/5 → 👍 Хороший результат!
- <3   → 💪 Попробуй ещё раз!

---

## Симулятор — архитектура (simulator.html)

Это самый сложный файл (~1300 строк). Каждый урок имеет свой simulator.html с одинаковой архитектурой.

### Макет
```
#header (56px) — белый: логотип | кнопка "Код" | кнопка "Запустить/Стоп"
#task-bar (44px) — белый: "Урок N" | задание | баллы | кнопка подсказки
#main (flex):
  #workspace (flex:1) — белый SVG-холст с точечной сеткой
    #svg-canvas — SVG с pan/zoom
      view-group > components-layer + wires-layer + handles-layer
    #sim-badge — зелёный бейдж "Симуляция запущена"
    #btn-press-hint — синяя подсказка "Нажми на кнопку!" (Lesson-3)
    #trash-zone — корзина (bottom-right, всегда видна)
  #panel (210px) — тёмно-синий: список компонентов
#code-panel — выезжает слева, тёмный редактор с Fira Code
#success-overlay — оверлей завершения с конфетти
```

### Глобальные переменные
```javascript
let placed = [];          // массив компонентов на холсте
let wires  = [];          // массив проводов
let uid    = 1;           // счётчик уникальных ID
let simRunning = false;
let zoom = 1;
let panX = 0, panY = 0;
let isDragging = false, dragTarget = null;
let panelDrag = null;     // drag из правой панели
let wireStart = null;     // начало провода
let wireWaypoints = [];
let buttonPressed = false; // состояние кнопки (Lesson-3)
let lessonScore = 100;
let hintLevel = 0;
const MAX_HINTS = 3;
```

### Компоненты — определения

#### Arduino UNO
```javascript
// Размер: 480×389px
// Пины top (ly=23): SDA, SCL, AREF, GND(lx=192), D13(lx=210)...D0(lx=458)
// Пины bottom (ly=369): IOREF, RST, 3.3V, 5V, GND1(lx=294), GND2(lx=312)...A5(lx=456)
// Ключевые пины: D2(lx=421), D3(lx=403), D13(lx=210), GND1(lx=294), GND2(lx=312)
// Изображение: ../arduino-sim1.png
// LED-индикаторы: ${cid}-led-l (pin13), ${cid}-led-on (power)
```

#### Breadboard
```javascript
// Размер: 480×306px, 30 колонок
// Шаг колонок: 14px (начало: x=40)
// colX = Array.from({length:30}, (_,i) => 40 + i*14)
// Рейлы top: pmt1..pmt30 (ly=21, type:gnd), ppt1..ppt30 (ly=35, type:pwr5)
// Зона j-f (top): j(ly=76), i(ly=90), h(ly=104), g(ly=118), f(ly=132)
// Зона e-a (bot): e(ly=174), d(ly=188), c(ly=201), b(ly=215), a(ly=229)
// Рейлы bot: pmb1..pmb30 (ly=271, type:gnd), ppb1..ppb30 (ly=286, type:pwr5)
// Изображение: ../breadboard.png
```

#### LED
```javascript
// Размер: 28×50px
// cathode(−): lx=7,  ly=42  (type:'gnd')
// anode(+):   lx=21, ly=42  (type:'digital')
// Расстояние между ножками: 14px = 1 BB колонка ✓
// Визуальные элементы: ${cid}-glow (blur), ${cid}-dome (купол)
// Анимация включения: glow opacity 0→0.5, dome opacity 0.35→1
```

#### Резистор
```javascript
// Размер: 50×20px
// pin1: lx=4,  ly=10  (type:'digital')
// pin2: lx=46, ly=10  (type:'digital')
// Расстояние: 42px = 3×14px = 3 BB колонки ✓
// SVG leads: x1="4" x2="8" (левый), x1="42" x2="46" (правый)
```

#### Кнопка (Lesson-3)
```javascript
// Размер: 28×28px
// pinA: lx=7,  ly=0   (type:'digital') ─┐ всегда соединены
// pinB: lx=21, ly=0   (type:'digital') ─┘
// pinC: lx=7,  ly=28  (type:'gnd')    ─┐ всегда соединены
// pinD: lx=21, ly=28  (type:'gnd')    ─┘
// При нажатии: все 4 пина соединяются
// Расстояние A-B и C-D: 14px = 1 BB колонка ✓
// Визуал: ${cid}-cap (синий прямоугольник), темнеет при нажатии (#3b82f6 → #1d4ed8)
// mousedown → handleButtonPress(id, true)
// mouseup / mouseleave → handleButtonPress(id, false)
```

### Цвета пинов
```javascript
const pinColors = {
  gnd: '#64748b',    // серый
  pwr5: '#ef4444',   // красный
  pwr33: '#f97316',  // оранжевый
  vin: '#eab308',    // жёлтый
  analog: '#3b82f6', // синий
  digital: '#22c55e',// зелёный
  serial: '#8b5cf6', // фиолетовый
  bb: '#94a3b8',     // светло-серый
};
```

### COMP_DEFS
```javascript
const COMP_DEFS = {
  'arduino-mega':     {name:'Arduino UNO',  width:480, height:389, svgFn:arduinoMegaSVG, pinsFn:arduinoMegaPins},
  'breadboard-small': {name:'Breadboard',   width:480, height:306, svgFn:breadboardSVG,  pinsFn:breadboardPins},
  'led':              {name:'LED',          width:28,  height:50,  svgFn:ledSVG,         pinsFn:ledPins},
  'resistor':         {name:'Resistor',     width:50,  height:20,  svgFn:resistorSVG,    pinsFn:resistorPins},
  'button':           {name:'Button',       width:28,  height:28,  svgFn:buttonSVG,      pinsFn:buttonPins},
};
```

---

## Ключевые алгоритмы

### bbGroupKey — группировка BB-пинов
```javascript
function bbGroupKey(compId, pinId) {
  if (/^ppt\d+$/.test(pinId)) return `${compId}::rail_plus_top`;
  if (/^pmt\d+$/.test(pinId)) return `${compId}::rail_minus_top`;
  if (/^ppb\d+$/.test(pinId)) return `${compId}::rail_plus_bot`;
  if (/^pmb\d+$/.test(pinId)) return `${compId}::rail_minus_bot`;
  const m = pinId.match(/^([a-j])(\d+)$/);
  if (m) {
    const section = 'abcde'.includes(m[1]) ? 'bot' : 'top';
    return `${compId}::col_${section}_${m[2]}`;  // одна колонка = 1 net
  }
  return null;
}
```

### buildNetList — union-find для определения связей
Строит граф всех электрических соединений. Учитывает:
1. BB внутренние группы (одна колонка = одна сеть, рейлы = одна сеть)
2. Внутренние соединения кнопки (pinA-pinB, pinC-pinD)
3. Физическое попадание ножки компонента в отверстие BB (допуск 2px)
4. Прямые провода (wires)

```javascript
function buildNetList() {
  const parent = new Map();
  function find(x) { /* path compression */ }
  function union(a, b) { /* union by root */ }

  // 1. BB column groups
  placed.filter(c => c.type==='breadboard-small').forEach(bb => { /* ... */ });

  // 2. Button internal
  placed.filter(c => c.type==='button').forEach(btn => {
    union(`${btn.id}::pinA`, `${btn.id}::pinB`);
    union(`${btn.id}::pinC`, `${btn.id}::pinD`);
  });

  // 3. Physical pin-on-hole (TOL=2px)
  placed.filter(c => c.type==='breadboard-small').forEach(bb => {
    placed.filter(c => c.type!=='breadboard-small').forEach(comp => {
      comp.pins.forEach(pin => {
        const ax = comp.x + pin.lx, ay = comp.y + pin.ly;
        bb.pins.forEach(bbPin => {
          if (Math.abs(ax-(bb.x+bbPin.lx)) < 2 && Math.abs(ay-(bb.y+bbPin.ly)) < 2)
            union(`${comp.id}::${pin.id}`, `${bb.id}::${bbPin.id}`);
        });
      });
    });
  });

  // 4. Wires
  wires.forEach(w => union(`${w.c1}::${w.p1}`, `${w.c2}::${w.p2}`));

  return { connected(c1,p1,c2,p2) { return find(`${c1}::${p1}`) === find(`${c2}::${p2}`); } };
}
```

### snapToNearestBBPin
- Срабатывает при отпускании led/resistor/button
- Ищет ближайший BB-пин (только `[a-j]\d+`) в радиусе 90px
- Выравнивает `comp.x = bb.x + bbPin.lx - refPin.lx` (refPin = первый пин компонента)
- Критично: шаг BB = 14px, расстояния между ножками должны быть кратны 14

### Корзина (trash-zone)
- Позиция: `position:absolute; right:16px; bottom:16px` в `#workspace`
- `pointer-events:none` — не перехватывает события мыши
- Определение попадания: `getBoundingClientRect()` на уровне `document.addEventListener('mouseup')`
- Видна всегда (opacity:1), подсвечивается красным при drag

### Pan/Zoom
- Правая кнопка мыши или средняя — пан
- Колёсико — zoom (min:0.4, max:2)
- Transform: `translate(panX,panY) scale(zoom)` на `view-group`

### Провода
- Ортогональные (H→V сегменты через `buildOrthogonalPath`)
- Цвета из `WIRE_PALETTE` (9 цветов, циклично)
- Клик → выделение + ручки waypoints
- ПКМ → удаление
- Ctrl+Z → undo (последний провод или компонент)

---

## Валидация уроков

### Lesson-2 (validateLesson2)
```
1. Есть arduino, bb, resistor, led
2. D3 → резистор (через BB или напрямую)
3. Резистор → LED анод (+)
4. LED катод (−) → GND
5. Код: void setup, void loop, pinMode(3,OUTPUT), digitalWrite(3,...)
```

### Lesson-3 (validateLesson3)
```
1. Есть arduino, bb, button, resistor, led
2. D2 → кнопка (любой из pinA/B/C/D)
3. Кнопка → GND (любой пин кнопки → любой GND)
4. D3 → резистор
5. Резистор → LED анод (+)
6. LED катод (−) → GND
7. Код: void setup, void loop
       pinMode(2, INPUT...) — INPUT_PULLUP
       pinMode(3, OUTPUT)
       digitalRead(2)
```

### Запуск симуляции
1. Валидация схемы — если ошибка → показать tooltip 2.5 сек
2. Если всё ок → `simRunning = true`, кнопка становится красной "Стоп"
3. Показать hint "Нажми на кнопку!" на 3 сек (Lesson-3)
4. `setTimeout(showSuccess, 5000)` — через 5 секунд окно завершения

### showSuccess / конфетти
- Оверлей с backdrop-filter:blur(6px)
- 120 конфетти-частиц, 180 кадров анимации
- Баллы = `lessonScore` (начинает со 100, -15 за каждую подсказку)
- Кнопка → `../landing.html` (Вернуться на главную)

---

## Система подсказок

```javascript
const HINTS = ['...', '...', '...'];  // 3 подсказки, -15 баллов каждая
// hintLevel: 0→1→2→3 (disabled)
// lessonScore: 100 → 85 → 70 → 55
```

---

## Редактор кода

- Слайдится слева (transform: translateX(-100%) → 0)
- Fira Code 12px, line-height 1.65
- Line numbers синхронизированы скроллом
- Tab = 2 пробела
- `#code-footer` → `display:none` (кнопка "Запустить" убрана, она вверху)
- Начальное содержимое: пустые `void setup(){}` и `void loop(){}`

---

## Прогресс уроков (текущее состояние)

| Урок | Тема | Статус |
|------|------|--------|
| Lesson-1 | Мигающий LED (Blink) | ✅ Готов |
| Lesson-2 | LED с резистором | ✅ Готов |
| Lesson-3 | Кнопка управляет LED | ✅ Готов |
| Lesson-4 | Потенциометр (компонент заблокирован, открыт с ур.4) | ❌ Не создан |
| Lesson-5 | TBD | ❌ Не создан |

При добавлении Lesson-4:
1. Создать `Lesson-4/index.html`, `quiz-lesson4.html`, `simulator.html`
2. В `platforma.html` добавить `3: 'Lesson-4/index.html'` в `LESSON_URLS`
3. Разблокировать компонент `potentiometer` в симуляторе Lesson-4

---

## Важные исправления (история)

- **Резистор ножки**: были lx=0 и lx=50 (50px ≠ кратно 14). Исправлено: lx=4 и lx=46 (42px = 3×14)
- **LED anode ly**: была ly=46, cathode ly=42 (асимметрия). Исправлено: оба ly=42
- **Корзина**: была в правой панели — нельзя было бросить компонент с холста. Перенесена в `#workspace` (position:absolute), обнаружение через document.addEventListener('mouseup') + getBoundingClientRect
- **Валидация через BB**: была только прямая проверка проводов. Добавлен buildNetList() с union-find
- **Кнопка "Запустить" в коде**: убрана (footer display:none), кнопка только в header
- **Quiz result screen**: только одна кнопка "Перейти к симулятору 🔧", без "Вернуться к уроку" и "Пройти ещё раз"
- **Задержка showSuccess**: 5 секунд (было 4)

---

## Правила при разработке

1. **Шрифт всегда Nunito** для UI, Fira Code только в редакторе кода
2. **Ножки компонентов** должны быть кратны 14px по расстоянию между собой
3. **buildNetList()** — всегда использовать для валидации (не прямую проверку проводов)
4. **Корзина** — в `#workspace`, не в панели компонентов
5. **Квиз** — на экране результата только одна кнопка "Перейти к симулятору"
6. **Симулятор** — timeout showSuccess = 5000ms
7. **Новый урок** — копировать структуру Lesson-3/simulator.html как шаблон
8. При добавлении нового компонента: добавить в `COMP_DEFS`, описать `buttonPins()` + `buttonSVG()`, добавить в buildNetList если нужны внутренние соединения
