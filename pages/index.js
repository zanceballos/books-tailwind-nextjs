import React, {useEffect , useState} from "react";
import TopCards from "../components/HomeContent/Cards/TopCards";
import VolumesLists from "../components/HomeContent/Lists/VolumesLists";
import ColumnsCards from "../components/HomeContent/Cards/ColumnsCards";
import ExplorePromote from "../components/HomeContent/Extras/ExplorePromote";
import CategoryVolumes from "../components/HomeContent/Lists/CategoryVolumes";
import FavouritesPromote from "../components/HomeContent/Extras/FavouritesPromote";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
export default function Home() {
  return (
    <div>
      <ColumnsCards />
      <TopCards />
      <VolumesLists
        query="subject:fantasy"
        header="New Releases"
        pageid="new-releases"
      />
      <VolumesLists  query="subject:youngadult" header="Top 100 Books"  pageid="top-books" />
      <ExplorePromote />
      <CategoryVolumes  query="subject:fantasy" header="Fantasy" pageid="fantasy" />
      <CategoryVolumes  query="starwars" header="Sci-fi" pageid="science-fiction" />
      <FavouritesPromote />
      <CategoryVolumes  query="subject:thriller" header="Thriller" pageid="thriller" />
      <CategoryVolumes  query="subject:romance" header="Romance" pageid="romance"/>
      
    </div>
  );
}

