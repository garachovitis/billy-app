import { Dropdown } from "react-bootstrap";

export const UserDropdown = ({ setShowSidebar }) => {
  return (
    <Dropdown className="header-container-item" onClick={() => setShowSidebar(false)}>
      <Dropdown.Toggle className="btn btn-secondary dropdown-toggle" id="dropdown-basic">
        <i className="bi bi-person-circle"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="mt-1" align="end">
        <Dropdown.Item href="#/login">Login</Dropdown.Item>
        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="#/signup">Sign Up</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
