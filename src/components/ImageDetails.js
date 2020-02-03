import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Image} from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import {
  Link
} from "react-router-dom";

import Loading from './Loading.js';
import imageInfoGenerator from '../utils/imageInfoGenerator';

export default class ImageDetails extends React.Component{
	state = {
		photo: null,
		loading: true,
		backToGallery: false,
	}

	componentDidMount() {
		// get the photo ID from URL path
		const {id} = this.props.match.params;
		// retrieve the photo object
		this.loadPic(parseInt(id));
	}

	loadPic = (id) => {
		const {data} = this.props;
		// try to find the photo position in the current photos array
		// (only works when user clicks on the photo from the gallery view)
		const elementPos = data.findIndex(photo => photo.id === id);
		const fromGallery = data[elementPos];

		if (fromGallery) {
			this.setState({
				photo: fromGallery,
				loading: false,
				backToGallery: true
			});
		} else {
			// if the user access the photo with an URL, fetch the photo
			// directly from the API
			fetch("https://jsonplaceholder.typicode.com/photos/" + id)
	      .then(response => response.json())
		    .then(data => {
		      this.setState({
		      	photo: data,
		      	loading: false
		      })
		    });
		}
	}

	// back button to the gallery view (only rendered when user clicks on the photo from gallery)
	BackButton = () => {
		return (
			<Col className="col-auto mb-4">
				<IconContext.Provider value={{ color: "grey", size:"3em" }}>
				  <Link to='/'>
				    <IoIosArrowBack />
				  </Link>
				</IconContext.Provider>
			</Col>
		);
	}

	render() {
		const {loading, photo, backToGallery} = this.state;
		const {light} = this.props;

		if (loading) {
			return <Loading/>;
		} else {
			return (
				<Container className="align-items-center" style={{minHeight: '100vh'}} fluid>
					<Row>
						{backToGallery && <this.BackButton/>}
						<Col sm={7}>
			    		<Image src={photo.url} className="mb-4" fluid/>
			    	</Col>
			    	{imageInfoGenerator(photo, light)}
			    </Row>
		    </Container>
			);
		}
	}
}

ImageDetails.propTypes = {
  light: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    "albumId": PropTypes.number.isRequired,
    "id": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  }))
};