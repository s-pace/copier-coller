import Title from "@/components/Title";
import Image from "next/image";
import ReactGA from "react-ga";
import ArticleList from "@/components/ArticleList";
import Page from "@/components/Page";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import ArrowIcon from "@/components/ArrowIcon";

ReactGA.initialize("G-XWP9QKK70C");

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, children, className }) => {
  return (
    <Link href={href} className={clsx("cta w-full", className)}>
      {children}
    </Link>
  );
};

function App() {
  const { locale } = useLanguage();
  const {
    catchPhraseH1H1Text,
    catchPhraseH1H4Text,
    catchPhraseH2H3Text,
    catchPhraseH3H3Text,
    articleText,
    indexTitle,
    subscribeLabel,
    seeGalleryLabel,
  } = locale;

  return (
    <Page mainClassName="" title={indexTitle}>
      <article className="index-article flex h-full flex-col items-center py-4">
        <div className="flex w-full flex-col items-center py-4 md:float-right">
          <div className="flex flex-col md:table-row-group">
            <div className="flex-col md:table-row">
              <div className="align-middle md:table-cell">
                <h4 className="text-pretty">{catchPhraseH1H1Text}</h4>
                <p className="text-left">{catchPhraseH1H4Text}</p>
              </div>
              <div className="flex items-center justify-center md:table-cell md:w-1/3">
                <Image
                  className="h-auto w-11/12 md:h-auto"
                  src="/homepage_community.png"
                  width={300}
                  height={300}
                  alt="Community"
                />
              </div>
            </div>
            <div className="table-row">
              <div className="align-middle md:table-cell">
                <h4 className="text-pretty">{catchPhraseH2H3Text}</h4>
              </div>
              <div className="items-center justify-center md:table-cell md:w-1/3">
                <Image
                  className="h-auto w-4/5 md:h-auto md:max-w-sm"
                  src="/homepage_cockpit.png"
                  width={300}
                  height={300}
                  alt="Cockpit"
                />
              </div>
            </div>
            <div className="table-row">
              <div className="align-middle md:table-cell">
                <h4 className="text-pretty">{catchPhraseH3H3Text}</h4>
              </div>
              <div className="flex items-center justify-center md:table-cell md:w-1/3">
                <Image
                  className="h-auto w-2/3 md:h-auto md:max-w-sm"
                  src="/homepage_map.png"
                  width={300}
                  height={300}
                  alt="Map"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper scale-50 justify-end">
          <CTAButton href="/signup">
            <span className="font-sans italic">{subscribeLabel}</span>
            <span>
              <ArrowIcon />
            </span>
          </CTAButton>
        </div>
        <div className="flex items-center justify-center pl-5 pr-5 pt-20">
          <Image
            src="/welcome_page_steps.png"
            alt="Description of image"
            width={700}
            height={700}
            className="rounded-lg"
          />
        </div>
        <div className="wrapper scale-50 justify-end pt-5">
          <CTAButton href="/orders">
            <span className="font-sans italic">{seeGalleryLabel}</span>
            <span>
              <ArrowIcon />
            </span>
          </CTAButton>
        </div>
      </article>
      <article className="flex h-full flex-col items-center py-4">
        <Title className="mb-4 text-2xl font-semibold md:text-3xl">
          {articleText}
        </Title>
        <ArticleList />
      </article>
    </Page>
  );
}

export default App;
