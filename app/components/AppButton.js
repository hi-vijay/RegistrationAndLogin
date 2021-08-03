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
    progress = false,
    loginText = 'Login',
    isEnable = true,
    style = {},
  } = props;

  console.log('loginText= ', loginText);

  const backgroundColor = {
    borderColor: isEnable ? 'dodgerblue' : '#cfd2d4',
    backgroundColor: isEnable ? 'dodgerblue' : '#cfd2d4',
  };
  const textColor = {
    color: isEnable ? 'white' : 'grey',
  };
  return (
    <Pressable
      onPress={onLoginClicked}
      style={[styles.mainContainer, style, backgroundColor]}>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#878a8c',
    paddingVertical: 16,
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
