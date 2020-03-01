import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Col, Spinner } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { Link } from "react-router-dom";

export default function AlbumCard(props){
	const {album, light, setCurrentAlbum, setCurrentAlbumName} = props;
	const [hovered, setHovered] = useState(false);
	const [thumbnailsList, setThumbnailsList] = useState([]);
	const [loading, setLoading] = useState(true);

	if (thumbnailsList.length === 0) {
	  let url = new URL('https://jsonplaceholder.typicode.com/albums/' + parseInt(album.id) + '/photos');
	  url.search = new URLSearchParams({
	      _page: 1,
	      _limit: 3,
	  });

	  fetch(url)
	    .then(response => response.json())
	    .then(data => {
	    	setThumbnailsList(data);
	    	setLoading(false);
	    })
	    .catch(error => {
	    	setLoading(false);
	    });
	}

	// Renders a thumbnail for a photo, which will grows larger when mouse hovers on it
	// Lazy loading is enabled, the photo will load when user is aboout to see it (for performance)
	if (loading) {
		return (<Loading/>);
	} else {
		return (
	    <Col sm={4} md={3} lg={2}>
	    	<LazyLoad 
	    		key={album.id} 
	    		placeholer={<Loading/>}
	    		debounce={false}
	       	height={150}
	       	offset={100}
	       	once={true}
	    	>
	    		<Link to={'/albums/' + album.id} className="d-block mb-4 h-100">
			      <Card 
			      	onClick={() => {
			      			setCurrentAlbum(album.id);
			      			setCurrentAlbumName(album.title)
			      	}}
			        onMouseOut={() => setHovered(false)}
			        onMouseOver={() => setHovered(true)}
			      	style={{ 
			      		width: '10rem',
			        	transform: `${hovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
			        	transition: 'transform 0.4s ease-in-out',
			      	}}
			      	className={light ? "shadow-lg bg-white border-0 rounded" : "shadow-lg bg-secondary border-0 rounded"}
			      >
						  <Card.Img 
						  	variant="top" 
						  	src={thumbnailsList[0].thumbnailUrl}
						  	rounded
						  />
						  <Card.ImgOverlay variant="bottom" style={{opacity: 0.7}}>
						    <Card.Title
						    	style={{
						    		backgroundColor: 'white',
						    		borderRadius: '1px',
						    		padding: '0 0.3em',
						    		textAlign: 'left',
						    		overflow: 'hidden',
									  height: '3.6em', /* exactly three lines */
									  lineHeight: '1.2em',
									  textOverflow: 'ellipsis',
									  color: 'black'
						    	}}
						    	rounded
						    >
						    	{album.title}
						    </Card.Title>
						  </Card.ImgOverlay>
						</Card>
					</Link>
	      </LazyLoad>
	    </Col>
		);
	}
}

AlbumCard.propTypes = {
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

