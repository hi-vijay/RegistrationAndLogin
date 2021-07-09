import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainConainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButtonBackground: {
    width: '100%',
    height: 60,
    backgroundColor: 'tomato',
    justifyContent: 'center',
  },
  signUpButtonBackground: {
    width: '100%',
    height: 60,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
  },
});

export default styles;
