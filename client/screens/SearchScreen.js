import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, FlatList, Modal, TextInput, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { UserImg } from '../styles/MessageStyles';

const vettFilter = ["Walks", "Gaming", "Swim", "Music", "Disco", "Nature", "Health", "Cooking"];


const SendMessage = ({ onSubmit, message, setMessage }) => {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(message);
        }
        setMessage('');
        Keyboard.dismiss();
    };
    return (
        <View >
            <TextInput
                placeholder={` Type here...`}
                value={message}
                onChangeText={text => setMessage(text)}
                onSubmitEditing={() => { Keyboard.dismiss(); handleSubmit() }}
                returnKeyType="send"
                multiline={true}
                textAlignVertical='top'
                style={{ borderColor: 'gray', minHeight: 60, borderWidth: 1.5, borderRadius: 15, padding: 10, }}
            />
        </View>

    );
};

const CommentInput = ({ onSubmit, comment, setComment, setUsers, listSearchFriend }) => {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(comment);
        }
        setComment('');
    };
    const handleSearch = () => {
        let filteredUsers = [];
        for (const c1 of listSearchFriend) {
            if (c1.userName.includes(comment)) {
                filteredUsers.push(c1);
            }
        }

        setUsers(filteredUsers);
        setComment('');
        Keyboard.dismiss();
    }
    return (
        <>

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    placeholder={`Search username...`}
                    keyboardType='default'
                    value={comment}
                    onChangeText={text => setComment(text)}
                    onSubmitEditing={() => { Keyboard.dismiss(); handleSubmit() }}
                    returnKeyType="send"
                    multiline={true}
                    textAlignVertical='center'
                    style={{ borderWidth: 1, borderColor: '#000', borderRadius: 20, padding: 10, flex: 1 }}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search-outline" size={25} color="#000" style={{ position: 'absolute', right: 10, top: 12 }} />
                </TouchableOpacity>
            </View>

        </>
    );
};

const FilterInput = ({ onSubmit, filter, setFilter, setUsers, listSearchFriend, myFilters }) => {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(filter);
        }
        setFilter('');
        Keyboard.dismiss();
    };
    const handleSearch = () => {
        let filteredUsers = [];
        for (const c1 of myFilters) {
            if (c1.filter == filter) {
                filteredUsers.push(c1.userID);
            }
        }
        let finalUsers = [];
        for (const c1 of listSearchFriend) {
            for (const c2 of filteredUsers) {
                if (c1.userID == c2) {
                    finalUsers.push(c1);
                }
            }
        }
        setUsers(finalUsers);
        setFilter('');
        Keyboard.dismiss();
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                placeholder={` Search by popular interests...`}
                value={filter}
                onChangeText={text => setFilter(text)}
                onSubmitEditing={() => { Keyboard.dismiss(); handleSubmit() }}
                returnKeyType="send"
                multiline={true}
                textAlignVertical='center'
                style={{ borderWidth: 1, borderColor: '#000', borderRadius: 20, padding: 10, flex: 1 }}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Ionicons name="search-outline" size={25} color="#000" style={{ position: 'absolute', right: 10, top: 12 }} />
            </TouchableOpacity>
        </View>
    );
};

