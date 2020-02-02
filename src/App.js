import React, {useState} from 'react';
import './App.css';
import GalleryHeader from './GalleryHeader.js';
import Gallery from './Gallery.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [light, setLight] = useState(true);
	const [currentAlbum, setCurrentAlbum] = useState('All albums');

  return (
    <div className={light ? "App" : "App bg-dark"}>
      <GalleryHeader light={light} currentAlbum={currentAlbum} setLight={setLight} setCurrentAlbum={setCurrentAlbum}/>
      <Gallery light={light} currentAlbum={currentAlbum}/>
    </div>
  );
}

export default App;
