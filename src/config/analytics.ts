import { getAnalytics, logEvent } from "firebase/analytics"
import app from "@config/firebase"

const analytics = getAnalytics(app)

export { analytics, logEvent }
