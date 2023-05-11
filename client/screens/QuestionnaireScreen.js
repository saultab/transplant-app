import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform, TextInput, Modal, Pressable, StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchableDropdown from 'react-native-searchable-dropdown';

var goals = [
  {
    id: 28,
    name: "Better nutrition"
  },
  {
    id: 29,
    name: "Do more sport"
  },
  {
    id: 30,
    name: "Hydration"
  },
  {
    id: 31,
    name: "Walks more"
  },
  {
    id: 32,
    name: "Sleep better"
  },
  {
    id: 33,
    name: "Quit smoking"
  },
  {
    id: 34,
    name: "Meditation"
  },
  {
    id: 35,
    name: "Rest well"
  },
  {
    id: 36,
    name: "Self care"
  },
  {
    id: 37,
    name: "Improve your memory"
  },
  {
    id: 38,
    name: "Be more organized"
  },
  {
    id: 39,
    name: "Read more"
  },
]

var interests = [
  {
    id: 40,
    name: "Gaming"
  },
  {
    id: 41,
    name: "Nature"
  },
  {
    id: 42,
    name: "Music"
  },
  {
    id: 43,
    name: "Cooking"
  },
  {
    id: 44,
    name: "Animals"
  },
  {
    id: 45,
    name: "Films"
  },
  {
    id: 46,
    name: "Singing"
  },
  {
    id: 47,
    name: "Gym"
  },
  {
    id: 48,
    name: "Sport"
  },
  {
    id: 49,
    name: "Writing"
  },
  {
    id: 50,
    name: "Reading"
  },
]

var hospitals = [
  {
    id: 1,
    name: "Virginia's Hospital"
  },
  {
    id: 2,
    name: "Tampa General Hospital"
  },
  {
    id: 3,
    name: "Piedmont Hospital"
  },
  {
    id: 4,
    name: "Indiana University Health"
  },
  {
    id: 5,
    name: "Keck Hospital of USC"
  },
  {
    id: 6,
    name: "UF Health Shands Hospital"
  },
  {
    id: 7,
    name: "Ochsner Foundation Hospital"
  },
  {
    id: 8,
    name: "Johns Hopkins Hospital"
  },
  {
    id: 9,
    name: "Stanford Health Care"
  },
  {
    id: 10,
    name: "Duke University Hospital"
  },
  {
    id: 11,
    name: "University of Maryland Medical System"
  },
  {
    id: 12,
    name: "Cedars-Sinai Medical Center"
  },
  {
    id: 13,
    name: "Medstar Georgetown Transplant Institute"
  },
  {
    id: 14,
    name: "Henry Ford Hospital"
  },
  {
    id: 15,
    name: "The Nebraska Medical Center"
  },
]

var transplants = [
  {
    id: 16,
    name: "Heart"
  },
  {
    id: 17,
    name: "Kidney"
  },
  {
    id: 18,
    name: "Liver"
  },
  {
    id: 19,
    name: "Lung"
  },
  {
    id: 20,
    name: "Cornea"
  },
  {
    id: 21,
    name: "Pancreas"
  },
  {
    id: 22,
    name: "Trachea"
  },
  {
    id: 23,
    name: "Skin"
  },
  {
    id: 24,
    name: "Vascular Tissues"
  },
  {
    id: 25,
    name: "Thymus"
  },
  {
    id: 26,
    name: "Intestine"
  },
  {
    id: 27,
    name: "Stomach"
  },
]

