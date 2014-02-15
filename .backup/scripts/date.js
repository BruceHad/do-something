// Temporary file for figuring out date inputs
function DateCntr($scope, dateFilter) {
    $scope.date = Date.now();
    $scope.dateString = dateFilter($scope.date, 'yyyy-MM-dd');

    $scope.$watch('date', function(date){
        $scope.dateString = dateFilter(date, 'yyyy-MM-dd');
    });

    $scope.$watch('dateString', function(dateString){
        // console.log(new Date(dateString));
        if(dateString.length == 10 && dateString.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)){
            $scope.date = new Date(dateString);
            console.log('Valid date');
        }
        else {
            console.log('Not valid date');
        }
    });
}