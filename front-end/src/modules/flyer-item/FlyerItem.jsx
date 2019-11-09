import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import compose from 'lodash/fp/compose';
import { geolocated } from 'react-geolocated';
import RoomIcon from '@material-ui/icons/Room';
import CheckIcon from '@material-ui/icons/Check';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import GoogleMapReact from 'google-map-react';

import TopBar from './components/TopBar';

import { getTitle, getSubtitle, FLYER_TYPE } from './constants';
import { propTypes } from './propTypes';
import { FlyerItemWrapper } from './components/styled';
import { withContext } from '../common/context';
import { withAuthContext } from '../auth/authContext';
import PickLocation from '../common/PickLocation';
import { useDialog } from '../common/DialogContext';

const schema = Yup.object().shape({
  petName: Yup.string()
    .max(50, 'El máximo es 50 caracteres'),
  breed: Yup.string().required('Este campo es requerido'),
  description: Yup.string().required('Este campo es requerido'),
  latitude: Yup.number().required('Este campo es requerido'),
  longitude: Yup.number().required('Este campo es requerido'),
  photoURI: Yup.string().required('Este campo es requerido'),
});

const initialData = {
  breed: '',
  description: '',
  petName: '',
  petType: 1,
  flyerType: 1,
  latitude: undefined,
  longitude: undefined,
  createdBy: '',
  photoURL: 'https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg',
};

const useStyles = makeStyles(() => ({
  actionButton: {
    marginTop: 24,
    width: 250,
  },
  actionButtonWrapper: {
    alignSelf: 'center',
    display: 'flex',
  },
  check: {
    marginLeft: 16,
    alignSelf: 'center',
    marginTop: 16,
  },
  progressWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  petAvatar: {
    width: 200,
    height: 200,
    marginTop: 24,
    marginBottom: 24,
  },
  mapPreview: {
    height: 200,
    width: '100%',
    marginLeft: -24,
    marginRight: -24,
  },
  contactButton: {
    marginTop: 24,
    marginBottom: 36,
  },
}));

