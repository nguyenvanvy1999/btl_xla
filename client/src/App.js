import React from 'react';
import './App.css';
import Header from './components/ResistanceCalculator/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Resistor from './components/ResistanceCalculator/Resistor';
import { Container } from '@material-ui/core';
import { Upload } from './components/upload/upload';
function App() {
	return (
		<CssBaseline>
			<div className="resistor-calc-app">
				<Header />
				<Upload />
				<Container>
					<Resistor />
				</Container>
			</div>
		</CssBaseline>
	);
}

export default App;
