import React, { useEffect, useState } from "react";

function WorkOrderForm() {
  const [workOrderCreateInfo, setWorkOrderCreateInfo] = useState([]);

  useEffect(() => {
    fetch("/api/v1/erp/workorders/create")
      .then((response) => response.json())
      .then((data) => {
        setWorkOrderCreateInfo(data);
      });
  }, []);
  return (
    <form method="POST" action="">
      <div>
        <label for="customer">
          Customer:
          <select
            type="select"
            placeholder="Select Customer"
            name="customer"
            required={true}
          >
            {typeof workOrderCreateInfo.customers === "undefined" ? (
              <option>Loading...</option>
            ) : (
              workOrderCreateInfo.customers
                .sort((a, b) => {
                  let textA = a.first_name.toUpperCase();
                  let textB = b.first_name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((customer) => {
                  return (
                    <option value={customer._id} key={customer._id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })
            )}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor=""></label>
      </div>
    </form>
  );
}

//   const fetchWorkOrderCreateInfo = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/v1/erp/workorders/create");
//       console.log(data);
//       if (data.customer) {
//         setWorkOrderCreateInfo(data);
//         console.log(data);
//       } else {
//         setWorkOrderCreateInfo([]);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     setLoading(false);
//   };

//   //   useEffect(() => {
//   //     fetch("/api/v1/erp/workorders/create")
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         console.log(data);

//   //         setWorkOrderCreateInfo(data);
//   //       });
//   //   }, []);
//   useEffect(() => {
//     fetchWorkOrderCreateInfo();
//   }, [workOrderCreateInfo, setWorkOrderCreateInfo]);

//   if (loading) {
//     return (
//       <section className="section">
//         <h4>Loading...</h4>{" "}
//       </section>
//     );
//   }
//   return (
//     <div>
//       <h1>Work Order Entry</h1>
//       <form method="POST" action="">
//         <div>
//           <label for="customer">
//             Customer:
//             {console.log(workOrderCreateInfo.customers)}
//             <select
//               type="select"
//               placeholder="Select Customer"
//               name="customer"
//               required="true"
//             >
//               {workOrderCreateInfo.customers.map((customer) => {
//                 return (
//                   <option value={customer._id}>{customer.first_name}</option>
//                 );
//               })}
//             </select>
//           </label>
//         </div>
//       </form>
//     </div>
//   );
// }

export default WorkOrderForm;
