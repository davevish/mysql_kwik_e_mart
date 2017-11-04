var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

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
		inquireForUpdates();
	});
};

function inquireForUpdates() {
	inquirer.prompt([{
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers) {
		//switch statement for manager functions
		switch (answers.action) {

			case 'Restock Inventory':
				restockRequest();
				break;

			case 'Add New Product':
				addRequest();
				break;

			case 'Remove An Existing Product':
				removeRequest();
				break;
		}
	});
};

function restockRequest() {
	inquirer.prompt([
		{
			name: "ID",
			type: "input",
			message: "What is the item number of the item you wish to restock?"
		}, {
			name: 'Quantity',
			type: 'input',
			message: "How many would you like to add?"
		},

	]).then(function(answers) {
		var quantityAdded = answers.Quantity;
		var IDOfProduct = answers.ID;
		restockDatabase(IDOfProduct, quantityAdded);
	});
};

function restockDatabase(id, quant) {
	connection.query('SELECT * FROM Products WHERE ItemID = ' + id, function(error, response) {
		if (error) { console.log(error) };
		connection.query('UPDATE Products SET StockQuantity = StockQuantity + ' + quant + ' WHERE ItemID = ' + id);
		displayAll();
	});
};

function addRequest() {
	inquirer.prompt([
		{
			name: "ProductID",
			type: "input",
			message: "Give the product an ID Number"
		},
		{
			name: "ProductName",
			type: "input",
			message: "What item do you want to restock?"
		},
		{
			name: 'DepartmentName',
			type: 'input',
			message: "What is the product category?"
		},
		{
			name: 'Price',
			type: 'input',
			message: "Price?"
		},
		{
			name: 'StockQuantity',
			type: 'input',
			message: "Quantity?"
		},

	]).then(function(answers){
		var productID = answers.ItemID;
		var name = answers.Name;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
		buildNewItem(name,category,price,quantity);
	});
};

function buildNewItem(name,category,price,quantity){
	connection.query('INSERT INTO Products (ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES("'ItemID' + ' + ProductName + '","' + DepartmentName + '",' + Price + ',' + StockQuantity +  ')');
	displayAll();
};

function removeRequest(){
	inquirer.prompt([{
		name: "ID",
		type: "input",
		message: "What is the item number of the item you wish to remove?"
	}]).then(function(answer){
		var id = answer.ID;
		removeFromDatabase(id);
	});
};

function removeFromDatabase(id){
	connection.query('DELETE FROM Products WHERE ItemID = ' + ItemID);
	displayAll();
};

displayAll();