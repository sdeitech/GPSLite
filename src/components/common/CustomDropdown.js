import {StyleSheet, Text, Image, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import CustomText from './CustomText';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import FONTS from '@constants/fonts';
import COLOR from '@constants/colors';
import FONTSIZE from '@constants/fontSize';
const CustomDropdown = props => {
  const [isFocus, setIsFocus] = useState(false);

  let {
    label = '',
    placeholder = '',
    value = {},
    onChangeText = () => {},
    containerStyle = {},
    dropDowndata = [],
    search = false,
    disable = false,
    renderRightIcon = false,
    labelField = 'label',
    valueField = 'value',
    dropdownStyle = {},
    labelStyle = {},
    infoIcon,
    infoIconClick = () => {},
    custom_placeholderStyle = {},
    onChangeInput,
    index,
  } = props;
  // console.log(dropDowndata, 'dropDownDAta>>>>>>', value);
  return (
    <View style={styles.dropdownContainer}>
      {label && (
        <>
          <CustomText title={label} customTextStyle={{}} />

          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={[
              styles.placeholderStyle,
              custom_placeholderStyle,
            ]}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropDowndata}
            disable={disable}
            search={search}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onChangeInput(item);
              setIsFocus(false);
            }}
            renderRightIcon={() =>
              renderRightIcon ? (
                <Image
                  source={renderRightIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : null
            }
          />
        </>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: verticalScale(8),
    marginHorizontal: horizontalScale(20),
  },
  dropdown: {
    paddingHorizontal: horizontalScale(5),
    padding: verticalScale(5),
    marginTop: verticalScale(10),
    backgroundColor: COLOR.TEXTINPUT,
    borderRadius: moderateScale(50),
  },
  placeholderStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.REGULAR,
    color: COLOR.LIGHT_GREY,
    paddingLeft: horizontalScale(10),
  },
  selectedTextStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.REGULAR,
    color: COLOR.PRIMARY,
    paddingLeft: horizontalScale(10),
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: FONTSIZE.MEDIUM,
  },
  icon: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginRight: horizontalScale(7),
  },
});
