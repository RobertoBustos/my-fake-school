import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import CustomButton from "@components/CustomButton";
import PageTitle from "@components/PageTitle";
import { homePageOptions } from "@constants/index";
import { useAppDispatch } from "@redux/hooks";
import { logOut } from "@actions/index";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();

  return (
    <Layout
      pageTitle="My Fake School - Home Page"
      showLanguageSelector
      showBackButton={false}
      showLoadingIndicator
    >
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
      <CustomButton
        handleClick={() => {
          dispatch(logOut());
        }}
        label={t(`homePage.options.logOut`)}
      />
    </Layout>
  );
};

export default HomePage;
