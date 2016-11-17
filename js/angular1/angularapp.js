function fbn(n) {
    var nums = [];
    var a = b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
        nums.push(a);
    }
    return nums
}

var app = angular.module('app', [])
app.controller('capp', function ($scope, $location, $timeout, $interval, $http) {
    $scope.price = 0
    $scope.count = 0
    $scope.fn = 3
    $scope.rootUrl = $location.absUrl()
    $scope.countdown = 5
    $scope.seeindex = true
    $scope.fruits = ['apple', 'banana', 'orange']
    $scope.clickme = 'ClickMe'
    $scope.disableit = function() {
        $scope.cantuse = true
        $scope.showenable = true
        $scope.clickme = 'Now you cant'
    }
    $scope.enableit = function() {
        $scope.cantuse = false
        $scope.showenable = false
        $scope.clickme = 'ClickMe'
    }
    $scope.players = [
        {
            name: 'Kobe',
            position: 'Guard',
            score: 81
        },
        {
            name: 'Pau',
            position: 'Center',
            score: 30
        },
        {
            name: 'Lamar',
            position: 'Forward',
            score: 28
        }
    ]
    $interval(function() {
        $scope.countdown -= 1
    }, 1000)
    $timeout(function() {
        $scope.message = 'Nice to meet you!'
    }, 5000)
    $http.get('movies.json').success(
        function(response){
            $scope.movies = response.movies
        }
    )
    $scope.nums = function() {
        return fbn($scope.fn)
    }
})

