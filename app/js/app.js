(function(w) {
    'use strict';
    var model = {
        selectedCat: {},
        cats: [{
            'id': 1,
            'name': 'Garfield',
            'img': 'http://placekitten.com/200/300',
            'clicks': 0
        }, {
            'id': 2,
            'name': 'Whiskers',
            'img': 'http://placekitten.com/400/300',
            'clicks': 0
        }, {
            'id': 3,
            'name': 'Bella',
            'img': 'http://placekitten.com/200/300',
            'clicks': 0
        }, {
            'id': 4,
            'name': 'Chloe',
            'img': 'http://placekitten.com/200/300',
            'clicks': 0
        }, {
            'id': 5,
            'name': 'Lucy',
            'img': 'http://placekitten.com/200/300',
            'clicks': 0
        }, {
            'id': 6,
            'name': 'Gizmo',
            'img': 'http://placekitten.com/200/300',
            'clicks': 0
        }]
    };

    w.octopus = {
        init: function() {

            this.tmplPath = '../../partials/';
            w.catListView.init();
            w.catDetailView.init();
            w.adminView.init();
        },
        updateViews: {
            details: function() {
                w.catDetailView.render();
            },
            list: function() {
                w.catListView.render();
            },
            admin: function() {
                w.adminView.render();
            },
        },
        selectCat: function(catData) {

            var catId = catData.id;
            this.setSelectedCat(catId);
            this.updateViews.details();
            this.updateViews.admin();
        },
        getSelectedCat: function() {

            return model.selectedCat;
        },
        getCats: function() {
            return model.cats;
        },
        setSelectedCat: function(id) {
            model.selectedCat = model.cats.find(function(cat) {

                return cat.id == id;
            });
        },
        clickCat: function(catData) {

            var catId = catData.id;
            this.setSelectedCat(catId);
            model.selectedCat.clicks++;
            this.updateViews.details();
            this.updateViews.admin();
        }
    }
    w.octopus.init();
})(window)