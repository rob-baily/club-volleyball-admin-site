<!doctype html>
<html lang="en" ng-app="mainApp">
<head>
    <meta charset="utf-8">
    <title>BRYC Data Administration</title>
    <script src="/javascript/angularjs/angular.js"></script>
    <script src="/javascript/angularjs/angular-resource.js"></script>
    <script src="/javascript/angularjs/angular-ui-router.js"></script>
    <script src="/javascript/angularjs/angular-spring-data-rest.js"></script>
    <script src="/javascript/angucomplete/angucomplete-alt.min.js"></script>
    <script src="/javascript/admin-angular/spring-data-rest-crud.js"></script>
    <script src="/javascript/admin-angular/controllers.js"></script>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
<table>
    <tr><td>
        <a href="/"><img src="/images/BRYCLogo.png" height="32" alt="BRYC!!"/></a>
    </td>
        <td>
            <h3><a ui-sref="modulesList">Modules</a></h3>
        </td></tr>
</table>
<div ui-view></div> <!-- This is where our views will load from ui.router -->

</body>
</html>