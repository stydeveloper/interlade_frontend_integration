"use client";
import { Modal } from "antd";
import React from "react";
import "../SubscriptionEmailModal/SubscriptionEmailModal.css";

import { PlanCard } from "../PlanCard";

function PlanModal({ showModal, closeModal, email }) {
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
            <PlanCard
              name={"Monthly"}
              price={85}
              type="Monthly"
              closeModal={closeModal}
              email={email}
            />
            <PlanCard
              name={"Yearly"}
              price={900}
              type="Yearly"
              features={[
                "some amazing feature",
                "some pro exclusive features",
                "another option",
              ]}
              closeModal={closeModal}
              email={email}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PlanModal;
