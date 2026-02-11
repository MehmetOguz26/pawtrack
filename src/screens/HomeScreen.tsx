import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { dictionary } from '../i18n';
import { Pet, VaccineRecord } from '../domain/types';
import { buildReminderSchedule, getDefaultReminderPolicy } from '../domain/reminderScheduler';

interface Props {
  pets: Pet[];
  records: VaccineRecord[];
}

export const HomeScreen = ({ pets, records }: Props) => {
  const reminders = records.flatMap((record) =>
    buildReminderSchedule(record, getDefaultReminderPolicy(record.id)),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dictionary.appTitle}</Text>
      <Text style={styles.subtitle}>{dictionary.subtitle}</Text>

      <Text style={styles.sectionTitle}>{dictionary.sections.pets}</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petMeta}>{item.species.toUpperCase()}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>{dictionary.sections.upcoming}</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => `${item.recordId}-${item.offsetInDays}`}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{`${item.offsetInDays} days before`}</Text>
            <Text>{item.reminderDate}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>{dictionary.sections.settings}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{dictionary.actions.connectGoogle}</Text>
        </Pressable>
        <Pressable style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>{dictionary.actions.connectMicrosoft}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#4a5568',
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 8,
  },
  petName: {
    fontWeight: '600',
    fontSize: 16,
  },
  petMeta: {
    color: '#718096',
    marginTop: 2,
  },
  actions: {
    gap: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#2b6cb0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#edf2f7',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonSecondaryText: {
    color: '#2d3748',
    fontWeight: '600',
  },
});
