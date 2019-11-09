import React from 'react';
import { ActivityIndicator, Image, TouchableHighlight, TouchableOpacity } from 'react-native'


export default function Back({ navigation } = {}){
    const onPress = () => navigation.goBack();

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require('../../assets/images/icon/arrow.png')} style={{width:13, height:25}}
            />
        </TouchableOpacity>
    );    
}
