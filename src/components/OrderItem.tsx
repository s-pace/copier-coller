import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { FileDto, Interaction, Order } from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import Display3DFile from "./Display3DFile";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Label } from "@/components/ui/label";
import {
  Baby,
  Bookmark,
  CalendarClock,
  Gift,
  MapPinHouse,
  MessageSquare,
  Printer,
  ReceiptText,
  Send,
  Share,
  Ship,
  Sunrise,
  ThumbsUp,
  TicketSlash,
  HandHeart,
  User,
  PrinterCheck,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useCreateInteractionMutation } from "@/hooks/useGraphQLHooks";
import { useCurrentUser } from "@/contexts/UserContext";
import Title from "./Title";

interface OrderItemProps {
  order: Omit<Order, "title" | "description"> & {
    fileUrl?: string;
    thumbnailUrl?: string;
    interactions?: Interaction[];
  } & { title?: React.ReactNode; description?: React.ReactNode };
  screenshot?: FileDto;
  cta?: React.ReactNode;
  isCommented?: boolean;
  isBurning?: boolean;
  isStared?: boolean;
  isLottery?: boolean;
  isShared?: boolean;
  isBlock?: boolean;
  onSelect?: () => void;
}

const InteractionTabs = ({
  likes,
  comments,
  shares,
  claims,
}: {
  likes: number;
  comments: number;
  shares: number;
  claims: number;
}) => {
  return (
    <div className="flex justify-around gap-2 py-2 text-xs">
      <div className="group flex items-center hover:text-primary">
        <ThumbsUp className="mr-2 flex h-6 w-6" />
        <span className="mr-2">{likes}</span>
        <span className="hidden group-hover:inline"> Likes</span>
      </div>
      <div className="group flex items-center hover:text-primary">
        <MessageSquare className="mr-2 flex h-6 w-6" />
        <span className="mr-2">{comments}</span>
        <span className="hidden group-hover:inline"> Comments</span>
      </div>
      <div className="group flex items-center hover:text-primary">
        <Share className="mr-2 flex h-6 w-6" />
        <span className="mr-2">{shares}</span>
        <span className="hidden group-hover:inline"> Shares</span>
      </div>
      <div className="group flex items-center hover:text-primary">
        <HandHeart className="mr-2 flex h-6 w-6" />
        <span className="mr-2">{claims}</span>
        <span className="hidden group-hover:inline"> Claims</span>
      </div>
    </div>
  );
};

const isImageUrl = (url: string) => {
  try {
    new URL(url); // This will throw an error if url is not valid
    return (
      url.toLowerCase().endsWith(".png") ||
      url.toLowerCase().endsWith(".jpg") ||
      url.toLowerCase().endsWith(".jpeg")
    );
  } catch {
    return false;
  }
};

