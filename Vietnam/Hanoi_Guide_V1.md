# Hanoi + Sapa — 5-Day Guide (V1)

**4 – 8 Dec 2026 · independent · Agnes, Jovie**

Flights: **KUL → HAN 06:10–08:25 (4 Dec)** · **HAN → KUL 14:50–19:15 (8 Dec)**
Weather: **22°/15° in Hanoi, 15°/8° in Sapa** · one of the driest months · **sunset 17:20**

> This file is the summary. The HTML (`index.html`) is the source of truth and carries
> the interactive parts: Money, Pack & Prepare, Shopping list, My notes, Reference links.

---

## The shape of the trip

| Day | Date | Where | Sleeping |
|---|---|---|---|
| 1 | Thu 4 Dec | KUL → Hanoi → night train to Sapa | **on the sleeper** |
| 2 | Fri 5 Dec | Sapa | Sapa |
| 3 | Sat 6 Dec | Sapa → night train back | **on the sleeper** |
| 4 | Sun 7 Dec | Hanoi | Hanoi |
| 5 | Mon 8 Dec | Hanoi → KUL / SG | — |

**Two nights are on a sleeper**, which is what makes this trip awkward: on Day 1 and
Day 4 you have no room to put anything.

---

## The three things that will bite

**Day 1 — nowhere to leave your bags.** You land 08:25 and board a sleeper that night,
so there is no hotel all day. Old Quarter cafes and tour offices store bags by the
piece, about 50,000₫. If the sleeper is booked through an agency, ask them first — it
is often free.

**Day 4 — you arrive before check-in.** The sleeper gets into Hanoi early; hotels
rarely check in before 14:00. Leave the bags, go and eat.

**Day 5 — work backwards from 14:50.** Three hours for an international departure plus
45 minutes to Nội Bài means leaving town around **11:00**. That still leaves roughly
three usable morning hours.

---

## Money

| | |
|---|---|
| 10,000 ₫ | ≈ RM1.70 |
| 100,000 ₫ | ≈ RM17 |
| 500,000 ₫ | ≈ RM85 — the largest note |

**Shortcut:** drop four zeros, multiply by 1.7. So 50,000₫ → 5 × 1.7 ≈ RM8.50.

- **20,000₫ and 500,000₫ are similar colours.** Handing over the wrong one is the
  classic mistake. Count the zeros before you pay.
- Old Quarter small shops, street food and cyclos are **cash only**.
- **Airport exchange rates are poor.** Gold shops in town, Hà Trung street especially,
  are much better.
- ATMs charge roughly 22,000–50,000₫ a withdrawal — take out more, less often.

---

## Getting around

- **Grab is the default.** Install and sign in **before you fly**. Fixed price, no
  haggling, no explaining where you are going.
- Street taxis: stick to **Mai Linh** (green) or **G7**. Rigged meters on lookalike
  cabs are a long-running problem.
- **Crossing the road:** walk slowly and steadily, don't stop and don't run. Scooters
  flow around you, but only if you are predictable.
- Walking beats driving in the Old Quarter — narrow one-way lanes mean cars are often
  slower than you are.

---

## Weather and packing

Hanoi is 22°/15°, Sapa is **15°/8° and often inside a cloud**. It feels colder than the
numbers because of 70% humidity and wind, mornings especially.

- **Layers** — 22° daytime is short sleeves, 15° after dark needs a jacket
- **冬装** is on the packing list for Sapa: jacket, sweater, long trousers
- Closed walking shoes — Old Quarter pavements are uneven and parked solid with scooters
- **Sunset is 17:20.** Put anything you want to photograph in the morning.

---

## What's still missing

1. **Sleeper bus or train?** They are materially different. The train goes to Lào Cai
   and needs another hour by minibus up to Sapa; the bus runs door to door in about six
   hours. This changes Day 1 evening and Day 4 morning.
2. **Hotel and district** — Old Quarter, French Quarter and West Lake are very
   different evenings.
3. **Sapa plans** — trekking, Fansipan, the villages, or a homestay.
4. **The Hanoi days** — what you want to see on Day 1 and Day 4.
5. **Jovie's flights.**

---

## Already worth planning around

**Sunday 7 Dec is the Hoàn Kiếm weekend walking streets.** The lake and part of the Old
Quarter close to traffic from Friday evening through Sunday night — street performers,
stalls, games. Your Hanoi day falls exactly on it.

**Buy sleeper supplies in Sapa town before boarding** on Day 3 — water, snacks, wet
wipes, earplugs, an eye mask. None of it is sold on board and the carriage gets cold.

---

## Shared files

Configured in `index.html`:

```
data/trylist.xlsx   the shared To-try list
data/tabung.xlsx    the shared Tabung (money pool) ledger
```

The Apps Script endpoint and both sheet IDs are set. The shopping list starts empty by
design; Pack & Prepare keeps its default list.

---

## Editing notes

- **Two card patterns.** `details.day` + `summary.top` for the five day cards;
  `details.ref` + `summary.sec` for every other section. Using the wrong one breaks the
  layout silently.
- **Bump the version AND the date in all five places:** `GUIDE_VERSION`,
  `GUIDE_UPDATED` {en, zh}, the header chip text *and* its `data-zh`, the footer EN
  *and* ZH. Then grep for stray dates and confirm only one remains.
- Storage keys are namespaced `hanoiTrip*` so this guide does not collide with the
  Japan one in the same browser.
- Every visible string carries its Chinese in `data-zh`.
