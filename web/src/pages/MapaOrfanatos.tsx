import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg'

import "leaflet/dist/leaflet.css"
import '../styles/pages/orphanages-map.css';

const styles = ["streets-v11", "outdoors-v11", "satellite-v9", "satellite-streets-v11", "light-v10", "navigation-preview-day-v4", "navigation-guidance-day-v4", "dark-v10", "navigation-preview-night-v4", "navigation-guidance-night-v4"];

export default function MapaOrfanatos() {
	const [estilo, setEstilo] = useState(styles[9]);

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
				<select id="estiloMapa" name="estiloMapa" onChange={e => setEstilo(e.target.value)}>
					{styles.map((v, i) => (<option key={i} value={v} selected={v === estilo} >{v}</option>))}
				</select>
			</Map>

			<Link to="" className="create-orphanage">
				<FiPlus size="32" color="#FFF" />
			</Link>
		</div>
	);
}