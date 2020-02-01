import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <Container>
      <p>Loading, please wait</p>
      <Spinner animation="border" role="status" className="mb-4">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}