//PatientDashboard


app.controller("stateadmincontroller", function($scope, $http, $rootScope,Excel,$timeout) {
   // console.log("This is state admin controler");
    $scope.tableData = [];	
	$rootScope.doctorName = sessionStorage.stateName;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
	console.log(sessionStorage.FacilityType);
	//alert("yes we r here11"+sessionStorage.FacilityType);
	
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

      
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/state_admin" + "?month=" + month,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            if (response != null && response.status != 204) {
            	
            	
                console.log("cummulavtive data :");
               // alert("hello"+month);
                console.log(response);
                var obj = angular.fromJson(response.data);
                console.log("akdjandfjksdnjfnksndfn " + obj);
//                $scope.records = obj;
                //for array issue

                
                var district_report=null;
                var district=null;
                report = null;
                
                angular.forEach(obj,function(value,key){
                	console.log("type akdma76767 "+ value.hospitalType)
                	if(value.hospitalType === "dhc" && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3) ){
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
                	else if(district_report != null && value.reportStatus!=0 && (value.hospital_report.flag_status == 2||value.hospital_report.flag_status == 3) ){
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
        $rootScope.projectName = 'dmhp';

    	
        console.log("I am at cumulative state report  ");
        var obj = $rootScope.mydata;	
        $scope.title = "State: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
//        $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
        var date = sessionStorage.ReportingDate;
//        ////alert("sss " + date );
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
                	console.log("type akdma898989 "+ value.hospitalType)
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
		//////alert($scope.records[$index]);
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


//DHC Dashboard.....!
app.controller("dhcadmincontroller", function($scope, $http, $rootScope,Excel,$timeout) {
//alert("This is DHC admin controler");
    $scope.tableData = [];
    $rootScope.doctorName = sessionStorage.Admname;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
	
	//alert($rootScope.doctorName+"   "+$rootScope.doctorType1);
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
    
    
    //sessionStorage.ReportingMonth
    $scope.form_ReportingYear = sessionStorage.ReportingYear;
  // alert($scope.form_ReportingMonth);
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
    //alert($scope.form_ReportingMonth);
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
        // alert("we r here");
    	
        console.log("I am at cummulative mnth change ");
        var obj = $rootScope.mydata;
        console.log("Globale stae " + sessionStorage.stateName);
        $scope.title = "District: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        console.log("my data : ")
        console.log(obj);
        ////alert("District: " + sessionStorage.NameOfPharmacist);
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
      // ////alert("change month query "+ month);
      //  alert("this one what we want111"+month);
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/doctor" + "?month=" + month+"&hospital_id="+sessionStorage.hospitalID,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            if (response != null && response.status != 204) {
            	//alert("this one what we want"+month);
            //	////alert("we r here");
                ////alert("cummulavtive Dashboard :");
                console.log(response);
                var obj = angular.fromJson(response.data);
                console.log("akdjandfjksdnjfnksndfn--DHC " + obj);
//                $scope.records = obj;
                //for array issue

                
                var district_report=null;
                var district=null;
                report = null;
                
                angular.forEach(obj,function(value,key){
                	console.log("type akdma121213 "+ value.hospitalType)
                	if((value.hospitalType === "thc" ||value.hospitalType === "dlp") && value.reportStatus!=0 && value.hospital_report.flag_status == 2){
                		console.log("inside dhc");
                		district_report = value.hospital_report;
                		console.log("district_report "+ district_report);
                		district = this;
                		
                	}else if((value.hospitalType === "thc" ||value.hospitalType === "dlp") && value.reportStatus != 0 && value.hospital_report.flag_status == 1){
                			district_report = null;  			
                	}
                	else if((value.hospitalType === "thc" ||value.hospitalType === "dlp") && value.reportStatus == 0){
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
                	if(value.hospitalType === "thc"||value.hospitalType === "dlp"){
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
        $rootScope.projectName = 'dmhp';

    	

        var obj = $rootScope.mydata;	
        $scope.title = "State: " + sessionStorage.stateName;
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
//      $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
        var date = sessionStorage.ReportingDate;
         
        var mon = date.split("-")[1];
        var year = date.split("-")[2];
      //  alert("sss " + mon );
        if(mon<10){
        	
        	 var month = year + "-" + mon + "-01";
        	// alert("less"+month);
        }else{
        	
        	 var month = year + "-" + mon + "-01";
        	// alert("more"+month);
        }
       
       // alert("I am at cumulative state report  "+mon);
       // ////alert("we r here"+ sessionStorage.hospitalID+"hello" );
        $http({
            //url: $rootScope.urlName + $rootScope.projectName + "/api/doctor?" + "month=" + month,
        	url: $rootScope.urlName + $rootScope.projectName + "/api/doctor?" + "month=" + month+"&hospital_id="+sessionStorage.hospitalID,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
        	console.log("Successful");
            if (response != null && response.status != 204) {
            	//////alert("we r here---1");
                console.log("fsfsfsummulavtive data :");
                console.log(response);
                $rootScope.doctorName = sessionStorage.Admname;
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
                	console.log("type akdma 343434"+ value.hospitalType)
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
                	if(value.hospitalType === "thc" || value.hospitalType === "dlp"){
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
		//////alert($scope.records[$index]);
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






