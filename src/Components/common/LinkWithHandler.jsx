import React from "react";

// Component LinkWithHandler: Tạo một thẻ liên kết với xử lý sự kiện click
const LinkWithHandler = ({ href, onClick, children, ...props }) => {
  const handleClick = (e) => {
    if (href === "#") {
      e.preventDefault(); // Ngăn chặn hành động mặc định nếu href là "#"
      onClick && onClick(e); // Gọi hàm onClick nếu được cung cấp
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children} {/* Nội dung bên trong thẻ a */}
    </a>
  );
};

export default LinkWithHandler;
