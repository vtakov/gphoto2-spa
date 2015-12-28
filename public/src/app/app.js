angular.module('app', [])
    .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $http) {
    $scope.item = 17;
    $http.get('/date', { hm: 22 })
        .then(onSuccess)
        .catch(onError);

    function onSuccess(data) {
        $scope.item = data.data;
        console.log(data);
    }

    function onError(data) {
        $scope.item = 'error: ' + data;
    }
}
