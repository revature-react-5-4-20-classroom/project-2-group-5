//will use postById
import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { findByLabelText } from '@testing-library/react';

// Container that has Form with 'User Post Search' text or something,
// text seach box and 'search' button that does call to DB to find
// posts by author ordered by newest date

export class Search extends React.Component<any, any> {
  getUserById = () => {};

  setUsername = (un: any) => {
    this.props.setSearchedUsername(un.currentTarget.value);
  };

  search = async (event: any) => {
    this.props.search();
  };

  render() {
    return (
      <div className='center'>
        <h3>User Post Search</h3>
        <Form className='center'>
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
            <Button color='secondary' onClick={this.search}>
              Search
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
