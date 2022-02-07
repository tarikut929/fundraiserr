import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Fundraise</Translate>
    </span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
export const Project = () => (
  <NavItem>
    <NavLink tag={Link} to="/project" className="d-flex align-items-center">
      <span>
        <Translate contentKey="global.menu.project">Project</Translate>
      </span>
    </NavLink>
  </NavItem>
);
export const Search = () => (
  <NavItem>
    <NavLink tag={Link} to="/project" className="d-flex align-items-center">
      <span>
        <FontAwesomeIcon icon="search" />
      </span>
    </NavLink>
  </NavItem>
);
