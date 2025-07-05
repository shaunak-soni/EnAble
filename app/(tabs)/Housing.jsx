import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const HousingPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [selectedBed, setSelectedBed] = useState('Any');
  const [selectedBath, setSelectedBath] = useState('Any');
  const [applicationFeesFilter, setApplicationFeesFilter] = useState('Any');
  const [accessibilityFilter, setAccessibilityFilter] = useState('Any');
  const [kitchenFilter, setKitchenFilter] = useState('Any');
  const [bathroomFilter, setBathroomFilter] = useState('Any');
  const [mobilityFilter, setMobilityFilter] = useState('Any');
  const [ageRequirementFilter, setAgeRequirementFilter] = useState('Any');
  const [incomeRequirementFilter, setIncomeRequirementFilter] = useState('Any');
  const [petsFilter, setPetsFilter] = useState('Any');
  const [parkingFilter, setParkingFilter] = useState('Any');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'housingListings'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [
    selectedBed,
    selectedBath,
    applicationFeesFilter,
    accessibilityFilter,
    kitchenFilter,
    bathroomFilter,
    mobilityFilter,
    ageRequirementFilter,
    incomeRequirementFilter,
    petsFilter,
    parkingFilter,
  ]);

  const filterListings = () => {
    let filtered = listings;

    if (selectedBed !== 'Any') {
      filtered = filtered.filter(item => Number(item.bed) === Number(selectedBed));
    }

    if (selectedBath !== 'Any') {
      filtered = filtered.filter(item => Number(item.bath) === Number(selectedBath));
    }

    if (applicationFeesFilter !== 'Any') {
      filtered = filtered.filter(item =>
        applicationFeesFilter === 'Yes'
          ? Number(item.applicationFees) > 0
          : Number(item.applicationFees) === 0
      );
    }

    if (accessibilityFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.accessibility?.toLowerCase().includes(accessibilityFilter.toLowerCase())
      );
    }

    if (kitchenFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.kitchen?.toLowerCase().includes(kitchenFilter.toLowerCase())
      );
    }

    if (bathroomFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.bathroom?.toLowerCase().includes(bathroomFilter.toLowerCase())
      );
    }

    if (mobilityFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.mobility?.toLowerCase().includes(mobilityFilter.toLowerCase())
      );
    }

    if (ageRequirementFilter !== 'Any') {
      filtered = filtered.filter(
        item =>
          String(item.ageRequirement).toLowerCase() === ageRequirementFilter.toLowerCase()
      );
    }

    if (incomeRequirementFilter !== 'Any') {
      filtered = filtered.filter(
        item =>
          String(item.incomeRequirement).toLowerCase() === incomeRequirementFilter.toLowerCase()
      );
    }

    if (petsFilter !== 'Any') {
      filtered = filtered.filter(
        item => String(item.pets).toLowerCase() === petsFilter.toLowerCase()
      );
    }

    if (parkingFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.accessibility?.toLowerCase().includes(parkingFilter.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.address}</Text>
      <View style={styles.row}>
        <FontAwesome5 name="bed" size={16} color="#555" />
        <Text style={styles.detail}>Bed: {item.bed}</Text>
        <FontAwesome5 name="bath" size={16} color="#555" style={styles.iconSpacing} />
        <Text style={styles.detail}>Bath: {item.bath}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="attach-money" size={18} color="#555" />
        <Text style={styles.detail}>Rent: {item.rent}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="document-scanner" size={18} color="#555" />
        <Text style={styles.detail}>Deposit: {item.deposit}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="content-paste" size={18} color="#555" />
        <Text style={styles.detail}>Application Fees: {item.applicationFees}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="soup-kitchen" size={18} color="#555" />
        <Text style={styles.detail}>Kitchen Accessibility: {item.kitchen}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="bathtub" size={18} color="#555" />
        <Text style={styles.detail}>Bathroom Accessibility: {item.bathroom}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="local-parking" size={18} color="#555" />
        <Text style={styles.detail}>Parking Accessibility: {item.parking}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="accessible" size={18} color="#555" />
        <Text style={styles.detail}>General Accessibility: {item.mobility}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="elderly" size={18} color="#555" />
        <Text style={styles.detail}>Age Requirement: {item.ageRequirement}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="money" size={18} color="#555" />
        <Text style={styles.detail}>Income Requirement: {item.incomeRequirement}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="pets" size={18} color="#555" />
        <Text style={styles.detail}>Pets: {item.pets}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="person" size={18} color="#555" />
        <Text style={styles.detail}>Contact Name: {item.contactName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="phone" size={18} color="#555" />
        <Text style={styles.link} onPress={() => handleCall(item.contactPhone)}>
          {item.contactPhone}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="email" size={18} color="#555" />
        <Text style={styles.link} onPress={() => handleEmail(item.contactEmail)}>
          {item.contactEmail}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Button title="Filters" onPress={() => setModalVisible(true)} />
          </View>
        }
        data={filteredListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Filters Modal with ScrollView */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalTitle}>Filter Listings</Text>

            <Text style={styles.filterLabel}>Bed</Text>
            <Picker selectedValue={selectedBed} onValueChange={setSelectedBed}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4+" value="4" />
            </Picker>

            <Text style={styles.filterLabel}>Bath</Text>
            <Picker selectedValue={selectedBath} onValueChange={setSelectedBath}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3+" value="3" />
            </Picker>

            <Text style={styles.filterLabel}>Application Fees</Text>
            <Picker selectedValue={applicationFeesFilter} onValueChange={setApplicationFeesFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>

            <Text style={styles.filterLabel}>Kitchen</Text>
            <Picker selectedValue={kitchenFilter} onValueChange={setKitchenFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Front Controls on Stove/Cook-top" value="Front Controls on Stove/Cook-top" />
              <Picker.Item label="Non digital Kitchen appliances" value="Non digital Kitchen appliances" />
            </Picker>

            <Text style={styles.filterLabel}>Bathroom</Text>
            <Picker selectedValue={bathroomFilter} onValueChange={setBathroomFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Accessible Height Toilet" value="Accessible Height Toilet" />
              <Picker.Item label="Bath Grab Bars or Reinforcements" value="Bath Grab Bars or Reinforcements" />
              <Picker.Item label="Toilet Grab Bars or Reinforcements" value="Toilet Grab" />
              <Picker.Item label="Walk in Shower" value="Walk-in Shower" />
              <Picker.Item label="Lever Handles on Doors and Faucets" value="Lever Handles on Doors and Faucets" />
            </Picker>

            <Text style={styles.filterLabel}>Parking</Text>
            <Picker selectedValue={parkingFilter} onValueChange={setParkingFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Off Street" value="off street" />
              <Picker.Item label="Infront of Unit" value="infront of unit" />
              <Picker.Item label="On Street" value="on street" />
            </Picker>

            <Text style={styles.filterLabel}>General Accessibility</Text>
            <Picker selectedValue={mobilityFilter} onValueChange={setMobilityFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Front Controls on Stove/Cook-top" value="Front Controls on Stove/Cook-top" />
              <Picker.Item label="Non digital Kitchen appliances" value="Non digital Kitchen appliances" />
            </Picker>

            <Text style={styles.filterLabel}>Age Requirement</Text>
            <Picker selectedValue={ageRequirementFilter} onValueChange={setAgeRequirementFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>

            <Text style={styles.filterLabel}>Income Requirement</Text>
            <Picker selectedValue={incomeRequirementFilter} onValueChange={setIncomeRequirementFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>

            <Text style={styles.filterLabel}>Pets</Text>
            <Picker selectedValue={petsFilter} onValueChange={setPetsFilter}>
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>

            <View style={{ marginVertical: 20 }}>
              <Button title="Apply Filters" onPress={() => setModalVisible(false)} />
            </View>
            <Button title="Close" color="gray" onPress={() => setModalVisible(false)} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default HousingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    flexWrap: 'wrap',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 12,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
