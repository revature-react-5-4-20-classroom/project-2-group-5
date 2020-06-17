import React from 'react';
import './style.css';
import pic from '../../img/profileplaceholder.jpg';
import { Col, Row, Card, CardBody, CardText } from 'reactstrap';

export class MessageRow extends React.Component<any, any> {
  render() {
    return (
      <>
        {/* {(this.props.message.author === this.props.currUser)? right-justified card : left-justified card} */}
        {/* This is the code for a left-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
                <Col className='message-column' xs={10}>
                  <CardText className='left-justified'>
                    Hey, this is a fake message that I'm sending. Do you see it?
                  </CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a right-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col className='message-column' xs={10}>
                  <CardText className='right-justified'>
                    Yes I do, good job lol
                  </CardText>
                </Col>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a left-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
                <Col className='message-column' xs={10}>
                  <CardText className='left-justified'>
                    Do you know what's going on in here? I want to write a
                    really long message to see what happens if the message goes
                    off the page. Because you know there are people out there
                    that like to write REAL long messages.
                  </CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a right-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col className='message-column' xs={10}>
                  <CardText className='right-justified'>Um, ok...</CardText>
                </Col>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a left-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
                <Col className='message-column' xs={10}>
                  <CardText className='left-justified'>
                    Gotta add some more messages
                  </CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a right-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col className='message-column' xs={10}>
                  <CardText className='right-justified'>k good luck</CardText>
                </Col>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* This is the code for a left-justified card */}
        <Row>
          <Col xs={12}>
            <Card className='message-card'>
              <Row className='card-row'>
                <Col xs={2}>
                  <CardBody>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={pic}
                    />
                  </CardBody>
                </Col>
                <Col className='message-column' xs={10}>
                  <CardText className='left-justified'>Thank you!</CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
