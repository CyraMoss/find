import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BarInfoCard = ({ bar, onClose }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{bar.companyname}</Text>
      <Text>Email: {bar.email}</Text>
      <Text>Address: {bar.location.address.suburb}</Text>
      <Text>Phone: {bar.phoneNumber}</Text>
      <Text>Website: {bar.website}</Text>
      {bar.hoursOfOperation.map((hours, index) => (
        <Text key={index}>
          {hours.day}: {hours.open} - {hours.close}
        </Text>
      ))}
      <Text>Music Type: {bar.musictype}</Text>
      <Text>Club Type: {bar.clubtype}</Text>
      <Text>Gay Bar: {bar.isGayBar ? 'Yes' : 'No'}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
  },
});

export default BarInfoCard;
