import { analytics, logEvent } from "@config/analytics"
import { customEvents } from "@customTypes/index"

export const events = customEvents;

export const eventLogger = (eventName: string, eventData: { [key: string]: any } | undefined) => {
    return logEvent(analytics, eventName, eventData)
}