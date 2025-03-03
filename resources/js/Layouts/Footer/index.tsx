import React from 'react';
import './Footer.layout.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Cột 1: Thông tin liên hệ */}
        <div className="footer__column">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 123, Quận 1, TP. HCM</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Email: example@domain.com</p>
        </div>

        {/* Cột 2: Menu liên kết */}
        <div className="footer__column">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Dịch vụ</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div className="footer__column">
          <h3>Kết nối</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">YouTube</a>
          </div>
        </div>
      </div>

      {/* Dòng dưới cùng: Bản quyền */}
      <div className="footer__bottom">
        <p>© 2025 - Bản quyền thuộc về công ty ABC</p>
      </div>
    </footer>
  );
};

export default Footer;
