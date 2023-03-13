import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Button, CheckBox } from 'react-native-elements';

const FilterOptionsScreen = (props) => {
  const {
    setBars,
    setShowFilterOptions,
    bars,
    setSelectedBarCoordinate,
    setSearchQuery,
    setShowSearchBar,
  } = props;
  const [selectedMusicTypes, setSelectedMusicTypes] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);
  const [selectedEntryFee, setSelectedEntryFee] = useState([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState([]);
  const [isGayBar, setIsGayBar] = useState(false);

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
      if (selectedPlaceType) {
        url += `clubtype=${selectedPlaceType}&`;
        console.log(selectedPlaceType);
      }
      if (isGayBar) {
        url += `gaybar=${isGayBar}&`;
        console.log(isGayBar);
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
  const isSelectedPlaceType = (type) => selectedPlaceType.includes(type);

  const toggleMusicType = (type) => {
    if (selectedMusicTypes.includes(type)) {
      setSelectedMusicTypes(selectedMusicTypes.filter((t) => t !== type));
    } else {
      setSelectedMusicTypes([...selectedMusicTypes, type]);
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text style={styles.biggertext}>Music Type</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="HipHop"
              onPress={() => toggleMusicType('hiphop')}
              buttonStyle={[
                isSelectedMusic('hiphop')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Rap"
              onPress={() => toggleMusicType('rap')}
              buttonStyle={[
                isSelectedMusic('rap') ? styles.selectedButton : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="2010s"
              onPress={() => toggleMusicType('2010s')}
              buttonStyle={[
                isSelectedMusic('2010s')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Pop"
              onPress={() => toggleMusicType('Pop')}
              buttonStyle={[
                isSelectedMusic('Pop') ? styles.selectedButton : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Jazz"
              onPress={() => toggleMusicType('Jazz')}
              buttonStyle={[
                isSelectedMusic('Jazz') ? styles.selectedButton : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
          </View>
        </View>
        <View>
          <Text style={styles.biggertext}>Entry Fee</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="FREE"
              onPress={() => setSelectedEntryFee('free')}
              buttonStyle={[
                isSelectedEntryFee('free')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Under $10"
              onPress={() => setSelectedEntryFee('under10')}
              buttonStyle={[
                isSelectedEntryFee('under10')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Over $10"
              onPress={() => setSelectedEntryFee('over10')}
              buttonStyle={[
                isSelectedEntryFee('over10')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
          </View>
        </View>

        <View>
          <Text style={styles.biggertext}>Place Type</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Night Club"
              onPress={() => setSelectedPlaceType('nightclub')}
              buttonStyle={[
                isSelectedPlaceType('nightclub')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Bar"
              onPress={() => setSelectedPlaceType('bar')}
              buttonStyle={[
                isSelectedPlaceType('bar')
                  ? styles.selectedButton
                  : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
            <Button
              title="Any"
              onPress={() => setSelectedPlaceType('')}
              buttonStyle={[
                isSelectedPlaceType('') ? styles.selectedButton : styles.button,
                styles.smallButton,
              ]}
              titleStyle={styles.smallButtonText}
            />
          </View>
        </View>
        <View style={styles.flexer}>
          <Text style={styles.biggertext}>Gay Bar</Text>
          <CheckBox
            checked={isGayBar === true}
            onPress={() => setIsGayBar(!isGayBar)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </View>

        <Button title="submit" onPress={handleFilterSubmit} />
        <Button title="Close" onPress={() => setShowFilterOptions(false)} />
        {/* render filtered bars */}

        {bars.map((bar) => (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery(bar.companyname);
              setSelectedBarCoordinate({
                latitude: bar.location.coordinates[0],
                longitude: bar.location.coordinates[1],
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
              });
              setShowFilterOptions(false);
              setShowSearchBar(true);
            }}
          >
            <View key={bar._id}>
              <Text>{bar.companyname}</Text>
              <Text>
                {bar.location.streetname}, {bar.location.suburb}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default FilterOptionsScreen;

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: 'green',
  },
  biggertext: {
    fontSize: 24,
  },
  flexer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,

    maxWidth: '100%',
    marginTop: 10,
  },
  smallButton: {
    margin: 5,
  },
  smallButtonText: {
    fontSize: 12,
  },
});
