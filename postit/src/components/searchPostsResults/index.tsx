import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams} from 'react-router';
import { Post } from '../../models/post';
import { PostContainer } from '../postsContainer';

interface ISearchPostsResultsProps{
    searchResults: Post[];
}

export class SearchPostsResults extends React.Component<ISearchPostsResultsProps, any> {

  render() {
    
    return (
        <Container className='main-container' style={{marginTop: 20,marginBottom: 60}}>
            <PostContainer posts={this.props.searchResults} />
        </Container>
    );
  }
}
