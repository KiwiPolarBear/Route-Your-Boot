import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Button, Alert, TouchableHighlight, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

// ================================================ Main Screen ============================================

class Main extends React.Component {
	enablePressed() {
		if (this.state.enabled) {
			Alert.alert('Disable has been pressed!');
			this.setState({enabled: false})
			this.setState({enabledText: "Enable"})
		} else {
			Alert.alert('Enable has been pressed!');
			this.setState({enabled: true})
			this.setState({enabledText: "Disable"})
		}
	};

	settingsPressed() {
		this.props.navigation.navigate("Settings");
	};
	
	historyPressed() {
		this.props.navigation.navigate("History");
	}
	
	constructor(props) {
    super(props);
    this.state = {text: "getting location..."};
    this.state = {enabled: false};
		this.state = {enabledText: "Enable"}

    // Toggle the state every second
    setInterval(() => {
			navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({text: lastPosition});
    });
    }, 1000);
  }
	
  render() {
		let display = this.state.text;
    return (
      <View style={MainStyles.mainView}>
        <View style={MainStyles.titleView}>
					<Image source={require('./title.png')} />
				</View>
        <View style={MainStyles.locationsView}>
					<Text>{display}</Text>
				</View>
        <View style={MainStyles.historyView}>
					<TouchableHighlight onPress={this.historyPressed.bind(this)} style={MainStyles.historyButton}>
						<Text style={MainStyles.historyButtonText}>Locations History</Text>
					</TouchableHighlight>
				</View>
				<View style={MainStyles.buttonsView}>
					<TouchableHighlight onPress={this.enablePressed.bind(this)} style={MainStyles.startServiceButton}>
						<Text style={MainStyles.startServiceText}>{this.state.enabledText}</Text>
					</TouchableHighlight>
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
		flex: 10, 
		backgroundColor: 'white'
	},
	locationsView: {
		flex: 20, 
		backgroundColor: 'skyblue'
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
  startServiceButton: {
		backgroundColor: "#202223", 
		flex: 3, 
		margin: 10, 
		marginRight: 5, 
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
  },
  startServiceText: {
		fontSize: 40, 
		fontWeight: 'bold',
		color: '#76787a'
  },
	settingsButton: {
		backgroundColor: "#202223", 
		flex: 1, 
		margin: 10, 
		marginLeft: 5,
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

// ================================================ Application ============================================

const MainApp = StackNavigator({
  Home: { screen: Main },
  Settings: { screen: Settings },
  History: { screen: History },
},{
   	initialRouteName: 'Home',
    headerMode: 'none',
});

AppRegistry.registerComponent('RouteYourBoot', () => MainApp);