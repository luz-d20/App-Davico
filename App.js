import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


export default function App() {

  /* Estados para la lista de items */
  const [textItem, setTextItem] = useState('')
  const [listItems, setListItems] = useState([])

  /* Estados para el modal */
  const [itemSelected, setItemSelected] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  /* Input de nuevos items */
  const onHandleChangeItem = (text) => {
    setTextItem(text)
  }

  /* Agregado de nuevos items a la lista */
  const onHandleAddItem = () => {
    if (textItem.length > 0) {
      setListItems(currentItems => [
        ...currentItems, 
        {key: Math.random().toString(), value: textItem}
      ])
      setTextItem('')
    } else {
      alert('Por favor ingresa un item')
    }    
  }

  /* MODAL: Asigno al estado el elemento que seleccionó el usuario */
  const onHandleSelectItem = (id) => {
    setItemSelected(listItems.filter(item => item.id === id)[0])
    setModalVisible(true)
  }

  /* MODAL: Elimino el elemento seleccionado */
  const deleteItem = (id) => {
    setListItems((currentState) => 
      currentState.filter(item => item.id !== itemSelected.id)
      );
      setItemSelected({});
      setModalVisible(false);
    };
      
  /* Renderizado */
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onHandleSelectItem(item.id)} style={styles.listItem}>
      <Text>{item.value}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨Lista de compras✨</Text>
      <View style={styles.itemContainer}>
        <TextInput 
          value={textItem} 
          style={styles.item} 
          placeholder="Agregar un item"
          onChangeText={onHandleChangeItem}
        />
        <Button 
          title="Agregar" 
          onPress={onHandleAddItem}
        />
      </View>
      <View style={styles.itemContainer}>
        { listItems.length < 1 ? ( <Text>No ingresaste items en tu lista</Text> ) : (
          <FlatList
          data={listItems}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text>¿Estás seguro que deseas eliminar este item?</Text>
            <View style={styles.modalbuttons}>
              <Pressable onPress={() => deleteItem()}>
                <Text style={{color: 'red'}}>Eliminar</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor: 'white'}}>
                <Text>Cancelar</Text>
              </Pressable>
              </View>
          </View>
        </View>
      </Modal>
  </View>
  );
}


/* Estilos / CSS */
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modal: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10
  },
  modalbuttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff'
  },
  itemContainer: {
    width: '90%',
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
  },
});
