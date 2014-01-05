# Dates - AngularJS

The following form element sets up a date picker where supported (and a text input where not).

<input type="date" 
   ng-model="date" 
   value="{{ date | date: 'yyyy-MM-dd' }}" 
   placeholder="yyyy-MM-dd">

Unfortunately the input="date" doesn't seem to work very well so going to fall back to input = "text".

Now we have a problem in that I want to hold a date object, but the input must be a string. So I must use a seperate value and link them together. e.g. date and dateString.

$scope.dateString = dateFilter(date, 'yyyy-MM-dd');

$scope.date = new Date(dateString);

[note: to use the dateFilter it should be included in the function arguments. function MyController ($scope, dateFilter){...}]

I can therefore set up watchers to update the date when dateString changes and vice versa.

Also, dates can be formatted by angular in the HTML template. Which means I don't have to manually convert in the controller.

e.g.

{{date | date:'yyyy-MM-dd'}}

# Dates In Javascript

To add dates in javascript:

var myDate = new Date();
myDate.setDate(myDate.getDate() + AddDaysHere);





