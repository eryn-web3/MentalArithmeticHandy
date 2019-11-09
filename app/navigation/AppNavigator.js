import React, { Component } from 'react';
import { Image } from 'react-native';

import { createSwitchNavigator } from 'react-navigation';

import AuthStackNavigator from './AuthStackNavigator';

export default AppNavigator = createSwitchNavigator({
  Auth: AuthStackNavigator,
});
