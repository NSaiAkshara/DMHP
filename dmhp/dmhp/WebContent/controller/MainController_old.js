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
	}).otherwise({
        redirectTo: '/login'
    });
    //$locationProvider.html5Mode(true);
});



app.controller("MainController", function($scope, $rootScope, $http, $location, $window) {
    //code seetings
    $rootScope.urlName = 'http://localhost:8080/';
    $rootScope.projectName = 'dmhpUP';
    
    $scope.$on('$locationChangeStart', function(event, next, current){
        if((sessionStorage.hospitalID==undefined) && (sessionStorage.stateID == undefined))
        	{
        	console.log("current");
        	event.preventDefault();            
        	}
    });
   
    
    $rootScope.login_not_submitted=0;
    
    $scope.loginSubmit = function() {
        //get function called here for reportformat1
        var Indata = {
            emailID: $scope.emailID,
            password: $scope.password
        };
        var myJSON = JSON.stringify(Indata);
        console.log(" MyJSON " + myJSON);
        
        if($scope.emailID === "state_user@gmail.com" && $scope.password === "state"){
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
        			sessionStorage.stateID = obj.state_id;
        			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var datestring = obj.currentDateTime;
                    var month = monthNames[parseInt(datestring.split("-")[1]) - 2];
                    var year = parseInt(datestring.split("-")[2]);
                    sessionStorage.ReportingMonth = month;
                    sessionStorage.ReportingYear = year;
                    sessionStorage.ReportingDate = obj.currentDateTime;
                    
                    
        			$location.path("/stateReport");
                    console.log("sent ok");
                    $rootScope.login_not_submitted=0;
//                    alert("jj "+$scope.login_not_submitted);
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
        	
            if (response != null && response.status!=204 && response.status!=500) {
                console.log(" response is success");
                
                var obj = angular.fromJson(response.data);
                console.log(obj);
                sessionStorage.districtName = obj.districtName;
                sessionStorage.hospitalID = obj.hospital_id;
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var datestring = obj.currentDateTime;
                var month = monthNames[parseInt(datestring.split("-")[1]) - 2];
                var year = parseInt(datestring.split("-")[2]);
                sessionStorage.ReportingMonth = month;
                sessionStorage.ReportingYear = year;
                sessionStorage.ReportingDate = obj.currentDateTime;
                sessionStorage.FacilityType = obj.hospitalType;
                //sessionStorage.District = obj.name;
                sessionStorage.hospitalName = obj.hospitalName;
                sessionStorage.Admname = obj.doctor.first_name + obj.doctor.middle_name + obj.doctor.lasr_name;
                sessionStorage.NameOfPharmacist = obj.submittedby;
                
               // $location.path('/reportForms_new');
                //alert(sessionStorage.FacilityType);
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

app.controller("Main", function($scope, $http, $rootScope) {
	
	
	$scope.loginpage = function ()
	{
		console.log("I am at main")
		$location.path('/login');
	}
	
	
	
    $scope.form_District = sessionStorage.districtName;
    $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
    $scope.form_ReportingDate = sessionStorage.ReportingDate;
    $scope.form_ReportingYear = sessionStorage.ReportingYear
    $scope.form_FacilityType = sessionStorage.FacilityType;
//    alert("faci" + sessionStorage.FacilityType);
    // $scope.form_District = sessionStorage.District ;
    $scope.form_hospitalName = sessionStorage.hospitalName;
    $scope.form_Admname = sessionStorage.Admname;
    $scope.form_NameOfPharmacist = sessionStorage.NameOfPharmacist;
    
    $rootScope.doctorname = sessionStorage.NameOfPharmacist;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $rootScope.login_not_submitted = 1;
    
    // alert("rlogin "+ $rootScope.login_not_submitted);
    
   // alert("here loading"+$rootScope.doctorType1);
    if($rootScope.doctorType1=="dlp"){///thclistfordlp
    	$scope.form_thclist = 'select';
    	$scope.hospitalName_array = [];
    	$scope.hospitalId_array=[];
    	 $http({
             url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType ,
             method: "GET",
             dataType: "json",
         }).then(function(response) {
        	 
        	 var obj = angular.fromJson(response.data);
        	 var index = +0;
        	 var inp=[];
             angular.forEach(obj, function(value, key) {     
          	     var hospitalName = value.hospitalName; 
          	     var hospitalId = value.hospital_id;
            $scope.hospitalName_array[key]=hospitalName+'_'+hospitalId;    
			index = index + 1;
			});
        	 
         }, function errorCallback(response) {
        	 
        	 alert("login again");
        	 
         });
    	 
    	 
    }else{
    	
    }
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(mm<10){
        mm='0'+mm;
    } 
    var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
//    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(sessionStorage.ReportingYear == yyyy){
    	
        var inp=[];
        var j=0;
      //  alert(mm);
      	for(j=0;j<mm;j++){
       		inp.push(Names[j]);
       	}
    //   alert(inp);

       $scope.monthNames = inp;
    }
    	if(sessionStorage<yyyy)
    		{
    			$scope.monthNames = Names;
    		}
       
    
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
        for (i = sessionStorage.ReportingYear; i > 2015; i--) {
            input.push(i);
        }
        return input;
    }
    
    
    
    
    $scope.changemonth = function(month) {
    	//alert(month);
        console.log("enter monthchange:" + month);
    	$scope.form_submitted=false;
    	$scope.form_not_submitted=false;
        $scope.form_submit_date_time="";
        
        var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
       	
        
        $scope.monthNames = Names;
              
        //change month
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
        

        if(year == yyyy){
            var inp=[];
            var j=0;
        //    alert(mm);
          	for(j=0;j<mm;j++){
           		inp.push(Names[j]);
           	}
          // alert(inp);

           $scope.monthNames = inp;
        }
        	if(year<yyyy)
        		{
        			$scope.monthNames = Names;
        		}
        
        
     
        	
        	
        	
        	
        	
        
        
        console.log($rootScope.urlName + $rootScope.projectName);
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&self=true" + "&month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
        	//alert("heresdx"+$scope.disablereport);
			//alert("sessionStorage.FacilityType"+sessionStorage.FacilityType);
            console.log($scope.disablereport);
         //   $rootScope.doctorName = sessionStorage.Admname;
            console.log("doctor name" + $scope.form_Admname);
            if (response.status == 204) {
            	//alert("we r here");
                console.log("No resposne");
           //     $scope.form_NameOfPharmacist = "";
                console.log(response);
                $scope.disablereport = false;
                $scope.submitDisabled = false;
                console.log("disable report" + $scope.disablereport + " report status 204");
                console.log($rootScope.mydata);
                $scope.form_SDM_Old_Male = "";
                $scope.form_SDM_Old_Female = "";
                $scope.form_SDM_New_Male = "";
                $scope.form_SDM_New_Female = "";
                $scope.form_CMD_Old_Male = "";
                $scope.form_CMD_Old_Female = "";
                $scope.form_CMD_New_Male = "";
                $scope.form_CMD_New_Female = "";
                $scope.form_A_D_Old_Male = "";
                $scope.form_A_D_Old_Female = "";
                $scope.form_A_D_New_Male = "";
                $scope.form_A_D_New_Female = "";
                $scope.form_HC_Old_Male = "";
                $scope.form_HC_Old_Female = "";
                $scope.form_HC_New_Male = "";
                $scope.form_HC_New_Female = "";
                $scope.form_PsyDis_Old_Male = "";
                $scope.form_PsyDis_Old_Female = "";
                $scope.form_PsyDis_New_Male = "";
                $scope.form_PsyDis_New_Female = "";
                $scope.form_Sucide_Old_Male = "";
                $scope.form_Sucide_Old_Female = "";
                $scope.form_Sucide_New_Male = "";
                $scope.form_Sucide_New_Female = "";
                $scope.form_Remarks="";
                $scope.form_submit_date_time="";
                
                //new other fields
                
                $scope.form_other1_New_Male="";
                $scope.form_other1_New_Female="";
                $scope.form_other1_Old_Male="";
                $scope.form_other1_Old_Female="";
                $scope.form_other2_New_Male="";
                $scope.form_other2_New_Female="";
                $scope.form_other2_Old_Male="";
                $scope.form_other2_Old_Female="";
                $scope.form_other3_New_Male="";
                $scope.form_other3_New_Female="";
                $scope.form_other3_Old_Male="";
                $scope.form_other3_Old_Female="";
                $scope.form_other4_New_Male="";
                $scope.form_other4_New_Female="";
                $scope.form_other4_Old_Male="";
                $scope.form_other4_Old_Female="";
                $scope.form_other5_New_Male="";
                $scope.form_other5_New_Female="";
                $scope.form_other5_Old_Male="";
                $scope.form_other5_Old_Female="";
                
                //part 2 fields
                $scope.form_NoOfInpatient = "";
                $scope.form_NoOfECTAdmini_DuringTheMonth = "";
                $scope.form_NameOfPsychiatrist = "";
                $scope.form_NameOfPsychologist = "";
                $scope.form_NameOfPsychiatristSW = "";
                $scope.form_NoOFMC_DuringTheMonth = "";
                $scope.form_NoOfDisability_MR = "";
                $scope.form_NoOfDisability_MI = "";
                $scope.flag_status = 1;
                $scope.thc_details="";
                if(sessionStorage.FacilityType=='dlp'){
                $scope.Is_mnc=1;
                }else{
                	
                $scope.Is_mnc=0;
                }
                
            } else {
                console.log(response);
                
                /*$scope.disablereport = true;
                $scope.submitDisabled = true;*/
                console.log("disable report" + $scope.disablereport + " response is ok");
                var obj = angular.fromJson(response.data);
                //populating the data 
                console.log("we r able to see DATA-------"+obj);
               // alert("we r able to see DATA-------"+obj);
                //in the case when report has been submitted
                if( obj.flag_status == 2 ||obj.flag_status == 3 ){
                	//alert("kkkkk--"+ $scope.flag_status);
                	$scope.submitDisabled = true;
                    $scope.disablereport = true;
                	
                }else{
                	//in the case when  report has been saved
                	//alert("kkkkk--1"+ $scope.flag_status);
                	$scope.submitDisabled = false;
                    $scope.disablereport = false;
                	
                }
                
                $scope.form_SDM_Old_Male = obj.old_smd_male;
                $scope.form_SDM_Old_Female = obj.old_smd_female;
                $scope.form_SDM_New_Male = obj.new_smd_male;
                $scope.form_SDM_New_Female = obj.new_smd_female;
                $scope.form_CMD_Old_Male = obj.old_cmd_male;
                $scope.form_CMD_Old_Female = obj.old_cmd_female;
                $scope.form_CMD_New_Male = obj.new_cmd_male;
                $scope.form_CMD_New_Female = obj.new_cmd_female;
                $scope.form_A_D_Old_Male = obj.old_alcohal_male;
                $scope.form_A_D_Old_Female = obj.old_alcohal_female;
                $scope.form_A_D_New_Male = obj.new_alcohal_male;
                $scope.form_A_D_New_Female = obj.new_alcohal_female;
                $scope.form_HC_Old_Male = obj.old_male_reffered_to_highercenters;
                $scope.form_HC_Old_Female = obj.old_female_reffered_to_highercenters;
                $scope.form_HC_New_Male = obj.new_male_reffered_to_highercenters;
                $scope.form_HC_New_Female = obj.new_female_reffered_to_highercenters;
                $scope.form_PsyDis_Old_Male = obj.old_psychiatricdisorders_male;
                $scope.form_PsyDis_Old_Female = obj.old_psychiatricdisorders_female;
                $scope.form_PsyDis_New_Male = obj.new_psychiatricdisorders_male;
                $scope.form_PsyDis_New_Female = obj.new_psychiatricdisorders_female;
                $scope.form_Sucide_Old_Male = obj.old_male_suicidecases;
                $scope.form_Sucide_Old_Female = obj.old_female_suicidecases;
                $scope.form_Sucide_New_Male = obj.new_male_suicidecases;
                $scope.form_Sucide_New_Female = obj.new_female_suicidecases;
                $scope.form_Remarks = obj.remarks;
                
                
                //new other fields
                
                $scope.form_other1_New_Male = obj.new_o1_male;
                $scope.form_other1_New_Female = obj.new_o1_female;
                $scope.form_other1_Old_Male = obj.old_o1_male;
                $scope.form_other1_Old_Female = obj.old_o1_female;
                $scope.form_other2_New_Male = obj.new_o2_male;
                $scope.form_other2_New_Female = obj.new_o2_female;
                $scope.form_other2_Old_Male = obj.old_o2_male;
                $scope.form_other2_Old_Female = obj.old_o2_female;
                $scope.form_other3_New_Male = obj.new_o3_male;
                $scope.form_other3_New_Female = obj.new_o3_female;
                $scope.form_other3_Old_Male = obj.old_o3_male;
                $scope.form_other3_Old_Female = obj.old_o3_female;
                $scope.form_other4_New_Male = obj.new_o4_male;
                $scope.form_other4_New_Female = obj.new_o4_female;
                $scope.form_other4_Old_Male = obj.old_o4_male;
                $scope.form_other4_Old_Female = obj.old_o4_female;
                $scope.form_other5_New_Male = obj.new_o5_male;
                $scope.form_other5_New_Female = obj.new_o5_female;
                $scope.form_other5_Old_Male = obj.old_o5_male;
                $scope.form_other5_Old_Female = obj.old_o5_female;
                
                //part 2 fields
                $scope.form_NoOfInpatient = obj.no_of_inpatient;
                $scope.form_NoOfECTAdmini_DuringTheMonth = obj.no_of_ect;
                $scope.form_NameOfPsychiatrist = obj.name_of_psychi;
                $scope.form_NameOfPsychologist = obj.name_of_psycho;
                $scope.form_NameOfPsychiatristSW = obj.name_of_social_worker;
                $scope.form_NoOFMC_DuringTheMonth = obj.no_of_mano_clinic;
                $scope.form_NoOfDisability_MR = obj.no_of_mr_certificate;
                $scope.form_NoOfDisability_MI = obj.no_of_mi_certificate;
                
                $scope.flag_status = obj.flag_status;
                
                $scope.form_thc_details = obj.thc_details;
                
                if(sessionStorage.FacilityType=='dlp'){
                    $scope.Is_mnc=1;
                    alert("here--1"+$scope.form_thc_details);
                    }else{
                    	
                    $scope.Is_mnc=0;
                    }
                
                console.log(obj.submittedby);
                $scope.form_NameOfPharmacist = obj.submittedby;
                var date = new Date(obj.reportTimeStamp).getDate();
                var tomonth=new Date(obj.reportTimeStamp).getMonth()+1;
                var toyear=new Date(obj.reportTimeStamp).getFullYear();
                var original_date=date+'/'+tomonth+'/'+toyear;
                
              //  original_date="(Submitted on : "+original_date+")";
                $scope.form_submit_date_time=original_date;
                
                console.log("date"+$scope.form_submit_date_time)
            }
        }, function errorCallback(response) {});
    }
    
    //month change ends here =================================================
    
    
    
    
    if ($scope.form_FacilityType === "PHC") {
        $scope.showreportformat1 = true;
        $scope.showreportformat2 = false;
        $scope.showreportformat3 = false;
        $scope.title = "Primary Health Centre : " + sessionStorage.hospitalName;
    } else if ($scope.form_FacilityType === "CHC") {
        $scope.showreportformat1 = true;
        $scope.showreportformat2 = false;
        $scope.showreportformat3 = false;
        $scope.title = "Community Health Centre : " + sessionStorage.hospitalName;
    } else if ($scope.form_FacilityType === "DHC") {
        $scope.showreportformat1 = false;
        $scope.showreportformat2 = true;
        $scope.showreportformat3 = false;
        $scope.title = "District Health Centre : " + sessionStorage.hospitalName;
    }
    else {
        $scope.showreportformat1 = false;
        $scope.showreportformat2 = false;
        $scope.showreportformat3 = true;
        $scope.title = "Taluka Health Centre : " + sessionStorage.hospitalName;
    }
    $scope.disabledemo = "true";
    $scope.disablereport = "true";
    
    
	$scope.submitClick = function() {
        $scope.flag_status=2;
        $scope.buttonString = "Submitted";
        $scope.formSubmit2("submit");
        //$scope.flag_status = 1;
        //alert($scope.flag_status+"  submit click");
        alert("kolarDDHHCC");
      
    };
    
    $scope.saveClick = function() {
        $scope.flag_status=1;
        $scope.buttonString = "Saved";
        //      $scope.required=false;
        $scope.formSubmit2("save");
        //$scope.flag_status = 1;
       // alert($scope.flag_status+"  save click");
    };
    $scope.approveClick = function(e,t,ty) {
    
		        var Indata = {
        		hospital_id: t,
                old_smd_male: $scope.form_SDM_Old_Male,
                old_smd_female: $scope.form_SDM_Old_Female,
                new_smd_male: $scope.form_SDM_New_Male,
                new_smd_female: $scope.form_SDM_New_Female,
                old_cmd_male: $scope.form_CMD_Old_Male,
                old_cmd_female: $scope.form_CMD_Old_Female,
                new_cmd_male: $scope.form_CMD_New_Male,
                new_cmd_female: $scope.form_CMD_New_Female,
                old_alcohal_male: $scope.form_A_D_Old_Male,
                old_alcohal_female: $scope.form_A_D_Old_Female,
                new_alcohal_male: $scope.form_A_D_New_Male,
                new_alcohal_female: $scope.form_A_D_New_Female,
                old_male_reffered_to_highercenters: $scope.form_HC_Old_Male,
                old_female_reffered_to_highercenters: $scope.form_HC_Old_Female,
                new_male_reffered_to_highercenters: $scope.form_HC_New_Male,
                new_female_reffered_to_highercenters: $scope.form_HC_New_Female,

                
                //new fields            
                new_o1_male : $scope.form_other1_New_Male,
                new_o1_female : $scope.form_other1_New_Female,
                old_o1_male : $scope.form_other1_Old_Male,
                old_o1_female : $scope.form_other1_Old_Female,
                new_o2_male : $scope.form_other2_New_Male,
                new_o2_female : $scope.form_other2_New_Female,
                old_o2_male : $scope.form_other2_Old_Male,
                old_o2_female : $scope.form_other2_Old_Female,
                new_o3_male : $scope.form_other3_New_Male,
                new_o3_female : $scope.form_other3_New_Female,
                old_o3_male : $scope.form_other3_Old_Male,
                old_o3_female : $scope.form_other3_Old_Female,
                new_o4_male : $scope.form_other4_New_Male,
                new_o4_female : $scope.form_other4_New_Female,
                old_o4_male : $scope.form_other4_Old_Male,
                old_o4_female : $scope.form_other4_Old_Female,
                new_o5_male : $scope.form_other5_New_Male,
                new_o5_female : $scope.form_other5_New_Female,
                old_o5_male : $scope.form_other5_Old_Male,
                old_o5_female : $scope.form_other5_Old_Female,             
       
                old_psychiatricdisorders_male: $scope.form_PsyDis_Old_Male,
                old_psychiatricdisorders_female: $scope.form_PsyDis_Old_Female,
                new_psychiatricdisorders_male: $scope.form_PsyDis_New_Male,
                new_psychiatricdisorders_female: $scope.form_PsyDis_New_Female,
                old_male_suicidecases: $scope.form_Sucide_Old_Male,
                old_female_suicidecases: $scope.form_Sucide_Old_Female,
                new_male_suicidecases: $scope.form_Sucide_New_Male,
                new_female_suicidecases: $scope.form_Sucide_New_Female,            
                remarks: $scope.form_Remarks,
                hospitalType: ty,
                submittedby: $scope.form_NameOfPharmacist,
                reportFor_month_year: e,
        
                //part 2 fields
                
                no_of_inpatient: $scope.form_NoOfInpatient,
        		no_of_ect: $scope.form_NoOfECTAdmini_DuringTheMonth,
        		name_of_psychi: $scope.form_NameOfPsychiatrist,
        		name_of_psycho: $scope.form_NameOfPsychologist,
        		name_of_social_worker: $scope.form_NameOfPsychiatristSW,
        		no_of_mano_clinic: $scope.form_NoOFMC_DuringTheMonth,
        		no_of_mr_certificate: $scope.form_NoOfDisability_MR,
        		no_of_mi_certificate: $scope.form_NoOfDisability_MI,
        		flag_status: 3,
        		thc_details : $scope.form_thc_details, 	
                Is_mnc:0
               
        		
        };
        
        
        
        var myJSON = JSON.stringify(Indata);
        console.log(myJSON);
		//alert(t);
		
		 $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + t + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	
        
        //	alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
            	

//            
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//alert("Inside 204");
            	
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
            
            alert("here also---"+$scope.flag_status);
            
            	
            	location.reload();            	
            
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    
	}
	
	//reject code here when report not fine
	
	$scope.rejectClick = function(e,t,ty) {
		        var Indata = {
        		hospital_id: t,
                old_smd_male: $scope.form_SDM_Old_Male,
                old_smd_female: $scope.form_SDM_Old_Female,
                new_smd_male: $scope.form_SDM_New_Male,
                new_smd_female: $scope.form_SDM_New_Female,
                old_cmd_male: $scope.form_CMD_Old_Male,
                old_cmd_female: $scope.form_CMD_Old_Female,
                new_cmd_male: $scope.form_CMD_New_Male,
                new_cmd_female: $scope.form_CMD_New_Female,
                old_alcohal_male: $scope.form_A_D_Old_Male,
                old_alcohal_female: $scope.form_A_D_Old_Female,
                new_alcohal_male: $scope.form_A_D_New_Male,
                new_alcohal_female: $scope.form_A_D_New_Female,
                old_male_reffered_to_highercenters: $scope.form_HC_Old_Male,
                old_female_reffered_to_highercenters: $scope.form_HC_Old_Female,
                new_male_reffered_to_highercenters: $scope.form_HC_New_Male,
                new_female_reffered_to_highercenters: $scope.form_HC_New_Female,

                
    //new fields            
                new_o1_male : $scope.form_other1_New_Male,
                new_o1_female : $scope.form_other1_New_Female,
                old_o1_male : $scope.form_other1_Old_Male,
                old_o1_female : $scope.form_other1_Old_Female,
                new_o2_male : $scope.form_other2_New_Male,
                new_o2_female : $scope.form_other2_New_Female,
                old_o2_male : $scope.form_other2_Old_Male,
                old_o2_female : $scope.form_other2_Old_Female,
                new_o3_male : $scope.form_other3_New_Male,
                new_o3_female : $scope.form_other3_New_Female,
                old_o3_male : $scope.form_other3_Old_Male,
                old_o3_female : $scope.form_other3_Old_Female,
                new_o4_male : $scope.form_other4_New_Male,
                new_o4_female : $scope.form_other4_New_Female,
                old_o4_male : $scope.form_other4_Old_Male,
                old_o4_female : $scope.form_other4_Old_Female,
                new_o5_male : $scope.form_other5_New_Male,
                new_o5_female : $scope.form_other5_New_Female,
                old_o5_male : $scope.form_other5_Old_Male,
                old_o5_female : $scope.form_other5_Old_Female,             
       
                old_psychiatricdisorders_male: $scope.form_PsyDis_Old_Male,
                old_psychiatricdisorders_female: $scope.form_PsyDis_Old_Female,
                new_psychiatricdisorders_male: $scope.form_PsyDis_New_Male,
                new_psychiatricdisorders_female: $scope.form_PsyDis_New_Female,
                old_male_suicidecases: $scope.form_Sucide_Old_Male,
                old_female_suicidecases: $scope.form_Sucide_Old_Female,
                new_male_suicidecases: $scope.form_Sucide_New_Male,
                new_female_suicidecases: $scope.form_Sucide_New_Female,            
                remarks: $scope.form_Remarks,
                hospitalType: ty,
                submittedby: $scope.form_NameOfPharmacist,
                reportFor_month_year: e,
        
                //part 2 fields
                
                no_of_inpatient: $scope.form_NoOfInpatient,
        		no_of_ect: $scope.form_NoOfECTAdmini_DuringTheMonth,
        		name_of_psychi: $scope.form_NameOfPsychiatrist,
        		name_of_psycho: $scope.form_NameOfPsychologist,
        		name_of_social_worker: $scope.form_NameOfPsychiatristSW,
        		no_of_mano_clinic: $scope.form_NoOFMC_DuringTheMonth,
        		no_of_mr_certificate: $scope.form_NoOfDisability_MR,
        		no_of_mi_certificate: $scope.form_NoOfDisability_MI,
        		flag_status: 4,
        		thc_details : $scope.form_thc_details,
        	    Is_mnc:1,
                    
        };
        
        
        
        var myJSON = JSON.stringify(Indata);
        console.log(myJSON);
	//	alert(t);
		
		 $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + t + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	//alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
            	

//            
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//alert("Inside 204");
            	
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    
	}
	
	
	
	
	
	
	
    
    angular.element(document).ready(function() {
    	

    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhpUP';
    	
        var date = sessionStorage.ReportingDate;
        var mon = date.split("-")[1]-1;
        var year = date.split("-")[2];
        if(mon<10)
		{
			  var month = year + "-" + "0" + mon + "-01";
			
		}
		else{
			  var month = year + "-" + mon + "-01";
			
		}
        console.log("ready name " + $rootScope.urlName);
        console.log("ready namemsd " + $rootScope.projectName);
        
       // alert("hello---+");
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&self=true" + "&month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            console.log($scope.disablereport);
            $rootScope.doctorName = sessionStorage.Admname;
			$rootScope.doctorType1 = sessionStorage.FacilityType;
            $rootScope.login_not_submitted = 1;
            console.log("doctor name" + $scope.form_Admname);
         //  alert("we r here--"+response);
            if (response.status == 204) {
            	//alert("here-2");
                console.log("No resposne");
                $scope.form_SDM_Old_Male = "";
                $scope.form_SDM_Old_Female = "";
                $scope.form_SDM_New_Male = "";
                $scope.form_SDM_New_Female = "";
                $scope.form_CMD_Old_Male = "";
                $scope.form_CMD_Old_Female = "";
                $scope.form_CMD_New_Male = "";
                $scope.form_CMD_New_Female = "";
                $scope.form_A_D_Old_Male = "";
                $scope.form_A_D_Old_Female = "";
                $scope.form_A_D_New_Male = "";
                $scope.form_A_D_New_Female = "";
                $scope.form_HC_Old_Male = "";
                $scope.form_HC_Old_Female = "";
                $scope.form_HC_New_Male = "";
                $scope.form_HC_New_Female = "";
                $scope.form_PsyDis_Old_Male = "";
                $scope.form_PsyDis_Old_Female = "";
                $scope.form_PsyDis_New_Male = "";
                $scope.form_PsyDis_New_Female = "";
                $scope.form_Sucide_Old_Male = "";
                $scope.form_Sucide_Old_Female = "";
                $scope.form_Sucide_New_Male = "";
                $scope.form_Sucide_New_Female = "";
                $scope.form_Remarks="";
                $scope.form_submit_date_time="";
                
                //new other fields
                
                $scope.form_other1_New_Male="";
                $scope.form_other1_New_Female="";
                $scope.form_other1_Old_Male="";
                $scope.form_other1_Old_Female="";
                $scope.form_other2_New_Male="";
                $scope.form_other2_New_Female="";
                $scope.form_other2_Old_Male="";
                $scope.form_other2_Old_Female="";
                $scope.form_other3_New_Male="";
                $scope.form_other3_New_Female="";
                $scope.form_other3_Old_Male="";
                $scope.form_other3_Old_Female="";
                $scope.form_other4_New_Male="";
                $scope.form_other4_New_Female="";
                $scope.form_other4_Old_Male="";
                $scope.form_other4_Old_Female="";
                $scope.form_other5_New_Male="";
                $scope.form_other5_New_Female="";
                $scope.form_other5_Old_Male="";
                $scope.form_other5_Old_Female="";
                
                //part 2 fields
                $scope.form_NoOfInpatient = "";
                $scope.form_NoOfECTAdmini_DuringTheMonth = "";
                $scope.form_NameOfPsychiatrist = "";
                $scope.form_NameOfPsychologist = "";
                $scope.form_NameOfPsychiatristSW = "";
                $scope.form_NoOFMC_DuringTheMonth = "";
                $scope.form_NoOfDisability_MR = "";
                $scope.form_NoOfDisability_MI = "";
                $scope.flag_status = 1;
                $scope.form_thc_details="";
                $scope.Is_mnc=0;
                
               
                $scope.form_NameOfPharmacist =sessionStorage.Admname ;
                console.log(response);
                $scope.disablereport = !$scope.disablereport;
            } else {
                console.log(response);
                var obj = angular.fromJson(response.data);
                
               // alert("type----> "+sessionStorage.FacilityType+"  THC--->"+$scope.form_thc_details);
               
                //in the case when report is submitted
                if(obj.flag_status == 2 || obj.flag_status == 3){
            		
            		//alert("status 2 dis true");
                
                	$scope.submitDisabled = true;
                	$scope.disablereport = true;
                	console.log(" first time report submitted, response is success");
            	}else{
            		//in the case when report has been only saved
            		//alert("status 2 dis false");
                	$scope.submitDisabled = false;	
                	$scope.disablereport = false;
                }
                //populating the data 
                $scope.form_SDM_Old_Male = obj.old_smd_male;
                $scope.form_SDM_Old_Female = obj.old_smd_female;
                $scope.form_SDM_New_Male = obj.new_smd_male;
                $scope.form_SDM_New_Female = obj.new_smd_female;
                $scope.form_CMD_Old_Male = obj.old_cmd_male;
                $scope.form_CMD_Old_Female = obj.old_cmd_female;
                $scope.form_CMD_New_Male = obj.new_cmd_male;
                $scope.form_CMD_New_Female = obj.new_cmd_female;
                $scope.form_A_D_Old_Male = obj.old_alcohal_male;
                $scope.form_A_D_Old_Female = obj.old_alcohal_female;
                $scope.form_A_D_New_Male = obj.new_alcohal_male;
                $scope.form_A_D_New_Female = obj.new_alcohal_female;
                $scope.form_HC_Old_Male = obj.old_male_reffered_to_highercenters;
                $scope.form_HC_Old_Female = obj.old_female_reffered_to_highercenters;
                $scope.form_HC_New_Male = obj.new_male_reffered_to_highercenters;
                $scope.form_HC_New_Female = obj.new_female_reffered_to_highercenters;
                $scope.form_PsyDis_Old_Male = obj.old_psychiatricdisorders_male;
                $scope.form_PsyDis_Old_Female = obj.old_psychiatricdisorders_female;
                $scope.form_PsyDis_New_Male = obj.new_psychiatricdisorders_male;
                $scope.form_PsyDis_New_Female = obj.new_psychiatricdisorders_female;
                $scope.form_Sucide_Old_Male = obj.old_male_suicidecases;
                $scope.form_Sucide_Old_Female = obj.old_female_suicidecases;
                $scope.form_Sucide_New_Male = obj.new_male_suicidecases;
                $scope.form_Sucide_New_Female = obj.new_female_suicidecases;
                $scope.form_Remarks = obj.remarks;
                
                
                //new other fields
                $scope.form_other1_New_Male = obj.new_o1_male;
                $scope.form_other1_New_Female = obj.new_o1_female;
                $scope.form_other1_Old_Male = obj.old_o1_male;
                $scope.form_other1_Old_Female = obj.old_o1_female;
                $scope.form_other2_New_Male = obj.new_o2_male;
                $scope.form_other2_New_Female = obj.new_o2_female;
                $scope.form_other2_Old_Male = obj.old_o2_male;
                $scope.form_other2_Old_Female = obj.old_o2_female;
                $scope.form_other3_New_Male = obj.new_o3_male;
                $scope.form_other3_New_Female = obj.new_o3_female;
                $scope.form_other3_Old_Male = obj.old_o3_male;
                $scope.form_other3_Old_Female = obj.old_o3_female;
                $scope.form_other4_New_Male = obj.new_o4_male;
                $scope.form_other4_New_Female = obj.new_o4_female;
                $scope.form_other4_Old_Male = obj.old_o4_male;
                $scope.form_other4_Old_Female = obj.old_o4_female;
                $scope.form_other5_New_Male = obj.new_o5_male;
                $scope.form_other5_New_Female = obj.new_o5_female;
                $scope.form_other5_Old_Male = obj.old_o5_male;
                $scope.form_other5_Old_Female = obj.old_o5_female;  
                
                
                //part 2 fields
                $scope.form_NoOfInpatient = obj.no_of_inpatient;
                $scope.form_NoOfECTAdmini_DuringTheMonth = obj.no_of_ect;
                $scope.form_NameOfPsychiatrist = obj.name_of_psychi;
                $scope.form_NameOfPsychologist = obj.name_of_psycho;
                $scope.form_NameOfPsychiatristSW = obj.name_of_social_worker;
                $scope.form_NoOFMC_DuringTheMonth = obj.no_of_mano_clinic;
                $scope.form_NoOfDisability_MR = obj.no_of_mr_certificate;
                $scope.form_NoOfDisability_MI = obj.no_of_mi_certificate;
                $scope.flag_status=obj.flag_status;
                $scope.form_thc_details=obj.thc_details;
                if(sessionStorage.FacilityType=='dlp'){
                    $scope.Is_mnc=1;
                    }else{
                    	
                    $scope.Is_mnc=0;
                    }
                
               
                
                //alert("here-1");
               /* if( $scope.flag_status == 2 ){
                	
                	$scope.submitDisabled = true;
                    $scope.disablereport = true;
                	
                }else{
                	$scope.submitDisabled = false;
                    $scope.disablereport = false;
                	
                }*/
                console.log(obj.submittedby);
                $scope.form_NameOfPharmacist = obj.submittedby;
                
                var date = new Date(obj.reportTimeStamp).getDate();
                var tomonth=new Date(obj.reportTimeStamp).getMonth()+1;
                var toyear=new Date(obj.reportTimeStamp).getFullYear();
                var original_date=date+'/'+tomonth+'/'+toyear;
                
              //  original_date="(Submitted on : "+original_date+")";
                $scope.form_submit_date_time=original_date;
                
                
                
            }
        }, function errorCallback(response) {});
    });
    
    
    
    var hospital_id =  sessionStorage.hospitalID;
    
    var old_smd_male = $scope.form_SDM_Old_Male;
    var old_smd_female = $scope.form_SDM_Old_Female;
    var new_smd_male = $scope.form_SDM_New_Male;
    var new_smd_female = $scope.form_SDM_New_Female;
    var old_cmd_male = $scope.form_CMD_Old_Male;
    var old_cmd_female = $scope.form_CMD_Old_Female;
    var new_cmd_male = $scope.form_CMD_New_Male;
    var new_cmd_female = $scope.form_CMD_New_Female;
    var old_alcohal_male = $scope.form_A_D_Old_Male;
    var old_alcohal_female = $scope.form_A_D_Old_Female;
    var new_alcohal_male = $scope.form_A_D_New_Male;
    var new_alcohal_female = $scope.form_A_D_New_Female;
    var old_male_reffered_to_highercenters = $scope.form_HC_Old_Male;
    var old_female_reffered_to_highercenters = $scope.form_HC_Old_Female;
    var new_male_reffered_to_highercenters = $scope.form_HC_New_Male;
    var new_female_reffered_to_highercenters = $scope.form_HC_New_Female;
    var old_psychiatricdisorders_male = $scope.form_PsyDis_Old_Male;
    var old_psychiatricdisorders_female = $scope.form_PsyDis_Old_Female;
    var new_psychiatricdisorders_male = $scope.form_PsyDis_New_Male;
    var new_psychiatricdisorders_female = $scope.form_PsyDis_New_Female;
    var old_male_suicidecases = $scope.form_Sucide_Old_Male;
    var old_female_suicidecases = $scope.form_Sucide_Old_Female;
    var new_male_suicidecases = $scope.form_Sucide_New_Male;
    var new_female_suicidecases = $scope.form_Sucide_New_Female;
    var remarks = $scope.form_Remarks;
    var submittedBy = $scope.form_NameOfPharmacist;
    var hospitalType = sessionStorage.FacilityType;
    
    var new_o1_male = $scope.form_other1_New_Male;
    var new_o1_female = $scope.form_other1_New_Female;
    var old_o1_male = $scope.form_other1_Old_Male;
    var old_o1_female = $scope.form_other1_Old_Female;
    var new_o2_male = $scope.form_other2_New_Male;
    var new_o2_female = $scope.form_other2_New_Female;
    var old_o2_male = $scope.form_other2_Old_Male;
    var old_o2_female = $scope.form_other2_Old_Female;
    var new_o3_male = $scope.form_other3_New_Male;
    var new_o3_female = $scope.form_other3_New_Female;
    var old_o3_male = $scope.form_other3_Old_Male;
    var old_o3_female = $scope.form_other3_Old_Female;
    var new_o4_male = $scope.form_other4_New_Male;
    var new_o4_female = $scope.form_other4_New_Female;
    var old_o4_male = $scope.form_other4_Old_Male;
    var old_o4_female = $scope.form_other4_Old_Female;
    var new_o5_male = $scope.form_other5_New_Male;
    var new_o5_female = $scope.form_other5_New_Female;
    var old_o5_male = $scope.form_other5_Old_Male;
    var old_o5_female = $scope.form_other5_Old_Female; 
    
    //part 2 fields
    var no_of_inpatient = $scope.form_NoOfInpatient;
    var no_of_ect = $scope.form_NoOfECTAdmini_DuringTheMonth;
    var name_of_psychi = $scope.form_NameOfPsychiatrist;
    var name_of_psycho = $scope.form_NameOfPsychologist;
    var name_of_social_worker = $scope.form_NameOfPsychiatristSW;
    var no_of_mano_clinic = $scope.form_NoOFMC_DuringTheMonth;
    var no_of_mr_certificate = $scope.form_NoOfDisability_MR;
    var no_of_mi_certificate = $scope.form_NoOfDisability_MI;
    var flag_status=$scope.flag_status;
    var thc_details=$scope.form_thc_details;
    var Is_mnc=1;
    
    
//    $scope.submitDisabled = false;
    
//  
    
    $scope.formSubmit2 = function(buttonType) {
        
        //report form table
   
    	console.log(new_female_suicidecases + " " + $scope.form_SDM_Old_Male);
        var Indata = {
        		hospital_id: sessionStorage.hospitalID,
                old_smd_male: $scope.form_SDM_Old_Male,
                old_smd_female: $scope.form_SDM_Old_Female,
                new_smd_male: $scope.form_SDM_New_Male,
                new_smd_female: $scope.form_SDM_New_Female,
                old_cmd_male: $scope.form_CMD_Old_Male,
                old_cmd_female: $scope.form_CMD_Old_Female,
                new_cmd_male: $scope.form_CMD_New_Male,
                new_cmd_female: $scope.form_CMD_New_Female,
                old_alcohal_male: $scope.form_A_D_Old_Male,
                old_alcohal_female: $scope.form_A_D_Old_Female,
                new_alcohal_male: $scope.form_A_D_New_Male,
                new_alcohal_female: $scope.form_A_D_New_Female,
                old_male_reffered_to_highercenters: $scope.form_HC_Old_Male,
                old_female_reffered_to_highercenters: $scope.form_HC_Old_Female,
                new_male_reffered_to_highercenters: $scope.form_HC_New_Male,
                new_female_reffered_to_highercenters: $scope.form_HC_New_Female,

                
    //new fields            
                new_o1_male : $scope.form_other1_New_Male,
                new_o1_female : $scope.form_other1_New_Female,
                old_o1_male : $scope.form_other1_Old_Male,
                old_o1_female : $scope.form_other1_Old_Female,
                new_o2_male : $scope.form_other2_New_Male,
                new_o2_female : $scope.form_other2_New_Female,
                old_o2_male : $scope.form_other2_Old_Male,
                old_o2_female : $scope.form_other2_Old_Female,
                new_o3_male : $scope.form_other3_New_Male,
                new_o3_female : $scope.form_other3_New_Female,
                old_o3_male : $scope.form_other3_Old_Male,
                old_o3_female : $scope.form_other3_Old_Female,
                new_o4_male : $scope.form_other4_New_Male,
                new_o4_female : $scope.form_other4_New_Female,
                old_o4_male : $scope.form_other4_Old_Male,
                old_o4_female : $scope.form_other4_Old_Female,
                new_o5_male : $scope.form_other5_New_Male,
                new_o5_female : $scope.form_other5_New_Female,
                old_o5_male : $scope.form_other5_Old_Male,
                old_o5_female : $scope.form_other5_Old_Female,             
       
                old_psychiatricdisorders_male: $scope.form_PsyDis_Old_Male,
                old_psychiatricdisorders_female: $scope.form_PsyDis_Old_Female,
                new_psychiatricdisorders_male: $scope.form_PsyDis_New_Male,
                new_psychiatricdisorders_female: $scope.form_PsyDis_New_Female,
                old_male_suicidecases: $scope.form_Sucide_Old_Male,
                old_female_suicidecases: $scope.form_Sucide_Old_Female,
                new_male_suicidecases: $scope.form_Sucide_New_Male,
                new_female_suicidecases: $scope.form_Sucide_New_Female,            
                remarks: $scope.form_Remarks,
                hospitalType: sessionStorage.FacilityType,
                submittedby: $scope.form_NameOfPharmacist,
                reportFor_month_year: $scope.form_ReportingYear + "-" + $scope.monthnumber + "-01",
        
                //part 2 fields
                
                no_of_inpatient: $scope.form_NoOfInpatient,
        		no_of_ect: $scope.form_NoOfECTAdmini_DuringTheMonth,
        		name_of_psychi: $scope.form_NameOfPsychiatrist,
        		name_of_psycho: $scope.form_NameOfPsychologist,
        		name_of_social_worker: $scope.form_NameOfPsychiatristSW,
        		no_of_mano_clinic: $scope.form_NoOFMC_DuringTheMonth,
        		no_of_mr_certificate: $scope.form_NoOfDisability_MR,
        		no_of_mi_certificate: $scope.form_NoOfDisability_MI,
        		flag_status: $scope.flag_status,
        		thc_details: $scope.form_thc_details,
        		Is_mnc:1
        		
        };
        
        
      $scope.thcData = function(hospital_id,hospital_type,month) {
          	
          	
          	alert("month   "+  month+"  hospital  "+hospital_id+"type  "+hospital_type);
          	$http({
                url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + hospital_id + "/reportsThcValidation?type=" + hospital_type + "&month=" + month,
                method: "GET",
                dataType: "json",
                //contentType:"application/x-www-form-urlencoded"
            }).then(function(response) {
            	
            	alert(response);
            	
            	
            }, function errorCallback(response) {
//              console.log(form_submitted_status);
            });
	    };
        
        
        
        
        
        
        
       // alert("here-3");
        var myJSON = JSON.stringify(Indata);
        console.log("HERE-----"+myJSON);
        //alert(myJSON);
        var buttonFlag = -1;	//when it is 1 then only post request will be made
        if(buttonType === "save"){
        	var r = confirm("Are you sure, you want to save??");
        	if (r == true){
        		buttonFlag = 1;
        	}else{
        		$scope.form_submitted = false;
                $scope.form_not_submitted=true;
                
        	}
        	
        }else if(buttonType === "submit"){
        	
        	//all thc's report data submitted r not validation here for DHC level
        	
        	//alert(sessionStorage.FacilityType);
        	if(sessionStorage.FacilityType=='dhc'){
        		alert("THC NAME---"+$scope.form_thc_details+"HOSPITAL ID--"+sessionStorage.hospitalID+"REPORTING MONTH--"+$scope.form_ReportingYear + "-" + $scope.monthnumber + "-01");
        		  $scope.thcData(sessionStorage.hospitalID,sessionStorage.FacilityType,$scope.form_ReportingYear + "-" + $scope.monthnumber + "-01");
        	}
        	
        	
        	
        	
        	
        	
        	var r = confirm("Are you sure, you want to submit??");
        	
        	if( r == true)
        		{buttonFlag =1;}
        	else{
        		$scope.form_submitted = false;
                $scope.form_not_submitted=true;
                
        	}
        }
        
        
//        var r = confirm("Are you sure, you want to submit??");
        
        
       
        
        if(buttonFlag == 1){
        	//alert("button type " + buttonFlag + " buttonType "+ buttonType);
        	//alert("here-4");
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	//alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
            	if($scope.flag_status == 2 || $scope.flag_status == 3){
            		
            	//	alert("status 2 dis true");
            		$scope.submitDisabled = true;
            		$scope.disablereport = true;

                	console.log(" first time report submitted, response is success");
            	}else{
            		//alert("status 2 dis false");
                	$scope.submitDisabled = false;	
                	$scope.disablereport = false;
                	

                }

//            	$scope.submitDisabled = true;
                console.log(" first time report submitted, response is success");
               
                $scope.form_submitted = true;
                $scope.form_not_submitted=false;
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//alert("Inside 204");
            	$scope.submitDisabled = false;
            	$scope.disablereport = false;
            	$scope.form_submitted = false;
            	$scope.form_not_submitted=true;
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
        }
    }
});


