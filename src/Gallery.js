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

export default class Gallery extends React.Component {
  state = {
    data: [],
    currentPage: 1,
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updateData(1);
  }

  handlePageChange = (selectedPage) => {
    this.setState({currentPage: selectedPage, loading: true}, this.updateData(selectedPage));
  }

  updateData = (pageNum) => {
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

    return (
      <Switch>
        <Route path="/photos/:id" render={(props) => <ImageDetails data={data} {...props} /> }/>
        <Route path="/photos" children={<this.ImageBrowse/>} />
        <Route path="*" children={<NotFound/>}/>
      </Switch>
    );
  }

  ImageBrowse = () => {
    const {data, loading, currentPage, error} = this.state;

    if (error) {
      return (
        <p>An error occured. Please try again later</p>
      );
    } else {
      return (
        <Row style={{justifyContent: 'center'}}>
          <ImageGrid loading={loading} data={data}/>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={18}
            totalItemsCount={5000}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            activeClass="page-item active"
            itemClass="page-item"
            linkClass="page-link"
          />
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