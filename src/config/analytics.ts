import app from "@config/firebase"
import { getAnalytics, logEvent } from "firebase/analytics"

const analytics = getAnalytics(app)

export { analytics, logEvent }
