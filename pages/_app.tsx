import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactGA from "react-ga";
import SEO from "@/components/SEO";
import SetAuth, { AUTH_TOKEN_KEY } from "@/components/SetAuth";
import { UserProvider } from "../src/contexts/UserContext";
import LanguageProvider from "@/i18n/LanguageProvider";
import "./_app.css";
import { SearchProvider } from "../src/contexts/SearchContext";

// // Initialize Apollo Client
const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/gql"
    : "https://print-jam-backend-tmg63hvxbq-ew.a.run.app/gql";

const httpLink = createHttpLink({
  uri: uri, // Your GraphQL endpoint
});

ReactGA.initialize("G-XWP9QKK70C");

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Ensure router.query is converted to a string for pageview tracking
    const path =
      router.pathname + (router.query ? JSON.stringify(router.query) : "");
    ReactGA.pageview(path);
  }, [router]);

  useEffect(() => {
    document.documentElement.lang = router.locale || "fr";
  }, [router.locale]);

  const searchConfig = {
    ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  };

  return (
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SearchProvider config={searchConfig}>
          <ApolloProvider client={client}>
            <UserProvider>
              <LanguageProvider>
                <SEO
                  title="PrintJam - L’impression 3D pour tous!"
                  keywords={[
                    "3D printing",
                    "PrintJam",
                    "creativity",
                    "DIY projects",
                    "3D printers",
                    "3D designs",
                  ].join(", ")}
                  description="PrintJam: Unleash your creativity with 3D printing. Join a community of curious minds, expert 3D printers, and creative designers. From DIY projects to custom designs, explore endless possibilities."
                />
                <SetAuth>
                  <div className="flex flex-col">
                    <Component {...pageProps} />
                  </div>
                </SetAuth>
              </LanguageProvider>
            </UserProvider>
          </ApolloProvider>
        </SearchProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
export default App;
