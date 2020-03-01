import React from 'react';
import PropTypes from 'prop-types';

import ImageBrowse from './ImageBrowse.js';
import AlbumBrowse from './AlbumBrowse.js';
import '../styles/Pagination.css';

export default class Gallery extends React.Component {
	componentDidMount() {
		// set viewmode when directly visits specific album
		const {setViewingMode, showingDataType, location, match} = this.props;
		if (location.pathname.includes("/albums/") && match.params.id) {
			setViewingMode("albumPhotos");
		}
	}

	componentDidUpdate(prevProps) {
		const {setViewingMode, showingDataType, location} = this.props;

		if (showingDataType !== prevProps.showingDataType) {
			setViewingMode(showingDataType);
		} else if (location.pathname === '/albums') {
			setViewingMode("albums");
		}
	}

  render(){
    const {
    	showingDataType, 
    	photosData, 
    	albumsData,
    	albumId,
    	currentAlbum,
    	currentAlbumName, 
    	setCurrentAlbum,
    	setCurrentAlbumName,
    	setPhotosData, 
    	setAlbumsData, 
    	light,
    	location,
    	match,
    } = this.props;

    if (showingDataType === "albums") {
	    return(
	    	<AlbumBrowse 
	    		showingDataType={showingDataType}
	    		albumsData={albumsData}
	    		setAlbumsData={setAlbumsData}
	    		setCurrentAlbum={setCurrentAlbum}
	    		setCurrentAlbumName={setCurrentAlbumName}
	    		light={light}
	    	/>
	    );
    } else {
	    return(
	    	<ImageBrowse 
	    		albumId={albumId}
	    		showingDataType={showingDataType}
	    		photosData={photosData}
	    		setPhotosData={setPhotosData}
	    		light={light} 
	    		currentAlbum={currentAlbum} 
	    		currentAlbumName={currentAlbumName}
	    		setCurrentAlbum={setCurrentAlbum}
	    		setCurrentAlbumName={setCurrentAlbumName}
	    		location={location}
	    		match={match}
	    	/>
	    );
    }
  }
}

Gallery.propTypes = {
  light: PropTypes.bool.isRequired,
  currentAlbum: PropTypes.string.isRequired,
};