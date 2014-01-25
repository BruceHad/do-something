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
            <div id="task-modal">
                <h2>Add Task</h2>
                <form ng-submit="addTask(taskKey)">
                    <input type="text" 
                        ng-model="taskName" 
                        placeholder="Add New Task" />
                    <div ng-class="{hidden: formHidden}">
                        <input type="text" 
                            ng-model="taskKey" 
                            placeholder="Add New Task" 
                            class="hidden" />
                        <input type="text" 
                           ng-model="startDate"
                           placeholder="mm/dd/yyyy">
                        <input type="text" 
                           ng-model="endDate"
                           placeholder="mm/dd/yyyy">
                    </div>
                    <div><input type="submit" id="submit" value="Submit" /></div>
                </form>
            </div>
        </div>
        <div class="col col-9">
            <p class="date-period">
                Period: {{dates[0].date | date:'d MMM'}} 
                to {{dates[dates.length-1].date | date:'d MMM'}} 
                <a href="#" ng-click="changeDate('prev')">Previous</a> 
                <a href="#" ng-click="changeDate('next')">Next</a>
            </p>
            <div class="day clearfix" ng-repeat="day in dates" 
                    ng-class="{weekend: isWeekend(day.date)}">
                    <div class="one">&nbsp;
                        <span ng-class="{hidden: ! isMon(day.date)}">
                            {{day.date | date: 'dd-MMM-yy'}}
                        </span>
                    </div>
                    <div class="two">
                        {{day.date | date: 'EEE'}}
                    </div>
                    <div class="three">
                        <div class="task clearfix" ng-repeat="(key,task) in day.dailyTasks" 
                            ng-class="{taskdone: isDone(key, day.date)}"> 
                            <div class="name">
                                {{task.name}} 
                                <span class="small">({{task.start_date | date: 'd MMM yy' }}&ndash;
                                {{task.end_date | date: 'd MMM yy'}})</span>
                            </div>
                            <div class="tools">
                                <a href="" ng-click="doneTask(key, day.date, true)" class="tickbox done" ng-class="{hidden: isDone(key, day.date)}" >Done</a>
                                <a href="" ng-click="doneTask(key, day.date, false)" class="tickbox not-done" ng-class="{hidden: ! isDone(key, day.date)}">Not Done</a>
                                <a href="" ng-click="editTask(key)" class="edit">Edit</a>
                                <a href="" ng-click="deleteTask(key)" class="delete">Delete</a>
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