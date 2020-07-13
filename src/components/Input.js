import React from 'react';
import { View, TextInput, Text } from 'react-native';

export default Input = ({title, placeholder, onChangeText, value, keyboardType}) => {
    return(
        <View>
            <Text style={{fontWeight:'bold'}}>{title}</Text>
            <TextInput
                placeholder = {placeholder}
                onChangeText={text => onChangeText(text)}
                value={value}
                keyboardType = {keyboardType}
            />
        </View>
    )
}