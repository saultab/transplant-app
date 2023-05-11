import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChallengeImg, UserChallengeWrapper, ChallengeImg2 } from '../styles/MessageStyles';

const ChallengeScreen = ({ listChallSuperUser, deleteChallenge, listChallenge, addChallenge, updateChallenge}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteChall, setModalDeleteChall] = useState(false);
    const [modalNewChallenge, setModalNewChallenge] = useState(false);
    const [modalNoChallenge, setModalNoChallenge] = useState(false);
    const [modalChallengeAdded, setModalChallengeAdded] = useState(false);
    const [challTemp, setChallTemp] = useState({});
    const [challToAdd, setChallToAdd] = useState({});
    const [loading, setLoading] = useState(false);
    const [challengeDiscarded, setChallengeDiscarded] = useState([]);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);


    return (
        <>
            <TouchableOpacity style={[styles.userBtn3, {
                flexDirection: 'row', justifyContent: 'center',
                marginTop: 10, alignItems: 'center',
            }]}
                onPress={() => {
                    setModalNewChallenge(!modalNewChallenge); findChallenge({
                        listChallenge: listChallenge, setChallToAdd: setChallToAdd,
                        listChallSuperUser: listChallSuperUser, setModalNoChallenge: setModalNoChallenge,
                        setModalNewChallenge: setModalNewChallenge, challengeDiscarded: challengeDiscarded
                    }); setLoading(true)
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>New challenge by AI </Text>

                <View style={styles.circleButton}>
                    <Ionicons name="ios-add" size={24} color="white" />
                </View>
            </TouchableOpacity>

            <FlatList data={listChallSuperUser} keyExtractor={item => item.id + item.titolo} renderItem={({ item }) => (<>
                {item.completed == "true" ?
                    <Card containerStyle={{
                        marginTop: 15,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'grey',
                        backgroundColor: '#669BBC'
                    }} >
                        <UserChallengeWrapper>
                            <ChallengeImg source={item.ChallengeImg} />
                        </UserChallengeWrapper>
                        <Text style={{ color: 'white', textAlign: 'left', fontWeight: 'bold', fontSize: 19 }} >{item.titolo}</Text>
                        <Text style={{ color: 'white', textAlign: 'left', fontSize: 14 }} >{"\nCompleted for today, well done!"}</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                            <Pressable onPress={() => { setModalVisible(true); setChallTemp(item); }}>
                                <Ionicons name='trash-outline' size={25} color='white'> </Ionicons>
                            </Pressable>
                        </View>
                    </Card> :
                    <Pressable onPress={() => navigation.navigate('ChallengeOpened', {
                        item: item, updateChallenge:updateChallenge, itemID: item.id,
                    })}>
                        <Card containerStyle={{ marginTop: 15, borderRadius: 10, borderWidth: 1, borderColor: 'grey' }} >
                            <UserChallengeWrapper>
                                <ChallengeImg source={item.ChallengeImg} />
                            </UserChallengeWrapper>
                            <Text style={{ marginBottom: 0, alignContent: 'flex-start', fontWeight: 'bold', fontSize: 18 }}>{item.titolo}</Text>

                            <Text style={{ justifyContent: 'flex-start' }} >{item.descrizione}</Text>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                                marginTop: 0,
                                alignItems: 'center'
                            }}>
                                <Text style={{ marginHorizontal: 5, borderRadius: 5, backgroundColor: '#fdf0d5' }}> {item.hastag} </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                                    <Pressable onPress={() => { setModalVisible(true); setChallTemp(item); }}>
                                        <Ionicons name='trash-outline' size={25} color='#c1121f'> </Ionicons>
                                    </Pressable>

                                </View>
                            </View>
                            <Card.Divider />
                        </Card>
                    </Pressable>}</>
            )}
            />

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Are you sure to remove the challenge "{challTemp.titolo}" ?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Don't remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => { setModalVisible(!modalVisible); deleteChallenge(1, challTemp.id); setModalDeleteChall(!modalDeleteChall) }}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal animationType="slide" transparent={true} visible={modalDeleteChall} onRequestClose={() => {
                setModalDeleteChall(!modalDeleteChall);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalDeleteChall(!modalDeleteChall)}> </Ionicons>
                        </View>
                        <Text style={styles.modalText}> {"The challenge has been deleted!"}</Text>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalNewChallenge} onRequestClose={() => {
                setModalNewChallenge(!modalNewChallenge);
            }}>
                <View style={styles.centeredView}>
                    {loading ?
                        <View style={styles.modalView2}>
                            <Text style={styles.modalText2}>
                                {"Wait a few moments...\n\nThe artificial intelligence is looking for the most suitable challenges for you."}</Text>
                            <ActivityIndicator size={65} color="#fff" />
                        </View>
                        :
                        <View style={styles.modalView}>
                             <Text style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                marginBottom: 15,
                                marginTop: 5,
                                borderRadius: 5,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}> {challToAdd.titolo} </Text>

                            <UserChallengeWrapper>
                                <ChallengeImg2 source={challToAdd.ChallengeImg} />
                            </UserChallengeWrapper>

                            <Text style={{
                                justifyContent: 'flex-start',
                                fontWeight: 'bold',
                            }}>Description:  </Text>

                            <Text style={{ justifyContent: 'flex-start' }}>{challToAdd.descrizione} and has been customized according to your parameters and preferences. </Text>

                            <Text style={{ justifyContent: 'flex-start', }}>{"You are compatible over 90% due to:"}</Text>

                            <Text style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                marginBottom: 20,
                                marginTop: 10,
                                backgroundColor: '#fdf0d5',
                                borderRadius: 5,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}> {challToAdd.hastag} </Text>

                            <Text style={styles.modalText}>Are you sure to add this challenge ?</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={styles.userBtn2}
                                    onPress={() => {setModalNewChallenge(!modalNewChallenge); scartate({ setChallengeDiscarded : setChallengeDiscarded, challengeDiscarded: challengeDiscarded, challToAdd: challToAdd }); }}>
                                    <Text style={styles.textStyle}>Don't add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.userBtn1}
                                    onPress={() => { setModalNewChallenge(!modalNewChallenge); addChallenge(challToAdd.id, 1); setModalChallengeAdded(!modalChallengeAdded) }}>
                                    <Text style={styles.textStyle}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalChallengeAdded} onRequestClose={() => {
                setModalChallengeAdded(!modalChallengeAdded);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalChallengeAdded(!modalChallengeAdded)}> </Ionicons>
                        </View>
                        <Text style={[styles.modalText, { fontSize: 14 }]}> {"The challenge has been added to your list!"}</Text>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalNoChallenge} onRequestClose={() => {
                setModalNoChallenge(!modalNoChallenge);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalNoChallenge(!modalNoChallenge)}> </Ionicons>
                        </View>
                        <Text style={styles.modalText}> {"The AI need more time to process new challenges!"}</Text>
                        <Text style={styles.modalText}> {"Stay tuned."}</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}

