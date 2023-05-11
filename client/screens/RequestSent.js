import React, { useState } from 'react';
import { View, FlatList, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserImg } from '../styles/MessageStyles';


const RequestSent = ({ updateListInfoUser, listReqSentFriendship, filters }) => {
    const navigation = useNavigation();

    const [modalDelete, setModalDelete] = useState(false);
    const [modalSureToDelete, setModalSureToDelete] = useState(false);
    const [user, setUser] = useState({});

    return (
        <>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0 }}>
                <Text style={{fontSize:14}}> List of users to whom you have sent a friendship request </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 0, marginBottom: 20 }}>
                <Text> Click on the X to delete it </Text>
            </View>

            <FlatList data={listReqSentFriendship} keyExtractor={item => item.userID} renderItem={({ item }) => (

                <Card containerStyle={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: 'grey', }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        width: '100%',
                        marginTop: 5
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 0 }}>
                            <Pressable onPress={() => navigation.navigate('FriendProfile', {
                                userImg: item.userImg, bio: item.bio,
                                 userName: item.userName, userID: item.userID, listFriendsUser: listReqSentFriendship, filters: filters
                            })}>
                                <UserImg source={item.userImg} />

                            </Pressable>
                            <Text style={{ marginHorizontal: 5, marginTop: 15, fontWeight: 'bold' }}> {item.userName} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Pressable onPress={() => { setModalSureToDelete(!modalSureToDelete); setUser(item); }}>
                                <Ionicons name='close-circle-outline' size={40} color='#c1121f' > </Ionicons>
                            </Pressable>

                        </View>
                    </View>
                </Card>
            )}
            />

            <Modal animationType="slide" transparent={true} visible={modalSureToDelete} onRequestClose={() => {
                  setModalSureToDelete(!modalSureToDelete);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Are you sure to delete {user.userName}'s friendship request ?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => { setModalSureToDelete(!modalSureToDelete) }}>
                                <Text style={styles.userBtnTxt}>Don't delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => {
                                    setModalSureToDelete(!modalSureToDelete);
                                    setModalDelete(!modalDelete); updateListInfoUser(user.userID, "not_friend");
                                }}>
                                <Text style={styles.userBtnTxt}>Delete </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalDelete} onRequestClose={() => {
                  setModalDelete(!modalDelete);
            }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView,]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalDelete(!modalDelete)}></Ionicons>
                        </View>
                        <Text style={styles.modalText}> {user.userName}'s friendship request deleted.</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}

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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    userBtnTxt: {
        color: '#ffffff',
        fontWeight: 'bold',
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
    userBtn2: {
        backgroundColor: '#c1121f',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    },
    button: {
        backgroundColor: '#1976D2',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    badgeContainer: {
        position: 'absolute',
        top: 4,
        right: 2,
    },
});

export default RequestSent;