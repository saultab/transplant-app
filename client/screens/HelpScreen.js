import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

export default function HelpScreen({ navigation }) {
    return (
        <ScrollView>
        <View style={[styles.container]}>
            
            <View>
                <Text style={[styles.headline, { marginBottom: 0, marginTop: 20, fontSize: 16, fontWeight: 'bold' }]}>How do you use Transplant App?</Text>
                <Text style={[styles.headline]}>The app is divided into 4 macro sections:</Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5, fontWeight: 'bold'}]}>{'1) Profile:'}</Text>
                <Text style={[styles.headline, { marginLeft: 17 }]}>Here you find all your personal information, settings and the questionnaire.</Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5, fontWeight: 'bold'}]}>{'2) Challenges:'}</Text>
                <Text style={[styles.headline, { marginLeft: 17 }]}>In this screen you have the daily challenges proposed by the AI based on your goals.</Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5, fontWeight: 'bold' }]}>{'3) Chats:'}</Text>
                <Text style={[styles.headline, { marginLeft: 17 }]}>Here you have the latest active chats with your friends and the Plus Button which allows you to access the section described below.</Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5, fontWeight: 'bold'}]}>{'4) Plus Button:'}</Text>
                <Text style={[styles.headline, { marginLeft: 17 }]}>In this section you can find:</Text>
                <Text style={[styles.headline, { fontSize: 14, marginTop: 5, marginLeft: 30 }]}>{'\u2022'}The list of all your friends and the way to start chatting with them.</Text>
                <Text style={[styles.headline, { fontSize: 14, marginTop: 5, marginLeft: 30 }]}>{'\u2022'}Search for new possible friends both by being suggested by the AI and by manually searching by entering the username and interest filters</Text>
                <Text style={[styles.headline, { fontSize: 14, marginTop: 5, marginLeft: 30 }]}>{'\u2022'}Accept received friendship requests or delete previously sent requests.</Text>
                <Text style={[styles.headline,{ marginBottom: 0, marginTop:30, fontSize:16, fontWeight:'bold' }]} >About AI</Text>
            
                <Text style={[styles.headline, {fontSize:14, marginTop:0}]}>This app uses artificial intelligence algorithms to give you personalized suggestions.</Text>
                <Text style={{ fontSize: 14, marginTop: 10, textAlign:'center', fontWeight: 'bold' }}>Be careful because the AI can make mistakes!</Text>
                <Text style={[styles.headline, {fontSize:14, marginTop:10}]}>In Transplant App the AI is used in two particular section:</Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5,marginLeft: 5, fontWeight: 'bold' }]}>{'\u2022'} Questionnaire:</Text>
                <Text style={[styles.headline, { marginLeft: 25 }]}>The questionnaire provides many of the parameters that these algorithms need to work best, so modifying it will improve the results obtained.</Text>
                <Text style={[styles.headline, { marginLeft: 25 }]}>Each change will improve future suggestions of challenges and new friends! </Text>
                <Text style={[styles.headline, { fontSize: 15, marginTop: 5,marginLeft: 5, fontWeight: 'bold' }]}>{'\u2022'} Challenges:</Text>
                <Text style={[styles.headline, { marginLeft: 25 }]}>A challenge is a personal match proposed by the AI based on your parameters set in the questionnaire and according to your needs.</Text>
                <Text style={[styles.headline, { marginLeft: 25, marginBottom:50 }]}>You can complete a challenge, delete it, have the AI suggest a new one, or add to it from your friend's challenges.</Text>

            </View>
            
        </View>
        </ScrollView>
    );
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBox: {
        justifyContent: 'center',
        textAlign: 'justify',
    },
    headline: {
        fontSize: 14,
        paddingHorizontal:25,
        textAlign: 'justify',
    },
});