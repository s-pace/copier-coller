import { useUploadScreenshot } from "@/hooks/useGraphQLHooks";
import html2canvas from "html2canvas";
import { useCallback } from "react";
import { useUploadFileToS3 } from "../hooks/useUploadFileToS3";

function useScreenshot() {
  const [uploadScreenshot] = useUploadScreenshot();
  const { uploadFileToS3 } = useUploadFileToS3();

  const captureAndUploadScreenshot = useCallback(
    async (args: { fileId: string; orderId: string }) => {
      console.log("Capturing and uploading screenshot...");
      const element = document.querySelector("div canvas");

      if (!element) {
        console.log("no element");
        return;
      }

      try {
        // Capture the screenshot with specific background color
        const canvas = await html2canvas(element as HTMLElement, {
          backgroundColor: "#f9f9f9",
        });

        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );

        // Convert blob to file
        const file = new File([blob as Blob], `screenshot-${args.fileId}.png`, {
          type: "image/png",
        });

        // Get the pre-signed URL from the mutation
        const { data } = await uploadScreenshot({
          variables: {
            fileName: file.name,
            orderId: args.orderId,
          },
        });

        const { presignedUrl, fileId } = data?.uploadScreenshot?.result ?? {};

        if (!presignedUrl || !fileId) {
          return console.error("Error getting pre-signed URL");
        }

        await uploadFileToS3({
          selectedFile: file,
          presignedUrl,
        });
      } catch (error) {
        console.error("Error capturing or uploading screenshot:", error);
      }
    },
    [uploadScreenshot, uploadFileToS3],
  );

  return { captureAndUploadScreenshot };
}

export default useScreenshot;
