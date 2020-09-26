import React, { useState, useRef, createRef } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import ProductList from './ProductList'

export default function EditInvoiceModal({ invoice, setInvoices, show, onHide }) {
    const [products, setProducts] = useState(...invoice.products)

    const productSkus = useRef([]),
        productNames = useRef([]),
        productQuantities = useRef([]),
        productPrices = useRef([]),
        customerId = useRef(),
        customerName = useRef(),
        customerAddress = useRef(),
        currency = useRef()

    function editInvoice() {
        console.log("editInvoice()")
        const updatedProducts = productSkus.current.map((p, index) => {
            return {
                sku: productSkus.current[index].current.value,
                name: productNames.current[index].current.value,
                quantity: parseInt(productQuantities.current[index].current.value),
                price: parseFloat(productPrices.current[index].current.value)
            }
        })
        const updatedInvoice = {
            "currency": currency.current.value,
            "customer": {
                "id": customerId.current.value,
                "name": customerName.current.value,
                "address": customerAddress.current.value
            },
            "products": [...updatedProducts]
        }
        persistUpdatedInvoice(updatedInvoice)
            .then(persistedInvoice => {
                setInvoices(prevInvoices => {
                    return [...prevInvoices, persistedInvoice]
                })
            })
        onHide()
    }

    // TODO: Initialize the values from the {invoice} in the form controls
    // Call the Edit modal onClick in the Edit button passing the invoice in question

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Invoice
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <fieldset>
                    <legend>Customer</legend>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control ref={customerId} value={invoice.id} placeholder="55a59524-c623-4204-9465-7d16c80a9401" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={customerName} placeholder="Jane Doe" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control ref={customerAddress} placeholder="Staroměstské nám. 1" />
                        </Form.Group>
                    </Form.Row>
                </fieldset>
                <fieldset>
                    <legend>Products <Button size="sm" onClick={() => setProducts(prevProducts => { return [...prevProducts, {}] })}>+</Button></legend>

                    <Form.Group>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control ref={currency} placeholder="EUR" />
                    </Form.Group>

                    <ProductList products={products} skus={productSkus} names={productNames} quantities={productQuantities} prices={productPrices} />
                </fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={editInvoice}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

async function persistUpdatedInvoice(invoice) {
    console.log("persistUpdatedInvoice()")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
    };
    const response = await fetch('http://localhost:8080/api/v0/edit', requestOptions)
    return await response.json()
}