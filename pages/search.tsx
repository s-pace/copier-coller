import { useState } from "react";
import { liteClient } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import { Copy, Search as SearchIcon, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Page from "@/components/Page";
import OrderHit, { Hit } from "@/components/OrderHit";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import StlViewer from "@/components/StlViewer";
import { useSearch } from "../src/contexts/SearchContext";
import { SearchBoxClassNames } from "react-instantsearch/dist/es/ui/SearchBox";
import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const CustomSearchIcon = ({
  classNames,
}: {
  classNames: Partial<SearchBoxClassNames>;
}) => (
  <>
    <SearchIcon
      className={`absolute left-3 top-1/4 h-5 w-5 -translate-y-1/4 text-gray-400 ${classNames}`}
    />
  </>
);

const CustomResetIcon = ({
  classNames,
}: {
  classNames: Partial<SearchBoxClassNames>;
}) => (
  <>
    <X
      className={`absolute right-3 top-1/4 h-5 w-5 -translate-y-1/4 text-gray-400 ${classNames}`}
    />
  </>
);

function SearchPage() {
  const searchConfig = useSearch();
  const { locale } = useLanguage();
  const {
    browseOrders,
    searchDescription,
    searchKeywords,
    searchPlaceholder,
    copyUrlLabel,
    shareOnLabel,
  } = locale;
  const [selectedModel, setSelectedModel] = useState<Hit | null>(null);
  const [open, setOpen] = useState(false);

  const searchClient = liteClient(
    searchConfig.config.ALGOLIA_APP_ID,
    searchConfig.config.ALGOLIA_SEARCH_KEY,
  );

  // Single hit component that will be used by Hits
  const HitComponent = ({ hit }: { hit: Hit }) => (
    <OrderHit
      key={hit.id}
      order={{
        ...hit,
        highlightedTitle: <Highlight attribute="title" hit={hit} />,
        highlightedDescription: <Highlight attribute="description" hit={hit} />,
      }}
      onSelect={() => setSelectedModel(hit)}
      toggleShare={() => setOpen((a) => !a)}
    />
  );

  return (
    <Page
      title={browseOrders}
      description={searchDescription}
      keywords={searchKeywords}
    >
      <InstantSearch searchClient={searchClient} indexName="prod.art">
        <div className="container mx-auto px-2 py-4">
          <div className="mb-4">
            <span className="font-sans italic">{browseOrders}</span>
          </div>

          <div className="relative">
            <SearchBox
              submitIconComponent={CustomSearchIcon}
              resetIconComponent={CustomResetIcon}
              placeholder={searchPlaceholder}
              classNames={{
                root: "w-full group",
                form: "relative",
                input:
                  "block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                submitIcon:
                  "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                resetIcon:
                  "absolute right-3 top-1/3 -translate-y-1 text-gray-400 group-hover:hidden",
              }}
            />
          </div>

          <Hits
            classNames={{
              list: "grid grid-cols-1 xl:grid-cols-2 gap-2",
              item: "shadow-md hover:shadow-lg transition-shadow duration-200",
            }}
            hitComponent={HitComponent}
          />

          {selectedModel && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
              <button
                className="absolute right-4 top-4 text-3xl text-white transition-opacity hover:opacity-75"
                onClick={() => setSelectedModel(null)}
              >
                ×
              </button>
              <div className="h-full w-full p-8">
                <StlViewer
                  url={selectedModel.fileUrl}
                  toolTipText={selectedModel.title}
                />
              </div>
            </div>
          )}
        </div>
      </InstantSearch>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="items-center justify-center">
          <DrawerHeader className="text-left">
            <DrawerTitle>
              <ShareDrawer
                shareOnLabel={shareOnLabel}
                copyUrlLabel={copyUrlLabel}
              />
            </DrawerTitle>
          </DrawerHeader>
          <DrawerFooter className="flex pt-2">
            <DrawerClose asChild>
              <Button variant="outline">
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Page>
  );
}

const ShareDrawer = ({
  shareOnLabel,
  copyUrlLabel,
}: {
  shareOnLabel: string;
  copyUrlLabel: string;
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      window.location.href,
    )}`;
    window.open(url, "_blank");
  };

  const shareOnInstagram = () => {
    // Instagram sharing logic (Instagram doesn't have a direct share URL)
    alert("Share on Instagram is not supported directly.");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={"link"}
          onClick={shareOnWhatsApp}
          className="mb-2 rounded bg-green-500 px-2 py-1 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 text-white"
            fill="currentColor"
          >
            <title>WhatsApp icon</title>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {shareOnLabel} WhatsApp
        </Button>
        <Button
          variant={"link"}
          onClick={shareOnInstagram}
          className="mb-2 rounded bg-pink-500 px-2 py-1 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mr-2 text-white"
          >
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
          </svg>
          {shareOnLabel} Instagram
        </Button>
        <Button
          variant={"link"}
          onClick={shareOnFacebook}
          className="mb-2 rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mr-2 text-white"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
          </svg>
          {shareOnLabel} Facebook
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant={"link"}
              onClick={() => copyToClipboard(window.location.href)}
              className="mb-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              <Copy className="mr-2 text-white" />
              {copyUrlLabel}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>URL copied to clipboard</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SearchPage;
