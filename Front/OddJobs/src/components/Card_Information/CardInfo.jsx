import { useContext } from "react";

import { Button } from "../Button/Button";
import { LandingPageContext } from "../../context/LandingPageContext/LandingPageContext";
import "./cardinfo.scss";

export function CardInfo({ info }) {
  const {disableLandingPage} = useContext(LandingPageContext);
  return (
    <div className="card_info_container">
      <div className="icon_card_info">
        <img src={info.icon} alt="card-icon" />
      </div>
      <div className="info_card_title">
        <h3>{info.title}</h3>
      </div>
      <div className="info_card">
        <p>{info.information}</p>
      </div>
      <div className="button_info_card">
      <Button
        text={info.buttontxt}
        isPriority={true}
        id="register_button_information"
        action={disableLandingPage}
      />
      </div>
    </div>
  );
}
