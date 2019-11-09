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
import CircularTimer from 'react-native-circular-timer';
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

class ArithmeticPage extends React.Component {
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

    var mode = 'easy';
    var operator = this.props.navigation.state.params;
    var operandA = 0;
    var operandB = 0;
    var totalTime = 0;
    var totalProblems = 50;
    if( mode == 'easy' ){
      operandA = this.randomOperand(1, 9);
      operandB = this.randomOperand(1, 9);
      if( operator == 'add' || operator == 'sub' ) totalTime = totalProblems * 1.5
      else totalTime = totalProblems * 3
    } else if( mode == 'middle' ) {
      operandA = this.randomOperand(10, 99);
      operandB = this.randomOperand(10, 99);
    } else if( mode == 'difficult' ) {
      operandA = this.randomOperand(100, 999);
      operandB = this.randomOperand(100, 999);
    }

    if( operator == 'div' ){
      operandA = operandA*operandB
    }

    this.state = {
      loading: false,
      lang: this.props.lang.lang,
      operandA: operandA, 
      operandB: operandB, 
      mode: mode, 
      operator: operator, 
      answer: '?', 
      mark: 0,
      curProblemNum: 1, 
      totalProblems: totalProblems,
      totalTime: totalTime
    }

    this.randomOperand = this.randomOperand.bind( this );
    this.onNumber = this.onNumber.bind( this );
    this.onEnterAnswer = this.onEnterAnswer.bind( this );
    this.onEndArithmetic = this.onEndArithmetic.bind( this );
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
    console.log('-- ArithmeticPage componentWillReceiveProps lang : ', lang)
    this.setState({
      lang: lang,
    })
  }


  randomOperand( min, max ){
    return Math.floor( Math.random() * (max-min+1) + min )
  }


  onChangeMode( mode ){
    var { operandA, operandB, operator } = this.state;

    if( mode == 'easy' ){
      operandA = this.randomOperand(1, 9);
      operandB = this.randomOperand(1, 9);
    } else if( mode == 'middle' ) {
      operandA = this.randomOperand(10, 99);
      operandB = this.randomOperand(10, 99);
    } else if( mode == 'difficult' ) {
      operandA = this.randomOperand(100, 999);
      operandB = this.randomOperand(100, 999);
    }

    if( operator == 'div' ){
      operandA = operandA*operandB
    }

    this.setState({
      mode: mode,
      mark: 0,
      operandA: operandA,
      operandB: operandB,
      curProblemNum: 0,
      answer: '?'
    })
  }


  onNumber( num ){
    var { operandA, operandB, operator, answer, mode, mark, curProblemNum } = this.state;
    if( answer == 0 && num == 0 ) return;

    if( answer == '?' ) answer = ''
    if( num == '<-' ){
      answer = answer.slice(0, -1);
    } else {
      answer = '' + answer + num;
    }
    
    this.setState({
      answer: answer
    })
  }

  async onEnterAnswer(){
    var { operandA, operandB, operator, answer, mode, mark, curProblemNum, totalProblems } = this.state;

    var ans = 0;
    if( operator == 'add' ) {
      ans = operandA + operandB;
    } else if( operator == 'sub' ) {
      ans = operandA - operandB;
    } else if( operator == 'mul' ) {
      ans = operandA * operandB;
    } else if( operator == 'div' ) {
      ans = operandA / operandB;
    }

    if( answer == ans ) mark += 1;

    if( curProblemNum == totalProblems ){
      await this.setState({mark: mark});
      this.onEndArithmetic();
    }

    curProblemNum++; 
    if( mode == 'easy' ){
      operandA = this.randomOperand(1, 9);
      operandB = this.randomOperand(1, 9);
    } else if( mode == 'middle' ) {
      operandA = this.randomOperand(10, 99);
      operandB = this.randomOperand(10, 99);
    } else if( mode == 'difficult' ) {
      operandA = this.randomOperand(100, 999);
      operandB = this.randomOperand(100, 999);
    }

    if( operator == 'div' ){
      operandA = operandA*operandB
    }

    this.setState({
      mark: mark,
      operandA: operandA,
      operandB: operandB,
      curProblemNum: curProblemNum,
      answer: '?'
    })
  }

  onEndArithmetic() {
    this.props.navigation.navigate('MarkPage', ''+this.state.mark);
  }


  render() {

    var { lang, operandA, operandB, mode, operator, answer, mark, curProblemNum, totalTime, totalProblems } = this.state;
    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var operatorTxt = '';
    if( operator == 'add' ) operatorTxt = '+';
    else if( operator == 'sub' ) operatorTxt = '-';
    else if( operator == 'mul' ) operatorTxt = '*';
    else if( operator == 'div' ) operatorTxt = '/';

    var problemTxt = operandA + operatorTxt + operandB + '=' + answer;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content"/>
        
        <View style={styles.infoSec}>
          <View style={styles.modeBtnSec}>
            <TouchableOpacity style={[styles.modeBtnElem, {backgroundColor: mode == 'easy' ? Colors.redBkColor : Colors.blueDarkBkColor}]} onPress={()=>{this.onChangeMode('easy')}}>
              <Text style={styles.modeBtnElemTxt}>{__T[lang].arithmetic.easy}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modeBtnElem, {backgroundColor: mode == 'middle' ? Colors.redBkColor : Colors.blueDarkBkColor}]} onPress={()=>{this.onChangeMode('middle')}}>
              <Text style={styles.modeBtnElemTxt}>{__T[lang].arithmetic.middle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modeBtnElem, {backgroundColor: mode == 'difficult' ? Colors.redBkColor : Colors.blueDarkBkColor}]} onPress={()=>{this.onChangeMode('difficult')}}>
              <Text style={styles.modeBtnElemTxt}>{__T[lang].arithmetic.difficult}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timerSec}>
            <CircularTimer 
              onTimeElapsed={this.onEndArithmetic} 
              seconds={totalTime} 
              showSecond={false} 
              borderColor={Colors.blueLightBkColor} 
              borderBackgroundColor={Colors.blueDarkBkColor} 
              circleColor={Colors.mainBkColor}
              borderWidth={5}
              radius={60}
              secondStyle={{display: 'none'}}
              textStyle={{display: 'none'}}
              style={{marginLeft: 60}}/>
              <View style={styles.curProblemSec}>
                <Text style={{color: Colors.blueDarkBkColor, fontSize: 50, fontWeight: 'bold'}}>{curProblemNum}</Text>
                <Text style={{color: Colors.blueDarkBkColor, fontSize: 20, fontWeight: 'bold'}}>{__T[lang].arithmetic.of} {totalProblems}</Text>
              </View>
          </View>

        </View>
        <View style={styles.problemSec}>
          <Text style={styles.problemTxt}>{problemTxt}</Text>
        </View>
        <View style={styles.numBtnSec}>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(1)}}>
            <Text style={styles.numBtnElemTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(2)}}>
            <Text style={styles.numBtnElemTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(3)}}>
            <Text style={styles.numBtnElemTxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(4)}}>
            <Text style={styles.numBtnElemTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(5)}}>
            <Text style={styles.numBtnElemTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(6)}}>
            <Text style={styles.numBtnElemTxt}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(7)}}>
            <Text style={styles.numBtnElemTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(8)}}>
            <Text style={styles.numBtnElemTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(9)}}>
            <Text style={styles.numBtnElemTxt}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber(0)}}>
            <Text style={styles.numBtnElemTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numBtnElem} onPress={()=>{this.onNumber('-')}}>
            <Text style={styles.numBtnElemTxt}>-</Text>
          </TouchableOpacity>  
          <TouchableOpacity style={[styles.numBtnElem, {backgroundColor: Colors.redBkColor}]} onPress={()=>{this.onNumber('<-')}}>
            <Text style={styles.numBtnElemTxt}>{'<-'}</Text>
          </TouchableOpacity>     
          <TouchableOpacity style={styles.equalBtnElem} onPress={()=>{this.onEnterAnswer()}}>
            <Text style={styles.numBtnElemTxt}>=</Text>
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
  infoSec:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: RateWH>2 ? 70 : 40
  },
  modeBtnSec:{
    width: (LW-40)*3/7,
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  modeBtnElem: {
    width: (LW-40)*3/7 - 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueDarkBkColor,
    borderRadius: 10,
    marginVertical: 5,
  },
  modeBtnElemTxt:{
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.whiteTextColor
  },
  curProblemSec: {
    position: 'absolute',
    left: 80,
    top: 15,
    width: 80,
    alignItems: 'center',
  },
  problemSec:{
    marginTop: RateWH>2 ? 40 : 30,
    width: LW,    
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  problemTxt:{
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.blueTextColor
  },
  answerTxt:{
    fontSize: 90,
    fontWeight: 'bold',
    color: Colors.blueTextColor
  },
  numBtnSec:{
    marginTop: RateWH>2 ? 40 : 20,
    width: LW,    
    paddingHorizontal: 25,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  numBtnElem: {
    width: (LW-50)/3 - 10,
    height: ((LW-50)/3 - 10)*2/3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueLightBkColor,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5
  },
  numBtnElemTxt:{
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.whiteTextColor
  },
  equalBtnElem: {
    width: (LW-50)*3/3 - 10,
    height: ((LW-50)/3 - 10)*2/3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greenBkColor,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5
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
export default connect(mapStateToProps, mapDispatchToProps)(ArithmeticPage);