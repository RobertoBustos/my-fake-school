import { Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@constants/index";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  return (
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
  );
};

export default LanguageSelector;
