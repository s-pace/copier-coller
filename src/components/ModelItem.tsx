import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileDto, Order } from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import Display3DFile from "./Display3DFile";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Label } from "@/components/ui/label";
import { ReceiptText, PrinterCheck, Share } from "lucide-react";
import clsx from "clsx";
import Title from "./Title";
import { Button } from "@/components/ui/button";

interface ModelItemProps {
  order: Omit<Order, "title" | "description"> & {
    fileUrl?: string;
    thumbnailUrl?: string;
  } & { title?: React.ReactNode; description?: React.ReactNode };
  screenshot?: FileDto;
  cta?: React.ReactNode;
  isShared?: boolean;
  isBlock?: boolean;
  onSelect?: () => void;
  toggleShare?: () => void;
}

const getImageUrl = (
  thumbnailUrl?: string,
  fileUrl?: string,
  screenshotUrl?: string,
): string => {
  const urls = [thumbnailUrl, fileUrl, screenshotUrl].filter(Boolean);

  return urls.at(0) ?? "/order_preview.png";
};

const ModelItem: React.FC<ModelItemProps> = ({
  order: {
    id,
    type,
    title,
    description,
    fileId,
    completedAt,
    thumbnailUrl,
    fileUrl,
  },
  isBlock = false,
  screenshot,
  cta,
  onSelect,
  toggleShare,
}) => {
  const [display3d, setDisplay3d] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("/order_preview.png");

  const { locale } = useLanguage();

  const { descriptionLabel, enable3dLabel, shareLabel } = locale;

  useEffect(() => {
    const url = getImageUrl(thumbnailUrl, fileUrl, screenshot?.presignedUrl);
    setImageUrl(url);
  }, [thumbnailUrl, fileUrl, screenshot?.presignedUrl]);

  const Component = isBlock ? "div" : "li";

  console.log({ imageUrl, display3d });

  return (
    <Component key={id} onClick={onSelect}>
      <Card
        className={clsx(
          "flex flex-col p-2 transition-shadow hover:shadow-lg sm:flex-row",
          type === "Offer" && "bg-slate-500",
          completedAt && "bg-green-200 bg-opacity-25",
        )}
      >
        {imageUrl && !display3d ? (
          <div className="flex">
            <div className="col-span-1 flex w-full p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="m-auto">
                    <Image
                      src={imageUrl}
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
            </div>
          </div>
        ) : (
          <div className="col-span-1 flex w-full p-0">
            {fileId && <Display3DFile fileId={fileId} />}
          </div>
        )}

        <CardContent className="flex w-full overflow-scroll !p-2 !py-0 sm:max-w-[30rem] sm:max-w-[70%]">
          <div className="w-full">
            <CardHeader className="w-full overflow-scroll">
              <div className="space-between flex flex-row justify-start">
                <div className="flex flex-row justify-between">
                  <div className="flex items-center">
                    <Title className="!my-0 text-xl capitalize">{title}</Title>
                  </div>
                  {completedAt && (
                    <div className="flex">
                      <span>
                        <PrinterCheck className="ml-4 inline h-8 w-8 text-green-500" />
                      </span>
                    </div>
                  )}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"outline"}
                        ariaLabel="Share"
                        onClick={() => toggleShare && toggleShare()}
                      >
                        <Share className="duration-600 animate-fade-in h-[1.2rem] w-[1.2rem] min-w-[0] rotate-0 scale-100 transform transition-all transition-transform ease-in-out hover:translate-x-[-0.2rem] hover:translate-y-[0.1rem] hover:rotate-12 hover:scale-150" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{shareLabel}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>

            <div className="">
              <div className="flex items-start">
                <ReceiptText className="mr-2 mt-1 h-6 w-6" />
                <div className="flex max-h-[10rem] overflow-scroll">
                  <div className="max-w-[30rem] max-w-full break-words text-sm">
                    <Label className="group-hover:text-primary">
                      <strong className="pr-2">{descriptionLabel} :</strong>
                    </Label>
                    {description}
                  </div>
                </div>
              </div>
              {cta}
            </div>
          </div>
        </CardContent>
      </Card>
    </Component>
  );
};

export default ModelItem;
