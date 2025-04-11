import { FC, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import useUploadAvatar from "../../hooks/useUploadAvatar";

interface FileInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  error?: string | undefined;
}

const FileInput: FC<FileInputProps> = ({
  placeholder = "",
  name = "",
  required = false,
  className = "",
  label = "Загрузите ваше фото",
  error = undefined,
  icon = null,
}) => {
  const [value, setValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsFileSelected(true);
    const file = e.target.files?.[0] as File;
    handleAvatarChange(file);
  };

  const handleAvatarChange = (file: File) => {
    uploadAvatar(file, {
      onSuccess: (url: string) => {
        if (location.pathname.startsWith("/account")) {
          localStorage.setItem("avatar", url as string);
        } else {
          localStorage.setItem("photo", url as string);
        }
      },
    });
  };

  return (
    <div className="custom-input custom-input--file">
      <motion.label
        htmlFor={name}
        className={
          className
            ? className
            : `custom-input__label ${
                isHovered ? "custom-input__label--hovered" : ""
              }`
        }
        onClick={handleLabelClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          width: "fit-content",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          margin: location.pathname === "/create-post" ? "0" : "0 auto",
        }}
      >
        {icon && <div className="custom-input__icon">{icon}</div>}
        <AnimatePresence mode="wait">
          <motion.span
            key={
              isFileSelected ? (isHovered ? "change" : "selected") : "upload"
            }
            className="custom-input__label-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {isFileSelected
              ? isHovered
                ? "Выбрать другое фото?"
                : isUploading
                  ? "Сохранение..."
                  : "Фотография выбрана"
              : label}
          </motion.span>
        </AnimatePresence>
      </motion.label>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: error ? (value === "" ? 1 : 0) : 0 }}
        transition={{ duration: 0.3 }}
        className="custom-input__error"
      >
        {error}
      </motion.span>
      <input
        ref={fileInputRef}
        className="custom-input__field visually-hidden"
        name={name}
        type="file"
        placeholder={placeholder}
        value={value}
        onChange={handleFileChange}
        required={required}
        onFocus={() => setIsHovered(true)}
        onFocusCapture={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onBlurCapture={() => setIsHovered(false)}
      />
    </div>
  );
};

export default FileInput;
