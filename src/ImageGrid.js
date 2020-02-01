import React from 'react';
import Row from 'react-bootstrap/Row';
import {
  useLocation,
} from "react-router-dom";

import ImageCard from './ImageCard.js';
import Loading from './Loading.js';

export default function ImageGrid(props) {
  const location = useLocation();
  const {data, loading} = props;

  if (!loading) {
    return (
      <Row>
        {data.map(photo => (
          <ImageCard 
            key={photo.id}
            photo={photo} 
            location={location}/>
        ))}
      </Row>
    );
  } else {
    return <Loading/>;
  }
}