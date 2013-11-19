<!DOCTYPE html>
<html>

<head>
    <title>Treerock Sandbox Projects</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="http://treerock.me/assets/favicon.ico" />
    <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Vollkorn:400italic,400" />

    <!-- Stylesheets -->
    <link href="css/normalize.css" rel="stylesheet" />
    <link href="css/base.css" rel="stylesheet" media="screen" />
    <link href="css/sandbox.css" rel="stylesheet" media="screen" />
    <link href="css/project.css" rel="stylesheet" media="screen" />

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <header class="navbar navbar-default clearfix">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="http://www.treerock.me/">Home</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="http://www.treerock.me/blog/">Blog</a>
                </li>
                <li><a href="http://www.treerock.me/work/">Work</a>
                </li>
                <li class="active"><a href="http://sandbox.treerock.me/">Sandbox</a>
                </li>
            </ul>
        </div>
    </header>

    <div class="container main clearfix">
        <?php include('project.php'); ?>
    </div>

    <footer>
        <div class="container">
            <p>Fais ce que tu veux.</p>
        </div>
    </footer>
    <!--<script src="//code.jquery.com/jquery.js"></script>-->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="scripts/project.js"></script>
</body>

</html>