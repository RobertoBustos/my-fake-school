import Layout from "@components/common/Layout";
import GoogleMapProvider from "@components/maps/provider/GoogleMapProvider";
import { useMemoizedTranslation } from "@hooks/index";
import "@styles/components/maps/GoogleMap.css";
import { useState } from "react";
import { Form } from "react-bootstrap";

export type MapProvider = "google" | "leaflet";

export const LocationPage = () => {
  const { t } = useMemoizedTranslation();
  const [mode, setMode] = useState<MapProvider>("google");

  return (
    <Layout
      header={{ showBackButton: true, showLanguageSelector: true }}
      pageTabTitle={t("pageTabTitles.location")}
    >
      <Form.Check
        type="switch"
        id="custom-switch"
        label={mode}
        onClick={() => setMode(mode === "google" ? "leaflet" : "google")}
      />
      {mode === "google" ? <GoogleMapProvider /> : null}
      {mode === "leaflet" ? <div></div> : null}
    </Layout>
  );
};
