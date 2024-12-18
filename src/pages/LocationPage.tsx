import CustomSwitchButton from "@components/common/CustomSwitchButton";
import Layout from "@components/common/Layout";
import GoogleMapProvider from "@components/maps/provider/GoogleMapProvider";
import { useMemoizedTranslation } from "@hooks/index";
import "@styles/components/maps/GoogleMap.css";
import { useState } from "react";

export type MapProvider = "google" | "leaflet";

export const LocationPage = () => {
  const { t } = useMemoizedTranslation();
  const [googleMapsProvider, setGoogleMapsProvider] = useState<boolean>(true);

  return (
    <Layout
      header={{ showBackButton: true, showLanguageSelector: true }}
      pageTabTitle={t("pageTabTitles.location")}
    >
      <CustomSwitchButton
        label={googleMapsProvider ? "Google" : "Leaflet"}
        onClick={() => setGoogleMapsProvider(!googleMapsProvider)}
      />
      {googleMapsProvider ? <GoogleMapProvider /> : <div></div>}
    </Layout>
  );
};
