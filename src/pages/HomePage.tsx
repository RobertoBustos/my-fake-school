import { useNavigate } from "react-router-dom";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout2 from "@components/common/Layout2";
import CustomButton from "@components/common/CustomButton";
import PageTitle from "@components/PageTitle";
import { homePageOptions } from "@constants/index";
import LogoutButton from "@components/LogoutButton";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useMemoizedTranslation();

  const headerProps = {
    showLanguageSelector: true,
    showBackButton: true,
  };

  const buttonStyle = {
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "orange",
    color: "black",
    fontWeight: "bold",
    width: "200px",
    height: "50px",
    borderRadius: "25px",
  };

  return (
    <Layout2 pageTabTitle={t("pageTabTitles.homePage")} header={headerProps}>
      <PageTitle titleText={t("homePage.title")} />
      {homePageOptions.map((element) => {
        return (
          <CustomButton
            key={element}
            onClick={() => {
              navigate(`/${element}`);
            }}
            buttonLabel={t(`homePage.options.${element}`)}
            style={buttonStyle}
            className={""}
          />
        );
      })}
      <LogoutButton className={""} style={buttonStyle} />
    </Layout2>
  );
};

export default HomePage;
