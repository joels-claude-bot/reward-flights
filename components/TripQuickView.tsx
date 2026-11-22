import './TripQuickView.css';

type City = 'London' | 'Brisbane' | 'Perth';
type Evidence = { label: string; file: string };
type OtherAward = { date: string; programme: string; cost: string; ev: string; note: string };

type Leg = {
  label: string;
  date: string;
  from: City;
  to: City;
  award: string;
  awardDetail: string;
  awardEv?: string;
  cash: string;
  cashDetail: string;
};

type Trip = {
  id: string;
  people: string;
  status: 'found' | 'check';
  statusText: string;
  legs: [Leg, Leg];
  separateCash: string;
  pointTotal: string;
  ev: string;
  evNote: string;
  mixedOption?: { label: string; points: string; cash: string; ev: string; note: string };
  otherAwards?: OtherAward[];
  checks?: string[];
  note: string;
  evidence: Evidence[];
};

const trips: Trip[] = [
  {
    id: 'A', people: '1 traveller', status: 'found', statusText: 'Award seats found',
    legs: [
      { label: 'OUT · DECEMBER', date: 'Sun 20 Dec', from: 'Brisbane', to: 'London', award: '90k Avios', awardDetail: 'Qatar · 1 stop', awardEv: 'EV below 1.28p / Avios', cash: '£1,153', cashDetail: 'Cathay · Hong Kong · 24h10' },
      { label: 'BACK · JANUARY', date: 'Sun 3 Jan', from: 'London', to: 'Brisbane', award: '90k Avios', awardDetail: 'Qatar · 1 stop', awardEv: 'EV below 0.85p / Avios', cash: '£768', cashDetail: 'China Eastern · Shanghai · 26h' },
    ],
    separateCash: '£1,921', pointTotal: '180k Avios + taxes',
    ev: 'Below 1.07p / Avios', evNote: 'Upper bound: £1,921 ÷ 180k; award taxes reduce it.',
    mixedOption: {
      label: 'United outbound + cash return',
      points: '≈80k Amex MR',
      cash: '≈£851 total',
      ev: '~1.34p / MR',
      note: '16 Dec United award: $111.50 (≈£83) + 3 Jan £768 cash one-way. The award has 2 stops. Search a 16 Dec–3 Jan cash return for a fair comparison; at £1,500 return cash, this drops to ~0.81p/MR.',
    },
    otherAwards: [
      { date: '17 Dec', programme: 'Qantas Classic Plus', cost: '176,800 pts + A$366', ev: '~0.54p / MR*', note: '1 stop via Sydney · 29h35. Poor points value.' },
      { date: '16 Dec', programme: 'Emirates Skywards', cost: '62,500 miles + $304', ev: '~0.74p / MR*', note: '125,000 Amex MR at 2:1 · 1 stop via Dubai.' },
      { date: '16 Dec', programme: 'United · BNE → London', cost: '60k miles + $111.50', ev: '~1.34p / MR*', note: '≈80k Amex MR via Marriott · 2 stops · 29h25. Compared with £1,153 cash on 20 Dec.' },
      { date: '2 Jan', programme: 'United · London → BNE', cost: '60k miles + $264.90', ev: '~0.71p / MR*', note: '≈80k Amex MR via Marriott · 2 stops · 27h15. Compared with £768 cash on 3 Jan.' },
      { date: '16 Dec–2 Jan', programme: 'United pair', cost: '120k miles + $376.40', ev: '~1.02p / MR*', note: '≈160k Amex MR for both; two one-way awards, not a quoted return fare.' },
      { date: '4 Dec†', programme: 'Cathay Asia Miles', cost: '47,000 miles + fees unknown', ev: 'Cannot calculate', note: 'Outside requested window; screenshot does not show the date or fees.' },
    ],
    checks: [
      'Flying Blue: Air France’s BNE → London month search shows no December or January result for 1 traveller.',
      'Virgin Atlantic: no Virgin-operated flight from Brisbane. Partner-operated bookings were not checked.',
    ],
    note: 'United’s 16 Dec outbound and 2 Jan return are separate AwardTool results for 1 traveller. Both have 2 stops. The return result shows 1+ seat; the outbound shows 2+ seats. The cash comparison uses one-stop flights on 20 Dec and 3 Jan, so its EV is only a proxy. Qatar has one seat on each exact date. †4 Dec is the date supplied with the Cathay screenshot; it is not visible in the image. An empty Flying Blue month does not mean every airline has no awards.',
    evidence: [
      { label: '20 Dec · Qatar award', file: 'q-a-leave-bne-lhr-dec20-eco.png' },
      { label: '3 Jan · Qatar award', file: 'q-a-return-lhr-bne-jan3-eco.png' },
      { label: '20 Dec · cash', file: 'a-leg1-cash-bne-lhr-economy.png' },
      { label: '3 Jan · cash', file: 'a-leg2-cash-lhr-bne-economy.png' },
      { label: '17 Dec · Qantas Classic Plus', file: 'qantas-bne-lhr-dec17-classic-plus.png' },
      { label: '16 Dec · AwardTool United and Emirates', file: 'awardtool-bne-lon-dec16-19.png' },
      { label: 'Early Dec · Cathay result', file: 'cathay-bne-lhr-early-dec.png' },
      { label: 'Dec–Jan · Flying Blue no BNE → London result', file: 'flyingblue-bne-lon-dec-jan-none.png' },
    ],
  },
  {
    id: 'B', people: '3 travellers', status: 'check', statusText: '3 seats need checking',
    legs: [
      { label: 'OUT · DECEMBER', date: 'Sun 20 Dec', from: 'London', to: 'Brisbane', award: '3 seats?', awardDetail: 'Qatar calendar: none shown', cash: '£840 pp', cashDetail: 'China Southern · Guangzhou · 22h05' },
      { label: 'BACK · JANUARY', date: 'Sun 3 Jan', from: 'Brisbane', to: 'London', award: '3 seats?', awardDetail: 'Qatar calendar: none shown', cash: '£872 pp', cashDetail: 'Qatar · Doha · 25h15' },
    ],
    separateCash: '£5,136 for 3*', pointTotal: 'Unconfirmed for 3',
    ev: 'Cannot calculate', evNote: 'No confirmed award for all 3 on the checked dates.',
    note: '12 Dec shows flights in AwardTool, but its search was for 1 passenger. Qatar’s 3-person month calendar showed none; an exact-date search is still needed. *Cash total is 3 × one-person fares, not a three-person quote.',
    evidence: [
      { label: '12 Dec · 1-person award search', file: 'awardtool-lhr-bne-12dec-seats.png' },
      { label: 'December · Qatar 3-person calendar', file: 'q-b-leave-lhr-bne-dec-3pax-NONE.png' },
      { label: 'January · Qatar 3-person calendar', file: 'q-b-return-bne-lhr-jan-3pax-NONE.png' },
      { label: '20 Dec · cash for 1', file: 'b-leg1-cash-lhr-bne-economy-pp.png' },
      { label: '3 Jan · cash for 1', file: 'b-leg2-cash-bne-lhr-economy-pp.png' },
    ],
  },
  {
    id: 'C', people: '1 traveller', status: 'check', statusText: 'Award route needs checking',
    legs: [
      { label: 'OUT · DECEMBER', date: 'Sun 20 Dec', from: 'Perth', to: 'London', award: '90k Avios', awardDetail: 'Qatar · 1 stop', awardEv: 'EV below 1.29p / Avios', cash: '£1,158', cashDetail: 'Qatar · Doha · 21h30' },
      { label: 'BACK · JANUARY', date: 'Sun 3 Jan', from: 'London', to: 'Perth', award: 'Qatar: no result', awardDetail: 'Delta return pair · 2 stops', cash: '£946', cashDetail: 'Qatar · Doha · 18h45' },
    ],
    separateCash: '£2,104', pointTotal: 'Delta: 120k + $501 return',
    ev: '~1.44p / SkyMile', evNote: '£2,104 cash proxy less ~$501 fees, divided by 120k miles; 2-stop award versus 1-stop cash.',
    otherAwards: [
      { date: '14 Dec', programme: 'Qatar · PER → London', cost: '90,000 Avios + fees', ev: 'below 1.29p / MR*', note: '90k Amex MR at 1:1 · 1 stop · 21h30. Fees are not shown.' },
      { date: '12–15 Dec', programme: 'Emirates · PER → London', cost: '60k miles + $285.72', ev: '~0.79p / MR*', note: '120k Amex MR at 2:1 · 1 stop via Dubai · best shown is 21h20.' },
      { date: '11 Dec', programme: 'Qantas Classic Plus · PER → London', cost: '171,500 pts + A$303', ev: '~0.58p / MR*', note: '171.5k Amex MR at 1:1 · 1 stop · 21h15. One day outside the 12 Dec earliest date; poor value.' },
      { date: '18 Dec–6 Jan', programme: 'Delta SkyMiles return', cost: '120,000 miles + $457', ev: '~1.47p / mile*', note: '2 stops on return; outbound has an 18h15 layover in Ho Chi Minh City. Cash comparison uses different dates.' },
    ],
    note: 'The new Qatar, Emirates and Qantas screenshots are outbound PER → London searches on earlier December dates. Their EV uses the £1,158 cash fare for 20 Dec, so it is a nearby-date proxy. Delta displayed a 20 Dec–3 Jan pair at 120k miles + $501, with 2 stops. The new 18 Dec–6 Jan pair is a separate search: 38h30 outbound, with 18h15 in Ho Chi Minh City; return via Hanoi and Ho Chi Minh City. The 120k + $457 is the round-trip total, not a price for each leg.',
    evidence: [
      { label: '20 Dec · Qatar award', file: 'q-c-leave-per-lhr-dec20-eco.png' },
      { label: '14 Dec · Qatar 90k award', file: 'qatar-per-lhr-dec14-90k.png' },
      { label: '12–15 Dec · Emirates award options', file: 'awardtool-per-lhr-dec12-15-emirates.png' },
      { label: '11 Dec · Qantas Classic Plus', file: 'qantas-per-lhr-dec11-classic-plus.png' },
      { label: '20 Dec–3 Jan · Delta return', file: 'per-lon-delta-flexdates.png' },
      { label: '18 Dec · Delta outbound', file: 'delta-per-lhr-dec18-outbound.png' },
      { label: '6 Jan · Delta return', file: 'delta-lhr-per-jan6-return.png' },
      { label: '20 Dec · cash', file: 'c-leg1-cash-per-lhr-economy.png' },
      { label: '3 Jan · cash', file: 'c-leg2-cash-lhr-per-economy.png' },
    ],
  },
];

