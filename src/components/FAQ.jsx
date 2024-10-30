import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "./FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "What licenses are available for your beats?",
      answer: "We offer three types of licenses: Personal, Commercial, and Exclusive. Each license has unique permissions and restrictions suited for different uses."
    },
    {
      question: "Can I use the beats for commercial purposes?",
      answer: "Yes, you can use our beats commercially if you purchase the Commercial or Exclusive license."
    },
    {
      question: "How do I download purchased beats?",
      answer: "After your purchase, a download link will be sent to your email. You can also download your beats directly from your account page."
    },
    {
      question: "Can I get a refund after purchasing a beat?",
      answer: "Due to the nature of digital downloads, all sales are final. Please ensure you review the beat and its terms before purchasing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and PayPal for quick and secure transactions."
    }
  ];

  return (
    <div className="faq-page">
      <h1 className="faq-page__heading">Frequently Asked Questions</h1>
      <div className="faq-page__list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-item__question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="faq-item__icon">{isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</span>
      </div>
      {isOpen && <div className="faq-item__answer">{answer}</div>}
    </div>
  );
};

export default FAQ;
