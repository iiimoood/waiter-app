import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded flex-nowrap"
    >
      <span className="text-light align-items-center col-10 ms-2">
        Waiter.app
      </span>
      <Nav className="me-3 col-2">
        <Nav.Link
          className="w-100 d-flex justify-content-center justify-content-lg-end me-3"
          as={NavLink}
          to="/"
        >
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
