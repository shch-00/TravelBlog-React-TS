import { FC, useState } from "react";
import "./Input.css";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  short?: boolean;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  name = "",
  label = "",
  short = false,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div
      className={`custom-input ${short ? "custom-input--short" : ""} ${
        isFocused ? "custom-input--focused" : ""
      }`}
    >
      <label htmlFor={name} className="custom-input__label">
        <span className="custom-input__label-required">*</span>
        <span className="custom-input__label-text">{label}</span>
      </label>
      <input
        className="custom-input__field"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default Input;
