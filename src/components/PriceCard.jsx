import "../styles/pricing.css";
import { useMutation } from "@apollo/client";
import { REGISTER_CARRIER } from "@/fetching/mutations/user";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie library
import { useState } from "react";

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
  const [disable, setDisabled] = useState(false);

  const router = useRouter();
  const [registerCarrier] = useMutation(REGISTER_CARRIER);

  const handleSubscription = async () => {
    try {
      const response = await registerCarrier({
        variables: { ...formData, planName: type },
      });
      setDisabled(true);

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
          status,
          ...user
        } = response?.data?.registerCarrier;
        console.log("------------------------", termsacknowledged);
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

        // console.log("status", status);
        // && status.toString() !== "Pending"
        if (typeof window !== "undefined") {
          Cookies.set("role_id", response.data.registerCarrier.role_id.id);
          Cookies.set("token", response.data.registerCarrier.token);

          Cookies.set("user", JSON.stringify(user));
          Cookies.set("isAuthenticated", true);
          Cookies.set("termsAcknowledged", termsacknowledged);
          Cookies.set("status", status);
        }
        router.push(response?.data?.registerCarrier?.checkoutUrl);
      }
    } catch (error) {
      setTimeout(() => {
        setDisabled(false);
      }, 1000);
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
          className="interlade-card-btn hover:cursor-pointer"
          onClick={handleSubscription}
          disabled={disable}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}
