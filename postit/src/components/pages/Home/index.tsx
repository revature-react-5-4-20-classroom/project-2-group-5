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
} from "reactstrap";
// User's logged in homepage.  Will need subscPosts container and newestPosts container

export class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: [],
    };
  }
  componentDidMount = async () => {
    this.setState({
      response: await getAllPosts(),
    });
  };
  // getPosts = async () => {
  //   this.setState({
  //     response: await getAllPosts(),
  //   });
  // };

  render() {
    return (
      <div className="container ">
        <h3 className="left">Discover: </h3>
        <div className="card mb-3 ">
          {this.state.response.map((obj: any, index: number) => {
            return (
              <>
                <div className="row no-gutters">
                  <div className="col-md-2">
                    <img src={img} className="image" alt="profile pic"  />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body float-md-left">
                      {/* //need to change post class in models because backend sends whole user object */}
                      <h5 className="card-title">{obj.username}</h5>
                      <p className="card-text">{obj.content}</p>
                      <p className="card-text">
                        <small className="text-muted float-md-right">
                          check comments here
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="Hr" />
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
