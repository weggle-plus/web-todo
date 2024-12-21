import styles from "../../styles/Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "edit" | "delete" | "save" | "cancel" | "confirm" | "login";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = "confirm", disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
