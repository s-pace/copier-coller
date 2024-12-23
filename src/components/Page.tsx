import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { JSX } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import SEO from "./SEO";
type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  description?: string;
  keywords?: string;
  mainClassName?: string;
};

function Page({
  children,
  title,
  description,
  keywords,
  mainClassName,
}: Props) {
  return (
    <div className="App m-8 mt-0 min-w-[50vw] max-w-5xl rounded-2xl md:mt-4">
      <SEO title={title} description={description} keywords={keywords} />
      <div className="mx-auto flex flex-col gap-2 p-2">
        {<Header />}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
          {<Nav className="w-full h-full" />}
          <main className={clsx("m-0", mainClassName)}>
            <Card className="mx-auto">{children} </Card>
          </main>
        </div>
        {<Footer />}
      </div>
    </div>
  );
}

export default Page;
