import React, { Component } from 'react';
import { ActivityIndicator, Image, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MAH_UTILS from '../../utils/MentalArithmeticHandyUtils'

import { colors } from '../../utils/constants'

const BackImage = styled.Image`
    width: 13px;
	height: 25px;
`;
const Root = styled.View`
    backgroundColor: #fff;
    height: 45;
    position: relative;
    justifyContent: center;
    alignItems: center;
    flexDirection: row;
    paddingHorizontal: 10
`;
const HeaderText = styled.Text`
    color: #007aff;
    fontWeight: bold;
    fontSize: 18;
`;
const BackText = styled.Text`
    color: #007aff;
    fontWeight: bold;
    fontSize: 16;
`;


class Header extends Component {   
    
    render(){
        // var onPress = () => this.props.navigation.goBack();
        var onPress = () => {MAH_UTILS.log(2, 'press')};
        if( this.props.backNavigate !== undefined && this.props.backNavigate !== null ){
            onPress = () => this.props.backNavigate(this.props.nav);
        }	
        var fontColor = (this.props.fontColor !== undefined && this.props.fontColor !== null) ? this.props.fontColor : "#007aff";
        var bkColor = (this.props.bkColor !== undefined && this.props.bkColor !== null) ? this.props.bkColor : "#fff";
        
        return (
            <Root style={{backgroundColor:bkColor, alignItems: 'center'}}>
                <TouchableOpacity onPress={onPress} style={{flex: 1}}>
                    <View style={{flex:1, flexDirection:"row", alignItems: 'center',}}>
                        <Icon name="angle-left" size={40} color={fontColor} style={{marginRight: 5}}/>
                        <BackText style={{color:fontColor}}>{this.props.backText}</BackText>                
                    </View>
                </TouchableOpacity>
                <HeaderText style={{color:fontColor, flex: 1, textAlign: "center"}}>{this.props.headerText}</HeaderText>
                <TouchableOpacity onPress={()=>{}} style={{flex: 1}}>
                    <View style={{flex:1, flexDirection:"row", alignItems: 'center'}}>             
                    </View>                
                </TouchableOpacity>
            </Root>
            
        );
    }
        
}

export default connect( state=>({
    nav: state.nav
}))(Header);
	