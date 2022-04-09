import React, { useState, useEffect } from "react";
import { server } from "../../../config/index";
import {
  Text,
  Box,
  SimpleGrid,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
} from "@chakra-ui/react";
import BookCardReleases from "../Cards/BookCardReleases";

const VolumesBooks = ({ header, volumes }) => {
  console.log(volumes)
  return (
    <div>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        style={{ paddingTop: "4rem", paddingBottom: "1.5rem" }}
      >
        {header}
      </Text>
      {volumes !=null && (
        <SimpleGrid
          columns={{ base: 6, lg: 6, md: 3, sm: 2 }}
          minChildWidth={{
            base: "300px",
            lg: "300px",
            md: "170px",
            sm: "170px",
          }}
          spacing="40px"
        >
          {volumes.map((book) => <BookCardReleases key={book.id} details={book} />)
            .slice(0, 6)}
        </SimpleGrid>
      )}
    </div>
  );
};

export default VolumesBooks;
