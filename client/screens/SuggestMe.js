import React, { useState } from 'react';
import { View, FlatList, Modal, TouchableOpacity, StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserImg, } from '../styles/MessageStyles';

const CommentInput = ({ onSubmit, comment, setComment }) => {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(comment);
        }
        setComment('');
    };
    return (
        <View >
            <TextInput
                placeholder={` Type here...`}
                value={comment}
                onChangeText={text => setComment(text)}
                onSubmitEditing={handleSubmit}
                returnKeyType="send"
                multiline={true}
                textAlignVertical='top'
                style={{ borderColor: 'gray', minHeight: 60, borderWidth: 1.5, borderRadius: 15, padding: 10, }}
            />
        </View>

    );
};

const SuggestMe = ({ updateListInfoUser, listSuggestMe, filters }) => {
    const navigation = useNavigation();
    const [comment, setComment] = useState('');
    const [modalAdd, setModalAdd] = useState(false);
    const [modalPercentage, setModalPercentage] = useState(false); // info su percentage
    const [modalRequestSent, setModalRequestSent] = useState(false);
    const [valPercent, setValPercent] = useState();//valore percentuale
    const [idRequest, setIdRequest] = useState();


    const [myFilters, setMyFilters] = useState(["Liver transplant", "Virginia's Hospital",
        "Engineer", "Gaming", "Music", "American"]); // lista dei filtri 

    return (
        <>
            <View>
                <Text style={{
                    flexDirection: 'row', textAlign: 'center',
                    justifyContent: 'center', marginTop: 10, marginBottom: 10,
                    marginRight: 20, marginLeft: 20
                }}>
                    {"Click on the + to add new friend \nor the percentage for info about compatibility"}</Text>
            </View>

            <FlatList data={listSuggestMe} keyExtractor={item => item.userID} renderItem={({ item }) => (
                <Card containerStyle={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: 'grey', }}>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Pressable onPress={() => navigation.navigate('FriendProfile', {
                                userImg: item.userImg, bio: item.bio,
                                userName: item.userName, userID: item.userID, listFriendsUser: listSuggestMe, filters: filters
                            })}>
                                <UserImg source={item.userImg} />
                            </Pressable>

                            <Text style={{ marginHorizontal: 5, marginTop: 15, fontWeight: 'bold' }}> {item.userName} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 0 }}>
                            <Pressable onPress={() => {
                                setValPercent(item.percentage); setModalPercentage(!modalPercentage)
                            }}>
                                <Image source={item.percentagePath} style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 5
                                }} />
                            </Pressable>
                            <Ionicons onPress={() => { setModalAdd(!modalAdd); setIdRequest(item.userID); }}
                                name='ios-add-circle-outline' size={45} style={{ marginLeft: 10, marginTop: 1 }} color='#1976D2' />

                        </View>
                    </View>
                </Card>)}
            />


            <Modal animationType="slide" transparent={true} visible={modalPercentage} onRequestClose={() => {
                  setModalPercentage(!modalPercentage);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalPercentage(!modalPercentage)}></Ionicons>
                        </View>
                        <Text style={styles.modalText}>
                            {`You are ${valPercent}% compatible with this user thanks to the following information:\n`}
                        </Text>

                        <View style={[styles.userBtnWrapper2, { flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', paddingLeft: 11, marginTop: -10, marginBottom: 20 }]}>
                            {myFilters.map((item, i) => (
                                <Text key={i} style={{ paddingHorizontal: 5, paddingVertical: 2, marginHorizontal: 5, marginVertical: 5, borderRadius: 5, backgroundColor: '#fdf0d5' }}> {item} </Text>
                            ))}
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalRequestSent} onRequestClose={() => {
                  setModalRequestSent(!modalRequestSent);
            }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView,]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Ionicons name={'close'} size={25}
                                onPress={() => setModalRequestSent(!modalRequestSent)}></Ionicons>
                        </View>
                        <Text style={[styles.modalText]}> {"\nThe request has been successfully sent!\n"}</Text>
                    </View>
                </View>
            </Modal>


            <Modal animationType="slide" transparent={true} visible={modalAdd} onRequestClose={() => {
                  setModalAdd(!modalAdd);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {`\n  If you want, you can send a message with your friendship request:`}
                        </Text>
                        <CommentInput onSubmit={text => setComment(text)} setComment={setComment} comment={comment} />
                        <Text style={styles.modalText}> {`\nAre you sure to send the request?`} </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => { setModalAdd(!modalAdd); setComment('') }}>
                                <Text style={styles.userBtnTxt}>Don't send</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => {
                                    setModalAdd(!modalAdd); setModalRequestSent(!modalRequestSent);
                                    setComment(''); updateListInfoUser(idRequest, "request_sent");
                                }}>
                                <Text style={styles.userBtnTxt}>Send </Text>
                            </TouchableOpacity>
                        </View>
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
    modalText2: {
        marginBottom: 15,
        textAlign: 'center',
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
});

export default SuggestMe;