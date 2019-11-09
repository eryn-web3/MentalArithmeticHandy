import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import MAH_UTILS from '../../utils/MentalArithmeticHandyUtils'

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;

export default class Loading extends React.Component {

  /**
   * @method render
   * @description This is renderfunction
   */
  render() {
    var { type } = this.props;
    return (
      <View style={styles.loadinglStyle}>      
        <Image
          source={require('../../assets/images/loading.gif')}           
          style={{width: 30, height: 30}}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  loadinglStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
