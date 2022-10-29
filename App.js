import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TextInput style={styles.item} placeholder="Agregar un item" />
        <Button title="Agregar" />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.listItem}>Item 1</Text>
        <Text style={styles.listItem}>Item 2</Text>
        <Text style={styles.listItem}>Item 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  listItem:{
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  }
});
