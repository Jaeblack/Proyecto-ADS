import { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import "./contract.scss";

//title, description, cost, employee, status

export function Contract({ information }) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData({ ...information });
  }, []);
  return (
    <div className="contract">
      <div className="icons_contract">
        <div className="icon_type_contract">{data.icon}</div>
        <div className="icon_client">
          {data.employee != "none" ? <BsPersonCircle size={"40px"} /> : ""}
        </div>
      </div>
      <div className="contract_information">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>${data.cost}</p>
        <p>{data.employee != "none" ? data.employee : "Sin asignar"}</p>
      </div>
      <div className="contract_status">
        <h2>{data.status}</h2>
      </div>
    </div>
  );
}
