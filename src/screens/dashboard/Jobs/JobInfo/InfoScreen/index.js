/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-shadow */
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Config from 'react-native-config';
import MapView, {AnimatedRegion, Marker, Polygon} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {setRedAlertSwipe} from 'src/redux/commonStateSlice/commonStateSlice';

import Images from '@assets/images';
import {
  geoFenceStatus,
  getJobInfo,
  getsubJobInfo,
  jobDetail,
  subJobInformation,
} from 'src/redux/slice/jobSlice';
import styles from './styles';

import CustomModal from '@components/common/CustomModal';
import CustomText from '@components/common/CustomText';
import SwipeButton from '@components/common/SwipeButton';
import GLOBALS from '@constants';
import FONTSIZE from '@constants/fontSize';
import FONTS from '@constants/fonts';
import {raiseRedAlert} from '@helpers/HomeAlertFunctions';
import {getAddressCoordinates} from '@helpers/Permissions';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import moment from 'moment';
import MapViewDirections from 'react-native-maps-directions';
import Tts from 'react-native-tts';
import {
  selectCurrentUser,
  selectedReduxLocation,
} from 'src/redux/slice/authSlice';
const {COLOR, strings} = GLOBALS;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const InfoScreen = ({navigation, route, navigatetoVerifyPin}) => {
  const dispatch = useDispatch();
  console.log('route========>>>>>>>>', route);
  const {jobId, geofencingPaths, isSubJob, subJobId} = route.params;
  const user = useSelector(selectCurrentUser);
  const reduxLocation = useSelector(selectedReduxLocation);
  const jobData = useSelector(jobDetail);
  const subJobData = useSelector(subJobInformation);
  const apiKey = Config.GOOGLE_MAPS_API_KEY;
  const {redAlertSwipeState, redAlertSwipeText, swiperValue} = useSelector(
    state => state.common,
  );
  const mapRef = useRef();
  const markerRef = useRef();
  const [isRedAlert, setIsRedAlert] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    message: '',
  });
  const [state, setState] = useState({
    currLocation: {
      latitude: 0,
      longitude: 0,
    },
    destination: null,
    isLoading: false,
    coordinate: new AnimatedRegion({
      currLocation,
    }),
    time: 0,
    distance: 0,
  });
  const {currLocation, destination, coordinate, time, distance} = state;
  const updateState = data => setState(state => ({...state, ...data}));
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [reasonForGeoFence, setReasonForGeoFence] = useState(false);
  const [reasonValue, setReasonValue] = useState('');
  const [isEnteredGeoFence, setIsEnteredGeoFence] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const geofencingData = useSelector(state => state.home.geofencingData);
  console.log('geofencingData==============>>>>>>>>>>>>>', geofencingData);
  const convertToValidJSONString = originalString => {
    const jsonString = originalString.replace(/'/g, '"');
    const validJSONString =
      jsonString && jsonString.replace(/(\w+):/g, '"$1":');

    return validJSONString;
  };
  useEffect(() => {
    // getLocation();
    if (geofencingPaths) {
      // Parse and convert geoFensing_Path to array of LatLng objects
      const pathArray = JSON.parse(
        convertToValidJSONString(geofencingPaths.geoFensing_Path),
      );

      const pathLatLng = pathArray.map(point => ({
        latitude: point.lat,
        longitude: point.lng,
      }));

      setPolygonCoordinates(pathLatLng);
    }
  }, [geofencingPaths]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (Platform.OS === 'android') {
          if (markerRef.current) {
            markerRef?.current?.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        // setPosition(position);
        updateState({
          currLocation: newCoordinate,
        });
        if (polygonCoordinates.length > 0) {
          // Call lieInsidePolygon only if polygonCoordinates is not empty
          lieInsidePolygon(newCoordinate);
        }
        // Call lieInsidePolygon to check if the current location is inside the geofence
      },
      error => {},
      {
        enableHighAccuracy: false,
        interval: 1000, // millis, Android-only
        fastestInterval: 1000, // millis, Android-only
        distanceFilter: 100, // meters
        useSignificantChanges: true, // iOS-only}
        timeout: 20000,
        maximumAge: 10000,
      },
    );

    // Clean up the watchPosition when the component unmounts or when wasInsideGeoFence changes
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [coordinate, polygonCoordinates, geofencingPaths]);

  useEffect(() => {
    const fetchData = () => {
      // Check if jobData is available
      dispatch(getJobInfo(jobId)).then(r => {
        if (r) {
          // Use the getAddressCoordinates function and log the result
          getAddressCoordinates(r?.address, dispatch, coordinates => {
            if (coordinates) {
              const destination = {
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
              };
              console.log('destination======>>>>>>>', destination);
              updateState({destination});
              // calculatePolygonCoordinates(destination);
            } else {
              // dispatch(setShowLoader(false));
            }
          });
        }
      });
    };

    const fetchSubJobData = () => {
      dispatch(getsubJobInfo(subJobId)).then(r => {
        if (r) {
          // Use the getAddressCoordinates function and log the result
          getAddressCoordinates(r?.address, dispatch, coordinates => {
            if (coordinates) {
              const destination = {
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
              };
              updateState({destination});
              // calculatePolygonCoordinates(destination);
            } else {
              // dispatch(setShowLoader(false));
            }
          });
        }
      });
    };
    if (currLocation === destination) {
      navigation.navigate('JobAttachment', {jobID: jobId});
    }
    isSubJob ? fetchSubJobData() : fetchData();
  }, []);

  // useEffect(() => {});

  const lieInsidePolygon = coordinates => {
    console.log(
      'coordinates,polygonCoordinates',
      coordinates,
      polygonCoordinates,
    );
    const isInside = geolib.isPointInPolygon(coordinates, polygonCoordinates);
    console.log('isInside============>>>>>>>>>', isInside, isEnteredGeoFence);

    if (isInside) {
      if (!isEnteredGeoFence.current) {
        const body = {
          id: 0,
          geoFensingId: geofencingPaths?.geoFensingId,
          longitude:
            geofencingData.autoLocation === true ? coordinates.longitude : 0,
          latitude:
            geofencingData.autoLocation === true ? coordinates.latitude : 0,
          jobId: jobId,
          enteredGeofence: true,
          geofenceBroken: false,
          userId: user?.userId,
          staffName: user?.userDetails?.emplyeeName,
        };
        console.log('body============>>>>>>>>>>', body);
        if (geofencingData.placeAlert === true) {
          dispatch(geoFenceStatus(body));
        }
        // User has entered the geofence
        // Alert.alert('You entered the geofence');
        if (geofencingData.audioOn === true) {
          Tts.speak(geofencingData.placeTimeInAudioActivation);
        }
        if (geofencingData.popUpMWMOn === true) {
          setAlertModal({
            isVisible: true,
            message: geofencingData.placeTimeInScreenMassage,
          });
        }
        Vibration.vibrate(1000);
        setIsEnteredGeoFence(true);
      }
    } else {
      if (isEnteredGeoFence.current) {
        console.log('isEnteredGeoFence======>>>>>>>>>', isEnteredGeoFence);
        const body = {
          id: 0,
          geoFensingId: geofencingPaths?.geoFensingId,
          longitude: 0,
          latitude: 0,
          jobId: jobId,
          enteredGeofence: false,
          geofenceBroken: true,
          userId: user?.userId,
          staffName: user?.userDetails?.emplyeeName,
        };
        console.log('body============>>>>>>>>>>if outside geofence', body);
        if (geofencingData.placeAlert === true) {
          dispatch(geoFenceStatus(body));
        }
        if (geofencingData.audioOn === true) {
          Tts.speak(geofencingData.placeTimeOutAudioActivation);
        }

        // Alert.alert('You exit the geofence');
        Vibration.vibrate([1000, 500, 1000, 500]);
        if (geofencingData.popUpMWMOn === true) {
          setAlertModal({
            isVisible: true,
            message: geofencingData.placeTimeOutScreenMassage,
          });
        }

        // User has left the geofence
        setIsEnteredGeoFence(false);
      }
    }
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };
  const timeInMinutes = time / 60;

  const calculatePolygonCenter = polygonCoordinates => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    polygonCoordinates.forEach(coord => {
      minX = Math.min(minX, coord.latitude);
      maxX = Math.max(maxX, coord.latitude);
      minY = Math.min(minY, coord.longitude);
      maxY = Math.max(maxY, coord.longitude);
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return {latitude: centerX, longitude: centerY};
  };
  const timetoReach = time > 60 ? timeInMinutes.toFixed(2) : time.toFixed(2);
  const kilometers = distance;
  const miles = (kilometers * 0.621371).toFixed(2);
  const startTime = subJobData
    ? subJobData.dueStartDate
    : jobData?.dueStartDate;
  const jobStartTime = moment(startTime).format('DD MMM');
  const duration = subJobData
    ? subJobData?.durationHours + ':' + subJobData?.durationMinutes
    : jobData?.durationHours + ':' + jobData?.durationMinutes;

  const infoData = [
    {
      image: Images.calendar,
      title: jobStartTime,
      description: 'Start Date',
    },
    {
      image: Images.clock,
      title: subJobData ? subJobData?.startTime : jobData?.startTime,
      description: 'Start Time',
    },
    {
      image: Images.priorityIcon,
      title: subJobData
        ? (subJobData?.priority === 1 && 'High') ||
          (subJobData?.priority === 2 && 'Normal') ||
          (subJobData?.priority === 3 && 'Low')
        : (jobData?.priority === 1 && 'High') ||
          (jobData?.priority === 2 && 'Normal') ||
          (jobData?.priority === 3 && 'Low'),
      description: 'Priority',
    },
    {
      image: Images.durationIcon,
      title: duration,
      description: 'Duration',
    },
  ];
  const jobInformation = ({item}) => {
    return (
      <View style={styles.infoUpperView}>
        <View style={styles.imgView}>
          <Image source={item.image} style={styles.imgStyle} />
        </View>
        <CustomText
          title={item.title}
          customTextStyle={styles.titleTextStyle}
        />
        <CustomText
          title={item.description}
          customTextStyle={styles.descriptionTextStyle}
        />
      </View>
    );
  };
  const onCreateRedAlert = val => {
    Vibration.vibrate(500);
    dispatch(setRedAlertSwipe(val));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.introView}>
          <CustomText
            title={subJobData ? subJobData?.companyName : jobData?.companyName}
            customTextStyle={{fontFamily: FONTS.MEDIUM}}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `tel:${
                  jobData?.contactName
                    ? jobData?.contactName
                    : Alert.alert('No contact available')
                }`,
              )
            }>
            <CustomText
              title={
                subJobData ? subJobData?.contactName : jobData?.contactName
              }
              customTextStyle={styles.contactText}
              textContainer={styles.contactTextContainer}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.jobInfo}>
          <FlatList
            data={infoData}
            renderItem={jobInformation}
            horizontal
            scrollEnabled={false}
          />
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.distanceContainer}>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              title={`${timetoReach}  ${time > 60 ? 'hrs' : 'mins'}`}
            />
            <CustomText
              title={` to Job (${miles} mi)`}
              customTextStyle={{color: COLOR.TEXT_GREY}}
            />
          </View>
          <CustomText
            title={subJobData ? subJobData?.address : jobData?.address}
            customTextStyle={styles.distanceDescriptionText}
          />
        </View>

        <View style={styles.mapContainer}>
          {currLocation?.latitude && currLocation?.longitude && destination ? (
            <MapView
              ref={mapRef}
              style={{height: '100%', width: '100%'}}
              region={{
                ...currLocation,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              onPress={e => {
                const {latitude, longitude} = e.nativeEvent.coordinate;
                updateState({
                  currLocation: {
                    latitude: latitude,
                    longitude: longitude,
                  },
                });
                {
                  currLocation && lieInsidePolygon(e.nativeEvent.coordinate);
                }
              }}>
              <Marker.Animated
                ref={markerRef}
                draggable
                coordinate={currLocation}
                onDragEnd={e => {
                  const newCoordinate = {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  };
                  updateState({currLocation: newCoordinate});
                }}>
                <Image source={Images.currentLocation} />
              </Marker.Animated>

              {polygonCoordinates.length > 0 && (
                <Polygon
                  coordinates={polygonCoordinates}
                  fillColor="rgba(0, 255, 0, 0.1)"
                  strokeColor={COLOR.PRIMARY}
                  strokeWidth={1}
                />
              )}
              {polygonCoordinates.length > 0 && (
                <Marker
                  coordinate={calculatePolygonCenter(polygonCoordinates)}
                  draggable
                  onDragEnd={e => {
                    const newDestination = {
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    };
                    updateState({destination: newDestination});
                  }}>
                  <Image source={Images.destinationLocation} />
                </Marker>
              )}

              {Object.keys(destination).length > 0 && currLocation && (
                <MapViewDirections
                  origin={currLocation}
                  destination={destination}
                  apikey={apiKey}
                  strokeWidth={6}
                  strokeColor={COLOR.PRIMARY_BLUE}
                  // optimizeWaypoints={true}
                  onStart={params => {}}
                  onReady={result => {
                    fetchTime(result.distance, result.duration);
                    mapRef.current.fitToCoordinates(result.coordinates, {});
                  }}
                  onError={errorMessage => {}}
                />
              )}
            </MapView>
          ) : (
            <CustomText title="Please wait, Route will show up.." />
          )}
        </View>
        <View style={styles.redAlertView}>
          <SwipeButton
            customView={styles.redAlertSlide}
            gestureImg={Images.sosImage}
            customBtnStyle={styles.redAlertBtn}
            navigateScreen={navigatetoVerifyPin}
            openRedAlertModal={() =>
              raiseRedAlert(
                dispatch,
                user,
                reduxLocation,
                setIsRedAlert,
                isRedAlert,
              )
            }
            toggleText={redAlertSwipeText}
            toggleState={redAlertSwipeState}
            onToggle={onCreateRedAlert}
            swiperValue={swiperValue}
            isAlertActive={isAlertActive}
            setIsAlertActive={setIsAlertActive}
            sosAlertData={true}
          />
        </View>
      </View>
      {reasonForGeoFence && (
        <CustomModal
          isTextInput
          modalLabel={'Reason for Geo Fence Activation'}
          modalValue={reasonValue}
          placeholderValue={'Tell us the Reason'}
          onChangeValue={text => setReasonValue(text)}
          isBtn={true}
          btn1Title={'Submit'}
          onBtn1Press={() => {
            setReasonForGeoFence(false);
            setReasonValue('');
          }}
        />
      )}
      <CustomModal
        isVisible={alertModal.isVisible}
        modalTitle={alertModal.message}
        titleCustomStyle={{fontSize: FONTSIZE.MEDIUM}}
        isBtn={true}
        btn1Title={strings.ok}
        customBtn1Style={styles.alertButton}
        onBtn1Press={() => {
          setAlertModal({
            isVisible: false,
            message: '',
          });
        }}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
