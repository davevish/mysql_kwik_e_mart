var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Kwik_E_Mart"
});

function displayAll() {
	connection.query('SELECT * FROM Products', function(error, response) {
		if (error) { console.log(error) };

		var theDisplayTable = new Table({
			head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
			colWidths: [10, 30, 18, 10, 14]
		});

		for (i = 0; i < response.length; i++) {
			theDisplayTable.push(
				[response[i].ItemID, response[i].ProductName, response[i].DepartmentName, response[i].Price, response[i].StockQuantity]
			);
		}
		console.log(theDisplayTable.toString());
		inquireForPurchase();
	});

};
function inquireForPurchase() {
	inquirer.prompt([
		{
			name: "ID",
			type: "input",
			message: "What is the item number of the item you want to purchase?"
		}, {
			name: 'Quantity',
			type: 'input',
			message: "How many would you like to buy?"
		},
	]).then(function(answers) {
		var quantityDesired = answers.Quantity;
		var IDDesired = answers.ID;
		purchaseFromDatabase(IDDesired, quantityDesired);
	});
};

function purchaseFromDatabase(ID, quantityNeeded) {
	connection.query('SELECT * FROM Products WHERE ItemID = ' + ID, function(error, response) {
		if (error) { console.log(error) };

		//In stock
		if (quantityNeeded <= response[0].StockQuantity) {
		//Cost
			var totalCost = response[0].Price * quantityNeeded;
			console.log("Congratulations on your purchase! Please come back soon!");
			console.log("The total cost for " + quantityNeeded + " " + response[0].ProductName + " is " + totalCost + ".");
		//Update current stock
			connection.query('UPDATE Products SET StockQuantity = StockQuantity - ' + quantityNeeded + ' WHERE ItemID = ' + ID);
		} else {
			console.log("Sorry, " + response[0].ProductName + " is currently out of stock.");
		};
		displayAll();
	});
};

displayAll();