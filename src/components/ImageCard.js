import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Image, Spinner } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { Link } from "react-router-dom";

export default function ImageCard(props){
	const {photo, light} = props;
	const [hovered, setHovered] = useState(false);

	return (
    <Col sm={4} md={3} lg={2}>
    	<LazyLoad 
    		key={photo.id} 
    		placeholer={<Loading/>}
    		debounce={false}
       	height={150}
       	offset={100}
       	once={true}
    	>
      	<Link to={'/' + photo.id} className="d-block mb-4 h-100">
	        <Image 
	        	src={photo.thumbnailUrl} 
		        onMouseOut={() => setHovered(false)}
		        onMouseOver={() => setHovered(true)}
		        style={{
		        	transform: `${hovered ? 'scale(1.5,1.5)' : 'scale(1,1)'}`,
		        	transition: 'transform 0.4s ease-in-out',
		        }}
		        className={light ? "shadow-lg p-3 mb-5 bg-white rounded" : "shadow-lg p-3 mb-5 bg-secondary rounded"}
	        	rounded
	        />
        </Link>
      </LazyLoad>
    </Col>
	);
}

ImageCard.propTypes = {
  light: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    "albumId": PropTypes.string.isRequired,
    "id": PropTypes.string.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  })
};

function Loading() {
	return (
		<Container style={{width: '150px', height: '150px'}}>
			<Spinner animation="border" role="status"/>
		</Container>
	);
}

