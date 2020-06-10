//will use postById
import React from "react";
import { PostById } from "./postsById";
import {UserProfile} from "./userProfile"

export class Search extends React.Component<any, any> {

getUserById=()=>{

}

  render() {
    return (
      <div className="center">
        {/* will pss user id as a props */}
        <UserProfile ></UserProfile>
       
      </div>
    );
  }
}
