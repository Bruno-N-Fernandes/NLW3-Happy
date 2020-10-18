import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent, LatLng, Region } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import { getCurrentPositionAsync, LocationAccuracy, requestPermissionsAsync } from 'expo-location';

export default function SelectMapPosition() {
	const navigation = useNavigation();
	const [location, setLocation] = useState<LatLng>({ latitude: 0, longitude: 0 });
	const [initialPosition, setInitialPosition] = useState<Region>();

	useEffect(() => {
		async function loadInitialPosition() {
			const { granted } = await requestPermissionsAsync();

			if (granted) {
				const location = await getCurrentPositionAsync({
					accuracy: LocationAccuracy.Balanced,
				});

				setInitialPosition({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				});
			}
		}

		loadInitialPosition();
	}, []);

	function handleNextStep() {
		navigation.navigate('OrphanageData', location);
	}

	function handleSelectMapPosition(event: MapEvent) {
		setLocation(event.nativeEvent.coordinate);
	}

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={initialPosition}
				style={styles.mapStyle} onPress={handleSelectMapPosition}
			>
				{location?.latitude !== 0 && location?.longitude !== 0 && (
					<Marker icon={mapMarkerImg} coordinate={location} />
				)}

			</MapView>

			{location?.latitude !== 0 && location?.longitude !== 0 && (
				<RectButton style={styles.nextButton} onPress={handleNextStep}>
					<Text style={styles.nextButtonText}>Próximo</Text>
				</RectButton>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},

	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},

	nextButton: {
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,

		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 40,
	},

	nextButtonText: {
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 16,
		color: '#FFF',
	}
})