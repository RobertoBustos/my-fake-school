import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import Layout from "@components/common/Layout";
import CustomButton from "@components/CustomButton";
import PageTitle from "@components/PageTitle";
import { homePageOptions } from "@constants/index";

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
