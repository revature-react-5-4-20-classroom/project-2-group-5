import React from "react";
import { getAllPosts } from "../../../apis/posts";
import img from "./1.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Table,
  Spinner,
} from "reactstrap";
import { PostContainer } from "../../postsContainer";
// User's logged in homepage.  Will need subscPosts container and newestPosts container

export class Home extends React.Component<any, any> {
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
    return (
      <>
        {this.state.data ? (
          <PostContainer postObject={this.state.response}></PostContainer>
        ) : (
          <Spinner></Spinner>
        )}
      </>
    );
  }
}