//m a i n t r a i n i n g

app.controller("MainT", function($scope, $http, $rootScope) {
	
	//alert("baaann");
	$scope.loginpage = function ()
	{
		$location.path('/login');
	}
    $rootScope.doctorName = sessionStorage.Admname;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $rootScope.login_not_submitted = 1;
    
  

    $scope.disabledemo = "true";
    $scope.disablereport = "true";
    
    $rootScope.urlName = 'http://localhost:8080/';
    $rootScope.projectName = 'dmhpUP';
	
    angular.element(document).ready(function() {

    	
    	$rootScope.doctorName = sessionStorage.Admname;
		$rootScope.doctorType1 = sessionStorage.FacilityType;
    	$rootScope.login_not_submitted = 1;
    
    });
    
    
    var no_of_events = $scope.Training_Name_event;
    var specify_others = $scope.Training_SpecifyOtherevent;
    var event_from = $scope.Training_Event_fromDate;
    var event_to = $scope.Training_Event_ToDate;
    var target_group = $scope.Training_Targetgroup;
    var no_of_patients = $scope.Training_NoOfParticipants;
    var name_of_facility = $scope.Training_NameOf_Facility;
    var report = $scope.Training_BriefReport;
    

    //latest fields
    
    var hospital_id =  sessionStorage.hospitalID;
    var date = new Date($scope.reportTimeStamp).getDate();
    var tomonth=new Date($scope.reportTimeStamp).getMonth()+1;
    var toyear=new Date($scope.reportTimeStamp).getFullYear();
    var original_date=date+'/'+tomonth+'/'+toyear;
    $scope.form_submit_date_time=original_date;

    
    $scope.submitDisabled = false;
  
    
    $scope.formSubmit1 = function() {
        //alert("training form submitted");
        var Indata = {
        		no_of_events : $scope.Training_Name_event,
        		specify_others : $scope.Training_SpecifyOtherevent,
        		event_from : $scope.Training_Event_fromDate,
        		event_to : $scope.Training_Event_ToDate,
        		target_group : $scope.Training_Targetgroup,
        		no_of_patients : $scope.Training_NoOfParticipants,
        		name_of_facility : $scope.Training_NameOf_Facility,
        		report : $scope.Training_BriefReport,
        		//new fields;
        		hospital_id :  sessionStorage.hospitalID,
        	    training_timestamp : $scope.form_submit_date_time,
        	    
        };
        
        
        
        var myJSON = JSON.stringify(Indata);
       // alert("myJson-----------!" + myJSON);
       // console.log("myJson-----------!" + myJSON);
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
        	
            if (response != null && response.status != 204) {
            	alert("succeful113-09095---");
            	
            	//$location.path("/stateReport1");            	
            	//$scope.submitDisabled = true; 
            	
                $scope.form_submitted = true;
                $scope.form_not_submitted=false;
                        	
            	
               // alert("heheheheh=-=-9-0--");
             //   var obj = angular.fromJson(response.data);
                
            }
            else
            	{
            	//alert("not ssuccess");
            	console.log("why am I here?");
            	$scope.submitDisabled = false;
            	$scope.form_submitted = false;
            	$scope.form_not_submitted=true;
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
            location.reload();
        }, function errorCallback(response) {
        	//alert($rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/training");
        	console.log("in the errorCallBack");
        	$scope.form_submitted = false;
        	$scope.form_not_submitted=true;
            //console.log(form_submitted_status);
        });
    }
});




