import { writeFile } from 'node:fs/promises';

const site = 'https://assetlift-buyers.vercel.app';
const updated = '2026-07-21';
const locations = [
  {
    slug: 'burlington-county-nj',
    county: 'Burlington County',
    state: 'New Jersey',
    towns: 'Mount Laurel, Evesham, Willingboro, Burlington Township, Medford, Moorestown, Pemberton, Delran, Cinnaminson, and nearby Burlington County communities',
    angle: 'large lots, inherited houses, outdated homes, vacant properties, and homes that need repairs before a retail listing',
    note: 'Septic, well, acreage, flood-zone, and municipal certificate requirements can affect timing and offer structure.'
  },
  {
    slug: 'gloucester-county-nj',
    county: 'Gloucester County',
    state: 'New Jersey',
    towns: 'Washington Township, Deptford, Glassboro, Monroe Township, Woolwich, West Deptford, Pitman, Woodbury, and surrounding Gloucester County towns',
    angle: 'estate properties, tired rentals, homes with deferred maintenance, vacant houses, and residential land',
    note: 'We account for local resale demand, repair scope, occupancy, title, taxes, and township requirements before finalizing an offer.'
  },
  {
    slug: 'atlantic-county-nj',
    county: 'Atlantic County',
    state: 'New Jersey',
    towns: 'Atlantic City, Egg Harbor Township, Galloway, Hamilton Township, Pleasantville, Absecon, Hammonton, and nearby shore and inland communities',
    angle: 'shore-area homes, inherited properties, damaged houses, vacant homes, and land where a normal listing is not the best fit',
    note: 'Flood zones, storm history, insurance issues, seasonal demand, and municipal requirements can all affect value and closing speed.'
  },
  {
    slug: 'orange-county-ny',
    county: 'Orange County',
    state: 'New York',
    towns: 'Newburgh, Middletown, Monroe, Kiryas Joel, Warwick, Wallkill, Goshen, Montgomery, and nearby Orange County communities',
    angle: 'inherited homes, vacant houses, multifamily properties, repair-heavy homes, and land across the Hudson Valley',
    note: 'Title, municipal records, payoff timing, access, and property condition drive the offer and closing timeline.'
  },
  {
    slug: 'rockland-county-ny',
    county: 'Rockland County',
    state: 'New York',
    towns: 'Monsey, Spring Valley, New City, Suffern, Nanuet, Haverstraw, Nyack, Pearl River, and surrounding Rockland County communities',
    angle: 'older homes, estate sales, properties with occupancy complications, homes needing repairs, and unwanted land',
    note: 'We look closely at local demand, title status, occupancy, code issues, and access before presenting final terms.'
  },
  {
    slug: 'westchester-county-ny',
    county: 'Westchester County',
    state: 'New York',
    towns: 'Yonkers, White Plains, New Rochelle, Mount Vernon, Greenburgh, Peekskill, Ossining, Cortlandt, and nearby Westchester communities',
    angle: 'inherited properties, outdated houses, vacant homes, homes with substantial repairs, and time-sensitive sale situations',
    note: 'Taxes, liens, municipal requirements, estate authority, and high repair costs can materially affect the direct-sale option.'
  },
  {
    slug: 'nassau-county-ny',
    county: 'Nassau County',
    state: 'New York',
    towns: 'Hempstead, Freeport, Valley Stream, Garden City, Hicksville, Levittown, Glen Cove, Long Beach, and nearby Nassau County communities',
    angle: 'inherited homes, dated houses, properties with repairs, vacant homes, and unwanted residential lots',
    note: 'A traditional listing may work well for updated homes, while a direct sale can be useful when speed, repairs, or certainty matter more.'
  },
  {
    slug: 'suffolk-county-ny',
    county: 'Suffolk County',
    state: 'New York',
    towns: 'Brookhaven, Islip, Huntington, Babylon, Smithtown, Riverhead, Southampton, East Hampton, and surrounding Suffolk County communities',
    angle: 'vacant homes, inherited properties, repair-heavy houses, land, and properties affected by distance or seasonal market timing',
    note: 'We evaluate access, taxes, waterfront or flood considerations, condition, title, and marketability before making a final offer.'
  }
];