function scartate({challengeDiscarded, setChallengeDiscarded, challToAdd}) {
    let tmp2 = challengeDiscarded;
    tmp2.push(challToAdd);
    setChallengeDiscarded(tmp2);
}

function findChallenge({ listChallenge, setChallToAdd, listChallSuperUser, setModalNoChallenge, setModalNewChallenge, challengeDiscarded }) {
    for (let i = 0, trovato = 0; i < listChallenge.length && trovato < 1; i++) {
        for (let j = 0, ok = 0; j < listChallSuperUser.length && ok < 1; j++) {
            if (listChallSuperUser[j].id === listChallenge[i].id) {
                ok = 1;
                break;
            }
            if (j === listChallSuperUser.length - 1 && ok === 0) {
                if(challengeDiscarded.length===0){
                    setChallToAdd(listChallenge[i]);
                    trovato = 1;
                    ok = 1;
                    break;
                }
                else{
                    const lun = challengeDiscarded.length;
                    let cont = 0, presente = 0;
                    for(const c1 of challengeDiscarded){
                        cont++;
                        if (c1.id === listChallenge[i].id){
                            presente = 1;
                            ok = 1;
                            break;
                        }
                        else if (cont === challengeDiscarded.length  && presente === 0){
                            setChallToAdd(listChallenge[i]);
                            trovato = 1;
                            ok = 1;
                            break;
                        }
                    }
                }
            }
        }
        if (i === listChallenge.length - 1 && trovato === 0) {
            setModalNoChallenge(modalNoChallenge => !modalNoChallenge);
            setModalNewChallenge(false);
        }
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 30,
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
    modalView2: {
        margin: 20,
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

        backgroundColor: '#669BBC',
        borderWidth: 1.5,
        borderColor: 'grey',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalText2: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    userBtn2: {
        backgroundColor: '#c1121f',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    userBtn1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1976D2',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    userBtn3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    circleButton: {
        width: 30,
        height: 30,
        borderRadius: 70,
        backgroundColor: '#1976D2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        color: 'white',
        textAlign: 'center',
        position: 'relative',
    },
});

export default ChallengeScreen;