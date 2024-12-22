import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { isEmpty, isString } from "lodash";
import { ChangeEvent, ReactNode, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import {
  useUploadFile,
  useUploadProfilePicture,
} from "../hooks/useGraphQLHooks";
import Display3DFile from "./Display3DFile";
import DisplayUploadedImage from "./DisplayUploadedImageFile";
import { useUploadFileToS3 } from "../hooks/useUploadFileToS3";
import { UploadFileResult } from "@/generated/types";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const UploadToS3WithNativeSdk = ({
  onSuccess,
  brother,
  shouldDisplay = false,
  isProfilePicture = false,
  acceptedFileTypes = ".stl",
  placeholder,
  big = false,
}: {
  brother?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (fileId: string) => void;
  shouldDisplay?: boolean;
  big?: boolean;
  isProfilePicture?: boolean;
  acceptedFileTypes?: string;
  placeholder?: ReactNode;
}) => {
  const [uploadedFile, setUploadedFile] = useState<{
    fileId: string;
    presignedUrl: string;
  }>();
  const [uploadFile] = useUploadFile();
  const [uploadProfilePicture, { loading }] = useUploadProfilePicture();
  const { uploadFileToS3, progress } = useUploadFileToS3();

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEmpty(e.target.files) && isString(e.target.files![0]?.name)) {
      const selectedFile = e.target.files![0];
      const queryArgs = { variables: { fileName: selectedFile.name } };

      let resultUploadedFile: UploadFileResult["result"];

      if (isProfilePicture) {
        const result = await uploadProfilePicture(queryArgs);
        result.data?.uploadProfilePicture?.result?.fileId &&
          onSuccess(result.data.uploadProfilePicture.result.fileId);
        resultUploadedFile =
          result.data?.uploadProfilePicture?.result ?? undefined;
      } else {
        const result = await uploadFile(queryArgs);

        result.data?.uploadFile?.result?.fileId &&
          onSuccess(result.data.uploadFile.result.fileId);
        resultUploadedFile = result.data?.uploadFile?.result ?? undefined;
      }

      setUploadedFile(resultUploadedFile);
      await uploadFileToS3({
        selectedFile,
        presignedUrl: resultUploadedFile?.presignedUrl,
      });
    }
  };

  const { locale } = useLanguage();

  const { progressLabel, orderConfirmedLabel } = locale;

  const is3D = acceptedFileTypes === ".stl";

  const isProgress = loading || (progress != 100 && progress >= 1);

  return (
    <>
      <div className="flex w-full flex-col space-y-2">
        {!is3D && isProgress && (
          <div className="my-2 flex w-full">{placeholder}</div>
        )}
        {shouldDisplay && (
          <div className="flex w-full flex-col items-center justify-between">
            {progress === 100 && uploadedFile?.fileId && (
              <div className="my-2 flex w-full">
                {is3D ? (
                  <Display3DFile
                    fileId={uploadedFile?.fileId}
                    toolTipText={orderConfirmedLabel}
                  />
                ) : (
                  <DisplayUploadedImage fileId={uploadedFile?.fileId} />
                )}
              </div>
            )}
            {isProgress && (
              <div className="my-2 flex w-full">
                <>
                  <Label>{progressLabel}</Label>
                  <Progress value={progress ?? 0} />
                  {progress === 100 && <span className="pl-4">✅</span>}
                </>
              </div>
            )}
          </div>
        )}
        <div className="flex">
          <Input
            className={clsx(
              "text-base sm:text-sm",
              big && "big-input h-full w-full",
            )}
            type="file"
            onChange={handleFileInput}
            accept={acceptedFileTypes}
          />
        </div>
      </div>
      {brother}
    </>
  );
};

export default UploadToS3WithNativeSdk;
