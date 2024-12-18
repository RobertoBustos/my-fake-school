import CustomText from "@components/common/CustomText";
import type { PointType } from "@customTypes/index";
import { useDirections, useMemoizedTranslation } from "@hooks/index";
import "@styles/components/maps/Directions.css";

export type DirectionsPropsType = {
  origin: PointType;
  destination: PointType;
};

const Directions = ({ origin, destination }: DirectionsPropsType) => {
  const { t } = useMemoizedTranslation();
  const { routes, selected, leg, routeIndex, setRouteIndex } = useDirections(
    origin,
    destination
  );

  if (!leg) return null;
  return (
    <div className="directions">
      <div className="directions-box">
        <CustomText text={selected.summary} className="directions-summary" />
        <CustomText
          text={`${t("maps.from", {
            from: leg.start_address.split(",")[0],
          })} ${t("maps.to", { to: leg.end_address.split(",")[0] })}`}
          className="directions-info"
        />
        <CustomText
          text={t("maps.distance", { distance: leg.distance?.text })}
          className="directions-info"
        />
        <CustomText
          text={t("maps.duration", { duration: leg.duration?.text })}
          className="directions-info"
        />
        {routes.length > 1 ? (
          <CustomText
            text={t("maps.otherRoutes")}
            className="directions-alternative"
          />
        ) : null}
        {routes.map((route, index) => {
          return (
            index !== routeIndex && (
              <div onClick={() => setRouteIndex(index)} key={route.summary}>
                <CustomText
                  text={`${route.summary} - ${route.legs[0].distance?.text} - ${route.legs[0].duration?.text}`}
                  className="directions-option"
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Directions;
