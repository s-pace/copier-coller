import React, { useState } from "react";
import { FileDto, Interaction, Order } from "@/generated/types";
import OrderItem from "./OrderItem";
import { OrderItemCTA } from "./OrderItemByItem";
import { useCreateInteractionMutation } from "../hooks/useGraphQLHooks";
import { useCurrentUser } from "@/contexts/UserContext";
import { Hit as AlgoliaHit } from "instantsearch.js";

export interface Hit
  extends AlgoliaHit<
    Order & {
      highlightedTitle?: React.ReactNode;
      highlightedDescription?: React.ReactNode;
      fileUrl?: string;
      interactions?: Interaction[];
    }
  > {}

const OrderHit: React.FC<{
  order: Hit;
  screenshot?: FileDto;
  onSelect?: () => void;
  toggleShare?: () => void;
}> = ({ order, toggleShare, screenshot }) => {
  const [isCommented, setIsCommented] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isStared, setIsStared] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLottery, setIsLottery] = useState(false);

  const user = useCurrentUser();
  const [createInteraction, { loading }] = useCreateInteractionMutation();

  return (
    <OrderItem
      order={{
        ...order,
        title: order.highlightedTitle || order.title,
        description: order.highlightedDescription || order.description,
      }}
      key={order?.id}
      isCommented={isCommented}
      isBurning={isBurning}
      isStared={isStared}
      isLottery={isLottery}
      screenshot={screenshot}
      isBlock
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
            toggleShare && toggleShare();
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

export default OrderHit;
