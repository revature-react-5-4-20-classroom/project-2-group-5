//will use subscriptionById and postsById
import React from "react";
import { PostById } from "./postsById";

export class Subscription extends React.Component<any, any> {

getAllSubscription=()=>{

}

  render() {
    return (
      <div className="center">
          {/* pass user ingormation as props */}
       <PostById  ></PostById>
      </div>
    );
  }
}
