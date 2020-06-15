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

export class SubscriberCard extends React.Component<any, any> {
  render() {
    return (
      <Card className='subscriber-card'>
        <Row className='card-row'>
          <Col xs={4}>
            <CardBody>
              <img
                className='profile-pic'
                width='65%'
                alt='Card image cap'
                src={pic}
              />
              <CardText>UserName</CardText>
            </CardBody>
          </Col>
          <Col className='button-column' xs={8}>
            <Button color='danger' className='remove-button'>
              Block
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}
