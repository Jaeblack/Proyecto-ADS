import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LandingPageContext } from "../../context/LandingPageContext/LandingPageContext";
import { DataContext } from "../../context/DataContext/DataContext";
import { Button } from "../Button/Button";

import { users } from "../../data/data";

import CancelBoton from "../../images/icons/QuitIcon.png";
import WomanFormImage from "../../images/form_image.jpg";
import EmailIcon from "../../images/icons/email.png";
import LeftArrow from "../../images/icons/left-arrow.png";
import Checked from "../../images/icons/check_circle_icon.png";

import "./getinform.scss";

export function GetinForm() {
  const history = useNavigate();

  const [actualSession, setActualSession] = useState({});

  const { isGettinInto, enableLandingPage } = useContext(LandingPageContext);
  const { getUser, addUser } = useContext(DataContext);

  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isWorker, setIsWorker] = useState(true);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [cardnumberValid, setCardnumberValid] = useState(true);
  const [expDateValid, setExpDateValid] = useState(true);
  const [cvvValid, setCvvValid] = useState(true);

  const [style, setStyle] = useState(
    `form_getin_container ${isGettinInto ? "show_form" : ""}`
  );

  let style2 = `form_container ${isGettinInto ? "show_form" : ""}`;

  function typeForm() {
    switch (counter) {
      case 0:
        return (
          <div className="first_form">
            <h2>Regístrate o inicia sesión</h2>
            <Button
              text={
                <span>
                  Usa tu correo <img src={EmailIcon} alt="Email-Icon" />
                </span>
              }
              isPriority={false}
              id={"Button_form"}
              action={() => {
                setCounter(counter + 1);
              }}
            />
            <p>
              Al continuar acepta los términos y condiciones uso de OddJobs.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="second_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Sigue con tu correo electrónico</h2>
              <p className="information">
                Ingresa a tu correo electrónico para iniciar sesión o
                registrarte
              </p>
              <div className="input_container">
                <p className={emailValid ? "" : "text_red"}>
                  Correo {emailValid ? "" : "invalido!"}
                </p>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  className={emailValid ? "" : "border_red"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(true);
                  }}
                />
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  const regex =
                    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                  if (email.length != 0 && regex.test(email)) {
                    setEmailValid(true);
                    let temp = getUser(email);
                    setActualSession({ ...temp });
                    if (temp != null) {
                      setCounter(2);
                    } else {
                      setCounter(3);
                    }
                  } else {
                    setEmail("");
                    setEmailValid(false);
                  }
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="third_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Falta poco para iniciar sesión</h2>
              <p className="information">
                Ingresa tu contraseña para: {actualSession.email}
              </p>
              <div className="input_container">
                <p className={passwordValid ? "" : "text_red"}>
                  Contraseña {passwordValid ? "" : "invalida!"}
                </p>
                <input
                  type="email"
                  placeholder="Contraseña"
                  value={password}
                  className={passwordValid ? "" : "border_red"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(true);
                  }}
                />
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  if (actualSession.password == password) {
                    setPasswordValid(true);
                    setTimeout(() => {
                      enableLandingPage();
                      if (actualSession.type == "client") {
                        history("/Client");
                      } else {
                        history("/Worker");
                      }
                    }, 1000);
                  } else {
                    setPasswordValid(false);
                    setPassword("");
                  }
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="fourth_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Termina de registrarte</h2>
              <p className="information fourth_p">
                Ingresa la contraseña que usaras para ingresar a tu cuenta de
                OddJobs
              </p>
              <div className="input_container">
                <p className={passwordValid ? "" : "text_red"}>
                  Contraseña {passwordValid ? "" : "invalida!"}
                </p>
                <input
                  type="text"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  className={passwordValid ? "" : "border_red"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(true);
                  }}
                />
                {password < 5 && !passwordValid ? (
                  <p className="password_size_invalid">
                    La contraseña debe de tener al menos 5 caracteres
                  </p>
                ) : (
                  ""
                )}
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  if (password.length < 5) {
                    setPasswordValid(false);
                    setPassword("");
                  } else {
                    setCounter(counter + 1);
                  }
                }}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="fifth_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Termina de registrarte</h2>
              <p className="information">
                Ingresa tus datos para continuar con OddJobs
              </p>
              <div className="input_container">
                <p className={nameValid ? "" : "text_red"}>
                  {nameValid ? "Nombre" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  className={nameValid ? "" : "border_red"}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameValid(true);
                  }}
                />
              </div>
              <div className="input_container">
                <p className={lastNameValid ? "" : "text_red"}>
                  {lastNameValid ? "Apellido" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="Ingresa tu apellido"
                  value={lastname}
                  className={lastNameValid ? "" : "border_red"}
                  onChange={(e) => {
                    setLastname(e.target.value);
                    setLastNameValid(true);
                  }}
                />
              </div>
              <div className="input_container">
                <p className={addressValid ? "" : "text_red"}>
                  {addressValid ? "Dirección" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="Ingresa tu dirección"
                  value={address}
                  className={addressValid ? "" : "border_red"}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressValid(true);
                  }}
                />
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  if (name.length == 0) {
                    setNameValid(false);
                  } else {
                    setNameValid(true);
                  }
                  if (lastname.length == 0) {
                    setLastNameValid(false);
                  } else {
                    setLastNameValid(true);
                  }
                  if (address.length == 0) {
                    setAddressValid(false);
                  } else {
                    setAddressValid(true);
                  }
                  if (
                    name.length > 0 &&
                    lastname.length > 0 &&
                    address.length > 0
                  ) {
                    setCounter(counter + 1);
                  }
                }}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="fifth_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Termina de registrarte</h2>
              <p className="information">Información bancaria</p>
              <div className="input_container">
                <p className={cardnumberValid ? "" : "text_red"}>
                  {cardnumberValid ? "Número de tarjeta" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="Num. de tarjeta"
                  value={cardnumber}
                  className={cardnumberValid ? "" : "border_red"}
                  onChange={(e) => {
                    setCardnumber(e.target.value);
                    setCardnumberValid(true);
                  }}
                />
              </div>
              <div className="input_container">
                <p className={expDateValid ? "" : "text_red"}>
                  {expDateValid ? "Fecha de expiración" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="mm/yyyy"
                  value={expdate}
                  className={expDateValid ? "" : "border_red"}
                  onChange={(e) => {
                    setExpdate(e.target.value);
                    setExpDateValid(true);
                  }}
                />
              </div>
              <div className="input_container">
                <p className={cvvValid ? "" : "text_red"}>
                  {cvvValid ? "CVV" : "Campo requerido"}
                </p>
                <input
                  type="text"
                  placeholder="Ingresa el CVV"
                  value={cvv}
                  className={cvvValid ? "" : "border_red"}
                  onChange={(e) => {
                    setCvv(e.target.value);
                    setCvvValid(true);
                  }}
                />
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  if (cardnumber.length == 0) {
                    setCardnumberValid(false);
                  } else {
                    setCardnumberValid(true);
                  }
                  if (expdate.length == 0) {
                    setExpDateValid(false);
                  } else {
                    setExpDateValid(true);
                  }
                  if (cvv.length == 0) {
                    setCvvValid(false);
                  } else {
                    setCvvValid(true);
                  }
                  if (
                    cardnumber.length > 0 &&
                    expdate.length > 0 &&
                    cvv.length > 0
                  ) {
                    setCounter(counter + 1);
                  }
                }}
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="seventh_form">
            <div className="icon">
              <img
                src={LeftArrow}
                alt="left_arrow"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              />
            </div>
            <div className="form_info">
              <h2>Termina de registrarte</h2>
              <p className="information fourth_p">Te registraras como</p>
              <div className="input_container">
                <div className="radio_button">
                  <label htmlFor="Trabajador">Trabajador</label>
                  <input
                    type="radio"
                    name="client_type"
                    value="Trabajador"
                    id="Trabajador"
                    checked
                    onChange={() => {}}
                    onClick={() => {
                      setIsWorker(true);
                    }}
                  />
                </div>
                <div className="radio_button">
                  <label htmlFor="Cliente">Cliente</label>
                  <input
                    type="radio"
                    name="client_type"
                    value="Cliente"
                    id="Cliente"
                    onChange={() => {}}
                    onClick={() => {
                      setIsWorker(false);
                    }}
                  />
                </div>
              </div>
              <Button
                text="Continuar"
                isPriority={true}
                id={"Button_form"}
                action={() => {
                  setCounter(counter + 1);
                  addUser({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                    address: address,
                    card: {
                      cardNumber: cardnumber,
                      expDate: expdate,
                      cvv: cvv,
                    },
                    type: isWorker ? "worker" : "client",
                  });
                  setTimeout(() => {
                    enableLandingPage();
                    if (!isWorker) {
                      history("/Client");
                    } else {
                      history("/Worker");
                    }
                  }, 1000);
                }}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="eigth_form">
            <div className="form_info">
              <h2>¡Registro exitoso!</h2>
              <img src={Checked} alt="Finish" />
            </div>
          </div>
        );
    }
  }

  return (
    <div className={style}>
      <div className={style2}>
        <div className="image">
          <img src={WomanFormImage} alt="image-form" className="imageForm" />
        </div>
        <div className="form">{typeForm()}</div>
      </div>
      <img
        src={CancelBoton}
        alt="quit-icon"
        className="cancelButton"
        onClick={() => {
          setCounter(0);
          enableLandingPage();
        }}
      />
    </div>
  );
}
