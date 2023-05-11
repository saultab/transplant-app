import React, { useState, useEffect, useCallback } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);
  const [smsToDelete, setSmsToDelete] = useState({});
  const [modalDeleteOk, setModalDeleteOk] = useState(false);

  useEffect(() => {
    setMessages(route.params.listSingleChat.filter(es => es.friendID == route.params.item.userID).map(el => {
      if (el.type == "send") {
        return {
          ...el,
          createdAt: new Date(),
          user: { _id: 1, }
        }
      }
      else {
        return {
          ...el,
          createdAt: new Date(),
          user: { _id: 2 }
        }
      }
    }).reverse());
  }, []);

  const onSend = useCallback((newMessages = []) => {
    let max = 0;
    setMessages((previousMessages) => {
      if(previousMessages.length>0)
        max = previousMessages.reduce(function (prev, current) { return (prev._id > current._id) ? prev : current })._id;
      return GiftedChat.append(previousMessages, newMessages);
    }
    );
    const newSms = { friendID: route.params.item.userID, myID: 1, _id: max + 1, text: newMessages[0].text, type: "send", idGlobal: route.params.totalMex+1 };
    route.params.addMessage(newSms);
    let val =route.params.listChats.find( utente => utente.userID==route.params.item.userID);
    if(!val){
      const newChat ={userID: route.params.item.userID, userName: route.params.item.userName, userImg: `./assets/users/${route.params.item.userID}.jpg`, messageTime: "1 min ago"};
      route.params.addListChats(newChat);
    }
    else {
      route.params.updateMessageTime("1 min ago",route.params.item.userID);
    }
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={40}
            color="#1976D2"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1976D2',//colore del messaggio mandato
          },
          left: {
            backgroundColor: '#FFFFFF'// colore del messaggio ricevuto (#FFCE54)
          }
        }}
        textStyle={{
          right: {
            color: '#fff',//bianco
          },
          left: {
            color: '#000'//nero
          }
        }}
      />
    );
  };

  const onPress = (context, message) => {
    setModal(true);
    setSmsToDelete(message);
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        onLongPress={onPress}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderAvatar={() => {
          return (
            <MaterialCommunityIcons />)
        }}
      />
      <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={() => { setModal(!modal); }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete this message?</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={styles.userBtn2}
                onPress={() => { setModal(!modal); }}>
                <Text style={styles.textStyle}>Don't delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userBtn1}
                onPress={() => { setModal(!modal);setMessages(previousMessages => previousMessages.filter(m => m._id !== smsToDelete._id));
                  route.params.deleteMessage(smsToDelete._id, route.params.item.userID); setModalDeleteOk(!modalDeleteOk);}}>
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalDeleteOk} onRequestClose={() => {
        setModalDeleteOk(!modalDeleteOk);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 0 }}>
              <Ionicons name={'close'} size={25}
                onPress={() => setModalDeleteOk(!modalDeleteOk)}> </Ionicons>
            </View>
            <Text style={[styles.modalText, { fontSize: 14 }]}> {"The message has been deleted"}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#ffffff',
  },
  modalText: {
      marginBottom: 15,
      textAlign: 'center',
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
});

export default ChatScreen;
