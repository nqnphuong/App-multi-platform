import {COLORS} from '@constants/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: 55,
    display: 'flex',
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  titleContainer: {
    flex: 1,
    padding: 8,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray,
  },
  title: {
    color: COLORS.gray,
  },
});

export default styles;
