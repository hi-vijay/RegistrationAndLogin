import React, {useState, useEffect} from 'react';
import {styles} from '../dashboard/styles';
import {FlatList, Text, View, ActivityIndicator} from 'react-native';

import Card from '../../components/EmployeeCard';

const URL = 'https://api.spacexdata.com/v4/crew';

const EmployeeList = props => {
  const [empList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  console.log('rendered...');
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      fetch(URL)
        .then(response => {
          response
            .json()
            .then(json => {
              console.log('data = ', json);
              //setList(JSON.parse(json));
              setList(json);
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              console.log('weird data');
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  console.log(empList);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={empList}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => {
            console.log('current Item= ', item);
            return <Card employee={item} />;
          }}
        />
      )}
    </View>
  );
};

export default EmployeeList;