const QuestionnaireScreen = ({ navigation, myInfo, setMyInfo, updateMyInfo }) => {

  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date1');
  const [show1, setShow1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalDeleteChanges, setModalDeleteChanges] = useState(false);
  const [modalSaveChanges, setModalSaveChanges] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([{ id: 28, name: "Nutrition" }, { id: 29, name: "Sport" }]);
  const [selectedInterests, setSelectedInterests] = useState([{ id: 40, name: "Gaming" }, { id: 41, name: "Nature" }]);
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(hospitals);
  const [isClicked1, setIsClicked1] = useState(false);
  const [data1, setData1] = useState(transplants);
  const searchRef = useRef();
  const searchRef1 = useRef();
  const [infoTmp, setInfoTmp] = useState(myInfo);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    setDate1( new Date( myInfo.date_surgery.split("/")[2], myInfo.date_surgery.split("/")[1]-1, myInfo.date_surgery.split("/")[0] ))
  }, [])

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setInfoTmp((prec) => {return{...prec, date_surgery: fDate}});
  }

  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  }

  useEffect(() => {
    if (dirty === true) {
      setDirty(!dirty);
    }
  }, [dirty])

  const onSearch = (txt) => {
    if (txt != '') {
      let tempData = data.filter(item => {
        return item.name.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      })
      setData(tempData);
    } else
      setData(hospitals);
  }
  const onSearch1 = (txt) => {
    if (txt != '') {
      let tempData = data1.filter(item => {
        return item.name.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      })
      setData1(tempData);
    } else
      setData1(transplants);
  }

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  return (

    <SafeAreaView style={{ flex: 1, }}>

      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Text style={{ color: 'black', fontSize: 14, marginVertical: 10, textAlign: 'center' }}>
          Update this questionnaire to get better AI suggestion! (The fields with * are mandatory)
        </Text>
        <View style={{ marginTop: 0 }}>

          <Text style={{ color: 'black', fontSize: 16, marginVertical: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>
            Transplant information
          </Text>

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: 'black', marginLeft: 5 }}>Type of transplant *</Text>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#8e8e8e',
                alignSelf: 'center',
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
                backgroundColor: 'white',
                marginBottom: 10,
              }}
              onPress={() => { setIsClicked1(!isClicked1) }}>
              <Text>{infoTmp.transplant}</Text>
              {isClicked1 ?
                (<Ionicons name="chevron-up-outline" style={{ size: 20 }} />) : (<Ionicons name="chevron-down-outline" style={{ size: 20 }} />)}
            </TouchableOpacity>
            {isClicked1 ? <View style={{
              width: '100%',
              height: 300,
              borderRadius: 30,
              marginTop: 10,
              backgroundColor: '#fff',
              elevation: 5,
              alignSelf: 'center'
            }}>
              <TextInput ref={searchRef1} placeholder='Search' onChangeText={txt => { onSearch1(txt); }}
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#8e8e8e',
                  alignSelf: 'center',
                  marginTop: 20,
                  paddingLeft: 15
                }} />
              <ScrollView nestedScrollEnabled={true}>
                {data1.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: '90%',
                        height: 50,
                        borderBottomWidth: 0.2,
                        borderBottomColor: '#8e8e8e',
                        alignSelf: 'center',
                        justifyContent: 'center'
                      }}
                      key={index}
                      onPress={() => {
                        setInfoTmp(prevState => ({ ...prevState, transplant: item.name }))
                        onSearch1('');
                        setIsClicked1(false);
                        searchRef1.current.clear();
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View> : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 14, color: 'black', marginLeft: 5 }}>Hospital *</Text>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#8e8e8e',
                alignSelf: 'center',
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
                backgroundColor: 'white',
                marginBottom: 10,
              }}
              onPress={() => { setIsClicked(!isClicked) }}>
              <Text>{infoTmp.hospital}</Text>
              {isClicked ?
                (<Ionicons name="chevron-up-outline" style={{ size: 20 }} />) : (<Ionicons name="chevron-down-outline" style={{ size: 20 }} />)}
            </TouchableOpacity>
            {isClicked ? <View style={{
              width: '100%',
              height: 300,
              borderRadius: 30,
              backgroundColor: '#fff',
              elevation: 5,
              alignSelf: 'center'
            }}>
              <TextInput ref={searchRef} placeholder='Search' onChangeText={txt => { onSearch(txt); }}
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#8e8e8e',
                  alignSelf: 'center',
                  marginTop: 20,
                  paddingLeft: 15
                }} />
              <ScrollView nestedScrollEnabled={true}>
                {data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: '90%',
                        height: 50,
                        borderBottomWidth: 0.2,
                        borderBottomColor: '#8e8e8e',
                        alignSelf: 'center',
                        justifyContent: 'center'
                      }}
                      key={index}
                      onPress={() => {
                        setInfoTmp(prevState => ({ ...prevState, hospital: item.name }))
                        onSearch('');
                        setIsClicked(false);
                        searchRef.current.clear();
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View> : null}
          </View>

          <View style={{ marginBottom: 10 }}>

            <Text style={{ marginVertical: 5, fontSize: 14, color: 'black', marginLeft: 5 }}>Surgery date *</Text>
            <TouchableOpacity onPress={() => showMode1('date')}>
              <View style={{
                alignSelf: 'center', marginTop: 5, backgroundColor: 'white', width: '100%', borderColor: '#8e8e8e', height: 50,
                flexDirection: 'row', paddingHorizontal: 15, borderWidth: 0.5, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 15, paddingRight: 15
              }}>
                <Text>  {infoTmp.date_surgery}</Text>
                <Ionicons name="calendar-outline" size={22} ></Ionicons>

                {show1 && (
                  <DateTimePicker
                    testID='dateTimePicker1'
                    value={date1}
                    mode={mode1}
                    is24Hour={false}
                    display='default'
                    onChange={onChange1}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'black', fontSize: 16, marginVertical: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Other informations
          </Text>

        </View>
        <View>
          <Text style={{ paddingLeft: 0, }}> Goals:</Text>
          <SearchableDropdown
            multi={true}
            selectedItems={selectedGoals}
            onItemSelect={(item) => {
              const items = selectedGoals;
              items.push(item)
              setDirty(!dirty);
              setSelectedGoals(items);
              onSearch('');
            }}
            containerStyle={{ padding: 0, paddingTop: -15, }}
            onRemoveItem={(item, index) => {
              const items = selectedGoals.filter((sitem) => sitem.id !== item.id);
              setSelectedGoals(items);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: 'white',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 50,

            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={goals.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })}
            chip={true}
            resetValue={true}
            labelText="Search Goals"
            textInputProps={
              {
                placeholder: "Search Goals",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 50,
                  backgroundColor: 'white'
                },
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />

        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ paddingLeft: 0 }}> Personal Interests:</Text>
          <SearchableDropdown
            multi={true}
            selectedItems={selectedInterests}
            onItemSelect={(item) => {
              const items = selectedInterests;
              items.push(item);
              setDirty(!dirty);
              setSelectedInterests(items);
            }}
            containerStyle={{ padding: 0, paddingTop: -15 }}
            onRemoveItem={(item, index) => {
              const items = selectedInterests.filter((sitem) => sitem.id !== item.id);
              setSelectedInterests(items);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 50,
              backgroundColor: 'white'
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={interests.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })}
            chip={true}
            resetValue={false}
            labelText="Search Interests"
            textInputProps={
              {
                placeholder: "Search Interests",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 50,
                  backgroundColor: 'white'
                },
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          </View>
          <View style={{ marginTop: 40, marginBottom: 20, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#C1121F',
                backgroundColor: '#C1121F',
                borderWidth: 2,
                borderRadius: 50,
                paddingVertical: 8,
                paddingHorizontal: 15,
                marginHorizontal: 25,
                borderWidth: 1.5, borderColor: 'grey',
              }}
              onPress={() => { setModalVisible(!modalVisible) }}>
              <Text style={{
                color: 'white', fontWeight: 'bold',
              }}>Discard </Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#1976D2',
                backgroundColor: '#1976D2',
                borderWidth: 2,
                borderRadius: 50,
                paddingVertical: 8,
                paddingHorizontal: 15,
                marginHorizontal: 30,
                borderWidth: 1.5, borderColor: 'grey',
              }}
              onPress={() => { setModalVisible1(!modalVisible1) }}>
              <Text style={{
                color: 'white', fontWeight: 'bold',
              }}>Save</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey' }]}>
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
                  setSelectedGoals([{ id: 28, name: "Nutrition" }, { id: 29, name: "Sport" }]),
                    setSelectedInterests([{ id: 40, name: "Gaming" }, { id: 41, name: "Nature" }]),
                    setInfoTmp(myInfo),
                    setModalDeleteChanges(!modalDeleteChanges)
                }}>
                <Text style={styles.textStyle}>Discard all</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible1} onRequestClose={() => { setModalVisible1(!modalVisible1) }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderWidth: 1.5, borderColor: 'grey' }]}>
            <Text style={styles.modalText}> Are you sure to permanently save all the changes ?</Text>
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
                onPress={() => { setModalVisible1(!modalVisible1), setModalSaveChanges(!modalSaveChanges), setMyInfo(infoTmp), updateMyInfo(infoTmp) }}>
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
      <Modal animationType="slide" transparent={true} visible={modalSaveChanges} onRequestClose={() => { }}>
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
    marginTop: 22,
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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

export default QuestionnaireScreen;