import React from 'react'
import { withPublic } from '../../hook/route'
import ChangePasswordCard from '../../components/Authentication/ChangePassword/ChangePasswordCard'
const changepassword = () => {
  return (
    <>
      <ChangePasswordCard />
    </>
  )
}

export default withPublic(changepassword) 