import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import Badge from '../components/Badge';

const Card = props => {
  console.log('card props= ', props);
  const {name, agency, image, wikipedia} = props.employee;

  const openProfile = () => {
    Linking.openURL(wikipedia);
    console.log('profile URL= ', wikipedia);
  };

  return (
    <View style={styles.parentContainer}>
      <Image source={{url: image}} style={styles.profileImage} />
      <View style={{justifyContent: 'space-between'}}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.agency}>{agency}</Text>
            <View style={{flexDirection: 'row', flexShrink: 1, marginStart: 8}}>
              <Badge employee={props.employee} />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 12, marginTop: 12}}>
          <Text onPress={openProfile} style={styles.url}>
            Wikipedia
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#BFDFFC',
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 4,
  },
  nameContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    margin: 16,
    borderRadius: 80 / 2,
    borderWidth: 1,
    borderColor: '#b3b3b3',
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 16,
  },
  agency: {
    fontWeight: '300',
    fontSize: 14,
    marginTop: 4,
  },
  url: {
    bottom: 0,
    color: '#086ebd',
  },
});

export default Card;
