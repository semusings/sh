import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './shopping-cart.reducer';

export const ShoppingCartDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const shoppingCartEntity = useAppSelector(state => state.shoppingCart.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shoppingCartDetailsHeading">Shopping Cart</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{shoppingCartEntity.id}</dd>
          <dt>
            <span id="placedDate">Placed Date</span>
          </dt>
          <dd>
            {shoppingCartEntity.placedDate ? (
              <TextFormat value={shoppingCartEntity.placedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{shoppingCartEntity.status}</dd>
          <dt>
            <span id="totalPrice">Total Price</span>
          </dt>
          <dd>{shoppingCartEntity.totalPrice}</dd>
          <dt>
            <span id="paymentMethod">Payment Method</span>
          </dt>
          <dd>{shoppingCartEntity.paymentMethod}</dd>
          <dt>
            <span id="paymentReference">Payment Reference</span>
          </dt>
          <dd>{shoppingCartEntity.paymentReference}</dd>
          <dt>Customer Details</dt>
          <dd>{shoppingCartEntity.customerDetails ? shoppingCartEntity.customerDetails.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/shopping-cart" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shopping-cart/${shoppingCartEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShoppingCartDetail;
