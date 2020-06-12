import React from 'react';

// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

export class PostById extends React.Component<any, any> {
  componentDidMount = async () => {
    //await getPostsById(this.props.userId);
  };
  getPostsById = async () => {};

  render() {
    return <div className='center'></div>;
  }
}
