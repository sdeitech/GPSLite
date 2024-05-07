// import Images from '@assets/images';
// import CommonProfile from '@components/common/CommonProfile';
import CommonProfile from '../../../components/common/CommonProfile';
// import CustomHeader from '@components/common/CustomHeader';
import CustomHeader from '../../../components/common/CustomHeader';
// import strings from '@constants/string';
// import {horizontalScale} from '@helpers/ResponsiveFonts';
// import {selectCurrentUser} from '@redux/slice/authSlice';
import moment from 'moment';
import React, {useEffect} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {getProfileDetail, profileDetail} from 'src/redux/slice/authSlice';
import styles from './style';
import Images from '../../../assets/images';
import strings from '../../../constants/string';
import { horizontalScale } from '../../../helpers/ResponsiveFonts';
import { getProfileDetail, profileDetail, selectCurrentUser } from '../../../redux/slice/authSlice';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectCurrentUser);

  const body = {
    username: loggedInUser.userDetails.emailId,
  };
  useEffect(() => {
    dispatch(getProfileDetail(body));
  }, []);
  const profileData = useSelector(profileDetail);

  const goBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        title={strings.profile}
        containerFlex={0.1}
      />
      <View style={styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: horizontalScale(20),
          }}>
          <Image
            source={{uri: `${profileData.profilePhotoPath}`}}
            resizeMode={'contain'}
            style={styles.profileImgView}
          />
          <CommonProfile
            title={strings.name}
            description={profileData?.employeeName}
            // description={'John Smith'}
          />
          <CommonProfile
            title={strings.emailAddress}
            description={profileData?.emailAddress}
          />
          <CommonProfile
            title={strings.phoneNumber}
            description={profileData?.phoneNumber}
          />
          <CommonProfile
            title={strings.address}
            description={profileData?.address}
          />
          <CommonProfile
            title={strings.dateOfBirth}
            description={
              profileData?.dateOfBirth
                ? moment(profileData.dateOfBirth).format('YYYY-MM-DD')
                : ''
            }
          />

          <CommonProfile
            title={strings.qualification}
            description={profileData?.qualification}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
