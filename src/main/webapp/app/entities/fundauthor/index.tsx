import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fundauthor from './fundauthor';
import FundauthorDetail from './fundauthor-detail';
import FundauthorUpdate from './fundauthor-update';
import FundauthorDeleteDialog from './fundauthor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FundauthorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FundauthorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundauthorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fundauthor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FundauthorDeleteDialog} />
  </>
);

export default Routes;
