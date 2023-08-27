import PropTypes from "prop-types";

function Modal({ children, onClose, open }) {
  return (
    <>
      <button onClick={() => onClose()}>Close</button>
      {open && children}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Modal;