function CityName({ city }: { city: City }) {
  return <span className={`trip-city trip-city-${city.toLowerCase()}`}>{city}</span>;
}

function TripCard({ trip }: { trip: Trip }) {
  return <article className="trip-card">
    <div className="trip-card-header">
      <div className="trip-heading">
        <span className="trip-id">{trip.id}</span>
        <div>
          <div className="trip-route"><CityName city={trip.legs[0].from} /><span className="trip-arrow">→</span><CityName city={trip.legs[0].to} /><span className="trip-arrow">→</span><CityName city={trip.legs[1].to} /></div>
          <div className="trip-people">{trip.people}</div>
        </div>
      </div>
      <span className={`trip-status trip-status-${trip.status}`}>{trip.statusText}</span>
    </div>
    <div className="trip-leg-grid">
      {trip.legs.map((leg) => <div className="trip-leg" key={leg.label}>
        <div className="trip-leg-eyebrow">{leg.label}</div>
        <div className="trip-date">{leg.date}</div>
        <div className="trip-direction"><CityName city={leg.from} /><span>→</span><CityName city={leg.to} /></div>
        <div className="trip-fact"><span className="trip-fact-label">POINTS</span><strong>{leg.award}</strong><small>{leg.awardDetail}{leg.awardEv && <><br /><b className="trip-leg-ev">{leg.awardEv}</b></>}</small></div>
        <div className="trip-fact"><span className="trip-fact-label">CASH · 1 STOP</span><strong>{leg.cash}</strong><small>{leg.cashDetail}</small></div>
      </div>)}
    </div>
    <div className="trip-totals">
      <div><span>POINTS OPTION</span><strong>{trip.pointTotal}</strong></div>
      <div><span>TWO CASH ONE-WAYS</span><strong>{trip.separateCash}</strong></div>
      <div><span>POINTS VALUE · EV</span><strong>{trip.ev}</strong></div>
    </div>
    <div className="trip-ev-note">{trip.evNote}</div>
    {trip.mixedOption && <div className="trip-mixed">
      <div className="trip-mixed-title">Mix points + cash</div>
      <strong>{trip.mixedOption.label}</strong>
      <div className="trip-mixed-values"><span>{trip.mixedOption.points}</span><span>{trip.mixedOption.cash}</span><span>EV {trip.mixedOption.ev}</span></div>
      <small>{trip.mixedOption.note}</small>
      <details className="trip-mixed-evidence">
        <summary>United outbound + return screenshots</summary>
        <div className="trip-evidence-gallery">
          <a className="trip-evidence-shot" href="/trip/awardtool-united-bne-lon-dec16-details.png" target="_blank" rel="noopener noreferrer"><img src="/trip/awardtool-united-bne-lon-dec16-details.png" alt="16 December Brisbane to London United award details" loading="lazy" /><span>16 Dec · Brisbane → London ↗</span></a>
          <a className="trip-evidence-shot" href="/trip/awardtool-united-lon-bne-jan2-return.png" target="_blank" rel="noopener noreferrer"><img src="/trip/awardtool-united-lon-bne-jan2-return.png" alt="2 January London to Brisbane United award options" loading="lazy" /><span>2 Jan · London → Brisbane ↗</span></a>
        </div>
      </details>
    </div>}
    {trip.otherAwards && <div className="trip-other-awards">
      <div className="trip-other-title">Other award dates</div>
      {trip.otherAwards.map((option) => <div className="trip-other-row" key={`${option.date}-${option.programme}`}>
        <span className="trip-other-date">{option.date}</span>
        <div><strong>{option.programme}</strong><small>{option.note}</small></div>
        <div className="trip-other-values"><strong>{option.cost}</strong><small>EV {option.ev}</small></div>
      </div>)}
    </div>}
    {trip.checks && <div className="trip-checks">{trip.checks.map((check) => <div key={check}>{check}</div>)}</div>}
    <div className="trip-combined-cash">Combined cash return: <strong>not checked</strong></div>
    <details className="trip-evidence">
      <summary>Why this status? · screenshots</summary>
      <p>{trip.note}</p>
      <div className="trip-evidence-gallery">{trip.evidence.map((item) => <a className="trip-evidence-shot" key={item.file} href={`/trip/${item.file}`} target="_blank" rel="noopener noreferrer">
        <img src={`/trip/${item.file}`} alt={item.label} loading="lazy" />
        <span>{item.label} ↗</span>
      </a>)}</div>
    </details>
  </article>;
}

