import React from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { Post } from '../../models/post';
import { addNewPost } from '../../apis/posts';
import { UserState } from '../../redux/user/userReducer';
import { PostComponent } from '../post';
import { connect } from 'react-redux';
import './style.css';

// Component that has form to take in title and content

class CreatePostFormComponents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postId: 0,
      author: 0, //this.props.currentUser.userId,
      username: '', // this.props.currUser.Username,
      datePosted: 2020,
      title: '',
      content: '',
      response: '',
    };
  }

  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  submitPost = async (e: any) => {
    e.preventDefault();
    const newPost = new Post(
      0,
      this.props.currUser.userId,
      this.props.currUser.username,
      2020,
      // new Date().toISOString().substring(0, 10),
      this.state.title,
      this.state.content
    );
    this.setState({
      response: await addNewPost(newPost),
      title: '',
      content: '',
    });
  };

  render() {
    return (
      <Col xs={8} className='offset-2 center-div'>
        <div className='post-form-div'>
          <Row>
            <Col xs={12}>
              <Form className='container' onSubmit={this.submitPost}>
                <FormGroup>
                  <Label>Titile:</Label>
                  <Input
                    value={this.state.title}
                    name='title'
                    id='name'
                    placeholder='Title'
                    onChange={this.bindInputChangeToState}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>post:</Label>
                  <Input
                    type='textarea'
                    value={this.state.content}
                    placeholder='Post'
                    name='content'
                    id='content'
                    onChange={this.bindInputChangeToState}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Button color='secondary'>Submit</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          {/* ------------SHOULD ONLY APPEAR AFTER POSTING ---------- */}
          {this.state.response ? (
            <Row>
              <Col xs={12}>
                <Row className=''>
                  <Col xs={12}>
                    <h3 className='title-row'>Your Post has been created!</h3>
                  </Col>
                </Row>
                <Row className='center-div'>
                  <PostComponent post={this.state.response} />
                </Row>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </div>
      </Col>
    );
  }
}
const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const CreatePostForm = connect(mapStateToProps)(
  CreatePostFormComponents
);