const FlyerItem = props => {
  const classes = useStyles();
  const {
    mode,
    flyerDetail,
    getSearchFlyer,
    user,
    postReply,
  } = props;
  const location = useLocation();
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const showDialog = useDialog();
  const query = qs.parse(location.search);
  const formRef = React.createRef();
  const photoRef = React.createRef();

  const title = getTitle(mode, query.type);
  const subtitle = getSubtitle(mode, query.type);
  const history = useHistory();

  const viewMode = !!query.id;
  const ownFlyer = !!(flyerDetail && user && flyerDetail.createdBy === user.email);
  const disableInputs = !ownFlyer && mode !== 'new';

  useEffect(() => {
    if (viewMode) {
      getSearchFlyer(query.id);
    }
  }, []);

  if (viewMode && !flyerDetail) {
    return (
      <div className={classes.progressWrapper}>
        <CircularProgress />
      </div>
    );
  }

  const uploadImage = URI => {
    const formData = new FormData();
    formData.append('photoURI', URI);
    return props.uploadImage(formData);
  };

  const onSubmit = async (val) => {
    setShowProgress(true);
    try {
      const photoURL = await uploadImage(val.photoURI);

      const values = {
        ...val,
        createdBy: props.user.email,
        flyerType: FLYER_TYPE[query.type],
        photoURL,
      };

      delete values.photoURI;

      await props.postSearchFlyer(values);
      setShowProgress(false);
      history.goBack();
    } catch (error) {
      setShowProgress(false);
      console.error(error);
    }
  };

  const onPostReply = () => {
    showDialog({
      title: 'Confirmar',
      message: '¿Querés ponerte en contacto con esta persona?',
      onAction: async () => {
        await postReply(flyerDetail.id, {
          sender: user.email,
        });
      },
    });
  };

  return (
    <Formik
      initialValues={viewMode ? flyerDetail : initialData}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isValid,
        setFieldValue,
      }) => {
        const onPhotoSelected = event => {
          setFieldValue('photoURI', event.target.files && event.target.files[0]);
        };

        const locationText = flyerDetail && flyerDetail.flyerType === FLYER_TYPE.lost ? 'Última vez visto' : 'Encontrado en';

        const petLocation = viewMode
          ? (
            <>
              <h5>{locationText}</h5>
              <div className={classes.mapPreview}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                  center={{
                    lat: flyerDetail.latitude,
                    lng: flyerDetail.longitude,
                  }}
                  defaultZoom={15}
                  zoomControl={false}
                  zoomControlOptions={{
                  // eslint-disable-next-line
                      position: 4,
                  }}
                >
                  <RoomIcon
                    className="markerButton"
                    color="secondary"
                    lat={flyerDetail.latitude}
                    lng={flyerDetail.longitude}
                  />
                </GoogleMapReact>
              </div>
            </>
          )
          : (
            <div className={classes.actionButtonWrapper}>
              <Button
                className={classes.actionButton}
                variant="contained"
                color="secondary"
                onClick={() => setLocationPickerOpen(true)}
              >
                <RoomIcon style={{ marginRight: 8 }} />
                {values.latitude ? 'Editar ubicación' : 'Agregar ubicación'}
              </Button>
              {values.latitude && <CheckIcon className={classes.check} color="secondary" fontSize="large" />}
            </div>
          );

        const picture = viewMode ? (
          <Avatar src={flyerDetail.photoUrl} className={classes.petAvatar} />
        ) : (
          <>
            <input ref={photoRef} style={{ display: 'none' }} type="file" accept="image/*" onChange={onPhotoSelected} />
            <div className={classes.actionButtonWrapper}>
              <Button
                className={classes.actionButton}
                variant="contained"
                color="secondary"
                onClick={() => photoRef.current.click()}
              >
                <AddAPhotoIcon style={{ marginRight: 8 }} />
                {values.photoURI ? 'Editar foto' : 'Agregar foto'}
              </Button>
              {values.photoURI && <CheckIcon className={classes.check} color="secondary" fontSize="large" />}
            </div>
          </>
        );

        return (
          <>
            <TopBar
              actionDisabled={!isValid}
              onActionClick={() => formRef.current.dispatchEvent(new Event('submit'))}
              flyerDetail={flyerDetail}
              user={user}
              {...props}
            />
            {showProgress ? (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <FlyerItemWrapper>
                <form ref={formRef} className="form" onSubmit={handleSubmit}>
                  <h2 className="title">{title}</h2>
                  <h4 className="subtitle">{subtitle}</h4>
                  {picture}
                  {petLocation}
                  <TextField
                    style={{ marginTop: 36 }}
                    name="petName"
                    label="Nombre de la mascota"
                    value={values.petName}
                    onChange={handleChange}
                    margin="normal"
                    error={errors.petName}
                    className="text-field"
                    disabled={disableInputs}
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
                    disabled={disableInputs}
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
                    disabled={disableInputs}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    rows={5}
                  />
                  {
                  !ownFlyer && viewMode
                    && (
                    <Button onClick={onPostReply} className={classes.contactButton} variant="contained" color="secondary">
                      <NotificationsNoneIcon />
                      Contactar
                    </Button>
                    )
                  }
                </form>
                <PickLocation
                  open={locationPickerOpen}
                  handleClose={() => setLocationPickerOpen(false)}
                  onLocationPicked={({ lat, lng }) => {
                    setFieldValue('latitude', lat);
                    setFieldValue('longitude', lng);
                  }}
                />
              </FlyerItemWrapper>
            )}
          </>
        );
      }}
    </Formik>
  );
};

FlyerItem.propTypes = propTypes;

export default compose(
  withContext(({
    postSearchFlyer,
    uploadImage,
    getSearchFlyer,
    flyerDetail,
    postReply,
  }) => ({
    postSearchFlyer,
    uploadImage,
    getSearchFlyer,
    flyerDetail,
    postReply,
  })),
  withAuthContext(({ user }) => ({ user })),
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  }),
)(FlyerItem);
