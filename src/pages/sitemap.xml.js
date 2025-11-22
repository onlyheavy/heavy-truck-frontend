export const getServerSideProps = async ({ res }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://onlyheavy.com/sitemap-trucks.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/emi-calculator</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/fuel-calculator</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/brochure</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-buses.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-compare-trucks.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-compare-jcb.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-compare-bus.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-brands.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/sitemap-blogs.xml</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/privacy-policy</loc></sitemap>
    <sitemap><loc>https://onlyheavy.com/terms-conditions</loc></sitemap>
  </sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function SitemapIndex() {
  return null;
}
