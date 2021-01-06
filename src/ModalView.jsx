import React, { useState, useEffect } from "react"
import { Card, Button, Form, Modal } from "react-bootstrap";

const ModalView = (props) => {

  useEffect(() => {
    setLocalVal(props.val || "")
  }, [props.val]);

  const [localVal, setLocalVal] = useState(props.val || "");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (props.modalType === "addUser") {
        props.setValInParent(localVal);
        setLocalVal("");
      } else if (props.modalType === "addTask") {
        props.setValInParent(props.indexUser, localVal);
        setLocalVal("");
      } else if (props.modalType === "editUser") {
        props.setValInParent(props.indexUser, localVal);
      } else if (props.modalType === "editTask") {
        props.setValInParent(props.indexUser[0], props.indexUser[1], localVal);
      }
      props.toggleModal();
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setLocalVal(event.target.value);
  };

  return (
    <Modal
      show={props.modalShow}
      onHide={props.toggleModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{props.namVal}</Modal.Title>
      </Modal.Header>
      
      { !props.warn &&
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>{props.labelName}</Form.Label>
            <Form.Control placeholder={props.labelName} 
              onChange={handleChange} name="val" 
              value={localVal} required 
            />
            <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={props.toggleModal}>
            Cancel
          </Button>
          <Button variant="primary" className="ml-2" type="submit">Save</Button>
        </Form>
        </Modal.Body>
      }
      { props.warn && 
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleModal}>
            No
          </Button>
          <Button variant="danger" className="ml-2" 
            onClick={()=>props.deleteUser(props.indexUser)}
          >
            Yes
           </Button>
        </Modal.Footer>
      }
      
    </Modal>
  );
}

export default ModalView;