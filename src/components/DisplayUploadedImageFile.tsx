import { isEmpty } from "lodash";
import Image from "next/image";
import { useLanguage } from "../i18n/LanguageProvider";
import { useGetFileQuery } from "../hooks/useGraphQLHooks"; // Ensure this hook is adapted for images
import ErrorMessage from "./ErrorMessage";

const DisplayUploadedImage = ({ fileId }: { fileId: string }) => {
  const { data, loading, error } = useGetFileQuery({ fileId }); // Adjusted for image data
  const { locale } = useLanguage();

  const { loadingLabel } = locale;

  if (loading) return <p>{loadingLabel}</p>;
  const isErrored = error || !isEmpty(data?.getFile?.reasons);

  if (isErrored)
    return (
      <div className="mb-4">
        <ErrorMessage
          message={
            data?.getFile?.reasons?.join("\n") ?? error?.message ?? "Error"
          }
        />
      </div>
    );

  // Check if the fetched data contains an image URL
  if (data && data.getFile.result?.presignedUrl) {
    return (
      <Image
        src={data.getFile.result?.presignedUrl}
        alt="Profile Picture"
        className="profile-image m-auto"
        style={{ maxWidth: "20rem" }}
        width={200}
        height={200}
      />
    );
  }

  return <p>No data available</p>;
};

export default DisplayUploadedImage;
