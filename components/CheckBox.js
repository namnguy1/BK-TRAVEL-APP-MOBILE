import React, { useState,useEffect  } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library
import { themeColors } from '../theme';


export default function CheckBox({ tourId, isChecked,setIsChecked, selectedTour, setSelectedTour ,reloadList,setReloadList}) {
  // const [isChecked, setIsChecked] = useState(false);

  // const toggleCheckbox = () => {
  //   setIsChecked(!isChecked);
  // };
  // console.log('selectedTour', selectedTour);
  const handleCheckboxToggle = () => {
    if (selectedTour.includes(tourId)) {
      // Nếu tourId đã được chọn thì loại bỏ nó khỏi mảng
      const updatedSelectedTour = selectedTour.filter(item => item !== tourId);
      setSelectedTour(updatedSelectedTour);
      setIsChecked(false);
    } else {
      // Nếu tourId chưa được chọn thì thêm nó vào mảng
      const updatedSelectedTour = [...selectedTour, tourId];
      setSelectedTour(updatedSelectedTour);
      setIsChecked(true);
    }
  };
  useEffect(() => {
    setIsChecked(selectedTour.includes(tourId));
  }, [selectedTour]);
  useEffect(() => {
    // console.log('reloadList', reloadList);
    if (reloadList) {
      setSelectedTour([]);
      setIsChecked(false);
      setReloadList(false);
    }
  }, [reloadList]);

  return (
    <TouchableOpacity onPress={handleCheckboxToggle}>
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
          {selectedTour.includes(tourId) && isChecked && (
            <Icon name="check" size={20} color="white" /> // Điều chỉnh thuộc tính của icon nếu cần thiết
          )}
        </View>

      </View>
    </TouchableOpacity>
  );
}
