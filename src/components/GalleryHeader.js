import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Row, Col, Button } from 'react-bootstrap';
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

// async function getAlbumName(albumId) {
//   let url = new URL('https://jsonplaceholder.typicode.com/photos');
//   url.search = new URLSearchParams({
//       albumId: albumId,
//       _page: 1,
//       _limit: 1,
//   });

//   const response = await fetch(url);
//   const data = await response.json()
//   console.log('album data:')
//   console.log(data);
//   return;
// }

export default function GalleryHeader(props) {
  const {light, setLight, currentAlbum, currentAlbumName, setCurrentAlbum, viewingMode} = props;
  const buttonVariant = adaptiveButtonBackground(light, viewingMode);

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
        <Link to={'/albums'}>
          <Button 
            className="mr-4"
            variant={buttonVariant}
            onClick={() => {
              setCurrentAlbum("All albums");
            }}
          >
            <Row className="align-items-center">
              <Col>
                <AlbumIcon light={light} viewingMode={viewingMode}/>
              </Col>
              <Col md="auto">
                <p className="my-auto">
                  {albumTitle}
                </p>
              </Col>
            </Row>
          </Button>
          </Link>
        <Button 
          className="mr-4"
          variant={light ? "dark" : "light"}
        >
          <UserIcon light={light}/>
        </Button>
        <Button 
          variant={light ? "dark" : "light"}
          onClick={() => setLight(!light)}
        >
          {light ? <LightModeIcon/> : <DarkModeIcon/>}
        </Button>
      </Navbar.Collapse>
		</Navbar>
	);
}

GalleryHeader.propTypes = {
  light: PropTypes.bool.isRequired,
  currentAlbum: PropTypes.string.isRequired,
  setLight: PropTypes.func.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired
};