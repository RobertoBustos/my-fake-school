import { registerFeatureFlags } from "@actions/index";
import app from "@config/firebase";
import store from "@redux/store";
import { activate, fetchConfig, getAll, getRemoteConfig } from "firebase/remote-config";

const remoteConfig = getRemoteConfig(app)
//remoteConfig.settings.minimumFetchIntervalMillis = 600000;

fetchConfig(remoteConfig).then(() => {
    activate(remoteConfig).then(() => {
        const featureFlags = getAll(remoteConfig)
        console.log(`remote config initialized with status ${remoteConfig.lastFetchStatus} and with these feature flags ${JSON.stringify(featureFlags)}`)
        store.dispatch(registerFeatureFlags(featureFlags))
    })
})


export { remoteConfig };

