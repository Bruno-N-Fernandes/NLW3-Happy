import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MapaOrfanatos from './pages/MapaOrfanatos';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/app" component={MapaOrfanatos} />

				<Route exact path="/orphanage/create" component={CreateOrphanage} />
				<Route exact path="/orphanage/:id" component={Orphanage} />
			</Switch>
		</BrowserRouter>
	);
}