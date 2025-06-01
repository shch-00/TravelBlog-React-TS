import { FC } from "react";

interface RetinaImgProps {
  src?: string;
  className?: string;
  alt: string;
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
  const getRetinaSrc = (originalSrc: string) => {
    const lastDotIndex = originalSrc.lastIndexOf(".");
    if (lastDotIndex === -1) return originalSrc + "@2x";

    const baseName = originalSrc.substring(0, lastDotIndex);
    const extension = originalSrc.substring(lastDotIndex);
    return `${baseName}@2x${extension}`;
  };

  const srcSet = getRetinaSrc(src);

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
