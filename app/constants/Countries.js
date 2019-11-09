import React from 'react';
import {
  Image
} from 'react-native';

export default [
  {
    code: 'US',
    name: 'Unite State',
    language: 'English',
    flag: <Image
      source={require('../assets/images/flag/us.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'SP',
    name: 'Spain',
    language: 'Español',
    flag: <Image
      source={require('../assets/images/flag/sp.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'IT',
    name: 'Italy',
    language: 'Italiano',
    flag: <Image
      source={require('../assets/images/flag/it.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'RU',
    name: 'Russia',
    language: 'Pусский',
    flag: <Image
      source={require('../assets/images/flag/ru.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'NE',
    name: 'Netheland',
    language: 'Dutch',
    flag: <Image
      source={require('../assets/images/flag/ne.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'JP',
    name: 'Japan',
    language: '日本語',
    flag: <Image
      source={require('../assets/images/flag/jp.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'KR',
    name: 'Korea',
    language: '한국어',
    flag: <Image
      source={require('../assets/images/flag/kr.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
  {
    code: 'CN',
    name: 'China',
    language: '中文(简体)',
    flag: <Image
      source={require('../assets/images/flag/cn.png')}
      style={{width: 25, height: 25, marginRight: 10}}/>
  },
];
