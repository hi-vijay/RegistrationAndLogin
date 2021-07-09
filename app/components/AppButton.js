import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

const AppButton = props => {
  console.log('props= ', props);
  const {
    onLoginClicked,
    progress = true,
    loginText = 'Login',
    isEnable = true,
    style = {},
  } = props;

  console.log('loginText= ', loginText);

  const backgroundColor = {
    backgroundColor: isEnable ? 'dodgerblue' : 'darkgrey',
    elevation: isEnable ? 4 : 0,
  };
  const textColor = {
    color: isEnable ? 'white' : 'grey',
  };
  return (
    <Pressable
      onPress={onLoginClicked}
      style={[styles.mainContainer, backgroundColor, style]}>
      <Text style={[styles.text, textColor]}>{loginText}</Text>

      <View style={styles.indicator}>
        {progress ? (
          <ActivityIndicator color={'white'} style={styles.progressBar} />
        ) : null}
      </View>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: 'grey',
    paddingVertical: 12,
    textAlign: 'center',
  },
  progressBar: {
    marginEnd: 12,
  },
  indicator: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
});
