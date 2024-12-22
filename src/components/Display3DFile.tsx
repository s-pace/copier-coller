import { isEmpty } from "lodash";
import { useLanguage } from "../i18n/LanguageProvider";
import { useGetFileQuery } from "../hooks/useGraphQLHooks";
import ErrorMessage from "./ErrorMessage";
import StlViewer from "./StlViewer";

const Display3DFile = ({
  fileId,
  toolTipText,
}: {
  fileId: string;
  toolTipText?: string;
}) => {
  // Use the custom hook to fetch the presigned URL
  const { data, loading, error } = useGetFileQuery({ fileId });
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

  // Assuming the query returns a result object with a 'result' field containing the presigned URL
  if (data && data.getFile.result) {
    return (
      <StlViewer
        url={data.getFile.result.presignedUrl}
        toolTipText={toolTipText}
      />
    );
  }

  return <p>No data available</p>;
};

export default Display3DFile;
