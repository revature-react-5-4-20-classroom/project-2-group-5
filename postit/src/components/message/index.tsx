import React from 'react';
import './style.css';
import pic from '../../img/profileplaceholder.jpg';
import { Col, Row, Card, CardBody, CardText } from 'reactstrap';

export class MessageRow extends React.Component<any, any> {
  render() {
    return (
      <>
        {/* {(this.props.message.author === this.props.currUser)? right-justified card : left-justified card} */}
        <Row>
          <Col xs={8}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col xs={4}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
                <Col className='message-column' xs={8}>
                  <CardText>
                    Hey, this is a fake message that I'm sending. Do you see it?
                  </CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
