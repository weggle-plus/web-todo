export interface ModalProps {
    isOpen: boolean;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface ModalState {
    isOpen: boolean;
    target: { id: number; isTodo: boolean } | null;
}