import * as React from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Card, UserInfo, UserImg, UserImgWrapper, UserInfoText, UserName, PostTime, MessageText } from '../styles/MessageStyles';
import { Ionicons } from 'react-native-vector-icons';

const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export default function ChatScreen({ listChallNormalUser, listChallSuperUser, addChallenge, listChats, listSingleChat, 
  addMessage, deleteMessage, listFriendsUser, updateListInfoUser,listReqSentFriendship, filters, totalMex, updateMessageTime }) {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <FlatList
          data={listChats}
          keyExtractor={item => item.userID}
          renderItem={({ item }) => (
            <Card>
              <UserInfo>
                <Pressable onPress={() => navigation.navigate('FriendProfile', {
                  userImg: item.userImg, userName: item.userName, listChallNormalUser: listChallNormalUser,
                  listChallSuperUser: listChallSuperUser, addChallenge: addChallenge, userID: item.userID, bio: item.bio,
                  listFriendsUser: listFriendsUser, updateListInfoUser: updateListInfoUser, filters: filters
                })}>
                  <UserImgWrapper>
                    <UserImg source={item.userImg} />
                  </UserImgWrapper>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Messages', {
                  userName: item.userName,
                  listSingleChat: listSingleChat, item: item, addMessage: addMessage, deleteMessage: deleteMessage,
                  listChats: listChats, totalMex: totalMex, updateMessageTime:updateMessageTime
                })}>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.userName}</UserName>
                      <PostTime>{item.messageTime}</PostTime>
                    </UserInfoText>
                    <MessageText>{item.messageText}</MessageText>
                  </TextSection>
                </Pressable>
              </UserInfo>
            </Card>

          )} />
      </Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignContent: "space-around",
          backgroundColor: "#ffffff",
          height: "auto",
          width: "auto"
        }}>
        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('PlusButton', { navigation })} >
        <Ionicons name={'add-circle' } size={52} color={'#1976D2'}> </Ionicons>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
   circleButton: {
     marginBottom: 20
   }
});