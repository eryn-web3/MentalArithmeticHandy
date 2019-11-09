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
import * as LangActions from '../../actions/lang';

// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Countries from '../../constants/Countries';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../../constants/config';

class HomePage extends React.Component {
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
      hash: '',
      loading: false,
      plate: 'Scan a plate',
      lang: config.defalutCountry,
      visibleLanguageModal: false,
    }

    this.onClickLanguage = this.onClickLanguage.bind(this);
  }


  /**
   * @method componentWillMount
   * @description This function is called component is loaded.
   */
  async componentWillMount() {
        
    Linking.getInitialURL().then(url => {
      MAH_UTILS.log(1, 'HomePage initialize url : ', url);
      if( url != undefined && url != null && url != '' )
        this.navigate(url);
    });

    var setLanguage = this.props.actions.LangActions.setLanguage;
    setLanguage(config.defalutCountry);
  }


  componentDidMount() { // B
    SplashScreen.hide();
    
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      MAH_UTILS.log(1, 'HomePage componentDidMount ios');
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }


  /**
   * @method componentWillUnmount
   * @description This function is called component is unmount.
   */
  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }


  handleOpenURL = (event) => { // D

    console.log('----- handleOpenURL event : ', event);
    this.navigate(event.url);
  }


  navigate = (url) => { // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
  
    MAH_UTILS.log(13, '------- HomePage navigate route : ', route);
    if( route.indexOf('home/restore/') > -1 ){      
      var hash = route.replace('home/restore/', '');
      MAH_UTILS.log(13, '------- HomePage navigate hash : ', hash);
      clearTimeout(this.timer);
      this.setState({
        hash: hash,
        isHash: true
      });
      return;
    }
  }


  /**
   * @method onClickLanguage
   * @description call when user click language on Language modal
   */
  selectLanguage( country ){
    var setLanguage = this.props.actions.LangActions.setLanguage;
    setLanguage(country.code);

    this.setState({
      visibleLanguageModal: false,
      lang: country.code
    })
  }


  /**
   * @method onClickLanguage
   * @description show language modal
   */
  onClickLanguage() {
    this.setState({visibleLanguageModal: true})
  }


  render() {

    var { lang, visibleLanguageModal } = this.state;
    console.log('-- HomePage render lang : ', lang);

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var country = MAH_UTILS.getCountry(lang);

    var languageElems = [];
    for( var i=0; i<Countries.length; i++ ){
      languageElems.push( <TouchableOpacity key={'c'+i} style={styles.dialogElem} onPress={this.selectLanguage.bind( this, Countries[i] )}>
        {Countries[i].flag}
        <Text style={styles.dialogElemText}>{Countries[i].language}</Text>
      </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content"/>
        <View style={styles.titleSec}>
          <Text style={styles.titleTxt}>{__T[lang].home.title}</Text>
        </View>
        <View style={styles.btnsSec}>
          <TouchableOpacity style={styles.btnElem} onPress={()=>{this.props.navigation.navigate('ArithmeticPage', 'add')}}>
            <Text style={styles.btnElemTxt}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnElem, {marginLeft: 20}]} onPress={()=>{this.props.navigation.navigate('ArithmeticPage', 'sub')}}>
            <Text style={styles.btnElemTxt}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnElem} onPress={()=>{this.props.navigation.navigate('ArithmeticPage', 'mul')}}>
            <Text style={styles.btnElemTxt}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnElem, {marginLeft: 20}]} onPress={()=>{this.props.navigation.navigate('ArithmeticPage', 'div')}}>
            <Text style={styles.btnElemTxt}>/</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.langSec}>          
          <TouchableOpacity style={styles.langValue} onPress={this.onClickLanguage}>
            {country.flag}
            <Text style={styles.langValueText}>{country.language}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.dialogWrap, {top: visibleLanguageModal == true ? 25 : -LH}]}>
          <View style={styles.dialogContent}>
            {languageElems}
          </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.blueTextColor,
    textAlign: 'center'
  },
  btnsSec: {
    width: LW-100,
    marginHorizontal: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RateWH>2 ? 100 : 80
  },
  btnElem: {
    width: (LW-100)/2-10,
    height: (LW-100)/2-10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueLightBkColor,
    borderRadius: 10,
    marginVertical: 10,
  },
  btnElemTxt:{
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.whiteTextColor
  },
  langSec: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 100,
  },
  langValue: {
    width: LW/5*2, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  langValueText: { 
    fontSize: 16,
    color: Colors.homeTextColor,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  dialogWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LW,
    height: LH,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 60,
    paddingLeft: LW/5*3-20
  },
  dialogContent: {
    width: LW/5*2,    
    backgroundColor: Colors.blueDarkBkColor,
    paddingVertical: 10, 
    borderRadius: 5
  },
  dialogElem: {
    height: 40,
    width: LW/5*2,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialogElemText: {
    fontSize: 16,
    color: Colors.whiteTextColor,
    textAlign: 'left'
  }
});

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      LangActions: bindActionCreators(LangActions, dispatch),
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);