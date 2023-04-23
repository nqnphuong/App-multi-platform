import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {COLORS, FONTS, SIZES} from 'constants/theme';
import {Modal, Provider} from '@ant-design/react-native';
import Avatar from '@components/Avatar';
import CustomButton from '@components/CustomButton';
import icons from '@constants/icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  hangup: () => void;
  join: () => void;
}

const GettingCall: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handelNavigate = () => {
    navigation.navigate('VideoScreen', {
      name: 'VideoScreen',
    });
    setIsOpen(false);
  };

  return (
    <Provider>
      <Modal
        popup
        visible={isOpen}
        animationType="slide-up"
        style={styles.modal}
        onClose={() => setIsOpen(false)}>
        <View style={styles.container}>
          <Avatar
            styles={{
              width: 40,
              height: 40,
            }}
            uri="https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-41.jpg"
          />
          <View style={{flex: 1}}>
            <Text style={[{...styles.title}, FONTS.h2]}>Le Khanh Duong</Text>
            <Text>incoming call</Text>
          </View>
          <CustomButton
            colors={[COLORS.lightGreen1]}
            icon={icons.PhoneCall}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
              resizeMode: 'contain',
            }}
            buttonContainerStyles={styles.buttonCall}
            onPress={handelNavigate}
          />
          <CustomButton
            colors={[COLORS.lightGray2]}
            icon={icons.Down}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
              resizeMode: 'contain',
            }}
            buttonContainerStyles={styles.buttonCall}
            onPress={() => setIsOpen(false)}
          />
        </View>
      </Modal>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 70,
    gap: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
  },
  title: {
    color: COLORS.black,
  },
  buttonCall: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
export default GettingCall;
