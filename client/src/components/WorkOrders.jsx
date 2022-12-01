import React, { useEffect, useState } from "react";

function WorkOrders() {
  const [backendData, setBackEndData] = useState([{}]);
  useEffect(() => {
    fetch("/api/v1/workorders")
      .then((response) => response.json())
      .then((data) => {
        setBackEndData(data);
      });
  }, []);
  return (
    <div>
      {typeof backendData.workOrders === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.workOrders.map((workOrder) => (
          <div key={workOrder._id}>
            <p>
              {workOrder.customer.first_name} {workOrder.customer.Last_name}
            </p>
            <p>{workOrder.date_received}</p>
            <p>{workOrder.date_due}</p>
            <p>{workOrder.estimatedPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default WorkOrders