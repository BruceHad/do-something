<div class="container heading clearfix hidden">
    <h1>Treerock</h1>
    <p class="subheading">
        Sandbox Projects
        <br />Do Something Every Day
    </p>
</div>

<div ng-controller="ProjCntr" ng-app>
    <div class="container">
        <div class="col col-3">
            <h2>Add Task</h2>
            <form ng-submit="addTask(taskKey)">
                <input type="text" value="" ng-model="newName" placeholder="Add New Task" />
                <div ng-class="{hidden: taskIsHidden()}" class="hidden">
                    <input type="text" 
                        value="" 
                        ng-model="taskKey" 
                        placeholder="Add New Task" 
                        class="hidden" />
                    <input type="text" 
                       ng-model="startDateString"
                       placeholder="yyyy-MM-dd">
                    <!-- <input type="date" 
                       ng-model="endDateString" 
                       value="{{ date | date: 'yyyy-MM-dd' }}" 
                       placeholder="yyyy-MM-dd"> -->
                </div>
                <input type="submit" id="submit" value="Submit" />
            </form>
            <h2>Points</h2>
            <div>
                <p>{{points}} points</p>
            </div>
            <h2>Save Setup</h2>
            <div>
                <form ng-submit="save()">
                    <textarea class="hidde">{{saveStr}}</textarea>
                    <input type="submit" id="save" value="Save" />
                </form>
            </div>
            <div>
                <form ng-submit="load()">
                    <textarea class="hidde" ng-model="loadStr"></textarea>
                    <input type="submit" id="load" value="Load" />
                </form>
            </div>
        </div>
        <div class="col col-9">
            
            <div class="days ng-cloak container clearfix" >   
                <p class="date-period">
                    Period: {{dates[0].date | date:'d MMM'}} 
                    to {{dates[dates.length-1].date | date:'d MMM'}} 
                    <a href="#" ng-click="changeDate('prev')">Previous</a> 
                    <a href="#" ng-click="changeDate('next')">Next</a>
                </p>
                <div class="day clearfix" ng-repeat="day in dates" 
                    ng-class="{weekend: day.ddd=='Sat' || day.ddd=='Sun'}">
                    <div class="one">
                        &nbsp;
                    </div>
                    <div class="two">{{day.date | date: 'd MMM'}}</div>
                    <div class="three">
                        <div class="task clearfix" ng-repeat="(key,task) in day.dailyTasks" 
                            ng-class="{done: isDone(key, day.timestamp)}"> 
                            <div class="name">
                                {{task.name}}, {{task.start_date | date: 'd MMM' }}, 
                                {{task.end_date | date: 'd MMM'}}
                            </div>
                            <div class="tools">
                                <a href="" ng-click="done(key, day.timestamp, true)" class="tickbox" ng-class="{hidden: isDone(key, day.timestamp)}" >Done</a>
                                <a href="" ng-click="done(key, day.timestamp, false)" class="tickbox" ng-class="{hidden: ! isDone(key, day.timestamp)}">Not Done</a>
                                <a href="" ng-click="edit(key)" class="edit">Edit</a>
                                <a href="" ng-click="delete(key)" class="delete">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container hidden">
        <h2>Colophon</h2>
        <ul>
            <li><a href="http://adamwhitcroft.com/batch/">Batch Icons</a></li>
            <li><a href="http://www.webtoolkit.info/">Base64 encode/decode script</a></li>
            <li><a href="http://www.angularjs.org/">AngularJS Framework</a></li>
        </ul>
    </div>
</div>