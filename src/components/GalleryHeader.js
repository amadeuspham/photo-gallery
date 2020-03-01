import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Button, ButtonGroup } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosMoon, IoIosSunny, IoIosAlbums, IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

function adaptiveButtonBackground(light, viewingMode) {
  if (light) {
    if (viewingMode === "albums" || viewingMode === "albumPhotos") {
      return "primary";
    } else {
      return "dark";
    }
  } else {
    if (viewingMode === "albums" || viewingMode === "albumPhotos") {
      return "warning";
    } else {
      return "light";
    }
  }
}

function AlbumIcon(props) {
  const {light, viewingMode} = props;

  return (
    <IconContext.Provider 
      value={light ? { color: "#f8f9fa", size:"2em" } : { color: "#343a40", size:"2em" }}
    >
      <IoIosAlbums />
    </IconContext.Provider>
  );
}

function UserIcon(props) {
  const {light} = props;

  return (
    <IconContext.Provider 
      value={light ? { color: "#f8f9fa", size:"2em" } : { color: "#343a40", size:"2em" }}
    >
      <IoIosPeople />
    </IconContext.Provider>
  );
}

// Turn on Dark Mode button
function LightModeIcon() {
  return (
      <IconContext.Provider value={{ color: "#f8f9fa", size:"2em" }}>
        <IoIosMoon />
      </IconContext.Provider>
  );
}

// Turn on Light Mode button
function DarkModeIcon() {
  return (
      <IconContext.Provider value={{ color: "#343a40", size:"2em" }}>
        <IoIosSunny />
      </IconContext.Provider>
  );
}

export default function GalleryHeader(props) {
  const {light, setLight, currentAlbum, currentAlbumName, setCurrentAlbum, viewingMode} = props;
  const buttonVariant = adaptiveButtonBackground(light, viewingMode);

  let albumNameButtonLink = '/albums/';
  if (currentAlbum !== "All albums") {
    albumNameButtonLink += currentAlbum;
  }

  let albumTitle = "Albums";
  if (viewingMode === "albums") {
    albumTitle = "Showing all albums";
  } else if (viewingMode === 'albumPhotos') {
    albumTitle = currentAlbumName;
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
      <Navbar.Collapse id="basic-navbar-nav" className="m-3">
        <ButtonGroup className="mr-4">
          <Button 
            variant={buttonVariant}
            onClick={() => {
              setCurrentAlbum("All albums");
            }}
          >
            <Link to={'/albums'}>
              <AlbumIcon light={light} viewingMode={viewingMode}/>
            </Link>
          </Button>
          {albumTitle !== "Albums" && 
            <Button 
              variant={buttonVariant}
            >
              <Link to={albumNameButtonLink} className={light ? "text-light" : "text-dark"}>
                {albumTitle}
              </Link>
            </Button>
          }
        </ButtonGroup>
        <Button 
          className="mr-4"
          variant={light ? "dark" : "light"}
        >
          <UserIcon light={light}/>
        </Button>
      </Navbar.Collapse>
      <Button 
        variant={light ? "dark" : "light"}
        onClick={() => setLight(!light)}
      >
        {light ? <LightModeIcon/> : <DarkModeIcon/>}
      </Button>
		</Navbar>
	);
}

GalleryHeader.propTypes = {
  light: PropTypes.bool.isRequired,
  currentAlbum: PropTypes.string.isRequired,
  setLight: PropTypes.func.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired
};