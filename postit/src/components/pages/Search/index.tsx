import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Search } from '../../searchUserPostsForm';
import { getUsersLikeUsername } from '../../../apis/user';
import { User } from '../../../models/user';
import { Post } from '../../../models/post';
import { getPostsByUserId } from '../../../apis/posts';
import { PostContainer } from '../../postsContainer';

interface ISearchPageState{
  searchedUsername: String;
  searchResults: Post[];
}

export class SearchPage extends React.Component<any, ISearchPageState> {
  constructor(props: any){
    super(props);
    this.state = {
      searchedUsername: '',
      searchResults: []
    }
  }

  setSearchedUsername(username : String){
    this.setState({searchedUsername: username});
  }

  getSearchedUsername(): String{
    return this.state.searchedUsername
  }

  async search(){
    if(this.state.searchedUsername != ""){
      let results: User[] = await getUsersLikeUsername(this.state.searchedUsername);
      let posts: Post[] = [];
      this.setState({searchResults: []});
      results.forEach(async (element) => {
        let morePosts: Post[] = await getPostsByUserId(element.userId);
        posts = [...posts, ...morePosts];
        this.setState({searchResults: posts});
      });
    }
    else{
      this.setState({searchResults: []});
    }
  }

  render() {
    return (
      <Container className='main-container' >
      <Row>
        <Col className='title-row message-panel' xs={4}>
          <Row>
            <Search setSearchedUsername={(username:String)=>{this.setSearchedUsername(username)}} getSearchedUsername={():String=>{return this.getSearchedUsername()}} search={()=>{this.search()}}/>
          </Row>
        </Col>

        <Col className='content-panel' xs={8}>
          <PostContainer posts={this.state.searchResults} />
        </Col>
      </Row>
    </Container>
    );
  }
}


//todo: 
//  set max height, and scrollable
//  ajust left column to be centered correctly
//  other things can be done if i discover why the submit function isnt awaiting properly, or add a new endpoint to make the multiple fetches redundant