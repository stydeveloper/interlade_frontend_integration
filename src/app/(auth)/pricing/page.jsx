"use client";

import React, { useState } from "react";
import "./pricing.css";
import SubscriptionEmailModal from "@/components/SubscriptionEmailModal/SubscriptionEmailModal";

const Pricing = () => {
  const [isMOdalOpen, setIsModalOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("");
  return (
    <section className="interlade-pricing">
      <h2>Pricing Options</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
        aliquid eaque mollitia reprehenderit! Quidem doloremque facere veritatis
        quos, qui impedit.
      </p>
      <div className="interlade-pricing-cards">
        <PriceCard
          openModal={() => setIsModalOpen(true)}
          name={"Monthly"}
          price={287}
          type="Monthly"
          setSubscriptionType={setSubscriptionType}
        />
        <PriceCard
          openModal={() => setIsModalOpen(true)}
          name={"Yearly"}
          price={20}
          type="Yearly"
          features={[
            "some amazing feature",
            "some pro exclusive features",
            "another option",
          ]}
          setSubscriptionType={setSubscriptionType}
        />
      </div>

      <SubscriptionEmailModal
        showModal={isMOdalOpen}
        closeModal={() => setIsModalOpen(false)}
        subscriptionType={subscriptionType}
      />
    </section>
  );
};

function PriceCard({
  price,
  features,
  name,
  openModal,
  type,
  setSubscriptionType,
}) {
  return (
    <div onClick={openModal} className="interlade-pricing-card">
      <div className="interlade-card">
        <h3 className="interlade-card-title">{name}</h3>
        <hr className="interlade-first" />
        <p className="interlade-card-price">
          <span>$</span>
          {price}
        </p>
        <ul className="interlade-features">
          {[
            "some amazing feature",
            "some pro exclusive features",
            "another option",
          ].map((e, i) => {
            return <li key={i}>{e}</li>;
          })}
        </ul>
        <hr className="interlade-second" />
        <button
          type="button"
          className="interlade-card-btn"
          onClick={() => setSubscriptionType(type)}
        >
          I want it
        </button>
      </div>
    </div>
  );
}

export default Pricing;
