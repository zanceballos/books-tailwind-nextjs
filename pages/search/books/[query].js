import React, { useState } from "react";
import SearchBar from "../../../components/Search/SearchBar/SearchBar";
import SearchList from "../../../components/Search/Lists/SearchList";
import { Box, Text } from "@chakra-ui/react";
import { server } from "../../../config";
const SearchBook = ({ results }) => {
  console.log(results);
  const [search, setSearch] = useState(false);
  return (
    <>
      <SearchBar />
      <SearchList results={results.items} totalItems={results.totalItems} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${server}/api/books/search/${context.params.query}`
  );

  const results = await res.json();

  return {
    props: {
      results,
    },
  };
};

export default SearchBook;
