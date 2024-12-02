import LogoutButton from "@components/LogoutButton";
import CustomButton from "@components/common/CustomButton";
import CustomText from "@components/common/CustomText";
import Layout from "@components/common/Layout";
import { homePageOptions } from "@constants/index";
import { useMemoizedTranslation } from "@hooks/index";
import "@styles/pages/HomePage.css";
import { useNavigate } from "react-router-dom";

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
