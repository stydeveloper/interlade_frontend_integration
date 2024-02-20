"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import "./subscriptionEmailModal.css";
import { useMutation } from "@apollo/client";
import { CREATE_SUBSCRIPTON } from "@/fetching/mutations/subscription";
import { useRouter } from "next/navigation";
import { PriceCard } from "@/app/(auth)/pricing/page";
import { REGISTER_CARRIER } from "@/fetching/mutations/user";

function SubscriptionEmailModal({
  showModal,
  closeModal,
  formData,
  setFormData,
}) {
  const router = useRouter();

  return (
    <>
      <Modal
        centered
        open={showModal}
        footer={false}
        width={"50rem"}
        onCancel={closeModal}
      >
        <div className="flex flex-col gap-2 ">
          <h2 className="text-center animate-pulse text-3xl my-2 font-semibold  text-blue-900 rounded-lg">
            Choose plan of your choice!
          </h2>
          <div className="flex items-center justify-center gap-12">
            <PriceCard
              name={"Monthly"}
              price={85}
              type="Monthly"
              formData={formData}
              setFormData={setFormData}
            />
            <PriceCard
              name={"Yearly"}
              price={75}
              type="Yearly"
              features={[
                "some amazing feature",
                "some pro exclusive features",
                "another option",
              ]}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SubscriptionEmailModal;
