import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

import ImageCard from './ImageCard.js';
import AlbumCard from './AlbumCard.js';

export default function ImageGrid(props) {
  const {data, loading, light, showingDataType, setCurrentAlbum, setCurrentAlbumName} = props;
  // For each photo, renders a thumbnail card in the gallery
  if (showingDataType === "albums") {
    return (
      <Row style={{justifyContent: 'center'}}>
        {data.map(album => (
          <AlbumCard 
            key={album.id}
            album={album} 
            setCurrentAlbum={setCurrentAlbum}
            setCurrentAlbumName={setCurrentAlbumName}
            light={light}
          />
        ))}
      </Row>
    );
  } else {
    return (
      <Row style={{justifyContent: 'center'}}>
        {data.map(photo => (
          <ImageCard 
            key={photo.id}
            photo={photo} 
            light={light}
          />
        ))}
      </Row>
    );
  }
}

ImageGrid.propTypes = {
  light: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    "albumId": PropTypes.number.isRequired,
    "id": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  }))
};