const OrderItem: React.FC<OrderItemProps> = ({
  order: {
    id,
    type,
    title,
    deadline,
    status,
    description,
    estimatedPrice,
    deliveryMethod,
    createdAt,
    address,
    fileId,
    completedAt,
    thumbnailUrl,
    fileUrl,
    interactions = [],
  },
  screenshot,
  cta,
  isCommented = false,
  isBurning = false,
  isStared = false,
  isLottery = false,
  isBlock = false,
  onSelect,
}) => {
  const [display3d, setDisplay3d] = useState(false);
  const [richTextComment, setRichComment] = useState("");

  const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setRichComment(event.target.value);
  };
  const { locale } = useLanguage();
  const user = useCurrentUser();

  const [createInteraction, { loading }] = useCreateInteractionMutation();

  const onSendComment = async () => {
    console.log("onSendComment", richTextComment);
    try {
      await createInteraction({
        variables: {
          data: {
            createdAt: new Date().toISOString(),
            action: "comment",
            orderId: id ?? "unknown",
            userId: user?.uid ?? "anonymous",
            richTextComment,
          },
        },
      });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString(
    locale.locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const deadlineAt = formatDistanceToNow(deadline, { addSuffix: true });

  const {
    deadlineLabel,
    statusLabel,
    descriptionLabel,
    estimatedPriceLabel,
    deliveryMethodLabel,
    createdAtLabel,
    addressLabel,
    commentPlaceholder,
    sendLabel,
    enable3dLabel,
    typeOfferPlaceholder,
    typeRequestPlaceholder,
  } = locale;

  const Component = isBlock ? "div" : "li";

  return (
    <Component key={id} onClick={onSelect}>
      <Card
        className={clsx(
          isBurning && "fire",
          isStared && "glowing",
          isLottery && "card-shine-effect",
          type === "Offer" && "bg-slate-500",
          completedAt && "bg-green-200 bg-opacity-25",
        )}
      >
        <CardHeader>
          <div className="flex flex-col">
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex grow items-center justify-center">
                  <div className="flex grow items-center justify-center">
                    {type === "Offer" && <Printer className="mr-4 h-8 w-8" />}
                    <Title className="!m-2 text-2xl capitalize">{title}</Title>
                  </div>
                </div>
                <div className="flex">
                  {isStared && (
                    <Bookmark className="ml-4 inline h-8 w-8 text-yellow-500" />
                  )}
                  {isLottery && (
                    <TicketSlash className="ml-4 inline h-8 w-8 text-yellow-500" />
                  )}

                  {completedAt && (
                    <span>
                      <PrinterCheck className="ml-4 inline h-8 w-8 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <div className="flex">
                  <InteractionTabs
                    comments={
                      interactions.filter((i) => i.action === "comment").length
                    }
                    likes={
                      interactions.filter((i) => i.action === "burn").length
                    }
                    shares={
                      interactions.filter((i) => i.action === "share").length
                    }
                    claims={
                      interactions.filter((i) => i.action === "claim").length
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              {type === "Request" ? (
                <p>{typeRequestPlaceholder}</p>
              ) : (
                <>
                  <p className="text-secondary">{typeOfferPlaceholder}</p>
                </>
              )}
            </div>
            <CardDescription></CardDescription>
          </div>
        </CardHeader>

        {fileId && (
          <div className="col-span-1 flex w-full py-4">
            {(thumbnailUrl || screenshot?.presignedUrl || fileUrl) &&
            !display3d ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="m-auto">
                    <Image
                      src={
                        thumbnailUrl && isImageUrl(thumbnailUrl)
                          ? thumbnailUrl
                          : fileUrl && isImageUrl(fileUrl)
                            ? fileUrl
                            : screenshot?.presignedUrl &&
                                isImageUrl(screenshot?.presignedUrl)
                              ? screenshot?.presignedUrl!
                              : "/order_preview.png"
                      }
                      alt="Profile Picture"
                      className="profile-image m-auto"
                      style={{ maxWidth: "20rem" }}
                      width={200}
                      height={200}
                      onClick={() => setDisplay3d(true)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{enable3dLabel}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Display3DFile fileId={fileId} />
            )}
          </div>
        )}
        <CardContent className="!p-2 !pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="group flex items-center">
                <Baby className="mr-2 flex h-6 w-6" />
                <Label className="group-hover:text-primary">
                  <strong className="pr-2">{createdAtLabel}</strong>
                  {formattedCreatedAt}
                </Label>
              </div>
              <div className="group flex items-center gap-2">
                <Sunrise className="mr-2 flex h-6 w-6" />
                <Label className="group-hover:text-primary">
                  <strong className="pr-2">{deadlineLabel}</strong>
                  {deadlineAt}
                </Label>
              </div>
              <div className="group flex items-center">
                <Ship className="mr-2 flex h-6 w-6" />
                <Label className="group-hover:text-primary">
                  <strong className="pr-2">{deliveryMethodLabel}</strong>
                  {deliveryMethod}
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="group flex items-center">
                <CalendarClock className="mr-2 flex h-6 w-6" />
                <Label className="group-hover:text-primary">
                  <strong className="pr-2">{statusLabel}</strong>
                  {status}
                </Label>
              </div>
              <div className="group flex items-center">
                <Gift className="mr-2 flex h-6 w-6" />
                <Label className="group-hover:text-primary">
                  <strong className="pr-2">{estimatedPriceLabel}</strong>$
                  {estimatedPrice ? estimatedPrice.toFixed(2) : "N/A"}
                </Label>
              </div>

              {address !== null && (
                <div className="group flex items-center">
                  <MapPinHouse className="mr-2 flex h-6 w-6" />
                  <Label className="group-hover:text-primary">
                    <strong className="pr-2">{addressLabel}</strong>
                    <span>{address}</span>
                  </Label>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <div className="flex items-start pb-2">
                <ReceiptText className="mr-2 mt-1 h-6 w-6" />
                <div className="flex-1 overflow-hidden">
                  <Label className="group-hover:text-primary">
                    <strong className="pr-2">{descriptionLabel}</strong>
                  </Label>
                  <div className="break-words text-sm">{description}</div>
                </div>
              </div>
              {isCommented && (
                <div className="group flex flex-row items-center gap-2">
                  <Textarea
                    className="my-2 w-full rounded-md border border-gray-300 p-2"
                    rows={4}
                    placeholder={commentPlaceholder}
                    value={richTextComment}
                    onChange={handleTextareaChange}
                  />
                  <Button
                    className="p-2"
                    onClick={() => onSendComment()}
                    disabled={loading}
                  >
                    <Send className="mr-2 flex h-6 w-6" />
                    {sendLabel}
                  </Button>
                </div>
              )}
              <ul>
                {interactions
                  .filter((i) => i.richTextComment)
                  .map((i) => (
                    <li key={i.id} className="mb-2">
                      <Card className="group flex justify-between rounded-lg p-1 opacity-50 shadow-md">
                        <div className="flex w-full flex-col">
                          <div className="space-between flex w-full flex-row items-center bg-shy px-2 text-sm">
                            <div className="flex">
                              <User className="mr-2 flex h-6 w-6" />
                              {i?.authorName}
                            </div>
                            <div className="flex group-hover:text-accent">
                              {formatDistanceToNow(new Date(i.createdAt), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>

                          <div className="flex px-2 text-sm group-hover:text-primary">
                            {i?.richTextComment}
                          </div>
                        </div>
                      </Card>
                    </li>
                  ))}
              </ul>
              {cta}
            </div>
          </div>
        </CardContent>
      </Card>
    </Component>
  );
};

export default OrderItem;
