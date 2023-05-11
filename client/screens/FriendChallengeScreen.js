import React, { useState } from 'react';
import { View, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChallengeImg, UserChallengeWrapper } from '../styles/MessageStyles';

const AddButton = ({ setModalVisible, setChallTemp, item }) => {
    return (
        <Ionicons name={'add-circle' } size={40} color={'#1976D2'}
            onPress={() => {setModalVisible(true); setChallTemp(item); }}> </Ionicons>
    );
};

const ChallengeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccessAdd, setModalSuccessAdd] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [challTemp, setChallTemp] = useState({});
    const [challengeAdded, setChallengeAdded] = useState([]);

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                <Text style={{fontWeight: 'bold' , fontSize: 18}} > {route.params.userName + "'s challenges:"}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5, marginBottom: 10 }}>
                <Text> Click on the + to add a challenge into yours </Text>
            </View>
            <FlatList data={route.params.listChallNormalUser} keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card containerStyle={{ marginTop: 15, borderRadius: 10,borderWidth: 1,borderColor: 'grey', }}>
                        <UserChallengeWrapper>
                            <ChallengeImg source={item.ChallengeImg} />
                        </UserChallengeWrapper>
                        <Text style={{ marginBottom: 10 , alignContent:'flex-start', fontWeight: 'bold', fontSize: 18}}> {item.titolo} </Text>
                        <Text style={{ justifyContent: 'flex-start' }} >{item.descrizione}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'space-between',
                            marginTop: 5,
                            alignItems: 'center'
                        }}>
                            <Text style={{ marginHorizontal: 5, borderRadius: 5, backgroundColor: '#fdf0d5' }}> {item.hastag} </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                                <AddButton setModalVisible={setModalVisible} setChallTemp={setChallTemp} item={item}></AddButton>
                            </View>
                        </View>
                        <Card.Divider />
                    </Card>
                )} />

            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                 setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}> This challenge has been selected to improve: </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ marginHorizontal: 5, backgroundColor: '#fdf0d5', marginBottom: 10,  borderRadius: 20, }}> {challTemp.hastag} </Text>
                            </View>
                            <Text style={styles.modalText}>Are you sure to add this challenge ?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 0 }}>
                                <TouchableOpacity style={styles.userBtn2}
                                    onPress={() => { setModalVisible(!modalVisible); }}>
                                    <Text style={styles.textStyle}>Don't add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.userBtn1}
                                    onPress={() => {
                                        addNewChallenge({ callSuperUserTotal: route.params.listChallSuperUser, challTemp: challTemp, addChallenge: route.params.addChallenge, setSuccessAdd: setSuccessAdd, challengeAdded: challengeAdded, setChallengeAdded: setChallengeAdded }); setModalVisible(!modalVisible); setModalSuccessAdd(!modalSuccessAdd);
                                    }}>
                                    <Text style={styles.textStyle}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalSuccessAdd} onRequestClose={() => {
                    setModalSuccessAdd(!modalSuccessAdd);
                }}>
                    <View style={styles.centeredView}>
                        {successAdd ? <View style={[styles.modalView]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Ionicons name={'close'} size={25}
                                    onPress={() => setModalSuccessAdd(!modalSuccessAdd)}> </Ionicons>
                            </View>
                            <Text style={[styles.modalText]}> {"The challenge has been added"}</Text>
                        </View> : 
                        <View style={[styles.modalView]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalSuccessAdd(!modalSuccessAdd)}> </Ionicons>
                        </View>
                        <Text style={styles.modalText}> {"The challenge has not been added since it is already in your challenges list"}</Text>
                    </View>}
                        
                    </View>
                </Modal>
            </View>
        </>
    );
}

function addNewChallenge({ callSuperUserTotal, challTemp, addChallenge, setSuccessAdd, challengeAdded , setChallengeAdded }) {
    let prova = false;
    for (const c1 of callSuperUserTotal) {
        if (c1.id == challTemp.id) {
            prova = true;
            break;
        }
    }
    if (prova === false) {
        let tmp = challengeAdded;
        if(challengeAdded.length === 0){
            addChallenge(challTemp.id, 1);
            setSuccessAdd(true);
            tmp.push(challTemp);
            setChallengeAdded(tmp);
        }
        else{
            const lun = challengeAdded.length;
            let cont = 0, pres =0;
            for(const c1 of challengeAdded){
                cont++;
                if(c1.id === challTemp.id){
                    setSuccessAdd(false);
                    pres++;
                    break;
                }
                else if (cont === challengeAdded.length && pres ===0 ){
                    addChallenge(challTemp.id, 1);
                    setSuccessAdd(true);
                    tmp.push(challTemp);
                    setChallengeAdded(tmp);
                }
            }
        }
    }
    else
        setSuccessAdd(false);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 10,
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    userBtn1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1976D2',
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    userBtn2: {
        backgroundColor: '#c1121f',
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    }
});

export default ChallengeScreen;