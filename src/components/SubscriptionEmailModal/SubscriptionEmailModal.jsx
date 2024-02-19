"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import "./subscriptionEmailModal.css";
import { useMutation } from "@apollo/client";
import { CREATE_SUBSCRIPTON } from "@/fetching/mutations/subscription";
import { useRouter } from "next/navigation";

function SubscriptionEmailModal({ showModal, closeModal, subscriptionType }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTON);
  const hanldeSubmit = async () => {
    console.log(email, subscriptionType);
    const response = await createSubscription({
      variables: { email, planName: subscriptionType },
    });

    if (response.data.createSubscription) {
      router.push(response.data.createSubscription.checkoutUrl);
    }

    console.log("response =>", response.data.createSubscription);
  };
  return (
    <>
      <Modal
        centered
        open={showModal}
        footer={false}
        width={"60rem"}
        onCancel={closeModal}
      >
        <div className="subscriptionModal-container">
          <h4>Subscription Email</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
          <div>
            <input
              type="text"
              placeholder="Subscription Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name=""
              id=""
            />
            <button onClick={hanldeSubmit}>Subscribe</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SubscriptionEmailModal;
