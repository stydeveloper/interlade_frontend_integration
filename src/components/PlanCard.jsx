import "../styles/pricing.css";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { RENEW_SUBSCRIPTION } from "@/fetching/mutations/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export function PlanCard({
  price,

  name,
  openModal,
  type,
  closeModal,
  email,
}) {
  const [disable, setDisabled] = useState(false);

  const [renewSub] = useMutation(RENEW_SUBSCRIPTION);

  const handleSubscription = async () => {
    try {
      // Set cookies
      console.log("type====", type);
      try {
        const response = await renewSub({
          variables: { email, planName: type },
        });
        console.log("response==============>", response.data);
        console.log(
          "response==============>",
          response?.data?.success === true
        );
        Cookies.remove("status");
        Cookies.set("status", "Active");
        if (response?.data) {
          console.log("::::::-----:::::::");

          // toast.success("Subscription Renewed successfully", {
          //   position: "top-right",
          // });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, { position: "top-right" });
        } else {
          toast.error("An unknown error occurred", { position: "top-right" });
        }
      }
    } catch (error) {
      setTimeout(() => {
        setDisabled(false);
      }, 1000);
    } finally {
      closeModal();
      if (typeof window !== "undefined") {
        window.location.reload(); // Refresh the page
      }
    }
  };

  return (
    <div className="relative interlade-pricing-card">
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
          className="interlade-card-btn hover:cursor-pointer bg-white"
          onClick={handleSubscription}
          disabled={disable}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}
