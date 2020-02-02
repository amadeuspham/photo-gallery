import React, {useState} from 'react';
import { Navbar, Nav, Dropdown, NavItem, Button } from 'react-bootstrap';
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
  const {light, currentAlbum, setLight, setCurrentAlbum} = props;

  const albumDropdownItems = [];
  albumDropdownItems.push(
    <Dropdown.Item 
      onClick={() => setCurrentAlbum("All albums")}
      className={light ? "text-dark" : "text-light"}
    >
      All albums
    </Dropdown.Item>
  );

  albumDropdownItems.push(<Dropdown.Divider />);
  for (let albumId = 1; albumId <= 100; albumId++) {
    albumId = albumId.toString();
    albumDropdownItems.push(
      <Dropdown.Item 
        onClick={() => setCurrentAlbum(albumId)}
        className={light ? "text-dark" : "text-light"}
      >
        {albumId}
      </Dropdown.Item>
    );
  }

	return (
		<Navbar expand="lg" className="py-4" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"}>
		  <Navbar.Brand href="/">
		  	<h1 
          className={light ? "display-4 font-weight-bold text-dark" : "display-4 font-weight-bold text-light"}
        >
          Photos
        </h1>
		  </Navbar.Brand> 
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto ml-3">
        <Dropdown as={NavItem}>
          <Dropdown.Toggle id="dropdown-custom-1" className={light ? null : "bg-secondary border-0"}>{currentAlbum + ' '}</Dropdown.Toggle>
          <Dropdown.Menu className={light ? "bg-white pre-scrollable border-0" : "bg-secondary pre-scrollable border-0"}>
            {albumDropdownItems}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
        <Button 
          variant={light ? "dark" : "light"}
          //className="ml-auto" 
          onClick={() => setLight(!light)}
        >
          {light ? <LightIcon/> : <DarkIcon/>}
        </Button>
      </Navbar.Collapse>
		</Navbar>
	);
}