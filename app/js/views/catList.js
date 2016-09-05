(function(w) {
    'use strict';
    /*View definition*/
    w.catListView = w.views({
        el: document.getElementById('cat-list'),
        template: '../../partials/catItem.html'
    });
    w.catListView.init = function() {
        var list = this;
        this.getTmpl().then(function(text) {

            list.refresh(text);
            list.render();
        });
    };
    w.catListView.render = function() {
        var c = 0;
        var cats = w.octopus.getCats();

        function buildMarkup() {
            if (c < cats.length) {
                this.el.innerHTML += this.build(this.html, cats[c]);
                this.el.addEventListener('click', clickCatItem);
                c++;
                return buildMarkup.call(this);
            } else {
                return true;
            }
        }
        buildMarkup.call(this);
    }

    function clickCatItem(event) {
        var element = event.target;
        if (element.tagName == 'LI') {
            w.octopus.selectCat(element.dataset);
        }
    };
})(window)