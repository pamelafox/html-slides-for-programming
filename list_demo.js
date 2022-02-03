// Used for list insertion demo
var demoDiv = document.getElementById("insertion-demo");

var divHeight = 50;
var newDiv = document.createElement("div");
newDiv.style.top = 0;
newDiv.style.left = 0;
newDiv.style.position = "absolute";
demoDiv.appendChild(newDiv);
var arrowDiv = document.createElement("div");
arrowDiv.style.top = "0px";
arrowDiv.style.position = "absolute";
newDiv.appendChild(arrowDiv);

var valuesDiv = document.createElement("div");
valuesDiv.style.top = (divHeight * 1) + "px";
valuesDiv.style.left = 0;
valuesDiv.style.position = "absolute";
valuesDiv.className = "array-values";
demoDiv.appendChild(valuesDiv);

var indicesDiv = document.createElement("div");
indicesDiv.style.top = (divHeight * 2) + "px";
indicesDiv.style.left = 0;
indicesDiv.style.position = "absolute";
demoDiv.appendChild(indicesDiv);

var addressesDiv = document.createElement("div");
addressesDiv.style.top = (divHeight * 3) + "px";
addressesDiv.style.left = 0;
addressesDiv.style.position = "absolute";
demoDiv.appendChild(addressesDiv);

var arrayValues = ["A", "B", "C", "D", "E", "F"];
var leftPos = 0;
var divWidth = 100;
var lastAddress, lastIndex;

var createValue = function(value, index, left) {
    var valueDiv = document.createElement("div");
    if (Number.isInteger(value)) {
        valueDiv.innerHTML = value;
    } else {
        valueDiv.innerHTML = "&quot;" + value + "&quot;";
    }

    valueDiv.className = "array-value";
    valueDiv.style.left = left + "px";
    valueDiv.setAttribute("data-index", index);
    valuesDiv.appendChild(valueDiv);
    return value;
};

var createIndex = function(index, left) {
    var indexDiv = document.createElement("div");
    indexDiv.innerText = index;
    indexDiv.className = "array-index";
    indexDiv.style.left = leftPos + "px";
    indicesDiv.appendChild(indexDiv);
    return index;
};

var createAddress = function(address, left) {
    var addressDiv = document.createElement("div");
    addressDiv.innerText = address;
    addressDiv.className = "array-address";
    addressDiv.style.left = leftPos + "px";
    addressesDiv.appendChild(addressDiv);
    return address;
}

arrayValues.forEach(function(arrayVal, index) {
    createValue(arrayVal, index, leftPos);
    lastIndex = createIndex(index, leftPos);
    lastAddress = createAddress(3300 + index, leftPos)
    leftPos += divWidth;
});

var moveDiv = function(div, newIndex, leftAmount) {
    var oldLeft = parseInt(div.style.left, 10);
    div.style.left = (oldLeft + leftAmount) + "px";
    div.setAttribute("data-index", newIndex);
};

document.getElementById("insert-button").addEventListener("click", function(evt) {
    evt.preventDefault();
    var form = evt.target.form;

    var newValue = form[0].value;
    var newIndex = parseInt(form[1].value, 10);
    lastAddress += 1;
    lastIndex += 1;

    // Point at new target location
    arrowDiv.innerText = "⬇";
    arrowDiv.style.visibility = "visible";
    arrowDiv.style.left = ((newIndex * divWidth) + divWidth/3) + "px";


    // Make the new memory location
    createAddress(lastAddress, leftPos);
    createIndex(lastIndex, leftPos);

    leftPos += divWidth;

    // Move over each and then add new value

    var addNewValue = () => {
        createValue(newValue, newIndex, (newIndex * divWidth));
    };

    var moveNextDiv = function(index) {
        return function() {
            if (index < newIndex) {
                window.setTimeout(addNewValue, 1000);
                return;
            }
            var valueDiv = document.querySelector("[data-index='" + index + "']");

            moveDiv(valueDiv, index + 1, divWidth);
            window.setTimeout(moveNextDiv(index - 1), 600);
        };
    }

    window.setTimeout(moveNextDiv(document.querySelectorAll(".array-value").length - 1), 300);
});