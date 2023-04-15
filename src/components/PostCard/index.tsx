import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {icons} from 'constants';
import {COLORS, SIZES} from 'constants/theme';

interface PostCardProps {
  focused: boolean;
  icon: any;
}

interface StylesInline {
  color: string;
  tinColor: string;
}

const PostCard: React.FC<PostCardProps> = ({focused, icon}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handelModel = () => {
    console.log('w');
    setModalVisible(!modalVisible);
  };
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
    <View style={styles.container}>
      <View style={[styles.header, styles.rowCenter]}>
        <TouchableOpacity style={styles.rowCenter}>
          <Image
            source={{
              uri: 'https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/321092757_540269217983089_4822069218944065839_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yPG2yeV6TUMAX_pt-x6&_nc_ht=scontent.fdad1-1.fna&oh=00_AfAOI-B_PG24WPS0DAkF7ZMF3fqUCKAC73_wQ3GIP1d62A&oe=6409C5DB',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
          />
          <View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Nguyễn Quỳnh Nhật Phương
            </Text>
            <View
              style={[
                styles.rowCenter,
                {
                  gap: 5,
                },
              ]}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 12,
                }}>
                Public
              </Text>
              <Image
                source={icons.Earth}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: COLORS.gray,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Image
          source={icons.More}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
      <View style={styles.textBody}>
        <Text style={{color: COLORS.black, fontSize: 14}}>
          "Cúi mặt nhìn đời, thấy mình là một trong muôn vàn người lao động,
          Ngước lên nhìn trời, cảm ơn đời cho con mắt nhìn trời cao rộng..."
        </Text>
        <Text style={styles.createdTime}>20 hours ago</Text>
      </View>
      <TouchableOpacity onPress={handelModel}>
        <AutoHeightImage
          width={SIZES.width}
          source={{
            uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
          }}
        />
      </TouchableOpacity>
      {renderFooter()}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: COLORS.black,
          }}>
          <TouchableOpacity onPress={handelModel}>
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
            <ImageViewer
              imageUrls={[
                {
                  url: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
                },
              ]}
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  header: {
    justifyContent: 'space-between',
    margin: 10,
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

export default PostCard;
