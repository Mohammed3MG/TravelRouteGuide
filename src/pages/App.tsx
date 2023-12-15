import { Fragment } from "react";
import MainNavigation from "../components/layout/MainNavigation";
import Home from "./Home";
import Form from "./Form";
import FormHamburg from "./FormHamburg";
import Results from "./Results";
import Cities from "./Cities";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Cities />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/berlin" element={<Form />} />
            <Route path="/hamburg" element={<FormHamburg />} />
            <Route path="/result" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </Fragment>
  );
};

export default App;
