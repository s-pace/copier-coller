import { useLanguage } from "@/i18n/LanguageProvider";
import Page from "@/components/Page";

function Map() {
  const { locale } = useLanguage();
  const { mapTitle, mapDescription, mapKeywords } = locale;
  return (
    <Page title={mapTitle} description={mapDescription} keywords={mapKeywords}>
      <article className="flex h-full flex-col items-center py-4">
        <div className="flex">
          <h1>Map</h1>
        </div>
        {/* 
        <MapContainer
          style={{
            maxWidth: "40vw",
            maxHeight: "40vh",
            minWidth: "40vw",
            minHeight: "40vh",
            overflow: "hidden",
          }}
          center={position}
          zoom={15}
          id="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
      </article>
    </Page>
  );
}

export default Map;
