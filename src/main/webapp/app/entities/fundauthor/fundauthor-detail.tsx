import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './fundauthor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import axios from 'axios';

export const FundauthorDetail = (props: RouteComponentProps<{ id: string }>) => {
  showit();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  showit();

  const fundauthorEntity = useAppSelector(state => state.fundauthor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fundauthorDetailsHeading">
          <Translate contentKey="fundraiseApp.fundauthor.detail.title">Fundauthor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="fundraiseApp.fundauthor.name">Name</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.name}</dd>
          <dt>
            <span id="username">
              <Translate contentKey="fundraiseApp.fundauthor.username">Username</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.username}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="fundraiseApp.fundauthor.password">Password</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.password}</dd>
          <dt>
            <span id="authorid">
              <Translate contentKey="fundraiseApp.fundauthor.authorid">Authorid</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.authorid}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="fundraiseApp.fundauthor.email">Email</Translate>
            </span>
          </dt>
          <dd>{fundauthorEntity.email}</dd>
        </dl>
        <Button tag={Link} to="/fundauthor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fundauthor/${fundauthorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FundauthorDetail;
async function showit() {
  await axios.get('http://localhost:8080/api/fundauthor').then(response => {
    console.warn(response.data + 'kkkkkkkkkkkkk');
    console.warn('dddddddd');

    globalThis.showModal = response.data;
  });
}
