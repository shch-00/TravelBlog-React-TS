import { FC, useState } from "react";
import { motion } from "framer-motion";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  short?: boolean;
  required?: boolean;
  defaultValue?: string;
  error?: string | undefined;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  name = "",
  label = "",
  short = false,
  required = false,
  defaultValue = "",
  error = undefined,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>(defaultValue);
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
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: error
            ? name === "password" || name === "confirmPassword"
              ? 1
              : value === ""
                ? 1
                : 0
            : 0,
        }}
        transition={{ duration: 0.3 }}
        className="custom-input__error"
      >
        {error}
      </motion.span>
    </div>
  );
};

export default Input;
