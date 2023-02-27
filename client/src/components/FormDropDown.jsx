import FormDropDownItem from "./FormDropDownItem";
import { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const FormDropDown = ({ name, array, category }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container-column">
      <div onClick={() => setOpen(!open)}>
        {name} <MdOutlineArrowDropDownCircle onClick={() => setOpen(!open)} />
      </div>
      {open &&
        category
          .sort((a, b) => {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((option) => {
            return (
              <FormDropDownItem
                key={option._id}
                option={option}
                array={array}
                name={name}
              />
            );
          })}

      {/* <h2>Hi</h2>
      <label htmlFor={name}>{name}</label>
      <select
        type="select"
        placeholder={name}
        name={name}
        required={true}
        // onChange={handleChange}
        value={values.name}
      >
        <option value="" disabled selected hidden>
          Please Choose {name}
        </option>
        {typeof array === "undefined" ? (
          <option>Loading...</option>
        ) : (
          category
            .sort((a, b) => {
              let textA = a.name.toUpperCase();
              let textB = b.name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((option) => {
              return (
                <FormDropDownItem
                  key={option._id}
                  option={option}
                  array={array}
                />
              );
            })
        )}
      </select> */}
    </div>
  );
};

export default FormDropDown;
