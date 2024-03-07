"use client";

import React, { useState } from "react";
import "./pricing.css";
import SubscriptionEmailModal from "@/components/SubscriptionEmailModal/SubscriptionEmailModal";
import { useMutation } from "@apollo/client";
import { REGISTER_CARRIER } from "@/fetching/mutations/user";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie library

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

export function PriceCard({
  price,
  features,
  name,
  openModal,
  type,
  setSubscriptionType,
  formData,
  setFormData,
}) {
  const router = useRouter();
  const [registerCarrier] = useMutation(REGISTER_CARRIER);

  const handleSubscription = async () => {
    const response = await registerCarrier({
      variables: { ...formData, planName: type },
    });

    if (response?.data?.registerCarrier?.checkoutUrl) {
      console.log(response?.data?.registerCarrier);
      const {
        role_id,
        token,
        checkoutUrl,
        password,
        city,
        state,
        address,
        zipcode,
        termsacknowledged,
        ...user
      } = response?.data?.registerCarrier;

      // Set cookies

      // if (typeof window !== "undefined") {
      //   localStorage.setItem(
      //     "role_id",
      //     `${response.data.registerCarrier.role_id.id}`
      //   );
      //   localStorage.setItem("token", `${response.data.registerCarrier.token}`);
      //   const { checkoutUrl, token, created_at, ...user } =
      //     response?.data?.registerCarrier;
      //   localStorage.setItem("user", JSON.stringify(user));
      // }
      // Set cookies

      if (typeof window !== "undefined") {
        Cookies.set("role_id", response.data.registerCarrier.role_id.id);
        Cookies.set("token", response.data.registerCarrier.token);

        Cookies.set("user", JSON.stringify(user));
        Cookies.set("isAuthenticated", true);
        Cookies.set("termsAcknowledged", termsacknowledged);
      }
      router.push(response?.data?.registerCarrier?.checkoutUrl);
    }
  };

  return (
    <div className="interlade-pricing-card">
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
          onClick={handleSubscription}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}

export default Pricing;
