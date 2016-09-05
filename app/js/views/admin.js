(function(w) {
    'use strict';
    /*View definition*/
    w.adminView = w.views({
        el: document.getElementById('admin-form'),
        template: 'admin.html'
    });
    w.adminView.init = function() {
        this.tmplPath = w.octopus.tmplPath;
        var adminBtn = document.getElementById('show-admin');
        var view = this;
        this.getTmpl().then(function(text) {
            view.refresh(text);
            view.hide();
        })
        adminBtn.addEventListener('click', function(event) {
            var display = view.el.style.display;
            if (display == 'none') {
                view.show()
            } else {
                view.hide();
            }
        });
    };
    w.adminView.show = function() {

        this.el.style.display = 'block';
    }
    w.adminView.hide = function() {

        this.el.style.display = 'none';
    }
    w.adminView.render = function() {
        var data = w.octopus.getSelectedCat();
        this.el.innerHTML = this.build(data);
        this.setSaveCancelEvents();
    };
    w.adminView.setSaveCancelEvents = function() {

        var saveBtn = this.el.getElementsByClassName('save-btn')[0];
        var cancelBtn = this.el.getElementsByClassName('cancel-btn')[0];
        var view = this;
        var cat = w.octopus.getSelectedCat();
        cancelBtn.addEventListener('click', function(event) {
            event.preventDefault();
            view.hide();
        });
        saveBtn.addEventListener('click', function(event) {

            event.preventDefault();
            var form = view.el.getElementsByTagName('form')[0];
            cat.name = form.name.value;
            cat.img = form.img.value;
            cat.clicks = form.clicks.value;
            w.octopus.updateViews.details();
            w.octopus.updateViews.list();

        });
    };

})(window)