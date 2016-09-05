(function(w) {
    'use strict';
    var model = {
        selectedCat: {},
        cats: [{
            'id': 1,
            'name': 'Garfield',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }, {
            'id': 2,
            'name': 'Whiskers',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }, {
            'id': 3,
            'name': 'Bella',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }, {
            'id': 4,
            'name': 'Chloe',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }, {
            'id': 5,
            'name': 'Lucy',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }, {
            'id': 6,
            'name': 'Gizmo',
            'img': 'http://placekitten.com/g/200/300',
            'clicks': 0
        }]
    };

    w.octopus = {
        init: function() {

            w.catListView.init();
        },
        selectCat: function(catData) {

            var catId = catData.id;
            this.setSelectedCat(catId);
            w.catDetailView.getTmpl().then(function(text) {
                var details = w.catDetailView;
                w.catDetailView.init(text);
            })
        },
        getSelectedCat: function(id) {

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
            w.catDetailView.render();
        }
    }
    w.octopus.init();
})(window)