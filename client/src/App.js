import './App.css';
import { CustomText } from './components/text/text';
import { Upload } from './components/upload/upload';

function App() {
	return (
		<div className="App">
			<Upload />
			<CustomText />
		</div>
	);
}

export default App;
