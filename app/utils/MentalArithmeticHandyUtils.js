import Countries from '../constants/Countries'
import config from '../constants/config'

const LOG_LEVEL = 12  // 5: error, 4: important, 3: start-end, 2: medium, 1: low
/**
 * @class Utils
 * @description util class
 */
class MentalArithmeticHandyUtils {

  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor() {
    
  }


  /**
   * @method copyObject
   * @description this function is to copy each key and value to new object.
   * @param obj 
   */
  copyObject( newObj, oldObj ) {
    for (var prop in oldObj) {
      if (oldObj.hasOwnProperty(prop)) {
        newObj[prop] = oldObj[prop];
      }
    }
  }


  /**
   * @method littleToBigEndian
   * @description this function is to convert little-endian hex string to big-endian.
   * @param leHexStr 
   */
  littleToBigEndian( leHexStr ) {
    var beHexStr = ''
    for( var i=0; i<leHexStr.length; i=i+2){
      var str = leHexStr.slice(i,i+2);
      beHexStr = str + beHexStr
    }
    return beHexStr;
  }


  /**
   * @method textEllipsis
   * @description This function is to get coin from symbol string.
   * @param text 
   * @param length
   * @return ellipsis
   */
  textEllipsis (text, length) {
    var ret = text;
    if( text.length > length ){
      ret = text.slice(0,length) + '...';
    }

    return ret;
  }


  /**
   * @method textEllipsis
   * @description This function is to get coin from symbol string.
   * @param text 
   * @param length
   * @return ellipsis
   */
  floatLimitText (fVal, length) {
    var ret = '' + fVal;
    if( ret.length > length ){
      ret = ret.slice(0,length);
    }

    return ret;
  }


  /**
   * @method getCountry
   * @description get country info.
   * @param - code: country code (ex: 'IT')
   * @returns country info
   */
  getCountry( code ) {
    for( var i=0; i<Countries.length; i++ ){
      if( Countries[i].code == code ) return Countries[i]
    }
    return ''
  }


  log(){
    var level = arguments[0]
    if( level < LOG_LEVEL ) return;

    var args = [];
    for( var i=1; i<arguments.length; i++ ){
      args.push( arguments[i] );
    }
    console.log( args );
  }
}

export default new MentalArithmeticHandyUtils()