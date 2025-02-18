import React from 'react';
import './footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-card">
          <div className="footer-content">
            <div className="footer-about">
              <h2>About Online Parking</h2>
              <p>
              Discover the best parking spots in real-time, compare prices, and reserve your space effortlessly. Whether it's short-term, long-term, or special event parking, we've got you covered. Enjoy a hassle-free parking experience with our user-friendly platform.
              </p>
            </div>
            <div className="footer-contact">
              <h2>Contact Us</h2>
              <p><FaMapMarkerAlt className="icon" /> Sunbeam infotech Pune</p>
              <p><FaPhone className="icon" /> +91 xxxxx xxxxx</p>
              <p><FaEnvelope className="icon" />noreply.parkngo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-bg-dark">
        <p>© {new Date().getFullYear()} ParknGo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
