var app = angular.module("MainModule", ["ngRoute",'ngSanitize', 'ngCsv']);

app.factory('Excel',function($window){
	var uri='data:application/vnd.ms-excel;base64,',
		template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
		format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	return {
		tableToExcel:function(tableId,worksheetName){
			var table=$(tableId),
				ctx={worksheet:worksheetName,table:table.html()},
				href=uri+base64(format(template,ctx));
			return href;
		}
	};
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/login", {
        templateUrl: "view/templates/login.html",
        controller: "MainController"
    }).when("/reportForms_new", {
        templateUrl: "view/templates/reportForms_new.html",
        controller: "Main"
    }).when("/trainingForms",{
    	templateUrl: "view/templates/trainingForms.html",
    	controller: "MainT"
    }).when("/cumulative", {
        templateUrl: "view/templates/cumulative.html",
        controller: "cumulativecontroller"
    }).when("/logout", {
        templateUrl: "view/templates/login.html",
        controller: "logoutController"
        	
    }).when("/stateReport",{
    	templateUrl: "view/templates/adminDashBoard.html",
    	controller: "stateadmincontroller"
    }).when("/stateReport1",{
    	templateUrl: "view/templates/dhcadminDashBoard.html",
    	controller: "dhcadmincontroller"
    }).when("/dashboard",{
    	templateUrl: "view/templates/dashboard.html",
    	controller: "Main"
	}).when("/dhcBudgetReport1",{
    	templateUrl: "view/templates/dhcBudgetReport.html",
    	controller: "BudgetController"
	}).when("/stateBudgetReport",{
    	templateUrl: "view/templates/stateBudgetReport.html",
    	controller: "stateBudgetController"
	}).when("/dhcBudgetdashboard",{
    	templateUrl: "view/templates/dhcBudgetDashboard.html",
    	controller: "BudgetController"
	}).when("/stateBudgetDashboardr",{
    	templateUrl: "view/templates/stateBudgetDashboard.html",
    	controller: "BudgetDashboardController"
	}).when("/dhcHrModule",{
    	templateUrl: "view/templates/dhcHr_Report.html",
    	controller: "HrController"
	}).when("/dhcHr_Report_edit",{
    	templateUrl: "view/templates/dhcHr_Report_edit.html",
    	controller: "HrReportEditController"
	}).when("/submittedHrData",{
    	templateUrl: "view/templates/dhcHr_ViewData.html",
    	controller: "HrViewController"
	}).when("/EditHrData",{
    	templateUrl: "view/templates/dhcHr_Report_edit.html",
    	controller: "HrReportEditController"
	}).when("/dashboard_state",{
		  templateUrl: "view/templates/state_budget_dashboard.html",
	       controller:"StateDashboard_s"
	}).otherwise({
        redirectTo: '/login'
    });
    //$locationProvider.html5Mode(true);HrViewController
});

