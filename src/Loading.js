import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function Loading(props) {
	const {light} = props;

  return (
    <Container>
      <p className={light ? "text-dark" : "text-light"}>Loading, please wait</p>
      <Spinner variant={light ? "dark" : "light"} animation="border" role="status" className="mb-4">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}