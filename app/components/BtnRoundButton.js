import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

Feather.loadFont();

const getShadow = ({
  width = 0,
  height = 0,
  color = '#aaaaaa',
  opacity = 0.3,
  radius = 5,
} = {}) => {
  return {
    shadowColor: color,
    shadowOffset: {
      width,
      height,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: 3,
  };
};

const BtnRound = props => {
  return (
    <TouchableOpacity
      style={[
        {
          height: props.size || 30,
          width: props.size || 30,
          borderRadius: props.size || 30,
          backgroundColor: props.color || Colors.cartButtonColor,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
          backfaceVisibility: 'hidden',
          ...getShadow(),
        },
      ]}
      activeOpacity={0.7}
      onPress={props.onPress}>
      {props.customIcon ? (
        props.customIcon
      ) : (
        <Feather
          solid={props.solid}
          name={props.icon}
          size={props.iconSize || 18}
          color={props.iconColor || 'lightgrey'}
        />
      )}
    </TouchableOpacity>
  );
};

BtnRound.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
  customIcon: PropTypes.node,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  solid: PropTypes.bool,
  style: PropTypes.instanceOf(PropTypes.any),
};

BtnRound.defaultProps = {
  size: 30,
  color: 'dodgerblue',
  onPress: null,
  customIcon: null,
  iconSize: 18,
  iconColor: 'lightgrey',
  solid: false,
  style: null,
};

export default BtnRound;
