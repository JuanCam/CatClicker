(function(w) {
    'use strict';
    /*View definition*/
    w.catDetailView = w.views({
        el: document.getElementById('cat-details'),
        template: 'catDetail.html'
    });
    w.catDetailView.init = function(html) {
        var view = this;
        this.tmplPath = w.octopus.tmplPath;
        w.catDetailView.getTmpl().then(function(text) {
            view.refresh(text);
        });
    };
    w.catDetailView.render = function() {
        var data = w.octopus.getSelectedCat();
        this.el.innerHTML = this.build(data);
        this.el.addEventListener('click', clickCatImg);
    };

    function clickCatImg(event) {
        var element = event.target;
        if (element.tagName == 'IMG') {
            w.octopus.clickCat(element.dataset);
        }
    }
})(window)