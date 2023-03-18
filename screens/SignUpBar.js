import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import {
  Input,
  CheckBox,
  ButtonGroup,
  Button,
  Switch,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import Times from '../components/Times';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const MUSIC_GENRES = [
  'Rock',
  'Pop',
  'Electronic',
  'Hip Hop/Rap',
  'Jazz',
  'R&B',
  'Country',
  'Other',
];
const CLUB_TYPES = ['bar', 'nightclub'];

async function getCoordinates(address) {
  const apiKey = 'AIzaSyAN6V0dogqn0Kfa7CFwKRWj7Qd0xfvat28';
  const encodedAddress = encodeURIComponent(address);
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      console.log(`got address so getCoordinates working ${lng}`);
      return [lng, lat];
    } else {
      console.log('No results found for the address');
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

export default function BarSignUp() {
  const [profileImage, setProfileImage] = useState(null);
  const [gayBar, setGayBar] = useState(false);
  const [dayTimes, setDayTimes] = useState({});
  const [selectedMusicTypes, setSelectedMusicTypes] = useState([]);
  const [customMusicType, setCustomMusicType] = useState('');
  const [clubType, setClubType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState({
    type: 'Point',
    coordinates: [],
    address: {
      streetNumber: '',
      streetName: '',
      suburb: '',
      city: '',
      postCode: '',
    },
  });
  const updateCoordinates = async () => {
    const addressString = `${location.address.streetNumber}${location.address.streetName},${location.address.suburb},${location.address.city},${location.address.postCode}`;
    const coordinates = await getCoordinates(addressString);
    setLocation((prevState) => ({
      ...prevState,
      coordinates: coordinates,
    }));
  };

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const firstAsset = result.assets[0];
      setProfileImage(firstAsset.uri);
    }
  }

  const toggleDay = (dayIndex) => {
    if (dayTimes[DAYS[dayIndex]]) {
      const newDayTimes = { ...dayTimes };
      delete newDayTimes[DAYS[dayIndex]];
      setDayTimes(newDayTimes);
    } else {
      setDayTimes({ ...dayTimes, [DAYS[dayIndex]]: { open: '', close: '' } });
    }
  };

  const toggleMusicType = (genreIndex) => {
    setSelectedMusicTypes((prevMusicTypes) => {
      if (prevMusicTypes.includes(genreIndex)) {
        if (genreIndex === MUSIC_GENRES.length - 1) {
          setCustomMusicType('');
        }
        return prevMusicTypes.filter((item) => item !== genreIndex);
      } else {
        return [...prevMusicTypes, genreIndex];
      }
    });
  };

  const handleSubmit = async () => {
    const addressString = `${location.address.streetNumber}${location.address.streetName},${location.address.suburb},${location.address.city},${location.address.postCode}`;
    const coordinates = await getCoordinates(addressString);
    console.log(coordinates);
    // Check if the coordinates are available
    if (!location.coordinates) {
      alert('Please enter a valid address to get the coordinates.');
      return;
    }

    const selectedMusicGenres = selectedMusicTypes
      .map((index) =>
        index === MUSIC_GENRES.length - 1
          ? customMusicType
          : MUSIC_GENRES[index]
      )
      .flatMap((genre) => genre.split(',').map((g) => g.trim()));

    if (!coordinates) {
      alert('Could not get coordinates for the address. Please try again.');
      return;
    }

    const barData = {
      companyname: companyName,
      phoneNumber,
      mobileNumber,
      website,
      email,
      location: JSON.stringify({
        type: 'Point',
        coordinates,
        address: {
          streetNumber: location.address.streetNumber,
          streetName: location.address.streetName,
          suburb: location.address.suburb,
          city: location.address.city,
          postCode: location.address.postCode,
        },
      }),
      profilepic: profileImage,
      hoursOfOperation: dayTimes || {},
      musictype: selectedMusicGenres,
      clubtype: clubType,
      gaybar: gayBar,
    };
    try {
      const formData = new FormData();
      for (const key in barData) {
        if (key === 'profileImage' && barData[key]) {
          const uriParts = barData[key].split('.');
          const fileType = uriParts[uriParts.length - 1];

          formData.append('profileImage', {
            uri: barData[key],
            name: `profileImage.${fileType}`,
            type: `image/${fileType}`,
          });
        } else {
          formData.append(
            key,
            typeof barData[key] === 'object'
              ? JSON.stringify(barData[key])
              : barData[key]
          );
        }
      }
      console.log(formData);

      console.log('Submit button pressed');
      const response = await fetch(
        'http://192.168.1.108:3001/api/bars/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      console.log('Response status:', response.status);
      console.log('Response object:', response);

      if (response.ok) {
        alert('Bar added successfully');
      } else {
        alert('Error to add bar');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding bar');
    }
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 32 }}>
        <Text>Company Name:</Text>
        <Input
          onChangeText={(text) => setCompanyName(text)}
          value={companyName}
        />
        <Text>Phone Number:</Text>
        <Input
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <Text>Mobile Number:</Text>
        <Input
          onChangeText={(text) => setMobileNumber(text)}
          value={mobileNumber}
        />
        <Text>Website:</Text>
        <Input onChangeText={(text) => setWebsite(text)} value={website} />
        <Text>Email:</Text>
        <Input onChangeText={(text) => setEmail(text)} value={email} />
        <Text>Street Address:</Text>

        <Input
          placeholder="Street Number"
          onChangeText={(text) =>
            setLocation((prevState) => ({
              ...prevState,
              address: { ...prevState.address, streetNumber: text },
            }))
          }
          value={location.address.streetNumber}
        />
        <Input
          placeholder="Street Name"
          onChangeText={(text) =>
            setLocation((prevState) => ({
              ...prevState,
              address: { ...prevState.address, streetName: text },
            }))
          }
          value={location.address.streetName}
        />
        <Input
          placeholder="Suburb"
          onChangeText={(text) =>
            setLocation((prevState) => ({
              ...prevState,
              address: { ...prevState.address, suburb: text },
            }))
          }
          value={location.address.suburb}
        />
        <Input
          placeholder="City"
          onChangeText={(text) =>
            setLocation((prevState) => ({
              ...prevState,
              address: { ...prevState.address, city: text },
            }))
          }
          value={location.address.city}
        />
        <Input
          placeholder="Post Code"
          onChangeText={(text) =>
            setLocation((prevState) => ({
              ...prevState,
              address: { ...prevState.address, postCode: text },
            }))
          }
          value={location.address.postCode}
        />

        <Text>Profile Picture:</Text>
        {profileImage && (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 200, height: 200, borderRadius: 20 }}
          />
        )}
        <Button title="Upload Profile Picture" onPress={pickImage} />
        <Text>Days Open:</Text>
        {DAYS.map((day, index) => {
          const isOpen = !!dayTimes[day];
          return (
            <View key={day}>
              <CheckBox
                title={day}
                checked={isOpen}
                onPress={() => toggleDay(index)}
              />
              {isOpen && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Times
                    dayTimes={dayTimes}
                    setDayTimes={setDayTimes}
                    day={day}
                    type="open"
                  />
                  <Times
                    dayTimes={dayTimes}
                    setDayTimes={setDayTimes}
                    day={day}
                    type="close"
                  />
                </View>
              )}
            </View>
          );
        })}
        <Text>Music Type:</Text>
        {MUSIC_GENRES.map((genre, index) => (
          <CheckBox
            key={genre}
            title={genre}
            checked={selectedMusicTypes.includes(index)}
            onPress={() => toggleMusicType(index)}
          />
        ))}
        {selectedMusicTypes.includes(MUSIC_GENRES.length - 1) && (
          <Input
            placeholder="Custom Music Type"
            onChangeText={(text) => setCustomMusicType(text)}
            value={customMusicType}
          />
        )}

        <Text>Club Type:</Text>
        <ButtonGroup
          onPress={(selectedIndex) => setClubType(CLUB_TYPES[selectedIndex])}
          buttons={CLUB_TYPES}
          selectedIndex={CLUB_TYPES.indexOf(clubType)}
        />

        <Text>Gay Bar:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch value={gayBar} onValueChange={(value) => setGayBar(value)} />
          <Text>{gayBar ? 'Yes' : 'No'}</Text>
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
