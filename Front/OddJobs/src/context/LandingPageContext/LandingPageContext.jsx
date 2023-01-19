import { createContext, useState, useEffect } from "react";

export const LandingPageContext = createContext();

export function LandingPageContextProvider(props) {
  const [isGettinInto, setIsGettinInto] = useState(false);

  useEffect(() => {
    setIsGettinInto(false);
  }, []);

  const disableLandingPage = () => {
    setIsGettinInto(true);
  };

  const enableLandingPage = () => {
    setIsGettinInto(false);
  };

  return (
    <LandingPageContext.Provider
      value={{
        disableLandingPage,
        enableLandingPage,
        isGettinInto,
      }}
    >
      {props.children}
    </LandingPageContext.Provider>
  );
}
