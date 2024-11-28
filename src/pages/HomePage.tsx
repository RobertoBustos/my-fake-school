import { useNavigate } from "react-router-dom";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import CustomButton from "@components/common/CustomButton";
import { homePageOptions } from "@constants/index";
import LogoutButton from "@components/LogoutButton";
import "@styles/pages/HomePage.css";
import CustomText from "@components/common/CustomText";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useMemoizedTranslation();

  const headerProps = {
    showLanguageSelector: true,
    showBackButton: true,
  };

  return (
    <Layout pageTabTitle={t("pageTabTitles.homePage")} header={headerProps}>
      <CustomText className="pageTitle" text={t("homePage.title")} />
      {homePageOptions.map((element) => {
        return (
          <CustomButton
            key={element}
            onClick={() => {
              navigate(`/${element}`);
            }}
            buttonLabel={t(`homePage.options.${element}`)}
            className={"buttonoption"}
          />
        );
      })}
      <LogoutButton className={"buttonoption"} />
    </Layout>
  );
};

export default HomePage;
