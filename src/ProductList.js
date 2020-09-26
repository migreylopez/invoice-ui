import React, { createRef } from 'react'
import { Form, Col } from 'react-bootstrap'

export default function ProductList({ products, skus, names, quantities, prices }) {
    if (products === undefined) return null
    return products.map((product, index) => {
        skus.current[index] = createRef()
        names.current[index] = createRef()
        quantities.current[index] = createRef()
        prices.current[index] = createRef()

        return <ProductRow key={product.id} product={product} sku={skus.current[index]} name={names.current[index]} quantity={quantities.current[index]} price={prices.current[index]} />
    })
}

function ProductRow({product, sku, name, quantity, price}) {
    return (
        <Form.Group>
            <Form.Row>
                <Col>
                    <Form.Control ref={sku} value={product.sku} placeholder="Sku" />
                </Col>
                <Col>
                    <Form.Control ref={name} value={product.name} placeholder="Name" />
                </Col>
                <Col>
                    <Form.Control ref={quantity} value={product.quantity} placeholder="Quantity" />
                </Col>
                <Col>
                    <Form.Control ref={price} value={product.price} placeholder="Price" />
                </Col>
            </Form.Row>
        </Form.Group>
    )
}