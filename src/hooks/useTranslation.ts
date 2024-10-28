import { useMemo } from "react"
import { getI18n } from "react-i18next"

export const useMemoizedTranslation = () => {
    return useMemo(() => {
        const i18n = getI18n()
        return { ...i18n, i18n: i18n, t: i18n.t }
    }, [])
}