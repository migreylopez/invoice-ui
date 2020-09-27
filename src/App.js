import React, { useState, useEffect } from 'react';
import InvoiceList from './InvoiceList'
import AddInvoiceModal from './AddInvoiceModal'
import {Container, Button, Spinner} from 'react-bootstrap';
import './App.css';

function App() {
  const [addInvoiceModalShow, setAddInvoiceModalShow] = useState(false)
  const [invoicesLoaded, setInvoicesLoaded] = useState(false)
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    console.log("fetching database invoices...")
      fetch('http://localhost:8080/api/v0/all')
        .then(res => res.json())
        .then(
          (result) => {
            setInvoices(result)
            setInvoicesLoaded(true)
            console.log("finished fetching database invoices")
          },
          (error) => {
            // TODO: Show alert with error
          }
        )
  }, []) // Executes only once

  return (
    <Container fluid>
      <Button onClick={() => setAddInvoiceModalShow(true)}>Add new</Button>
      <InvoiceList invoices={invoices} setInvoices={setInvoices} />
      <AddInvoiceModal setInvoices={setInvoices} show={addInvoiceModalShow} onHide={() => setAddInvoiceModalShow(false)} />
      {invoicesLoaded === false ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : null}
    </Container>
  );
}

export default App;
