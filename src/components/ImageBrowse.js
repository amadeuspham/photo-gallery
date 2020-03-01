import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Pagination from "react-js-pagination";

import ImageGrid from './ImageGrid.js';
import '../styles/Pagination.css';
import Loading from './Loading.js';

export default class ImageBrowse extends React.Component {
	state = {
		currentPage: 1,
		loading: true,
		error: false,
	}

	componentDidMount(){
		const {currentAlbum, albumId, setCurrentAlbum} = this.props;
		const {currentPage} = this.state;

		if (currentAlbum === "All albums") {
			// visit album directly
			if (albumId && albumId !== currentAlbum) {
				// set album id to fetch images
				setCurrentAlbum(albumId);
				// set album name to change header
				this.getAlbumName(albumId);
			} else {
				this.updatePhotos(1);
			}
		} else {
			this.updateAlbumPhotos(currentAlbum, currentPage);
		}
	}

	componentDidUpdate(prevProps) {
		const {currentAlbum} = this.props;
		const {currentPage} = this.state;
		if (currentAlbum !== prevProps.currentAlbum && currentAlbum !== "All albums") {
			this.updateAlbumPhotos(currentAlbum, currentPage);
		}
		if (prevProps.location.pathname !== this.props.location.pathname) {
			const {id} = this.props.match.params;
			this.updateAlbumPhotos(id, currentPage);
			this.getAlbumName(id);
		}
		// if (prevProps.currentAlbumName !== currentAlbumName){
			
		// 	this.getAlbumName(currentAlbum);
		// }
	}

  getAlbumName = (currentAlbum) => {
  	console.log('getting name ' + currentAlbum)
  	const {setCurrentAlbumName} = this.props;
    // fetch all photos in an album and update state
    let url = new URL('https://jsonplaceholder.typicode.com/albums/' + currentAlbum);

    fetch(url)
      .then(response => response.json())
      .then(data => 
        setCurrentAlbumName(data.title)
      )
      .catch(error => setCurrentAlbumName("Album ID: " + currentAlbum));
  }

  updateAlbumPhotos = (currentAlbum, pageNum) => {
  	const {setPhotosData} = this.props;
    // fetch all photos in an album and update state
    let url = new URL('https://jsonplaceholder.typicode.com/photos');
    url.search = new URLSearchParams({
        albumId: currentAlbum,
        _page: pageNum,
        _limit: 18,
    });

    fetch(url)
      .then(response => response.json())
      .then(data => 
        this.setState({
          loading: false,
        }, setPhotosData(data))
      )
      .catch(error => {console.log(error); this.setState({ error: true, loading: false })});
  }

  updatePhotos = (pageNum) => {
  	const {setPhotosData} = this.props;
    // fetch all photos, pagination enabled. Each page only shows 18 photo max.
    let url = new URL('https://jsonplaceholder.typicode.com/photos');
    url.search = new URLSearchParams({
        _page: pageNum,
        _limit: 18
    });

    fetch(url)
      .then(response => response.json())
      .then(data => 
        this.setState({
          loading: false,
        }, setPhotosData(data))
      )
      .catch(error => this.setState({ error: true, loading: false }));
  }

  handlePageChange = (selectedPage, source) => {
  	const {currentAlbum} = this.props;
    this.setState(
    	{currentPage: selectedPage, loading: true}, 
    	() => {
    		if (source === 'all') {
    			this.updatePhotos(selectedPage)
    		} else if (source === 'album') {
    			this.updateAlbumPhotos(currentAlbum, selectedPage)
    		}	
    	}
    );
  }

	render() {
		const {photosData, light, currentAlbum, showingDataType} = this.props;
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
			    <ImageGrid showingDataType={showingDataType} data={photosData} light={light}/>
			    {currentAlbum === "All albums" ? (
				    <Pagination // only does pagination when all albums are shown
				      activePage={currentPage}
				      itemsCountPerPage={18}
				      totalItemsCount={5000}
				      pageRangeDisplayed={5}
				      onChange={(selectedPage) => this.handlePageChange(selectedPage, "all")}
				      activeClass={light ? "page-item-light active" : "page-item-dark active"}
				      itemClass={light ? "page-item-light" : "page-item-dark"}
				      linkClass={light ? "page-link-light" : "page-link-dark"}
				    />
			    ) : (
			    	<Pagination
				      activePage={currentPage}
				      itemsCountPerPage={18}
				      totalItemsCount={50}
				      pageRangeDisplayed={5}
				      onChange={(selectedPage) => this.handlePageChange(selectedPage, "album")}
				      activeClass={light ? "page-item-light active" : "page-item-dark active"}
				      itemClass={light ? "page-item-light" : "page-item-dark"}
				      linkClass={light ? "page-link-light" : "page-link-dark"}
			    	/>
			    )}
			  </Row>
			);
		}
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