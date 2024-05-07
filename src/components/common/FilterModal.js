import COLOR from '@constants/colors';
import FONTSIZE from '@constants/fontSize';
import FONTS from '@constants/fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import React, {useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

import Images from '@assets/images';
import strings from '@constants/string';
import CustomButton from './CustomButton';
import CustomDropdown from './CustomDropdown';
import CustomText from './CustomText';
import CustomTextInput from './CustomTextInput';

const FilterModal = props => {
  let {
    isVisible,
    animationType = '',
    transparent = '',
    filterTitle = '',
    rightText = '',
    labelDay = '',
    label2 = '',
    labelLocation = '',
    labelClient = '',
    labelGroup = '',
    btnTitle = '',
    isBtn = false,
    dayData = [],
    dayValue = {},
    dayValueFieldData = '',
    dayLabelFieldData = '',
    onChangeDayText = () => {},
    locationData = [],
    locationValue = '',
    locationValueFieldData = '',
    locationLabelFieldData = '',
    clientData = [],
    clientValue = '',
    clientLabelFieldData = '',
    clientValueFieldData = '',
    onChangClientText = () => {},
    groupData = [],
    groupValue = '',
    groupLabelFieldData = '',
    groupValueFieldData = '',
    onChangeGroupText = () => {},
    onChangeLocationText = () => {},
    onRequestClose = () => {},
    onRightPress = () => {},
    onRightClick = () => {},
  } = props;
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [input, setInput] = useState(false);
  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationType={animationType}
        transparent={transparent}>
        <View style={styles.filterContainer}>
          <View style={styles.filterModal}>
            <View style={styles.headerContent}>
              {filterTitle && (
                <CustomText
                  title={filterTitle}
                  customTextStyle={styles.titleStyle}
                />
              )}
              {rightText && (
                <TouchableOpacity onPress={onRightClick}>
                  {/* <CustomText
                    title={rightText}
                    customTextStyle={styles.rightTextStyle}
                    isTouchable={true}
                    onTextPress={() => {
                      // setInput(''),
                       onRightPress();
                    }}
                    // onTextPress={onRightClick}
                  /> */}
                  <Image source={rightText} />
                </TouchableOpacity>
              )}
            </View>

            <View
              style={
                {
                  // marginHorizontal: horizontalScale(20),
                }
              }>
              {/* Dropdown for day */}
              {/* <CustomDropdown
                data={dayData}
                labelField={dayLabelFieldData}
                valueField={dayValueFieldData}
                value={dayValue}
                label={labelDay}
                renderRightIcon={Images.dropdownImg}
                placeholder={strings.day}
                onChangeText={onChangeDayText}
              /> */}
              {/* Dropdown for calendar */}
              <CustomTextInput
                label={'Select by Date'}
                placeholder={'dd/mm/yyyy'}
                isMultiline={true}
                value={input}
                isImages={true}
                // inputContainer={{backgroundColor: 'red'}}
                inputStyle={{width: '80%'}}
                isRightIcon={Images.calendar}
                onRightIconClick={() => setOpenDatePicker(true)}
                onChangeText={(text, index) => {
                  setInput(text, index), onChangeDayText;
                }}
                editable={false}
                openPicker={openDatePicker}
                date={date}
                setOpenPicker={setOpenDatePicker}
                mode="date"
                setDateTime={setDate}
                isDatePicker
                format="DD/MM/YYYY"
              />
              {/* Dropdown for location */}
              <CustomDropdown
                dropDowndata={locationData}
                labelField={locationLabelFieldData}
                valueField={locationValueFieldData}
                value={locationValue}
                label={'Select by Location'}
                renderRightIcon={Images.dropdownImg}
                placeholder={strings.select}
                onChangeInput={onChangeLocationText}
              />
              {/* Dropdown for Group */}
              <CustomDropdown
                dropDowndata={groupData}
                labelField={groupLabelFieldData}
                valueField={groupValueFieldData}
                value={groupValue}
                label={'Select by Group'}
                renderRightIcon={Images.dropdownImg}
                placeholder={strings.select}
                onChangeInput={onChangeGroupText}
              />
            </View>
            {/* Button */}
            {isBtn && (
              <CustomButton
                title={btnTitle}
                customBtnStyle={{
                  marginVertical: verticalScale(20),
                  marginHorizontal: horizontalScale(20),
                }}
                onBtnPress={onRequestClose}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    flex: 0.6,
    width: '90%',
    marginHorizontal: horizontalScale(20),
    backgroundColor: COLOR.SECONDARY,
    borderRadius: moderateScale(20),
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  titleStyle: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.SEMIBOLD,
  },
  rightTextStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.NORMAL,
    color: COLOR.DARK_GREY,
    marginTop: verticalScale(7),
  },
});
