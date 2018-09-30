var gallery = {
    init: function(){
        this.items = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];
        this.elem = document.getElementById('header');
        this.image = null;
        this.index = 0;
        document.addEventListener('click', this.onClick.bind(this));
    },
    onClick: function(e) {
        if ( e.target.id == 'arrowl' ) {
            --this.index;

            if ( this.index < 0 ) {
                this.index = this.items.length - 1;
            }
            this.show();
        } else if (e.target.id == 'arrowr' ) {
            ++this.index;

            if (this.index >= this.items.length ) {
                this.index = 0;
            }
            this.show();
        } else if (e.target.getAttribute('data-id') ) {
            this.index = parseInt(e.target.getAttribute('data-id')) - 1;
            this.show();
        }
    },
    show: function(){
        if ( this.image ) {
            this.image.remove();
        }

        var src = this.items[this.index];
        this.image = document.createElement('img');
        this.image.src = src;
        this.elem.appendChild(this.image);
    }
};
window.onload = function(){
    gallery.init();
};