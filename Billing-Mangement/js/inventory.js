// JavaScript file: inventory.js

const categories = [
    'Groceries',
    'Clothing',
    'Electronics',
    'Home Appliances',
    'Furniture',
    'Health & Beauty',
    'Sports & Outdoors',
    'Toys & Games'
];

let inventory = [];

// Populate the category dropdown
function populateCategories() {
    const categorySelect = document.getElementById('itemCategory');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Call this function to populate categories on page load
populateCategories();

// Function to add an item to the inventory
function addItem() {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const category = document.getElementById('itemCategory').value;

    if (name && !isNaN(quantity) && category) {
        inventory.push({ name, quantity, category });
        updateInventoryList();
        updateStockCount();
        updateCategoryStockCount();
        document.getElementById('itemName').value = '';
        document.getElementById('itemQuantity').value = '';
        document.getElementById('itemCategory').value = '';
    } else {
        alert('Please enter a valid item name, quantity, and select a category.');
    }
}

// Function to update the inventory list
function updateInventoryList() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} (${item.category})`;
        inventoryList.appendChild(li);
    });
}

// Function to update the stock count
function updateStockCount() {
    const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('totalItems').textContent = `Total Items: ${totalItems}`;
}

// Function to update the category-wise stock count
function updateCategoryStockCount() {
    const categoryCounts = categories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {});

    inventory.forEach(item => {
        categoryCounts[item.category] += item.quantity;
    });

    const categoryStockDisplay = document.getElementById('categoryStockDisplay');
    categoryStockDisplay.innerHTML = '';

    Object.keys(categoryCounts).forEach(category => {
        const div = document.createElement('div');
        div.textContent = `${category}: ${categoryCounts[category]}`;
        categoryStockDisplay.appendChild(div);
    });
}
