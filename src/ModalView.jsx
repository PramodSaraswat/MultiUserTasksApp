import React, { useState } from "react"
import { Card, Button, Form, Modal } from "react-bootstrap";

const ModalView = (props) => {

  const [localVal, setLocalVal] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      props.setValInParent(localVal);
      setLocalVal("");
      props.toggleModal();
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setLocalVal(event.target.value);
  };
  return (<Modal
        show={props.modalShow}
        onHide={props.toggleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{props.namVal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>{props.labelName}</Form.Label>
              <Form.Control placeholder={props.labelName} onChange={handleChange} name="val" value={localVal} required />
              <Form.Control.Feedback type="invalid">
              Required
            </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={props.toggleModal}>
              Close
            </Button>
            <Button variant="primary" className="ml-2" type="submit">Add</Button>
          </Form>
    </Modal.Body>
      </Modal>);
}

export default ModalView;