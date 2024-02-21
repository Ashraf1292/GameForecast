import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import openMap from 'react-native-open-maps';

const GamePage = () => {
  const [playing, setPlaying] = useState(false);

  const goToYosemite = () => {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  };

  return (
    <View style={styles.container}>
      <YoutubeIframe
        height={300}
        play={playing}
        videoId={"o1igaMv46SY"}
        //onChangeState={onStateChange}
      />
      <Button
        color={'#bdc3c7'}
        onPress={goToYosemite}
        title="Click To Open Maps 🗺"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GamePage;
