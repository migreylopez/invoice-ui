import React from 'react';
import Button from 'react-bootstrap/Button';

export default function InvoiceRow({ setInvoices, setEditInvoiceModalShow, invoice, setInvoiceToEdit }) {

	function handleEdit() {
		setInvoiceToEdit(invoice)
		setEditInvoiceModalShow(true)
	}

	function handleDelete() {
		persistInvoiceDeletion(invoice.id)
			.then(statusCode => {
				if (statusCode === 204) {
					setInvoices(prevInvoices => {
						return prevInvoices.filter(prevInvoice => prevInvoice.id !== invoice.id)
					})
				} else {
					console.log(statusCode)
					alert("Error deleting invoice")
				}
			})
	}

	return (
		<tr>
			<td>
				{invoice.id.substring(0, 8)}
			</td>
			<td>
				{invoice.customer.id.substring(0, 8)}... / {invoice.customer.name} / {invoice.customer.address}
			</td>
			<td>
				{invoice.currency}
			</td>
			<td>
				{invoice.products.map(product => {
					return (
						<div key={product.sku}>
							{product.sku} / {product.name} / {product.quantity} / {product.price}
						</div>
					)
				})}
			</td>
			<td>
				{invoice.created}
			</td>
			<td>
				{invoice.updated}
			</td>
			<td>
				<Button onClick={handleEdit}>Edit</Button>
				<Button variant="danger" onClick={handleDelete}>Remove</Button>
			</td>
		</tr>
	);
};

async function persistInvoiceDeletion(invoiceId) {
	const response = await fetch('http://localhost:8080/api/v0/delete/' + invoiceId)
	return await response.status
}