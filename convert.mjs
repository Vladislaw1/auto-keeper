import { readFileSync, writeFileSync } from 'node:fs';

// Вкажи свої сирі файли (можна один, можна кілька)
const INPUT_FILES = ['./sto-raw.json'];
const OUTPUT_FILE = './sto.json';

function getCategory(tags = {}) {
  if (tags.shop === 'car_repair') return 'CAR_REPAIR';
  if (tags.shop === 'tyres') return 'TYRES';
  if (tags.amenity === 'car_wash') return 'CAR_WASH';
  if (tags.shop === 'car_parts') return 'CAR_PARTS';
  return null;
}

const elements = INPUT_FILES.flatMap((f) => JSON.parse(readFileSync(f, 'utf8')).elements ?? []);

const byId = new Map(); // прибираємо дублі за id

for (const el of elements) {
  const t = el.tags ?? {};
  const category = getCategory(t);
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  if (!category || lat == null || lon == null) continue;

  const id = `${el.type}-${el.id}`; // "node-123", без слеша
  byId.set(id, {
    id,
    category,
    lat,
    lon,
    name: t.name ?? t['name:uk'] ?? t.brand ?? t.operator ?? null,
    phone: t.phone ?? t['contact:phone'] ?? null,
    hours: t.opening_hours ?? null,
    website: t.website ?? t['contact:website'] ?? null,
    address:
      [t['addr:city'], t['addr:street'], t['addr:housenumber']].filter(Boolean).join(', ') || null,
    tags: t,
  });
}

const places = [...byId.values()];
writeFileSync(OUTPUT_FILE, JSON.stringify(places));

const counts = places.reduce(
  (acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }),
  {},
);
console.log(`Прочитано елементів: ${elements.length}`);
console.log(`Записано місць: ${places.length}`);
console.log('По категоріях:', counts);
console.log(
  `З назвою: ${places.filter((p) => p.name).length}, з телефоном: ${places.filter((p) => p.phone).length}`,
);
