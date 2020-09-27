import React from 'react';
import Button from 'react-bootstrap/Button';

export default function InvoiceRow({setInvoices, setEditInvoiceModalShow, invoice, setInvoiceToEdit}) {

    function edit() {
        setInvoiceToEdit(invoice)
        setEditInvoiceModalShow(true)
    }

    function remove() {
        // TODO: CALL TO THE BACKEND!
        setInvoices(prevInvoices => {
            return prevInvoices.filter(prevInvoice => prevInvoice.id !== invoice.id)
        })
    }

    return (
        <tr>
            <td>
                {invoice.id.substring(0,8)}...
            </td>
            <td>
                {invoice.customer.id.substring(0,8)}... / {invoice.customer.name} / {invoice.customer.address}
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
                {invoice.deleted}
            </td>
            <td>
                <Button onClick={edit}>Edit</Button>
                <Button onClick={remove}>Remove</Button>
            </td>
        </tr>
    );
};