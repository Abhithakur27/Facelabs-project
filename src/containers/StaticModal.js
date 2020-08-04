import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function StaticModal(props) {
  return (
    <>
      <Modal
        show={props.openModal}
        backdrop="static"
        keyboard={false}
        centered
        className="bg-dark"
      >
        <Modal.Header>
          <Modal.Title>
            Welcome to Quiz <br />
            <h4>Enter your Name</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            onChange={props.onChangeName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.startQuiz}>
            Start Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
