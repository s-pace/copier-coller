import clsx from "clsx";
import Link from "next/link";
import articlesData from "../../pages/articles.json";

interface ParagraphData {
  title: string;
  content: string;
}

interface ArticleData {
  id: string;
  title?: string;
  linkLabel: string;
  priority?: string;

  paragraphs?: ParagraphData[];
}

const ArticleList = () => (
  <ul className="article-list w-full">
    {articlesData.articles.map(
      (article: Pick<ArticleData, "id" | "linkLabel" | "priority">) => (
        <li key={article.id}>
          <Link
            href={`/articles/${article.id}`}
            className={clsx(
              "article-link",
              article.priority === "0" && "bg-secondary-color",
            )}
          >
            {article.linkLabel}
          </Link>
        </li>
      ),
    )}
  </ul>
);

export default ArticleList;
