//will use subscriptionById and postsById
import React from 'react';
import { PostById } from '../../postsContainer';

// Page to display any user's profile "see wireframes"

export class UserProfile extends React.Component<any, any> {
  getUser = () => {};

  render() {
    return (
      <div className='center'>
        {/* pass user ingormation as props */}
        <PostById></PostById>
      </div>
    );
  }
}
