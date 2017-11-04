CREATE DATABASE Kwik_E_Mart;
USE Kwik_E_Mart;
CREATE TABLE Products(
    ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
    ItemId,ProductName VARCHAR(50) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INTEGER(10),
    primary key (ItemID)
);

USE Kwik_E_Mart;
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(1, "Banana", "Produce", 0.60, 1000);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(2, "Avacado", "Produce", 1.50, 500);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(3, "Gala Apple", "Produce", 2.50, 150);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(4, "Forza 7", "Video Games", 60, 10);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(5, "Halo 3", "Video Games", 25, 2);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(6, "GranTurismo 6", "Video Games", 50, 10);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(7, "Turbocharger", "Automotive", 5000, 1);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(8, "Windshield Wipers", "Automotive", 25, 5);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(9, "Wheels", "Automotive", 1500, 4);
INSERT INTO Products(ItemId,ProductName,DepartmentName,Price,StockQuantity) VALUES(10, "Engine Oil", "Automotive", 5.75, 20);
