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
        this.getTmpl().then(function(text) {

            view.refresh(text);
            view.render();
        });
    };
    w.catListView.render = function() {
        var c = 0;
        var cats = w.octopus.getCats();
        this.el.innerHTML = this.build({
            'Cats': cats,
            'TitleList': 'Cat List'
        });
        this.el.addEventListener('click', clickCatItem);
    }

    function clickCatItem(event) {
        var element = event.target;
        if (element.tagName == 'LI') {
            w.octopus.selectCat(element.dataset);
        }
    };
})(window)
