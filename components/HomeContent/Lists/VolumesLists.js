import React, { useEffect, useState } from "react";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
} from "@chakra-ui/react";
import VolumesBooks from "./VolumesBooks";
import { server } from "../../../config";
const VolumesLists = ({ header, pageid, query }) => {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Call the api and set the state
    const getVolumesfromURl = async () => {
      const res = await fetch(`${server}/api/books/volumes/${query}`);

      const volumes = await res.json();
      if (volumes) {
        setVolumes(volumes.items);
        setLoading(false);
      }
      return volumes;
    };

    getVolumesfromURl();
  }, [query]);

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing="10" mt="4">
        {[...Array(2)].map((_, i) => (
          <BookInfoSmallSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <div id={pageid}>
        {volumes != null && <VolumesBooks volumes={volumes} header={header} />}
      </div>
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
