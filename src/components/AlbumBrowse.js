import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Pagination from "react-js-pagination";

import ImageGrid from './ImageGrid.js';
import '../styles/Pagination.css';
import Loading from './Loading.js';

export default class AlbumBrowse extends React.Component {
	state = {
		currentPage: 1,
		loading: true,
		error: false,
	}

	componentDidMount() {
    this.updateAlbums(1);
  }

  handlePageChange = (selectedPage) => {
    this.setState({currentPage: selectedPage, loading: true}, this.updateAlbums(selectedPage));
  }

	updateAlbums = (pageNum) => {
		const {setAlbumsData} = this.props;
	  let url = new URL('https://jsonplaceholder.typicode.com/albums');
	  url.search = new URLSearchParams({
	      _page: pageNum,
	      _limit: 18
	  });

	  fetch(url)
	    .then(response => response.json())
	    .then(data => 
	      this.setState({
	        loading: false,
	      }, setAlbumsData(data))
	    )
	    .catch(error => this.setState({ error: true, loading: false }));
	}

	render() {
		const {showingDataType, albumsData, light, setCurrentAlbum, setCurrentAlbumName} = this.props;
		const {loading, error, currentPage} = this.state;

		if (error) {
			return (
			  <p style={{minHeight: '100vh'}}>An error occured. Please try again later</p>
			);
		} else if (loading) {
			return <Loading light={light}/>;
		} else {
			return (
			  <Row style={{justifyContent: 'center', minHeight: '100vh'}}>
			    <ImageGrid 
			    	showingDataType={showingDataType} 
			    	setCurrentAlbum={setCurrentAlbum} 
			    	setCurrentAlbumName={setCurrentAlbumName}
			    	data={albumsData} 
			    	light={light}
			    />
			    <Pagination // only does pagination when all albums are shown
			      activePage={currentPage}
			      itemsCountPerPage={18}
			      totalItemsCount={100}
			      pageRangeDisplayed={5}
			      onChange={this.handlePageChange}
			      activeClass={light ? "page-item-light active" : "page-item-dark active"}
			      itemClass={light ? "page-item-light" : "page-item-dark"}
			      linkClass={light ? "page-link-light" : "page-link-dark"}
			    />
			  </Row>
			);
		}
	}
}

AlbumBrowse.propTypes = {
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