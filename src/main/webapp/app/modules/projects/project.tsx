import './project.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';

export const Project = () => {
  const cardInfo = [
    { image: 'content/images/help.jpg', title: 'tar', message: 'fdfdddfd' },
    { image: 'content/images/help.jpg', title: 'some', message: 'somdfddf' },
    { image: 'content/images/help.jpg', title: 'dogd', message: 'fsdfsdfsd' },
    { image: 'content/images/help.jpg', title: 'fosd ', message: 'fdskfnkf' },
    { image: 'content/images/help.jpg', title: 'ddfsdffgfsf', message: '' },
    { image: 'content/images/help.jpg', title: 'ddfsdffgfsf', message: '' },
    { image: 'content/images/help.jpg', title: 'ddfsdffgfsf', message: '' },
  ];
  const account = useAppSelector(state => state.authentication.account);
  const user = useAppSelector(state => state.userManagement.user);
  const renderCard = (card, index) => {
    return (
      <div className="card text-center" style={{ width: '24rem' }} key={index}>
        <img src={card.image} alt="donem" />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <a href="" className="btn btn-primary">
            show Detail
          </a>
        </div>
        <h6>{card.message}</h6>
      </div>
    );
  };

  return (
    <Row>
      <Row>
        <div className="container  row d-flex align-items-center justify-content-center">{cardInfo.map(renderCard)}</div>

        <h2>
          <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
        </h2>
        <p className="lead">
          <Translate contentKey="home.subtitle">This is your homepage</Translate>
        </p>
        {account?.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>

              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </div>
        )}
        <p>
          <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
        </p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.homepage">JHipster homepage</Translate>
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.stackoverflow">JHipster on Stack Overflow</Translate>
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.bugtracker">JHipster bug tracker</Translate>
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.chat">JHipster public chat room</Translate>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.follow">follow @jhipster on Twitter</Translate>
            </a>
          </li>
        </ul>

        <p>
          <Translate contentKey="home.like">If you like JHipster, do not forget to give us a star on</Translate>{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Row>
      <div></div>
    </Row>
  );
};

export default Project;
