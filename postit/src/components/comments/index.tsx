import React from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Spinner,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { getAllCommentsByPostId, createComment } from '../../apis/comments';
import { UserState } from '../../redux/user/userReducer';
import { connect } from 'react-redux';
import { Comment } from '../../models/comment';
// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

class CommentsComponents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: 'any',
      cFlag: false,
      content: '',
      shouldUpdate: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.postId),
      cFlag: true,
    });
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (this.state.shouldUpdate) {
      this.setState({
        shouldUpdate: false,
      });
      this.getComment();
      console.log('comments updating.....');
      return true;
    }
    return this.props !== nextProps || this.state !== nextState;
  }

  newComment = async (e: any) => {
    e.preventDefault();
    const newComment = new Comment(
      0,
      this.props.postId,
      this.props.currUser.userId,
      this.state.content
    );
    this.setState({
      comment: await createComment(newComment),
      shouldUpdate: true,
    });
    this.shouldComponentUpdate(this.props, this.state);
  };

  getComment = async () => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.postId),
      cFlag: true,
    });
  };

  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.cFlag ? (
              <>
                {this.state.comments.length != 0 ? (
                  <ul>
                    {this.state.comments.map((obj: any, index: number) => {
                      return (
                        <li key={obj.commentId}>
                          <strong>{obj.username}</strong>: {obj.content}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <h5>No Comments yet. Be the first:</h5>
                )}
              </>
            ) : (
              <Spinner></Spinner>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div
              style={{ display: this.props.isAuthenticated ? 'block' : 'none' }}
            >
              <InputGroup>
                <Input
                  width='100%'
                  type='text'
                  placeholder='comment here'
                  name='content'
                  onChange={this.bindInputChangeToState}
                ></Input>
                <InputGroupAddon addonType='append'>
                  <Button onClick={this.newComment}>Post</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </Col>
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

export const Comments = connect(mapStateToProps)(CommentsComponents);
