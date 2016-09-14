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
                var expectField = new RegExp('[{]{2}[@/a-zA-Z0-9]+(?=[}]{2})[}]{2}', 'g');

                for (var field in data) {

                    var structs = findField(field, html);
                    if (isLoop(structs, field)) {
                        if (!(data[field] instanceof Array)) {
                            console.error('data must be an array when makred @ (loop)');
                            return;
                        }
                        var scopes = findScopes(structs, html);
                        var htmlList = replaceScopes(scopes, data[field]);
                        html = putHtml.call(html, htmlList, scopes);
                        html = cleanHTML.call(html, structs);
                    } else {
                        html = printVariables.call(html, field, data[field]);
                    }
                }

                return html;
            },
            refresh: function(html) {
                /*Refresh the mark up in the view*/
                this.html = html;
            }
        }

        /*Private methods*/


        function findField(field, html) {

            var reg = new RegExp('[{]{2}[@/' + field + ']+(?=[}]{2})[}]{2}', 'g')
            return html.match(reg);
        }


        function printVariables(field, data) {

            var reg = new RegExp('[{]{2}[' + field + ']+(?=[}]{2})[}]{2}', 'g');
            return this.replace(reg, (data === undefined) ? '' : data);
        }

        function findExpr(str) {

            return this.search(new RegExp(str, 'g'));
        }

        function cleanHTML(structs) {
            var s = 0;
            var html = this;

            return clean(structs);

            function clean(structs) {
                if (s < structs.length) {
                    html = html.replace(new RegExp(structs[s], 'g'), '');
                    s++;
                    return clean(structs);
                } else {
                    return html;
                }
            }
        }
        /*Each loop - template functionality*/

        function isLoop(structs, field) {

            return (structs) ? structs.join('').search(new RegExp('@' + field, 'g')) > -1 : structs;
        }

        function findScopes(structs, html) {
            var s = 0;
            var scopes = [];
            var htmlScope = '';

            return findScope(structs, html);

            function findScope(structs, html) {
                if (s < structs.length) {
                    if (s % 2 == 0) {
                        var index = findExpr.call(html, structs[s]) + structs[s].length;
                        htmlScope = html.slice(index);
                    } else {
                        var index = findExpr.call(htmlScope, structs[s]);
                        htmlScope = htmlScope.slice(0, index);
                        scopes.push(htmlScope);
                        html = html.replace(structs[s - 1] + htmlScope + structs[s], '');
                    }
                    s++;
                    return findScope(structs, html);
                } else {
                    return scopes;
                }
            }
        }

        function putHtml(htmlList, scopes) {
            var s = 0;
            var html = this;

            return put(scopes);

            function put(scopes) {
                if (s < scopes.length) {
                    html = html.replace(scopes[s], htmlList[s]);
                    s++;
                    return put(scopes);
                } else {
                    return html;
                }
            }
        }

        function replaceScopes(scopes, data) {
            var s = 0;
            var htmlList = [];

            function replaceScope(scopes, data) {
                var scope = scopes[s]
                if (s < scopes.length) {
                    htmlList.push(printEach(scope, data));
                    s++;
                    return replaceScope(scopes, data);
                } else {
                    return htmlList;
                }
            }
            return replaceScope(scopes, data);
        }

        function printEach(scope, list) {

            var d = 0;
            var htmlList = '';

            return each(list, scope);

            function each(list, scope) {
                var eachScope = scope;
                if (d < list.length) {
                    for (var field in list[d]) {
                        var data = list[d][field];
                        eachScope = printVariables.call(eachScope, field, data);
                    }
                    htmlList += eachScope;
                    d++;
                    return each(list, scope);
                } else {
                    return htmlList;
                }
            }

        }

    }


})(window);
