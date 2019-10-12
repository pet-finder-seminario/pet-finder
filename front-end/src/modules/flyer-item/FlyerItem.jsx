import React from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import compose from 'lodash/fp/compose';

import TopBar from './components/TopBar';

import { getTitle, getSubtitle, FLYER_TYPE } from './constants';
import { propTypes } from './propTypes';
import { FlyerItemWrapper } from './components/styled';
import { withContext } from '../common/context';
import { withAuthContext } from '../auth/authContext';

const schema = Yup.object().shape({
  petName: Yup.string()
    .max(50, 'El máximo es 50 caracteres'),
  breed: Yup.string().required('Este campo es requerido'),
  description: Yup.string().required('Este campo es requerido'),
});

const initialData = {
  breed: '',
  description: '',
  petName: '',
  petType: 1,
  flyerType: 1,
  latitude: Math.random() - 31,
  longitude: Math.random() - 63.5,
  createdBy: '',
  photoURL: 'https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg',
};

const FlyerItem = props => {
  const { mode } = props;
  const location = useLocation();
  const query = qs.parse(location.search);
  const formRef = React.createRef();

  const title = getTitle(mode, query.type);
  const subtitle = getSubtitle(mode, query.type);
  const history = useHistory();

  const onSubmit = async (val) => {
    const values = {
      ...val,
      createdBy: props.user.email,
      flyerType: FLYER_TYPE[query.type],
    };
    await props.postSearchFlyer(values);
    history.goBack();
  };

  return (
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
      }) => (
        <>
          <TopBar onActionClick={() => formRef.current.dispatchEvent(new Event('submit'))} {...props} />
          <FlyerItemWrapper>
            <form ref={formRef} className="form" onSubmit={handleSubmit}>
              <h2 className="title">{title}</h2>
              <h4 className="subtitle">{subtitle}</h4>
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
            </form>
          </FlyerItemWrapper>
        </>
      )}
    </Formik>
  );
};

FlyerItem.propTypes = propTypes;

export default compose(
  withContext(({ postSearchFlyer }) => ({ postSearchFlyer })),
  withAuthContext(({ user }) => ({ user })),
)(FlyerItem);
