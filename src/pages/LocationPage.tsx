import CustomSwitchButton from "@components/common/CustomSwitchButton";
import Layout from "@components/common/Layout";
import LeafletMap from "@components/maps/leaflet/LeafletMap";
import GoogleMapProvider from "@components/maps/provider/GoogleMapProvider";
import { useMemoizedTranslation } from "@hooks/index";
import { useState } from "react";

export const LocationPage = () => {
  const { t } = useMemoizedTranslation();
  const [googleMapsProvider, setGoogleMapsProvider] = useState<boolean>(false);

  return (
    <Layout
      header={{ showBackButton: true, showLanguageSelector: true }}
      pageTabTitle={t("pageTabTitles.location")}
    >
      <CustomSwitchButton
        label={googleMapsProvider ? "Google" : "Leaflet"}
        onClick={() => setGoogleMapsProvider(!googleMapsProvider)}
      />
      {googleMapsProvider ? <GoogleMapProvider /> : <LeafletMap />}
    </Layout>
  );
};
