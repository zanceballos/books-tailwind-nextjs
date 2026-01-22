import React, { useEffect, useState } from "react";
import TopCards from "../../components/HomeContent/Cards/TopCards";
import VolumesLists from "../../components/HomeContent/Lists/VolumesLists";
import ColumnsCards from "../../components/HomeContent/Cards/ColumnsCards";
import ExplorePromote from "../../components/HomeContent/Extras/ExplorePromote";
import CategoryVolumes from "../../components/HomeContent/Lists/CategoryVolumes";
import FavouritesPromote from "../../components/HomeContent/Extras/FavouritesPromote";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { fetchHeroImages } from "../../service/bookService";
import GroqSearch from "../../components/HomeContent/LLM_Components/GroqSearch";
export default function Explore({ heroImages }) {
  return (
    <div>
      <ColumnsCards images={heroImages} />
      <GroqSearch />
      <FavouritesPromote />
      <ExplorePromote />
      <TopCards />
      <VolumesLists
        query="subject:fantasy"
        header="New Releases"
        pageid="new-releases"
      />
      <VolumesLists
        query="subject:juvenile+fiction"
        header="Top 100 Books"
        pageid="top-books"
      />

      <CategoryVolumes
        query="subject:fantasy"
        header="Fantasy"
        pageid="fantasy"
      />
      <CategoryVolumes
        query="starwars"
        header="Sci-fi"
        pageid="science-fiction"
      />

      <CategoryVolumes
        query="subject:thriller"
        header="Thriller"
        pageid="thriller"
      />
      <CategoryVolumes
        query="subject:romance"
        header="Romance"
        pageid="romance"
      />
    </div>
  );
}

export async function getStaticProps() {
  const heroImages = await fetchHeroImages();
  return {
    props: {
      heroImages,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}
