import styles from "../../styles/Input.module.css";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // 선택적 onBlur 속성
  placeholder?: string;
  error?: boolean;
  variant?: "default" | "login";
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error = false,
  variant = "default",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`${styles.inputField} ${error ? styles.inputError : ""} ${styles[variant]}`}
    />
  );
};

export default Input;
