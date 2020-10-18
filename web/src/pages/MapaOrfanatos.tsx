import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../util/mapIcon';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';

const styles = ["streets-v11", "outdoors-v11", "satellite-v9", "satellite-streets-v11", "light-v10", "navigation-preview-day-v4", "navigation-guidance-day-v4", "dark-v10", "navigation-preview-night-v4", "navigation-guidance-night-v4"];

interface IOrphanate {
	id: number,
	name: string,
	latitude: number,
	longitude: number,
}

export default function MapaOrfanatos() {
	const [orphanages, setOrphanages] = useState<IOrphanate[]>([]);
	const [estilo, setEstilo] = useState(styles[9]);
	useEffect(() => {
		api.get('/orphanages')
			.then(response => response.data)
			.then(orphanages => setOrphanages(orphanages));
	}, []);


	function getTileLayerUrl(type: "MapBox" | "OpenStreet" = "MapBox"): string {
		if (type === "OpenStreet") return "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

		return `https://api.mapbox.com/styles/v1/mapbox/${estilo}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
	}

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="Happy" />
					<h2>Leve felicidade para o mundo</h2>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>
				</header>

				<footer>
					<strong>Rio de Janeiro</strong>
					<span>Rio de Janeiro</span>
				</footer>
			</aside>

			<Map center={[-22.7990411, -43.1844011]} zoom={15} style={{ width: "100%", height: "100%" }} >
				<TileLayer url={getTileLayerUrl()} />

				{orphanages.map(orphanage => {
					console.log(orphanage)
					return (
						<Marker icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id} >
							<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
								{orphanage.name}
								<Link to={`/orphanage/${orphanage.id}`}>
									<FiArrowRight size={20} color="#FFF" />
								</Link>
							</Popup>
						</Marker>
					);
				})}

				<select id="estiloMapa" name="estiloMapa" onChange={e => setEstilo(e.target.value)} value={estilo}>
					{styles.map((v, i) => (<option key={i} value={v}>{v}</option>))}
				</select>
			</Map>

			<Link to="/orphanage/create" className="create-orphanage">
				<FiPlus size="32" color="#FFF" />
			</Link>
		</div>
	);
}