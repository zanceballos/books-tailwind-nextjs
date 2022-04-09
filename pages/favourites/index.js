import React from "react";
import { withProtected } from "../../hook/route";
import FavIntroCard from "../../components/Favourites/Cards/FavIntroCard";
import FavouriteLists from "../../components/Favourites/Lists/FavouriteLists";
const favourites = ({ auth }) => {
  return (
    <>
      <FavouriteLists />
    </>
  );
};

export default withProtected(favourites);
