import React, {useRef, useState} from 'react';
import {View, TextInput, Image, StyleSheet, Pressable} from 'react-native';
import images from '../assets/imagePath';

const ICON_SIZE = 24;

const TextInputLayout = props => {
  const {
    style = {},
    margin = {},
    onFocusColor = 'dodgerblue',
    secureEntry = false,
    imageURI = '',
  } = props;
  const [isFocused, setFocused] = useState(false);
  const [passwordVisibility, setShowOrHidePassword] = useState(secureEntry);
  const inputField = useRef(null);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const showOrHidePassword = () => {
    setShowOrHidePassword(!passwordVisibility);
    inputField.current.focus();
  };
  const borderColor = {
    borderColor: isFocused ? onFocusColor : '#C7C1C1',
    paddingEnd: secureEntry ? 44 : 10,
  };

  return (
    <View style={[styles.mainContainer, margin]}>
      {imageURI !== '' ? (
        <View style={styles.startIcon}>
          <Image style={styles.imageIcon} source={imageURI} />
        </View>
      ) : null}
      <TextInput
        ref={inputField}
        placeholderTextColor={'grey'}
        style={[styles.defaultInput, style, borderColor]}
        secureTextEntry={passwordVisibility}
        onChangeText={val => props.onChangeText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {secureEntry ? (
        <View pointerEvents={'box-none'} style={styles.togglePassword}>
          <Pressable onPress={showOrHidePassword}>
            <Image
              style={styles.icon}
              source={passwordVisibility ? images[3] : images[4]}
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default TextInputLayout;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 2,
  },
  startIcon: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  defaultInput: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500',
    borderBottomWidth: 2,
  },
  togglePassword: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginEnd: 10,
  },
  imageIcon: {
    width: 18,
    height: 18,
    marginStart: 2,
  },
});
