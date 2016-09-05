(function(w) {
    w.views = function(attributes) {
        return new View(attributes);
    };

    function View(attributes) {
        return {
            el: attributes.el,
            template: attributes.template,
            getTmpl: function() {
                return fetch(this.template, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/html'
                    }
                }).then(function(response) {

                    return response.text();
                })
            },
            build: function(data) {
                var html = this.html;
                for (var field in data) {
                    var regExp = new RegExp('[{]{2}[' + field + ']+(?=[}]{2})[}]{2}', 'g');
                    if (regExp.test(html)) {
                        html = html.replace(regExp, data[field]);
                    }
                }
                return html;
            },
            refresh:function(html) {
            	this.html = html;
            }
        }
    }


})(window);