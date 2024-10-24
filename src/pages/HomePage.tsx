import { homePageOptions } from "../constants/index";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import PageTitle from "../components/PageTitle";
import { Fragment } from "react/jsx-runtime";
import Layout from "../components/common/Layout";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <PageTitle titleText={t("homePage.title")} />
      {homePageOptions.map((element) => {
        return (
          <Fragment key={element}>
            <CustomButton
              handleClick={() => {
                navigate(`/${element}`);
              }}
              label={t(`homePage.options.${element}`)}
            />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default HomePage;
