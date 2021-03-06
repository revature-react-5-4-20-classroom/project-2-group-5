import React from 'react';
import './style.css';
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap';
import somePic from '../../img/profileplaceholder.jpg';
import { Subscription } from '../../models/subscription';
import { Link } from 'react-router-dom';

interface ISubscriberCardProps {
  subscription: Subscription;
  type: string;
  blockUser: ((subs: Subscription) => void) | null;
  unblockUser: ((subs: Subscription) => void) | null;
  unsubscribe: ((subs: Subscription) => void) | null;
}

export class SubscriberCard extends React.Component<ISubscriberCardProps, any> {
  constructor(props: ISubscriberCardProps) {
    super(props);
  }

  block = async (e: any) => {
    e.preventDefault();
    this.props.blockUser!(this.props.subscription);
  };

  unblock = async (e: any) => {
    e.preventDefault();
    this.props.unblockUser!(this.props.subscription);
  };

  unsub = async (e: any) => {
    e.preventDefault();
    this.props.unsubscribe!(this.props.subscription);
  };

  render() {
    return (
      <>
        {this.props.unsubscribe !== null ? (
          // ---------------------SUBSCRIBERS PAGE -------------------------------
          [
            this.props.type === 'subscribee' ? (
              // SUBSCRIBERS CARD
              <Card className='subscriber-card'>
                <Row className='card-row'>
                  <Col xs={4}>
                    <CardBody>
                      <Link
                        to={`/profile/redirect/${this.props.subscription.subscriberId}`}
                      >
                        <img
                          className='profile-pic'
                          width='65%'
                          alt='Card image cap'
                          src={`http://18.191.138.4:8081/pics/${this.props.subscription.subscriberId}`}
                        />
                      </Link>
                      <CardText>
                        {this.props.subscription.subscriberName}
                      </CardText>
                    </CardBody>
                  </Col>
                  <Col className='button-column' xs={8}>
                    {this.props.unblockUser !== null ? (
                      [
                        this.props.subscription.blocked ? (
                          <Button
                            color='warning'
                            data-id={this.props.subscription.subscriberId}
                            className='unsub-button'
                            onClick={this.unblock}
                          >
                            <span className='button-text'>Unblock</span>
                          </Button>
                        ) : (
                          <Button
                            color='danger'
                            data-id={this.props.subscription.subscriberId}
                            className='unsub-button'
                            onClick={this.block}
                          >
                            <span className='button-text'>Block</span>
                          </Button>
                        ),
                      ]
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Card>
            ) : (
              // SUBSCRIBEES CARD
              <Card className='subscriber-card'>
                <Row className='card-row'>
                  <Col xs={4}>
                    <CardBody>
                      <Link
                        to={`/profile/redirect/${this.props.subscription.subscribeeId}`}
                      >
                        <img
                          className='profile-pic'
                          width='65%'
                          alt='Card image cap'
                          src={`http://18.191.138.4:8081/pics/${this.props.subscription.subscribeeId}`}
                        />
                      </Link>
                      <CardText>
                        {this.props.subscription.subscribeeName}
                      </CardText>
                    </CardBody>
                  </Col>
                  <Col className='button-column' xs={8}>
                    {this.props.unsubscribe !== null ? (
                      <Button
                        color='danger'
                        data-id={this.props.subscription.subscriberId}
                        className='unsub-button'
                        onClick={this.unsub}
                      >
                        <span className='button-text'>Unsubscribe</span>
                      </Button>
                    ) : (
                      <> </>
                    )}
                  </Col>
                </Row>
              </Card>
            ),
          ]
        ) : (
          //----------------------PROFILE PAGE--------------------
          <Card className='profile-sub-card'>
            <Row className='profile-card-row'>
              <Col xs={12}>
                <CardBody>
                  <Row>
                    <Col className='center-div' xs={6}>
                      <Link
                        to={`/profile/redirect/${this.props.subscription.subscriberId}`}
                      >
                        <img
                          className='profile-pic'
                          width='65%'
                          alt='Card image cap'
                          src={`http://18.191.138.4:8081/pics/${this.props.subscription.subscriberId}`}
                        />
                      </Link>
                    </Col>
                    <Col className='left-div' xs={6}>
                      <CardText>
                        <strong>
                          {this.props.subscription.subscriberName}
                        </strong>
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Col>
            </Row>
          </Card>
        )}
      </>
    );
  }
}
