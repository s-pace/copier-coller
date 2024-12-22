// Import necessary hooks and components at the top of your Interactions.tsx file
import React from "react";
import Page from "../../src/components/Page";
import { useListInteractionQuery } from "../../src/hooks/useGraphQLHooks";
import Title from "@/components/Title";
import ErrorMessage from "../../src/components/ErrorMessage";
import Spinner from "../../src/components/Spinner";
import { useLanguage } from "../../src/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/contexts/UserContext";
import {
  Battery,
  Bookmark,
  Flame,
  MessageSquareText,
  Share2,
  ShoppingCart,
  TicketSlash,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, formatDistanceToNow } from "date-fns";

const getIconForAction = (action: string) => {
  switch (action) {
    case "burn":
      return (
        <Flame className="inline h-8 w-8 pr-2 text-red-500 group-hover:scale-150" />
      );
    case "share":
      return (
        <Share2 className="inline h-8 w-8 pr-2 text-blue-500 group-hover:scale-150" />
      );
    case "comment":
      return (
        <MessageSquareText className="inline h-8 w-8 pr-2 text-purple-500 group-hover:scale-150" />
      );
    case "claim":
      return (
        <ShoppingCart className="inline h-8 w-8 pr-2 text-yellow-600 group-hover:scale-150" />
      );
    case "lottery":
      return (
        <TicketSlash className="inline h-8 w-8 pr-2 text-orange-600 group-hover:scale-150" />
      );
    case "star":
      return (
        <Bookmark className="inline h-8 w-8 pr-2 text-yellow-500 group-hover:scale-150" />
      );
    default:
      return action;
  }
};

function Interactions() {
  const user = useCurrentUser();
  const filter = { userId: user?.uid };
  const {
    data: interactionData,
    loading,
    error,
  } = useListInteractionQuery(filter);

  const { locale } = useLanguage();

  const {
    myInteractionsTitles, // Rename or adjust according to the context of interactions
    interactionDescription, // Adjust descriptions to fit the interaction context
    interactionKeywords, // Consider renaming or adjusting keywords
  } = locale;

  // Placeholder function to process interactions
  // Implement logic to display interactions meaningfully, possibly grouping them by order ID or another criterion
  const processedInteractions = interactionData?.listInteractions
    ? interactionData.listInteractions
    : [];

  return (
    <Page
      title={myInteractionsTitles}
      description={interactionDescription}
      keywords={interactionKeywords}
    >
      <article className="flex h-full flex-col items-center py-4">
        <Title className="first">{myInteractionsTitles}</Title>
        {error && <ErrorMessage message={error.message ?? ""} />}
        {loading && <Spinner />}
        {!loading && !error && processedInteractions.length === 0 && (
          <Battery />
        )}
        {/* Adjust the rendering logic to display interactions */}
        <ul className="grid grid-cols-1 gap-4">
          {processedInteractions.map((interaction) => (
            <li key={interaction.id} className="group">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <>
                      <div className="flex items-center gap-2">
                        {getIconForAction(interaction.action)}
                        {formatDistanceToNow(new Date(interaction.createdAt), {
                          addSuffix: true,
                        })}
                        <Button
                          variant="outline"
                          className="inline group-hover:text-foreground"
                        >
                          <X />
                        </Button>
                      </div>
                    </>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div>
                      <strong>Action:</strong>
                      {getIconForAction(interaction.action)}
                    </div>
                    <div>
                      <strong>Date:</strong>
                      {format(new Date(interaction.createdAt), "PPpp")}
                    </div>
                    {/* Add more fields as necessary */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </article>
    </Page>
  );
}

export default Interactions;
