import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';

const FilterOptionsScreen = (props) => {
  const { setBars, setShowFilterOptions, bars } = props;
  const [selectedMusicTypes, setSelectedMusicTypes] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);
  const [selectedEntryFee, setSelectedEntryFee] = useState([]);

  const handleFilterSubmit = async () => {
    try {
      let url = 'http://192.168.1.108:3001/api/bars?';
      if (selectedMusicTypes.length > 0) {
        url += `musictype=${selectedMusicTypes.join()}&`;
        console.log(selectedMusicTypes);
      }
      if (selectedEntryFee) {
        url += `entryfee=${selectedEntryFee}&`;
        console.log(selectedEntryFee);
      }
      const response = await fetch(url.slice(0, -1));
      const data = await response.json();
      // pass the filtered bars back to Home component
      setBars(data);

      // set the filtered bars state variable
      setFilteredBars(data);

      // log companyname of each bar
      console.log(data.map((bar) => bar.companyname));
    } catch (error) {
      console.error(error);
    }
  };

  const isSelectedMusic = (type) => selectedMusicTypes.includes(type);
  const isSelectedEntryFee = (type) => selectedEntryFee.includes(type);

  const toggleMusicType = (type) => {
    if (selectedMusicTypes.includes(type)) {
      setSelectedMusicTypes(selectedMusicTypes.filter((t) => t !== type));
    } else {
      setSelectedMusicTypes([...selectedMusicTypes, type]);
    }
  };

  return (
    <View>
      <View>
        <Text>Music Type</Text>
        <Button
          title="HipHop"
          onPress={() => toggleMusicType('Hip Hop')}
          buttonStyle={
            isSelectedMusic('Hip Hop') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="Rap"
          onPress={() => toggleMusicType('rap')}
          buttonStyle={
            isSelectedMusic('rap') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="2010s"
          onPress={() => toggleMusicType('2010s')}
          buttonStyle={
            isSelectedMusic('2010s') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="Pop"
          onPress={() => toggleMusicType('Pop')}
          buttonStyle={
            isSelectedMusic('Pop') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="Jazz"
          onPress={() => toggleMusicType('Jazz')}
          buttonStyle={
            isSelectedMusic('Jazz') ? styles.selectedButton : styles.button
          }
        />
      </View>
      <View>
        <Text>Entry Fee</Text>
        <Button
          title="FREE"
          onPress={() => setSelectedEntryFee('free')}
          buttonStyle={
            isSelectedEntryFee('free') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="Under $10"
          onPress={() => setSelectedEntryFee('under10')}
          buttonStyle={
            isSelectedEntryFee('under10')
              ? styles.selectedButton
              : styles.button
          }
        />
        <Button
          title="Over $10"
          onPress={() => setSelectedEntryFee('over10')}
          buttonStyle={
            isSelectedEntryFee('over10') ? styles.selectedButton : styles.button
          }
        />
        <Button
          title="Any"
          onPress={() => setSelectedEntryFee('')}
          buttonStyle={
            isSelectedEntryFee('') ? styles.selectedButton : styles.button
          }
        />
      </View>

      <Button title="submit" onPress={handleFilterSubmit} />
      <Button title="Close" onPress={() => setShowFilterOptions(false)} />
      {/* render filtered bars */}
      {bars.map((bar) => (
        <View key={bar._id}>
          <Text>{bar.companyname}</Text>
          <Text>
            {bar.location.streetname}, {bar.location.suburb}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default FilterOptionsScreen;

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: 'green',
  },
  button: {
    width: '20%',
    display: 'flex',
  },
});
