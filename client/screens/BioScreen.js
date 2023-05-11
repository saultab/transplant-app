import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';

const BioScreen = ({ navigation, myInfo, setMyInfo, updateMyInfo }) => {
  const [infoTmp, setInfoTmp] = useState(myInfo);
  const [modalSaveChanges, setModalSaveChanges] = useState(false);
  const [modalDeleteChanges, setModalDeleteChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  return (

    <SafeAreaView style={{ flex: 1, }}>

      <View keyboardShouldPersistTaps="handled"
        style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: 'black', fontSize: 14, marginVertical: 10, marginHorizontal: 10 }}>
          {"Transplant App Bio is a space to present yourself!\n\n"}
          {"You can talk a little bit about yourself or write a phrase that represents"}
          {"you, depending on the image you wish to transmit."}
        </Text>
        <View style={{ marginTop: -30 }}>
          <Input
            onChangeText={(newName) => setInfoTmp(prevState => ({ ...prevState, bio: newName }))}
            value={infoTmp.bio}
          />
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 50, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 65 }}>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#C1121F',
            backgroundColor: '#C1121F',
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 0,
            borderWidth: 1.5, borderColor: 'grey',
          }}
          onPress={() => { setModalVisible(!modalVisible) }}>
          <Text style={{
            color: 'white', fontWeight: 'bold',
          }}>Discard </Text>

        </TouchableOpacity>
        <Text>              </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#1976D2',
            backgroundColor: '#1976D2',
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 25,
            borderWidth: 1.5, borderColor: 'grey',
          }}
          onPress={() => { setModalVisible1(!modalVisible1) }}>
          <Text style={{
            color: 'white', fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey', }]}>
            <Text style={styles.modalText}> Are you sure to discard all changes made to your bio?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonClose1, { borderWidth: 1.5, borderColor: 'grey', }]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Don't discard</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { borderWidth: 1.5, borderColor: 'grey', }]}
                onPress={() => {
                  setModalVisible(!modalVisible),
                    setModalDeleteChanges(!modalDeleteChanges),
                    setInfoTmp(myInfo);
                }}>
                <Text style={styles.textStyle}>Discard all</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible1} onRequestClose={() => {
        setModalVisible1(!modalVisible1);
      }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey', }]}>
            <Text style={styles.modalText}> Are you sure to permanently save all the changes made to your bio?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonClose1, { borderWidth: 1.5, borderColor: 'grey', }]}
                onPress={() => {
                  setModalVisible1(!modalVisible1)
                }}>
                <Text style={styles.textStyle}>Don't save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { borderWidth: 1.5, borderColor: 'grey', }]}
                onPress={() => { setModalVisible1(!modalVisible1), setModalSaveChanges(!modalSaveChanges), setMyInfo(infoTmp); updateMyInfo(infoTmp); }}>
                <Text style={styles.textStyle}>Save all</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalDeleteChanges} onRequestClose={() => {
         setModalDeleteChanges(!modalDeleteChanges);
      }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Ionicons name={'close'} size={25}
                onPress={() => setModalDeleteChanges(!modalDeleteChanges)}> </Ionicons>
            </View>
            <Text style={styles.modalText}> {"All your changes has been discarded!"}</Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalSaveChanges} onRequestClose={() => {
         setModalSaveChanges(!modalSaveChanges);
      }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Ionicons name={'close'} size={25}
                onPress={() => setModalSaveChanges(!modalSaveChanges)}> </Ionicons>
            </View>
            <Text style={[styles.modalText]}> {"Changes successfully saved!"}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#1976D2',
  },
  buttonClose1: {
    backgroundColor: '#C1121F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BioScreen;