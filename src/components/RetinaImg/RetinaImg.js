import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RetinaImg = ({
  src = "",
  alt,
  className = "",
  width = 1920,
  height = 450,
}) => {
  // const getRetinaSrc = (originalSrc: string) => {
  //   const lastDotIndex = originalSrc.lastIndexOf(".");
  //   if (lastDotIndex === -1) return originalSrc + "@2x";
  //   const baseName = originalSrc.substring(0, lastDotIndex);
  //   const extension = originalSrc.substring(lastDotIndex);
  //   return `${baseName}@2x${extension}`;
  // };
  // const srcSet = getRetinaSrc(src);
  return _jsxs("picture", {
    className: className ? `${className}-wrapper` : "",
    children: [
      _jsx("source", { srcSet: src, media: "(min-resolution: 2dppx)" }),
      _jsx("img", {
        className: className,
        src: src,
        alt: alt,
        width: width,
        height: height,
      }),
    ],
  });
};
export default RetinaImg;
