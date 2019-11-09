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
  StatusBar
} from 'react-native';


import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../../constants/config';
const CURRENCYARR = config.currencyArr
const CURRENCY = config.currencyMap


export default class Page extends React.Component {

    handleClick() {
        const { isDisabled, pageNumber } = this.props;
        if (isDisabled) {
            return;
        }
        this.props.onClick(pageNumber);
    }

    render() {
        var {
            pageText,
            pageNumber,
            activeClass,
            itemClass,
            linkClass,
            activeLinkClass,
            disabledClass,
            isActive,
            isDisabled,
            href
        } = this.props;

        return (
            <TouchableOpacity style={[styles.itemClass, isActive? styles.active : {}, isDisabled? styles.disabled : {}]} onPress={()=>{this.handleClick()}}>
                <Text style={[styles.linkClass, isActive? styles.activeLinkClass : {} ]}>{pageText}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    itemClass: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 30, 
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 5
    },
    active: {
        backgroundColor: Colors.buttonColorCyan
    },
    disabled: {

    },
    linkClass: {
        fontSize: 12,
        color: Colors.textColorBlueOpacity
    },
    activeLinkClass: {
        fontSize: 12,
        color: '#fff'
    }
})