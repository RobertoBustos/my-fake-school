import { mapOptions } from "@config/index";
import { useMemoizedTranslation } from "@hooks/index";
import { notify } from "@utils/index";
import { useEffect, useState } from "react";

export const useMapConfig = () => {
    const [center, setCenter] = useState(mapOptions.defaultCenter);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { t } = useMemoizedTranslation();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                notify.error(t("errors.permission.geolocation" + error.code));
                setIsLoading(false);
            }
        );
    }, [t]);

    return { ...mapOptions, isLoading, defaultCenter: center }
}