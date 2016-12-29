function fbn(n) {
    var nums = [];
    var a = b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
        nums.push(a);
    }
    return nums
}

var myapp = angular.module('app', [])
myapp.controller('capp', function ($scope, $location, $timeout, $interval, $http) {
    $scope.price = 0
    $scope.count = 0
    $scope.fn = 3
    $scope.firstname = "World"
    // 此处如果使用$scope.lfirstname = angular.lowercase($scope.firstname)， 为一次绑定
    // lfirstname不会随firstname改变， 类似Vue中的方法/computed。
    $scope.lfirstname = function() { return angular.lowercase($scope.firstname)}
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
    $scope.ajaxRefresh = function() {
        $http.get('movies.json').success(
            function(response) {
                $scope.movies = response.movies
            }
        )
    }
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
    $scope.changebk = function(color) {
        console.log('okk')
        document.getElementsByTagName('body')[0].style.color = color
    }
    $scope.ctemp = ""
    $scope.ftemp = ""
    $scope.ctempchange = function() {
        var ftemp = 9 * $scope.ctemp / 5 + 32
        if (typeof ftemp === "number" && $scope.ctemp !== "" ) {
            $scope.ftemp = ftemp
        }else {
            $scope.ftemp = ""
        }
    }
    $scope.ftempchange = function() {
        var ctemp = 5 * ($scope.ftemp - 32) / 9
        if (typeof ctemp === "number" && $scope.ftemp !== "" ) {
            $scope.ctemp = ctemp
        }else {
            $scope.ctemp = ""
        }
    }
    $scope.boil = function() {
        return ($scope.ctemp >= 100)
    }
})

