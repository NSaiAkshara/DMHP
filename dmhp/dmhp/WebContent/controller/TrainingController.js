app.directive('ngFiles', ['$parse', function ($parse) {

                function fn_link(scope, element, attrs) {
                    var onChange = $parse(attrs.ngFiles);
                    alert("coming to here1");
                    element.on('change', function (event) {
                        onChange(scope, { $files: event.target.files });
                    });
                };

                return {
                    link: fn_link
                }
            } ])


app.controller("MainT", function($scope, $rootScope, $http, $location, $window,$filter) {
	
	////alert("baaann");
   ////alert("hospital id mamama "+ sessionStorage.hospitalID);
	
	$scope.event_status =0;
	$scope.loginpage = function ()
	{
		$location.path('/login');
	}
    $rootScope.doctorName = sessionStorage.Admname;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $rootScope.login_not_submitted = 1;
    
    $scope.training_records = "";

    $scope.disabledemo = "true";
    $scope.disablereport = "true";
    
    $rootScope.urlName = 'http://localhost:8080/';
    $rootScope.projectName = 'dmhp';
    
    
    //initialise training variables
    
    $scope.no_of_events_array = [] 
    $scope.specify_others_array = []
    $scope.event_from_array = []
    $scope.event_to_array = []
    $scope.target_group_array = []
    $scope.no_of_patients_array = []
    $scope.facility_name_array = []
    $scope.report_array = []
    
	
    //populating month names and year 
    
    $scope.form_ReportingYear = sessionStorage.ReportingYear;
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }
    $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
    $scope.yearCount = function() {
        var input = [];
        for (i = sessionStorage.ReportingYear; i > 1973; i--) {
            input.push(i);
        }
        return input;
    }
  
    $scope.changeEvent = function() {
    	
    	if($scope.Training_Name_event=="Training"){
    	    
    		$scope.eventActForSpecifyOtherevent = "true";
    		$scope.eventActForEvent_fromDate = false;
    		$scope.eventActForEvent_ToDate = false;
    		$scope.eventActForTargetgroup = false;
    	    $scope.eventActForNoOfParticipants = false;
    		$scope.eventActForNameOf_Facility = false;
    		$scope.eventActForBriefReport = false;
    		$scope.eventActForResourcesUsed = false;
    		$scope.eventActForTeamMembers = false;
			
    	}else if($scope.Training_Name_event=="Targetted intervention"){
    		
    		$scope.eventActForSpecifyOtherevent = "true";
    		$scope.eventActForEvent_fromDate = false;
    		$scope.eventActForEvent_ToDate = false;
    		$scope.eventActForTargetgroup = false;
    		$scope.eventActForNoOfParticipants = false;
    		$scope.eventActForNameOf_Facility = false;
    		$scope.eventActForBriefReport = false;
    		$scope.eventActForResourcesUsed = false;
    		$scope.eventActForTeamMembers = false;
    		
    	}else if($scope.Training_Name_event=="Inspection of facilitites"){
    		
    		$scope.eventActForSpecifyOtherevent = "true";
    		$scope.eventActForEvent_fromDate = false;
    		$scope.eventActForEvent_ToDate = false;
    		$scope.eventActForTargetgroup = "true";
    		$scope.eventActForNoOfParticipants = "true";
    		$scope.eventActForNameOf_Facility = false;
    		$scope.eventActForBriefReport = false;
    		$scope.eventActForResourcesUsed = "true";
    		$scope.eventActForTeamMembers = false;
    		
    	}else if($scope.Training_Name_event=="IEC Activities"){
    		
    		$scope.eventActForSpecifyOtherevent = "true";
    		$scope.eventActForEvent_fromDate = false;
    		$scope.eventActForEvent_ToDate = false;
    		$scope.eventActForTargetgroup = false;
    		$scope.eventActForNoOfParticipants = false;
    		$scope.eventActForNameOf_Facility = false;
    		$scope.eventActForBriefReport = false;
    		$scope.eventActForResourcesUsed = false;
    		$scope.eventActForTeamMembers = false;
    		
    	}else if($scope.Training_Name_event=="Specify Other"){
    		
    	    $scope.eventActForSpecifyOtherevent = false;
    		$scope.eventActForEvent_fromDate = false;
    		$scope.eventActForEvent_ToDate = false;
    		$scope.eventActForTargetgroup = false;
    		$scope.eventActForNoOfParticipants = false;
    		$scope.eventActForNameOf_Facility = false;
    		$scope.eventActForBriefReport = false;
    		$scope.eventActForResourcesUsed =false;
    		$scope.eventActForTeamMembers = false;
    	}
    	 
    }
    
    $scope.changemonth = function(month){
    	
//    	//alert("Month is "+ month);
//    	//alert("blah "+ $scope.form_ReportingMonth);
//    	//alert("year blah "+ $scope.form_ReportingYear);
    	var month_number = monthNumber[$scope.form_ReportingMonth];
    	var date = $scope.form_ReportingYear + "-" + month_number + "-01";
    	$scope.training_records = "";
    	 	////alert("Date is "+ date);
    	
    	//make a http request to get all events held in the selected month and the year, and 
    	//display them in reverse chronological order
    	//by default show the events of the current month and the year
    	
    	////alert("142-1");
    	$http({
    		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training?date="+ date,
    		method: "GET",
    		dataType: "json",
    	}).then(function(response){
    		if(response != null && response.status != 204){
//    			//alert("Proper response");
    			var object = angular.fromJson(response.data);
    			$scope.training_records = object;
//    			//alert("typeof " + typeof $scope.training_records);
    		}
    	}, function errorCallback(response){
    		console.log("error in response");
    	});
    	
    }
    
    angular.element(document).ready(function() {

    	$scope.event_status = 0;
    	$scope.train_event_id = 0;
    	$rootScope.doctorName = sessionStorage.Admname;
		$rootScope.doctorType1 = sessionStorage.FacilityType;
    	$rootScope.login_not_submitted = 1;
    	$scope.form_ReportingMonth = sessionStorage.ReportingMonth;
    	var month_number = monthNumber[$scope.form_ReportingMonth];
    	var date = $scope.form_ReportingYear + "-" + month_number + "-01";
    	////alert("170-2"+date);
    	$http({
    		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/"+ sessionStorage.hospitalID + "/training?date=" + date,
    		method: "GET",
    		dataType: "json",
    			
    	}).then(function(response){
    		if(response != null && response.status != 204){
//    			//alert("proper response");
    		
    			$scope.training_records = angular.fromJson(response.data);
//    			//alert(object);
    		
//    			var index = 0; 
//    			angular.forEach(object, function(value, key){
//    				$scope.no_of_events_array[index] = value.no_of_events;
//    				$scope.event_from_array[index] = value.event_from;
//    				$scope.event_to_array[index] = value.event_to;
//    				index+=1;
//    			});
    		}else{
    			console.log("Empty response");
    		}
    		
    	}, function errorCallBack(response){
    		console.log("error response in training module");
    	});
    	
    
    });
    
    $scope.Training_Event_fromDate="";
    var no_of_events = $scope.Training_Name_event;
    var specify_others = $scope.Training_SpecifyOtherevent;
    var event_from = $scope.Training_Event_fromDate;
   // var event_from;
     // //alert("from date " + event_from);
    var event_to = $scope.Training_Event_ToDate;
   // var event_to;
     // //alert("to date " + event_to);
    var target_group = $scope.Training_Targetgroup;
    var no_of_patients = $scope.Training_NoOfParticipants;
    var name_of_facility = $scope.Training_NameOf_Facility;
    var report = $scope.Training_BriefReport;
    var resources_used = $scope.Training_ResourcesUsed;
    var team_members = $scope.Training_TeamMembers;
   // var Training_Event_Img1 = $scope.training_Event_Img;
  //  $scope.Training_Event_Img1 = {};
    //latest fields
    
    var hospital_id =  sessionStorage.hospitalID;
    var date = new Date($scope.reportTimeStamp).getDate();
    var tomonth=new Date($scope.reportTimeStamp).getMonth()+1;
    var toyear=new Date($scope.reportTimeStamp).getFullYear();
    var original_date=date+'-'+tomonth+'-'+toyear;
    $scope.form_submit_date_time=original_date;

   // //alert("coming to here"+$scope.reportTimeStamp); 
   $scope.submitDisabled = false;
   
 
   var formdata = new FormData();
   $scope.getTheFiles = function ($files) {
       angular.forEach($files, function (value, key) {
    	   alert("coming to here12");
    	  
    	   console.log($files[0].type);
    	   
    	   console.log(key + ' ' + value.name);
           formdata.append(key, value);
           $scope.formdata1=formdata;
       });
   };
   alert("before selection  "+formdata);
   
   
    $scope.formSubmit1 = function() {
    	 console.log($scope.formdata1);
    	alert("after selection  "+$scope.formdata1);
    	
    	document.getElementById('imageform').submit();
    	
    	//console.log(formdata);
    	   // var fd = new FormData();
    	  //  var files = document.getElementById('file1').files[0];
    	 //console.log(files);
        //fd.append('file1',files);
       // $scope.uploadImg1=fd;
    	   
    	
        
        
        
        var todate = $scope.Training_Event_ToDate.toString();
       
        
        date = $scope.Training_Event_fromDate;
        
   		year = date.getFullYear();
   	
   		var month = date.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		
		var day = date.getDate();
		
		if(day < 10){
			day = "0" + day;
		}
		
		var dateString =  year + "-" + month + "-" + day;
		
		////alert("_____from-Date___12_"+dateString);
        
        date = $scope.Training_Event_ToDate;
        
   		year = date.getFullYear();
   	
   		var month1 = date.getMonth() + 1;
		if(month < 10){
			month1 = "0" + month1;
		}
		
		var day1 = date.getDate();
		
		if(day1 < 10){
			day1 = "0" + day1;
		}
		
		var dateString1 =  year + "-" + month1 + "-" + day1;
		
		
		
		
        var Indata1 = {
        		no_of_events : $scope.Training_Name_event,
        		specify_others : $scope.Training_SpecifyOtherevent,
        		event_from : dateString,
        		event_to : dateString1,
        		target_group : $scope.Training_Targetgroup,
        		no_of_patients : $scope.Training_NoOfParticipants,
        		name_of_facility : $scope.Training_NameOf_Facility,
        		report : $scope.Training_BriefReport,
        		team_members : $scope.Training_TeamMembers,
        		resources_used : $scope.Training_ResourcesUsed,
        		//new fields;
        		hospital_id :  sessionStorage.hospitalID,
        	    training_timestamp : $scope.form_submit_date_time,
        	  //  training_Event_Img1 : null,
        	   // event_from1:$scope.Training_Event_fromDate,
        	    
        };
        
        var myJSON1 = JSON.stringify(Indata1);
        
        
    //alert("JsonData  "+ myJSON1);
        //console.log("Data--  "+ myJSON1);
        //event_status = 0 means adding new event
        //event_status = 1 means viewing the event, editing disabled
        //event_status = 2 means editing a already existing event
        var confirm_flag = 0;
        if ($scope.event_status == 0){
        	var r = confirm("Are you sure, you want to create a new event??");
        	if ( r == true){
        		confirm_flag = 1;
        	}
        	//location.reload();
        }else if ($scope.event_status == 2){
        	var r = confirm("Are you sure, you want to update this event??");
        	if (r == true){
        		confirm_flag = 1;
        	}
        	location.reload();
        }
        
        
        
        if($scope.event_status == 0 && confirm_flag == 1){
      	
        	$http({
        		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training",
        		method: "POST",
        		data: myJSON1,
        		dataType: "json",
        	}).then(function(response) {
        		if (response != null && response.status != 204) {     	
        			$scope.form_submitted = true;
        			$scope.form_not_submitted=false;	
        			$http({
        	    		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/"+ sessionStorage.hospitalID + "/training/max_train_id",
        	    		method: "GET",
        	    		dataType: "json",
        	    			
        	    	}).then(function(response){
        	    		
        	    		$scope.training_id = response.data;
        	    		var url=$rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training/postimg";
        	    		alert(url);
        	    		 var request = {
        	                     method: 'POST',
        	                     url: url,
        	                     data: $scope.formdata1,
        	                     headers: {
        	                         'Content-Type': undefined
        	                     }
        	                 };
        	    		 
        	    		 $http(request)
        	                .success(function (d) {
        	                    alert(d);
        	                })
        	                .error(function () {
        	                });
        	    		 
        	    		
//        	    		$http({
//        	        		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training/postimg",
//        	        		method: "POST",
//        	        		data:formdata,
//        	        		dataType: "MULTIPART_FORM_DATA",
//        	        		transformRequest: angular.identity,
//        	        		headers: { 'Content-Type': undefined }, 
//        	        	}).then(function(response) {
//        	        		
//        	        		alert("image uploaded");
//        	        	
//        	        	},function errorCallback(response) {
//        	        		console.log("in the errorCallBack");
//        	        		$scope.form_submitted = false;
//        	        		$scope.form_not_submitted=true;
//        	        	});
        	    		
        	    		
        	    		
        	    		   	    		
        	    		// var training_Event_Img1;
        	    	}, function errorCallback(response) {
        	        		console.log("in the errorCallBack");
        	        		$scope.form_submitted = false;
        	        		$scope.form_not_submitted=true;
        	        	});		
        			
                }else{
        			$scope.submitDisabled = false;
        			$scope.form_submitted = false;
        			$scope.form_not_submitted = true;
        			
            	}
        		
        	}, function errorCallback(response) {
        		
        		$scope.form_submitted = false;
        		$scope.form_not_submitted = true;
        	});
        	
       }else if($scope.event_status == 2 && confirm_flag == 1){
    	   $http({
    		   url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training/" + $scope.train_event_id,
    		   method: "PUT",
    		   data: myJSON1,
    		   contentType: "application/json",
    		   dataType: "json",
    		   
    	   }).then(function(response){
    		   ////alert("hurrah");
    		   if(response != null && response.status != 204){
    			   
    			   
    		   }else{

    		   }
    		
    		   location.reload();
    		   
    	   }, function errorCallBack(response){
//    		   $scope.form_submitted = false;
//          	   $scope.form_not_submitted=true;
//       //
    		//   //alert("incorrect response");
    	   });
       }
    }
    //end submitfunction
    
    //here is the functionality for view and edit a selected event
    //when view button is clicked then the details ocd  the event will be populated in the 
    //corresponding cells
    //similarly the edit will be implemented , the difference being that when view is clicked the 
    //all fields be disabled for editing, while the reverse will happen when edit is clicked
    
    //for view and edit button
    
    
   
    $scope.view_edit_click = function(event_id, event){
//    	//alert("before "+ $scope.event_status);
    	$scope.event_status = event.target.id;
    	for(var key in $scope.training_records){
    		if($scope.training_records[key].training_id == event_id){
    			break;
    		}
    	}
    	
    	
         ////alert("after " + $scope.event_status);
    	//got the key 
    	
    	
    	$scope.Training_Name_event= $scope.training_records[key].no_of_events;
		$scope.Training_SpecifyOtherevent=$scope.training_records[key].specify_others;
		$scope.Training_Event_fromDate=new Date($scope.training_records[key].event_from);
		$scope.Training_Event_ToDate=new Date($scope.training_records[key].event_to);
		
		////alert($scope.Training_Event_ToDate);
		$scope.Training_Targetgroup=$scope.training_records[key].target_group;
		$scope.Training_NoOfParticipants=$scope.training_records[key].no_of_patients;
		$scope.Training_NameOf_Facility=$scope.training_records[key].name_of_facility;
		$scope.Training_BriefReport=$scope.training_records[key].report;
		$scope.train_event_id = event_id ;
		$scope.Training_TeamMembers = $scope.training_records[key].team_members;
		$scope.Training_ResourcesUsed = $scope.training_records[key].resources_used;
		
		$scope.changeEvent();
    	////alert($scope.eventActForNameOf_Facility);
    }
    
    
    $scope.delete_click = function(event_id, event){
    	//make a delete request
    	//create a dialog box 
    	//if clicked yes then reload the page and show the refreshed list , 
    	//otherwise do nothing
//    	//alert("in js event id " + event_id);
    	$scope.train_event_id = event_id;
        var r = confirm("Are you sure, you want to delete??");
        if (r== true){
        	//reload the page and 
        	//make delete request
        	location.reload();
        	$http({
        		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training/" + $scope.train_event_id,
        		method: "DELETE",
        		dataType: "json",
        	}).then(function(response){
        		//alert("successfully deleted the event :)");
        		location.reload();
        	}, function errorCallBack(response){
        		alert("could not delete the event :(");
        	});
        	
        }
    	
    	
    }
    
});