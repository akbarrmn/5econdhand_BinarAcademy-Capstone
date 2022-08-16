import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import Transaction from '../components/transaction/Transaction'

const TransactionLog = () => {
    return (
        <>
            <Navbars info={'Transaksi'} />
            <Transaction />
        </>
    )
}

export default TransactionLog