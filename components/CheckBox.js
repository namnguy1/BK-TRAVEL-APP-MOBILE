import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library
import { themeColors } from '../theme';

export default function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 4,
            marginRight: 8,
            backgroundColor: isChecked ? themeColors.bgColor(1) : 'transparent',
          }}
        >
          {isChecked && (
            <Icon name="check" size={20} color="white" /> // Adjust icon properties as needed
          )}
        </View>
       
      </View>
    </TouchableOpacity>
  );
}
