import { SafeAreaView, StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { Pet, VaccineRecord } from './src/domain/types';

const pets: Pet[] = [
  { id: 'p1', name: 'Luna', species: 'cat' },
  { id: 'p2', name: 'Max', species: 'dog' },
];

const vaccineRecords: VaccineRecord[] = [
  {
    id: 'v1',
    petId: 'p1',
    vaccineName: 'Rabies',
    dueDate: '2026-03-14',
    notes: 'Entered by owner after vet consultation.',
    createdBy: 'owner',
  },
  {
    id: 'v2',
    petId: 'p2',
    vaccineName: 'DHPP',
    dueDate: '2026-03-20',
    notes: 'Vet recommended annual booster.',
    createdBy: 'vet',
  },
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen pets={pets} records={vaccineRecords} />
    </SafeAreaView>
  );
}
