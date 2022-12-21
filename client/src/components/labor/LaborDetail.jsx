import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import axios from "axios";
const rootUrl = "http://localhost:5000";

const LaborDetail = () => {
  const { laborDetail, loading, selectWorkOrderID } = useGlobalContext();
  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const onSubmitGet = async (_id) => {
    setResponse(false);
    setResponseText("");
    try {
      const url = `${rootUrl}/api/v1/erp/labor/${_id}/delete/`;
      axios
        .get(url)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          console.log(error);
          setResponseText(error.response.data.msg.message);
        });
    } catch (error) {
      loading(false);
    }
  };

  const onSubmitPost = async (_id) => {
    setResponse(false);
    setResponseText("");
    try {
      const url = `${rootUrl}/api/v1/erp/labor/${_id}/delete/`;
      axios
        .post(url)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          console.log(error);
          setResponseText(error.response.data.msg.message);
        });
    } catch (error) {
      loading(false);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, price, _id } = laborDetail;

  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
      <div>
        <button onClick={() => onSubmitGet(_id)}>Delete </button>
      </div>

      {response && typeof responseText.labor_work_orders === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id)}>Delete </button>
        </div>
      ) : (
        <div>
          {response &&
            responseText.labor_work_orders.map((workOrder) => {
              return (
                <div>
                  Please edit the following work order before deleting
                  <Link
                    onClick={() => selectWorkOrderID(workOrder._id)}
                    to={`/workorderdetail/${workOrder._id}`}
                    key={workOrder._id}
                  >
                    {workOrder.work_order_number}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default LaborDetail;
