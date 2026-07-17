import React, { useState } from 'react';
import { View, FlatList, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserImg } from '../styles/MessageStyles';


const FriendshipRequestsScreen = ({ updateListInfoUser, listReqFriendship, listReqSentFriendship, filters }) => {
    const navigation = useNavigation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalSureToAdd, setModalSureToAdd] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalSureToDelete, setModalSureToDelete] = useState(false);
    const [user, setUser] = useState({});

    return (
        <>
            <TouchableOpacity style={[styles.button, {
                backgroundColor: '#fff', borderColor: '#000',
                flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#000'
            }]}
                onPress={() => navigation.navigate('RequestSent', {listFriendsUser: listReqFriendship, filters: filters })} >

                <Text style={[styles.buttonText, { color: '#000'}]}>Friendship requests sent</Text>
                <Ionicons name="time-outline" size={25} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 0 }}>
                <Text> List of users that sent you a request </Text>
            </View>

            <FlatList data={listReqFriendship} keyExtractor={item => item.userID} renderItem={({ item }) => (

                <Card containerStyle={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: 'grey', }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        width: '100%',
                        marginTop: 5
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 0 }}>
                            <Pressable onPress={() => navigation.navigate('FriendProfile', { userImg: item.userImg, 
                                userName: item.userName, bio: item.bio,
                                 userID: item.userID, listFriendsUser: listReqFriendship, filters: filters })}>
                                <UserImg source={item.userImg} />
                            </Pressable>
                            <Text style={{ marginHorizontal: 5, marginTop: 15, fontWeight: 'bold' }}> {item.userName} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Pressable onPress={() => { setModalSureToDelete(!modalSureToDelete); setUser(item); }}>
                                <Ionicons name='close-circle-outline' size={40} color='#c1121f' > </Ionicons>
                            </Pressable>
                            <Pressable onPress={() => { setModalSureToAdd(!modalSureToAdd); setUser(item); }}>
                                <Ionicons name='checkmark-circle-outline' size={40} color='#1976D2' > </Ionicons>
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
                        <Text style={styles.modalText}> Are you sure to delete {user.userName}'s friendship request ? </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => { setModalSureToDelete(!modalSureToDelete) }}>
                                <Text style={styles.userBtnTxt}>Don't delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => { setModalSureToDelete(!modalSureToDelete); setModalDelete(!modalDelete); updateListInfoUser(user.userID, "not_friend"); }}>
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
                    <View style={[styles.modalView]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalDelete(!modalDelete)}></Ionicons>
                        </View>
                        <Text style={styles.modalText}> {user.userName}'s friendship request deleted.</Text>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalSureToAdd} onRequestClose={() => {
                 setModalSureToAdd(!modalSureToAdd);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Are you sure to add {user.userName}as how a new friend ? </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => { setModalSureToAdd(!modalSureToAdd) }}>
                                <Text style={styles.userBtnTxt}>Don't add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => { setModalSureToAdd(!modalSureToAdd); setModalAdd(!modalAdd); updateListInfoUser(user.userID, "friend"); }}>
                                <Text style={styles.userBtnTxt}>Add </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalAdd} onRequestClose={() => {
                 setModalAdd(!modalAdd);
            }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalAdd(!modalAdd)}></Ionicons>
                        </View>
                        <Text style={[styles.modalText,]}> {user.userName} is now your friend!</Text>
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

export default FriendshipRequestsScreen;