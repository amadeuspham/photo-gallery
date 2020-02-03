import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Pagination from "react-js-pagination";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ImageGrid from './ImageGrid.js';
import ImageDetails from './ImageDetails.js';
import NotFound from './NotFound.js';
import '../styles/Pagination.css';

export default class Gallery extends React.Component {
  state = {
    data: [],
    currentPage: 1,
    loading: true,
    error: false,
  }

  componentDidMount() {
    // show the first page oof the gallery when app loaded
    this.updateGalleryPage(1);
  }

  componentDidUpdate(prevProps) {
    // if the user choose to see all photos in an album, update the gallery
    const {currentAlbum} = this.props;
    if (currentAlbum !== prevProps.currentAlbum) {
      if (currentAlbum === "All albums") {
        this.setState({loading: true}, this.updateGalleryPage(1));
      } else {
        this.setState({loading: true}, this.updateAlbumPhotos(currentAlbum));
      }
    }
  }

  updateAlbumPhotos = (currentAlbum) => {
    // fetch all photos in an album and update state
    let url = new URL('https://jsonplaceholder.typicode.com/photos');
    url.search = new URLSearchParams({
        albumId: currentAlbum
    });

    fetch(url)
      .then(response => response.json())
      .then(data => 
        this.setState({
          data: data,
          loading: false,
        })
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  handlePageChange = (selectedPage) => {
    this.setState({currentPage: selectedPage, loading: true}, this.updateGalleryPage(selectedPage));
  }

  updateGalleryPage = (pageNum) => {
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
          data: data,
          loading: false,
        })
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  ImageSwitch = () => {
    // describes which component will be rendered depending on the URL path
    // either the whole gallery view, a separate image view or a 404 page
    const {data} = this.state;
    const {light} = this.props;

    return (
      <Switch>
        <Route exact path="/:id" render={(props) => <ImageDetails data={data} light={light} {...props} /> }/>
        <Route exact path="/" children={<this.ImageBrowse/>} />
        <Route path="*" children={<NotFound/>}/>
      </Switch>
    );
  }

  ImageBrowse = () => {
    // the gallery view
    const {data, loading, currentPage, error} = this.state;
    const {light, currentAlbum} = this.props;

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
            onChange={this.handlePageChange}
            activeClass={light ? "page-item-light active" : "page-item-dark active"}
            itemClass={light ? "page-item-light" : "page-item-dark"}
            linkClass={light ? "page-link-light" : "page-link-dark"}
          />}
        </Row>
      );
    }
  }

  render(){
    return(
      <Router>
        <this.ImageSwitch/>
      </Router>
    );
  }
}

Gallery.propTypes = {
  light: PropTypes.bool.isRequired,
  currentAlbum: PropTypes.string.isRequired,
};