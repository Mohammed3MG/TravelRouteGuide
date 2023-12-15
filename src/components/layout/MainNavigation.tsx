import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.webp"

const MainNavigation = () => {
  return (
    <Navbar data-testid="main-navigation" bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <span role="img" aria-label="map">
            <img src={logo} height={25} />
          </span>{" "}
         Travel Route guide
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/cities" className="nav-link">
              Cities
            </Link>
           
            <Link to="/result" className="nav-link">
              Result
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
