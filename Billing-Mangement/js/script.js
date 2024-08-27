document.addEventListener('DOMContentLoaded', function () {
    let invoiceNumber = '';
    let date = '';
    let phoneNumber = '';
    let view = true;
    let items = [];
    let product = {
        name: '',
        category: '',
        quantity: 0,
        price: 0
    };
    let openPopup = false;

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

    function updateDate() {
        const current = new Date();
        date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    }

    function renderForm() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="containers">
                <div class="form">
                    <input type="text" id="invoice-number" placeholder="Invoice Number" value="${invoiceNumber}" />
                    <input type="text" id="phone-number" placeholder="Your Phone Number" value="${phoneNumber}" />
                    <button id="create-button">Create ➡️</button>
                </div>
            </div>
        `;

        document.getElementById('create-button').addEventListener('click', function () {
            invoiceNumber = document.getElementById('invoice-number').value;
            phoneNumber = document.getElementById('phone-number').value; // Get phone number
            view = false;
            renderPdfTemplate();
        });
    }

    function renderPdfTemplate() {
        const app = document.getElementById('app');
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        app.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-4 brcode">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/5JW5ZAAAAABJRU5ErkJggg==" alt="Barcode" width="100" height="50">
                    </div>
                    <div class="col-md-8 text-right bbc">
                        <h4 style="color: #325aa8;"><strong>Company</strong></h4>
                        <p>(+91) 1234567890</p>
                        <p>smartbill@gmail.com</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h2 style="color: #325aa8;">INVOICE</h2>
                        <h5>Id: ${invoiceNumber}</h5>
                    </div>
                </div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th><h5>Product Name</h5></th>
                                <th><h5>Category</h5></th>
                                <th><h5>Quantity</h5></th>
                                <th><h5>Price</h5></th>
                                <th><h5>Amount</h5></th>
                                <th><h5>Actions</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item, index) => `
                                <tr key="${index}">
                                    <td>${item.name}</td>
                                    <td>${item.category}</td>
                                    <td>${item.quantity}</td>
                                    <td><i class="fas fa-rupee-sign"></i> ₹ ${item.price}</td>
                                    <td><i class="fas fa-rupee-sign"></i> ₹ ${item.price * item.quantity}</td>
                                    <td><button class="delete-button" data-index="${index}">Delete</button></td>
                                </tr>
                            `).join('')}
                            <tr>
                                <td class="text-right" colspan="4">
                                    <p><strong>Total Amount: </strong></p>
                                    <p><strong>Payable Amount: </strong></p>
                                </td>
                                <td colspan="2">
                                    <p><strong><i class="fas fa-rupee-sign"></i> ₹ ${sum}</strong></p>
                                    <p><strong><i class="fas fa-rupee-sign"></i> ₹ ${sum}</strong></p>
                                </td>
                            </tr>
                            <tr style="color: #F81D2D;">
                                <td class="text-right" colspan="5"><h4><strong>Total:</strong></h4></td>
                                <td class="text-left"><h4><strong><i class="fas fa-rupee-sign"></i> ₹ ${sum}</strong></h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p><b>Date:</b> ${date}</p>
                    <p><b>Contact: (+91) ${phoneNumber}</b></p>
                </div>
            </div>
            <button id="print-button" class="btnn">Print</button>
            <button id="add-product-button" class="btnn1">Add Product</button>
            ${openPopup ? `
                <div class="dialog">
                    <div class="dialog-content">
                        <div class="dialog-close" id="close-popup">&times;</div>
                        <h4>New Product</h4>
                        <input type="text" id="product-name" placeholder="Product Name" value="${product.name}" />
                        <select id="product-category">
                            ${categories.map(cat => `<option value="${cat}" ${cat === product.category ? 'selected' : ''}>${cat}</option>`).join('')}
                        </select>
                        <input type="number" id="product-quantity" placeholder="Quantity" value="${product.quantity}" />
                        <input type="number" id="product-price" placeholder="Price ₹" value="${product.price}" />
                        <button id="add-product">Add</button>
                    </div>
                </div>
            ` : ''}
        `;

        document.getElementById('print-button').addEventListener('click', function () {
            window.print();
        });

        document.getElementById('add-product-button').addEventListener('click', function () {
            openPopup = true;
            renderPdfTemplate();
        });

        if (openPopup) {
            document.getElementById('close-popup').addEventListener('click', function () {
                openPopup = false;
                renderPdfTemplate();
            });

            document.getElementById('add-product').addEventListener('click', function () {
                product.name = document.getElementById('product-name').value;
                product.category = document.getElementById('product-category').value;
                product.quantity = parseInt(document.getElementById('product-quantity').value, 10);
                product.price = parseFloat(document.getElementById('product-price').value);
                items.push({ ...product });
                product = { name: '', category: '', quantity: 0, price: 0 };
                openPopup = false;
                renderPdfTemplate();
            });
        }

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                items.splice(index, 1);
                renderPdfTemplate();
            });
        });
    }

    updateDate();
    renderForm();
});
