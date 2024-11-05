import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCustomerDetails } from 'app/entities/customer-details/customer-details.reducer';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';
import { createEntity, getEntity, reset, updateEntity } from './shopping-cart.reducer';

export const ShoppingCartUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customerDetails = useAppSelector(state => state.customerDetails.entities);
  const shoppingCartEntity = useAppSelector(state => state.shoppingCart.entity);
  const loading = useAppSelector(state => state.shoppingCart.loading);
  const updating = useAppSelector(state => state.shoppingCart.updating);
  const updateSuccess = useAppSelector(state => state.shoppingCart.updateSuccess);
  const orderStatusValues = Object.keys(OrderStatus);
  const paymentMethodValues = Object.keys(PaymentMethod);

  const handleClose = () => {
    navigate('/shopping-cart');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCustomerDetails({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.placedDate = convertDateTimeToServer(values.placedDate);
    if (values.totalPrice !== undefined && typeof values.totalPrice !== 'number') {
      values.totalPrice = Number(values.totalPrice);
    }

    const entity = {
      ...shoppingCartEntity,
      ...values,
      customerDetails: customerDetails.find(it => it.id.toString() === values.customerDetails?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          placedDate: displayDefaultDateTime(),
        }
      : {
          status: 'COMPLETED',
          paymentMethod: 'CREDIT_CARD',
          ...shoppingCartEntity,
          placedDate: convertDateTimeFromServer(shoppingCartEntity.placedDate),
          customerDetails: shoppingCartEntity?.customerDetails?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="glowroottomcatApp.shoppingCart.home.createOrEditLabel" data-cy="ShoppingCartCreateUpdateHeading">
            Create or edit a Shopping Cart
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
                <ValidatedField name="id" required readOnly id="shopping-cart-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Placed Date"
                id="shopping-cart-placedDate"
                name="placedDate"
                data-cy="placedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Status" id="shopping-cart-status" name="status" data-cy="status" type="select">
                {orderStatusValues.map(orderStatus => (
                  <option value={orderStatus} key={orderStatus}>
                    {orderStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Total Price"
                id="shopping-cart-totalPrice"
                name="totalPrice"
                data-cy="totalPrice"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Payment Method"
                id="shopping-cart-paymentMethod"
                name="paymentMethod"
                data-cy="paymentMethod"
                type="select"
              >
                {paymentMethodValues.map(paymentMethod => (
                  <option value={paymentMethod} key={paymentMethod}>
                    {paymentMethod}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Payment Reference"
                id="shopping-cart-paymentReference"
                name="paymentReference"
                data-cy="paymentReference"
                type="text"
              />
              <ValidatedField
                id="shopping-cart-customerDetails"
                name="customerDetails"
                data-cy="customerDetails"
                label="Customer Details"
                type="select"
                required
              >
                <option value="" key="0" />
                {customerDetails
                  ? customerDetails.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shopping-cart" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingCartUpdate;
