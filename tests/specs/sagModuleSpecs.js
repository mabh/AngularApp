describe('SAB Products module tests', function () {
    // ensure the module and its dependancies are loaded
    beforeEach(module('sagMod'));

    describe('Products controller tests', function () {
        // declare test dups
        var scope, productsCtrl,
        products = [
            {id:1001, name:'iphone'},
            { id: 1002, name: 'iphone plus' }
        ]
        // create controller instance
        beforeEach(inject(function ($controller, $rootScope) {
            scope = {}; //$rootScope.$new();
            productsCtrl = $controller('productsCtrl',
                {$scope: scope, $rootScope: $rootScope
                    , PRODUCTS: products});
        }));

        // unit test methods
        it('should have $scope initialised with products property',
            function () {
                expect(scope.products).toBeDefined();
            });
        it('should have $scope with 1 product in products property',
            function () {
                expect(scope.products.length).toEqual(2);
            })
    });
});