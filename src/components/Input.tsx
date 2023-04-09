import React from 'react';
import {View, TextInput, StyleSheet, Image, TextInputProps} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants/theme';

interface InputProps extends TextInputProps {
  icon: any;
  iconStyles?: any;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconStyles,
  placeholder,
  ...props
}) => {
  return (
    <View style={style.inputContainer}>
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          marginRight: 10,
          ...iconStyles,
        }}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        style={{flex: 1, color: COLORS.black, fontSize: 17}}
        {...props}
      />
    </View>
  );
};
const style = StyleSheet.create({
  inputContainer: {
    height: 55,
    width: SIZES.widthDefault,
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: '7268DC',
    borderWidth: 1,
  },
});
export default Input;
