import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const { isLoggedIn, userFullName } = useSelector((state) => state.users);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavLink
          className="my-2"
          style={{
            fontFamily: "Barlow, sans-serif",
            fontFamily: "Style Script, cursive",
            fontSize: "30px",
          }}
          to={"/"}
        >
          Task Management App
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {isLoggedIn ? (
              <NavLink className="my-3 mx-3" to={"/dashboard"}>
                Dashboard
              </NavLink>
            ) : (
              <></>
            )}
          </Nav>
          <Form className="d-flex gap-3">
            {!isLoggedIn ? (
              <>
                <NavLink to={"/login"} title="Log-in">
                  <i className="fa-solid fa-right-to-bracket fa-xl" />
                </NavLink>
                <NavLink to={"/signup"} title="Sign-up">
                  <i className="fa-solid fa-user-plus fa-xl" />
                </NavLink>
              </>
            ) : (
              <>
                <div>{userFullName}</div>
                <NavLink to="/login" title="Log-out">
                  <i className="fa-solid fa-right-from-bracket fa-xl" />
                </NavLink>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
