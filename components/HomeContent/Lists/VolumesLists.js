import React, { useEffect, useState } from "react";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
} from "@chakra-ui/react";
import VolumesBooks from "./VolumesBooks";
const VolumesLists = ({ header, pageid, query }) => {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Call the api and set te state
    const getVolumesfromURl = async () => {
      const res = await fetch(
        `http://localhost:3000/api/books/volumes/${query}`
      );
      const volumes = await res.json();
      return volumes;
    };

    getVolumesfromURl().then((data) => {
      setTimeout(() => {
        setVolumes(data.items);
        setLoading(false);
      }, 2800);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <div id={pageid}>
          {volumes != null && (
            <VolumesBooks volumes={volumes} header={header} />
          )}
        </div>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
            minChildWidth={{
              base: "200px",
              lg: "200px",
              md: "220px",
              sm: "200px",
            }}
            spacing="10"
          >
            <BookInfoSmallSkeleton />
            <BookInfoSmallSkeleton />
          
          </SimpleGrid>
        </>
      )}
    </>
  );
};

const BookInfoSmallSkeleton = () => {
  return (
    <>
      <Box padding="10" mt="2%" boxShadow="lg" bg="white" mb={50}>
        <SkeletonCircle
          size={{ base: "150px", lg: "150px", md: "150px", sm: "150px" }}
        />
        <SkeletonText mt="10" noOfLines={6} spacing="5" />
      </Box>
    </>
  );
};

export default VolumesLists;
