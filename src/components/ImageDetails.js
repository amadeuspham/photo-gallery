import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
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
		const {id} = this.props.match.params;
		const {data} = this.props;
		const elementPos = data.findIndex(photo => photo.id === parseInt(id));
		const fromGallery = data[elementPos];

		if (fromGallery) {
			this.setState({
				photo: fromGallery,
				loading: false,
				backToGallery: true
			});
		} else {
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
    "albumId": PropTypes.string.isRequired,
    "id": PropTypes.string.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  }))
};