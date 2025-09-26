import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
const Input = ({
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
  const [value, setValue] = useState(defaultValue);
  return _jsxs("div", {
    className: `custom-input ${short ? "custom-input--short" : ""} ${isFocused ? "custom-input--focused" : ""}`,
    children: [
      _jsxs("label", {
        htmlFor: name,
        className: "custom-input__label",
        children: [
          _jsx("span", {
            className: "custom-input__label-required",
            children: "*",
          }),
          _jsx("span", {
            className: "custom-input__label-text",
            children: label,
          }),
        ],
      }),
      _jsx("input", {
        className: "custom-input__field",
        name: name,
        type: type,
        placeholder: placeholder,
        value: value,
        onChange: (e) => setValue(e.target.value),
        required: required,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
      }),
      _jsx(motion.span, {
        initial: { opacity: 0 },
        animate: {
          opacity: error
            ? name === "password" || name === "confirmPassword"
              ? 1
              : value === ""
                ? 1
                : 0
            : 0,
        },
        transition: { duration: 0.3 },
        className: "custom-input__error",
        children: error,
      }),
    ],
  });
};
export default Input;
