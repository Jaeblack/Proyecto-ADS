import { useState, useContext } from "react";

import { NavBar } from "../../components/NavBar/NavBar";
import { Button } from "../../components/Button/Button";
import { CardInfo } from "../../components/Card_Information/CardInfo";
import { GetinForm } from "../../components/GettinForm/GetinForm";
import { LandingPageContext } from "../../context/LandingPageContext/LandingPageContext";

import WorkerImg from "../../images/trabajador_1.jpg";
import checkCircleIcon from "../../images/icons/check_circle_icon.png";
import personTeaching from "../../images/icons/person_teaching.png";
import Wrench from "../../images/icons/wrench.png";
import DogSecurity from "../../images/perro.jpg";
import EmployeeIcon from "../../images/icons/employee.png";
import ClientIcon from "../../images/icons/client.png";
import LogoOddJobs from "../../images/LogoOddJobs.png";

import "./landingpage.scss";

export function OddJobs() {
  const cardInfo1 = {
    icon: checkCircleIcon,
    title: "Sin complicaciones",
    information:
      "Con OddJobs tienes los servicios que necesites cuando lo necesites.",
    buttontxt: "Explorar servicios",
  };
  const cardInfo2 = {
    icon: Wrench,
    title: "Mas oportunidades",
    information:
      "En OddJobs tienes más oportunidades laborales gracias a nuestro gran catálogo de trabajos",
    buttontxt: "Buscar oportunidad",
  };
  const cardInfo3 = {
    icon: personTeaching,
    title: "Sin restricciones",
    information:
      "Con OddJobs podrás disfrutar de los servicios, a la par de poder tener una oportunidad laboral",
    buttontxt: "Registrarse",
  };

  const { isGettinInto, disableLandingPage } = useContext(LandingPageContext);

  return (
    <>
      {isGettinInto ? (
        <div className="login_register_container">
          <GetinForm />
        </div>
      ) : (
        <></>
      )}

      <div
        className={`page_information_conteinar ${
          isGettinInto ? "make_blur" : ""
        }`}
      >
        <NavBar>
          <Button
            text={"Iniciar sesión"}
            isPriority={false}
            id={"login_button"}
            action={disableLandingPage}
          />
          <Button
            text={"Registrarse"}
            isPriority={true}
            id={"register_button"}
            action={disableLandingPage}
          />
        </NavBar>
        <div className="Presentation_container">
          <div className="information">
            <h2>¿Qué solucionaremos hoy?</h2>
            <p>
              ¡Con OddJobs es fácil conseguir cualquier servicio para cualquier
              problema con un solo click!
            </p>
            <Button
              text={"Registrarse ahora"}
              isPriority={true}
              id={"register_button_information"}
              action={disableLandingPage}
            />
          </div>
          <div className="image">
            <img src={WorkerImg} alt="worker" />
          </div>
        </div>
        <div className="information_container">
          <h2>Soluciones para todos</h2>
          <div className="information_cards">
            <CardInfo info={cardInfo1} />
            <CardInfo info={cardInfo2} />
            <CardInfo info={cardInfo3} />
          </div>
        </div>
        <div className="security_information_container">
          <div className="image">
            <img src={DogSecurity} alt="Dog-security" />
          </div>
          <div className="information">
            <h2>Tu seguridad es importante para nosotros.</h2>
            <p>
              Con nuestras normas y estándares estamos comprometidos con
              nuestros usuarios para que tengan un entorno seguro y de calidad
            </p>
          </div>
        </div>
        <div className="Options_Register_Container">
          <h2>Inicia con OddJobs</h2>
          <div className="Options_Container">
            <div
              className="employee_option"
              onClick={() => {
                console.log("Se hizo click");
                disableLandingPage();
              }}
            >
              <p>Registrarse como empleado</p>
              <img src={EmployeeIcon} alt="Employee-icon" />
            </div>
            <div
              className="client_option"
              onClick={() => {
                console.log("Se hizo click");
                disableLandingPage();
              }}
            >
              <p>Registrarse como cliente</p>
              <img src={ClientIcon} alt="Client-icon" />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="logo_container">
            <img src={LogoOddJobs} alt="Logo-OddJobs" />
            <p>OddJobs</p>
          </div>
          <p>2023 OddJobbs ©</p>
        </div>
      </div>
    </>
  );
}
