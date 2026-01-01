import React , { useState, useEffect } from 'react'
import BookShelveList from '../../../components/Bookshelves/BookshelveList/BookShelveList'
import { db } from "../../../config/firebase";
import { useAuth } from "../../../service/AuthService";
import { withProtected } from "../../../hook/route"

const Bookshelves = () => {
  return (
    <>
      <BookShelveList />
    </>
  )
}

export default withProtected(Bookshelves)