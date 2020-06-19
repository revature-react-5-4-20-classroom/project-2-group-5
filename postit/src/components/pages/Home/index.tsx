import React from 'react';
import { getAllPosts } from '../../../apis/posts';
import img from './1.png';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Table,
  Spinner,
} from 'reactstrap';
import { PostContainer } from '../../postsContainer';
import { Post } from '../../../models/post';
import { CreatePostForm } from '../../createPostForm';
// User's logged in homepage.  Will need subscPosts container and newestPosts container

interface IHomeState {
  response: Post[];
  data: boolean;
}

export class Home extends React.Component<any, IHomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: [],
      data: false,
    };
  }
  componentDidMount = async () => {
    try {
      this.setState({
        response: await getAllPosts(),
        data: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // getPosts = async () => {
  //   this.setState({
  //     response: await getAllPosts(),
  //   });
  // };

  render() {
    console.log('from home this.props: ', this.props && this.props);
    return (
      <>
        {this.state.data ? (
          <PostContainer posts={this.state.response}></PostContainer>
        ) : (
          <Spinner></Spinner>
        )}
        <CreatePostForm/>
      </>
    );
  }
}
