import React, {useState} from 'react';
import './App.css';
import GalleryHeader from './GalleryHeader.js';
import Gallery from './Gallery.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [light, setLight] = useState(true)

  return (
    <div className={light ? "App" : "App bg-dark"}>
      <GalleryHeader light={light} setLight={setLight}/>
      <Gallery light={light}/>
    </div>
  );
}

export default App;
