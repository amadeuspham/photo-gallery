import React, {useState} from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

function LightIcon() {
  return (
      <IconContext.Provider value={{ color: "#f8f9fa", size:"2em" }}>
        <IoIosMoon />
      </IconContext.Provider>
  );
}

function DarkIcon() {
  return (
      <IconContext.Provider value={{ color: "#343a40", size:"2em" }}>
        <IoIosSunny />
      </IconContext.Provider>
  );
}

export default function GalleryHeader(props) {
  const {light, setLight} = props;

	return (
		<Navbar expand="lg" className={light ? "py-4 bg-white" : "py-4 bg-dark"}>
		  <Navbar.Brand href="/">
		  	<h1 
          className={light ? "display-4 font-weight-bold text-dark" : "display-4 font-weight-bold text-light"}
        >
          Photos
        </h1>
		  </Navbar.Brand> 
      <Button 
        variant={light ? "dark" : "light"}
        className="ml-auto" 
        onClick={() => setLight(!light)}
      >
        {light ? <LightIcon/> : <DarkIcon/>}
      </Button>
		</Navbar>
	);
}
/*
<Navbar.Toggle aria-controls="basic-navbar-nav" /> 
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ml-auto mr-3">
    <NavDropdown title="All albums" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>
  </Nav>
  <Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-success">Search</Button>
  </Form>
</Navbar.Collapse>
*/