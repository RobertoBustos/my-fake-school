import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import CustomButton from "@components/CustomButton";
import PageTitle from "@components/PageTitle";
import { homePageOptions } from "@constants/index";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useMemoizedTranslation();

  return (
    <Layout showLanguageSelector showBackButton={false} showLoadingIndicator>
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
