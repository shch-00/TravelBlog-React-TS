import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEditUser } from "../../hooks";
const FileInput = ({
  placeholder = "",
  name = "",
  required = false,
  className = "",
  label = "Загрузите ваше фото",
  error = undefined,
  icon = null,
}) => {
  const [value, setValue] = useState("");
  const fileInputRef = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueriesData({ queryKey: ["me"] })[0][1] || {};
  console.log(user);
  const { mutate: editUser, isPending: isUserEditing } = useEditUser();
  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    setValue(e.target.value);
    setIsFileSelected(true);
    const file = e.target.files?.[0];
    editUser(
      {
        ...user,
        photo: file,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
        },
      }
    );
  };
  return _jsxs("div", {
    className: "custom-input custom-input--file",
    children: [
      _jsxs(motion.label, {
        htmlFor: name,
        className: className
          ? className
          : `custom-input__label ${isHovered ? "custom-input__label--hovered" : ""}`,
        onClick: handleLabelClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        animate: {
          width: "fit-content",
        },
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
        style: {
          margin: location.pathname === "/create-post" ? "0" : "0 auto",
        },
        children: [
          icon &&
            _jsx("div", { className: "custom-input__icon", children: icon }),
          _jsx(AnimatePresence, {
            mode: "wait",
            children: _jsx(
              motion.span,
              {
                className: "custom-input__label-text",
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                children: isFileSelected
                  ? isHovered
                    ? "Выбрать другое фото?"
                    : isUserEditing
                      ? "Сохранение..."
                      : "Фотография выбрана"
                  : label,
              },
              isFileSelected ? (isHovered ? "change" : "selected") : "upload"
            ),
          }),
        ],
      }),
      _jsx(motion.span, {
        initial: { opacity: 0 },
        animate: { opacity: error ? (value === "" ? 1 : 0) : 0 },
        transition: { duration: 0.3 },
        className: "custom-input__error",
        children: error,
      }),
      _jsx("input", {
        ref: fileInputRef,
        className: "custom-input__field visually-hidden",
        name: name,
        type: "file",
        placeholder: placeholder,
        value: value,
        onChange: handleFileChange,
        required: required,
        onFocus: () => setIsHovered(true),
        onFocusCapture: () => setIsHovered(true),
        onBlur: () => setIsHovered(false),
        onBlurCapture: () => setIsHovered(false),
      }),
    ],
  });
};
export default FileInput;