export default function TripQuickView() {
  return <div className="trip-quick-view">
    <div className="trip-intro"><strong>20 Dec 2026 → 3 Jan 2027</strong><span>Economy · screenshots from 20–22 Sep 2026</span></div>
    <div className="trip-key"><span><i className="trip-dot trip-dot-london" />London</span><span><i className="trip-dot trip-dot-brisbane" />Brisbane</span><span><i className="trip-dot trip-dot-perth" />Perth</span></div>
    <div className="trip-cards">{trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}</div>
    <p className="trip-bottom-note"><strong>EV = (cash fare − award fees) ÷ Amex points needed.</strong> Cash totals shown are the sum of <strong>two separate one-way quotes</strong>; no combined cash return was searched. A cheaper cash return ticket would lower the apparent value of points. “Below” means award fees were not shown, so the figure is an upper bound. *Other-date EVs use the 20 Dec / 3 Jan one-stop cash fares as a rough proxy. United needs an indirect transfer: <a href="https://www.americanexpress.com/en-gb/rewards/membership-rewards/partner/Marriott-Bonvoy/MAR">2 Amex MR → 3 Marriott points</a>; <a href="https://travel-partner.marriott.com/united/en-us/faqs">60k Marriott → at least 30k United miles</a> with the published 60k-block bonus. So <strong>80k Amex MR covers 60k United miles</strong>, with possible extra bonus miles. Currency uses the <a href="https://www.bankofengland.co.uk/boeapps/database/Rates.asp?rateview=L">Bank of England’s 21 Sep rates</a> (£1 = $1.3374 / A$1.8768). <a href="https://www.americanexpress.com/en-gb/rewards/membership-rewards/travel/all">Other Amex UK transfers</a>: Qatar, Qantas and Delta 1:1; Emirates 2:1.</p>
  </div>;
}
