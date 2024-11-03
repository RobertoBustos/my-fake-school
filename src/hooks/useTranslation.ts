import { useTranslation } from "react-i18next"

export const useMemoizedTranslation = () => {
    const { i18n, t } = useTranslation()
    return { i18n, t }
}