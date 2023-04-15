import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from 'constants/theme';

interface CustomButtonProps {
  buttonText?: string;
  colors: string[];
  buttonContainerStyles?: any;
  icon?: any;
  iconColor?: string;
  iconStyle?: any;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText,
  buttonContainerStyles,
  colors,
  icon,
  iconColor,
  iconStyle,
  onPress,
}) => {
  if (colors.length > 1) {
    return (
      <TouchableOpacity
        style={{
          width: 320,
        }}
        onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={{x: 0.1, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            ...buttonContainerStyles,
          }}>
          {icon && (
            <Image
              source={icon}
              style={{
                width: 25,
                height: 25,
                tintColor: iconColor ? COLORS.white : '',
              }}
            />
          )}
          {buttonText && (
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                ...FONTS.h2,
              }}>
              {buttonText}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 320,
          backgroundColor: colors[0],
          ...buttonContainerStyles,
        }}>
        {icon && (
          <Image
            source={icon}
            style={{
              tintColor: iconColor && COLORS.white,
              ...iconStyle,
            }}
          />
        )}
        {buttonText && (
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.black,
              ...FONTS.h3,
            }}>
            {buttonText}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
};

export default CustomButton;
