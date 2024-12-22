import { useState } from "react";

type UseUploadFileToS3Output = {
  // eslint-disable-next-line no-unused-vars
  uploadFileToS3: (arg: {
    selectedFile?: File;
    presignedUrl?: string;
  }) => Promise<void>;
  progress: number;
};

/**
 * Custom hook to upload a file to Amazon S3 using a presigned URL.
 * This hook encapsulates the logic for uploading a file to S3, including progress tracking.
 *
 * @param {File | undefined} selectedFile - The file to be uploaded. Can be null.
 * @param {string | undefined} presignedUrl - The presigned URL for uploading the file to S3. Can be null.
 * @returns {UseUploadFileToS3Output} - An object containing the upload function and the current upload progress.
 * @example
 * // Example usage in a component
 * const { uploadFileToS3, progress } = useUploadFileToS3(selectedFile, presignedUrl);
 * // Call uploadFileToS3 to start the upload process
 * uploadFileToS3();
 * // Use progress to track the upload progress
 * console.log(progress);
 */
export const useUploadFileToS3 = (): UseUploadFileToS3Output => {
  const [progress, setProgress] = useState(0);

  const uploadFileToS3 = async ({
    selectedFile,
    presignedUrl,
  }: {
    selectedFile?: File;
    presignedUrl?: string;
  }) => {
    if (!selectedFile || !presignedUrl) {
      console.error("No file or presigned URL available");
      return;
    }
    // use File reader to prevent unwanted ------WebKitFormBoundary headers
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        const arrayBuffer = event.target.result;
        if (arrayBuffer !== null) {
          const blob = new Blob([arrayBuffer], { type: selectedFile.type });

          try {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", presignedUrl, true);

            xhr.upload.onprogress = function (e) {
              if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                setProgress(percentComplete);
              }
            };
            xhr.onload = () => {
              if (xhr.status === 200) {
                console.log("File uploaded successfully");
              } else {
                throw new Error("Upload failed");
              }
            };
            xhr.onerror = () => {
              console.error("Error uploading file");
            };
            xhr.send(blob);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return { uploadFileToS3, progress };
};
