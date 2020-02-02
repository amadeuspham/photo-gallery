import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/ImageInfo.css';

export default function imageInfoGenerator(photo, light) {
	return (
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
	);
}