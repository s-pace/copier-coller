import { GetStaticPaths, GetStaticProps } from "next";
import Page from "../../src/components/Page";
import SEO from "../../src/components/SEO";
import { getMarkdownFiles } from "../../src/markdownService";

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getMarkdownFiles();
  const paths = files.map((file) => ({
    params: { slug: file.fileName.replace(/\.md$/, "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getMarkdownFiles();

  const file = files.find(
    (f) => f.fileName.replace(/\.md$/, "") === params?.slug,
  );

  // Assurez-vous que metadata est correctement défini ici
  const metadata = {
    title: file?.meta?.title || "Default Title",
    description: file?.meta?.description || "Default Description",
    keywords: file?.meta?.keywords || "Default Keywords",
  };

  return { props: { file, metadata } };
};

const ArticleBody = ({
  file,
}: {
  file: {
    fileName: string;
    content: string;
    meta?: { title: string; keywords: string; description: string };
  };
}) => {
  if (!file) return <div>Article not found</div>;

  return (
    <>
      {file?.meta && (
        <SEO
          title={file.meta?.title}
          keywords={file.meta?.keywords}
          description={file.meta?.description}
        />
      )}
      <div
        className="h-full w-full"
        dangerouslySetInnerHTML={{ __html: file.content }}
      />
    </>
  );
};

const Article = ({
  file,
  metadata,
}: {
  file: {
    fileName: string;
    content: any;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
}) => (
  <Page
    title={metadata.title}
    description={metadata.description}
    keywords={metadata.keywords}
  >
    <article className="first markdown-body m-0 flex h-full w-full">
      <ArticleBody file={file}></ArticleBody>
    </article>
  </Page>
);
export default Article;
