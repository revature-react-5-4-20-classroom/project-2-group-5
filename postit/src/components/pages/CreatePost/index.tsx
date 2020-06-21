import React from 'react';
import { UserState } from '../../../redux/user/userReducer';
import { connect } from 'react-redux';
import { CreatePostForm } from '../../createPostForm';
import './style.css';
import { Container, Row, Col } from 'reactstrap';

export class CreatePostPageComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Container className='main-container'>
        <Row className='h-5'>
          <Col xs={12}>
            <h3 className='title-row'>Create a Post:</h3>
          </Col>
        </Row>
        <Row className='h-45'>
          <CreatePostForm />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const CreatePost = connect(mapStateToProps)(CreatePostPageComponent);
