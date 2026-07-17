import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { UserImg } from '../styles/MessageStyles';


export default function PlusButton({ listFriendsUser, listChallNormalUser, listChallSuperUser, addChallenge,
    listChats, addListChats, listSingleChat, setListNonFriends, listNonFriends, listReqFriendship,
    listSuggestMe, addMessage, deleteMessage, listReqSentFriendship, filters, updateListInfoUser, updateMessageTime, totalMex }) {
    const navigation = useNavigation();
    return (
        <>

            <TouchableOpacity style={[styles.button, {
                backgroundColor: '#fff', borderColor: '#000',
                flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#000'
            }]}
                onPress={() => navigation.navigate('Search')} >
                <Text style={[styles.buttonText, { color: '#000' }]}>Search new friends</Text>
                <Ionicons name="search-outline" size={25} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#000',
                flexDirection: 'row', justifyContent: 'space-between'
            }]}
                onPress={() => navigation.navigate('LoadingScreen')}>
                <Text style={[styles.buttonText, { color: '#000' }]}>Suggest me new friends by AI</Text>
                <Ionicons name="person-add-outline" size={25} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#000',
                flexDirection: 'row', justifyContent: 'space-between'
            }]}
                onPress={() => navigation.navigate('FriendshipRequests')}>
                <Text style={[styles.buttonText, { color: '#000' }]}>Friendship requests</Text>

                <View style={styles.badgeContainer}>
                    <Ionicons name="mail-outline" size={25} color="#000" />
                    <View style={styles.badge} />
                </View>

            </TouchableOpacity>

            <View style={[styles.separator, { borderWidth: 1, borderColor: 'grey', borderRadius: 4, marginTop: 5, marginBottom: 5 }]}>
                <Text style={styles.buttonText}>List of friends</Text>
            </View>

            <FlatList data={listFriendsUser} keyExtractor={item => item.userID} renderItem={({ item }) => (
                <Card containerStyle={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: 'grey', }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Pressable onPress={() =>
                                navigation.navigate('FriendProfile',
                                    {
                                        userImg: item.userImg, userName: item.userName, listChallNormalUser: listChallNormalUser,
                                        listChallSuperUser: listChallSuperUser, addChallenge: addChallenge, userID: item.userID, bio: item.bio,
                                        listFriendsUser: listFriendsUser, filters: filters, updateListInfoUser: updateListInfoUser
                                    })}>
                                <UserImg source={item.userImg} />

                            </Pressable>
                            <Text style={{ marginHorizontal: 5, marginTop: 15, fontWeight: 'bold' }}> {item.userName} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }} >
                            <Button
                                onPress={() => navigation.navigate('Messages', {
                                    userName: item.userName, listSingleChat: listSingleChat, totalMex: totalMex,
                                    item: item, addMessage: addMessage, deleteMessage: deleteMessage,
                                    addListChats: addListChats, listChats: listChats, updateMessageTime: updateMessageTime
                                })}
                                title="    chat    "
                                containerStyle={{ borderRadius: 5 }}>
                            </Button>
                        </View>

                    </View>
                </Card>
            )}
            />

        </>
    );
}

const styles = StyleSheet.create({
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    },
    separator: {
        backgroundColor: '#669bbc',
        height: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    badgeContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: -3,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#c1121f',
    },
});