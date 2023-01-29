import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const PartsList = () => {
  const { listType, selectPartID, selectVendorID } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.parts) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="parts-list-container">
      {data.parts.map((part) => {
        const { name, part_number, manufacture, vendor, customer_price, _id } =
          part;
        return (
          <div className="parts-container" key={_id}>
            <Link onClick={() => selectPartID(_id)} to={`/partdetail/${_id}`}>
              {name}
            </Link>
            <p>{part_number}</p>
            <p>{manufacture}</p>
            <p>${customer_price}</p>
            <Link
              onClick={() => selectVendorID(vendor._id)}
              to={`/vendordetail/${vendor._id}`}
            >
              {vendor.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PartsList;