app.controller("MainController", function($scope, $rootScope, $http, $location, $window) {
    //code seetings
    $rootScope.urlName = 'http://localhost:8080/';
    $rootScope.projectName = 'dmhp';
    
    $scope.$on('$locationChangeStart', function(event, next, current){
        if((sessionStorage.hospitalID==undefined) && (sessionStorage.stateID == undefined))
        	{
        	console.log("current");
        	event.preventDefault();            
        	}
    });
   
    
    $rootScope.login_not_submitted=0;
   // $rootScope.doctorname = sessionStorage.NameOfPharmacist;
   // $rootScope.doctorName = sessionStorage.Admname;
    
    $scope.loginSubmit = function() {
        //get function called here for reportformat1
        var Indata = {
            emailID: $scope.emailID,
            password: $scope.password
        };
        var myJSON = JSON.stringify(Indata);
        console.log(" MyJSON " + myJSON);
        
        if(($scope.emailID === "state_user@gmail.com" || $scope.emailID === "maharashtra@gmail.com") && ($scope.password === "state" || $scope.password === "Maharashtra")){
        	$http({
        		url: $rootScope.urlName + $rootScope.projectName + "/api/state_admin",
        		method: "POST",
        		data: myJSON,
        		contentType: "application/json",
        		dataType: "json",
        			
        	}).then(function(response){
        		
        		console.log(" Response got sdnksdnks" + response.data);
        		if(response !=null && response.status!=204 && response.status!=500){
        			var obj = angular.fromJson(response.data);
        			console.log("sdnkankdn" + obj.state_name +" " + obj.state_id);
        			sessionStorage.stateName = obj.state_name;
        			sessionStorage.FacilityType='shc';
        			//alert(sessionStorage.FacilityType);
        			sessionStorage.stateID = obj.state_id;
        			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var datestring = obj.currentDateTime;
                  //  var month = monthNames[parseInt(datestring.split("-")[1]) - 2];
                    if(datestring.split("-")[1] =="01"){
                        var month =monthNames[parseInt(datestring.split("-")[1]) + 10]; 
                        var year = parseInt(datestring.split("-")[2]) - 1;
                        
                      }else{
                    	  var month =monthNames[parseInt(datestring.split("-")[1]) - 1]; 
                    	  var year = parseInt(datestring.split("-")[2]); 
                      }
                    
                   
                  //  var year = parseInt(datestring.split("-")[2]);
                    sessionStorage.ReportingMonth = month;
                    sessionStorage.ReportingYear = year;
                    sessionStorage.ReportingDate = obj.currentDateTime;
                    
                   // alert(sessionStorage.ReportingDate);
        			$location.path("/stateReport");
                    console.log("sent ok");
                    $rootScope.login_not_submitted=0;
//                    //////alert("jj "+$scope.login_not_submitted);
        		}else{
        			$rootScope.login_not_submitted =-1;
        		}
        		
        	},
        	function errorCallback(response) {
        		console.log(" Error response " + response);
        		
        		console.log(response==null);
                $rootScope.login_not_submitted=-1;
            });
        	
        }else {
			
			$http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/doctors",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	
        	console.log(response)
        	//////alert("inside");
            if (response != null && response.status!=204 && response.status!=500) {
             
                
                var obj = angular.fromJson(response.data);
                console.log("heheheeh "+obj);
                sessionStorage.districtName = obj.districtName;
                sessionStorage.hospitalID = obj.hospital_id;
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var datestring = obj.currentDateTime;
                //var month = monthNames[parseInt(datestring.split("-")[1]) - 2];
                var month =monthNames[parseInt(datestring.split("-")[1]) + 10];
                 //alert("thags  "+month);
                // alert(month);
              if(datestring.split("-")[1] =="01"){
                var month =monthNames[parseInt(datestring.split("-")[1]) + 10]; 
                var year = parseInt(datestring.split("-")[2]) - 1;
                
              }else{
            	  var month =monthNames[parseInt(datestring.split("-")[1]) - 1]; 
            	  var year = parseInt(datestring.split("-")[2]); 
              }
               //alert(year);
                 sessionStorage.ReportingMonth = month;
                
                sessionStorage.ReportingYear = year;
                sessionStorage.ReportingDate = obj.currentDateTime;
                //alert("hello"+sessionStorage.ReportingDate);
                sessionStorage.FacilityType = obj.hospitalType;
                //sessionStorage.District = obj.name;
                sessionStorage.hospitalName = obj.hospitalName;
                sessionStorage.Admname = obj.doctor.first_name + obj.doctor.middle_name + obj.doctor.lasr_name;
                sessionStorage.NameOfPharmacist = obj.submittedby;
               
               // $location.path('/reportForms_new');
                ////////alert(sessionStorage.FacilityType);
			   if(sessionStorage.FacilityType=="dhc"){
				   
				   $location.path("/stateReport1");
				   
			   }else{
				   
				   $location.path('/reportForms_new');
			   }
			   
			   
                console.log("doctor sent ok");
                $rootScope.login_not_submitted=1;
              
            }
            else
            	{
            	$rootScope.login_not_submitted=-1;
            	}
        	
        }, function errorCallback(response) {
            console.log(response);
            $rootScope.login_not_submitted=-1;
            
        });
        
			
		}
        //console.log($scope.form1_hospitalName+"   "+$scope.hospitalType);
    }
    var root = $rootScope;
    $rootScope.logout = function() {
        $window.sessionStorage.clear();
        console.log("default");
        $window.location.reload();
        $location.path('/logout');
    }
	
});
app.controller("logoutController", function($scope, $rootScope, $http, $location, $window) {
	
	console.log("I am at logout");

	$window.location.reload();
	$location.path('/login');

	

});

