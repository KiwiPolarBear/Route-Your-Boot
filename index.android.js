'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Button, Alert, TouchableHighlight, StyleSheet, AsyncStorage, ListView, TextInput, Switch, Slider, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import storage from 'react-native-modest-storage';
import Form from 'react-native-form';


import UTILS from './app/utils';

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

	async deleteData() {
		await storage.clear();
	}

	async mockData() {
		await storage.clear();

		await storage.set("14/5/2017", JSON.stringify(["-43.522508,172.581004", "-43.522508,172.581004", "-43.522508,172.581004"]));
		await storage.set("15/5/2017", JSON.stringify(["-43.522508,172.581004"]));
		await storage.set("16/5/2017", JSON.stringify(["-43.523495, 172.583331"]));
 	}

	render() {
		return(
			<View style={SettingsStyles.mainView}>
				<View style={SettingsStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={SettingsStyles.topView}>
					<TouchableHighlight
						onPress={this.deleteData.bind(this)}
						style={SettingsStyles.deleteButton}>
						<Text style={SettingsStyles.deleteText}>Delete Data</Text>
					</TouchableHighlight>
					<TouchableHighlight
					onPress={this.mockData.bind(this)}
					style={SettingsStyles.mockButton}>
					<Text style={SettingsStyles.mockText}>Add Mock Data</Text>
				</TouchableHighlight>
				</View>
				<View style={SettingsStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={SettingsStyles.homeButton}>
						<Text style={SettingsStyles.homeText}>Home</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const SettingsStyles = StyleSheet.create({
	homeButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#76787a'
	},
	deleteButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	deleteText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#76787a'
	},
	mockButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	mockText: {
		fontSize: 40,
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

// ================================================ History Screen ============================================

class History extends React.Component {

	constructor(props) {
    super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {locationData: ds.cloneWithRows(["No Location Data"]),
									lastPosition: "-43.522508,172.581004",
								 	url : "https://maps.googleapis.com/maps/api/staticmap?center=-43.522508,172.581004&zoom=14&size=400x400&markers=color:red%7Clabel:Location%7C-43.522508,172.581004&key=AIzaSyDpx12A9b_JJg63454JVDEesRkS_knDZaQ"};
  }

	async componentDidMount() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		await storage.keys().then(async (value) => {
			if (value[0] != null) {
				this.setState({locationData: ds.cloneWithRows(value)});
			}
		});
	}

	buttonPressed() {
		this.props.navigation.goBack();
	}

	render() {
		return(
			<View style={HistoryStyles.mainView}>
				<View style={HistoryStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={HistoryStyles.topView}>
					<ListView
						dataSource={this.state.locationData}
						renderRow={(rowData) => <HistoryButton date={rowData} parent={this} />}
					/>
				</View>
				<View style={HistoryStyles.bottomView}>
				</View>
				<View style={HistoryStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={HistoryStyles.homeButton}>
						<Text style={HistoryStyles.homeText}>Home</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const HistoryStyles = StyleSheet.create({
	homeButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeText: {
		fontSize: 40,
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

class HistoryButton extends React.Component {
	buttonPressed() {
		this.props.parent.props.navigation.navigate("CurrentDay", {date: this.props.date});
	}

	render() {
		return(
			<TouchableHighlight
				onPress={this.buttonPressed.bind(this)}
				style={HistoryButtonStyles.button}>
				<Text style={HistoryButtonStyles.text}>{this.props.date}</Text>
			</TouchableHighlight>
		)
	}
}

const HistoryButtonStyles = StyleSheet.create({
	button: {
		backgroundColor: "#202223",
		height: 50,
		margin: 10,
		marginBottom: 5,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#76787a'
	}
})

// ================================================ Current Day Screen ============================================

class CurrentDay extends React.Component {
	constructor(props) {
    super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {locationData: ds.cloneWithRows(["No Location Data"]),
									distanceTraveled: 0.0,
									units: "km"}
  }

	// Runs after construction is complete
	async componentDidMount() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var dictKey = this.props.navigation.state.params.date;
		// console.warn(dictkey);

		// Load any location values for todays date
		await storage.get(dictKey).then(async (value) => {
			var coords = JSON.parse(value);
			var coordinates = new Array();
			if (value != null) {
				this.setState({locationData: ds.cloneWithRows(coords)});
				for (var i = 0; i < coords.length; i++) {
					coordinates.push([coords[i]]);
				}

			}
			var totalDistance = UTILS.calculateTotalDistance(coords);
			this.setState({distanceTraveled: totalDistance})
		});


  }

	buttonPressed() {
		this.props.navigation.goBack();
	}

	convertUnits() {
		var units = this.state.units;
		var distance = this.state.distanceTraveled;
		if (units == "km") {
			this.setState({distanceTraveled: UTILS.toMiles(distance)});
			this.setState({units: "mi"});
		} else {
			this.setState({distanceTraveled: UTILS.toKilometers(distance)});
			this.setState({units: "km"});
		}
	}



	render() {
		return(
			<View style={CurrentDayStyles.mainView}>
				<View style={CurrentDayStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={CurrentDayStyles.topView}>
					<ListView
						dataSource={this.state.locationData}
						renderRow={(rowData) => <TodayButton location={rowData} parent={this} />}
					/>
				</View>
				<View style={CurrentDayStyles.bottomView}>
					<TouchableHighlight	style={CurrentDayStyles.homeButton}
						onPress={this.convertUnits.bind(this)}>
						<Text>
							<Text style={CurrentDayStyles.normalText}>Total Distance: </Text>
							<Text style={CurrentDayStyles.distanceText}>{this.state.distanceTraveled} {this.state.units}</Text>
						</Text>
					</TouchableHighlight>
				</View>
				<View style={CurrentDayStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={CurrentDayStyles.homeButton}>
						<Text style={CurrentDayStyles.homeText}>Back</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const CurrentDayStyles = StyleSheet.create({
	distanceText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#800000'
	},
	normalText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#76787a'
	},
	homeButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeText: {
		fontSize: 40,
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

class CurrentDayButton extends React.Component {
	buttonPressed() {
		this.props.parent.props.navigation.navigate("MapView", {
			location: this.props.location,
			date: this.props.parent.props.navigation.state.params.key
		});
	}

	render() {
		return(
			<TouchableHighlight
				onPress={this.buttonPressed.bind(this)}
				style={CurrentDayButtonStyles.button}>
				<Text style={CurrentDayButtonStyles.text}>{this.props.location}</Text>
			</TouchableHighlight>
		)
	}
}

const CurrentDayButtonStyles = StyleSheet.create({
	button: {
		backgroundColor: "#202223",
		height: 50,
		margin: 10,
		marginBottom: 5,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#76787a'
	}
})

// ============================================ Distance Traveled ===========================================

// ================================================ Today Screen ============================================

class Today extends React.Component {
	constructor(props) {
    super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
			locationData: ds.cloneWithRows(["No Location Data"]),
			rawLocationData: '',
			namedData: ds.cloneWithRows(["No Location Data"]),
			places: null,
			date: null,
		}
  }

	// Runs after construction is complete
	async componentDidMount() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var theDate = new Date();
		var dictKey = theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getFullYear();
		this.state.date = dictKey;

		// Load any location values for todays date
		await storage.get(dictKey).then(async (value) => {
			if (value != null) {
				var newValue = JSON.parse(value);
				this.setState({locationData: ds.cloneWithRows(newValue), rawLocationData: newValue});
			}
		});

		// await storage.set("places", places);
		// await storage.get("places").then(async (value) => {
		// 	var places = JSON.parse(value);
		// 	var points = this.state.rawLocationData;
		// 	if (places != null) {
		// 		this.state.places = places;
		// 		var namedArray = new Array();
		// 		for (var i = 0; i < points.length; i++) {
		// 			var thePlace = UTILS.checkPlaces(places, points[i]);
		// 			if (thePlace != null) {
		// 				var place = thePlace;
		// 			} else {
		// 				var place = points[i];
		// 			}
		// 			namedArray.push(place);
		// 		}
		// 		// console.warn(namedArray);
		// 		this.setState({namedData: ds.cloneWithRows(points)});
		// 	}
		// });

			// Only enters function when position changes
			navigator.geolocation.watchPosition(async (position) => {
				var totalPosition = position.coords.latitude.toFixed(6) + "," + position.coords.longitude.toFixed(6);

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

					this.setState({locationData: ds.cloneWithRows(newValue)});
					var coords = JSON.stringify(newValue);
					await storage.set(dictKey, coords);
					// await storage.get("places").then(async (values) => {
					// 	var places = JSON.parse(value);
					// 	if (places != null) {
					//
					// 	}
					// });
					// await storage.set(coords, coords)

				});
			});
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
					<ListView
						dataSource={this.state.locationData}
						renderRow={(rowData) => <TodayButton location={rowData} date={this.state.date} parent={this} />}
					/>
				</View>
				<View style={TodayStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={TodayStyles.homeButton}>
						<Text style={TodayStyles.homeText}>Home</Text>
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
		fontSize: 40,
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

class TodayButton extends React.Component {
	buttonPressed() {
		this.props.parent.props.navigation.navigate("MapView", {
			location: this.props.location,
			date: this.props.date});
	}

	render() {
		return(
			<TouchableHighlight
				onPress={this.buttonPressed.bind(this)}
				style={TodayButtonStyles.button}>
				<Text style={TodayButtonStyles.text}>{this.props.location}</Text>
			</TouchableHighlight>
		)
	}
}

const TodayButtonStyles = StyleSheet.create({
	button: {
		backgroundColor: "#202223",
		height: 50,
		margin: 10,
		marginBottom: 5,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#76787a'
	}
})

// ================================================ Map View ============================================

class MapView extends React.Component {
	buttonPressed() {
		this.props.navigation.goBack();
	}

	saveButtonPressed() {
		var location = this.props.navigation.state.params.location;
		var date = this.props.navigation.state.params.date;
		this.props.navigation.navigate('Save', {date: date, location: location})
	}

	constructor(props) {
    super(props);
		this.state = {url : "https://maps.googleapis.com/maps/api/staticmap?center=-43.522508,172.581004&zoom=14&size=400x400&markers=color:red%7Clabel:Location%7C-43.522508,172.581004&key=AIzaSyDpx12A9b_JJg63454JVDEesRkS_knDZaQ"};
  }

	componentDidMount() {
		var urlStart = "https://maps.googleapis.com/maps/api/staticmap?center=";
		var urlMid = "&zoom=14&size=400x400&markers=color:red%7Clabel:Location%7C";
		var urlEnd = "&key=AIzaSyDpx12A9b_JJg63454JVDEesRkS_knDZaQ";

		var totalPosition = this.props.navigation.state.params.location;
		var newUrl = urlStart + totalPosition + urlMid + totalPosition + urlEnd;
		this.setState({url: newUrl})
		this.setState({text: newUrl})
	}

	render() {
		return(
			<View style={MapStyles.mainView}>
				<View style={MapStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={MapStyles.topView}>
					<Image style={MapStyles.map} source={{uri: this.state.url}} />
				</View>
				<View style={MapStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={MapStyles.backButton}>
						<Text style={MapStyles.backText}>Back</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={this.saveButtonPressed.bind(this)}
						style={MapStyles.saveButton}>
						<Text style={MapStyles.backText}>Save</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const MapStyles = StyleSheet.create({
	backButton: {
		backgroundColor: "#202223",
		flex: 1,
		// width: 100,
		margin: 10,
		borderRadius: 5
		// alignItems: 'center',rr
		// justifyContent: 'center'
	},
	saveButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
	},
	backText: {
		textAlign: 'center',
		fontSize: 40,
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
		flexDirection: 'row',
		backgroundColor: "#4a4d51"
	},
	map: {
		flex: 1
	}
});

// ================================================ Save ============================================

class Save extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			placeholder: " place",
			radius: 200
		}
  }

	buttonPressed() {
		this.props.navigation.goBack();
	}

	async saveData(location, placeData) {
		await storage.set(location, JSON.stringify(placeData));
		this.props.navigation.goBack();
	}

	saveForm() {
		var values = this.refs.form.getValues();
		var radius = values["radius"] * 0.001; // m => km
		radius = radius.toFixed(3);
		var location = this.props.navigation.state.params.location;
		var date = this.props.navigation.state.params.date;

		// await storage.set("15/5/2017", JSON.stringify(["-43.522508,172.581004"]));
		var placeData = [values["place"], radius];


		Alert.alert(
		  'Location saved as ' + values["place"],
		  "This will associate coordinates within a " + radius + " to the specified place.",
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: 'OK', onPress: () => this.saveData(location, placeData)},
		  ],
		  { cancelable: false }
		)

		// console.warn(date);
		// console.warn(location);
		// console.warn(values["place"]);
		// console.warn(values["radius"]);
	}

	render() {
		return(
			<View style={SaveStyles.mainView}>
				<View style={SaveStyles.headerView}>
					<Image source={require('./title.png')} />
				</View>
				<View style={SaveStyles.topView}>
				  <View style={{height:30, alignItems:'center'}} >
						<Text style={SaveStyles.normalText}>Set Placename:</Text>
					</View>
					<Form ref="form">
						<TextInput style={SaveStyles.textInputStyle} type="TextInput" name="place"onChangeText={(placeholder) => this.setState({placeholder})} value={this.state.placeholder}/>
						<View style={{height:45, alignItems:'center', marginBottom: 20}}>
							<Text style={SaveStyles.normalText}>Set Radius:</Text>
							<Text style={SaveStyles.textInputStyle}>{this.state.radius && +this.state.radius.toFixed(0)} meters</Text>
						</View>
						<Slider type="Slider" name="radius" minimumValue={0} maximumValue={1000} value={200} maximunTrackTintColor='#800000' minimunTrackTintColor='#800000' thumbTintColor='black' onValueChange={(value) => this.setState({radius: value})}/>
					</Form>
				</View>
				<View style={SaveStyles.bottomView}>
					<TouchableHighlight
						onPress={this.buttonPressed.bind(this)}
						style={SaveStyles.homeButton}>
						<Text style={SaveStyles.homeText}>Back</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={this.saveForm.bind(this)}
						style={SaveStyles.homeButton}>
						<Text style={SaveStyles.homeText}>Save</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const SaveStyles = StyleSheet.create({
	formStyle: {
		marginTop:40,
		color: '#800000',
	},
	textInputStyle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#800000'
	},
	normalText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#76787a'
	},
	homeButton: {
		backgroundColor: "#202223",
		flex: 1,
		margin: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#76787a'
	},
	mainView: {
		justifyContent: 'space-between',
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
		flexDirection: 'row',
		flex: 7,
		backgroundColor: "#4a4d51"
	}
});


// ================================================ Application ============================================

const MainApp = StackNavigator({
  Home: { screen: Main },
  Settings: { screen: Settings },
  History: { screen: History },
	Today: { screen: Today },
	MapView: { screen: MapView },
	Save: { screen: Save},
	CurrentDay: { screen: CurrentDay }
},{
   	initialRouteName: 'Home',
    headerMode: 'none',
});

AppRegistry.registerComponent('RouteYourBoot', () => MainApp);
