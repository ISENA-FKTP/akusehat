import React from "react";

const App = () => {
	const onButtonClick = () => {
		const pdfUrl = "Sample.pdf";
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = "document.pdf"; // specify the filename
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<>
			<center>
				<h1>Welcome to Geeks for Geeks</h1>
				<h3>
					Click on below button to download PDF
					file
				</h3>
				<button onClick={onButtonClick}>
					Download PDF
				</button>
			</center>
		</>
	);
};

export default App;
