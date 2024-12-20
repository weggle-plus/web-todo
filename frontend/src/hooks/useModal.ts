import { useState } from "react";
import { ModalState } from "../types/modal";

const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    target: null,
  });

  const openModal = (id: number, isTodo: boolean) => {
    setModalState({ isOpen: true, target: { id, isTodo } });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, target: null });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};

export default useModal;
