import React from "react";

// Component ImageWithFallback: Hiển thị hình ảnh với xử lý fallback
const ImageWithFallback = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      draggable="false" // Ngăn kéo thả hình ảnh
      onContextMenu={(e) => e.preventDefault()} // Ngăn menu chuột phải
      {...props}
    />
  );
};

export default ImageWithFallback;
