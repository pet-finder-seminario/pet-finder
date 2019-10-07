import React from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import snakeCase from 'lodash/snakeCase';
import mapKeys from 'lodash/mapKeys';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import TopBar from './components/TopBar';

import { getTitle } from './constants';
import { propTypes } from './propTypes';
import { FlyerItemWrapper } from './components/styled';

const schema = Yup.object().shape({
  petName: Yup.string()
    .max(50, 'El máximo es 50 caracteres'),
});

const initialData = {
  breed: '',
  description: '',
  petName: '',
  petType: 1,
  flyerType: 1,
  latitude: Math.random() - 31,
  longitude: Math.random() - 63.5,
  createdBy: 'agustin.aliaga@fakeaddress.com',
  photoURL: 'https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg',
};

const FlyerItem = (props) => {
  const { mode } = props;
  const location = useLocation();
  const query = qs.parse(location.search);
  const title = getTitle(mode, query.type);

  const onSubmit = async values => {
    await axios.post('http://localhost:5000/api/v1/search_flyers', {
      ...mapKeys(values, (value, key) => snakeCase(key)),
    });
  };

  return (
    <>
      <TopBar {...props} />
      <Formik
        initialValues={initialData}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          isSubmitting,
          handleBlur,
          /* and other goodies */
        }) => (
          <FlyerItemWrapper>
            <form className="form" onSubmit={handleSubmit}>
              <h2>{title}</h2>
              <TextField
                name="petName"
                label="Nombre de la mascota"
                value={values.petName}
                onChange={handleChange}
                margin="normal"
                error={errors.petName}
                className="text-field"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="breed"
                label="Raza / Mestizo"
                value={values.breed}
                onChange={handleChange}
                margin="normal"
                error={errors.breed}
                className="text-field"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="description"
                label="Observaciones adicionales"
                value={values.description}
                onChange={handleChange}
                margin="normal"
                error={errors.description}
                className="text-field"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={5}
              />

              <button style={{ width: 300 }} type="submit">Submit</button>
            </form>
          </FlyerItemWrapper>
        )}
      </Formik>
    </>
  );
};

FlyerItem.propTypes = propTypes;

export default FlyerItem;
