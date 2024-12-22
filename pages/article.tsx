import Page from "@/components/Page";

import Title from "@/components/Title";
import ArticleList from "@/components/ArticleList";
import { useLanguage } from "@/i18n/LanguageProvider";

function Article() {
  const { locale } = useLanguage();

  const { articleText, articleTitle, articleDescription, articleKeywords } =
    locale;

  return (
    <Page
      title={articleTitle}
      description={articleDescription}
      keywords={articleKeywords}
    >
      <article className="flex h-full w-full flex-col items-center py-4">
        <Title className="first article-list">{articleText}</Title>
        <ArticleList />
      </article>
    </Page>
  );
}

export default Article;
