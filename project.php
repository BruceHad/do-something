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
                    <input type="text" value="" ng-model="taskKey" placeholder="Add New Task" class="hidden" />
                    <input type="text" value="" ng-model="newStartDate" placeholder="Change Start Date" />
                    <input type="text" value="" ng-model="newEndDate" placeholder="Change End Date" />
                </div>
                <input type="submit" id="submit" value="Submit" />
            </form>
            <h2>Select Date Range</h2>
            <h2>Points</h2>
            <div>
                <p>{{points}} points</p>
            </div>
            <h2>Save Setup</h2>
            <div>
                
                <textarea class="hidde">{{saveStr}}</textarea>
                <p><a href="" ng-click="save()">Save</a> | <a href="" ng-click="load(saveStr)">Load</a></p>
            </div>
        </div>
        <div class="col col-9">
            <div class="days ng-cloak container clearfix" >
                
                <div class="day clearfix" ng-repeat="day in dates">
                    <div class="one"><span>{{dates[0].date}}</span></div>
                    <div class="two">{{day.ddd}}</div>
                    <div class="three">
                        <div class="task clearfix" ng-repeat="(key,task) in tasks" ng-class="{done: isDone(key, day)}"> 
                            <div class="name">
                                {{task.name}}
                            </div>
                            <div class="tools">
                                <a href="" ng-click="done(key, day, true)" class="done">Done</a>
                                <a href="" ng-click="edit(key)" class="edit">Edit</a>
                                <a href="" ng-click="delete(key)" class="delete">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>