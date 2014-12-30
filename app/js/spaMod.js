/**
 * Created by MABH on 23-Dec-14.
 */
angular.module('spaMod', ['sagService', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        //in this phase before run services cannot be configured only providers can be configured
        $routeProvider
            .when('/', {
                templateUrl: 'app/partials/books-home.html'
            })
            .when('/books', {
                templateUrl: 'app/partials/books-list.html',
                controller: 'booksCtrl'
            })
            .when('/books/:id', {
                templateUrl: 'app/partials/book-details.html',
                controller: 'bookDetailsCtrl'
            })

    }])
    .controller('booksCtrl', ['$scope','bookStoreService',
        function ($scope, bookStoreService) {
            $scope.search = function() {
                bookStoreService
                    .getBooks($scope.query)
                    .then(function (books) {
                        $scope.books = books;
                    });
            }
        }
    ])
    .controller('bookDetailsCtrl', ['$scope','bookStoreService',
        function ($scope, bookStoreService) {
            bookStoreService
                .getDetails()           //getDetails returns a promise
                .then(function (response) {     //on return on promise execute then (only on success)
                    $scope.book = response;
                });
        }
    ]);
