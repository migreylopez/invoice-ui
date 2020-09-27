import React, { useState } from 'react';
import InvoiceRow from './InvoiceRow'
import Table from 'react-bootstrap/Table';
import EditInvoiceModal from './EditInvoiceModal'

export default function InvoiceList({invoices, setInvoices}) {
    const [editInvoiceModalShow, setEditInvoiceModalShow] = useState(false)
    const [invoiceToEdit, setInvoiceToEdit] = useState({customer:{}, products:[]})

    return (
        <div>
            <EditInvoiceModal invoice={invoiceToEdit} setInvoices={setInvoices} show={editInvoiceModalShow} onHide={() => setEditInvoiceModalShow(false)} />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Currency</th>
                        <th>Products</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Deleted</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => {
                        return <InvoiceRow setInvoices={setInvoices} setInvoiceToEdit={setInvoiceToEdit} setEditInvoiceModalShow={setEditInvoiceModalShow} key={invoice.id} invoice={invoice} />
                    })}
                </tbody>
            </Table>
        </div>
    );
};

// [
//     {
//       "id": "f839e201-332d-4d13-9107-a5c837072d76",
//       "created": "2020-09-25T19:37:22.056Z",
//       "currency": "EUR",
//       "customer": {
//         "id": "55a59524-c623-4204-9465-7d16c80a9401",
//         "name": "vam0salaplaya",
//         "address": "Sokolska 50"
//       },
//       "products": [
//         {
//           "sku": "lolzSKU",
//           "name": "Monitor 360hz",
//           "quantity": 1,
//           "price": 550.48
//         }
//       ]
//     }
//   ]