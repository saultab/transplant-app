import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from '../styles/MessageStyles';


const ProfileScreen = ({ navigation, myInfo }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('../assets/sfondo6.jpg')} style={styles.image}>
                    <Image
                        style={[styles.userImg, { marginTop: 20 }]}
                        source={myInfo.userImg}
                    />
                    <Text style={styles.userName}>{myInfo.name}</Text>
                </ImageBackground>

                <View style={styles.menuWrapper}>

                    <TouchableOpacity onPress={() => navigation.navigate('Questionnaire')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText}>Questionnaire</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('NameTel')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText} >Info</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Bio')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText}>Bio</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Privacy')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText}>Privacy</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText}>Notifications</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Language')} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.menuItemText}>Language</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 0 }}>
                        <Text style={styles.menuItemText}>Delete profile</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="black" />
                    </TouchableOpacity>

                </View>

                <View style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn2}>
                        <Text style={styles.userBtnTxt}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.userBtn1}
                        onPress={() => navigation.navigate('Help')}>
                        <Text style={styles.userBtnTxt}>Help </Text>
                        <Ionicons name="help-circle-outline" size={18} color="#2e64e5" style={styles.userBtnTxt} />
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        width: 500,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginBottom: 20,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 0,
        marginTop: 60
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
        backgroundColor: '#C1121F',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    userBtnTxt: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    menuWrapper: {
        marginTop: 40,
        justifyContent: 'center',
        width: '70%',
        alignContent: 'space-between',
        flexDirection: 'column',
    },
    menuItemText: {
        marginLeft: 15,
        fontWeight: '600',
        fontSize: 16,
    },
});