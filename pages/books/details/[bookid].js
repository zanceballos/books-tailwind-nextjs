import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { server } from "../../../config";
import { useRouter } from "next/router";
import BookInfo from "../../../components/BookDetails/BookInfo";
import RecommendList from "../../../components/BookDetails/Lists/RecommendList";
const BookDetail = ({ bookInfo, similarBooks }) => {
  console.log(similarBooks)
  const router = useRouter();
  //set a usestate
  const [loading, setLoading] = useState(true);
  const [filterSimilar, setFilterSimilar] = useState()
  useEffect(() => {
    if (!router.isReady) return;
    if (bookInfo != null) {
      setLoading(false);
    }

  }, [router.isReady, bookInfo]);
  return (
    <>
      {!loading && (
        <Container maxW={{ base: "80%", lg: "90%", md: "95%", sm: "100%" }}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            mt="2%"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/books/details/${bookInfo.id}`}>Book Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <BookInfo details={bookInfo} />
          <RecommendList details={bookInfo} similar={similarBooks.items}/>
        </Container>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  //get the book details
  const res = await fetch(
    `${server}/api/books/details/${context.params.bookid}`
  );
  const bookInfo = await res.json();

  // get similar books
  const similarRes = await fetch(
    `${server}/api/books/volumes/${bookInfo.volumeInfo.authors[0]}`
  );
  const similarBooks = await similarRes.json();

  return {
    props: {
      bookInfo,
      similarBooks,
    },
  };
};

export default BookDetail;
