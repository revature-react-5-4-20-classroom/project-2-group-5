import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { PostContainer } from '../../postsContainer';
import { Post } from '../../../models/post';
import { getAllPosts, getAllSubscibersPosts } from '../../../apis/posts';
import { UserState } from '../../../redux/user/userReducer';
import { connect } from 'react-redux';
import './style.css';

interface IHomeState {
  response: Post[];
  data: boolean;
  allPosts: Post[];
  subPosts: Post[];
  shouldUpdate: boolean;
}

export class HomeComponent extends React.Component<any, IHomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: [],
      data: false,
      allPosts: [],
      subPosts: [],
      shouldUpdate: false,
    };
  }

  componentDidMount = async () => {
    this.getNewPosts();
    this.getSubPosts();
  };

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   if (this.state.shouldUpdate) {
  //     this.setState({
  //       shouldUpdate: false,
  //     });
  //     this.getNewPosts();
  //     this.getSubPosts();
  //     return true;
  //   }
  //   return this.props !== nextProps || this.state !== nextState;
  // }

  getNewPosts = async () => {
    let postsArr = await getAllPosts();
    let start = postsArr.length - 4;
    let end = postsArr.length;
    console.log('new posts', postsArr);
    this.setState({
      allPosts: postsArr.slice(start, end),
      shouldUpdate: true,
    });
    // this.shouldComponentUpdate(this.props, this.state);
  };

  getSubPosts = async () => {
    let userid = this.props.currUser.userId;
    let postsArr = await getAllSubscibersPosts(userid);
    let start = postsArr.length - 4;
    let end = postsArr.length;
    this.setState({
      subPosts: postsArr.slice(start, end),
      shouldUpdate: true,
    });
    // this.shouldComponentUpdate(this.props, this.state);
  };

  render() {
    console.log('from home this.props: ', this.props && this.props);
    return (
      <Container className='main-container'>
        <Row className='title-row h-5'>
          <Col xs={12}>
            <h3>Subscribers</h3>
          </Col>
        </Row>
        <Row className='h-45'>
          <Col xs={8} className='offset-2 center-div'>
            {this.state.subPosts ? (
              <PostContainer posts={this.state.subPosts}></PostContainer>
            ) : (
              <h3>No one you're subscribed to is posting!</h3>
            )}
          </Col>
        </Row>
        <Row className='title-row h-5'>
          <Col xs={12}>
            <h3>Subscribers</h3>
          </Col>
        </Row>
        <Row className='h-45'>
          <Col xs={8} className='offset-2 center-div'>
            {this.state.subPosts ? (
              <PostContainer posts={this.state.allPosts}></PostContainer>
            ) : (
              <h3>No one you're subscribed to is posting!</h3>
            )}
          </Col>
        </Row>
      </Container>
      // <> old container
      //   {this.state.data ? (
      //     <PostContainer posts={this.state.response}></PostContainer>
      //   ) : (
      //     <Spinner></Spinner>
      //   )}
      //   <CreatePostForm/>
      // </>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const Home = connect(mapStateToProps)(HomeComponent);
