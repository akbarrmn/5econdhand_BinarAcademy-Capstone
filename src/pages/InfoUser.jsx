import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import FormUser from '../components/form/user/FormUser'

const InfoUser = () => {
  return  (
    <>
      <Navbars info={'Lengkapi Info Akun'}/>
      <FormUser/>
    </>
  )
}

export default InfoUser