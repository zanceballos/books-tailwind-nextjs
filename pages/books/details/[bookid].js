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
import Head from "next/head";
const BookDetail = ({ bookInfo, similarBooks }) => {
  //SEO Integration for each book detail page
  const title = bookInfo.volumeInfo.title;
  const author = bookInfo.volumeInfo.authors?.[0] || "Unknown";

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
      <Head>
        <title>{title} | Bookify</title>
        <meta
          name="description"
          content={`Read details about ${title} by ${author}.`}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={bookInfo.volumeInfo.imageLinks?.thumbnail}
        />
      </Head>
      {!loading && (
        <Container maxW={{ lg: "90%", md: "100%" }}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            mt="2%"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/books/details/${bookInfo.id}`}>
                Book Details
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <BookInfo details={bookInfo} />

          <RecommendList details={bookInfo} similar={similarBooks.items} />
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
