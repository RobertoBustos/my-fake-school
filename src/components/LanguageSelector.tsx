import { Dropdown, DropdownButton } from "react-bootstrap";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { supportedLanguages } from "@constants/index";
import { useAppSelector } from "@redux/hooks";
import { selectFeatureFlag } from "@selectors/index";

export type LanguageSelectorPropsType = {
  isVisible: boolean;
};

const LanguageSelector = ({ isVisible }: LanguageSelectorPropsType) => {
  const { t, i18n } = useMemoizedTranslation();
  const showMultiLanguage = useAppSelector(
    selectFeatureFlag("enableMultiLanguage")
  );

  return isVisible && showMultiLanguage?.value ? (
    <DropdownButton variant="secondary" title={i18n.resolvedLanguage}>
      {supportedLanguages.map((lng) => {
        return (
          <Dropdown.Item
            key={lng.nativeName}
            eventKey="1"
            onClick={() => {
              i18n.changeLanguage(lng.code);
            }}
          >
            {t(`languages.${lng.code}`)}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  ) : null;
};

export default LanguageSelector;
