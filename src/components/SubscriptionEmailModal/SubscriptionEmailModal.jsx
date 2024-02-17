

import {  Modal } from "antd";
import React from "react";
import './subscriptionEmailModal.css'


function SubscriptionEmailModal({showModal  , closeModal}){
 
    
    return (
      <>
        <Modal
          centered
          open={showModal}
          footer={false}
          width={'60rem'}
          onCancel={closeModal}
        >
          <div className="subscriptionModal-container">
            <h4>Subscription Email</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
            </p>
            <div>
              <input type="text" placeholder="Subscription Email" name="" id="" />
              <button>Subscribe</button>
            </div>
          </div>
        </Modal>
      </>
    );
}


export default SubscriptionEmailModal