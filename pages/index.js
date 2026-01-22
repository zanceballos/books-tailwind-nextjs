import React, { useEffect, useState } from "react";

import { fetchHeroImages } from "../service/bookService";
import LandingHome from "../components/Landing/LandingHome";

export default function Home({ heroImages }) {
  return (
   <>
   <LandingHome />
   </>
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
