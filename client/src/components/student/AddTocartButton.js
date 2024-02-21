import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ isLoggedIn, role }) => {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <button onClick={() => navigate('/login')}>
        กรุณาเข้าสู่ระบบ
      </button>
    );
  }

  if (role === 'Student') {
    return (
      <button onClick={() => { /* เพิ่มวิชาลงในตะกร้าที่รอจ่ายเงิน */ }}>
        เพิ่มวิชานี้ลงในตะกร้า
      </button>
    );
  }

  return null;
};

export default AddToCartButton;
