import * as React from 'react';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

// Screens
import ChatScreen from '../screens/ChatScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import HelpScreen from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import FriendProfileScreen from '../screens/FriendProfileScreen';
import FriendChallengeScreen from '../screens/FriendChallengeScreen';
import PlusButton from '../screens/PlusButton';
import FriendshipRequestsScreen from '../screens/FriendshipRequestsScreen';
import SuggestMe from '../screens/SuggestMe';
import SearchScreen from '../screens/SearchScreen';
import LoadingScreen from '../screens/LoadingScreen';
import RequestSent from '../screens/RequestSent';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import NameTelScreen from '../screens/NameTelScreen';
import BioScreen from '../screens/BioScreen';
import Privacy from '../screens/Privacy';
import Notifications from '../screens/Notifications';
import Language from '../screens/Language';
import ChallengeOpenedScreen from '../screens/ChallengeOpenedScreen';

//Screen names
const chatName = "Chat";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MessageStack({ navigation, listChallSuperUser, listChallNormalUser, addChallenge,
  listChats, addListChats, listSingleChat, listFriendsUser, addMessage, deleteMessage,
  listNonFriends, setListNonFriends, listReqFriendship, listSuggestMe, updateListInfoUser, listSearchFriend,
  listReqSentFriendship, filters, totalMex, updateMessageTime }) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" All Chats"
        children={() => <ChatScreen listChallNormalUser={listChallNormalUser} listChallSuperUser={listChallSuperUser}
          addChallenge={addChallenge} listChats={listChats} listSingleChat={listSingleChat} addMessage={addMessage}
          deleteMessage={deleteMessage} listFriendsUser={listFriendsUser} updateListInfoUser={updateListInfoUser}
          listReqSentFriendship={listReqSentFriendship} filters={filters} totalMex={totalMex} updateMessageTime={updateMessageTime} />}

        options={{ headerTitleAlign: 'center' }} />
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({ route }) => ({
          title: '',
          headerBackTitleVisible: false,
          tabBarStyle: { display: "none" },
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5, marginLeft: 0}}>Chats</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                let item = listFriendsUser.find(c => c.userName == route.params.userName)
                navigation.navigate('FriendProfile', {
                  userImg: item.userImg, userName: item.userName, listChallNormalUser: listChallNormalUser,
                  listChallSuperUser: listChallSuperUser, addChallenge: addChallenge, userID: item.userID,
                  listFriendsUser: listFriendsUser, updateListInfoUser: updateListInfoUser, filters: filters
                })}
              }>
              <Text style={{
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight:128,
                fontSize:18
              }}>{route.params.userName}</Text>
            </TouchableOpacity>
          ),
        }
        )}
      />
      < Stack.Screen
        name="FriendProfile"
        component={FriendProfileScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
            </View>
          ),
        }}
      />
      < Stack.Screen
        name="FriendChallenges"
        component={FriendChallengeScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
            </View>
          ),
        }}
      />
      < Stack.Screen
        name="PlusButton"
        children={() => <PlusButton listChallSuperUser={listChallSuperUser}
          listChallNormalUser={listChallNormalUser} addChallenge={addChallenge}
          listChats={listChats} listSingleChat={listSingleChat} listFriendsUser={listFriendsUser}
          addMessage={addMessage} listReqFriendship={listReqFriendship} listSuggestMe={listSuggestMe}
          listNonFriends={listNonFriends} setListNonFriends={setListNonFriends} deleteMessage={deleteMessage}
          addListChats={addListChats} updateListInfoUser={updateListInfoUser} listSearchFriend={listSearchFriend}
          listReqSentFriendship={listReqSentFriendship} filters={filters} updateMessageTime={updateMessageTime} totalMex={totalMex} />}
        options={{
          title: 'New message',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Chats</Text>
            </View>
          ),
        }}
      />

      < Stack.Screen
        name="FriendshipRequests"
        children={() => <FriendshipRequestsScreen updateListInfoUser={updateListInfoUser}
          listReqFriendship={listReqFriendship} listReqSentFriendship={listReqSentFriendship}
          filters={filters} />}
        options={{
          title: 'Friendship requests',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
            </View>
          ),
        }}
      />

      < Stack.Screen
        name="RequestSent"
        children={() => <RequestSent updateListInfoUser={updateListInfoUser}
          listReqSentFriendship={listReqSentFriendship} filters={filters} />}
        options={{
          title: 'Requests sent',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
            </View>
          ),
        }}
      />

      < Stack.Screen
        name="Search"
        children={() => <SearchScreen updateListInfoUser={updateListInfoUser}
          listSearchFriend={listSearchFriend} filters={filters} />}
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
              <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
            </View>
          ),
        }}
      />

      < Stack.Screen
        name="LoadingScreen"
        children={() => <LoadingScreen navigation={navigation} />}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />

      < Stack.Screen
        name="SuggestMe"
        children={() => <SuggestMe updateListInfoUser={updateListInfoUser} listSuggestMe={listSuggestMe} filters={filters} />}
        options={{
          title: 'Suggest me',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("PlusButton")}
                style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("PlusButton")}
                  style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("PlusButton")}
                  style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>Back</Text>
                </TouchableOpacity>
              </TouchableOpacity>

            </>
          ),
        }}
      />
    </Stack.Navigator >
  );
}


