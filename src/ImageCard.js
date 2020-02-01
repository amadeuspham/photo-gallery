import React, {useState} from 'react';
import { Container, Col, Image, Spinner } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { Link } from "react-router-dom";

export default function ImageCard(props){
	const {photo} = props;
	const [hovered, setHovered] = useState(false);

	return (
    <Col xs={5} sm={4} md={3} lg={2}>
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
		        className="shadow-lg p-3 mb-5 bg-white rounded"
	        	rounded
	        />
        </Link>
      </LazyLoad>
    </Col>
	);
}

function Loading() {
	return (
		<Container style={{width: '150px', height: '150px'}}>
			<Spinner animation="border" role="status"/>
		</Container>
	);
}

