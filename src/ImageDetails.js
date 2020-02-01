import React from 'react';
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
import './ImageInfo.css';

export default class ImageDetails extends React.Component{
	state = {
		photo: null,
		loading: true,
		backToGallery: false,
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		const {data} = this.props;
		const elementPos = data.findIndex(photo => photo.id == id);
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
			    	<Col className={light ? "shadow-lg p-3 bg-white my-auto" : "shadow-lg p-3 bg-secondary my-auto"} rounded>
			    		<p className={light ? "category" : "category-dark"}>Image info</p>
			    		<Row>
			    			<Col className="text-left">
			    				<p className={light ? "category" : "category-dark"}> Album ID </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p className={light ? null : "details-dark"}> {photo.albumId} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className={light ? "category" : "category-dark"}> Photo ID </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p className={light ? null : "details-dark"}> {photo.id} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className={light ? "category" : "category-dark"}> Title </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p className={light ? null : "details-dark"}> {photo.title} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className={light ? "category" : "category-dark"}> Photo URL </p>
			    			</Col>
			    			<Col className="text-right">
			    				<a href={photo.url} className={light ? null : "url-dark"}>{photo.url}</a>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className={light ? "category" : "category-dark"}> Thumbnail URL </p>
			    			</Col>
			    			<Col className="text-right">
			    				<a href={photo.thumbnailUrl} className={light ? null : "url-dark"}>{photo.thumbnailUrl}</a>
			    			</Col>
			    		</Row>
			    	</Col>
			    </Row>
		    </Container>
			);
		}
	}
}