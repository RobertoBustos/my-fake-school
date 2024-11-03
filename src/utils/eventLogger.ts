import { analytics, logEvent } from "@config/analytics"
import { customEvents } from "@constants/index"

const eventLogger = (eventName: string, eventData: { [key: string]: any } | undefined) => {
    return logEvent(analytics, eventName, eventData)
}

export const events = customEvents;

export default eventLogger