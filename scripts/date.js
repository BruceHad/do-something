// Temporary file for figuring out date inputs
function DateCntr($scope, dateFilter) {
    $scope.date = Date.now();
    $scope.dateString = dateFilter($scope.date, 'yyyy-MM-dd');

    $scope.$watch('date', function(date){
        $scope.dateString = dateFilter(date, 'yyyy-MM-dd');
    });

    $scope.$watch('dateString', function(dateString){
        $scope.date = new Date(dateString);
    });
}