import './project-detail.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';

export const ProjectDtail = () => {
  const id = localStorage.getItem('id');
  const [ProjectInfo, fetchProjectInfo] = useState([]);
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + id)
      .then(res => res.json())
      .then(res => {
        fetchProjectInfo(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const cardInfo = [
    {
      image: '',
      dd: 'Help Father And His 20-Year Old Son, Father-Kidney Transplant, Son- Bone Marrow Transplant. Please Save The Family',
      message: 'fdfdddfd',
    },
    { image: '', title: '', message: 'somdfddf' },
    {
      image: '',
      title:
        'I am raising funds for my cousin Anant and his father Mr. Bhaskar Chand on behalf of his mother. Anant is suffering from Aplastic anaemia in which body fails to produce enough blood cells and the only cure is Bone marrow transplant. His father is suffering from chronic kidney failure and needs urgent kidney transplant to survive, his wife is donating the kidney in order to save his life. ',
      message: 'fsdfsdfsd',
    },
    {
      image: '',
      title: 'In need of funds for medical treatment or know someone who might be? Share the details and Ketto will get in touch with. ',
      message: 'fdskfnkf',
    },
    { image: '', title: '', message: '' },
    { image: '', title: '', message: '' },
    { image: '', title: 'ddfsdffgfsf', message: '' },
  ];
  const account = useAppSelector(state => state.authentication.account);
  const user = useAppSelector(state => state.userManagement.user);
  const donated = 34;
  const max_needed = 45;
  const renderCard = (card, index) => {
    return (
      <div className="card shadow border-0 col-10">
        <img src={card.image} alt="" key={index} />
        <p style={{ fontSize: '23px' }} className="mt-1">
          {card.title}
        </p>
        <p className="mt-1">{card.name}</p>
      </div>
    );
  };

  return (
    <Row>
      <div className="row">
        <div className="col-8 card border-0">
          <div className="card text-center col-12">
            <img src="content/images/help.jpg" alt="donem" />
            <div className="card-body">
              <h5 className="card-title">
                <h3>Help Father And His 20-Year Old Son, Father-Kidney Transplant, Son- Bone Marrow Transplant. Please Save The Family</h3>
              </h5>
            </div>
            <h6>Ethiopia is greate</h6>
          </div>
          <div className="ml-2  row d-flex align-items-center justify-content-center">{cardInfo.map(renderCard)}</div>
        </div>
        <div className="col">
          <div className="card">
            <div className="mb-2">
              <div>
                <div className="row">
                  <div className="col">
                    <h5>212.0 $</h5>
                  </div>
                  <div className="col float-end">
                    {' '}
                    <h5 className="float-end" style={{ border: '1px solid green' }}>
                      1000.0$
                    </h5>
                  </div>
                </div>
                <ProgressBar variant="success" now={60} />
                <h4 className="mt-1">21 Supports</h4>
              </div>
            </div>
            <button className="btn btn-primary bt-l">
              <h4>Donate now</h4>
            </button>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default ProjectDtail;
