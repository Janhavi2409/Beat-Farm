import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-form">
      <h1 className="contact-form__heading">Contact Us</h1>
      {submitted && <p className="contact-form__success-message">Thank you for reaching out! We'll get back to you soon.</p>}
      <form onSubmit={handleSubmit} className="contact-form__form">
        <label htmlFor="name" className="contact-form__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="contact-form__input"
          required
        />

        <label htmlFor="email" className="contact-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="contact-form__input"
          required
        />

        <label htmlFor="message" className="contact-form__label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="contact-form__textarea"
          rows="5"
          required
        ></textarea>

        <button type="submit" className="contact-form__button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
