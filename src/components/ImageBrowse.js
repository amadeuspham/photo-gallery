import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Pagination from "react-js-pagination";

import ImageGrid from './ImageGrid.js';
import '../styles/Pagination.css';

export default function ImageBrowse(props) {
	const {data, loading, currentPage, handlePageChange, error, light, currentAlbum} = props;

	if (error) {
	return (
	  <p style={{minHeight: '100vh'}}>An error occured. Please try again later</p>
	);
	} else {
	return (
	  <Row style={{justifyContent: 'center', minHeight: '100vh'}}>
	    <ImageGrid loading={loading} data={data} light={light}/>
	    {currentAlbum === "All albums" && <Pagination // only does pagination when all albums are shown
	      activePage={currentPage}
	      itemsCountPerPage={18}
	      totalItemsCount={5000}
	      pageRangeDisplayed={5}
	      onChange={handlePageChange}
	      activeClass={light ? "page-item-light active" : "page-item-dark active"}
	      itemClass={light ? "page-item-light" : "page-item-dark"}
	      linkClass={light ? "page-link-light" : "page-link-dark"}
	    />}
	  </Row>
	);
	}
}

ImageBrowse.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    "albumId": PropTypes.number.isRequired,
    "id": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "thumbnailUrl": PropTypes.string.isRequired
  })),
	loading: PropTypes.bool.isRequired,
	currentPage: PropTypes.number.isRequired,
	error: PropTypes.bool.isRequired,
  light: PropTypes.bool.isRequired,
  currentAlbum: PropTypes.string.isRequired,
};