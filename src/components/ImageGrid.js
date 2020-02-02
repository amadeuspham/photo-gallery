import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import {
  useLocation,
} from "react-router-dom";

import ImageCard from './ImageCard.js';
import Loading from './Loading.js';

export default function ImageGrid(props) {
  const location = useLocation();
  const {data, loading, light} = props;

  if (!loading) {
    return (
      <Row style={{justifyContent: 'center'}}>
        {data.map(photo => (
          <ImageCard 
            key={photo.id}
            photo={photo} 
            location={location}
            light={light}
          />
        ))}
      </Row>
    );
  } else {
    return <Loading light={light}/>;
  }
}

ImageGrid.propTypes = {
  light: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    "albumId": PropTypes.string.isRequired,
    "id": PropTypes.string.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  }))
};