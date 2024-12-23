import Image from "next/image";
import ReactGA from "react-ga";
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
  const { indexTitle, seeGalleryLabel } = locale;

  return (
    <Page mainClassName="" title={indexTitle}>
      <article className="index-article flex h-full flex-col items-center py-4">
        <div className="flex w-full flex-col items-center py-4 md:float-right">
          {["numero_1", "numero_2", "numero_2"].map((t) => (
            <Image
              key={t}
              src={`${t}.jpg`}
              width={1000}
              height={1000}
              alt="couper-coller"
            />
          ))}
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
    </Page>
  );
}

export default App;
