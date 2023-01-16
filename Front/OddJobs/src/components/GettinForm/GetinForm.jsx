import { useContext, useState } from "react";

import { LandingPageContext } from "../../context/LandingPageContext/LandingPageContext";
import { Button } from "../Button/Button";

import CancelBoton from "../../images/icons/QuitIcon.png";
import WomanFormImage from "../../images/form_image.jpg";

import "./getinform.scss";

export function GetinForm() {
    const {isGettinInto, enableLandingPage} = useContext(LandingPageContext);
    const [counter, setCounter] = useState(0);

    const userInfo = {
        email: "",
        password: "",

    };
    const userInfoRegister = {
        name: "",
        lastname: "",
        address: "",
        cardNumber: "",
        expDate: "",
        cvv: "",
        type: ""
    };

    function typeForm() {
      if (counter == 0) {
        return (
          <>
            <h2>Regístrate o inicia sesión</h2>
            <p>Al continuar acepta los términos y condiciones uso de OddJobs.</p>
          </>
        );
      }
    }

  return (
    <div className="form_getin_container">
      <div className={`form_container ${isGettinInto ? "show_form" : ''}`}>
        <div className="image">
          <img src={WomanFormImage} alt="image-form" className="imageForm"/>
        </div>
        <div className="form">
          
        </div>
      </div>
      <img src={CancelBoton} alt="quit-icon" className="cancelButton" onClick={enableLandingPage}/>
    </div>
  );
}
