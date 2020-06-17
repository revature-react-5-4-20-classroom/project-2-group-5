import React from 'react';
import './style.css';
import {
  Card,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  FormGroup,
  Form,
  Label,
} from 'reactstrap';

export class CreateMessageForm extends React.Component<any, any> {
  render() {
    return (
      <Card className='search-users-card'>
        <h3>Search for User to Message</h3>
        <Form className='center'>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <InputGroup className='search-users-input'>
              <Input placeholder='Search by Username' />
              <InputGroupAddon addonType='append'>
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </Card>
    );
  }
}
