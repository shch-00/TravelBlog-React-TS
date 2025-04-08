import { FC, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

const FileInput: FC<FileInputProps> = ({
  placeholder = "",
  name = "",
  required = false,
}) => {
  const [value, setValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsFileSelected(true);
  };

  return (
    <div className="custom-input custom-input--file">
      <motion.label
        htmlFor={name}
        className={`custom-input__label ${
          isHovered ? "custom-input__label--hovered" : ""
        }`}
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
      >
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
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            {isFileSelected
              ? isHovered
                ? "Выбрать другое фото?"
                : "Фотография выбрана"
              : "Загрузите ваше фото"}
          </motion.span>
        </AnimatePresence>
      </motion.label>
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
