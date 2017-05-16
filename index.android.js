import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Button, Alert, TouchableHighlight, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

// ================================================ Main Screen ============================================

class Main extends React.Component {
	startServicePressed() {
		Alert.alert('Start Service has been pressed!');
	};

	settingsPressed() {
		this.props.navigation.navigate("Settings");
	};
	
  render() {
    return (
      <View style={MainStyles.mainView}>
        <View style={MainStyles.titleView}>
					<Image source={require('./title.png')} />
				</View>
        <View style={MainStyles.locationsView}>
					<Text>Todays Locations</Text>
				</View>
        <View style={MainStyles.historyView}>
					<Text>Locations History</Text>
				</View>
				<View style={MainStyles.buttonsView}>
					<TouchableHighlight onPress={this.startServicePressed} style={MainStyles.startServiceButton}>
						<Text style={MainStyles.startServiceText}>Start Service</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.settingsPressed.bind(this)} style={MainStyles.settingsButton}>
						<Text style={MainStyles.settingsText}>Settings</Text>
					</TouchableHighlight>
				</View>
      </View>
    );
  }
};

const MainStyles = StyleSheet.create({
	mainView: {
		flex: 1, 
		flexDirection: 'column'
	},
	titleView: {
		flex: 10, 
		backgroundColor: 'white'
	},
	locationsView: {
		flex: 20, 
		backgroundColor: 'skyblue'
	},
	historyView: {
		flex: 20, 
		backgroundColor: 'steelblue'
	},
	buttonsView: {
		flex: 7, 
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		backgroundColor: 'powderblue', 
		alignItems: 'stretch'
	},
  startServiceButton: {
		backgroundColor: "#841584", 
		flex: 3, 
		margin: 10, 
		marginRight: 5, 
		borderRadius: 5
  },
  startServiceText: {
		textAlign: 'center', 
		fontSize: 40, 
		fontWeight: 'bold'
  },
	settingsButton: {
		backgroundColor: "#841584", 
		flex: 1, 
		margin: 10, 
		marginRight: 5, 
		borderRadius: 5
	},
	settingsText: {
		textAlign: 'center', 
		fontSize: 20
	}
});

// ================================================ Settings Screen ============================================

class Settings extends React.Component {
	buttonPressed() {
		this.props.navigation.navigate("Home");
	}
	
	render() {
		return(
			<TouchableHighlight 
				onPress={this.buttonPressed.bind(this)}
				style={SettingsStyles.homeButton}>
				<Text style={SettingsStyles.homeText}>Home</Text>
			</TouchableHighlight>
		)
	}
}

const SettingsStyles = StyleSheet.create({
	homeButton: {
		backgroundColor: "#841584", 
		margin: 10, 
		marginRight: 5, 
		borderRadius: 5
	},
	homeText: {
		textAlign: 'center', 
		fontSize: 20
	}
});

// ================================================ Application ============================================

const MainApp = StackNavigator({
  Home: { screen: Main },
  Settings: { screen: Settings },
},{
   	initialRouteName: 'Home',
    headerMode: 'none',
});

AppRegistry.registerComponent('RouteYourBoot', () => MainApp);