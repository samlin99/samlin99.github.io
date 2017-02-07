"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="nav-bar.html"></require><require from="bootstrap/css/bootstrap.css"></require><nav-bar router.bind="router"></nav-bar><div class="page-host"><router-view></router-view></div></template>'})}(),System.register("app.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("App",d=function(){function a(){c(this,a)}return a.prototype.configureRouter=function(a,b){a.title="Aurelia",a.map([{route:["","trip-planner"],name:"trip-planner",moduleId:"trip-planner",nav:!0,title:"Trip Planner"}]),this.router=b},a}()),a("App",d)}}}),System.register("main.js",["bootstrap"],function(a,b){"use strict";function c(a){a.use.standardConfiguration().developmentLogging().plugin("aurelia-table").plugin("aurelia-dialog"),a.start().then(function(){return a.setRoot()})}return a("configure",c),{setters:[function(a){}],execute:function(){}}}),function(){var a=System.amdDefine;a("map.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><ai-dialog><ai-dialog-body><iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${tgtLocation}&key=AIzaSyAXBonnkSHLBPO99R8hvWMzEIR6GiXWuk4" allowfullscreen></iframe></ai-dialog-body><ai-dialog-footer><button click.trigger="controller.ok(person)">Ok</button></ai-dialog-footer></ai-dialog></template>'})}(),function(){var a=System.amdDefine;a("nav-bar.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template bindable="router"><nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse"><span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#"><i class="fa fa-home"></i> <span>${router.title}</span></a></div><div class="collapse navbar-collapse" id="skeleton-navigation-navbar-collapse"><ul class="nav navbar-nav"><li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}"><a data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse.in" href.bind="row.href">${row.title}</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="loader" if.bind="router.isNavigating"><i class="fa fa-spinner fa-spin fa-2x"></i></li></ul></div></nav></template>'})}(),function(){var a=System.amdDefine;a("reminder.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./utilities"></require><ai-dialog><ai-dialog-header><h4>Reminder List</h4></ai-dialog-header><ai-dialog-body><div class="dialogDivTblBody"><table class="table table-striped" width="90%" aurelia-table="data.bind: indexAry; display-data.bind: $displayData;"><tr class="dialogReminder"><td></td><td aut-sort="key:title">Title</td><td aut-sort="key:dest">Dest</td><td>Duration<br>Day(s)</td><td>Category</td><td>Reminder<br>Set</td><td>#<br>Todos</td><td>State</td></tr><tr class="dialogReminder" repeat.for="item of $displayData"><td><input type="checkbox" class="form-group" click.trigger="addRemoveDismiss(item,$event)"></td><td>${trips[item].title}</td><td>${trips[item].dest}</td><td>${trips[item].duration}</td><td>${trips[item].category}</td><td>${trips[item].reminder | dateFormat}</td><td>${trips[item].todo.length}</td><td>${trips[item].state | stateFormat}</td></tr></table></div></ai-dialog-body><ai-dialog-footer><button click.trigger="dismiss()">Dismiss</button> <button click.trigger="controller.ok()">Snooze 5 mins</button></ai-dialog-footer></ai-dialog></template>'})}(),function(){var a=System.amdDefine;a("trip-planner.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./utilities"></require><div style="width:90%;margin-top:15px"><div class="form-group inputSearch"><input type="text" class="form-control" value.bind="filters[0].value" placeholder="Type to Search" maxlength="20"></div><div class="form-group inputSearch"><label for="eyeColor">Category</label><select class="form-control" value.bind="filters[1].value"><option></option><option repeat.for="catItem of category">${catItem}</option></select></div><div class="form-group inputSearch"><button class="btn btn-default" click.trigger="resetData()">Add New Trip</button> <button class="btn btn-default" click.trigger="startReminder(true)">Open Reminder</button></div></div><div class="divColumn" style="width:60%"><div class="divTblBody"><table class="table table-striped" width="90%" aurelia-table="data.bind: trips; display-data.bind: $displayData; filters.bind: filters;"><tr class="colWidth"><td aut-sort="key:title">Title</td><td aut-sort="key:dest">Dest</td><td>Duration<br>Day(s)</td><td aut-sort="key:category">Category</td><td aut-sort="key:reminder">Reminder</td><td>#<br>Todos</td><td>State</td><td></td><td></td></tr><tr class="colWidth" repeat.for="item of $displayData" click.trigger="selectRow(item, $index)" aut-select="row.bind: item; selected-class: info"><td>${item.title}</td><td>${item.dest}</td><td>${item.duration}</td><td>${item.category}</td><td>${item.reminder | dateFormat}</td><td>${item.todo.length}</td><td>${item.state | stateFormat}</td><td><img src="images/gmap.png" width="22" height="20" click.trigger="openMap(item.dest)"></td><td><img src="images/weather.png" width="22" height="20" click.trigger="openWeather(item.dest)"></td></tr></table></div></div><div class="divColumn" style="width:30%;margin-left:10px"><table class="table"><tr><td><label for="txtTitle">Title: *</label></td><td><input type="text" id="txtTitle" class="form-control" placeholder="Title" value.bind="trip.title" maxlength="20"></td></tr><tr><td><label for="txtDest">Destination: *</label></td><td><input type="text" id="txtDest" class="form-control" placeholder="Destination" value.bind="trip.dest" maxlength="18"></td></tr><tr><td><label for="txtDest">Category:</label></td><td><select class="form-control" value.bind="trip.category"><option repeat.for="catItem of category">${catItem}</option></select></td></tr><tr><td><label>Start Date:</label></td><td><div class="form-group"><div class="input-group date" id="txtStartDate"><input type="text" class="form-control"> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div></td></tr><tr><td><label>End Date:</label></td><td><div class="form-group"><div class="input-group date" id="txtEndDate"><input type="text" class="form-control"> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div></td></tr><tr><td><label>Todo:</label></td><td><input type="text" ref="txtTodo" class="form-control" placeholder="Type todo and press enter to add" keydown.trigger="addTodo($event)" maxlength="20"><div class="todoScroll"><ul repeat.for="item of trip.todo" class="todo"><li><input class="btn btn-default" type="checkbox" checked.bind="item.status" click.trigger="todoStatusCheck($event, item)"></li><li>${item.desc}</li><li><button class="btn btn-default" click.trigger="removeTodo($index)">Remove</button></li></ul><div></div></div></td></tr><tr><td><label>Reminder:</label></td><td><div class="input-group date" id="txtReminder"><input type="text" class="form-control"> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div><div><input type="checkbox" class="form-group" checked.bind="trip.dismiss"> Dismiss</div></td></tr><tr><td colspan="2" align="right"><button class="btn btn-default" click.trigger="save()" disabled.bind="!(trip.title && trip.dest)">Save</button> <button class="btn btn-default" click.trigger="cancel()" disabled.bind="!(trip.title && trip.dest)">Cancel</button> <button class="btn btn-default" click.trigger="deleteTrip()" disabled.bind="currentIndex == null">Delete</button></td></tr></table></div></template>'})}(),System.register("map.js",["aurelia-dialog"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g;return{setters:[function(a){d=a.DialogController}],execute:function(){a("Map",(f=e=function(){function a(b){c(this,a),this.tgtLocation="",this.controller=b,this.controller.settings.lock=!1}return a.prototype.activate=function(a){this.tgtLocation=encodeURIComponent(a)},a}(),e.inject=[d],g=f)),a("Map",g)}}}),System.register("weather.js",["aurelia-dialog","aurelia-framework"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g,h;return{setters:[function(a){d=a.DialogController},function(a){e=a.bindable}],execute:function(){a("Weather",(g=f=function(){function a(b){c(this,a),this.tgtLocation="",this.controller=b,this.controller.settings.lock=!1}return a.prototype.activate=function(a){var b=a.tgtLocation,c=a.lat,d=a.lot;this.tgtLocation=b,this.lat=c,this.lot=d},a}(),f.inject=[d],h=g)),a("Weather",h)}}}),System.register("reminder.js",["aurelia-dialog"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g;return{setters:[function(a){d=a.DialogController}],execute:function(){a("Reminder",(f=e=function(){function a(b){c(this,a),this.trips=[],this.dismissAry=[],this.controller=b,this.controller.settings.lock=!1}return a.prototype.activate=function(a){var b=a.indexAry,c=a.localTrips;this.trips=c,this.indexAry=b},a.prototype.addRemoveDismiss=function(a,b){return b.target.checked?this.dismissAry.push(a):this.dismissAry.pop(a),!0},a.prototype.dismiss=function(){var a=this;this.dismissAry.forEach(function(b){a.trips[b].dismiss=!0}),localStorage.setItem("tripPlannerData",JSON.stringify(this.trips)),this.controller.cancel()},a}(),e.inject=[d],g=f)),a("Reminder",g)}}}),System.register("trip-planner.js",["aurelia-framework","aurelia-dialog","./map","./weather","./reminder","eonasdan-bootstrap-datetimepicker","moment"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g,h,i,j,k,l,m;return{setters:[function(a){d=a.bindable},function(a){e=a.DialogService},function(a){f=a.Map},function(a){g=a.Weather},function(a){h=a.Reminder},function(a){i=a.datetimepicker},function(a){j=a["default"]}],execute:function(){a("TripPlanner",(l=k=function(){function a(b){c(this,a),this.currentIndex=null,this.trip={state:0,title:"",dest:"",category:"None",startDate:"",endDate:"",duration:0,todo:[],reminder:"",dismiss:!1},this.trips=[],this.category=["None","Business Trip","Vacation"],this.filters=[{value:"",keys:["title","dest","todo"]},{value:"",keys:["category"]}],this.snoozeCount=0,this.dialogService=b,this.geocoder=new google.maps.Geocoder;var d=localStorage.getItem("tripPlannerData");d?this.trips=JSON.parse(d):this.trips=[]}return a.prototype.attached=function(){var a={minDate:new Date,defaultDate:new Date,format:"MM/DD/YYYY",showTodayButton:!0,stepping:5};$("#txtStartDate").datetimepicker(a),$("#txtEndDate").datetimepicker($.extend(a,{useCurrent:!1})),a.format="MM/DD/YYYY hh:mm A",delete a.minDate,delete a.defaultDate,$("#txtReminder").datetimepicker($.extend(a,{useCurrent:!1})),$("#txtStartDate").on("dp.change",function(a){$("#txtEndDate").data("DateTimePicker").minDate(a.date),a.date.isBefore($("#txtEndDate").data("DateTimePicker").date())||$("#txtEndDate").data("DateTimePicker").date(a.date)}),this.startReminder(),this.startTimer(6e4)},a.prototype.detached=function(){clearInterval(intervalID)},a.prototype.startReminder=function(a){var b=this;if(!a&&this.snoozeCount>=1&&this.snoozeCount<=5)this.snoozeCount++;else{var c=this.trips,d=[],e=j();for(var f in this.trips)this.trips[f].reminder&&j(this.trips[f].reminder).isBefore(e)&&!c[f].dismiss&&d.push(f);(d.length>0&&!this.dialogService.hasActiveDialog||a)&&this.dialogService.open({viewModel:h,model:{indexAry:d,localTrips:c}}).then(function(a){a.wasCancelled||(b.snoozeCount=1)})}},a.prototype.startTimer=function(a){var b=this;this.intervalID=setInterval(function(){b.startReminder()},a)},a.prototype.addTodo=function(a){return 13==a.keyCode&&this.txtTodo.value&&(this.trip.todo.push({status:!1,desc:this.txtTodo.value}),this.txtTodo.value=""),!0},a.prototype.removeTodo=function(a){this.trip.todo=this.removeArray(this.trip.todo,a)},a.prototype.selectRow=function(a,b){this.currentIndex=b,this.trip=JSON.parse(JSON.stringify(a)),$("#txtStartDate").data("DateTimePicker").minDate(j(this.trip.startDate)),$("#txtStartDate").data("DateTimePicker").date(j(this.trip.startDate)),$("#txtEndDate").data("DateTimePicker").minDate(j(this.trip.startDate)),$("#txtEndDate").data("DateTimePicker").date(j(this.trip.endDate)),this.trip.reminder&&$("#txtReminder").data("DateTimePicker").date(j(this.trip.reminder)),this.tripTmp=a},a.prototype.cancel=function(){this.currentIndex?(this.trip=JSON.parse(JSON.stringify(this.tripTmp)),$("#txtStartDate").data("DateTimePicker").minDate(j(this.trip.startDate)),$("#txtStartDate").data("DateTimePicker").date(j(this.trip.startDate)),$("#txtEndDate").data("DateTimePicker").minDate(j(this.trip.startDate)),$("#txtEndDate").data("DateTimePicker").date(j(this.trip.endDate)),this.trip.reminder?$("#txtReminder").data("DateTimePicker").date(j(this.trip.reminder)):$("#txtReminder").data("DateTimePicker").date(null)):this.resetData()},a.prototype.getDays=function(a){var b=864e5,c=36e5,d=Math.floor(a/b),e=Math.floor((a-d*b)/c),f=Math.round((a-d*b-e*c)/6e4);return 60===f&&(e++,f=0),24===e&&(d++,e=0),d},a.prototype.save=function(){if(this.trip.startDate=$("#txtStartDate").data("DateTimePicker").date(),this.trip.endDate=$("#txtEndDate").data("DateTimePicker").date(),this.trip.reminder=$("#txtReminder").data("DateTimePicker").date(),this.trip.startDate&&this.trip.endDate&&(this.trip.duration=this.getDays(new Date(this.trip.endDate).getTime()-new Date(this.trip.startDate).getTime())),0===this.trip.todo.length)this.trip.state=0;else{var a=!0;for(var b in this.trip.todo)a&=this.trip.todo[b].status;this.trip.state=a?2:1}if(null==this.currentIndex)this.trips.push(this.trip),this.resetData();else for(var c in this.trip)this.tripTmp[c]=this.trip[c];localStorage.setItem("tripPlannerData",JSON.stringify(this.trips))},a.prototype.removeArray=function(a,b){return a.slice(0,b).concat(a.slice(b+1))},a.prototype.deleteTrip=function(){this.trips=this.removeArray(this.trips,this.currentIndex),this.resetData(),localStorage.setItem("tripPlannerData",JSON.stringify(this.trips))},a.prototype.openMap=function(a){this.dialogService.open({viewModel:f,model:a}).then(function(a){!a.wasCancelled})},a.prototype.openWeather=function(a){var b=this.dialogService;this.geocoder.geocode({address:a},function(c,d){if("OK"===d){var e=c[0].geometry.location.lat(),f=c[0].geometry.location.lng();b.open({viewModel:g,model:{tgtLocation:a,lat:e,lot:f}}).then(function(a){!a.wasCancelled})}else alert("Geocode was not successful for the following reason: "+d)})},a.prototype.resetData=function(){this.currentIndex=null,$("#txtStartDate").data("DateTimePicker").minDate(j()),$("#txtEndDate").data("DateTimePicker").minDate(j()),$("#txtStartDate").data("DateTimePicker").date(j()),$("#txtEndDate").data("DateTimePicker").date(j()),$("#txtReminder").data("DateTimePicker").date(null),$("#txtReminder").data("DateTimePicker").defaultDate(null),this.trip={state:0,title:"",dest:"",category:"None",startDate:"",endDate:"",duration:0,todo:[],reminder:"",dismiss:!1}},a.prototype.todoStatusCheck=function(a,b){return b.status=a.target.checked,!0},a}(),k.inject=[e],m=l)),a("TripPlanner",m)}}}),System.register("utilities.js",["moment"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f;return{setters:[function(a){d=a["default"]}],execute:function(){a("DateFormatValueConverter",e=function(){function a(){c(this,a)}return a.prototype.toView=function(a){return a?d(a).format("MM/DD/YYYY hh:mm A"):""},a}()),a("DateFormatValueConverter",e),a("StateFormatValueConverter",f=function(){function a(){c(this,a)}return a.prototype.toView=function(a){return 2===a?"Ready":1===a?"In Progress":"Created"},a}()),a("StateFormatValueConverter",f)}}}),function(){var a=System.amdDefine;a("weather.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><ai-dialog><ai-dialog-body><iframe id="forecast_embed" type="text/html" frameborder="0" height="200" width="100%" src="https://forecast.io/embed/#lat=${lat}&lon=${lot}&name=${tgtLocation}"></iframe></ai-dialog-body><ai-dialog-footer><button click.trigger="controller.ok(person)">Ok</button></ai-dialog-footer></ai-dialog></template>'})}();