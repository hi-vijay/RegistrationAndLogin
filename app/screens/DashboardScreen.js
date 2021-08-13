/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {FetchData} from '../api/apiCall';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import Card from '../components/EmployeeCard';
import images from '../assets/imagePath';
import {
  ExitApp,
  ExitAppSubTitle,
  No,
  Yes,
  Delete,
} from '../assets/Strings/strings';
import Routes from '../config/routesName';

Feather.loadFont();

const EmployeeList = props => {
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
    return state;
  });

  const openProfile = URL => {
    props.navigation.navigate(Routes.Browser, {URI: URL});
  };

  const handleBackButton = () => {
    Alert.alert(
      ExitApp,
      ExitAppSubTitle,
      [
        {
          text: No,
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: Yes, onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  const handleDelete = ({name, index}) => {
    console.log(name, index);
    Alert.alert(
      Delete,
      `Delete ${name}?`,
      [
        {
          text: No,
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: Delete,
          onPress: () => {
            const temp = Object.assign([], empList);
            temp.splice(index, 1);
            setList(temp);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.rootContainer}>
      {isLoading ? (
        <ActivityIndicator style={{flex: 1}} />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              onPress={() => handleBackButton()}
              style={styles.backIconWrapper}>
              <Feather name="chevron-left" size={24} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleStyle}>Dashboard</Text>
          </View>
          <View style={styles.listWrapper}>
            {empList.length !== 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 100}}
                data={empList}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}) => {
                  return (
                    <Card
                      index={index}
                      employee={item}
                      openProfile={openProfile}
                      onDelete={handleDelete}
                    />
                  );
                }}
              />
            ) : (
              <View style={styles.emptyImageWrapper}>
                <Image source={images[11]} style={styles.emptyListImage} />
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  headerWrapper: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f3f6fb',
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
    paddingBottom: 60,
  },
  emptyImageWrapper: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: '40%',
  },
  emptyListImage: {
    width: 240,
    height: 240,
    alignSelf: 'center',
  },
});

export default EmployeeList;
