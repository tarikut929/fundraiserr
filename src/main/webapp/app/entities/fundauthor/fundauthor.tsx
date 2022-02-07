import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './fundauthor.reducer';
import { IFundauthor } from 'app/shared/model/fundauthor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Fundauthor = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const fundauthorList = useAppSelector(state => state.fundauthor.entities);
  const loading = useAppSelector(state => state.fundauthor.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="fundauthor-heading" data-cy="FundauthorHeading">
        <Translate contentKey="fundraiseApp.fundauthor.home.title">Fundauthors</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="fundraiseApp.fundauthor.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="fundraiseApp.fundauthor.home.createLabel">Create new Fundauthor</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {fundauthorList && fundauthorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.username">Username</Translate>
                </th>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.authorid">Authorid</Translate>
                </th>
                <th>
                  <Translate contentKey="fundraiseApp.fundauthor.email">Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fundauthorList.map((fundauthor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${fundauthor.id}`} color="link" size="sm">
                      {fundauthor.id}
                    </Button>
                  </td>
                  <td>{fundauthor.name}</td>
                  <td>{fundauthor.username}</td>
                  <td>{fundauthor.password}</td>
                  <td>{fundauthor.authorid}</td>
                  <td>{fundauthor.email}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fundauthor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fundauthor.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fundauthor.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="fundraiseApp.fundauthor.home.notFound">No Fundauthors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Fundauthor;
