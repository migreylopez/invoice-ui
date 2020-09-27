import React, { useState } from 'react';
import InvoiceRow from './InvoiceRow'
import Table from 'react-bootstrap/Table';
import EditInvoiceModal from './EditInvoiceModal'

export default function InvoiceList({ invoices, setInvoices }) {
	const [editInvoiceModalShow, setEditInvoiceModalShow] = useState(false)
	const [invoiceToEdit, setInvoiceToEdit] = useState({ customer: {}, products: [] })

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