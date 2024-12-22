import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { useLanguage } from "../i18n/LanguageProvider";

import { isNil } from "lodash";
import { useCurrentUser } from "../contexts/UserContext";
import {
  CircleUserRound,
  Fingerprint,
  Newspaper,
  ScanFace,
  UserPen,
  Wallpaper,
} from "lucide-react";
import clsx from "clsx";

export const HeaderNav = () => {
  const { locale } = useLanguage();
  const user = useCurrentUser();

  const { navHome, navSignIn } = locale;

  const navItems = [
    {
      href: "/",
      labelText: navHome,
      permanentIcon: (className: string) => <Newspaper className={className} />,
      hoverIcon: (className: string) => <Wallpaper className={className} />,
    },
    {
      href: "/signin",
      labelText: navSignIn,
      permanentIcon: (className: string) => (
        <Fingerprint className={className} />
      ),
      hoverIcon: (className: string) => <ScanFace className={className} />,
      isDisplayed: isNil(user),
    },
    {
      href: "/account",
      labelText: user?.email,
      permanentIcon: (className: string) => (
        <CircleUserRound className={className} />
      ),
      hoverIcon: (className: string) => <UserPen className={className} />,
      isDisplayed: !isNil(user),
    },
  ];

  return (
    <NavigationMenu orientation={"vertical"}>
      <NavigationMenuList className="ant-breadcrumb header-nav-compact m-auto">
        {navItems.map(
          ({ href, labelText, permanentIcon, hoverIcon, isDisplayed = true }) =>
            isDisplayed && (
              <NavigationMenuItem key={href} className="separator group">
                <Link
                  href={href}
                  legacyBehavior
                  passHref
                  className="group-hover:pl-4"
                >
                  <NavigationMenuLink
                    className={clsx(navigationMenuTriggerStyle(), "!px-4")}
                  >
                    {permanentIcon && permanentIcon("pr-2 group-hover:hidden")}
                    {hoverIcon &&
                      hoverIcon(
                        "pr-2 transition-transform duration-600 hidden group-hover:block ease-in-out transform group-hover:scale-150 min-w-[0] group-hover:rotate-12 animate-fade-in",
                      )}
                    {labelText}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
