import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OddJobs } from "./pages/landingPage/OddJobs";
import { LandingPageContextProvider } from "./context/LandingPageContext/LandingPageContext";
import NotPageFound from "./pages/NoPage/NotFountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <LandingPageContextProvider>
            <OddJobs />
          </LandingPageContextProvider>
        } />
        <Route path="*" element={<NotPageFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
