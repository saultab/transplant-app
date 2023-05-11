import React, { useState, useEffect } from 'react';
import { View, Switch, ScrollView, SafeAreaView, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notifications = ({myInfo, setMyInfo, updateMyInfo }) => {
    const [infoTmp, setInfoTmp] = useState(myInfo);
    const [isEnabled, setIsEnabled] = useState();
    const [isEnabled2, setIsEnabled2] = useState();
    const [selected, setSelected] = useState("");
    const [selected2, setSelected2] = useState("");
    const [modalSaveChanges, setModalSaveChanges] = useState(false);
    const [modalDeleteChanges, setModalDeleteChanges] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);

    useEffect(() => {
        if(myInfo.show_sms=="false")
            setIsEnabled2(false);
        else
            setIsEnabled2(true);
    }, [])

    useEffect(() => {
        if(myInfo.sound_sms=="false")
        setIsEnabled(false);
    else
        setIsEnabled(true);
    }, [])

    const data = [
        { key: '1', value: 'Slack' },
        { key: '2', value: 'Carillon' },
        { key: '3', value: 'Boing' },
        { key: '4', value: 'Whistle' },
    ]
    const data2 = [
        { key: '1', value: 'Off' },
        { key: '2', value: 'Short' },
        { key: '3', value: 'Long' },
    ]
    const handle1 = () => {
        if(isEnabled2)
            setInfoTmp((prec) => {return {... prec, show_sms: "false" } })
        else 
            setInfoTmp((prec) => {return {... prec, show_sms: "true" } })
    }
    const handle2 = () => {
        if(isEnabled)
            setInfoTmp((prec) => {return {... prec, sound_sms: "false" } })
        else 
            setInfoTmp((prec) => {return {... prec, sound_sms: "true" } })
    }
    const handle3 = (val) => {
        let stringa ="";
        for ( const c1 of data){
            if (c1.key == val){
                stringa = c1.value;
                break;
            }
        }
        setInfoTmp((prec) => {return {... prec, tone: val.toString().concat(",").concat(stringa)} })
    }
    const handle4 = (val) => {
        let stringa ="";
        for ( const c1 of data2){
            if (c1.key == val){
                stringa = c1.value;
                break;
            }
        }
        setInfoTmp((prec) => {return {... prec, vibration: val.toString().concat(",").concat(stringa)} })
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView  >

                    <View>
                        <Card containerStyle={{ marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textAlign: 'left',
                                    fontSize: 14,
                                    textAlignVertical: 'center'
                                }}>
                                    {"Show message preview without\nopening the chat"}</Text>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Switch trackColor={{ false: "#767577", true: "#1976D2" }} thumbColor={"#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={() => {setIsEnabled2(!isEnabled2); handle1()}} value={isEnabled2} />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={{ marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'black', textAlign: 'left', fontSize: 14, textAlignVertical: 'center' }}>{"Play sounds when sending\nand receiving messages"}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Switch trackColor={{ false: "#767577", true: "#1976D2" }} thumbColor={"#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={() => {setIsEnabled(!isEnabled); handle2()}} value={isEnabled} />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={{ marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', }} >
                        <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', textAlign: 'left', fontSize: 14, paddingTop:10 }}>{"Select notification tone"}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <SelectList
                                        setSelected={(val) => {handle3(val)}}
                                        data={data}
                                        arrowicon={<FontAwesome style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 3,
                                            marginLeft:3
                                        }} name="chevron-down" size={12} color={'black'} />}
                                        searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                        search={false}
                                        boxStyles={{ borderRadius: 10 }} //override default styles
                                        defaultOption={{ key: infoTmp.tone.split(",")[0], value: infoTmp.tone.split(",")[1] }}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={{ marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', }} >
                        <View style={{ flexDirection: 'row'}}>
                                <Text style={{ color: 'black', textAlign: 'left', fontSize: 14, marginTop:10 }}>{"Select typology of vibration"}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <SelectList
                                        setSelected={(val) => {handle4(val)}}
                                        data={data2}
                                        arrowicon={<FontAwesome style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 3,
                                            marginLeft:3
                                        }} name="chevron-down" size={12} color={'black'} />}
                                        searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                        search={false}
                                        boxStyles={{ borderRadius: 10 }} //override default styles
                                        defaultOption={{ key: infoTmp.vibration.split(",")[0], value: infoTmp.vibration.split(",")[1] }}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                    
                    <View style={{ position: 'relative', marginTop: 260, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 65 }}>

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
                                <Text style={styles.modalText}> Are you sure to discard all changes?</Text>
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
                                <Text style={styles.modalText}> Are you sure to permanently save all the changes?</Text>
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
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

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

export default Notifications;