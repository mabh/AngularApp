//Angular JS module

//create a new module and add a new controller

/* not advisable syntax because mod sits in global scope taking memory */
//var mod = angular.module('sagMod', [ /* dependencies of this mod */]);

//recommended approach - chaining
angular.module('sagMod', [ 'ngMessages', 'sagService'/* dependencies of this mod */])
        .run(['$rootScope', 'PRODUCTS', function($rootScope, PRODUCTS) {
            $rootScope.currentProduct = PRODUCTS[0];
        }])
        .controller('productsCtrl', ['$scope', '$rootScope', 'PRODUCTS', function($scope, $rootScope, PRODUCTS) {    //Ctrl is practice not necessary

            /*$scope.products = [ //for compiler to know at compile time which scopes we are using we can give these scope
                                 // names as first argument of array...otherwise at runtime it has to figure out which
                                 // scopes are used by checking function args
            ];*/

            $scope.products = PRODUCTS;

            $scope.selectProduct = function(product) {
                //product is the object getting clicked via button
                //data passing between controllers is only via rootScope
                $rootScope.currentProduct = product;
            }
        }])
        .controller('detailsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
            $scope.saveReview = function() {
                if(angular.isDefined($scope.review)) {
                    $rootScope.currentProduct.reviews.push($scope.review);
                    $scope.review = {}; //reset $scope.review which then resets form also
                    //mapping between DOM and object model
                }
            }
        }])
        .controller('detailsTabCtrl', [ function() {    //scope less controller, makes view behaviour dependent
            this.tab = 1;
            this.setTab = function(tabIdx) {
                this.tab = tabIdx;
            }
            this.isTab = function(tabIdx) {
                return (this.tab == tabIdx);
            }
        }])
        .value('PRODUCTS', [    //value is the module wide values , similarly constants
            {
                id: 1001, name: 'Sneakers', desc: 'Shoes', price: '12000.50', image: 'sneakers.jpg', daysLeft: 7,
                reviews: [
                    {by: 'a@b.com', comment: 'Good one!', rating: 5},
                    {by: 'b@c.com', comment: 'Nice one!', rating: 5},
                    {by: 'c@d.com', comment: 'Comfortable one!', rating: 5},
                    {by: 'd@e.com', comment: 'Comfortable one!', rating: 4}
                ]
            },
            {
                id: 1002, name: 'New Sneakers', desc: 'New Shoes', price: '22000.50', image: 'gsneakers.jpg', daysLeft: 12,
                reviews: [
                    {by: 'a@b.com', comment: 'Nice!', rating: 3},
                    {by: 'b@c.com', comment: 'Love these shoes!', rating: 5},
                    {by: 'c@d.com', comment: 'Okie!', rating: 4}
                ]
            }
        ]);

/*
model - comes from server
viewmodel - generated out of model for need of the view
 */