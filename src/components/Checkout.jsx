import React from 'react';
import './Checkout.css';

const Checkout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleConfirmPayment = () => {
    onClose();
  }

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-content">
          <div className="title">CHECKOUT</div>
          <div className="details">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>$240.00</span>
            </div>
            <div className="shipping">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="tax">
              <span>Tax:</span>
              <span>$30.40</span>
            </div>
          </div>
          <hr />
          <div className="total">
            <span>Total:</span>
            <span>$280.40</span>
          </div>
          <div className="actions">
            <button className="confirm-btn" onClick={handleConfirmPayment}>Confirm Payment</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
