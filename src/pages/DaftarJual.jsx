import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import InfoSeller from '../components/daftarjual/main/InfoSeller'
import ListJual from '../components/daftarjual/main/ListJual'

const DaftarJual = () => {
  const [success, setSuccess] = React.useState(true);
  return (
    <>
      <Navbars/>
      <InfoSeller success={success} setSuccess={setSuccess}/>
      <ListJual success={success} setSuccess={setSuccess}/>
    </>
  )
}

export default DaftarJual