const nav = '<header class="site-header"><div class="wrap nav"><a class="brand" href="/"><span class="brand-mark">A</span><span>AssetLift <span>Buyers</span></span></a><button class="mobile-toggle" aria-label="Open menu">☰</button><nav><a href="/how-it-works">How it works</a><a href="/locations">Areas we buy</a><a href="/about">About</a><a class="btn" href="/#offer">Get my offer</a></nav></div></header>';
const footer = '<footer class="site-footer"><div class="wrap"><p>© 2026 AssetLift Lending LLC • <a href="tel:+19296392284">(929) 639-2284</a></p><div class="legal">AssetLift Buyers serves property owners remotely and through property visits by appointment. We do not claim a staffed office in every community.</div></div></footer>';

for (const item of locations) {
  const stateAbbr = item.state === 'New Jersey' ? 'NJ' : 'NY';
  const title = `Cash Home Buyers in ${item.county}, ${stateAbbr} | AssetLift Buyers`;
  const description = `Sell a ${item.county}, ${stateAbbr} house as-is to AssetLift Buyers. Direct offers for inherited, distressed, vacant, and repair-heavy properties.`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cash home buying in ${item.county}, ${item.state}`,
    provider: { '@type': 'Organization', name: 'AssetLift Buyers', url: `${site}/` },
    areaServed: { '@type': 'AdministrativeArea', name: `${item.county}, ${item.state}` },
    serviceType: 'Direct as-is property purchase'
  };
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${site}/${item.slug}"><link rel="stylesheet" href="/assets/styles.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="topbar">Direct property buyers serving ${item.county}, ${item.state}</div>${nav}<main><section class="page-hero"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / <a href="/locations">Areas we buy</a> / ${item.county}</div><div class="eyebrow">${item.county} cash buyer</div><h1>Sell your ${item.county} property as-is.</h1><p class="lead">AssetLift Buyers reviews houses and land in ${item.county} for direct purchase, without repairs, public showings, or agent commissions charged by us.</p></div></section><section><div class="wrap content"><h2>Properties we review in ${item.county}</h2><p>We consider ${item.angle}. You do not need to renovate, clean out, or stage the property before asking for an offer.</p><h2>Communities we serve</h2><p>${item.towns}.</p><h2>When a direct sale may fit</h2><p>A direct cash sale can make sense when a property needs substantial work, an estate needs a clear exit, title or occupancy is complicated, or a seller values certainty over testing the retail market.</p><h2>Local offer considerations</h2><p>${item.note} Some clear-title sales can close quickly, but final timing depends on seller authority, title, access, payoffs, and agreed terms.</p><div class="notice"><strong>Compare your options.</strong> Updated homes with flexible timelines may sell for more through a traditional listing. Our offer prioritizes an as-is purchase, speed, and certainty.</div></div></section><section><div class="wrap cta"><div><h2>Request a ${item.county} property offer.</h2><p>Send the address and property details. We will review the fit and respond directly.</p></div><a class="btn" href="/#offer">Tell us about the property</a></div></section></main>${footer}<script src="/assets/site.js" defer></script></body></html>`;
  await writeFile(`${item.slug}.html`, html);
}

const existingPages = [
  ['', '1.0'],
  ['how-it-works', '0.8'],
  ['sell-distressed-house', '0.9'],
  ['sell-inherited-house', '0.9'],
  ['sell-land', '0.8'],
  ['locations', '0.9'],
  ['camden-county-nj', '0.9'],
  ['ocean-county-nj', '0.9'],
  ['monmouth-county-nj', '0.9'],
  ...locations.map((item) => [item.slug, '0.9']),
  ['about', '0.7']
];
const urls = existingPages.map(([slug, priority]) => `  <url><loc>${site}${slug ? `/${slug}` : '/'}</loc><lastmod>${updated}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`).join('\n');
await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`Generated ${locations.length} location pages and sitemap.xml.`);
