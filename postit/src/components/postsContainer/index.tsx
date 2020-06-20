import React from 'react';
import { Post } from '../../models/post';
import img from './1.png';
import {
  Container,
  Row,
  Card,
  Col,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  CardText,
} from 'reactstrap';
import { getAllCommentsByPostId } from '../../apis/comments';
import { Comments } from '../comments';
import { PostComponent } from '../post';
import './style.css';

// import { Commnets } from "";
// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

interface IPostContainerProps {
  posts: Post[];
}

export class PostContainer extends React.Component<IPostContainerProps, any> {
  constructor(props: IPostContainerProps) {
    super(props);
    this.state = {
      postId: '',
      cFlag: false,
    };
  }
  componentDidMount = async () => {
    // await getPostsById(this.props.userId);
  };

  showComment = async (id: number) => {
    this.setState({
      postId: id,
      cFlag: this.state.cFlag ? false : true,
    });
  };

  render() {
    return (
      <div className='posts-container'>
        {this.props.posts.map((p) => {
          return <PostComponent key={p.postId} post={p} />;
        })}
      </div>
    );
  }
}
