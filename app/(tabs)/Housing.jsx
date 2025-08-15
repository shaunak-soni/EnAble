import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../config/firebase';

const HousingPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  // Filters state
  const [townFilter, settownFilter] = useState('Any');
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

  // Modal states
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(null);

  // Filter options
  const filterOptions = {
    town: ['Any', 'Wayne', 'Paramus', 'Maywood', 'River Edge', 'New Milford', 'Dumont', 'Hackensack'],
    bed: ['Any', '1', '2', '3', '4+'],
    bath: ['Any', '1', '2', '3+'],
    applicationFees: ['Any', 'Yes', 'No'],
    kitchen: ['Any', 'Front Controls on Stove/Cook-top', 'Non digital Kitchen appliances'],
    bathroom: [
      'Any',
      'Accessible Height Toilet',
      'Bath Grab Bars or Reinforcements',
      'Toilet Grab Bars or Reinforcements',
      'Walk-in Shower',
      'Lever Handles on Doors and Faucets'
    ],
    parking: ['Any', 'off street', 'infront of unit', 'on street', 'Onsite with handicapped accessible spots'],
    mobility: [
      'Any', 
      'No Step Entrance', 
      'Lever Handles on Door',
      'Lever Handles on Faucets',
      'Front control accessible appliances',
      'Accessible elevators',
      'Non-Lever Door/Faucet Handles',
      'Top and Front Loading Washer/Dryer',
      'Door Knock / Bell Signaler Accessible',
      'Accessible Peephole',
      'Entry Door Intercom',
      'Secured Entrance',
      'Automatic Entry Door',
      'Unit on First Floor',
      'Accessible Light Switches',
      'Entrance with Steps',
      'Doorway entrance 32" or wider',
    ],
    ageRequirement: ['Any', 'yes', 'no'],
    incomeRequirement: ['Any', 'yes', 'no'],
    pets: ['Any', 'yes', 'no']
  };

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
    townFilter,
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
    
    if (townFilter !== 'Any') filtered = filtered.filter(item =>
        item.town?.toLowerCase().includes(townFilter.toLowerCase())
      );
    if (selectedBed !== 'Any') filtered = filtered.filter(item => String(item.bed) === selectedBed);
    if (selectedBath !== 'Any') filtered = filtered.filter(item => String(item.bath) === selectedBath);
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
    if (kitchenFilter !== 'Any') filtered = filtered.filter(item =>
      item.kitchen?.toLowerCase().includes(kitchenFilter.toLowerCase())
    );
    if (bathroomFilter !== 'Any') filtered = filtered.filter(item =>
      item.bathroom?.toLowerCase().includes(bathroomFilter.toLowerCase())
    );
    if (parkingFilter !== 'Any') filtered = filtered.filter(item =>
      item.parking?.toLowerCase().includes(parkingFilter.toLowerCase())
    );
    if (mobilityFilter !== 'Any') filtered = filtered.filter(item =>
      item.mobility?.toLowerCase().includes(mobilityFilter.toLowerCase())
    );
    if (ageRequirementFilter !== 'Any') filtered = filtered.filter(
      item => String(item.ageRequirement).toLowerCase() === ageRequirementFilter.toLowerCase()
    );
    if (incomeRequirementFilter !== 'Any') filtered = filtered.filter(
      item => String(item.incomeRequirement).toLowerCase() === incomeRequirementFilter.toLowerCase()
    );
    if (petsFilter !== 'Any') filtered = filtered.filter(
      item => String(item.pets).toLowerCase() === petsFilter.toLowerCase()
    );

    setFilteredListings(filtered);
  };

  const handleCall = (phone) => Linking.openURL(`tel:${phone}`);
  const handleEmail = (email) => Linking.openURL(`mailto:${email}`);

  const openBottomSheet = (filterName) => {
    setCurrentFilter(filterName);
    setBottomSheetVisible(true);
  };

  const handleSelectOption = (option) => {
    switch (currentFilter) {
      case 'town' : settownFilter(option); break
      case 'bed': setSelectedBed(option); break;
      case 'bath': setSelectedBath(option); break;
      case 'applicationFees': setApplicationFeesFilter(option); break;
      case 'accessibility': setAccessibilityFilter(option); break;
      case 'kitchen': setKitchenFilter(option); break;
      case 'bathroom': setBathroomFilter(option); break;
      case 'parking': setParkingFilter(option); break;
      case 'mobility': setMobilityFilter(option); break;
      case 'ageRequirement': setAgeRequirementFilter(option); break;
      case 'incomeRequirement': setIncomeRequirementFilter(option); break;
      case 'pets': setPetsFilter(option); break;
    }
    setBottomSheetVisible(false);
  };

  const renderFilterButton = (label, value, filterKey) => (
    <TouchableOpacity style={styles.filterButton} onPress={() => openBottomSheet(filterKey)}>
      <Text style={styles.filterLabel}>{label}</Text>
      <Text style={styles.selectedValue}>{value}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.address}</Text>
      <View style={styles.row}>
        <MaterialIcons name="house" size={18} color="#555" />
        <Text style={styles.detail}>Town: {item.town}</Text>
      </View>
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
            <Button title="Filters" onPress={() => setFiltersModalVisible(true)} />
          </View>
        }
        data={filteredListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Main Filters Modal */}
      <Modal animationType="slide" visible={filtersModalVisible}>
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Listings</Text>

          {renderFilterButton('Town', townFilter, 'town')}
          {renderFilterButton('Bed', selectedBed, 'bed')}
          {renderFilterButton('Bath', selectedBath, 'bath')}
          {renderFilterButton('Application Fees', applicationFeesFilter, 'applicationFees')}
          {renderFilterButton('Kitchen', kitchenFilter, 'kitchen')}
          {renderFilterButton('Bathroom', bathroomFilter, 'bathroom')}
          {renderFilterButton('Parking', parkingFilter, 'parking')}
          {renderFilterButton('General Accessibility', mobilityFilter, 'mobility')}
          {renderFilterButton('Age Requirement', ageRequirementFilter, 'ageRequirement')}
          {renderFilterButton('Income Requirement', incomeRequirementFilter, 'incomeRequirement')}
          {renderFilterButton('Pets', petsFilter, 'pets')}

          <View style={{ marginVertical: 20 }}>
            <Button title="Apply Filters" onPress={() => setFiltersModalVisible(false)} />
          </View>
          <Button title="Close" color="gray" onPress={() => setFiltersModalVisible(false)} />
        </ScrollView>

        {/* Bottom Sheet for Options */}
        {bottomSheetVisible && (
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Select {currentFilter}</Text>
            {filterOptions[currentFilter]?.map(opt => (
              <TouchableOpacity
                key={opt}
                style={styles.optionItem}
                onPress={() => handleSelectOption(opt)}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setBottomSheetVisible(false)} />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default HousingPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  image: { height: 160, borderRadius: 10, marginBottom: 12, width: '100%' },
  title: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 2, flexWrap: 'wrap' },
  detail: { fontSize: 14, color: '#555', marginLeft: 6 },
  link: { fontSize: 14, color: '#007AFF', marginLeft: 6, textDecorationLine: 'underline' },
  iconSpacing: { marginLeft: 16 },
  modalContainer: { flex: 1, backgroundColor: '#fff', padding: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, marginTop: 32, textAlign: 'center' },
  filterButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterLabel: { fontSize: 16, fontWeight: '500' },
  selectedValue: { fontSize: 16, color: '#555' },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  optionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  optionText: { fontSize: 16 }
});
