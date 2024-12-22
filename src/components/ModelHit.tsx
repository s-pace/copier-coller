import React from "react";
import { FileDto, Interaction, Order } from "@/generated/types";
import ModelItem from "@/components/ModelItem";
import { useCreateInteractionMutation } from "../hooks/useGraphQLHooks";
import { useCurrentUser } from "@/contexts/UserContext";
import { Hit as AlgoliaHit } from "instantsearch.js";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import ArrowIcon from "./ArrowIcon";

const ModelItemCTA = ({ loading = false }: { loading: boolean }) => {
  const { locale } = useLanguage();

  const { claimLabel } = locale;
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
      <div className="flex">
        <div className="wrapper scale-50 justify-end">
          <Button
            type="submit"
            className="submit-button cta h-full !pr-0"
            ariaLabel="Create order now"
            disabled={loading}
          >
            {}
            <span className="pr-8 font-sans italic">{claimLabel}</span>

            <span>
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ModelItemCTA };

export interface ModelHitSchema
  extends AlgoliaHit<
    Order & {
      highlightedTitle?: React.ReactNode;
      highlightedDescription?: React.ReactNode;
      fileUrl?: string;
      interactions?: Interaction[];
    }
  > {}

const ModelHit: React.FC<{
  order: ModelHitSchema;
  screenshot?: FileDto;
  onSelect?: () => void;
  toggleShare?: () => void;
}> = ({ order, toggleShare, screenshot }) => {
  const user = useCurrentUser();
  const [createInteraction, { loading }] = useCreateInteractionMutation();

  return (
    <ModelItem
      order={{
        ...order,
        title: order.highlightedTitle || order.title,
        description: order.highlightedDescription || order.description,
      }}
      key={order?.id}
      screenshot={screenshot}
      isBlock
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
      cta={<ModelItemCTA loading={loading} />}
    />
  );
};

export default ModelHit;
