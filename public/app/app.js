var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode(true);

var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
       },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };


	$routeProvider
		.when('/', {
			templateUrl: '/partial/main/home',
			controller: 'MainCtrl'
		})
		.when('/books', {
			templateUrl: '/partial/books/books-list',
			controller: 'BooksListCtrl'
		})
		.when('/books/:id', {
			templateUrl: '/partial/books/book-details',
			controller: 'BooksDetailsCtrl'
		})
		.when('/addBook', {
			templateUrl: '/partial/books/addBook',
			controller: 'AddBookCtrl',
			resolve: routeUserChecks.adminRole
		})
		
});

app.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
            $location.path('/');
        }
	})
});
