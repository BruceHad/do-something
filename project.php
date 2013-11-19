<div class="row heading clearfix">
    <h1>Treerock</h1>
    <p class="subheading">
        Sandbox Projects
        <br />Learning
        <br />\ experiments
    </p>
</div>

<div ng-controller="ProjCntr" ng-app>
    <div class="container sandbox clearfix" ng-class="{'hide': ! isActive('sandbox')}">
<?php

$sb_array = array(
    array (
        "name"    => "Metric Convertion",
        "url"     => "//sandbox.treerock.me/convert/",
        "date"    => "2013-11-01",
        "desc"    => "<p>'Metric Convertions' is an experiment with <a href='http://www.angularjs.org/'>AngularJS</a>. It converts various values (.e.g Temperatures and Heights) from metric to imperial and other scales. I've tried to make heavy use of Angular, e.g. the html (view) is built from data stored in Javascript objects (model) so the page really doesn't work unless Javascript is enabled.</p>
                      <p>It also used <a href='https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions'>CSS Transitions</a> to make simple animated elements on the page.</p>",
        "status"  => "IP" // In progress
    ),
    array (
        "name"    => "Sliding Boxes",
        "url"     => "//sandbox.treerock.me/sliding-boxes/",
        "date"    => "2013-10-01",
        "desc"    => "<p>Playing with AngularJS and CSS transitions.</p>",
        "status"  => "C" // Complete
    ),
    array (
        "name"    => "Image Loading",
        "url"     => "//sandbox.treerock.me/sb-image-loading/",
        "date"    => "2013-06-01",
        "desc"    => "<p>HTML5 included a <a href='http://www.w3.org/TR/FileAPI/'>File API</a> that provides access to local files.
                      This makes it quite easy to quickly drag and drop images into a web application and manipulate them without having to upload them to the client.</p>
                      <p>This version is a quick go at drag and drop. I'm quite keen to try manipulating the image onscreen later.</p>",
        "status"  => "IP", // In progress
        "version" => 0.1
    ),    
    array (
        "name"    => "Name",
        "url"     => "//sandbox.treerock.me/name/",
        "date"    => "2099-11-01",
        "desc"    => "<p>Blank Description of the project.</p>",
        "status"  => "NR" // Not ready
    )
);


for ($i=0; $i < count($sb_array); $i++){
    $date_month = date('M-Y',strtotime($sb_array[$i]["date"]));
    $template = "";
    if($i%3 == 0){
        $template .= "<div class='row clearfix'>";
    }
    $template .= "<div class='col col-4'>";
    $template .= "<div class='item'>";
    $template .= "<h1>".$sb_array[$i]["name"]."</h1>";
    $template .= "<time datetime='".$sb_array[$i]["date"]."'>".$date_month."</time>";
    $template .= "<div class='sb-description'>".$sb_array[$i]["desc"]."</div>";
    $template .= "</div>";
    $template .= "</div>";
    if($i+1%3 == 0 || $i == count($sb_array)-1){
        $template .= "</div><!-- row -->";
    }
    echo($template);
} 
?>
    </div><!-- .sandbox -->

    <div class="row meta section clearfix" id="info" ng-class="{'hide': ! isActive('meta')}">
        <div class="col col-6">
            <h2>About</h2>
            <p>About the sandbox</p>
        </div>
        <div class="col col-6">
            <h2>Meta</h2>
            <p>Last updated around November 2013</p>
            <h3>Log:</h3>
            <p><a href="https://github.com/treerock/sandbox">Code on Github</a></p>
        </div>
    </div>
</div><!-- .container -->