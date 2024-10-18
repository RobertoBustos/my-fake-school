import { homePageOptions } from "../constants/index";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import PageTitle from "../components/PageTitle";
import { Fragment } from "react/jsx-runtime";
import Layout from "../components/Layout";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <PageTitle titleText="WELCOME TO YOUR HOME PAGE" />
      {homePageOptions.map((element) => {
        return (
          <Fragment key={element}>
            <CustomButton
              handleClick={() => {
                navigate(`/${element}`);
              }}
              label={element.toUpperCase()}
            />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default HomePage;
