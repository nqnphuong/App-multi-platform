import icons from '@constants/icons';
import {COLORS, SIZES} from '@constants/theme';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

interface StylesInline {
  color: string;
  tinColor: string;
}

const ImageScreen: React.FC = () => {
  const renderFooter = (stylesInline?: StylesInline) => {
    return (
      <View style={styles.footer}>
        <View>
          <View
            style={[
              styles.rowCenter,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <TouchableOpacity style={[styles.rowCenter]}>
              <Image
                source={icons.Heart}
                style={[
                  {
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: stylesInline?.tinColor,
                  },
                ]}
              />
              <Text
                style={[
                  {color: COLORS.black},
                  {color: stylesInline?.color},
                ]}>{`12 Like`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowCenter]}>
              <Image
                source={icons.Comment}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: stylesInline?.tinColor,
                }}
              />
              <Text
                style={[
                  {color: COLORS.black},
                  {color: stylesInline?.color},
                ]}>{`5 Comment`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowCenter]}>
              <Image
                source={icons.Share}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: stylesInline?.tinColor,
                }}
              />
              <Text
                style={[{color: COLORS.black}, {color: stylesInline?.color}]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.black,
      }}>
      <TouchableOpacity>
        <Image
          source={icons.Back}
          style={{
            width: 20,
            height: 20,
            margin: 10,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AutoHeightImage
          width={SIZES.width}
          source={{
            uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
          }}
        />
      </View>
      <View style={styles.textBody}>
        <Text
          style={{
            color: COLORS.white,
            marginBottom: 10,
            fontSize: 16,
            fontWeight: '600',
          }}>
          Nguyễn Quỳnh Nhật Phương
        </Text>
        <Text style={{color: COLORS.white, fontSize: 14}}>
          "Cúi mặt nhìn đời, thấy mình là một trong muôn vàn người lao động,
          Ngước lên nhìn trời, cảm ơn đời cho con mắt nhìn trời cao rộng..."
        </Text>
        <Text style={styles.createdTime}>20 hours ago</Text>
        {renderFooter({
          color: COLORS.white,
          tinColor: COLORS.white,
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textBody: {
    margin: 10,
    marginTop: 0,
    display: 'flex',
    gap: 5,
  },
  createdTime: {
    color: COLORS.gray,
    fontSize: 12,
  },
  footer: {
    borderTopColor: COLORS.gray,
    borderTopWidth: 0.5,
    paddingTop: 10,
    margin: 10,
  },
});

export default ImageScreen;
