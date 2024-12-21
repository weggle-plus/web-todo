import styles from "../../styles/Modal.module.css";
import { ModalProps } from "../../types/modal";
import Button from "./Button";

const Modal: React.FC<ModalProps> = ({ isOpen, text, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{text}</p>
        <div className={styles.modalActions}>
          <Button text="확인" onClick={onConfirm} variant="confirm" />
          <Button text="취소" onClick={onCancel} variant="cancel" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
