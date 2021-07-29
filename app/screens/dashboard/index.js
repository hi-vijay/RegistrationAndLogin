import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {FetchData} from '../../api/apiCall';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import Card from '../../components/EmployeeCard';
import * as strings from '../../res/strings';
import Routes from '../../config/routesName';

Feather.loadFont();

const EmployeeList = props => {
  const [mail, setMail] = useState('');
  const [empList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  console.log('rendered...');
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      FetchData()
        .then(data => {
          setList(data);
        })
        .catch(error => {
          console.log('error', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const data = useSelector(state => {
    console.log('selector', state);
    return state;
  });

  console.log('data ', data.mail);
  useEffect(() => {
    setMail(data.userName);
  }, []);

  const openProfile = URL => {
    props.navigation.navigate(Routes.Browser, {URI: URL});
  };

  const handleBackButton = () => {
    console.log('HelloWorld');
    Alert.alert(
      strings.ExitApp,
      strings.ExitAppSubTitle,
      [
        {
          text: strings.No,
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: strings.Yes, onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.rootContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              onPress={() => handleBackButton()}
              style={styles.backIconWrapper}>
              <Feather name="chevron-left" size={24} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleStyle}>{data.userName}</Text>
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              contentContainerStyle={{paddingBottom: 100}}
              data={empList}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => {
                return <Card employee={item} openProfile={openProfile} />;
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
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
    fontSize: 22,
    fontWeight: '600',
    marginStart: 16,
    color: 'black',
  },
  listWrapper: {
    paddingBottom: 80,
  },
});

export default EmployeeList;
