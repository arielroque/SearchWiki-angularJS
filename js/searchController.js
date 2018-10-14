let app = angular.module("app",[]);

app.controller("searchCtrl",function ($scope,$http) {


    $scope.search ="";
    $scope.listaBuscas=[];


    $scope.clearSearch = function(){

        $scope.listaBuscas=[];

    };

    $scope.loadSearch = function () {

        // If we do not use jsop, we can not request the wikipedia api because the navigator block to use different host
        // localhost vs wikipedia

        // jsonp need put in the code the directive callback=JSON_CALLBACK;

       $http.jsonp(
           "https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages%7Cextracts&format=json&piprop=thumbnail%7Cname%7Coriginal&exintro=&explaintext=&redirects=yes&callback=JSON_CALLBACK&titles="+$scope.search)
           .then(function (response) {

               let page = response.data.query.pages;
               let id = Object.keys(page)[0];
               let content = page[id];
               $scope.listaBuscas.push(content);

               console.log(page);



       },function(response) {

           alert(response.status);

        });


    };



});