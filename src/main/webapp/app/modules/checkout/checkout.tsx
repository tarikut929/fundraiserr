import './checkout.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
/*eslint-disable */

export class Checkout extends React.Component<{}, { [key: string]: string }> {
  constructor(props) {
    super(props);
    localStorage.clear();
    this.state = this.initialState;
  }

  initialState = {
    amount: localStorage.getItem(''),
    name: localStorage.getItem(''),
    email: localStorage.getItem(''),
    phone: localStorage.getItem(''),
    currency: 'usd',
  };

  addAmount(evt) {
    const val = evt.target.value;
    this.setState({ amount: val });
  }
  getAmount() {
    return this.state.amount;
  }
  addName(evt) {
    const val = evt.target.value;
    this.setState({ name: val });
  }
  getName() {
    return this.state.name;
  }
  addEmail(evt) {
    const val = evt.target.value;
    this.setState({ email: val });
  }
  getEmail() {
    return this.state.email;
  }
  addPhone(evt) {
    const val = evt.target.value;
    this.setState({ phone: val });
  }
  getPhone() {
    return this.state.phone;
  }
  addCurrency(evt) {
    const val = evt.target.value;
    this.setState({ currency: val });
  }
  getCurrency() {
    return this.state.currency;
  }

  render(): React.ReactNode {
    return (
      <Row>
        <div className="ml-3 border=0">
          <div className="pl-3 card internal border-1">
            <div className="text-center col-12">
              <h3>Choose a donation amount</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <form action="#">
                      <select
                        name="languages"
                        id="lang"
                        className="btn btn-primary"
                        value={this.state.currency}
                        onChange={evt => {
                          this.addCurrency(evt);
                        }}
                      >
                        <option value="usd">USD</option>
                        <option value="inr">INR</option>
                        <option value="euro">EURO</option>
                      </select>
                      <br />
                      <br />
                      <br />
                      <h6>Name:</h6>
                      <br />
                      <h6>Email:</h6>
                      <br />
                      <h6>Phone:</h6>
                    </form>
                  </div>
                  <div className="col-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="234"
                      onBlur={evt => {
                        this.addAmount(evt);
                      }}
                      value={this.state.amount}
                      onChange={evt => this.addAmount(evt)}
                      name="amount"
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jhon R"
                      onBlur={evt => {
                        this.addName(evt);
                      }}
                      value={this.state.name}
                      onChange={evt => this.addName(evt)}
                      name="name"
                    />
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      onBlur={evt => {
                        this.addEmail(evt);
                      }}
                      value={this.state.email}
                      onChange={evt => this.addEmail(evt)}
                      name="email"
                    />
                    <br />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="08765"
                      onBlur={evt => {
                        this.addPhone(evt);
                      }}
                      value={this.state.phone}
                      onChange={evt => this.addPhone(evt)}
                      name="amount"
                    />
                  </div>
                </div>
                <div>
                  <br />
                  <button className="btn btn-primary donateButton">Donate</button>
                </div>
              </div>
            </div>
            <div className="ml-2  row d-flex align-items-center justify-content-center"></div>
          </div>
        </div>
      </Row>
    );
  }
}

export default Checkout;
