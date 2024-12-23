import React from "react";
import LocalesEnum from "../i18n/LocalesEnum";
import { HeaderNav } from "./HeaderNav";
import LanguagesSelector from "./LanguagesSelector";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const languageEmojiMap: Record<LocalesEnum, string> = {
  [LocalesEnum.EN_US]: "🇺🇸", // English
  [LocalesEnum.FR_FR]: "🇫🇷", // French
  [LocalesEnum.DE_DE]: "🇩🇪", // German
  [LocalesEnum.IT_IT]: "🇮🇹", // Italian
};

export const supportedLanguages = [
  LocalesEnum.EN_US,
  LocalesEnum.FR_FR,
  LocalesEnum.DE_DE,
  LocalesEnum.IT_IT,
]; // List of supported languages

function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="group/header grid grid-cols-4 p-2">
        <Link
          role="button"
          tabIndex={0}
          className="col-span-1 flex items-center justify-start text-center"
          href={"/"}
          aria-label="Go to Homepage"
        >
          <Image
            src="/print-jam-logo.jpg"
            className="App-logo w-40 group-hover/header:hidden"
            width={100}
            height={100}
            alt="logo"
          />
          <Image
            src="/print-jam-logo.jpg"
            className="App-logo hidden w-40 group-hover/header:block"
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
        <div className="col-span-3 grid grid-cols-4">
          <div className="relative col-span-3 row-span-2">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col">
                <div className="text-center">
                  <h3 className="project-name text-2xl font-bold leading-tight md:text-[3rem] font-blippo">
                    Couper-Coller
                  </h3>
                </div>
                <div
                  className={
                    "hidden w-full items-center justify-center md:flex"
                  }
                >
                  <div className="hidden md:flex">
                    <HeaderNav />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-2 h-full w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <div>
                {/* Just a place holder here to make sure it play nicely with the overall button */}
                {pathname !== "/go" && (
                  <Link
                    role="button"
                    tabIndex={0}
                    className="z-10 col-span-1 flex items-center justify-start text-center opacity-0 hover:scale-110"
                    href={"/go"}
                    aria-label="Go to print page"
                  >
                    <div className="heartbeat flex items-center justify-center gap-4 rounded bg-red-500 p-1 p-2 py-2 text-xs font-bold text-white">
                      <div>
                        <h4 className="project-name shadow-none">
                          <Image
                            className="w-40"
                            src="/bang.png"
                            width={24}
                            height={24}
                            alt="logo"
                          />
                        </h4>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {pathname !== "/go" && (
                  <Link
                    role="button"
                    tabIndex={0}
                    className="fixed right-[1rem] top-[1rem] col-span-1 flex items-center justify-start text-center"
                    href={"/go"}
                    aria-label="Go to print page"
                  >
                    <div
                      className="heartbeat flex items-center justify-center gap-4 rounded 
  p-1 p-2 py-2 text-xs font-bold text-white"
                    >
                      <div>
                        <Image
                          className="w-40"
                          src="/bang.png"
                          width={24}
                          height={24}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="mt-4 hover:scale-125 focus:scale-125 active:scale-125">
                <LanguagesSelector />
              </div>
              <div className="hover:scale-125 focus:scale-125 active:scale-125">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
