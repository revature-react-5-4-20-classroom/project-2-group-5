import React from 'react';
import './style.css';
import pic from '../../img/profileplaceholder.jpg';
import { Col, Row, Card, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

export class MessageRow extends React.Component<any, any> {
  render() {
    return (
      <>
        {this.props.sent ? (
          <Row>
            <Col xs={12}>
              <Card className='message-card'>
                <Row className='card-row'>
                  <Col xs={2}>
                    <CardBody>
                      <Link to={`/profile/${this.props.message.author}`}>
                        <img
                          className='profile-pic'
                          width='65%'
                          alt='Card image cap'
                          src={pic /* this.props.user.pic */}
                        />
                      </Link>
                    </CardBody>
                  </Col>
                  <Col className='message-column' xs={10}>
                    <CardText className='left-justified'>
                      {this.props.message.content}
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12}>
              <Card className='message-card'>
                <Row className='card-row'>
                  <Col className='message-column' xs={10}>
                    <CardText className='right-justified'>
                      {this.props.message.content}
                    </CardText>
                  </Col>
                  <Col xs={2}>
                    <CardBody>
                      <Link to={`/profile/${this.props.message.author}`}>
                        <img
                          className='profile-pic'
                          width='65%'
                          alt='Card image cap'
                          src={pic /* this.props.user.pic */}
                        />
                      </Link>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
  }
}
