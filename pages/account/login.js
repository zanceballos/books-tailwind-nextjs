import React from 'react'
import LoginCard from '../../components/Authentication/Login/LoginCard'
import {withPublic} from '../../hook/route'
const login = ({auth}) => {
  return (
    <>
     <LoginCard />
    </>
  )
}

export default withPublic(login)