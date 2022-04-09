import React from 'react'
import RegisterCard from '../../components/Authentication/Register/RegisterCard'
import {withPublic} from '../../hook/route'
const register = () => {
  return (
   <>
    <RegisterCard />
   </>

  )
}

export default withPublic(register) 