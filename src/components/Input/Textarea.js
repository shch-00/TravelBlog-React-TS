import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
const Textarea = ({
  placeholder = "",
  name = "",
  label = "",
  required = false,
  defaultValue = "",
  error = undefined,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);
  return _jsxs("div", {
    className: `custom-input custom-input--textarea ${isFocused ? "custom-input--focused" : ""}`,
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
      _jsx("textarea", {
        className: "custom-input__field",
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: (e) => setValue(e.target.value),
        required: required,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
      }),
      _jsx(motion.span, {
        initial: { opacity: 0 },
        animate: { opacity: error ? (value === "" ? 1 : 0) : 0 },
        transition: { duration: 0.3 },
        className: "custom-input__error",
        children: error,
      }),
      _jsxs(motion.span, {
        className: "custom-input__field-counter",
        initial: { opacity: 0 },
        animate: { opacity: value.length > 0 ? 1 : 0 },
        transition: { duration: 0.3 },
        children: [
          _jsx(
            motion.span,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.2 },
              children: value.length,
            },
            value.length
          ),
          "/2000",
        ],
      }),
    ],
  });
};
export default Textarea;
