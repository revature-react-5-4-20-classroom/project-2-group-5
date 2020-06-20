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
        {this.props.type === 'subscribee' ? (
          <Card className='subscriber-card'>
            <Row className='card-row'>
              <Col xs={4}>
                <CardBody>
                  <Link to={`/profile/${this.props.subscription.subscriberId}`}>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={somePic}
                    />
                  </Link>
                  <CardText>{this.props.subscription.subscriberName}</CardText>
                </CardBody>
              </Col>
              <Col className='button-column' xs={8}>
                {this.props.unblockUser !== null ? (
                  [
                    this.props.subscription.blocked ? (
                      <Button
                        color='danger'
                        data-id={this.props.subscription.subscriberId}
                        className='remove-button'
                        onClick={this.unblock}
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        color='danger'
                        data-id={this.props.subscription.subscriberId}
                        className='remove-button'
                        onClick={this.block}
                      >
                        Block
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
          <Card className='subscriber-card'>
            <Row className='card-row'>
              <Col xs={4}>
                <CardBody>
                  <Link to={`/profile/${this.props.subscription.subscribeeId}`}>
                    <img
                      className='profile-pic'
                      width='65%'
                      alt='Card image cap'
                      src={somePic}
                    />
                  </Link>
                  <CardText>{this.props.subscription.subscribeeName}</CardText>
                </CardBody>
              </Col>
              <Col className='button-column' xs={8}>
                {this.props.unsubscribe !== null ? (
                  <Button
                    color='danger'
                    data-id={this.props.subscription.subscriberId}
                    className='remove-button'
                    onClick={this.unsub}
                  >
                    Unsubscribe
                  </Button>
                ) : (
                  <> </>
                )}
              </Col>
            </Row>
          </Card>
        )}
      </>
    );
  }
}
