import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Button, Alert, TouchableHighlight } from 'react-native';

class MainLayout extends Component {
	startServicePressed() {
		Alert.alert('Start Service has been pressed!');
	};

	settingsPressed() {
		Alert.alert('Settings has been pressed!');
	};
	
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 10, backgroundColor: 'white'}}>
					<Image source={require('./title.png')} />
				</View>
        <View style={{flex: 20, backgroundColor: 'skyblue'}}>
					<Text>Todays Locations</Text>
				</View>
        <View style={{flex: 20, backgroundColor: 'steelblue'}}>
					<Text>Locations History</Text>
				</View>
				<View style={{flex: 7, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'powderblue', alignItems: 'stretch'}}>
					<TouchableHighlight 
						onPress={this.startServicePressed}
						style={{backgroundColor: "#841584", flex: 3, margin: 10, marginRight: 5, borderRadius: 5}}>
						<Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Start Service</Text>
					</TouchableHighlight>
					<TouchableHighlight 
						onPress={this.settingsPressed}
						style={{backgroundColor: "#841584", flex: 1, margin: 10, marginRight: 5, borderRadius: 5}}>
						<Text style={{textAlign: 'center', fontSize: 20}}>Settings</Text>
					</TouchableHighlight>
				</View>
      </View>
    );
  }
};

AppRegistry.registerComponent('RouteYourBoot', () => MainLayout);