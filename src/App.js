import React, {useState} from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import GalleryHeader from './components/GalleryHeader.js';
import Gallery from './components/Gallery.js';
import ImageDetails from './components/ImageDetails.js';
import NotFound from './components/NotFound.js';

function Switches(appProps){
	const {setViewingMode, light, currentAlbum, currentAlbumName, setCurrentAlbum, setCurrentAlbumName} = appProps;
	const [photosData, setPhotosData] = useState([]);
	const [albumsData, setAlbumsData] = useState([]);

  return (
    <Switch>
      <Route exact path="/photos/:id" render={(props) => 
      	<ImageDetails 
      		photosData={photosData} 
      		light={light} 
      		{...props} 
      	/> }
      />
      <Route exact path="/albums/:id" render={(props) => 
      	<Gallery 
      		albumId={props.match.params.id}
      		albumsData={albumsData}
      		photosData={photosData}
      		light={light} 
      		currentAlbum={currentAlbum} 
      		currentAlbumName={currentAlbumName}
      		setPhotosData={setPhotosData}
      		setCurrentAlbum={setCurrentAlbum}
      		showingDataType="albumPhotos"
      		setViewingMode={setViewingMode}
      		setCurrentAlbumName={setCurrentAlbumName}
      		{...props} 
      	/>}
      />
      <Route exact path="/albums/" render={(props) => 
      	<Gallery 
      		albumsData={albumsData}
      		photosData={photosData}
      		light={light} 
      		currentAlbum={currentAlbum} 
      		setAlbumsData={setAlbumsData}
      		setCurrentAlbum={setCurrentAlbum}
      		showingDataType="albums"
      		setViewingMode={setViewingMode}
      		setCurrentAlbumName={setCurrentAlbumName}
      		{...props} 
      	/>}
      />
      <Route exact path="/" render={(props) => 
      	<Gallery 
      		light={light} 
      		photosData={photosData} 
      		albumsData={albumsData}
      		setPhotosData={setPhotosData}
      		setAlbumsData={setAlbumsData}
      		currentAlbum={currentAlbum} 
      		showingDataType="photos"
      		setViewingMode={setViewingMode}
      		setCurrentAlbumName={setCurrentAlbumName}
      		{...props} 
      	/>} 
      />
      <Route path="*" children={<NotFound/>}/>
    </Switch>
  );
}

function App() {
	const [light, setLight] = useState(true); // light/dark mode state
	const [currentAlbum, setCurrentAlbum] = useState('All albums');
	const [viewingMode, setViewingMode] = useState('photos')
	const [currentAlbumName, setCurrentAlbumName] = useState('');

  return (
  	<Router>
	    <div className={light ? "App" : "App bg-dark"}>
	      <GalleryHeader 
	      	light={light}  
	      	setLight={setLight} 
	      	currentAlbum={currentAlbum}
	      	setCurrentAlbum={setCurrentAlbum}
	      	currentAlbumName={currentAlbumName}
	      	setCurrentAlbumName={setCurrentAlbumName}
	      	viewingMode={viewingMode}
	      />
	      <Switches 
	      	light={light} 
	      	currentAlbum={currentAlbum} 
	      	currentAlbumName={currentAlbumName}
	      	setCurrentAlbum={setCurrentAlbum}
	      	setViewingMode={setViewingMode}
	      	setCurrentAlbumName={setCurrentAlbumName}
	      />
	    </div>
    </Router>
  );
}

export default App;
