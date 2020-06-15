import React from 'react';
import './style.css';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Row,
  Col,
} from 'reactstrap';
import pic from '../../img/profileplaceholder.jpg';

export class MessageListCard extends React.Component<any, any> {
  render() {
    return (
      <Card className='message-card'>
        <Row className='card-row'>
          <Col xs={4}>
            <CardBody>
              <img className='profile-pic' alt='Card image cap' src={pic} />
            </CardBody>
          </Col>
          <Col xs={8}>
            <h5 className='remove-button'>Username</h5>
          </Col>
        </Row>
      </Card>
    );
  }
}
