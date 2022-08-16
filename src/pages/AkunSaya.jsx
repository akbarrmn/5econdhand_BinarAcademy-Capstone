import React from 'react'
import InfoAkunSaya from '../components/myaccount/InfoAkunSaya'
import Navbars from '../components/header/navbar/Navbars'

const AkunSaya = () => {
  return (
    <>
      <Navbars info={'Akun Saya'} />
      <InfoAkunSaya />
    </>
  )
}

export default AkunSaya