//s t a t e c o n t r o l l e r


app.controller("stateadmincontroller", function($scope, $http, $rootScope,Excel,$timeout) {
    console.log("This is state admin controler");
    $scope.tableData = [];
    $rootScope.doctorName = sessionStorage.stateName;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
    		$scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
    		$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
   
    
    /*$scope.loginpage = function ()
	{
		console.log("I am at cummulative")
		$location.path('/login');
	}*/
    
    console.log($rootScope.mydata);
    $scope.form_SDM_Old_Male = 0;
    $scope.form_SDM_Old_Female = 0;
    $scope.form_SDM_New_Male = 0;
    $scope.form_SDM_New_Female = 0;
    $scope.form_CMD_Old_Male = 0;
    $scope.form_CMD_Old_Female = 0;
    $scope.form_CMD_New_Male = 0;
    $scope.form_CMD_New_Female = 0;
    $scope.form_A_D_Old_Male = 0;
    $scope.form_A_D_Old_Female = 0;
    $scope.form_A_D_New_Male = 0;
    $scope.form_A_D_New_Female = 0;
    $scope.form_HC_Old_Male = 0;
    $scope.form_HC_Old_Female = 0;
    $scope.form_HC_New_Male = 0;
    $scope.form_HC_New_Female = 0;
    $scope.form_PsyDis_Old_Male = 0;
    $scope.form_PsyDis_Old_Female = 0;
    $scope.form_PsyDis_New_Male = 0;
    $scope.form_PsyDis_New_Female = 0;
    $scope.form_Sucide_Old_Male = 0;
    $scope.form_Sucide_Old_Female = 0;
    $scope.form_Sucide_New_Male = 0;
    $scope.form_Sucide_New_Female = 0;
    
    //new other variables
    $scope.form_o1_New_Male = 0;
    $scope.form_o1_New_Female = 0;
    $scope.form_o1_Old_Male = 0;
    $scope.form_o1_Old_Female = 0;
    
    $scope.form_o2_New_Male = 0;
    $scope.form_o2_New_Female = 0;
    $scope.form_o2_Old_Male = 0;
    $scope.form_o2_Old_Female = 0;
    
    $scope.form_o3_New_Male = 0;
    $scope.form_o3_New_Female = 0;
    $scope.form_o3_Old_Male = 0;
    $scope.form_o3_Old_Female = 0;
    
    $scope.form_others_New_Male = 0;
    $scope.form_others_New_Female = 0;
    $scope.form_others_Old_Male = 0;
    $scope.form_others_Old_Female = 0;
    
    
    //array
    $scope.hospitalName_array = [];
    $scope.hospitalType_array = [];
    $scope.form_SDM_Old_Male_array = [];
    $scope.form_SDM_Old_Female_array = [];
    $scope.form_SDM_New_Male_array = [];
    $scope.form_SDM_New_Female_array = [];
    $scope.form_CMD_Old_Male_array = [];
    $scope.form_CMD_Old_Female_array = [];
    $scope.form_CMD_New_Male_array = [];
    $scope.form_CMD_New_Female_array = [];
    $scope.form_A_D_Old_Male_array = [];
    $scope.form_A_D_Old_Female_array = [];
    $scope.form_A_D_New_Male_array = [];
    $scope.form_A_D_New_Female_array = [];
    $scope.form_HC_Old_Male_array = [];
    $scope.form_HC_Old_Female_array = [];
    $scope.form_HC_New_Male_array = [];
    $scope.form_HC_New_Female_array = [];
    $scope.form_PsyDis_Old_Male_array = [];
    $scope.form_PsyDis_Old_Female_array = [];
    $scope.form_PsyDis_New_Male_array = [];
    $scope.form_PsyDis_New_Female_array = [];
    $scope.form_Sucide_Old_Male_array = [];
    $scope.form_Sucide_Old_Female_array = [];
    $scope.form_Sucide_New_Male_array = [];
    $scope.form_Sucide_New_Female_array = [];
    
    //new others arrays
    
    $scope.form_o1_New_Male_array = [];
    $scope.form_o1_New_Female_array = [];
    $scope.form_o1_Old_Male_array = [];
    $scope.form_o1_Old_Female_array = [];
    
    $scope.form_o2_New_Male_array = [];
    $scope.form_o2_New_Female_array = [];
    $scope.form_o2_Old_Male_array = [];
    $scope.form_o2_Old_Female_array = [];
    
    $scope.form_o3_New_Male_array = [];
    $scope.form_o3_New_Female_array = [];
    $scope.form_o3_Old_Male_array = [];
    $scope.form_o3_Old_Female_array = [];
    
    $scope.form_others_New_Male_array = [];
    $scope.form_others_New_Female_array = [];
    $scope.form_others_Old_Male_array = [];
    $scope.form_others_Old_Female_array = [];
    
    
    //
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
    
    
    //ng-change starts here : 
    
    
    
    
    function initialize()
   {
        $scope.form_SDM_Old_Male = 0;
        $scope.form_SDM_Old_Female = 0;
        $scope.form_SDM_New_Male = 0;
        $scope.form_SDM_New_Female = 0;
        $scope.form_CMD_Old_Male = 0;
        $scope.form_CMD_Old_Female = 0;
        $scope.form_CMD_New_Male = 0;
        $scope.form_CMD_New_Female = 0;
        $scope.form_A_D_Old_Male = 0;
        $scope.form_A_D_Old_Female = 0;
        $scope.form_A_D_New_Male = 0;
        $scope.form_A_D_New_Female = 0;
        $scope.form_HC_Old_Male = 0;
        $scope.form_HC_Old_Female = 0;
        $scope.form_HC_New_Male = 0;
        $scope.form_HC_New_Female = 0;
        $scope.form_PsyDis_Old_Male = 0;
        $scope.form_PsyDis_Old_Female = 0;
        $scope.form_PsyDis_New_Male = 0;
        $scope.form_PsyDis_New_Female = 0;
        $scope.form_Sucide_Old_Male = 0;
        $scope.form_Sucide_Old_Female = 0;
        $scope.form_Sucide_New_Male = 0;
        $scope.form_Sucide_New_Female = 0;
        
        
        $scope.form_o1_New_Male = 0;
        $scope.form_o1_New_Female = 0;
        $scope.form_o1_Old_Male = 0;
        $scope.form_o1_Old_Female = 0;
        
        $scope.form_o2_New_Male = 0;
        $scope.form_o2_New_Female = 0;
        $scope.form_o2_Old_Male = 0;
        $scope.form_o2_Old_Female = 0;
        
        $scope.form_o3_New_Male = 0;
        $scope.form_o3_New_Female = 0;
        $scope.form_o3_Old_Male = 0;
        $scope.form_o3_Old_Female = 0;
        
        $scope.form_others_New_Male = 0;
        $scope.form_others_New_Female = 0;
        $scope.form_others_Old_Male = 0;
        $scope.form_others_Old_Female = 0;
        
  	  
   }
      
    
    

    $scope.changemonth = function(month) {
    		
    	initialize();
    	
    	$scope.records="";
    
    	
        console.log("I am at cummulative mnth change ");
        var obj = $rootScope.mydata;
        console.log("Globale stae " + sessionStorage.stateName);
        $scope.title = "State: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        console.log("my data : ")
        console.log(obj);
        
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
//        alert("qwerty "+ month);
      
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/state_admin" + "?month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            if (response != null && response.status != 204) {
            	
            	
                console.log("cummulavtive data :");
                console.log(response);
                var obj = angular.fromJson(response.data);
                console.log("akdjandfjksdnjfnksndfn " + obj);
//                $scope.records = obj;
                //for array issue

                
                var district_report=null;
                var district=null;
                report = null;
                
                angular.forEach(obj,function(value,key){
                	console.log("type akdma "+ value.hospitalType)
                	if(value.hospitalType === "dhc" && value.reportStatus!=0 && value.hospital_report.flag_status == 2){
                		console.log("inside dhc");
                		district_report = value.hospital_report;
                		console.log("district_report "+ district_report);
                		district = this;
                		
                	}else if(value.hospitalType === "dhc" && value.reportStatus != 0 && value.hospital_report.flag_status == 1){
                			district_report = null;  			
                	}
                	else if(value.hospitalType === "dhc" && value.reportStatus == 0){
                		district_report = null;
                	}
                	else if(district_report != null && value.reportStatus!=0 && value.hospital_report.flag_status == 2 ){
                		console.log("inside other");
                		report = value.hospital_report;
                		console.log("value "+ value.hospital_report);
                		console.log("report dkamsd "+ report);
                		district_report.old_smd_male += report.old_smd_male;
                		district_report.old_smd_female += report.old_smd_female;
                		district_report.new_smd_male += report.new_smd_male;
                		district_report.new_smd_female += report.new_smd_female;
                		
                		district_report.old_cmd_male += report.old_cmd_male;
                		district_report.old_cmd_female += report.old_cmd_female;
                		district_report.new_cmd_male += report.new_cmd_male;
                		district_report.new_cmd_female += report.new_cmd_female;
                		
                		
                		district_report.old_alcohal_male += report.old_alcohal_male;
                		district_report.old_alcohal_female += report.old_alcohal_female;
                		district_report.new_alcohal_male += report.new_alcohal_male;
                		district_report.new_alcohal_female += report.new_alcohal_female;
                		
                		district_report.old_male_reffered_to_highercenters += report.old_male_reffered_to_highercenters;
                		district_report.old_female_reffered_to_highercenters += report.old_female_reffered_to_highercenters;
                		district_report.new_male_reffered_to_highercenters += report.new_male_reffered_to_highercenters;
                		district_report.new_female_reffered_to_highercenters += report.new_female_reffered_to_highercenters;
               
                		
                		district_report.old_psychiatricdisorders_male += report.old_psychiatricdisorders_male;
                		district_report.old_psychiatricdisorders_female += report.old_psychiatricdisorders_female;
                		district_report.new_psychiatricdisorders_male += report.new_psychiatricdisorders_male;
                		district_report.new_psychiatricdisorders_female += report.new_psychiatricdisorders_female;

                		
                		district_report.old_male_suicidecases += report.old_male_suicidecases;
                		district_report.old_female_suicidecases += report.old_female_suicidecases;
                		district_report.new_male_suicidecases += report.new_male_suicidecases;
                		district_report.new_female_suicidecases += report.new_female_suicidecases;
                		
                		//new other fields
                		
                		district_report.new_o1_male += report.new_o1_male;
                		district_report.new_o1_female += report.new_o1_female
                		district_report.old_o1_male += report.old_o1_male
                		district_report.old_o1_female += report.old_o1_female
                		
                		

                		district_report.new_o2_male += report.new_o2_male;
                		district_report.new_o2_female += report.new_o2_female
                		district_report.old_o2_male += report.old_o2_male
                		district_report.old_o2_female += report.old_o2_female
                		
                		

                		district_report.new_o3_male += report.new_o3_male;
                		district_report.new_o3_female += report.new_o3_female
                		district_report.old_o3_male += report.old_o3_male
                		district_report.old_o3_female += report.old_o3_female
                		
                		

                		district_report.new_o4_male += report.new_o4_male;
                		district_report.new_o4_female += report.new_o4_female
                		district_report.old_o4_male += report.old_o4_male
                		district_report.old_o4_female += report.old_o4_female
                		
                		

                		district_report.new_o5_male += report.new_o5_male;
                		district_report.new_o5_female += report.new_o5_female
                		district_report.old_o5_male += report.old_o5_male
                		district_report.old_o5_female += report.old_o5_female
                		
                	}
                	
                	if(district_report != null){
                		district.hospital_report = district_report;
                	}
                });


                var index = 0;
                
                var filteredObj = [];
                angular.forEach(obj,function(value,key){
                	if(value.hospitalType === "dhc"){
                		console.log("Rs " + value.reportStatus);
                		if(value.reportStatus == 1 && value.hospital_report.flag_status == 1){
//                			console.log("Hs "+ value.hospital_report.flag_status);
                			
                			//initialise all fields to be zero if the hospital has not submitted the report
                			
                			value.hospital_report.old_smd_male = 0;
                    		value.hospital_report.old_smd_female = 0;
                    		value.hospital_report.new_smd_male = 0;
                    		value.hospital_report.new_smd_female = 0;
                    		
                    		value.hospital_report.old_cmd_male = 0;
                    		value.hospital_report.old_cmd_female = 0;
                    		value.hospital_report.new_cmd_male = 0;
                    		value.hospital_report.new_cmd_female = 0;
                    		
                    		
                    		value.hospital_report.old_alcohal_male = 0;
                    		value.hospital_report.old_alcohal_female = 0;
                    		value.hospital_report.new_alcohal_male = 0;
                    		value.hospital_report.new_alcohal_female = 0;
                    		
                    		value.hospital_report.old_male_reffered_to_highercenters = 0;
                    		value.hospital_report.old_female_reffered_to_highercenters = 0;
                    		value.hospital_report.new_male_reffered_to_highercenters = 0;
                    		value.hospital_report.new_female_reffered_to_highercenters = 0;
                   
                    		
                    		value.hospital_report.old_psychiatricdisorders_male = 0;
                    		value.hospital_report.old_psychiatricdisorders_female = 0;
                    		value.hospital_report.new_psychiatricdisorders_male = 0;
                    		value.hospital_report.new_psychiatricdisorders_female = 0;

                    		
                    		value.hospital_report.old_male_suicidecases = 0;
                    		value.hospital_report.old_female_suicidecases = 0;
                    		value.hospital_report.new_male_suicidecases = 0;
                    		value.hospital_report.new_female_suicidecases = 0;
                    		
                    		//new other fields
                    		
                    		value.hospital_report.new_o1_male = 0;
                    		value.hospital_report.new_o1_female = 0;
                    		value.hospital_report.old_o1_male = 0;
                    		value.hospital_report.old_o1_female = 0;
                    		
                    		

                    		value.hospital_report.new_o2_male = 0;
                    		value.hospital_report.new_o2_female = 0;
                    		value.hospital_report.old_o2_male = 0;
                    		value.hospital_report.old_o2_female = 0;
                    		
                    		

                    		value.hospital_report.new_o3_male = 0;
                    		value.hospital_report.new_o3_female = 0;
                    		value.hospital_report.old_o3_male = 0;
                    		value.hospital_report.old_o3_female = 0;
                    		
                    		

                    		value.hospital_report.new_o4_male = 0;
                    		value.hospital_report.new_o4_female = 0;
                    		value.hospital_report.old_o4_male = 0;
                    		value.hospital_report.old_o4_female = 0;
                    		
                    		

                    		value.hospital_report.new_o5_male = 0;
                    		value.hospital_report.new_o5_female = 0;
                    		value.hospital_report.old_o5_male = 0;
                    		value.hospital_report.old_o5_female = 0;
                    		

                		}
                		this.push(value);
                	}
                }, filteredObj);
                
                console.log("filtered "+ filteredObj);
                $scope.records = filteredObj;
                
                angular.forEach(filteredObj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined) {
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
        
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);
                        
                    
                    }
                    index = index + 1;
                });
                console.log("length new zbczb" + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < $scope.hospitalName_array.length; i++) {
                    $scope.tableData[i] = {
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                }
                
//                for(i=0; i < $scope.hospitalName_array.length; i++){
//                	$scope.tableData[i] = {
//                			'No of SMD cases':{
//                				'New cases':{
//                					'male': $scope.form_SDM_New_Male_array[i],
//                					'female':$scope.form_SDM_New_Female_array[i]
//                						
//                				},
//                				'Old cases':{
//                					'male': $scope.form_SDM_Old_Male_array[i],
//                					'female':$scope.form_SDM_Old_Female_array[i]
//                					
//                				}
//                			}
//                	};
//                }
            }
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    
    }  	
        	
           
    
    
    angular.element(document).ready(function() {
    	
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhpUP';

    	
        console.log("I am at cumulative state report  ");
        var obj = $rootScope.mydata;	
        $scope.title = "State: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
//        $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
        var date = sessionStorage.ReportingDate;
//        alert("sss " + date );
        var mon = date.split("-")[1]-1;
        var year = date.split("-")[2];
        if(mon<10)
		{
			  var month = year + "-" + "0" + mon + "-01";
			
		}
		else{
			  var month = year + "-" + mon + "-01";
			
		}
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/state_admin?" + "month=" + month,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
        	console.log("Successful");
            if (response != null && response.status != 204) {
                console.log("fsfsfsummulavtive data :");
                console.log(response);
                $rootScope.doctorName = sessionStorage.stateName;
				$rootScope.doctorType1 = sessionStorage.FacilityType;
                var obj = angular.fromJson(response.data);
                console.log("sexy " + obj);
//                $scope.records = obj;
//                console.log("aksnans" + $scope.records);
                //for array issue
                
                
                   
                
                
                var district_report=null;
                var district=null;
                report = null;
                angular.forEach(obj,function(value,key){
                	console.log("type akdma "+ value.hospitalType)
                	if(value.hospitalType === "dhc" && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3)){
                		console.log("inside dhc");
                		district_report = value.hospital_report;
                		console.log("district_report "+ district_report);
                		district = this;
                	}else if(value.hospitalType === "dhc" && value.reportStatus!=0 && value.hospital_report.flag_status == 1){
                		district_report = null;
                	}else if(value.hospitalType === "dhc" && value.reportStatus == 0){
                		district_report = null;
                	}
                	else if(district_report != null && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3)){
                		console.log("inside other");
                		report = value.hospital_report;
                		console.log("value "+ value.hospital_report);
                		console.log("report dkamsd "+ report);
                		district_report.old_smd_male += report.old_smd_male;
                		district_report.old_smd_female += report.old_smd_female;
                		district_report.new_smd_male += report.new_smd_male;
                		district_report.new_smd_female += report.new_smd_female;
                		
                		district_report.old_cmd_male += report.old_cmd_male;
                		district_report.old_cmd_female += report.old_cmd_female;
                		district_report.new_cmd_male += report.new_cmd_male;
                		district_report.new_cmd_female += report.new_cmd_female;
                		
                		
                		district_report.old_alcohal_male += report.old_alcohal_male;
                		district_report.old_alcohal_female += report.old_alcohal_female;
                		district_report.new_alcohal_male += report.new_alcohal_male;
                		district_report.new_alcohal_female += report.new_alcohal_female;
                		
                		district_report.old_male_reffered_to_highercenters += report.old_male_reffered_to_highercenters;
                		district_report.old_female_reffered_to_highercenters += report.old_female_reffered_to_highercenters;
                		district_report.new_male_reffered_to_highercenters += report.new_male_reffered_to_highercenters;
                		district_report.new_female_reffered_to_highercenters += report.new_female_reffered_to_highercenters;
               
                		
                		district_report.old_psychiatricdisorders_male += report.old_psychiatricdisorders_male;
                		district_report.old_psychiatricdisorders_female += report.old_psychiatricdisorders_female;
                		district_report.new_psychiatricdisorders_male += report.new_psychiatricdisorders_male;
                		district_report.new_psychiatricdisorders_female += report.new_psychiatricdisorders_female;

                		
                		district_report.old_male_suicidecases += report.old_male_suicidecases;
                		district_report.old_female_suicidecases += report.old_female_suicidecases;
                		district_report.new_male_suicidecases += report.new_male_suicidecases;
                		district_report.new_female_suicidecases += report.new_female_suicidecases;

                		//new other fields
                		district_report.new_o1_male += report.new_o1_male;
                		district_report.new_o1_female += report.new_o1_female
                		district_report.old_o1_male += report.old_o1_male
                		district_report.old_o1_female += report.old_o1_female
                		
                		

                		district_report.new_o2_male += report.new_o2_male;
                		district_report.new_o2_female += report.new_o2_female
                		district_report.old_o2_male += report.old_o2_male
                		district_report.old_o2_female += report.old_o2_female
                		
                		

                		district_report.new_o3_male += report.new_o3_male;
                		district_report.new_o3_female += report.new_o3_female
                		district_report.old_o3_male += report.old_o3_male
                		district_report.old_o3_female += report.old_o3_female
                		
                		

                		district_report.new_o4_male += report.new_o4_male;
                		district_report.new_o4_female += report.new_o4_female
                		district_report.old_o4_male += report.old_o4_male
                		district_report.old_o4_female += report.old_o4_female
                		
                		

                		district_report.new_o5_male += report.new_o5_male;
                		district_report.new_o5_female += report.new_o5_female
                		district_report.old_o5_male += report.old_o5_male
                		district_report.old_o5_female += report.old_o5_female

                	}
                	
                	if(district_report != null){
                		district.hospital_report = district_report;
                	}
                });
                
                var filteredObj = [];
                
                angular.forEach(obj,function(value,key){
                	if(value.hospitalType === "dhc"){
                		console.log("Rs " + value.reportStatus);
                		if(value.reportStatus == 1 && value.hospital_report.flag_status == 1){
//                			console.log("Hs "+ value.hospital_report.flag_status);
                			
                			value.hospital_report.old_smd_male = 0;
                    		value.hospital_report.old_smd_female = 0;
                    		value.hospital_report.new_smd_male = 0;
                    		value.hospital_report.new_smd_female = 0;
                    		
                    		value.hospital_report.old_cmd_male = 0;
                    		value.hospital_report.old_cmd_female = 0;
                    		value.hospital_report.new_cmd_male = 0;
                    		value.hospital_report.new_cmd_female = 0;
                    		
                    		
                    		value.hospital_report.old_alcohal_male = 0;
                    		value.hospital_report.old_alcohal_female = 0;
                    		value.hospital_report.new_alcohal_male = 0;
                    		value.hospital_report.new_alcohal_female = 0;
                    		
                    		value.hospital_report.old_male_reffered_to_highercenters = 0;
                    		value.hospital_report.old_female_reffered_to_highercenters = 0;
                    		value.hospital_report.new_male_reffered_to_highercenters = 0;
                    		value.hospital_report.new_female_reffered_to_highercenters = 0;
                   
                    		
                    		value.hospital_report.old_psychiatricdisorders_male = 0;
                    		value.hospital_report.old_psychiatricdisorders_female = 0;
                    		value.hospital_report.new_psychiatricdisorders_male = 0;
                    		value.hospital_report.new_psychiatricdisorders_female = 0;

                    		
                    		value.hospital_report.old_male_suicidecases = 0;
                    		value.hospital_report.old_female_suicidecases = 0;
                    		value.hospital_report.new_male_suicidecases = 0;
                    		value.hospital_report.new_female_suicidecases = 0;
                    		
                    		//new other fields
                    		
                    		value.hospital_report.new_o1_male = 0;
                    		value.hospital_report.new_o1_female = 0;
                    		value.hospital_report.old_o1_male = 0;
                    		value.hospital_report.old_o1_female = 0;
                    		
                    		

                    		value.hospital_report.new_o2_male = 0;
                    		value.hospital_report.new_o2_female = 0;
                    		value.hospital_report.old_o2_male = 0;
                    		value.hospital_report.old_o2_female = 0;
                    		
                    		

                    		value.hospital_report.new_o3_male = 0;
                    		value.hospital_report.new_o3_female = 0;
                    		value.hospital_report.old_o3_male = 0;
                    		value.hospital_report.old_o3_female = 0;
                    		
                    		

                    		value.hospital_report.new_o4_male = 0;
                    		value.hospital_report.new_o4_female = 0;
                    		value.hospital_report.old_o4_male = 0;
                    		value.hospital_report.old_o4_female = 0;
                    		
                    		

                    		value.hospital_report.new_o5_male = 0;
                    		value.hospital_report.new_o5_female = 0;
                    		value.hospital_report.old_o5_male = 0;
                    		value.hospital_report.old_o5_female = 0;
                    		
                		}
                		
                		this.push(value);
                	}
                }, filteredObj);
             
                console.log("filtered "+ filteredObj);
                $scope.records = filteredObj;
                
                var index = 0;
                
                
                
                angular.forEach(filteredObj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined) {
                    	
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
                        
                        
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);

                    }
                    index = index + 1;
                });
                
                
                
                
                console.log("table data push " + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < $scope.hospitalName_array.length; i++) {
                	console.log($scope.hospitalName_array[i]+" hospital name")
                	
                    $scope.tableData[i]={
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                }
//                
//                for(i=0; i < $scope.hospitalName_array.length; i++){
//                	$scope.tableData[i] = {
//                			'No of SMD cases':{
//                				'New cases':{
//                					'male': $scope.form_SDM_New_Male_array[i],
//                					'female':$scope.form_SDM_New_Female_array[i]
//                						
//                				},
//                				'Old cases':{
//                					'male': $scope.form_SDM_Old_Male_array[i],
//                					'female':$scope.form_SDM_Old_Female_array[i]
//                					
//                				}
//                			}
//                	};
//                }
            }
        }, function errorCallback(response) {
        	console.log("In error block");
//            console.log(form_submitted_status);
        });
    });
    
    
    $scope.selectedhospital = function($event, $index) {
        console.log("hello" + $index);
        console.log($scope.records[$index]);
		//alert($scope.records[$index]);
        //console.log(recorddata);
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        console.log(action);
        if (action === 'remove') {
            $scope.form_SDM_Old_Male -= $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female -= $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male -= $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female -= $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male -= $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female -= $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male -= $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female -= $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male -= $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female -= $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male -= $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female -= $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male -= $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female -= $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male -= $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female -= $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male -= $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female -= $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male -= $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female -= $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male -= $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female -= $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male -= $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female -= $scope.form_Sucide_New_Female_array[$index];
        } else //add
        {
            $scope.form_SDM_Old_Male += $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female += $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male += $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female += $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male += $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female += $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male += $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female += $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male += $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female += $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male += $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female += $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male += $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female += $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male += $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female += $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male += $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female += $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male += $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female += $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male += $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female += $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male += $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female += $scope.form_Sucide_New_Female_array[$index];
        }
    }
    //chart function
    /* 
     * 
     * $scope.show = false;
     
     var self = $scope;
     
     $scope.chartFunction = function() {
         $scope.show = !$scope.show;
         if ($scope.show) {
             $scope.labels = ['SMD cases', 'CMD cases', 'Alcohol/Drug abuse Cases', 'cases referred to Higher centers', 'Cases of Suicide reported', 'Other Psychiatric disorders treated'];
             $scope.series = ['Male', 'Female'];
             $scope.data = [
                 [$scope.form_SDM_New_Male+$scope.form_SDM_Old_Male, $scope.form_CMD_New_Male+$scope.form_CMD_Old_Male,$scope.form_A_D_New_Male+
                     $scope.form_A_D_Old_Male,$scope.form_HC_New_Male+$scope.form_HC_Old_Male,$scope.form_Sucide_New_Male+$scope.form_Sucide_Old_Male,
                     $scope.form_PsyDis_New_Male+$scope.form_PsyDis_Old_Male
                 ],
                 [$scope.form_SDM_New_Female+$scope.form_SDM_Old_Female, 
                 	$scope.form_CMD_New_Female+$scope.form_CMD_Old_Female, 
                 	$scope.form_A_D_New_Female+$scope.form_A_D_Old_Female, 
                 	$scope.form_HC_New_Female+$scope.form_HC_Old_Female, 
                 	$scope.form_Sucide_New_Female+$scope.form_Sucide_Old_Female,
                     $scope.form_PsyDis_New_Female+$scope.form_PsyDis_Old_Female
                 ]
             ];
             $scope.ColorBar = ["#141692", "#FF5733"];
         }
     }
     
     */
    //report format generate code        
    $scope.getHeader = function() {
        return ['Hospital Name', 'Hospital Type', 'new SMD cases male', 'new SMD cases female', 'old SMD cases male', 'old SMD cases female', 'new CMD cases male',
            'new CMD cases female', 'old CMD cases male', 'old CMD cases female', 'new Alcohol/Drug abuse Cases male', 'new Alcohol/Drug abuse Cases female',
            'old Alcohol/Drug abuse Cases male', 'old Alcohol/Drug abuse Cases female', 'During the Month cases referred to Higher centers male',
            'During the Month cases referred to Higher centers female', 'Cumulative cases referred to Higher centers male', 'Cumulative cases referred to Higher centers female',
            'During the Month Cases of Suicide reported male', 'During the Month Cases of Suicide reported female', 'Cumulative Cases of Suicide reported male',
            'Cumulative Cases of Suicide reported female', 'Other Psychiatric disorders treated new cases male', 'Other Psychiatric disorders treated new cases female',
            'Other Psychiatric disorders treated  old cases male', 'Other Psychiatric disorders treated old cases female',
        ]
        
        
        
    };
    console.log("length " + $scope.hospitalName_array.length);
    
    //loop to iterate data
});

