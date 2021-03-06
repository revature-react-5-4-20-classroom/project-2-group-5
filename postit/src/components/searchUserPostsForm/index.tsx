//will use postById
import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Container that has Form with 'User Post Search' text or something,
// text seach box and 'search' button that does call to DB to find
// posts by author ordered by newest date

export class Search extends React.Component<any, any> {
  getUserById = () => {};

  setUsername = (un: any) => {
    this.props.setSearchedUsername(un.currentTarget.value);
  };

  search = async (event: any) => {
    event.preventDefault();
    this.props.search();
  };

  render() {
    return (
      <div className='center'>
        <h3>User Post Search</h3>
        <Form className='center' onSubmit={this.search}>
          <FormGroup>
            <Input
              onChange={this.setUsername}
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
            />
          </FormGroup>
          <FormGroup>
            <Button color='secondary'>Search</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
