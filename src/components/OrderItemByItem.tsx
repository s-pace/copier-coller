import React, { useState } from "react";
import { FileDto, Interaction, Order } from "@/generated/types";
import OrderItem from "@/components/OrderItem";
import { useCreateInteractionMutation } from "../hooks/useGraphQLHooks";
import { useCurrentUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bookmark,
  Flame,
  MessageSquareText,
  TicketSlash,
  HandHeart,
  HandHelping,
  SmilePlus,
  Loader,
  Share,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "./ui/button";
import { clsx } from "clsx";

const OrderItemByItem: React.FC<{
  order: Order;
  screenshot?: FileDto;
  interactions: Interaction[];
  toggleShare: () => void;
  isBlock?: boolean;
}> = ({ order, toggleShare, screenshot, interactions, isBlock = false }) => {
  const [isCommented, setIsCommented] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isStared, setIsStared] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLottery, setIsLottery] = useState(false);

  const user = useCurrentUser();

  const [createInteraction, { loading }] = useCreateInteractionMutation();

  return (
    <OrderItem
      order={{ ...order, interactions }}
      key={order.id}
      isCommented={isCommented}
      isBurning={isBurning}
      isStared={isStared}
      isLottery={isLottery}
      screenshot={screenshot}
      isBlock={isBlock}
      cta={
        <OrderItemCTA
          loading={loading}
          toggleSelection={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "comment",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            setIsCommented((a) => !a);
          }}
          toggleBurning={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "burn",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            setIsBurning((a) => !a);
          }}
          toggleStarred={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "star",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            setIsStared((a) => !a);
          }}
          toggleLottery={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "lottery",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            setIsLottery((a) => !a);
          }}
          toggleShare={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "share",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            toggleShare();
          }}
          toggleClaim={async () => {
            try {
              await createInteraction({
                variables: {
                  data: {
                    createdAt: new Date().toISOString(),
                    action: "claim",
                    orderId: order.id ?? "unknown",
                    userId: user?.uid ?? "anonymous",
                  },
                },
              });
            } catch (error) {
              console.error("Error creating comment:", error);
            }
            setIsClaimed((a) => !a);
          }}
          isClaimed={isClaimed}
          isCommented={isCommented}
        />
      }
    />
  );
};

function Comment({ toggleSelection }: { toggleSelection: () => void }) {
  return (
    <DropdownMenuItem
      inset={false}
      className="hover:scale-150"
      onClick={() => toggleSelection()}
    >
      <MessageSquareText className="text-purple-500" />
    </DropdownMenuItem>
  );
}

const OrderItemCTA = ({
  toggleSelection,
  toggleBurning,
  toggleStarred,
  toggleClaim,
  toggleLottery,
  toggleShare,
  loading = false,
  isClaimed = false,
  isCommented = false,
}: {
  toggleSelection: () => void;
  toggleBurning: () => void;
  toggleStarred: () => void;
  toggleClaim: () => void;
  toggleLottery: () => void;
  toggleShare: () => void;
  loading: boolean;
  isClaimed: boolean;
  isCommented: boolean;
}) => {
  const { locale } = useLanguage();

  const {
    claimLabel,
    pendingLabel,
    shareLabel,
    upVoteLabel,
    lotteryLabel,
    favoriteLabel,
  } = locale;
  return (
    <div
      className="flex justify-end gap-4"
      onMouseEnter={(e) =>
        e.currentTarget.classList.add("hover:animate-disappear")
      }
      onMouseLeave={(e) =>
        e.currentTarget.classList.remove("hover:animate-disappear")
      }
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={loading}
              variant={"outline"}
              ariaLabel="Share"
              onClick={() => toggleShare()}
            >
              <Share className="duration-600 animate-fade-in h-[1.2rem] w-[1.2rem] min-w-[0] rotate-0 scale-100 transform transition-all transition-transform ease-in-out hover:translate-x-[-0.2rem] hover:translate-y-[0.1rem] hover:rotate-12 hover:scale-150" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{shareLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={loading}
                  variant={"outline"}
                  ariaLabel="React"
                >
                  <SmilePlus className="duration-600 animate-fade-in h-[1.2rem] w-[1.2rem] min-w-[0] rotate-0 scale-100 transform transition-all transition-transform ease-in-out hover:translate-x-[-0.2rem] hover:translate-y-[0.1rem] hover:rotate-12 hover:scale-150" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>React</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" className="min-w-[0rem]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  inset={false}
                  className={"hover:scale-150"}
                  onClick={() => toggleBurning()}
                >
                  <Flame className="text-red-500" />
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>{upVoteLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  inset={false}
                  className="hover:scale-150"
                  onClick={() => toggleStarred()}
                >
                  <Bookmark className="text-yellow-500" />
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>{favoriteLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  inset={false}
                  className="hover:scale-150"
                  onClick={() => toggleLottery()}
                >
                  <TicketSlash className="text-orange-500" />
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>{lotteryLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Comment toggleSelection={toggleSelection} />
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => toggleClaim()}
              type="submit"
              className="submit-button group"
              ariaLabel="Claim order"
              variant={clsx(isCommented && "outline") as "outline"}
              disabled={isClaimed || isCommented || loading}
            >
              {!isClaimed ? (
                <>
                  <HandHelping
                    size={36}
                    className="min-w-[0] pr-2 group-hover:hidden"
                  />
                  <HandHeart
                    size={36}
                    className="duration-600 animate-fade-in hidden min-w-[0] transform pr-2 transition-transform ease-in-out group-hover:block group-hover:translate-x-[-0.2rem] group-hover:translate-y-[0.1rem] group-hover:rotate-12 group-hover:scale-150"
                  />
                  <b>{claimLabel}</b>
                </>
              ) : (
                <>
                  <Loader className="spinner mr-2" />
                  <b>{pendingLabel}</b>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{claimLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { OrderItemCTA };

export default OrderItemByItem;
