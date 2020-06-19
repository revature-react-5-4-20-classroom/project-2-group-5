import React from 'react';
import {
  Card,
  Row,
  Col,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';
import { Comments } from '../comments';
import './style.css';
import img from './1.png';
import { Post } from '../../models/post';

// Component that gives stucture to every post.  Will have profile pic {conditionally rendered},
//  username, post title {conditionally rendered}, post/comment content, and total # of replies {condi-
// tionally rendered}.  This will end up going into the home page's subscirptions and discover containers

interface IPostComponentProps {
  post: Post;
}

export class PostComponent extends React.Component<IPostComponentProps, any> {
  constructor(props: IPostComponentProps) {
    super(props);
    this.state = {
      cFlag: false,
    };
  }

  showComment = async (id: number) => {
    this.setState({
      cFlag: this.state.cFlag ? false : true,
    });
  };

  render() {
    return (
      <Card className='card mb-3 post-card'>
        {/* <div key={`pKey${obj.postId}`}> */}
        <Row className=''>
          <Col md={4}>
            <img src={img} alt='profile pic' className='profile-pic' />
          </Col>
          <Col md={8}>
            <CardBody className=''>
              {/* //need to change post class in models because backend sends whole user object */}
              <CardTitle>{this.props.post.title}</CardTitle>
              <CardText>{this.props.post.content}</CardText>
              <CardText className='card-text'>
                <small className=''>
                  <Button
                    onClick={(e) => {
                      this.showComment(this.props.post.postId);
                    }}
                  >
                    Comment
                  </Button>
                </small>
              </CardText>
              <Card>
                {this.state.cFlag &&
                this.props.post.postId == this.props.post.postId ? (
                  <Comments postId={this.props.post.postId} />
                ) : (
                  <></>
                )}
              </Card>
            </CardBody>
          </Col>
        </Row>
        {/* </div> */}
      </Card>
    );
  }
}
