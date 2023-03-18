import React from 'react';
import { Picker } from '@react-native-picker/picker';

export default function Times({ dayTimes, setDayTimes, day, type }) {
  return (
    <Picker
      selectedValue={dayTimes[day][type]}
      style={{ width: '45%' }}
      onValueChange={(itemValue) =>
        setDayTimes({
          ...dayTimes,
          [day]: { ...dayTimes[day], [type]: itemValue },
        })
      }
    >
      <Picker.Item label="Select Open Time" value="" />
      <Picker.Item label="12:00 AM" value="00:00" />
      <Picker.Item label="1:00 AM" value="01:00" />
      <Picker.Item label="2:00 AM" value="02:00" />
      <Picker.Item label="3:00 AM" value="03:00" />
      <Picker.Item label="4:00 AM" value="04:00" />
      <Picker.Item label="5:00 AM" value="05:00" />
      <Picker.Item label="6:00 AM" value="06:00" />
      <Picker.Item label="7:00 AM" value="07:00" />
      <Picker.Item label="8:00 AM" value="08:00" />
      <Picker.Item label="9:00 AM" value="09:00" />
      <Picker.Item label="10:00 AM" value="10:00" />
      <Picker.Item label="11:00 AM" value="11:00" />
      <Picker.Item label="12:00 PM" value="12:00" />
      <Picker.Item label="1:00 PM" value="13:00" />
      <Picker.Item label="2:00 PM" value="14:00" />
      <Picker.Item label="3:00 PM" value="15:00" />
      <Picker.Item label="4:00 PM" value="16:00" />
      <Picker.Item label="5:00 PM" value="17:00" />
      <Picker.Item label="6:00 PM" value="18:00" />
      <Picker.Item label="7:00 PM" value="19:00" />
      <Picker.Item label="8:00 PM" value="20:00" />
      <Picker.Item label="9:00 PM" value="21:00" />
      <Picker.Item label="10:00 PM" value="22:00" />
      <Picker.Item label="11:00 PM" value="23:00" />
    </Picker>
  );
}
