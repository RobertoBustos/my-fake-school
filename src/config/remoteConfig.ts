import { getRemoteConfig, getValue } from "firebase/remote-config";
import app from "@config/firebase"

const remoteConfig = getRemoteConfig(app)
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

export const getFlagValue = (flagName: string) => {
    return getValue(remoteConfig, flagName).asBoolean();
}

export default remoteConfig;

