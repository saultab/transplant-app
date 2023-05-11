import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ProfileItem, Card } from '../styles/MessageStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OptionsCard = ({ item, myFilters }) => {
    return (
        <>
            <ProfileItem key={1}>
                <ListItem >
                    <ListItem.Content>
                        <ListItem.Subtitle>{"Transplant"}</ListItem.Subtitle>
                        <ListItem.Title>{item.transplant}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </ProfileItem>

            <ProfileItem key={2}>
                <ListItem >
                    <ListItem.Content>
                        <ListItem.Subtitle>{"Telephone"}</ListItem.Subtitle>
                        {item.request_state == "friend" ? <ListItem.Title>{item.telephone}</ListItem.Title> : <ListItem.Title>**********</ListItem.Title>}
                    </ListItem.Content>
                </ListItem>
            </ProfileItem>

            <ProfileItem key={3}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Subtitle>{"Birth date"}</ListItem.Subtitle>
                        <ListItem.Title>{item.birthdate}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </ProfileItem>

            <ProfileItem key={4}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Subtitle>{"Nationality"}</ListItem.Subtitle>
                        <ListItem.Title>{item.nationality}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </ProfileItem>

            <ProfileItem key={5}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Subtitle>{"Employ"}</ListItem.Subtitle>
                        <ListItem.Title>{item.employ}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </ProfileItem>

            {myFilters.length > 0 ?
                <ProfileItem key={6}>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Subtitle>{"Personal interest"}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </ProfileItem> : false}
        </>
    )
}

const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
    const [modalAdd, setModalAdd] = useState(false);
    const [challengeUtente, setChallengeUtente] = useState([]);
    const [dirty, setDirty] = useState(false);    //utile solo per settare le challenge dell'utente
    const infoUtente = route.params.listFriendsUser.filter(elem => elem.userID == route.params.userID)[0];
    const [myFilters, setMyFilters] = useState([]); // lista dei filtri 

    useEffect(() => {
        setMyFilters(route.params.filters.filter(row => row.userID == route.params.userID).map(row => row.filter));
    }, [])

    useEffect(() => {
        if (infoUtente.request_state == "friend") {
            if (route.params.listChallNormalUser.length > 0 && dirty === false) {
                setChallengeUtente(route.params.listChallNormalUser.filter(elem => elem.idUsers == route.params.userID));
                setDirty(true);
            }
        }

    }, [])

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}>
                <Image style={styles.userImg} source={route.params.userImg} />
                <Text style={styles.userName}> {route.params.userName} </Text>
                <Text style={{fontSize: 15}}> {route.params.bio}</Text>
                <Text style={styles.aboutUser}> {''} </Text>
                <OptionsCard key={infoUtente.userID} item={infoUtente} myFilters={myFilters} />

                {myFilters.length > 0 ?
                    <View style={[styles.userBtnWrapper2, { flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', paddingLeft: 11, marginTop: -10, marginBottom: 20 }]}>
                        {myFilters.map((item, i) => (
                            <Text key={i} style={{ paddingHorizontal: 5, paddingVertical: 2, marginHorizontal: 5, borderRadius: 5, backgroundColor: '#fdf0d5' }}> {item} </Text>
                        ))}
                    </View>
                    : false}

                {infoUtente.request_state == "friend" ?
                    <View style={styles.userBtnWrapper}>
                        <TouchableOpacity style={styles.userBtn2} onPress={() => setModalAdd(!modalAdd)}>
                            <Text style={styles.userBtnTxt}>Remove friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.userBtn1}
                            onPress={() => navigation.navigate('FriendChallenges', {
                                userName: route.params.userName,
                                listChallNormalUser: challengeUtente,
                                listChallSuperUser: route.params.listChallSuperUser,
                                addChallenge: route.params.addChallenge,
                            })}>
                            <Text style={styles.userBtnTxt}>{route.params.userName}'s challenges </Text>
                        </TouchableOpacity>

                    </View>
                    : <View style={styles.userBtnWrapper}></View>}

            </ScrollView>
            <View>
                <View style={styles.centeredView} >
                    <Modal animationType="slide" transparent={true} visible={modalAdd} onRequestClose={() => {
                    setModalAdd(!modalAdd);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    {`\nAre you sure to remove this user from your friends?`}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                    <TouchableOpacity style={styles.userBtn2}
                                        onPress={() => { setModalAdd(!modalAdd); }}>
                                        <Text style={styles.userBtnTxt}>Not remove</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.userBtn1}
                                        onPress={() => {
                                            setModalAdd(!modalAdd); route.params.updateListInfoUser(infoUtente.userID, "not_friend");
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Chats' }],
                                            })
                                        }}>
                                        <Text style={styles.userBtnTxt}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </>
    );
};

export default ProfileScreen;
const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#669BBC',
        alignItems: 'center',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 5,
        marginHorizontal: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    }, modalView: {
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
    userBtn2: {
        backgroundColor: '#c1121f',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    userBtn1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1976D2',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 100,
        marginTop: 40
    },
    userBtnWrapper2: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 0,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnTxt: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});