import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {WebView} from 'react-native-webview';
import Routes from '../config/routesName';

Feather.loadFont();

const Browser = ({navigation, route}) => {
  const [headerTitle, setTitle] = useState('');
  const [isLoading, setLoading] = useState(true);
  console.log('route ', route);
  const handleBackButton = () => {
    console.log('HelloWorld');
    navigation.navigate(Routes.Dashboard);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => handleBackButton()}
          style={styles.backIconWrapper}>
          <Feather name="chevron-left" size={24} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{headerTitle}</Text>
      </View>
      <WebView
        source={{uri: route.params.URI}}
        onNavigationStateChange={({title, loading}) => {
          console.log('navState', title);
          console.log('navState', loading);
          setTitle(title);
          setLoading(loading);
        }}
      />
      {isLoading && (
        <View pointerEvents={'box-none'} style={styles.progressBarWrapper}>
          <ActivityIndicator style={styles.progressBar} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Browser;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backIconWrapper: {
    marginStart: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ebeae8',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '500',
    marginStart: 12,
    color: 'black',
  },
  progressBarWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
  },
  progressBar: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
