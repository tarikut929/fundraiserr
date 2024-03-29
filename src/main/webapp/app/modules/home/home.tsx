import './home.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert, Card, Button } from 'reactstrap';
import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const name = 1;

  const [Users, fetchUsers] = useState([]);
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        fetchUsers(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const cardInfo = [
    {
      image: 'content/images/help.jpg',
      title: 'Help father and his 20-year old son, Father-Kidney transplant, Son- Bone marrow transplant. Please save the family',
      message: 'raised by: John B',
    },
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
      <div className="card text-center display" style={{ width: '24rem', height: '27rem' }} key={index}>
        <img src="content/images/help.jpg" alt="donem" />
        <div className="card-body">
          <div>
            <h4 className="card-title display-title">{card.name}</h4>
          </div>
        </div>
        <div>
          <div>
            <h6>By: {card.name}</h6>
          </div>
          <Button
            color="primary"
            className="mt-2 ml-4"
            tag={Link}
            to="/project_detail"
            // onClick={onclick.bind(showIt(card.name))}
          >
            Show Detail
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Row className="pad">
        <div className="mt-3"></div>
        <span className="hipster rounded">
          <div className="container mt-5">
            <div className="row mt-5">
              <div className="col-sm white text-center">
                <h4>Need Funds to Pay For a Medical Emergency or Social Cause?</h4>
              </div>

              <div className="col-sm"></div>
            </div>
            <div className="row">
              <div className="col-sm text-center align-text-bottom">
                <a href="" className="btn btn-primary">
                  <h5>Contribute</h5>
                </a>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
        </span>
      </Row>
      <Row>
        <div className="container  row d-flex align-items-center justify-content-center">{Users.map(renderCard)}</div>

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

export default Home;
function showIt(id: any) {
  localStorage.setItem('id', id);
  console.warn('nnnnfffffffffffd' + id);
}
