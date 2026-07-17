import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({ label, iconName, error, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? 'red'
              : isFocused
                ? 'darkBlue'
                : 'light',
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{ color: 'darkBlue', fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={{ color: 'darkBlue', flex: 1 }}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ marginLeft: 10, marginTop: -5, color: 'red', fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: 'black',
    marginLeft: 30,
  },
  inputContainer: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Input;