var ourAngularApp = angular.module('murray', []);

ourAngularApp.controller('CartCtrl', function ($scope, CartFactory) {
	$scope.loadCart = CartFactory.get;
	$scope.total = function () {
		return $scope.loadCart().reduce(function (sum, item) {
			return sum + item.price;
		}, 0);
	};
});

ourAngularApp.controller('ProductsCtrl', function ($scope, CartFactory, ProductFactory) {
	ProductFactory.fetchAll()
	.then(function (products) {
		$scope.products = products;
	});
	$scope.addToCart = function (item) {
		CartFactory.add(item);
	};
});

ourAngularApp.factory('ProductFactory', function ($http) {
	return {
		fetchAll: function () {
			var promiseForResponseData =
			$http.get('/pictures')
			.then(function (response) {
				return response.data;
			});
			return promiseForResponseData;
		}
	}
});

ourAngularApp.factory('CartFactory', function ($http) {
	var cart = [];
	$http.get('/cart')
	.then(function (response) {
		cart = response.data;
	});
	return {
		get: function () {
			return cart;
		},
		add: function (thing) {
			$http.post('/cart', thing)
			.then(function () {
				cart.push(thing);
			});
		}
	}
});