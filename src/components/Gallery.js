import React from 'react';
import Row from 'react-bootstrap/Row';
import Pagination from "react-js-pagination";
import {
  BrowserRouter as Router,
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
    this.updateGalleryPage(1);
  }

  componentDidUpdate(prevProps) {
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
    const {data} = this.state;
    const {light} = this.props;

    return (
      <Switch>
        <Route path="/:id" render={(props) => <ImageDetails data={data} light={light} {...props} /> }/>
        <Route path="/" children={<this.ImageBrowse/>} />
        <Route path="*" children={<NotFound/>}/>
      </Switch>
    );
  }

  ImageBrowse = () => {
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
          {currentAlbum === "All albums" && <Pagination
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