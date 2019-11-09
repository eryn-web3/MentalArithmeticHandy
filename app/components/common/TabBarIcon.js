import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MAH_UTILS from '../../utils/MentalArithmeticHandyUtils'

const recog_icon_img = require('../../assets/images/icon/recog_icon.png');
const usage_icon_img = require('../../assets/images/icon/usage_icon.png');
const settings_icon_img = require('../../assets/images/icon/settings_icon.png');

const recog_icon_active_img = require('../../assets/images/icon/recog_icon_active.png');
const usage_icon_active_img = require('../../assets/images/icon/usage_icon_active.png');
const settings_icon_active_img = require('../../assets/images/icon/settings_icon_active.png');

import Colors from '../../constants/Colors';
const TAB_ICON_SIZE = 20;

export default class TabBarIcon extends React.Component {
  render() {
    var img = '';
    if( this.props.name === 'recog' ){
      img = this.props.focused ? recog_icon_active_img : recog_icon_img;
    } else if( this.props.name === 'usage' ){
      img = this.props.focused ? usage_icon_active_img : usage_icon_img;
    } else if( this.props.name === 'settings' ){
      img = this.props.focused ? settings_icon_active_img : settings_icon_img;
    }
    
    return (
      <View>
        <Image source={img} style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE}}/>
      </View>
    );
  }
}