//ststcontroller end and dhc cotrolle starts


app.controller("dhcadmincontroller", function($scope, $http, $rootScope,Excel,$timeout) {
    console.log("This is DHC admin controler");
    $scope.tableData = [];
    $rootScope.doctorName = "KOLAR";
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
    		$scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
    		$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
   
    
    /*$scope.loginpage = function ()
	{
		console.log("I am at cummulative")
		$location.path('/login');
	}*/
    
    console.log($rootScope.mydata);
    $scope.form_SDM_Old_Male = 0;
    $scope.form_SDM_Old_Female = 0;
    $scope.form_SDM_New_Male = 0;
    $scope.form_SDM_New_Female = 0;
    $scope.form_CMD_Old_Male = 0;
    $scope.form_CMD_Old_Female = 0;
    $scope.form_CMD_New_Male = 0;
    $scope.form_CMD_New_Female = 0;
    $scope.form_A_D_Old_Male = 0;
    $scope.form_A_D_Old_Female = 0;
    $scope.form_A_D_New_Male = 0;
    $scope.form_A_D_New_Female = 0;
    $scope.form_HC_Old_Male = 0;
    $scope.form_HC_Old_Female = 0;
    $scope.form_HC_New_Male = 0;
    $scope.form_HC_New_Female = 0;
    $scope.form_PsyDis_Old_Male = 0;
    $scope.form_PsyDis_Old_Female = 0;
    $scope.form_PsyDis_New_Male = 0;
    $scope.form_PsyDis_New_Female = 0;
    $scope.form_Sucide_Old_Male = 0;
    $scope.form_Sucide_Old_Female = 0;
    $scope.form_Sucide_New_Male = 0;
    $scope.form_Sucide_New_Female = 0;
    
    //new other variables
    $scope.form_o1_New_Male = 0;
    $scope.form_o1_New_Female = 0;
    $scope.form_o1_Old_Male = 0;
    $scope.form_o1_Old_Female = 0;
    
    $scope.form_o2_New_Male = 0;
    $scope.form_o2_New_Female = 0;
    $scope.form_o2_Old_Male = 0;
    $scope.form_o2_Old_Female = 0;
    
    $scope.form_o3_New_Male = 0;
    $scope.form_o3_New_Female = 0;
    $scope.form_o3_Old_Male = 0;
    $scope.form_o3_Old_Female = 0;
    
    $scope.form_others_New_Male = 0;
    $scope.form_others_New_Female = 0;
    $scope.form_others_Old_Male = 0;
    $scope.form_others_Old_Female = 0;
    
    
    //array
    $scope.hospitalName_array = [];
    $scope.hospitalType_array = [];
    $scope.form_SDM_Old_Male_array = [];
    $scope.form_SDM_Old_Female_array = [];
    $scope.form_SDM_New_Male_array = [];
    $scope.form_SDM_New_Female_array = [];
    $scope.form_CMD_Old_Male_array = [];
    $scope.form_CMD_Old_Female_array = [];
    $scope.form_CMD_New_Male_array = [];
    $scope.form_CMD_New_Female_array = [];
    $scope.form_A_D_Old_Male_array = [];
    $scope.form_A_D_Old_Female_array = [];
    $scope.form_A_D_New_Male_array = [];
    $scope.form_A_D_New_Female_array = [];
    $scope.form_HC_Old_Male_array = [];
    $scope.form_HC_Old_Female_array = [];
    $scope.form_HC_New_Male_array = [];
    $scope.form_HC_New_Female_array = [];
    $scope.form_PsyDis_Old_Male_array = [];
    $scope.form_PsyDis_Old_Female_array = [];
    $scope.form_PsyDis_New_Male_array = [];
    $scope.form_PsyDis_New_Female_array = [];
    $scope.form_Sucide_Old_Male_array = [];
    $scope.form_Sucide_Old_Female_array = [];
    $scope.form_Sucide_New_Male_array = [];
    $scope.form_Sucide_New_Female_array = [];
    
    //new others arrays
    
    $scope.form_o1_New_Male_array = [];
    $scope.form_o1_New_Female_array = [];
    $scope.form_o1_Old_Male_array = [];
    $scope.form_o1_Old_Female_array = [];
    
    $scope.form_o2_New_Male_array = [];
    $scope.form_o2_New_Female_array = [];
    $scope.form_o2_Old_Male_array = [];
    $scope.form_o2_Old_Female_array = [];
    
    $scope.form_o3_New_Male_array = [];
    $scope.form_o3_New_Female_array = [];
    $scope.form_o3_Old_Male_array = [];
    $scope.form_o3_Old_Female_array = [];
    
    $scope.form_others_New_Male_array = [];
    $scope.form_others_New_Female_array = [];
    $scope.form_others_Old_Male_array = [];
    $scope.form_others_Old_Female_array = [];
    
    
    //
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
    
    
    //ng-change starts here : 
    
    
    
    
    function initialize()
   {
        $scope.form_SDM_Old_Male = 0;
        $scope.form_SDM_Old_Female = 0;
        $scope.form_SDM_New_Male = 0;
        $scope.form_SDM_New_Female = 0;
        $scope.form_CMD_Old_Male = 0;
        $scope.form_CMD_Old_Female = 0;
        $scope.form_CMD_New_Male = 0;
        $scope.form_CMD_New_Female = 0;
        $scope.form_A_D_Old_Male = 0;
        $scope.form_A_D_Old_Female = 0;
        $scope.form_A_D_New_Male = 0;
        $scope.form_A_D_New_Female = 0;
        $scope.form_HC_Old_Male = 0;
        $scope.form_HC_Old_Female = 0;
        $scope.form_HC_New_Male = 0;
        $scope.form_HC_New_Female = 0;
        $scope.form_PsyDis_Old_Male = 0;
        $scope.form_PsyDis_Old_Female = 0;
        $scope.form_PsyDis_New_Male = 0;
        $scope.form_PsyDis_New_Female = 0;
        $scope.form_Sucide_Old_Male = 0;
        $scope.form_Sucide_Old_Female = 0;
        $scope.form_Sucide_New_Male = 0;
        $scope.form_Sucide_New_Female = 0;
        
        
        $scope.form_o1_New_Male = 0;
        $scope.form_o1_New_Female = 0;
        $scope.form_o1_Old_Male = 0;
        $scope.form_o1_Old_Female = 0;
        
        $scope.form_o2_New_Male = 0;
        $scope.form_o2_New_Female = 0;
        $scope.form_o2_Old_Male = 0;
        $scope.form_o2_Old_Female = 0;
        
        $scope.form_o3_New_Male = 0;
        $scope.form_o3_New_Female = 0;
        $scope.form_o3_Old_Male = 0;
        $scope.form_o3_Old_Female = 0;
        
        $scope.form_others_New_Male = 0;
        $scope.form_others_New_Female = 0;
        $scope.form_others_Old_Male = 0;
        $scope.form_others_Old_Female = 0;
        
  	  
   }
      
    
    

    $scope.changemonth = function(month) {
    		
    	initialize();
    	
    	$scope.records="";
    
    	
        console.log("I am at cummulative mnth change ");
        var obj = $rootScope.mydata;
        console.log("Globale stae " + sessionStorage.stateName);
        $scope.title = "District: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        console.log("my data : ")
        console.log(obj);
        alert("District: " + sessionStorage.NameOfPharmacist);
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
      // alert("change month query "+ month);
      
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/doctor" + "?month=" + month+"&hospital_id="+sessionStorage.hospitalID,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            if (response != null && response.status != 204) {
            	
            //	alert("we r here");
                console.log("cummulavtive data :");
                console.log(response);
                var obj = angular.fromJson(response.data);
                console.log("akdjandfjksdnjfnksndfn--DHC " + obj);
//                $scope.records = obj;
                //for array issue

                
                var district_report=null;
                var district=null;
                report = null;
                
                angular.forEach(obj,function(value,key){
                	console.log("type akdma "+ value.hospitalType)
                	if(value.hospitalType === "thc" && value.reportStatus!=0 && value.hospital_report.flag_status == 2){
                		console.log("inside dhc");
                		district_report = value.hospital_report;
                		console.log("district_report "+ district_report);
                		district = this;
                		
                	}else if(value.hospitalType === "thc" && value.reportStatus != 0 && value.hospital_report.flag_status == 1){
                			district_report = null;  			
                	}
                	else if(value.hospitalType === "thc" && value.reportStatus == 0){
                		district_report = null;
                	}
                	else if(district_report != null && value.reportStatus!=0 && value.hospital_report.flag_status == 2 ){
                		console.log("inside other");
                		report = value.hospital_report;
                		console.log("value "+ value.hospital_report);
                		console.log("report dkamsd "+ report);
                		district_report.old_smd_male += report.old_smd_male;
                		district_report.old_smd_female += report.old_smd_female;
                		district_report.new_smd_male += report.new_smd_male;
                		district_report.new_smd_female += report.new_smd_female;
                		
                		district_report.old_cmd_male += report.old_cmd_male;
                		district_report.old_cmd_female += report.old_cmd_female;
                		district_report.new_cmd_male += report.new_cmd_male;
                		district_report.new_cmd_female += report.new_cmd_female;
                		
                		
                		district_report.old_alcohal_male += report.old_alcohal_male;
                		district_report.old_alcohal_female += report.old_alcohal_female;
                		district_report.new_alcohal_male += report.new_alcohal_male;
                		district_report.new_alcohal_female += report.new_alcohal_female;
                		
                		district_report.old_male_reffered_to_highercenters += report.old_male_reffered_to_highercenters;
                		district_report.old_female_reffered_to_highercenters += report.old_female_reffered_to_highercenters;
                		district_report.new_male_reffered_to_highercenters += report.new_male_reffered_to_highercenters;
                		district_report.new_female_reffered_to_highercenters += report.new_female_reffered_to_highercenters;
               
                		
                		district_report.old_psychiatricdisorders_male += report.old_psychiatricdisorders_male;
                		district_report.old_psychiatricdisorders_female += report.old_psychiatricdisorders_female;
                		district_report.new_psychiatricdisorders_male += report.new_psychiatricdisorders_male;
                		district_report.new_psychiatricdisorders_female += report.new_psychiatricdisorders_female;

                		
                		district_report.old_male_suicidecases += report.old_male_suicidecases;
                		district_report.old_female_suicidecases += report.old_female_suicidecases;
                		district_report.new_male_suicidecases += report.new_male_suicidecases;
                		district_report.new_female_suicidecases += report.new_female_suicidecases;
                		
                		//new other fields
                		
                		district_report.new_o1_male += report.new_o1_male;
                		district_report.new_o1_female += report.new_o1_female
                		district_report.old_o1_male += report.old_o1_male
                		district_report.old_o1_female += report.old_o1_female
                		
                		

                		district_report.new_o2_male += report.new_o2_male;
                		district_report.new_o2_female += report.new_o2_female
                		district_report.old_o2_male += report.old_o2_male
                		district_report.old_o2_female += report.old_o2_female
                		
                		

                		district_report.new_o3_male += report.new_o3_male;
                		district_report.new_o3_female += report.new_o3_female
                		district_report.old_o3_male += report.old_o3_male
                		district_report.old_o3_female += report.old_o3_female
                		
                		

                		district_report.new_o4_male += report.new_o4_male;
                		district_report.new_o4_female += report.new_o4_female
                		district_report.old_o4_male += report.old_o4_male
                		district_report.old_o4_female += report.old_o4_female
                		
                		

                		district_report.new_o5_male += report.new_o5_male;
                		district_report.new_o5_female += report.new_o5_female
                		district_report.old_o5_male += report.old_o5_male
                		district_report.old_o5_female += report.old_o5_female
                		
                	}
                	
                	if(district_report != null){
                		district.hospital_report = district_report;
                	}
                });


                var index = 0;
                
                var filteredObj = [];
                angular.forEach(obj,function(value,key){
                	if(value.hospitalType === "thc"){
                		console.log("Rs " + value.reportStatus);
                		if(value.reportStatus == 1 && value.hospital_report.flag_status == 1){
//                			console.log("Hs "+ value.hospital_report.flag_status);
                			
                			//initialise all fields to be zero if the hospital has not submitted the report
                			
                			value.hospital_report.old_smd_male = 0;
                    		value.hospital_report.old_smd_female = 0;
                    		value.hospital_report.new_smd_male = 0;
                    		value.hospital_report.new_smd_female = 0;
                    		
                    		value.hospital_report.old_cmd_male = 0;
                    		value.hospital_report.old_cmd_female = 0;
                    		value.hospital_report.new_cmd_male = 0;
                    		value.hospital_report.new_cmd_female = 0;
                    		
                    		
                    		value.hospital_report.old_alcohal_male = 0;
                    		value.hospital_report.old_alcohal_female = 0;
                    		value.hospital_report.new_alcohal_male = 0;
                    		value.hospital_report.new_alcohal_female = 0;
                    		
                    		value.hospital_report.old_male_reffered_to_highercenters = 0;
                    		value.hospital_report.old_female_reffered_to_highercenters = 0;
                    		value.hospital_report.new_male_reffered_to_highercenters = 0;
                    		value.hospital_report.new_female_reffered_to_highercenters = 0;
                   
                    		
                    		value.hospital_report.old_psychiatricdisorders_male = 0;
                    		value.hospital_report.old_psychiatricdisorders_female = 0;
                    		value.hospital_report.new_psychiatricdisorders_male = 0;
                    		value.hospital_report.new_psychiatricdisorders_female = 0;

                    		
                    		value.hospital_report.old_male_suicidecases = 0;
                    		value.hospital_report.old_female_suicidecases = 0;
                    		value.hospital_report.new_male_suicidecases = 0;
                    		value.hospital_report.new_female_suicidecases = 0;
                    		
                    		//new other fields
                    		
                    		value.hospital_report.new_o1_male = 0;
                    		value.hospital_report.new_o1_female = 0;
                    		value.hospital_report.old_o1_male = 0;
                    		value.hospital_report.old_o1_female = 0;
                    		
                    		

                    		value.hospital_report.new_o2_male = 0;
                    		value.hospital_report.new_o2_female = 0;
                    		value.hospital_report.old_o2_male = 0;
                    		value.hospital_report.old_o2_female = 0;
                    		
                    		

                    		value.hospital_report.new_o3_male = 0;
                    		value.hospital_report.new_o3_female = 0;
                    		value.hospital_report.old_o3_male = 0;
                    		value.hospital_report.old_o3_female = 0;
                    		
                    		

                    		value.hospital_report.new_o4_male = 0;
                    		value.hospital_report.new_o4_female = 0;
                    		value.hospital_report.old_o4_male = 0;
                    		value.hospital_report.old_o4_female = 0;
                    		
                    		

                    		value.hospital_report.new_o5_male = 0;
                    		value.hospital_report.new_o5_female = 0;
                    		value.hospital_report.old_o5_male = 0;
                    		value.hospital_report.old_o5_female = 0;
                    		

                		}
                		this.push(value);
                	}
                }, filteredObj);
                
                console.log("filtered "+ filteredObj);
                $scope.records = filteredObj;
                
                angular.forEach(filteredObj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined) {
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
        
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);
                        
                    
                    }
                    index = index + 1;
                });
                console.log("length new zbczb" + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < $scope.hospitalName_array.length; i++) {
                    $scope.tableData[i] = {
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                }
                
//                for(i=0; i < $scope.hospitalName_array.length; i++){
//                	$scope.tableData[i] = {
//                			'No of SMD cases':{
//                				'New cases':{
//                					'male': $scope.form_SDM_New_Male_array[i],
//                					'female':$scope.form_SDM_New_Female_array[i]
//                						
//                				},
//                				'Old cases':{
//                					'male': $scope.form_SDM_Old_Male_array[i],
//                					'female':$scope.form_SDM_Old_Female_array[i]
//                					
//                				}
//                			}
//                	};
//                }
            }
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    
    }  	
        	
           
    
    
    angular.element(document).ready(function() {
    	
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhpUP';

    	
        console.log("I am at cumulative state report  ");
        var obj = $rootScope.mydata;	
        $scope.title = "State: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
//        $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
        var date = sessionStorage.ReportingDate;
//        alert("sss " + date );
        var mon = date.split("-")[1]-1;
        var year = date.split("-")[2];
        if(mon<10)
		{
			  var month = year + "-" + "0" + mon + "-01";
			
		}
		else{
			  var month = year + "-" + mon + "-01";
			
		}
       // alert("we r here"+ sessionStorage.hospitalID+"hello" );
        $http({
            //url: $rootScope.urlName + $rootScope.projectName + "/api/doctor?" + "month=" + month,
        	url: $rootScope.urlName + $rootScope.projectName + "/api/doctor?" + "month=" + month+"&hospital_id="+sessionStorage.hospitalID,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
        	console.log("Successful");
            if (response != null && response.status != 204) {
            	//alert("we r here---1");
                console.log("fsfsfsummulavtive data :");
                console.log(response);
                $rootScope.doctorName = sessionStorage.stateName;
				$rootScope.doctorType1 = sessionStorage.FacilityType;
                var obj = angular.fromJson(response.data);
                console.log("sexy " + obj);
//                $scope.records = obj;
//                console.log("aksnans" + $scope.records);
                //for array issue
                
                
                   
                
                
                var district_report=null;
                var district=null;
                report = null;
                angular.forEach(obj,function(value,key){
                	console.log("type akdma "+ value.hospitalType)
                	if(value.hospitalType === "dhc" && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3)){
                		console.log("inside dhc");
                		district_report = value.hospital_report;
                		console.log("district_report "+ district_report);
                		district = this;
                	}else if(value.hospitalType === "dhc" && value.reportStatus!=0 && value.hospital_report.flag_status == 1){
                		district_report = null;
                	}else if(value.hospitalType === "dhc" && value.reportStatus == 0){
                		district_report = null;
                	}
                	else if(district_report != null && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3)){
                		console.log("inside other");
                		report = value.hospital_report;
                		console.log("value "+ value.hospital_report);
                		console.log("report dkamsd "+ report);
                		district_report.old_smd_male += report.old_smd_male;
                		district_report.old_smd_female += report.old_smd_female;
                		district_report.new_smd_male += report.new_smd_male;
                		district_report.new_smd_female += report.new_smd_female;
                		
                		district_report.old_cmd_male += report.old_cmd_male;
                		district_report.old_cmd_female += report.old_cmd_female;
                		district_report.new_cmd_male += report.new_cmd_male;
                		district_report.new_cmd_female += report.new_cmd_female;
                		
                		
                		district_report.old_alcohal_male += report.old_alcohal_male;
                		district_report.old_alcohal_female += report.old_alcohal_female;
                		district_report.new_alcohal_male += report.new_alcohal_male;
                		district_report.new_alcohal_female += report.new_alcohal_female;
                		
                		district_report.old_male_reffered_to_highercenters += report.old_male_reffered_to_highercenters;
                		district_report.old_female_reffered_to_highercenters += report.old_female_reffered_to_highercenters;
                		district_report.new_male_reffered_to_highercenters += report.new_male_reffered_to_highercenters;
                		district_report.new_female_reffered_to_highercenters += report.new_female_reffered_to_highercenters;
               
                		
                		district_report.old_psychiatricdisorders_male += report.old_psychiatricdisorders_male;
                		district_report.old_psychiatricdisorders_female += report.old_psychiatricdisorders_female;
                		district_report.new_psychiatricdisorders_male += report.new_psychiatricdisorders_male;
                		district_report.new_psychiatricdisorders_female += report.new_psychiatricdisorders_female;

                		
                		district_report.old_male_suicidecases += report.old_male_suicidecases;
                		district_report.old_female_suicidecases += report.old_female_suicidecases;
                		district_report.new_male_suicidecases += report.new_male_suicidecases;
                		district_report.new_female_suicidecases += report.new_female_suicidecases;

                		//new other fields
                		district_report.new_o1_male += report.new_o1_male;
                		district_report.new_o1_female += report.new_o1_female
                		district_report.old_o1_male += report.old_o1_male
                		district_report.old_o1_female += report.old_o1_female
                		
                		

                		district_report.new_o2_male += report.new_o2_male;
                		district_report.new_o2_female += report.new_o2_female
                		district_report.old_o2_male += report.old_o2_male
                		district_report.old_o2_female += report.old_o2_female
                		
                		

                		district_report.new_o3_male += report.new_o3_male;
                		district_report.new_o3_female += report.new_o3_female
                		district_report.old_o3_male += report.old_o3_male
                		district_report.old_o3_female += report.old_o3_female
                		
                		

                		district_report.new_o4_male += report.new_o4_male;
                		district_report.new_o4_female += report.new_o4_female
                		district_report.old_o4_male += report.old_o4_male
                		district_report.old_o4_female += report.old_o4_female
                		
                		

                		district_report.new_o5_male += report.new_o5_male;
                		district_report.new_o5_female += report.new_o5_female
                		district_report.old_o5_male += report.old_o5_male
                		district_report.old_o5_female += report.old_o5_female

                	}
                	
                	if(district_report != null){
                		district.hospital_report = district_report;
                	}
                });
                
                var filteredObj = [];
                
                angular.forEach(obj,function(value,key){
                	if(value.hospitalType === "thc"){
                		console.log("Rs " + value.reportStatus);
                		if(value.reportStatus == 1 && value.hospital_report.flag_status == 1){
//                			console.log("Hs "+ value.hospital_report.flag_status);
                			
                			value.hospital_report.old_smd_male = 0;
                    		value.hospital_report.old_smd_female = 0;
                    		value.hospital_report.new_smd_male = 0;
                    		value.hospital_report.new_smd_female = 0;
                    		
                    		value.hospital_report.old_cmd_male = 0;
                    		value.hospital_report.old_cmd_female = 0;
                    		value.hospital_report.new_cmd_male = 0;
                    		value.hospital_report.new_cmd_female = 0;
                    		
                    		
                    		value.hospital_report.old_alcohal_male = 0;
                    		value.hospital_report.old_alcohal_female = 0;
                    		value.hospital_report.new_alcohal_male = 0;
                    		value.hospital_report.new_alcohal_female = 0;
                    		
                    		value.hospital_report.old_male_reffered_to_highercenters = 0;
                    		value.hospital_report.old_female_reffered_to_highercenters = 0;
                    		value.hospital_report.new_male_reffered_to_highercenters = 0;
                    		value.hospital_report.new_female_reffered_to_highercenters = 0;
                   
                    		
                    		value.hospital_report.old_psychiatricdisorders_male = 0;
                    		value.hospital_report.old_psychiatricdisorders_female = 0;
                    		value.hospital_report.new_psychiatricdisorders_male = 0;
                    		value.hospital_report.new_psychiatricdisorders_female = 0;

                    		
                    		value.hospital_report.old_male_suicidecases = 0;
                    		value.hospital_report.old_female_suicidecases = 0;
                    		value.hospital_report.new_male_suicidecases = 0;
                    		value.hospital_report.new_female_suicidecases = 0;
                    		
                    		//new other fields
                    		
                    		value.hospital_report.new_o1_male = 0;
                    		value.hospital_report.new_o1_female = 0;
                    		value.hospital_report.old_o1_male = 0;
                    		value.hospital_report.old_o1_female = 0;
                    		
                    		

                    		value.hospital_report.new_o2_male = 0;
                    		value.hospital_report.new_o2_female = 0;
                    		value.hospital_report.old_o2_male = 0;
                    		value.hospital_report.old_o2_female = 0;
                    		
                    		

                    		value.hospital_report.new_o3_male = 0;
                    		value.hospital_report.new_o3_female = 0;
                    		value.hospital_report.old_o3_male = 0;
                    		value.hospital_report.old_o3_female = 0;
                    		
                    		

                    		value.hospital_report.new_o4_male = 0;
                    		value.hospital_report.new_o4_female = 0;
                    		value.hospital_report.old_o4_male = 0;
                    		value.hospital_report.old_o4_female = 0;
                    		
                    		

                    		value.hospital_report.new_o5_male = 0;
                    		value.hospital_report.new_o5_female = 0;
                    		value.hospital_report.old_o5_male = 0;
                    		value.hospital_report.old_o5_female = 0;
                    		
                		}
                		
                		this.push(value);
                	}
                }, filteredObj);
             
                console.log("filtered "+ filteredObj);
                $scope.records = filteredObj;
                
                var index = 0;
                
                
                
                angular.forEach(filteredObj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined) {
                    	
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
                        
                        
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);

                    }
                    index = index + 1;
                });
                
                
                
                
                console.log("table data push " + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < $scope.hospitalName_array.length; i++) {
                	console.log($scope.hospitalName_array[i]+" hospital name")
                	
                    $scope.tableData[i]={
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                }
//                
//                for(i=0; i < $scope.hospitalName_array.length; i++){
//                	$scope.tableData[i] = {
//                			'No of SMD cases':{
//                				'New cases':{
//                					'male': $scope.form_SDM_New_Male_array[i],
//                					'female':$scope.form_SDM_New_Female_array[i]
//                						
//                				},
//                				'Old cases':{
//                					'male': $scope.form_SDM_Old_Male_array[i],
//                					'female':$scope.form_SDM_Old_Female_array[i]
//                					
//                				}
//                			}
//                	};
//                }
            }
        }, function errorCallback(response) {
        	console.log("In error block");
//            console.log(form_submitted_status);
        });
    });
    
    
    $scope.selectedhospital = function($event, $index) {
        console.log("hello" + $index);
        console.log($scope.records[$index]);
		//alert($scope.records[$index]);
        //console.log(recorddata);
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        console.log(action);
        if (action === 'remove') {
            $scope.form_SDM_Old_Male -= $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female -= $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male -= $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female -= $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male -= $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female -= $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male -= $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female -= $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male -= $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female -= $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male -= $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female -= $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male -= $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female -= $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male -= $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female -= $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male -= $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female -= $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male -= $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female -= $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male -= $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female -= $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male -= $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female -= $scope.form_Sucide_New_Female_array[$index];
        } else //add
        {
            $scope.form_SDM_Old_Male += $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female += $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male += $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female += $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male += $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female += $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male += $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female += $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male += $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female += $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male += $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female += $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male += $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female += $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male += $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female += $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male += $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female += $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male += $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female += $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male += $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female += $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male += $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female += $scope.form_Sucide_New_Female_array[$index];
        }
    }
    //chart function
    /* 
     * 
     * $scope.show = false;
     
     var self = $scope;
     
     $scope.chartFunction = function() {
         $scope.show = !$scope.show;
         if ($scope.show) {
             $scope.labels = ['SMD cases', 'CMD cases', 'Alcohol/Drug abuse Cases', 'cases referred to Higher centers', 'Cases of Suicide reported', 'Other Psychiatric disorders treated'];
             $scope.series = ['Male', 'Female'];
             $scope.data = [
                 [$scope.form_SDM_New_Male+$scope.form_SDM_Old_Male, $scope.form_CMD_New_Male+$scope.form_CMD_Old_Male,$scope.form_A_D_New_Male+
                     $scope.form_A_D_Old_Male,$scope.form_HC_New_Male+$scope.form_HC_Old_Male,$scope.form_Sucide_New_Male+$scope.form_Sucide_Old_Male,
                     $scope.form_PsyDis_New_Male+$scope.form_PsyDis_Old_Male
                 ],
                 [$scope.form_SDM_New_Female+$scope.form_SDM_Old_Female, 
                 	$scope.form_CMD_New_Female+$scope.form_CMD_Old_Female, 
                 	$scope.form_A_D_New_Female+$scope.form_A_D_Old_Female, 
                 	$scope.form_HC_New_Female+$scope.form_HC_Old_Female, 
                 	$scope.form_Sucide_New_Female+$scope.form_Sucide_Old_Female,
                     $scope.form_PsyDis_New_Female+$scope.form_PsyDis_Old_Female
                 ]
             ];
             $scope.ColorBar = ["#141692", "#FF5733"];
         }
     }
     
     */
    //report format generate code        
    $scope.getHeader = function() {
        return ['Hospital Name', 'Hospital Type', 'new SMD cases male', 'new SMD cases female', 'old SMD cases male', 'old SMD cases female', 'new CMD cases male',
            'new CMD cases female', 'old CMD cases male', 'old CMD cases female', 'new Alcohol/Drug abuse Cases male', 'new Alcohol/Drug abuse Cases female',
            'old Alcohol/Drug abuse Cases male', 'old Alcohol/Drug abuse Cases female', 'During the Month cases referred to Higher centers male',
            'During the Month cases referred to Higher centers female', 'Cumulative cases referred to Higher centers male', 'Cumulative cases referred to Higher centers female',
            'During the Month Cases of Suicide reported male', 'During the Month Cases of Suicide reported female', 'Cumulative Cases of Suicide reported male',
            'Cumulative Cases of Suicide reported female', 'Other Psychiatric disorders treated new cases male', 'Other Psychiatric disorders treated new cases female',
            'Other Psychiatric disorders treated  old cases male', 'Other Psychiatric disorders treated old cases female',
        ]
        
        
        
    };
    console.log("length " + $scope.hospitalName_array.length);
    
    //loop to iterate data
});





