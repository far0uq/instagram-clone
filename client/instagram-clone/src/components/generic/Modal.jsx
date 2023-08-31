import PropTypes from "prop-types";

function Modal({ children, open }) {
  return <>{open && children}</>;
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Modal;
