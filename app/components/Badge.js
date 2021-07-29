import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Badge = props => {
  const {status} = props.employee;

  const getStatus = text => {
    const s = text.charAt(0).toUpperCase() + text.slice(1);
    return s;
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.text}>{getStatus(status)}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#D5F7DA',
  },
  text: {
    color: '#009118',
    fontSize: 12,
    fontWeight: '500',
  },
});
