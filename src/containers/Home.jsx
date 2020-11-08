import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import RecipeGridList from "../components/RecipeGridList";
import RecipeCategory from "../components/shared/RecipeCategory";
import Loading from "../components/shared/Loading";
import { RECIPES_BY_CATEGORY } from "../queries/recipe";
import { useStyles } from "../styles/home";
import { UserContext } from "../context/user";

const Home = () => {
  const { data, loading } = useQuery(RECIPES_BY_CATEGORY, {
    variables: { veryPopular: true, count: 20 },
  });
  const { data: data1, loading: loading1 } = useQuery(RECIPES_BY_CATEGORY, {
    variables: { title: "chicken", price: 200, count: 20 },
  });
  const { refetch } = useContext(UserContext);

  const classes = useStyles();

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, []);

  if (loading || loading1) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      <RecipeGridList />
      {data && (
        <RecipeCategory
          data={data.recipesByCategory}
          name={"Popular Recipes"}
          enableButton={false}
        />
      )}
      {data1 && (
        <RecipeCategory
          data={data1.recipesByCategory}
          name={"Chicken Recipes Under $200"}
          enableButton={false}
        />
      )}
    </Paper>
  );
};

export default Home;
