import { useEffect, useState } from "react";
import { StlViewer as Viewer } from "react-stl-viewer";
import Spinner from "./Spinner";

const style = {
  top: 0,
  left: 0,
  height: "50vh",
};

const StlViewer = ({
  url,
  toolTipText,
}: {
  url?: string;
  toolTipText?: string;
}) => {
  const [stlData, setStlData] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    url &&
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((data) => setStlData(data))
        .catch((error) => console.error("Error loading STL file:", error));
  }, [url]);

  if (!url) {
    return null;
  }

  if (!stlData) {
    return (
      <div className="flex w-full items-center justify-center py-4 text-center">
        <div className="flex w-full items-center justify-center">
          <Spinner />
          <p className="pl-2">Loading STL file...</p>
        </div>
      </div>
    );
  }
  let stlUrl: URL;
  try {
    stlUrl = new URL(url);
  } catch (_) {
    console.error({ message: "Presigned URL is not valid", url });
    return null; // or return a fallback UI
  }

  return (
    <div
      className="group relative w-full rounded-lg border-2 border-transparent p-5 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
      data-tooltip={toolTipText}
    >
      {toolTipText && (
        <span className="absolute left-1/2 top-0 z-10 mt-2 -translate-x-1/2 -translate-y-8 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          {toolTipText}
        </span>
      )}
      <Viewer
        modelProps={{
          scale: 3,
          positionX: 0,
          positionY: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
        }}
        showAxes
        orbitControls
        shadows
        url={stlUrl.href}
        style={style}
      />
    </div>
  );
};

export default StlViewer;
