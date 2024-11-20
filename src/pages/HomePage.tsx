import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout2 from "@components/common/Layout2";
import CustomButton from "@components/CustomButton";
import PageTitle from "@components/PageTitle";
import { homePageOptions } from "@constants/index";
import { useAppDispatch } from "@redux/hooks";
import { logOut } from "@actions/index";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();

  const headerProps = {
    showLanguageSelector: true,
    showBackButton: true,
  };

  return (
    <Layout2 pageTabTitle={t("pageTabTitles.homePage")} header={headerProps}>
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
    </Layout2>
  );
};

export default HomePage;
