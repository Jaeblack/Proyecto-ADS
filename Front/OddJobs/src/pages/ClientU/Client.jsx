import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext/DataContext";

import { GiTeePipe } from "react-icons/gi";
import { BsCheckLg, BsLightningFill } from "react-icons/bs";
import { BiGitBranch } from "react-icons/bi";

import "./client.scss";

import { NavBar } from "../../components/NavBar/NavBar";
import { Button } from "../../components/Button/Button";
import { Contract } from "../../components/ContractDesign/Contract";
import { NoContracts } from "../../components/WithoutContracts/NoContracts";
import { WorkerSmallData } from "../../components/WorkerSmallData/WorkerSmallData";

import SettingsIcon from "../../images/icons/nut.png";
import { useEffect } from "react";

export function Client() {
  const {
    actualUser,
    updateUser,
    addContract,
    deleteContract,
    getContracts,
    getWorkersByCategory,
  } = useContext(DataContext);

  const [actualWindow, setActualWindow] = useState(1);

  useEffect(() => {
    console.log(actualUser);
  }, []);

  function getIcon(category) {
    switch (category) {
      case "Plomería":
        return <GiTeePipe size={"40px"} />;
      case "Electricista":
        return <BsLightningFill size={"40px"} />;
      case "Programador":
        return <BiGitBranch size={"40px"} />;
    }
  }

  function getContractsByType(number) {
    const contracts = getContracts(actualUser.email);
    switch (number) {
      case 1:
        return contracts.map((element, index) => {
          if (element.status != "Cancelado" && element.status != "Finalizado") {
            element.icon = getIcon(element.title);
            return (
              <Contract
                information={{
                  ...element,
                }}
                key={index}
              />
            );
          }
        });
      case 2:
        return contracts.map((element, index) => {
          if (element.status == "Cancelado" || element.status == "Finalizado") {
            element.icon = getIcon(element.title);
            return (
              <Contract
                information={{
                  ...element,
                }}
                key={index}
              />
            );
          }
        });
      case 3:
        let haveContractInProgress = contracts.find((element) => {
          return element.status == "En proceso";
        });
        let contractsNumber = contracts.map((element) => {
          if (
            element.status != "Cancelado" &&
            element.status != "Finalizado" &&
            element.status != "En proceso" &&
            element.status != "En espera"
          ) {
            return element;
          }
        });
        if (haveContractInProgress != undefined) {
          return <NoContracts title="Ya existe un contrato en proceso!" />;
        } else if (contractsNumber.length > 0) {
          let allWorkers = [];
          contractsNumber.map((element) => {
            allWorkers.push(
              ...getWorkersByCategory(element.title).map(
                (workerData, index) => {
                  return (
                    <WorkerSmallData
                      workerData={workerData}
                      category={element.title}
                      service={element.description}
                      key={index}
                    />
                  );
                }
              )
            );
          });
          return allWorkers;
        }
        return <NoContracts title="No hay contrados publicados" />;
    }
  }

  return (
    <>
      <div className="client_data_container">
        <NavBar>
          <img src={SettingsIcon} alt="settings" className="settings_icon" />
          <img
            src={actualUser.photo}
            alt="profile_picture"
            className="profile_piture"
          />
        </NavBar>
        <div className="contracts_information_container">
          <div className="contracts_options">
            <div className="options">
              <p
                className={actualWindow == 1 ? "bottom_bar first_option" : ""}
                onClick={() => {
                  setActualWindow(1);
                }}
              >
                Contratos
              </p>
              <p
                className={actualWindow == 2 ? "bottom_bar second_option" : ""}
                onClick={() => {
                  setActualWindow(2);
                }}
              >
                Finalizados
              </p>
              <p
                className={actualWindow == 3 ? "bottom_bar third_option" : ""}
                onClick={() => {
                  setActualWindow(3);
                }}
              >
                Contratar
              </p>
            </div>
            <Button
              text="Crear contrato"
              isPriority={true}
              id={"create_contract_button"}
              action={() => {
                console.log("create contract");
              }}
            />
          </div>
          <div className="contracts_information">
            {getContractsByType(actualWindow)}
          </div>
        </div>
      </div>
    </>
  );
}
