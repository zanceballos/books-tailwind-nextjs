import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { server } from "../config/index";
import { useRouter } from "next/router";
import BookInfo from "../components/BookDetails/BookInfo";
import RecommendList from "../components/BookDetails/Lists/RecommendList";
const BookDetails = ({ bookInfo }) => {
  console.log(bookInfo);
  const router = useRouter();
  //set a usestate
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!router.isReady) return;

    if (bookInfo != null) {
      setLoading(false);
    }
  }, [router.isReady, bookInfo]);

  return (
    <>
      {!loading && (
        <Container maxW={{base:"80%", lg:"90%" , md:"95%", sm:"100%"}}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            mt="2%"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Book Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <BookInfo details={bookInfo} />
          
        </Container>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`${server}/api/books/details/${context.query.id}`);
  const bookInfo = await res.json();
  return {
    props: {
      bookInfo,
    },
  };
};

export default BookDetails;
