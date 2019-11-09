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
import Icon from 'react-native-vector-icons/FontAwesome';
import MAH_UTILS from '../../utils/MentalArithmeticHandyUtils'

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;

export default class NotifyAlert extends React.Component {


  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
      visibleNotify: this.props.visibleNotify,
      notifyTxt: this.props.notifyTxt
    }    
  }


  /**
   * @method componentWillMount
   * @description This function is called component is loaded.
   */
  componentWillMount() {
    
  }


  /**
   * @method componentWillReceiveProps
   * @description This function is called when props is passed to this element
   * @param props
   */
  async componentWillReceiveProps( nextProps ) {
    console.log('-- notifyAlert componentWillReceiveProps nextProps : ', nextProps);
    this.setState({
      visibleNotify: nextProps.visibleNotify,
      notifyTxt: nextProps.notifyTxt
    })
  }


  /**
   * @method render
   * @description This is renderfunction
   */
  render() {    
    var { okBtnCallback, okBtnTxt } = this.props;
    var { visibleNotify, notifyTxt } = this.state;

    var okBtn = <View></View>
    if( !okBtnCallback ){
      okBtn = <View></View>
    } else {
      okBtn = 
      <TouchableOpacity style={styles.okBtn} onPress={()=>{okBtnCallback()}}>
        <Text style={{color: '#fff', fontSize: 14, textAlign: 'center'}}>{okBtnTxt}</Text>
      </TouchableOpacity>
    }

    return (
      <View style={[styles.notifyWrap, {display: (visibleNotify === true) ? 'flex' : 'none'}]}>
        <View style={[styles.notifyWrap1, {display: (visibleNotify === true) ? 'flex' : 'none'}]}>
          <View style={styles.notifyContent}>                  
            <View style={styles.notifyTxt}>
              <Text style={{fontSize: 14, color: '#fff'}}>{notifyTxt}</Text>
            </View> 
            {okBtn}
            <TouchableOpacity style={styles.closeBtn} onPress={()=>{this.props.closeNotify()}}>
              <Icon name="times" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  notifyWrap: {
    position: 'absolute',
    left: 0,
    top: 0    
  },
  notifyWrap1: {
    width: LW,
    height: LH,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: Platform.select({
      ios: (RateWH > 2) ? (LH-200)/2-40 : (LH-200)/2-40, 
      android:(LH-LH/5.5)/2-80
    }),
  },
  notifyContent: {
    width: LW - 40,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  closeBtn: {
    position: 'absolute',
    top: 10, 
    right: 20,
    width: 20,
    height: 20,
    backgroundColor: Colors.buttonColorCyan,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    paddingTop: 2,
    paddingLeft: 3,
  },
  okBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.buttonColorCyan ,
    marginBottom: 10
  },
  notifyTxt: {
    paddingVertical: 30,
    paddingTop: 40
  }
  
});
