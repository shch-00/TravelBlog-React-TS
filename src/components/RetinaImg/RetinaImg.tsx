import { FC } from "react";

interface RetinaImgProps {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const RetinaImg: FC<RetinaImgProps> = ({
  src = "",
  alt,
  className = "",
  width = 1920,
  height = 450,
}) => {
  const imgFormats = [".png", ".jpg", ".jpeg", ".webp"];
  const srcSet = imgFormats.includes(src.split(".")[1])
    ? src.split(".")[0] + `@2x.${src.split(".")[1]}`
    : src + "@2x";
  return (
    <picture className={className ? `${className}-wrapper` : ""}>
      <source srcSet={srcSet} media="(min-resolution: 2dppx)" />
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default RetinaImg;
