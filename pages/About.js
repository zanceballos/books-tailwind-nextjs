import React from "react";

import AboutIntro from "../components/About/Background/AboutIntro";
import NextIntro from "../components/About/Cards/NextIntro";
import ChakraAbout from "../components/About/Cards/ChakraAbout";
import GBooksAbout from "../components/About/Cards/GBooksAbout";
import NetlifyAbout from "../components/About/Cards/NetlifyAbout";
const About = () => {
  return (
    <>
      <AboutIntro />
      <NextIntro />
      <ChakraAbout />
      <GBooksAbout />
      <NetlifyAbout />
    </>
  );
};

export default About;
