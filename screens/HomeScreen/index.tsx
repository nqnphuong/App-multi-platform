import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../components';
import Header from '../../components/Header';
import PostCard from '../../components/PostCard';
import {icons} from '../../constants';
import {COLORS, FONTS} from '../../constants/theme';
import {News} from '../../models/News';

function HomeScreen(): JSX.Element {
  const [newsData, setnewsData] = useState<News[]>([
    {
      newId: '1',
      userAvarta:
        'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg',
      newsBackground:
        'https://scontent.fdad2-1.fna.fbcdn.net/v/t15.5256-10/320348440_493936742948513_5552517706944606248_n.jpg?stp=dst-jpg_p235x165&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=OQ053nsa9jgAX_vwWeQ&_nc_ht=scontent.fdad2-1.fna&oh=00_AfA5IuFjHXA1VEyYidUlxtZ5YfYZ_92HR_CBfRLofdu_mw&oe=63F57F17',
      userName: 'Hoa Huỳnh',
    },
    {
      newId: '2',
      userAvarta:
        'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg',
      newsBackground:
        'https://scontent.fdad2-1.fna.fbcdn.net/v/t15.5256-10/320348440_493936742948513_5552517706944606248_n.jpg?stp=dst-jpg_p235x165&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=OQ053nsa9jgAX_vwWeQ&_nc_ht=scontent.fdad2-1.fna&oh=00_AfA5IuFjHXA1VEyYidUlxtZ5YfYZ_92HR_CBfRLofdu_mw&oe=63F57F17',
      userName: 'Hoa Huỳnh',
    },
    {
      newId: '3',
      userAvarta:
        'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg',
      newsBackground:
        'https://scontent.fdad2-1.fna.fbcdn.net/v/t15.5256-10/320348440_493936742948513_5552517706944606248_n.jpg?stp=dst-jpg_p235x165&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=OQ053nsa9jgAX_vwWeQ&_nc_ht=scontent.fdad2-1.fna&oh=00_AfA5IuFjHXA1VEyYidUlxtZ5YfYZ_92HR_CBfRLofdu_mw&oe=63F57F17',
      userName: 'Hoa Huỳnh',
    },
  ]);

  const renderNewsHeader = () => {
    return (
      <TouchableOpacity>
        <ImageBackground
          source={{
            uri: 'https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/275230582_1173189403508740_1249611582808657292_n.jpg?stp=c0.0.240.240a_dst-jpg_p240x240&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hekW9TS5PqQAX9ww-l8&_nc_ht=scontent.fdad1-2.fna&oh=00_AfCPPjMQQZl9URJ7RbPxZn-qg8-2uEZHyA4d0nhhTrrpCw&oe=63F503D7',
          }}
          style={styles.addNews}
          imageStyle={{
            width: 100,
            height: 130,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <LinearGradient
            colors={['#6B65DE', '#E89DE7']}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              borderRadius: 20,
              borderColor: COLORS.white,
              marginBottom: 15,
            }}>
            <Image
              source={icons.AddNoBorder}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = (item: News) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          style={styles.newsPost}
          source={{
            uri: item.newsBackground,
          }}
          imageStyle={{
            borderRadius: 10,
          }}>
          <LinearGradient
            colors={['#6B65DE', '#E89DE7']}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: 35,
              height: 35,
              margin: 5,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Image
              source={{
                uri: item.userAvarta,
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 28,
              }}
            />
          </LinearGradient>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              margin: 5,
              color: COLORS.white,
            }}>
            {item.userName}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={newsData}
          keyExtractor={item => item.newId}
          bounces={true}
          horizontal={true}
          renderItem={({item}) => renderNewsItem(item)}
          ListHeaderComponent={renderNewsHeader()}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            marginTop: 10,
            gap: 5,
          }}>
          <PostCard />
          <PostCard />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
  },
  news: {
    height: 160,
  },
  addNews: {
    width: 100,
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: '#FFFEFF',
  },
  newsPost: {
    width: 100,
    height: 160,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  post: {
    height: 250,
  },
});

export default HomeScreen;
