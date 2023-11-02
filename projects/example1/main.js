


// changing the text of the messaeBox

messageBox.innerText = "Hello world";

// applying some styles to the messageBox

messageBox.style.backgroundColor = "salmon";
messageBox.style.padding = "1em";
messageBox.style.fontFamily = "courier";

// creating and appending an elements

let greenBox = document.createElement("section");
greenBox.style.width = "5em";
greenBox.style.height = "5em";
greenBox.style.backgroundColor = "green";
document.body.appendChild(greenBox);

let xButton = document.createElement("button");
xButton.innerText = "X";
greenBox.appendChild(xButton);