const ProfileStack = ({ navigation, myInfo, setMyInfo, updateMyInfo }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Profile"
      children={() => <ProfileScreen navigation={navigation} myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
      options={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
      })}
    />
    <Stack.Screen
      name="Help"
      component={HelpScreen}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
            <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Questionnaire"
      children={() => <QuestionnaireScreen myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        tabBarStyle: { display: "none" },
        headerBackImage: () => (
          <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#2e64e5" />
            <Text style={{ color: "#2e64e5", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="NameTel"
      children={() => <NameTelScreen myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
      options={{
        title: 'Info',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        tabBarStyle: { display: "none" },
        headerBackImage: () => (
          <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#2e64e5" />
            <Text style={{ color: "#2e64e5", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Bio"
      children={() => <BioScreen myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        tabBarStyle: { display: "none" },
        headerBackImage: () => (
          <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#2e64e5" />
            <Text style={{ color: "#2e64e5", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Privacy"
      children={() => <Privacy myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo}/>}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
            <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Notifications"
      children={() => <Notifications myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
            <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Language"
      children={() => <Language myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo}/>}
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
            <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>  Profile</Text>
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ChallengeStack = ({ deleteChallenge, listChallSuperUser, listChallenge, addChallenge, updateChallenge }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Challenges"
      children={() => <ChallengeScreen deleteChallenge={deleteChallenge} listChallSuperUser={listChallSuperUser}
      listChallenge={listChallenge} addChallenge={addChallenge} updateChallenge={updateChallenge} /> }
      options={{ 
        headerTitleAlign: 'center',
        /* headerStyle: {
          backgroundColor: "#1976D2" ,
        },  */}}
    />
    <Stack.Screen
      name="ChallengeOpened"
      component={ChallengeOpenedScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="chevron-back-outline" size={25} color="#1976D2" />
            <Text style={{ color: "#1976D2", fontSize: 15, marginTop: 2.5 }}>  Challenges</Text>
          </View>
        ),
      }}
    />





  </Stack.Navigator>
);

function MainContainer({ listChallSuperUser, listChallNormalUser, deleteChallenge,
  addChallenge, updateChallenge, listChallenge, listChats, listSingleChat, listFriendsUser, addMessage,
  deleteMessage, listNonFriends, setListNonFriends, listReqFriendship, listSuggestMe,
  addListChats, updateListInfoUser, listSearchFriend, listReqSentFriendship, filters,
  myInfo, setMyInfo, totalMex, updateMessageTime, updateMyInfo }) {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName={chatName}
      screenOptions={{ TabBarActiveTintColor: '#1976D2' }}>
      <Tab.Screen
        name="Chats"
        children={() => <MessageStack listChallSuperUser={listChallSuperUser}
          listChallNormalUser={listChallNormalUser} addChallenge={addChallenge}
          listChats={listChats} listSingleChat={listSingleChat} listFriendsUser={listFriendsUser}
          addMessage={addMessage} deleteMessage={deleteMessage} listNonFriends={listNonFriends}
          setListNonFriends={setListNonFriends} listReqFriendship={listReqFriendship}
          listSuggestMe={listSuggestMe} addListChats={addListChats} updateListInfoUser={updateListInfoUser}
          listSearchFriend={listSearchFriend} listReqSentFriendship={listReqSentFriendship} navigation={navigation} filters={filters} totalMex={totalMex} updateMessageTime={updateMessageTime} />}
        options={({ route }) => ({
          headerShown: false,
          headerTitleAlign: "center",
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            if (routeName === 'Messages' || routeName === 'Search') {
              return { display: "none" }
            }

          })(route),
          tabBarIcon: ({ focused, size }) => (
            <Pressable onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Chats' }],
              })
            }}><Ionicons name="chatbubble-ellipses-outline" size={size} color={focused ? "#1976D2" : `#696969`} /></Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Challenge"
        children={() => <ChallengeStack deleteChallenge={deleteChallenge} listChallSuperUser={listChallSuperUser}
          listChallenge={listChallenge} addChallenge={addChallenge} updateChallenge={updateChallenge} />}
        options={() => ({
          headerTitleAlign: "center",
          headerShown: false,
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,

          tabBarIcon: ({ focused, size }) => (
            <Pressable onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Challenge' }],
              })
            }}>
              <FontAwesomeIcon icon={faBullseye} color={focused ? "#1976D2" : `#696969`} size={size} />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileStack navigation={navigation} myInfo={myInfo} setMyInfo={setMyInfo} updateMyInfo={updateMyInfo} />}
        options={({ route }) => ({
          headerShown: false,
          headerTitleAlign: "center",
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            if (routeName === "Questionnaire" || routeName === "NameTel" || routeName === "Bio") {
              return { display: "none" }
            }

          })(route),
          tabBarIcon: ({ focused, size }) => (
            <Pressable onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              })
            }}><Ionicons name="person-outline" color={focused ? "#1976D2" : `#696969`} size={size} /></Pressable>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default MainContainer;