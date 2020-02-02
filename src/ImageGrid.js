import React from 'react';
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