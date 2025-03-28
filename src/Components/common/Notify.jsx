import React from "react";
import "./Notify.scss";

// Component Notify: Hiển thị thông báo với nút đóng
const Notify = ({ show, message, closeButtonText, onClose }) => {
  if (!show) return null; // Không hiển thị nếu `show` là false

  return (
    <div className="custom-alert-overlay">
      {/* Hộp thông báo */}
      <div className="custom-alert">
        <p>{message}</p> {/* Hiển thị thông báo */}
        <button onClick={onClose}>{closeButtonText}</button> {/* Nút đóng */}
      </div>
    </div>
  );
};

export default Notify;
