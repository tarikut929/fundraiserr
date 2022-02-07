import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './fundauthor.reducer';
import { IFundauthor } from 'app/shared/model/fundauthor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const FundauthorUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const fundauthorEntity = useAppSelector(state => state.fundauthor.entity);
  const loading = useAppSelector(state => state.fundauthor.loading);
  const updating = useAppSelector(state => state.fundauthor.updating);
  const updateSuccess = useAppSelector(state => state.fundauthor.updateSuccess);
  const handleClose = () => {
    props.history.push('/fundauthor');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fundauthorEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...fundauthorEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fundraiseApp.fundauthor.home.createOrEditLabel" data-cy="FundauthorCreateUpdateHeading">
            <Translate contentKey="fundraiseApp.fundauthor.home.createOrEditLabel">Create or edit a Fundauthor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="fundauthor-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fundraiseApp.fundauthor.name')}
                id="fundauthor-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('fundraiseApp.fundauthor.username')}
                id="fundauthor-username"
                name="username"
                data-cy="username"
                type="text"
              />
              <ValidatedField
                label={translate('fundraiseApp.fundauthor.password')}
                id="fundauthor-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <ValidatedField
                label={translate('fundraiseApp.fundauthor.authorid')}
                id="fundauthor-authorid"
                name="authorid"
                data-cy="authorid"
                type="text"
              />
              <ValidatedField
                label={translate('fundraiseApp.fundauthor.email')}
                id="fundauthor-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fundauthor" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FundauthorUpdate;
