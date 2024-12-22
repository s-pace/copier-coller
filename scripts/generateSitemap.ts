import * as fs from "fs-extra";
import * as path from "path";
import { SitemapStream, streamToPromise } from "sitemap";

const navs = ["contact", "upload", "editor", "map", "order"];

const dynamicRoutes = [
  // Add other dynamic routes here
  "/orders/[id]",
];

async function readJsonFile(filePath: string): Promise<any> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

async function generateSitemap() {
  try {
    // Join the directory and file name
    const filePath = path.join(__dirname, "..", "src", "articles.json");
    const articlesJson = await readJsonFile(filePath);

    const sitemap = new SitemapStream({ hostname: "https://print-jam.com" }); // Replace with your website's URL

    for (const route of articlesJson.articles) {
      sitemap.write({
        url: `/articles/${route.id}`,
        priority: 1,
        changefreq: "weekly",
      });
    }

    for (const nav of navs) {
      sitemap.write({ url: `/${nav}`, priority: 1, changefreq: "weekly" });
    }

    for (const route of dynamicRoutes) {
      sitemap.write({
        url: route,
        priority: 0.8,
        changefreq: "weekly",
      });
    }

    sitemap.end();

    // Generate the sitemap XML
    const sitemapXML = await streamToPromise(sitemap);
    await fs.writeFile("public/sitemap.xml", sitemapXML, "utf8");
  } catch (error) {
    console.error("Error:", error);
  }
}

generateSitemap().then(() => {
  console.log("Sitemap generated successfully.");
});
