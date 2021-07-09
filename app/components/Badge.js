import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const colors = {
  active: '#57AAF4',
};

const Badge = props => {
  const {status} = props.employee;

  const getStatus = status => {
    const s = status.charAt(0).toUpperCase() + status.slice(1);
    return s;
  };
  console.log(getStatus);
  return (
    <View style={styles.parent}>
      <Text color="#fff" style={styles.text}>
        {getStatus(status)}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#57AAF4',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
