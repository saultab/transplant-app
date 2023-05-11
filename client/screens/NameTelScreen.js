import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Platform, StyleSheet, Modal, Pressable } from 'react-native';
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';

const NameTelScreen = ({ navigation, myInfo, setMyInfo, updateMyInfo }) => {
  const [infoTmp, setInfoTmp] = useState(myInfo);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalSaveChanges, setModalSaveChanges] = useState(false);
  const [modalDeleteChanges, setModalDeleteChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  useEffect(() => {
    setDate( new Date( myInfo.birth.split("/")[2], myInfo.birth.split("/")[1]-1, myInfo.birth.split("/")[0] ))
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(selectedDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setInfoTmp((prec) => {return{...prec, birth: fDate}});
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  useEffect(() => { LogBox.ignoreLogs(['VirtualizedLists should never be nested']); }, [])

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
      <View keyboardShouldPersistTaps="handled"
        style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: 'black', fontSize: 14, marginVertical: 10, textAlign: 'center' }}>
          The fields with * are mandatory
        </Text>

        <View style={{ marginTop: 10 }}>
          <Input
            onFocus={() => handleError(null, 'fullname')}
            label="Full Name *"
            onChangeText={(newName) => setInfoTmp(prevState => ({ ...prevState, name: newName }))}
            value={infoTmp.name}
            error={errors.fullname}
          />
          <Input
            onFocus={() => handleError(null, 'email')}
            label="Email *"
            onChangeText={(newName) => setInfoTmp(prevState => ({ ...prevState, email: newName }))}
            value={infoTmp.email}
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(newName) => setInfoTmp(prevState => ({ ...prevState, phone: newName }))}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            value={infoTmp.phone}
            placeholder="Enter your phone number"
          />
          <View style={{ marginBottom: 10 }}>

            <Text style={{ marginVertical: 5, fontSize: 14, color: 'black', marginLeft: 30 }}>Date of Birth *</Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <View style={
                {
                  height: 55,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  paddingRight: 20,
                  marginBottom: 10
                }}>
                <Text>  {infoTmp.birth}</Text>
                <Ionicons name="calendar-outline" size={22} ></Ionicons>

                {show && (
                  <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display='default'
                    onChange={onChange}
                  />
                )}
              </View>

            </TouchableOpacity>


          </View>
        </View>
      </View>

      <View style={{ marginTop: 150, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 65 }}>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#C1121F',
            backgroundColor: '#C1121F',
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderWidth: 1.5, borderColor: 'grey',
          }}
          onPress={() => { setModalVisible(!modalVisible) }}>
          <Text style={{
            color: 'white', fontWeight: 'bold',
          }}>Discard </Text>

        </TouchableOpacity>
        <Text>                      </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#1976D2',
            backgroundColor: '#1976D2',
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderWidth: 1.5, borderColor: 'grey',
          }}
          onPress={() => { setModalVisible1(!modalVisible1) }}>
          <Text style={{
            color: 'white', fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>


      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
         setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Are you sure to discard all changes ?</Text>
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
                    setInfoTmp(myInfo)
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Are you sure that to permanently save all the changes ?</Text>
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
          <View style={[styles.modalView]}>
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
          <View style={[styles.modalView]}>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'grey',
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

export default NameTelScreen;