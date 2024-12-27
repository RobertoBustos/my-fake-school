import { logEvent } from "@config/index";
import { customEvents } from "@customTypes/index";
import store from "@redux/store";

export const events = customEvents;

export const eventLogger = (eventName: string, eventData: { [key: string]: any } | undefined) => {
    const state = store.getState();
    const analytics = state.indicators.analytics
    if (analytics === null) return
    return logEvent(JSON.parse(analytics), eventName, eventData)
}