//dhc controller end










app.controller("cumulativecontroller", function($scope, $http, $rootScope, Excel, $timeout) {
    console.log("This is cumulative controler");
    
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
		$scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
		$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
	
	
    /*$scope.loginpage = function ()
	{
		console.log("I am at cummulative")
		$location.path('/login');
	}*/
    
//  console.log($rootScope.mydata);
    $scope.form_SDM_Old_Male = 0;
    $scope.form_SDM_Old_Female = 0;
    $scope.form_SDM_New_Male = 0;
    $scope.form_SDM_New_Female = 0;
    $scope.form_CMD_Old_Male = 0;
    $scope.form_CMD_Old_Female = 0;
    $scope.form_CMD_New_Male = 0;
    $scope.form_CMD_New_Female = 0;
    $scope.form_A_D_Old_Male = 0;
    $scope.form_A_D_Old_Female = 0;
    $scope.form_A_D_New_Male = 0;
    $scope.form_A_D_New_Female = 0;
    $scope.form_HC_Old_Male = 0;
    $scope.form_HC_Old_Female = 0;
    $scope.form_HC_New_Male = 0;
    $scope.form_HC_New_Female = 0;
    $scope.form_PsyDis_Old_Male = 0;
    $scope.form_PsyDis_Old_Female = 0;
    $scope.form_PsyDis_New_Male = 0;
    $scope.form_PsyDis_New_Female = 0;
    $scope.form_Sucide_Old_Male = 0;
    $scope.form_Sucide_Old_Female = 0;
    $scope.form_Sucide_New_Male = 0;
    $scope.form_Sucide_New_Female = 0;
    
    //others fields
    $scope.form_o1_New_Male = 0;
    $scope.form_o1_New_Female = 0;
    $scope.form_o1_Old_Male = 0;
    $scope.form_o1_Old_Female = 0;
    
    $scope.form_o2_New_Male = 0;
    $scope.form_o2_New_Female = 0;
    $scope.form_o2_Old_Male = 0;
    $scope.form_o2_Old_Female = 0;
    
    $scope.form_o3_New_Male = 0;
    $scope.form_o3_New_Female = 0;
    $scope.form_o3_Old_Male = 0;
    $scope.form_o3_Old_Female = 0;
    
    $scope.form_others_New_Male = 0;
    $scope.form_others_New_Female = 0;
    $scope.form_others_Old_Male = 0;
    $scope.form_others_Old_Female = 0;
    
   
    //array
    $scope.hospitalName_array = [];
    $scope.hospitalType_array = [];
    $scope.form_SDM_Old_Male_array = [];
    $scope.form_SDM_Old_Female_array = [];
    $scope.form_SDM_New_Male_array = [];
    $scope.form_SDM_New_Female_array = [];
    $scope.form_CMD_Old_Male_array = [];
    $scope.form_CMD_Old_Female_array = [];
    $scope.form_CMD_New_Male_array = [];
    $scope.form_CMD_New_Female_array = [];
    $scope.form_A_D_Old_Male_array = [];
    $scope.form_A_D_Old_Female_array = [];
    $scope.form_A_D_New_Male_array = [];
    $scope.form_A_D_New_Female_array = [];
    $scope.form_HC_Old_Male_array = [];
    $scope.form_HC_Old_Female_array = [];
    $scope.form_HC_New_Male_array = [];
    $scope.form_HC_New_Female_array = [];
    $scope.form_PsyDis_Old_Male_array = [];
    $scope.form_PsyDis_Old_Female_array = [];
    $scope.form_PsyDis_New_Male_array = [];
    $scope.form_PsyDis_New_Female_array = [];
    $scope.form_Sucide_Old_Male_array = [];
    $scope.form_Sucide_Old_Female_array = [];
    $scope.form_Sucide_New_Male_array = [];
    $scope.form_Sucide_New_Female_array = [];
   
    //others fields array
    $scope.form_o1_New_Male_array = [];
    $scope.form_o1_New_Female_array = [];
    $scope.form_o1_Old_Male_array = [];
    $scope.form_o1_Old_Female_array = [];
    
    $scope.form_o2_New_Male_array = [];
    $scope.form_o2_New_Female_array = [];
    $scope.form_o2_Old_Male_array = [];
    $scope.form_o2_Old_Female_array = [];
    
    $scope.form_o3_New_Male_array = [];
    $scope.form_o3_New_Female_array = [];
    $scope.form_o3_Old_Male_array = [];
    $scope.form_o3_Old_Female_array = [];
    
    $scope.form_others_New_Male_array = [];
    $scope.form_others_New_Female_array = [];
    $scope.form_others_Old_Male_array = [];
    $scope.form_others_Old_Female_array = [];
   
    
    //
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
    
    
    //ng-change starts here : 
    
    
    
    
    function initialize()
   {
        $scope.form_SDM_Old_Male = 0;
        $scope.form_SDM_Old_Female = 0;
        $scope.form_SDM_New_Male = 0;
        $scope.form_SDM_New_Female = 0;
        $scope.form_CMD_Old_Male = 0;
        $scope.form_CMD_Old_Female = 0;
        $scope.form_CMD_New_Male = 0;
        $scope.form_CMD_New_Female = 0;
        $scope.form_A_D_Old_Male = 0;
        $scope.form_A_D_Old_Female = 0;
        $scope.form_A_D_New_Male = 0;
        $scope.form_A_D_New_Female = 0;
        $scope.form_HC_Old_Male = 0;
        $scope.form_HC_Old_Female = 0;
        $scope.form_HC_New_Male = 0;
        $scope.form_HC_New_Female = 0;
        $scope.form_PsyDis_Old_Male = 0;
        $scope.form_PsyDis_Old_Female = 0;
        $scope.form_PsyDis_New_Male = 0;
        $scope.form_PsyDis_New_Female = 0;
        $scope.form_Sucide_Old_Male = 0;
        $scope.form_Sucide_Old_Female = 0;
        $scope.form_Sucide_New_Male = 0;
        $scope.form_Sucide_New_Female = 0;
       
        //others fields
        $scope.form_o1_New_Male = 0;
        $scope.form_o1_New_Female = 0;
        $scope.form_o1_Old_Male = 0;
        $scope.form_o1_Old_Female = 0;
        
        $scope.form_o2_New_Male = 0;
        $scope.form_o2_New_Female = 0;
        $scope.form_o2_Old_Male = 0;
        $scope.form_o2_Old_Female = 0;
        
        $scope.form_o3_New_Male = 0;
        $scope.form_o3_New_Female = 0;
        $scope.form_o3_Old_Male = 0;
        $scope.form_o3_Old_Female = 0;
        
        $scope.form_others_New_Male = 0;
        $scope.form_others_New_Female = 0;
        $scope.form_others_Old_Male = 0;
        $scope.form_others_Old_Female = 0;
        
       
   }
    
   
    
    
  
            

    $scope.changemonth = function(month) {
    		
    	initialize();
    	
    	$scope.records="";
    
    	
        console.log("I am at cummulative mnth change ");
        var obj = $rootScope.mydata;	
        $scope.title = sessionStorage.hospitalName + " HOSPITAL ";
        $scope.disabledemo = "true";
        console.log("my data : ")
        console.log(obj);
        
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
        
		     
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
			
            if (response != null && response.status != 204) {
            	
            
                console.log("cummulavtive data :");
                console.log("kdnasnkfn" + response);
                var obj = angular.fromJson(response.data);
                console.log("records " + obj);
                $scope.records = obj;
                //for array issue
                var index = 0;
                angular.forEach(obj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined && (report.flag_status == 2 ||report.flag_status == 3||report.flag_status == 4)) {
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
                    
                        //other fields 
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);
                    
                    
                    }
                    index = index + 1;
                });
                console.log("length new zbczb" + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < 1; i++) {
                    $scope.tableData[i] = {
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                  //  alert(hospitalName_array[i]);
                    
                }
            }
        }, function errorCallback(response) {
//            console.log(form_submitted_status);
        });
    
    }  	
        	
           
    
    
    angular.element(document).ready(function() {
    	
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhpUP';

        $scope.records="";
        
        console.log("I am at cummulative report  ");
        var obj = $rootScope.mydata;	
        $scope.title = sessionStorage.hospitalName + " HOSPITAL ";
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
        $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
//        alert("ssss" + sessionStorage.ReportingDate);
        var date = sessionStorage.ReportingDate;
        var mon = date.split("-")[1]-1;
        var year = date.split("-")[2];
        if(mon<10)
		{
			  var month = year + "-" + "0" + mon + "-01";
			
		}
		else{
			  var month = year + "-" + mon + "-01";
			
		}
        
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            if (response != null && response.status != 204) {
                console.log("cummulavtive data :");
                console.log("erpspdsdp" + response);
                $rootScope.doctorName = sessionStorage.Admname;
				$rootScope.doctorType1 = sessionStorage.FacilityType;
                var obj = angular.fromJson(response.data);
                console.log(obj);
                $scope.records = obj;
                //for array issue
                var index = 0;
                
                
                angular.forEach(obj, function(value, key) {
                    var report = value.hospital_report;
                    var hospitalName = value.hospitalName;
                    var hospitalType = value.hospitalType;
                    if (report != undefined && (report.flag_status == 2|| report.flag_status == 3|| report.flag_status == 4)) {
                    	//alert(report.flag_status);
                        //hospital name and type
                        $scope.hospitalName_array[index] = hospitalName;
                        $scope.hospitalType_array[index] = (hospitalType);
                        $scope.form_SDM_Old_Male += report.old_smd_male;
                        $scope.form_SDM_Old_Female += report.old_smd_female;
                        $scope.form_SDM_New_Male += report.new_smd_male;
                        $scope.form_SDM_New_Female += report.new_smd_female;
                        //array
                        $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                        $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                        $scope.form_SDM_New_Male_array[index] = (report.new_smd_male);
                        $scope.form_SDM_New_Female_array[index] = (report.new_smd_female);
                        $scope.form_CMD_Old_Male += report.old_cmd_male;
                        $scope.form_CMD_Old_Female += report.old_cmd_female;
                        $scope.form_CMD_New_Male += report.new_cmd_male;
                        $scope.form_CMD_New_Female += report.new_cmd_female;
                        //array
                        $scope.form_CMD_Old_Male_array[index] = (report.old_cmd_male);
                        $scope.form_CMD_Old_Female_array[index] = (report.old_cmd_female);
                        $scope.form_CMD_New_Male_array[index] = (report.new_cmd_male);
                        $scope.form_CMD_New_Female_array[index] = (report.new_cmd_female);
                        $scope.form_A_D_Old_Male += report.old_alcohal_male;
                        $scope.form_A_D_Old_Female += report.old_alcohal_female;
                        $scope.form_A_D_New_Male += report.new_alcohal_male;
                        $scope.form_A_D_New_Female += report.new_alcohal_female;
                        //array
                        $scope.form_A_D_Old_Male_array[index] = (report.old_alcohal_male);
                        $scope.form_A_D_Old_Female_array[index] = (report.old_alcohal_female);
                        $scope.form_A_D_New_Male_array[index] = (report.new_alcohal_male);
                        $scope.form_A_D_New_Female_array[index] = (report.new_alcohal_female);
                        $scope.form_HC_Old_Male += report.old_male_reffered_to_highercenters;
                        $scope.form_HC_Old_Female += report.old_female_reffered_to_highercenters;
                        $scope.form_HC_New_Male += report.new_male_reffered_to_highercenters;
                        $scope.form_HC_New_Female += report.new_female_reffered_to_highercenters;
                        //array
                        $scope.form_HC_Old_Male_array[index] = (report.old_male_reffered_to_highercenters);
                        $scope.form_HC_Old_Female_array[index] = (report.old_female_reffered_to_highercenters);
                        $scope.form_HC_New_Male_array[index] = (report.new_male_reffered_to_highercenters);
                        $scope.form_HC_New_Female_array[index] = (report.new_female_reffered_to_highercenters);
                        $scope.form_PsyDis_Old_Male += (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female += report.old_psychiatricdisorders_female;
                        $scope.form_PsyDis_New_Male += report.new_psychiatricdisorders_male;
                        $scope.form_PsyDis_New_Female += report.new_psychiatricdisorders_female;
                        //array
                        $scope.form_PsyDis_Old_Male_array[index] = (report.old_psychiatricdisorders_male);
                        $scope.form_PsyDis_Old_Female_array[index] = (report.old_psychiatricdisorders_female);
                        $scope.form_PsyDis_New_Male_array[index] = (report.new_psychiatricdisorders_male);
                        $scope.form_PsyDis_New_Female_array[index] = (report.new_psychiatricdisorders_female);
                        $scope.form_Sucide_Old_Male += report.old_male_suicidecases;
                        $scope.form_Sucide_Old_Female += report.old_female_suicidecases;
                        $scope.form_Sucide_New_Male += report.new_male_suicidecases;
                        $scope.form_Sucide_New_Female += report.new_female_suicidecases;
                        //array                            
                        $scope.form_Sucide_Old_Male_array[index] = (report.old_male_suicidecases);
                        $scope.form_Sucide_Old_Female_array[index] = (report.old_female_suicidecases);
                        $scope.form_Sucide_New_Male_array[index] = (report.new_male_suicidecases);
                        $scope.form_Sucide_New_Female_array[index] = (report.new_female_suicidecases);
                    
                        //others fields
                        $scope.form_o1_New_Male += report.new_o1_male;
                        $scope.form_o1_New_Female += report.new_o1_female;
                        $scope.form_o1_Old_Male += report.old_o1_male;
                        $scope.form_o1_Old_Female += report.old_o1_female;
                        $scope.form_o1_New_Male_array[index] = (report.new_o1_male);
                        $scope.form_o1_New_Female_array[index] = (report.new_o1_female);
                        $scope.form_o1_Old_Male_array[index] = (report.old_o1_male);
                        $scope.form_o1_Old_Female_array[index] = (report.old_o1_female);
                        
                        $scope.form_o2_New_Male += report.new_o2_male;
                        $scope.form_o2_New_Female += report.new_o2_female;
                        $scope.form_o2_Old_Male += report.old_o2_male;
                        $scope.form_o2_Old_Female += report.old_o2_female;
                        $scope.form_o2_New_Male_array[index] = (report.new_o2_male);
                        $scope.form_o2_New_Female_array[index] = (report.new_o2_female);
                        $scope.form_o2_Old_Male_array[index] = (report.old_o2_male);
                        $scope.form_o2_Old_Female_array[index] = (report.old_o2_female);
                        
                        $scope.form_o3_New_Male += report.new_o3_male;
                        $scope.form_o3_New_Female += report.new_o3_female;
                        $scope.form_o3_Old_Male += report.old_o3_male;
                        $scope.form_o3_Old_Female += report.old_o3_female;
                        $scope.form_o3_New_Male_array[index] = (report.new_o3_male);
                        $scope.form_o3_New_Female_array[index] = (report.new_o3_female);
                        $scope.form_o3_Old_Male_array[index] = (report.old_o3_male);
                        $scope.form_o3_Old_Female_array[index] = (report.old_o3_female);
                        
                        $scope.form_others_New_Male += (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female += (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male += (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female += (report.old_o4_female+report.old_o5_female);
                        $scope.form_others_New_Male_array[index] = (report.new_o4_male+report.new_o5_male);
                        $scope.form_others_New_Female_array[index] = (report.new_o4_female+report.new_o5_female);
                        $scope.form_others_Old_Male_array[index] = (report.old_o4_male+report.old_o5_male);
                        $scope.form_others_Old_Female_array[index] = (report.old_o4_female+report.old_o5_female);
                    
                    }
                    index = index + 1;
                });
                
                
                
                
                console.log("table data push " + $scope.hospitalName_array.length);
                //$scope.hospitalName_array.length;
                for (i = 0; i < 1; i++) {
                	console.log($scope.hospitalName_array[i]+" hospital name")
                	
                    $scope.tableData[i]={
                        'Hospital Name': $scope.hospitalName_array[i],
                        'Hospital Type': $scope.hospitalType_array[i],
                        'new SMD cases male': $scope.form_SDM_New_Male_array[i],
                        'new SMD cases female': $scope.form_SDM_New_Female_array[i],
                        'old SMD cases male': $scope.form_SDM_Old_Male_array[i],
                        'old SMD cases female': $scope.form_SDM_Old_Female_array[i],
                        'new CMD cases male': $scope.form_CMD_New_Male_array[i],
                        'new CMD cases female': $scope.form_CMD_New_Female_array[i],
                        'old CMD cases male': $scope.form_CMD_Old_Male_array[i],
                        'old CMD cases female': $scope.form_CMD_Old_Female_array[i],
                        'new Alcohol/Drug abuse Cases male': $scope.form_A_D_New_Male_array[i],
                        'new Alcohol/Drug abuse Cases female': $scope.form_A_D_New_Female_array[i],
                        'old Alcohol/Drug abuse Cases male': $scope.form_A_D_Old_Male_array[i],
                        'old Alcohol/Drug abuse Cases female': $scope.form_A_D_Old_Female_array[i],
                        'During the Month cases referred to Higher centers male': $scope.form_HC_New_Male_array[i],
                        'During the Month cases referred to Higher centers female': $scope.form_HC_New_Female_array[i],
                        'Cumulative cases referred to Higher centers male': $scope.form_HC_Old_Male_array[i],
                        'Cumulative cases referred to Higher centers female': $scope.form_HC_Old_Female_array[i],
                        'During the Month Cases of Suicide reported male': $scope.form_Sucide_New_Male_array[i],
                        'During the Month Cases of Suicide reported female': $scope.form_Sucide_New_Female_array[i],
                        'Cumulative Cases of Suicide reported male': $scope.form_Sucide_Old_Male_array[i],
                        'Cumulative Cases of Suicide reported female': $scope.form_Sucide_Old_Female_array[i],
                        'Other Psychiatric disorders treated new cases male': $scope.form_PsyDis_New_Male_array[i],
                        'Other Psychiatric disorders treated new cases female': $scope.form_PsyDis_New_Female_array[i],
                        'Other Psychiatric disorders treated  old cases male': $scope.form_PsyDis_Old_Male_array[i],
                        'Other Psychiatric disorders treated old cases female': $scope.form_PsyDis_Old_Female_array[i]
                    };
                    console.log("male count" + $scope.hospitalName_array[i]);
                }
            }
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    });
    
    
    $scope.selectedhospital = function($event, $index) {
        console.log("hello" + $index);
        console.log($scope.records[$index]);
        //console.log(recorddata);
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        console.log(action);
        if (action === 'remove') {
            $scope.form_SDM_Old_Male -= $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female -= $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male -= $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female -= $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male -= $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female -= $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male -= $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female -= $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male -= $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female -= $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male -= $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female -= $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male -= $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female -= $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male -= $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female -= $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male -= $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female -= $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male -= $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female -= $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male -= $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female -= $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male -= $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female -= $scope.form_Sucide_New_Female_array[$index];
            
            $scope.form_o1_New_Male -= $scope.form_o1_New_Male_array[$index];
            $scope.form_o1_New_Female -= $scope.form_o1_New_Female_array[$index];
            $scope.form_o1_Old_Male -= $scope.form_o1_Old_Male_array[$index];
            $scope.form_o1_Old_Female -= $scope.form_o1_Old_Female_array[$index];
            
            $scope.form_o2_New_Male -= $scope.form_o2_New_Male_array[$index];
            $scope.form_o2_New_Female -= $scope.form_o2_New_Female_array[$index];
            $scope.form_o2_Old_Male -= $scope.form_o2_Old_Male_array[$index];
            $scope.form_o2_Old_Female -= $scope.form_o2_Old_Female_array[$index];
            
            $scope.form_o3_New_Male -= $scope.form_o3_New_Male_array[$index];
            $scope.form_o3_New_Female -= $scope.form_o3_New_Female_array[$index];
            $scope.form_o3_Old_Male -= $scope.form_o3_Old_Male_array[$index];
            $scope.form_o3_Old_Female -= $scope.form_o3_Old_Female_array[$index];
            
            $scope.form_others_New_Male -= $scope.form_others_New_Male_array[$index];
            $scope.form_others_New_Female -= $scope.form_others_New_Female_array[$index];
            $scope.form_others_Old_Male -= $scope.form_others_Old_Male_array[$index];
            $scope.form_others_Old_Female -= $scope.form_others_Old_Female_array[$index];
            
            
        } else //add
        {
            $scope.form_SDM_Old_Male += $scope.form_SDM_Old_Male_array[$index];
            $scope.form_SDM_Old_Female += $scope.form_SDM_Old_Female_array[$index];
            $scope.form_SDM_New_Male += $scope.form_SDM_New_Male_array[$index];
            $scope.form_SDM_New_Female += $scope.form_SDM_New_Female_array[$index];
            $scope.form_CMD_Old_Male += $scope.form_CMD_Old_Male_array[$index];
            $scope.form_CMD_Old_Female += $scope.form_CMD_Old_Female_array[$index];
            $scope.form_CMD_New_Male += $scope.form_CMD_New_Male_array[$index];
            $scope.form_CMD_New_Female += $scope.form_CMD_New_Female_array[$index];
            $scope.form_A_D_Old_Male += $scope.form_A_D_Old_Male_array[$index];
            $scope.form_A_D_Old_Female += $scope.form_A_D_Old_Female_array[$index];
            $scope.form_A_D_New_Male += $scope.form_A_D_New_Male_array[$index];
            $scope.form_A_D_New_Female += $scope.form_A_D_New_Female_array[$index];
            $scope.form_HC_Old_Male += $scope.form_HC_Old_Male_array[$index];
            $scope.form_HC_Old_Female += $scope.form_HC_Old_Female_array[$index];
            $scope.form_HC_New_Male += $scope.form_HC_New_Male_array[$index];
            $scope.form_HC_New_Female += $scope.form_HC_New_Female_array[$index];
            $scope.form_PsyDis_Old_Male += $scope.form_PsyDis_Old_Male_array[$index];
            $scope.form_PsyDis_Old_Female += $scope.form_PsyDis_Old_Female_array[$index];
            $scope.form_PsyDis_New_Male += $scope.form_PsyDis_New_Male_array[$index];
            $scope.form_PsyDis_New_Female += $scope.form_PsyDis_New_Female_array[$index];
            $scope.form_Sucide_Old_Male += $scope.form_Sucide_Old_Male_array[$index];
            $scope.form_Sucide_Old_Female += $scope.form_Sucide_Old_Female_array[$index];
            $scope.form_Sucide_New_Male += $scope.form_Sucide_New_Male_array[$index];
            $scope.form_Sucide_New_Female += $scope.form_Sucide_New_Female_array[$index];
            
            $scope.form_o1_New_Male += $scope.form_o1_New_Male_array[$index];
            $scope.form_o1_New_Female += $scope.form_o1_New_Female_array[$index];
            $scope.form_o1_Old_Male += $scope.form_o1_Old_Male_array[$index];
            $scope.form_o1_Old_Female += $scope.form_o1_Old_Female_array[$index];
            
            $scope.form_o2_New_Male += $scope.form_o2_New_Male_array[$index];
            $scope.form_o2_New_Female += $scope.form_o2_New_Female_array[$index];
            $scope.form_o2_Old_Male += $scope.form_o2_Old_Male_array[$index];
            $scope.form_o2_Old_Female += $scope.form_o2_Old_Female_array[$index];
            
            $scope.form_o3_New_Male += $scope.form_o3_New_Male_array[$index];
            $scope.form_o3_New_Female += $scope.form_o3_New_Female_array[$index];
            $scope.form_o3_Old_Male += $scope.form_o3_Old_Male_array[$index];
            $scope.form_o3_Old_Female += $scope.form_o3_Old_Female_array[$index];
            
            $scope.form_others_New_Male += $scope.form_others_New_Male_array[$index];
            $scope.form_others_New_Female += $scope.form_others_New_Female_array[$index];
            $scope.form_others_Old_Male += $scope.form_others_Old_Male_array[$index];
            $scope.form_others_Old_Female += $scope.form_others_Old_Female_array[$index];
        }
    }
    //chart function
    /* 
     * 
     * $scope.show = false;
     
     var self = $scope;
     
     $scope.chartFunction = function() {
         $scope.show = !$scope.show;
         if ($scope.show) {
             $scope.labels = ['SMD cases', 'CMD cases', 'Alcohol/Drug abuse Cases', 'cases referred to Higher centers', 'Cases of Suicide reported', 'Other Psychiatric disorders treated'];
             $scope.series = ['Male', 'Female'];
             $scope.data = [
                 [$scope.form_SDM_New_Male+$scope.form_SDM_Old_Male, $scope.form_CMD_New_Male+$scope.form_CMD_Old_Male,$scope.form_A_D_New_Male+
                     $scope.form_A_D_Old_Male,$scope.form_HC_New_Male+$scope.form_HC_Old_Male,$scope.form_Sucide_New_Male+$scope.form_Sucide_Old_Male,
                     $scope.form_PsyDis_New_Male+$scope.form_PsyDis_Old_Male
                 ],
                 [$scope.form_SDM_New_Female+$scope.form_SDM_Old_Female, 
                 	$scope.form_CMD_New_Female+$scope.form_CMD_Old_Female, 
                 	$scope.form_A_D_New_Female+$scope.form_A_D_Old_Female, 
                 	$scope.form_HC_New_Female+$scope.form_HC_Old_Female, 
                 	$scope.form_Sucide_New_Female+$scope.form_Sucide_Old_Female,
                     $scope.form_PsyDis_New_Female+$scope.form_PsyDis_Old_Female
                 ]
             ];
             $scope.ColorBar = ["#141692", "#FF5733"];
         }
     }
     
     */
    //report format generate code        
    $scope.getHeader = function() {
        return ['Hospital Name', 'Hospital Type', 'new SMD cases male', 'new SMD cases female', 'old SMD cases male', 'old SMD cases female', 'new CMD cases male',
            'new CMD cases female', 'old CMD cases male', 'old CMD cases female', 'new Alcohol/Drug abuse Cases male', 'new Alcohol/Drug abuse Cases female',
            'old Alcohol/Drug abuse Cases male', 'old Alcohol/Drug abuse Cases female', 'During the Month cases referred to Higher centers male',
            'During the Month cases referred to Higher centers female', 'Cumulative cases referred to Higher centers male', 'Cumulative cases referred to Higher centers female',
            'During the Month Cases of Suicide reported male', 'During the Month Cases of Suicide reported female', 'Cumulative Cases of Suicide reported male',
            'Cumulative Cases of Suicide reported female', 'Other Psychiatric disorders treated new cases male', 'Other Psychiatric disorders treated new cases female',
            'Other Psychiatric disorders treated  old cases male', 'Other Psychiatric disorders treated old cases female',
        ]
    };
    console.log("length " + $scope.hospitalName_array.length);
    $scope.tableData = [];
    //loop to iterate data
});


/*app.run(function($rootScope, $location, $route) {
	  $rootScope.$on('$locationChangeStart', function(event, next, current) {
	    var nextRoute = $route.routes[$location.path()];
	    var currentPath = current.split('#')[1];
	    if (nextRoute.restricted && nextRoute.restricted !== currentPath) {
	      $location.path('/');
	      alert('You are trying to reach a restricted page!!!!');
	    }
	  });
	});

*/

app.controller("logoutController", function($scope, $rootScope, $http, $location, $window) {
	
	console.log("I am at logout");
//	$scope.loginpage = function ()
//	{
//		$window.location.reload();
//		$location.path('/login');
//
//	}
	
	$window.location.reload();
	$location.path('/login');

	
//	delete $sessionStorage;
//    $location.path('/login');
	/*
	$scope.$on('$locationChangeStart', function(event, next, current){
        event.preventDefault();            
    });
*/
});


/*app.controller("dashboardController", function($scope) {
	var chartConfig = {
			   chart: {
			        type: 'column'
			    },

			    title: {
			        text: 'Total No of diseases'
			    },

			    xAxis: {
			        categories: ['SMD', 'CMD', 'Psh', 'SMD-2', 'CMD-2']
			    },

			    yAxis: {
			        allowDecimals: false,
			        min: 0,
			        title: {
			            text: 'Number Male and Female'
			        }
			    },

			    tooltip: {
			        formatter: function () {
			            return '<b>' + this.x + '</b><br/>' +
			                this.series.name + ': ' + this.y + '<br/>' +
			                'Total: ' + this.point.stackTotal;
			        }
			    },

			    plotOptions: {
			     column: {
			      stacking: 'normal',
			      dataLabels: {
			        enabled: true,
			        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
			      }
			    }
			    },
			    exporting: { enabled: false },
			    credits: { enabled: false },
			    series: [{
			        name: 'Old Male',
			        data: [5, 3, 4, 7, 2],
			        stack: 'Male'
			    }, 
			    {
			        name: 'Old Female',
			        data: [2, 5, 6, 2, 1],
			        stack: 'Male'
			    },{
			        name: 'New Male',
			        data: [3, 4, 4, 2, 5],
			        stack: 'Female'
			    }, {
			        name: 'New Female',
			        data: [3, 0, 4, 4, 3],
			        stack: 'Female'
			    }]
	      };
		$scope.chartConfig = chartConfig;
		
		$('#container').highcharts(chartConfig);	
	
});*/