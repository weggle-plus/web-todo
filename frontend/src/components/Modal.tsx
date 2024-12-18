import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, text, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{text}</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
