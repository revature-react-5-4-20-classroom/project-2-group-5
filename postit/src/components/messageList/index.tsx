import React from 'react';
import './style.css';
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
} from 'reactstrap';
import pic from '../../img/profileplaceholder.jpg';

export class MessageListCard extends React.Component<any, any> {
  selectUser = async (event: any) => {
    this.props.setSelectedUser(this.props.user);
  };

  render() {
    return (
      <Card className='message-card'>
        <Row className='card-row'>
          <Col xs={2}>
            <CardBody>
              <img
                className='profile-pic'
                alt='Card image cap'
                src={pic /* this.props.user.pic*/}
              />
            </CardBody>
          </Col>
          <Col xs={8}>
            <Button onClick={this.selectUser}>
              <h5 className='remove-button'>{this.props.user.username}</h5>
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}
