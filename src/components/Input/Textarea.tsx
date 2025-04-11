import { FC, useState } from "react";
import { motion } from "framer-motion";

interface TextareaProps {
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  defaultValue?: string;
}

const Textarea: FC<TextareaProps> = ({
  placeholder = "",
  name = "",
  label = "",
  required = false,
  defaultValue = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);
  return (
    <div
      className={`custom-input custom-input--textarea ${
        isFocused ? "custom-input--focused" : ""
      }`}
    >
      <label htmlFor={name} className="custom-input__label">
        <span className="custom-input__label-required">*</span>
        <span className="custom-input__label-text">{label}</span>
      </label>
      <textarea
        className="custom-input__field"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.span
        className="custom-input__field-counter"
        initial={{ opacity: 0 }}
        animate={{ opacity: value.length > 0 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          key={value.length}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {value.length}
        </motion.span>
        /2000
      </motion.span>
    </div>
  );
};

export default Textarea;
