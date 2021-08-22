import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import { url } from '../../core/constants';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

export function Upload() {
	const formData = new FormData();
	const [image, setImage] = React.useState([]);
	const handleFileUpload = (event) => {
		setImage(event.target.files[0]);
	};
	const handleUpload = async () => {
		formData.append('image', image);
		const result = await axios.post(`${url}/upload`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		alert(result.data.answer);
	};

	const classes = useStyles();

	return (
		<div>
			<Input type="file" onChange={handleFileUpload} multiple={false} />
			<Button
				variant="contained"
				onClick={handleUpload}
				color="default"
				className={classes.button}
				startIcon={<CloudUploadIcon />}
			>
				Upload
			</Button>
		</div>
	);
}
