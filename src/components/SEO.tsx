import Head from "next/head";

function SEO({
  title: titleProps,
  description: descriptionProps,
  keywords: keywordsProps,
}: {
  title?: string;
  description?: string;
  keywords?: string;
}) {
  const title = titleProps ?? "PrintJam - L’impression 3D pour tous!";
  const keywords =
    keywordsProps ??
    [
      "3D printing",
      "PrintJam",
      "creativity",
      "DIY projects",
      "3D printers",
      "3D designs",
    ].join(", ");
  const description =
    descriptionProps ??
    "PrintJam: Unleash your creativity with 3D printing. Join a community of curious minds, expert 3D printers, and creative designers. From DIY projects to custom designs, explore endless possibilities.";
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="https://print-jam.com/favicon.ico" />
      <meta name="theme-color" content="#230066" />
      <title>{title}</title>

      {/* <!-- Essential SEO Meta Tags --> */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PrintJam" />

      {/* <!-- Open Graph / Facebook Meta Tags --> */}
      <meta
        property="og:title"
        content="PrintJam - Where Creativity Meets 3D Printing"
      />
      <meta property="og:site_name" content="PrintJam NAME" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://print-jam.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://print-jam.com/logo512.png" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PrintJam - 3D Printing Community" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://print-jam.com/logo512.png" />

      {/* <!-- Apple & Manifest Links --> */}
      <link rel="apple-touch-icon" href="https://print-jam.com/logo192.png" />
      <link rel="manifest" href="https://print-jam.com/manifest.json" />
      {/* Additional meta tags */}
    </Head>
  );
}

export default SEO;
