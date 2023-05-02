import React from 'react';
import {Dimensions, Image, PixelRatio, StyleSheet, View} from 'react-native';
import tw from 'twrnc';

const {width} = Dimensions.get('window');

interface Props {
  image: any;
}

const ImageItem: React.FC<Props> = ({image}: any) => {
  PixelRatio.getPixelSizeForLayoutSize(width);

  return (
    <View>
      <Image
        source={image.image ? {uri: image.image} : {uri: image.item.image}}
        style={[styles.image, tw`h-full`]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
  },
});

export default ImageItem;
