import React, { useState } from "react";
import ExploreCards from "../../components/Explore/ExploreCards";
import ExploreLists from "../../components/Explore/ExploreLists";
import { server } from "../../config";
const GroqRecommendation = ({ results }) => {
  console.log(results);
  return (
    <>
      <ExploreCards />
      <ExploreLists />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context.params;
    console.log("Query Param:", query);
  const res = await fetch(
    `${server}/api/GroqSearch/SearchResults`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    }
  );

  const results = await res.json();
  return {
    props: {
      results,
    },
  };
};

export default GroqRecommendation;
