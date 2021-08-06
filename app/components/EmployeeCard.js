import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Badge from '../components/Badge';
import images from '../assets/imagePath';
import Feather from 'react-native-vector-icons/Feather';
import * as strings from '../assets/Strings/strings';

Feather.loadFont();
const Card = props => {
  //console.log('card props= ', props);
  const {name = '', agency, image = '', wikipedia = ''} = props.employee;
  const {index} = props;

  const openProfile = () => {
    props.openProfile(wikipedia);
  };
  return (
    <View
      style={[styles.rootContainer, {marginTop: props.index === 0 ? 12 : 6}]}>
      {image !== '' ? (
        <Image source={{url: image}} style={styles.profileImage} />
      ) : (
        <Image source={images[0]} style={styles.profileImage} />
      )}
      <View style={styles.detailsContainer}>
        {/* User details layout */}
        <View style={styles.detailsWrapper}>
          {name !== '' ? (
            <Text style={styles.name}>{name}</Text>
          ) : (
            <Text style={styles.noNameStyle}>{strings.NoUserName}</Text>
          )}
          <View style={styles.agencyStatusWrapper}>
            <Text style={styles.agency}>{agency}</Text>
            <View style={{marginStart: 8}}>
              <Badge employee={props.employee} />
            </View>
          </View>
          <View style={{marginBottom: 12, marginTop: 8}}>
            {wikipedia !== '' && (
              <Text onPress={openProfile} style={styles.url}>
                {strings.Wikipedia}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.onDelete({name, index})}
          style={styles.deleteIconWrapper}>
          <Feather name={'trash'} size={22} color={'grey'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 12,
    shadowOpacity: 14,
    shadowColor: 'lightgrey',
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    elevation: 4,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 60,
    height: 60,
    margin: 16,
    borderRadius: 80 / 2,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 16,
  },
  noNameStyle: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 16,
    color: 'lightgrey',
    fontStyle: 'italic',
  },
  detailsWrapper: {
    flex: 0.9,
    flexDirection: 'column',
    flexGrow: 1,
  },
  agencyStatusWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  agency: {
    fontWeight: '500',
    color: 'grey',
    fontSize: 14,
  },
  url: {
    color: '#086ebd',
    fontSize: 14,
  },
  deleteIconWrapper: {
    marginTop: 18,
    marginEnd: 16,
    height: 28,
  },
});

export default Card;
