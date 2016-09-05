(function(w) {
    'use strict';
    /*This is the view core object*/
    w.views = function(attributes) {
        return new View(attributes);
    };

    function View(attributes) {
        return {
            el: attributes.el,
            template: attributes.template,
            getTmpl: function() {
                /*Get template.*/
                return fetch(this.tmplPath + this.template, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/html'
                    }
                }).then(function(response) {

                    return response.text();
                })
            },
            build: function(data) {
                /*Build the html based on the data object*/
                var html = this.html;
                for (var field in data) {
                    var regExp = new RegExp('[{]{2}[' + field + ']+(?=[}]{2})[}]{2}', 'g');
                    if (regExp.test(html)) {
                        html = html.replace(regExp, (data[field] === undefined) ? '' : data[field]);
                    }
                }
                return html;
            },
            refresh: function(html) {
                /*Refresh the mark up in the view*/
                this.html = html;
            }
        }
    }


})(window);