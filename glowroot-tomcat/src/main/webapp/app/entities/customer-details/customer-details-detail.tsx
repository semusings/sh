import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer-details.reducer';

export const CustomerDetailsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerDetailsEntity = useAppSelector(state => state.customerDetails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsDetailsHeading">Customer Details</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{customerDetailsEntity.id}</dd>
          <dt>
            <span id="gender">Gender</span>
          </dt>
          <dd>{customerDetailsEntity.gender}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{customerDetailsEntity.phone}</dd>
          <dt>
            <span id="addressLine1">Address Line 1</span>
          </dt>
          <dd>{customerDetailsEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">Address Line 2</span>
          </dt>
          <dd>{customerDetailsEntity.addressLine2}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{customerDetailsEntity.city}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{customerDetailsEntity.country}</dd>
          <dt>User</dt>
          <dd>{customerDetailsEntity.user ? customerDetailsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-details/${customerDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetailsDetail;
