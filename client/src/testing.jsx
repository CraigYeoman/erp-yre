import React, { useState } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState([
    { name: "one", id: 1 },
    { name: "two", id: 2 },
    { name: "three", id: 3 },
    { name: "four", id: 4 },
  ]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: event.target.checked,
    });
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            name={item.id}
            checked={checkedItems[item.id]}
            onChange={handleCheckboxChange}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
}

const handleCheckboxChange = (event) => {
  const { name } = event.target;
  const { id } = event.target;
  setCheckedItems({
    ...checkedItems,
    [id]: event.target.checked,
  });
  if (event.target.checked === true) {
    let name = event.target.name;
    setArrayValues({
      ...arrayValues,
      [event.target.name]: [...arrayValues.name, id],
    });
  }
  console.log(arrayValues);
};

export default MyComponent;
