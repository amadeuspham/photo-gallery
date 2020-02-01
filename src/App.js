import React from 'react';
import './App.css';
import GalleryHeader from './GalleryHeader.js';
import Gallery from './Gallery.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <GalleryHeader/>
      <Gallery/>
    </div>
  );
}

export default App;
