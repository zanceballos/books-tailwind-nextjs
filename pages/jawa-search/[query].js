import React, { useState } from "react";
import ExploreCards from "../../components/Explore/ExploreCards";
import ExploreLists from "../../components/Explore/ExploreLists";
import { server } from "../../config";
import {Box, Spinner, Text} from "@chakra-ui/react";
import GroqSearch from "../../components/HomeContent/LLM_Components/GroqSearch";
const GroqRecommendation = ({ results }) => {
  console.log(results);
  return (
    <>
      <GroqSearch/>
    {results.books?.length === 0 ? loader() : null}
      <ExploreCards results={results.books} />
      <ExploreLists results={results.books} />
    </>
  );
};

const loader = () => {
  return <>
  <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
    <Spinner size="xl" />
    <Text ml="4" fontSize="xl">Loading recommendations...</Text>
    <Text ml="4" fontSize="xl">Yes.. Its a spinner for now</Text>
  </Box>
  </>;
}

export const getServerSideProps = async (context) => {
  const { query } = context.params;
  console.log("Query Param:", query);
  const res = await fetch(`${server}/api/GroqSearch/SearchResults`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const results = await res.json();
  return {
    props: {
      results,
    },
  };
};

export default GroqRecommendation;
