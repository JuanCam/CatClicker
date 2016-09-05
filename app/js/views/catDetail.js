(function(w) {
    'use strict';
    /*View definition*/
    w.catDetailView = w.views({
        el: document.getElementById('cat-details'),
        template: '../../partials/catDetail.html'
    });
    w.catDetailView.init = function(html) {
    	this.refresh(html);
    	this.render();
        this.el.addEventListener('click', clickCatImg)
    };
    w.catDetailView.render = function() {
    	var data = w.octopus.getSelectedCat();
        this.el.innerHTML = this.build(this.html, data);
    };

    function clickCatImg(event) {
        var element = event.target;
        if (element.tagName == 'IMG') {
            w.octopus.clickCat(element.dataset);
        }
    }
})(window)