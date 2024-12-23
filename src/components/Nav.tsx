"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import Link from "next/link";
import * as React from "react";
import { useCurrentUser } from "../../src/contexts/UserContext";
import { useLanguage } from "../i18n/LanguageProvider";
import { isNil } from "lodash";
import {
  Images,
  CircleUserRound,
  BookImage,
  Fingerprint,
  Mail,
  MailOpen,
  Newspaper,
  ScanFace,
  UserPen,
  Wallpaper,
} from "lucide-react";

const Nav = ({ className }: { className?: string }) => {
  const { locale } = useLanguage();
  const user = useCurrentUser();

  const { navContact, navAllModels, navSignIn, navHome } = locale;

  const iconClassName = "w-4 h-4"; // Adjust this value to change the icon size

  const navItems = [
    {
      href: "/",
      permanentIcon: (className: string) => (
        <Newspaper className={`${className} ${iconClassName}`} />
      ),
      hoverIcon: (className: string) => (
        <Wallpaper className={`${className} ${iconClassName}`} />
      ),
      labelText: navHome,
      className: "md:hidden", // Show only on mobile without <HeaderNav />
    },
    {
      href: "/signin",
      permanentIcon: (className: string) => (
        <Fingerprint className={`${className} ${iconClassName}`} />
      ),
      hoverIcon: (className: string) => (
        <ScanFace className={`${className} ${iconClassName}`} />
      ),
      labelText: navSignIn,
      isDisplayed: isNil(user),
      className: "md:hidden", // Show only on mobile without <HeaderNav />
    },
    {
      href: "/account",
      permanentIcon: (className: string) => (
        <CircleUserRound className={`${className} ${iconClassName}`} />
      ),
      hoverIcon: (className: string) => (
        <UserPen className={`${className} ${iconClassName}`} />
      ),
      labelText: user?.email,
      isDisplayed: !isNil(user),
      className: "md:hidden", // Show only on mobile without <HeaderNav />
    },
    {
      href: "/models",
      permanentIcon: (className: string) => (
        <BookImage className={`${className} ${iconClassName}`} />
      ),
      hoverIcon: (className: string) => (
        <Images className={`${className} ${iconClassName}`} />
      ),
      labelText: navAllModels,
    },
    {
      href: "/contact",
      permanentIcon: (className: string) => (
        <Mail className={`${className} ${iconClassName}`} />
      ),
      hoverIcon: (className: string) => (
        <MailOpen className={`${className} ${iconClassName}`} />
      ),
      labelText: navContact,
    },
  ];

  return (
    <div className={clsx("flex w-full md:w-auto", className)}>
      <NavigationMenu orientation="vertical" className="w-full md:w-auto">
        <NavigationMenuList className="grid w-full grid-cols-3 items-start gap-x-0 sm:grid-cols-4 md:w-auto md:min-w-32 md:flex-col md:gap-1 md:pr-1">
          {navItems.map(
            ({
              href,
              labelText,
              isDisplayed = true,
              permanentIcon,
              hoverIcon,
              className,
            }) =>
              isDisplayed && (
                <NavigationMenuItem
                  key={href}
                  className={clsx(
                    "group md:w-full",
                    className,
                    'class="group md:w-full" group m-1 inline-flex h-10 cursor-pointer items-center justify-between rounded-md bg-background px-1 text-sm font-medium text-foreground transition-colors hover:scale-105 hover:bg-accent hover:font-bold hover:text-primary hover:shadow-lg focus:bg-accent focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent',
                  )}
                >
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={clsx(
                        "flex items-center pl-2", // Adjust padding-left to align icons with padding
                      )}
                    >
                      <div className="flex-shrink-0">
                        {permanentIcon("group-hover:hidden")}
                        {hoverIcon(
                          "transition-transform duration-600 hidden group-hover:block ease-in-out transform group-hover:scale-150 min-w-[0] group-hover:rotate-12 animate-fade-in",
                        )}
                      </div>
                      <p className="whitespace-nowrap pl-2 md:inline">
                        {labelText}
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
Nav.displayName = "Nav";

type ListItemProps = {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
};

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, title, children, href, ...props }: ListItemProps, ref) => {
    return (
      <li ref={ref}>
        <NavigationMenuLink>
          <a
            href={href}
            className={clsx(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default Nav;
