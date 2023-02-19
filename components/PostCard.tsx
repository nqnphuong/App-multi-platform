import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons} from '../constants';
import {COLORS, SIZES} from '../constants/theme';

interface PostCardProps {
  focused: boolean;
  icon: any;
}

const PostCard: React.FC<PostCardProps> = ({focused, icon}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.rowCenter]}>
        <TouchableOpacity style={styles.rowCenter}>
          <Image
            source={{
              uri: 'https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-1/321092757_540269217983089_4822069218944065839_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=E_ibo8iAvw8AX8bWzNv&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCOSvgtFB_sPubhm1Sc12KzGmEoJvyUIvm2z1xv84pCpQ&oe=63F6929D',
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
      <Image
        source={{
          uri: 'https://external.fdad2-1.fna.fbcdn.net/emg1/v/t13/757758668292149398?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCnZxamAbSnw%2Fmaxresdefault.jpg&fb_obo=1&utld=ytimg.com&stp=c0.5000x0.5000f_dst-jpg_flffffff_p500x261_q75&ccb=13-1&oh=06_AbE80h1nVg_7A4EVYEMB8GYF7aBqZiuGauS42dsxiK2now&oe=63F39ABE&_nc_sid=a349d5',
        }}
        style={{
          width: SIZES.width,
          height: 200,
        }}
      />
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
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
              <Text style={{color: COLORS.black}}>{`12 Like`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowCenter]}>
              <Image
                source={icons.Comment}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
              <Text style={{color: COLORS.black}}>{`5 Comment`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowCenter]}>
              <Image
                source={icons.Share}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
              <Text style={{color: COLORS.black}}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
