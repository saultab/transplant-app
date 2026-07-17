import * as React from 'react';
import { useState} from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text } from 'react-native-elements';
import { SingleChallengeImg } from '../styles/MessageStyles';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';


export default function ChallengeOpenedScreen({ route }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);


    return (
        <>
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={[styles.container]}>
                    <Text style={{ marginBottom: 15 }} h4> {route.params.item.titolo}</Text>

                    <SingleChallengeImg source={route.params.item.ChallengeImg} />


                    <Text style={styles.headline}>Have you completed this challenge for today? </Text>
                    <TouchableOpacity
                        style={styles.userBtn1}
                        onPress={() => { setModalVisible(!modalVisible);}}>
                        <Text style={styles.textStyle}>Completed</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 50 }}>
                        <Rating
                            startingValue={rating}
                            ratingCount={5}
                            imageSize={40}
                            ratingBackgroundColor='#c8c7c8'
                            onFinishRating={(rating) => setRating(rating)}
                        />
                    </View>

                    <Modal animationType="slide"  transparent= {true} visible={modalVisible} onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Are you sure to set this challenge as completed? </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <TouchableOpacity style={styles.userBtn2}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Don't set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.userBtn1}
                                onPress={() => { setModalVisible(!modalVisible); 
                                route.params.updateChallenge(route.params.item.id);
                                navigation.navigate('Challenges')}}>
                                <Text style={styles.textStyle}>Set</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

                </View>
               
            </ScrollView>

           
        </>
    );
}


var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",

    },
    topBox: {
        justifyContent: 'center',
        textAlign: 'justify',
    },
    headline: {
        fontSize: 15,
        paddingHorizontal: 25,
        textAlign: 'justify',
        marginTop: 20,
    },
    userBtn1: {
        width: 110,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#1976D2',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        marginTop: 20,
        borderColor: 'grey',
    },
    
    userBtn2: {
        width: 110,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#c1121f',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderWidth: 1.5,
        marginTop: 20,
        borderColor: 'grey',
      
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color: '#ffffff',
    },
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});