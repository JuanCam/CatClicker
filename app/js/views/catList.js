(function(w) {
    'use strict';
    /*View definition*/
    w.catListView = w.views({
        el: document.getElementById('cat-list'),
        template: 'catItem.html'
    });
    w.catListView.init = function() {
        var view = this;
        this.tmplPath = w.octopus.tmplPath;
        this.ul = document.createElement('ul');
        this.el.appendChild(this.ul);
        this.getTmpl().then(function(text) {

            view.refresh(text);
            view.render();
        });
    };
    w.catListView.render = function() {
        var c = 0;
        var cats = w.octopus.getCats();
        this.ul.innerHTML = '';

        function buildMarkup() {
            if (c < cats.length) {
                this.ul.innerHTML += this.build(cats[c]);
                this.ul.addEventListener('click', clickCatItem);
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