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
		console.log(this.props)
		
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

		if (loading) {
			return <Loading/>;
		} else {
			return (
				<Container className="align-items-center" fluid>
					<Row>
						{backToGallery && <this.BackButton/>}
						<Col sm={7}>
			    		<Image src={photo.url} className="mb-4" fluid/>
			    	</Col>
			    	<Col className="shadow-lg p-3 bg-white my-auto" rounded>
			    		<p>Image info</p>
			    		<Row>
			    			<Col className="text-left">
			    				<p className="font-weight-bold"> Album ID </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p> {photo.albumId} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className="font-weight-bold"> Photo ID </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p> {photo.id} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className="font-weight-bold"> Title </p>
			    			</Col>
			    			<Col className="text-right">
			    				<p> {photo.title} </p>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className="font-weight-bold"> Photo URL </p>
			    			</Col>
			    			<Col className="text-right">
			    				<a href={photo.url}>{photo.url}</a>
			    			</Col>
			    		</Row>
			    		<Row>
			    			<Col className="text-left">
			    				<p className="font-weight-bold"> Thumbnail URL </p>
			    			</Col>
			    			<Col className="text-right">
			    				<a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>
			    			</Col>
			    		</Row>
			    	</Col>
			    </Row>
		    </Container>
			);
		}
	}
}