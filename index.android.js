'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Button, Alert, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import storage from 'react-native-modest-storage'

// ================================================ Main Screen ============================================

class Main extends React.Component {
	constructor(props) {
    super(props);
	}

	settingsPressed() {
		this.props.navigation.navigate("Settings");
	};
	
	historyPressed() {
		this.props.navigation.navigate("History");
	}
	
	todayPressed() {
		this.props.navigation.navigate("Today");
	}
	
  render() {
    return (
      <View style={MainStyles.mainView}>
        <View style={MainStyles.titleView}>
					<Image source={require('./title.png')} />
				</View>
        <View style={MainStyles.locationsView}>
					<TouchableHighlight onPress={this.todayPressed.bind(this)} style={MainStyles.todayButton}>
						<Text style={MainStyles.todayButtonText}>Todays Locations</Text>
					</TouchableHighlight>
				</View>
        <View style={MainStyles.historyView}>
					<TouchableHighlight onPress={this.historyPressed.bind(this)} style={MainStyles.historyButton}>
						<Text style={MainStyles.historyButtonText}>Locations History</Text>
					</TouchableHighlight>
				</View>
				<View style={MainStyles.buttonsView}>
					<TouchableHighlight onPress={this.settingsPressed.bind(this)} style={MainStyles.settingsButton}>
						<Image style={MainStyles.settingsCog} source={require('./cog.png')} />
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
		flex: 7, 
		backgroundColor: 'white'
	},
	locationsView: {
		flex: 20, 
		backgroundColor: '#4a4d51',
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	historyView: {
		flex: 20, 
		backgroundColor: '#4a4d51',
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	buttonsView: {
		flex: 7, 
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		backgroundColor: '#4a4d51', 
		alignItems: 'stretch'
	},
	settingsButton: {
		backgroundColor: "#202223", 
		flex: 1, 
		margin: 10, 
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	settingsCog: {
		width: 50,
		height: 50
	},
	historyButton: {
		backgroundColor: "#202223", 
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	historyButtonText: {
		fontSize: 40, 
		fontWeight: 'bold',
		color: '#76787a'
	},
	todayButton: {
		backgroundColor: "#202223", 
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	todayButtonText: {
		fontSize: 40, 
		fontWeight: 'bold',
		color: '#76787a'
	}
});

// ================================================ Settings Screen ============================================

class Settings extends React.Component {
	buttonPressed() {
		this.props.navigation.goBack();
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

// ================================================ History Screen ============================================

class History extends React.Component {
	buttonPressed() {
		this.props.navigation.goBack();
	}
	
	render() {
		return(
			<TouchableHighlight 
				onPress={this.buttonPressed.bind(this)}
				style={HistoryStyles.homeButton}>
				<Text style={HistoryStyles.homeText}>Home</Text>
			</TouchableHighlight>
		)
	}
}

const HistoryStyles = StyleSheet.create({
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

// ================================================ Today Screen ============================================

class Today extends React.Component {
	constructor(props) {
    super(props);
    this.state = {locationData: [],
									lastPosition: "-43.522508,172.581004",
								 	url : "https://maps.googleapis.com/maps/api/staticmap?center=-43.522508,172.581004&zoom=14&size=400x400&markers=color:red%7Clabel:Location%7C-43.522508,172.581004&key=AIzaSyDpx12A9b_JJg63454JVDEesRkS_knDZaQ"};
  }
	
	// Runs after construction is complete
	async componentDidMount() {
		
		var theDate = new Date();
		var dictKey = theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getFullYear();
		
		// Load any location values for todays date
		await storage.get(dictKey).then(async (value) => {
			var newValue = JSON.parse(value);
			if (value != null) {
				this.setState({locationData: newValue});
			} else {
				this.setState({locationData: "No Location Data"});
			}
		});
		
		
    // Runs Every Second
    setInterval(async () => {
			
			// Google Static Maps URL Components
			var urlStart = "https://maps.googleapis.com/maps/api/staticmap?center=";
			var urlMid = "&zoom=14&size=400x400&markers=color:red%7Clabel:Location%7C";
			var urlEnd = "&key=AIzaSyDpx12A9b_JJg63454JVDEesRkS_knDZaQ";
				
			// Only enters function when position changes
			navigator.geolocation.watchPosition(async (position) => {
				var totalPosition = position.coords.latitude.toFixed(6) + "," + position.coords.longitude.toFixed(6);
				var newUrl = urlStart + totalPosition + urlMid + totalPosition + urlEnd;
				this.setState({lastPosition: totalPosition})
				this.setState({url: newUrl})

				// Getting the date the location was recorded and creating a dictionary key
				var theDate = new Date(position.timestamp);
				var dictKey = theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getFullYear();
				
				// Store location data
				await storage.get(dictKey).then(async (value) => {
					var newValue = JSON.parse(value);
					
					if (value != null) {
						newValue.push(totalPosition);
					} else {
						newValue = [totalPosition];
					}
					
					this.setState({locationData: newValue});
					await storage.set(dictKey, JSON.stringify(newValue))
					
				});
			});
    }, 1000);
  }

	buttonPressed() {
		this.props.navigation.goBack();
	}
	
	render() {
		return(
			<View style={TodayStyles.mainView}>
				<View style={TodayStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={TodayStyles.topView}>
					<Image style={{flex: 1}} source={{uri: this.state.url}} />
				</View>
				<View style={TodayStyles.bottomView}>
					<TouchableHighlight 
						onPress={this.buttonPressed.bind(this)}
						style={TodayStyles.homeButton}>
						<Text style={TodayStyles.homeText}>{JSON.stringify(this.state.locationData)}</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const TodayStyles = StyleSheet.create({
	homeButton: {
		backgroundColor: "#202223", 
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeText: {
		fontSize: 10, 
		fontWeight: 'bold',
		color: '#76787a'
	},
	mainView: {
		flex: 1
	},
	headerView: {
		flex: 7,
		backgroundColor: "white"
	},
	topView: {
		flex: 40,
		backgroundColor: "#4a4d51"
	},
	bottomView: {
		flex: 7,
		backgroundColor: "#4a4d51"
	}
});

// ================================================ Application ============================================

const MainApp = StackNavigator({
  Home: { screen: Main },
  Settings: { screen: Settings },
  History: { screen: History },
	Today: { screen: Today }
},{
   	initialRouteName: 'Home',
    headerMode: 'none',
});

AppRegistry.registerComponent('RouteYourBoot', () => MainApp);