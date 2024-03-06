/** @format */

import "./App.css";
import React, { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
// import customers from "./memdb.js";
import { getAll, post, put, deleteById } from "./memdb.js";

export function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };
  // let formObject = customers[0];
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  let mode = formObject.id >= 0 ? "Update" : "Add";

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = function () {
    log("in getCustomers()");
    setCustomers(getAll());
  };

  const handleListClick = function (item) {
    log("in handleListClick()");
    if (item === formObject) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  };

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  };

  let onDeleteClick = function () {
    log("in onDeleteClick()");
    if (formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  };

  let onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === "Add") {
      post(formObject);
    }
    if (mode === "Update") {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}
      />
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form>
          <table id="customer-add-update">
            <tbody>
              <tr>
                <td className={"label"}>Name:</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.name}
                    placeholder="Customer Name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={"label"}>Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.email}
                    placeholder="name@company.com"
                  />
                </td>
              </tr>
              <tr>
                <td className={"label"}>Pass:</td>
                <td>
                  <input
                    type="text"
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.password}
                    placeholder="password"
                  />
                </td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={onDeleteClick} />
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input
                    type="button"
                    value="Cancel"
                    onClick={() => onCancelClick()}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
