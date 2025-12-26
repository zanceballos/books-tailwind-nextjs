import React, {useEffect} from "react";
import { withProtected } from "../../hook/route";
import FavouriteLists from "../../components/Favourites/Lists/FavouriteLists";
const Favourites = () => {

  return (
    <>
      <FavouriteLists />
    </>
  );
};

export default withProtected(Favourites);
