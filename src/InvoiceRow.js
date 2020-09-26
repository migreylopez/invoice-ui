import React from 'react';
import Button from 'react-bootstrap/Button';

export default function InvoiceList({invoice}) {

    function edit() {

    }

    function remove() {
        
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