const SearchScreen = ({ updateListInfoUser, listSearchFriend, filters }) => {
    const navigation = useNavigation();
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState('');
    const [modalAdd, setModalAdd] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [idRequest, setIdRequest] = useState();
    const [modalRequestSent, setModalRequestSent] = useState(false);
    const [myFilters, setMyFilters] = useState([]); // lista dei filtri utenti search
    const [showFilter, setShowFilter] = useState(false); // flag per nascondere o mostrare i filtri

    useEffect(() => {
        let elenco = [];
        for (const row of filters) {
            for (const tmp of listSearchFriend) {
                if (tmp.userID == row.userID)
                    elenco.push(row);
            }
        };
        setMyFilters(elenco);
    }, [])

    return (
        <>
            <TouchableOpacity style={{ marginLeft: 11, marginRight: 11, marginTop: 10, borderRadius: 20, backgroundColor: '#fff' }} >
                <CommentInput onSubmit={text => setComment(text)} setComment={setComment} comment={comment} listSearchFriend={listSearchFriend} setUsers={setUsers} />
            </TouchableOpacity>


            <View style={[styles.separator, { borderWidth: 1, borderColor: 'grey', marginTop: 10, display: 'flex', flexDirection: 'row' }]}>

                <View style={{ flex: 1, flexBasis: '50%' }}>

                    <Text style={[styles.buttonText, {
                         marginLeft:110, fontSize: 17 }]} >Popular interests</Text>
            </View>


            {showFilter ?
                <>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        justifyContent: 'flex-end', alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={() => { setShowFilter(!showFilter) }} >
                            <Ionicons name="ios-arrow-up-circle" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        justifyContent: 'flex-end', alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={() => { setShowFilter(!showFilter) }} >
                            <Ionicons name="ios-arrow-down-circle" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View>

            {
        showFilter ? <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {vettFilter.map((item, i) => (
                    <TouchableOpacity key={i} onPress={() => { setFilter(item) }}>
                        <Card containerStyle={{
                            marginTop: 10, marginRight: 5, marginLeft: 10, borderRadius: 20, backgroundColor: '#FDF0D5',
                            borderWidth: 1, borderColor: 'grey',
                        }}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 13 }} >{item}</Text>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={{ margin: 10, marginLeft: 11, marginRight: 11, borderRadius: 20, backgroundColor: '#fff' }} >
                <FilterInput onSubmit={text => setFilter(text)} setFilter={setFilter} filter={filter} myFilters={myFilters} setUsers={setUsers} listSearchFriend={listSearchFriend} />
            </TouchableOpacity></> : false
    }

    {
        users?.length > 0 ?
        <>
            <View style={[styles.separator, { backgroundColor: '#669BBC', borderWidth: 1, borderColor: 'grey', marginTop: 10 }]}>
                <Text style={[styles.buttonText, { color: 'white', fontSize: 17 }]}>Results:</Text>
            </View>
            <FlatList data={users} keyExtractor={item => item.userID} renderItem={({ item }) => (
                <Card containerStyle={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: 'grey' }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Pressable onPress={() =>
                                navigation.navigate('FriendProfile',
                                    {
                                        userImg: item.userImg, bio: item.bio,
                                        userName: item.userName, userID: item.userID, listFriendsUser: users, filters: filters
                                    })}>
                                <UserImg source={item.userImg} />
                            </Pressable>
                            <Text style={{ marginHorizontal: 5, marginTop: 15, fontWeight: 'bold' }}> {item.userName} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 0 }}>
                            <Ionicons onPress={() => { setModalAdd(!modalAdd); setIdRequest(item.userID); }}
                                name='ios-add-circle-outline' size={45} style={{ marginLeft: 10, marginTop: 1 }} color='#1976D2' />
                        </View>
                    </View>
                </Card>
            )} />
        </> : false
    }

            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalAdd} onRequestClose={() => {
                      setModalAdd(!modalAdd);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                {`\n  If you want, you can send a message with your friendship request:`}
                            </Text>
                            <SendMessage onSubmit={text => setMessage(text)} setMessage={setMessage} message={message} />
                            <Text style={styles.modalText}> {`\nAre you sure to send the request?`} </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <TouchableOpacity style={styles.userBtn2}
                                    onPress={() => { setModalAdd(!modalAdd); setMessage('') }}>
                                    <Text style={styles.userBtnTxt}>Don't send</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.userBtn1}
                                    onPress={() => { setModalAdd(!modalAdd); setModalRequestSent(!modalRequestSent); setMessage(''); updateListInfoUser(idRequest, "not_friend"); }}>
                                    <Text style={styles.userBtnTxt}>Send </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.centeredView} >
                <Modal animationType="slide" transparent={true} visible={modalRequestSent} onRequestClose={() => {
                      setModalRequestSent(!modalRequestSent);
                }}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView,]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Ionicons name={'close'} size={25}
                                    onPress={() => { setModalRequestSent(!modalRequestSent); setUsers(users.filter(val => val.userID != idRequest)) }}></Ionicons>
                            </View>
                            <Text style={[styles.modalText]}> {"\nThe request has been successfully sent!\n"}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 0,
    },
    separator: {
        backgroundColor: '#669BBC',
        alignItems: 'center',
        borderRadius: 7,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1.5,
        borderColor: 'black',
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
});

export default SearchScreen;