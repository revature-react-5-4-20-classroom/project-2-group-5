import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Search } from '../../searchUserPostsForm';
import { SearchPostsResults } from '../../searchPostsResults';


export class SearchPage extends React.Component<any, any> {
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

  search(){
    console.log(this.state.searchedUsername);
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
          <SearchPostsResults searchResults={this.state.searchResults}/>
        </Col>
      </Row>
    </Container>
    );
  }
}
