import React from "react";
import Bookshelve from "../../../components/Bookshelves/Bookshelve";
import { withProtected } from "../../../hook/route"
const ShelveContent = () => {
  return (
    <>
      <Bookshelve />
    </>
  );
};

export default withProtected(ShelveContent);
