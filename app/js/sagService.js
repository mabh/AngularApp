angular.module('sagService', [])
    .filter('tagDays', [ function() {
        return function(daysLeft) {     //filter function must have at lease 1 argument
            var content = daysLeft;
            if(content <= 10){
                content = "Hurry up!";
            } else {
                content = "Shop now!";
            }
            return content;
        }
    }])
    .filter('onlyHighReviews', [function() {   //collection filter
        return function(values) {
            var output = [];
            angular.forEach(values, function(value) {
               if(value.reviews.length > 1) {
                   output.push(value);
               }
            });
            return output;
        }
    }])
    .directive('generateList', [function() { //naming convention for directives - reviewsList - mapped to usage reviews-list by compiler
        return function(scope, element, attrs) {    //can specify dependencies also in the array for eg: $compile
            var dataSource = scope[attrs['generateList']];
            var listSource = dataSource[attrs['listProperty']];
            var bProperty = attrs['badgeProperty'];
            var iProperty = attrs['itemProperty'];

            generateList();

            function generateList() {
                if(angular.isDefined(listSource) && angular.isArray(listSource)) {
                    var ul = angular.element('<ul>');
                    ul.addClass('list-group');

                    angular.forEach(listSource, function(item) {
                        //append to ul an li element
                        ul.append(
                           angular.element('<li>')
                           .html(
                                '<span class="badge">' + item[bProperty] + '</span>'
                                + '<strong>' + item[iProperty] + '</strong>'
                            )
                        );
                    });


                    element.append(ul);
                }
            }
        }
    }])
    .directive('cartSummary', [function () {
        return {
            restrict: 'EAM',   //E C M A   element class comment attribute
            templateUrl: 'app/partials/cart-summary.html',
            controller: function ($scope) {     //this directive has its own scope.
                $scope.cart = {
                    customerName: 'Namo',
                    items: [
                        { name: 'iPhone', price: 90000, qty: 1},
                        { name: 'Kurta', price: 900, qty: 1},
                        { name: 'Pajama', price: 9000, qty: 2},
                    ]
                };
            }
            /*(controller:,
            replace: //should I replace the element in which this directive is present
            compile://
            require://
            scope://if you want to define some scope properties*/
        };
    }])
    .service('bookStoreService', ['$http', '$q', function($http, $q) {    //this svc needs $http svc to be injected in it
        var url = 'http://it-ebooks-api.info/v1/search/';
        var books = [];

        this.getBooks = function(query) {

            var defer = $q.defer();
            var promises = $http.get(url + query);  //a promise is like XMLHttp callbacks - async get call
            console.log('Making HTTP GET call...');
            promises.success(function (response) {
               console.log('Received response');
               books = response.Books;
               defer.resolve(books);
            });
            promises.error(function (err) {
               console.log('Error in making HTTP GET call');
               defer.error(err);
            });
            return defer.promise;
        };

        this.updateBook = function(book) {

        }

        this.getDetails = function(id) {
            var url = 'http://it-ebooks-api.info/v1/book/' + id;
            var defer = $q.defer(); //A Future kind of thing for defer

            var promise = $http.get(url);
            promise.success(function (response) {
               defer.resolve(response);
            });
            promise.error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        }

    }]);
