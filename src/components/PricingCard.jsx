import React from "react";
import "./PricingCard.css";

const PricingCard = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "₹99 per month",
      features: [
        "Ad-supported experience",
        "Standard audio quality",
        "Limited access to songs",
      ],
    },
    {
      title: "Premium Plan",
      price: "₹199 per month",
      features: [
        "Ad-free experience",
        "High-quality audio",
        "Unlimited skips",
        "Download for offline listening",
      ],
    },
    {
      title: "Exclusive Plan",
      price: "₹299 per month",
      features: [
        "All Premium features",
        "Early access to new releases",
        "Priority customer support",
        "Access to exclusive content",
      ],
    },
  ];

  return (
    <div>
        <div className="text-area">
        <div className="head">Listen without limits. Try 2 months of Premium for ₹119.</div>
        <p className="title">Only ₹119/month after. Cancel anytime.</p>
        </div>
      <div className="cards-container">
        {plans.map((plan, index) => (
          <div key={index} className="pack-container">
            <p className="title">{plan.title}</p>
            <p className="price">{plan.price}</p>
            <div className="header"></div>
            <ul className="lists">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="list">
                  <span>
                    <svg
                      aria-hidden="true"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 12.75l6 6 9-13.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
            <div className="button-container">
              <button type="button">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
