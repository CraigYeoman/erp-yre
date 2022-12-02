import React, { useEffect, useState } from "react";

const WorkOrderList = () => {
  const [workOrdersList, setworkOrdersList] = useState([{}]);
  useEffect(() => {
    fetch("/api/v1/erp/workorders")
      .then((response) => response.json())
      .then((data) => {
        setworkOrdersList(data);
      });
  }, []);
  return (
    <div>
      {typeof workOrdersList.workOrders === "undefined" ? (
        <p>Loading...</p>
      ) : (
        workOrdersList.workOrders.map((workOrder) => {
          const {
            _id,
            date_received,
            date_due,
            jobType,
            customer,
            work_order_number,
            estimatedPrice,
          } = workOrder;
          return (
            <div key={_id}>
              <p>{work_order_number}</p>
              <p>
                {customer.first_name} {customer.last_name}
              </p>
              <p>{jobType.name}</p>
              <p>{date_received}</p>
              <p>{date_due}</p>
              <p>{estimatedPrice}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default WorkOrderList;
