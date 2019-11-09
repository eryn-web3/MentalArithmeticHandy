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
  Linking,
  Modal,
  StatusBar,
  AsyncStorage,
  WebView,
  Alert
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import MAH_UTILS from '../../utils/MentalArithmeticHandyUtils'

// language
import __T from '../../translate/lang';

// custom component
import Loading from '../../components/common/Loading';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../../constants/config';

class MarkPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  timer: null

  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lang: this.props.lang.lang,
      mark: parseInt(this.props.navigation.state.params)
    }
  }


  /**
   * @method componentWillMount
   * @description This function is called component is loaded.
   */
  async componentWillMount() {

  }


  /**
   * @method componentWillReceiveProps
   * @description This function is called when props is passed to this element
   * @param props
   */
  async componentWillReceiveProps( nextProps ) {
    var lang = nextProps.lang.lang;
    this.setState({
      lang: lang,
    })
  }


  render() {

    var { mark, lang } = this.state
    mark = parseInt(mark) * 5 / 50;

    var descTxt = ''
    if( mark < 2 ) descTxt = __T[lang].mark.mark2;
    else if( mark < 3 ) descTxt = __T[lang].mark.mark3;
    else if( mark < 4 ) descTxt = __T[lang].mark.mark4;
    else if( mark < 4.7 ) descTxt = __T[lang].mark.mark4_7;
    else descTxt = __T[lang].mark.mark5;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content"/>
        <View style={styles.titleSec}>
          <Text style={styles.titleTxt}>{mark}</Text>
        </View>
        <View style={styles.descSec}>
          <Text style={styles.descTxt}>{descTxt}</Text>
        </View>
        <View style={styles.btnsSec}>
          <TouchableOpacity style={styles.btnElem} onPress={()=>{this.props.navigation.navigate('HomePage')}}>
            <Text style={styles.btnElemTxt}>{__T[lang].mark.retry}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW, 
    height:LH, 
    flex: 1,
    backgroundColor: Colors.mainBkColor
  },
  titleSec:{
    marginTop: RateWH>2 ? 150 : 120,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt:{
    fontSize: 120,
    fontWeight: 'bold',
    color: Colors.blueTextColor
  },
  descSec:{
    marginTop: 50,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  descTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blueTextColor,
    textAlign: 'center'
  },
  btnsSec: {
    width: LW,
    alignItems: 'center',
    marginTop: 100
  },
  btnElem: {
    alignItems: 'center',
    backgroundColor: Colors.blueDarkBkColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  btnElemTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.whiteTextColor
  },
});

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkPage);