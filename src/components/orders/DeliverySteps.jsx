const DeliverySteps = ({ deliverySteps,refundSteps }) => {
  return (
    <div className="w-full flex justify-center my-8 px-4">
      <div className="w-full lg:w-4/5 flex items-center">

        {/*Delivery Steps */}
        {deliverySteps && ["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"]
        .map((step, index) => (
            <div key={index} className="flex-1 flex items-center">
              {/* <p className="rounded-full bg-gray-600 ">{step}</p> */}
              <div className={`rounded-full w-10 h-10 flex items-center justify-center text-white text-sm ${(deliverySteps > index) ? "bg-red-500" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              {index < 5 && (
                <div className={`flex-1 h-1 ${(deliverySteps > index + 1) ? "bg-red-500" : "bg-gray-300"}`}/>
              )}
            </div>
          )
        )}

        {/* Refund Steps */}
        {refundSteps && ["Processing refund", "Refund Success"]
        .map((step, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center text-white text-sm ${(refundSteps > index) ? "bg-red-500" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              {index < 1 && (
                <div className={`flex-1 h-1 ${(refundSteps > index + 1) ? "bg-red-500" : "bg-gray-300"}`}/>
              )}
            </div>
          )
        )}

      </div>
    </div>
  );
};


export default DeliverySteps;
