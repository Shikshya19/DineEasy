import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyModal({ show, handleClose, children, handleSubmit, loading }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
