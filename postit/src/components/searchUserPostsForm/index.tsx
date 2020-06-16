//will use postById
import React from 'react';
import { PostContainer } from '../postsContainer';
import { UserProfile } from '../pages/Profile';

// Container that has Form with 'User Post Search' text or something,
// text seach box and 'search' button that does call to DB to find
// posts by author ordered by newest date

export class Search extends React.Component<any, any> {
  getUserById = () => {};

  render() {
    return (
      <div className='center'>
        {/* will pss user id as a props */}
        <UserProfile></UserProfile>
      </div>
    );
  }
}
