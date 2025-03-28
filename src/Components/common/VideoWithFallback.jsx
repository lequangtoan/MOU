import React from "react";

// Component VideoWithFallback: Hiển thị video với xử lý fallback
const VideoWithFallback = ({ src, ...props }) => {
  return (
    <video
      src={src}
      onContextMenu={(e) => e.preventDefault()} // Ngăn menu chuột phải
      {...props}
    />
  );
};

export default VideoWithFallback;
