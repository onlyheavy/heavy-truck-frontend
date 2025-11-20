import axios from "axios";
import API from "@/utils/api";

export async function getServerSideProps({ res }) {
    const apiUrl = `${API.HOST}/api/siteMap/bus-sitemap.xml`;
  const { data } = await axios.get(apiUrl);

  res.setHeader("Content-Type", "application/xml");
  res.write(data);
  res.end();

  return { props: {} };
}

export default function SitemapProducts() {
  return null;
}
