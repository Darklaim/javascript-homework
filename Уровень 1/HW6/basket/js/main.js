var products = {
    items: [{
        id: 1,
        name: 'Кепка',
        price: 20,
        src: 'img/hat.png'
    }, {
        id: 2,
        name: 'Майка',
        price: 30,
        src: 'img/shirt.png'
    }, {
        id: 3,
        name: 'Штаны',
        price: 50,
        src: 'img/pants.png'
    }, {
        id: 4,
        name: 'Ботинки',
        price: 70,
        src: 'img/boots.png'
    }],
    getProductById: function(id){
        for ( var i = 0; i < this.items.length; i++ ) {
            if ( this.items[i].id == id ) {
                return this.items[i];
            }
        }

        return false;
    },
    render: function(){
        for (var i = 0; i < this.items.length; i++){
            var product = this.items[i];
            var section = document.createElement('section');
            section.innerHTML = '<span>Название товара: ' + product.name + ';<br>' + 'Цена товара: ' + product.price + '$.</span>';
            section.id = product.name;
    
            document.body.appendChild(section);
    
            if (product.src){
                var img = document.createElement('img');
                img.src = product.src
                section.appendChild(img);
            }
    
            var input = document.createElement('input');
            input.type = 'button';
            input.value = 'Добавить в корзину';
            input.id = product.name + "-input";
            input.setAttribute('data-id', product.id);
            var self = this;

            input.addEventListener('click', function(e){
                var productId = parseInt(e.target.getAttribute('data-id'));
                if ( productId ) {
                    var productData = self.getProductById(productId);

                    if ( productData ) {
                        cart.addProduct(productData);
                    }
                }
            });
            
            section.appendChild(input);
        }
    }
};

var cart = {
    items: [],
    totalPrice: 0,
    totalAmount: 0,
    getProductById: function(id){
        for ( var i = 0; i < this.items.length; i++ ) {
            if ( this.items[i].id == id ) {
                return this.items[i];
            }
        }

        return false;
    },
    addProduct: function(productData){
        var product = this.getProductById(productData.id);

        if ( product ) {
            ++product.count;
        } else {
            product = {
                id: productData.id,
                price: productData.price,
                count: 1
            };
            this.items.push(product);
        }
        this.calculate();
        this.render();
    },
    calculate: function(){
        this.totalPrice = 0;
        this.totalAmount = 0;
        for ( var i = 0; i < this.items.length; i++ ) {
            this.totalPrice += this.items[i].price * this.items[i].count;
            this.totalAmount += this.items[i].count;
        }
    },
    render: function() {
        var element = document.getElementById('fullprice');
        if (this.totalAmount == 1){
            element.innerHTML = this.totalAmount + ' товар на сумму ' + this.totalPrice;
        }
        if (this.totalAmount > 1 && this.totalAmount <= 4){
            element.innerHTML = this.totalAmount + ' товара на сумму ' + this.totalPrice;
        }
        if (this.totalAmount > 4){
            element.innerHTML = this.totalAmount + ' товаров на сумму ' + this.totalPrice;
        }
    }
}

window.addEventListener('load', function(){
    products.render();
});
