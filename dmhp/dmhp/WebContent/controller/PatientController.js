//PatientController
app.controller("Main", function($scope, $http, $rootScope) {
	
	
	$scope.loginpage = function ()
	{
		
		$location.path('/login');
	}
	
	
	 
    $scope.form_District = sessionStorage.districtName;
    $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
    $scope.form_ReportingDate = sessionStorage.ReportingDate;
    $scope.form_ReportingYear = sessionStorage.ReportingYear
    $scope.form_FacilityType = sessionStorage.FacilityType;
    $scope.form_hospitalName = sessionStorage.hospitalName;
    $scope.form_Admname = sessionStorage.Admname;
    $scope.form_NameOfPharmacist = sessionStorage.NameOfPharmacist; 
    var parts = sessionStorage.ReportingDate.split("-");
    $scope.form_DateOfReport = new Date(parts[2], parts[1]-1, parts[0]);
    $rootScope.doctorname = sessionStorage.NameOfPharmacist;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
    $rootScope.login_not_submitted = 1;
    $scope.hospitalName_array = [];
	$scope.hospitalId_array=[];
	$scope.form_thc_details = "";
	
	
	if($rootScope.doctorType1=="dlp"){///thclistfordlp
		
		   
			var monthNumber = $scope.form_DateOfReport.getMonth();
			$scope.form_ReportingYear = $scope.form_DateOfReport.getFullYear();
			
			
			var monthMapping = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			$scope.form_ReportingMonth = monthMapping[monthNumber];
			
		////////alert("dlp date is "+ $scope.form_ReportingMonth + " " + $scope.form_ReportingYear);
			
			
    		$http({
    			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType ,
    			method: "GET",
    			dataType: "json",
    		}).then(function(response) {
    			//////////////////alert("rohil");
    			var obj = angular.fromJson(response.data);
    			var index = 0;
    			var inp=[];
    			angular.forEach(obj, function(value, key) {     
    				var hospitalName = value.hospitalName; 
    				var hospitalId = value.hospital_id;
    				$scope.hospitalName_array[key]=hospitalName+'_'+hospitalId;    
    				index = index + 1;
    			});
        	
    		}, function errorCallback(response) {
        	 
        	 
    		});
    	 
    	 
    	}

	
    function fetchThcnames(){
    	if($rootScope.doctorType1=="dlp"){///thclistfordlp
    	//////////////////alert("1.. ");
    		
    		
    		$http({
    			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType ,
    			method: "GET",
    			dataType: "json",
    		}).then(function(response) {
    			//////////////////alert("rohil");
    			var obj = angular.fromJson(response.data);
    			var index = 0;
    			var inp=[];
    			angular.forEach(obj, function(value, key) {     
    				var hospitalName = value.hospitalName; 
    				var hospitalId = value.hospital_id;
    				$scope.hospitalName_array[key]=hospitalName+'_'+hospitalId;    
    				index = index + 1;
    			});
        	
             //////////////////alert("2..." + $scope.hospitalName_array);
             
    		 //$scope.form_thc_details = $scope.hospitalName_array[0];
             //////////////////alert($scope.form_thc_details);
    		}, function errorCallback(response) {
        	 
        	 //////////////////alert("login again");
        	 
    		});
    	 
    	 
    	}
    	
    	//////////////////alert("end");
    }
    
   if($rootScope.doctorType1 != 'dlp'){
  	   ////////////////alert("abcd.. "+ $scope.form_ReportingMonth);
  	   ////////////////alert("xyxd.. "+ $scope.form_ReportingYear);
	   var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    ////alert("we r here "+yyyy);
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    
//	    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    if(sessionStorage.ReportingYear == yyyy){
	    	
	        var inp=[];
	        var j=0;
	      //  ////////////////alert(mm);
	      	for(j=0;j<mm;j++){
	       		inp.push(Names[j]);
	       	}
	    //   ////////////////alert(inp);

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

	   
   }
        
   
   $scope.changeTHC = function(thc_name){
	   
	 //  $scope.Is_others_text_dis="true";
	   	date = $scope.form_DateOfReport;
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
		////////////alert("inside thc change "+ $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
	    	//	sessionStorage.hospitalID + "/reports/" + thc_name + "?type=" +
	    	//	sessionStorage.FacilityType+ "&date=" + dateString);

	   
	   
	   $http({
      	 	url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
   		sessionStorage.hospitalID + "/reports/" + thc_name + "?type=" +
   		sessionStorage.FacilityType+ "&date=" + dateString, 
      		method: "GET",
           dataType: "json",
          //contentType:"application/x-www-form-urlencoded"
      }).then(function(response) {
      	//////////////////alert("heresdx"+$scope.disablereport);
			//////////////////alert("sessionStorage.FacilityType"+sessionStorage.FacilityType);
      	//////////////////alert("inside change function");
      	//////////////////alert("doctor type " + $rootScope.doctorType1);
      	
      	
          console.log($scope.disablereport);
       //   $rootScope.doctorName = sessionStorage.Admname;
          console.log("doctor name" + $scope.form_Admname);
          if (response.status == 204) {
          	//////////////////alert("we r here");
          	////////////////alert("3...");
          	//console.log("No resposne");
        	  
        	  //typeof data text box
          
          	
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
              
              	
              $scope.form_TypeOfData="";
            
              
              $scope.no_of_houses_identified ="";
              $scope.no_of_patient_identified =""; 
              $scope.Is_others_text = "";
              
          	$scope.Is_others_text_dis="true";
         	 $scope.changeDataType = function(form_TypeOfData) {
    	    	if(form_TypeOfData == '3'){
    	    		$scope.Is_others_text_dis="";    		
    	    	}else{
    	    		$scope.Is_others_text_dis="true";	
    	    		$scope.Is_others_text=" ";
    	    	}
    	    }
              
              
          } else {
              console.log(response);
              ////////////////alert("4....");
              /*$scope.disablereport = true;
              $scope.submitDisabled = true;*/
              console.log("disable report" + $scope.disablereport + " response is ok");
              var obj = angular.fromJson(response.data);
              //populating the data 
              console.log("we r able to see DATA-------"+obj);
             // ////////////////alert("we r able to see DATA-------"+obj);
              //in the case when report has been submitted
              if( obj.flag_status == 2 ||obj.flag_status == 3 ){
              	//////////////////alert("kkkkk--"+ $scope.flag_status);
              	$scope.submitDisabled = true;
                  $scope.disablereport = true;
              	
              }else{
              	//in the case when  report has been saved
              	//////////////////alert("kkkkk--1"+ $scope.flag_status);
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
                  $scope.form_TypeOfData=obj.is_mnc;
                  if(obj.is_mnc == 3){
                	  
                	  $scope.Is_others_text = obj.other_data;
                	  
                  }else{
                	  
                	  $scope.Is_others_text = "";  
                  }
                  ////alert("here--1"+$scope.form_TypeOfData);
                  }else{
                	 
                  $scope.is_mnc=0;
                  }
              
             
              
              $scope.no_of_houses_identified =obj.no_of_houses_identified;
              $scope.no_of_patient_identified =obj.no_of_patient_identified;
              
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

	   	//////////////////////////
   }
   
    //////////////////////////////////////
    
    $scope.changedate = function(date){
    	//change the month and year
    	$scope.form_DateOfReport = date;
    	$scope.form_ReportingYear = year = date.getFullYear();
    	
    	var monthMapping = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		$scope.form_ReportingMonth = monthMapping[date.getMonth()];
		var month = date.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		
		var day = date.getDate();
		
		if(day < 10){
			day = "0" + day;
		}
		
		var dateString =  year + "-" + month + "-" + day;
		////////////alert("inside date change "+ $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
	    	//	sessionStorage.hospitalID + "/reports/" + $scope.form_thc_details + "?type=" +
	    		//sessionStorage.FacilityType+ "&date=" + dateString);
		$http({
       	 	url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
    		sessionStorage.hospitalID + "/reports/" + $scope.form_thc_details + "?type=" +
    		sessionStorage.FacilityType+ "&date=" + dateString, 
       		method: "GET",
            dataType: "json",
           //contentType:"application/x-www-form-urlencoded"
       }).then(function(response) {
       	//////////////////alert("heresdx"+$scope.disablereport);
			//////////////////alert("sessionStorage.FacilityType"+sessionStorage.FacilityType);
       	//////////////////alert("inside change function");
       	//////////////////alert("doctor type " + $rootScope.doctorType1);
       	
       	
           console.log($scope.disablereport);
        //   $rootScope.doctorName = sessionStorage.Admname;
           console.log("doctor name" + $scope.form_Admname);
           if (response.status == 204) {
           	//////////////////alert("we r here");
           	////////////////alert("3...");
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
               $scope.form_TypeOfData="";
               
               $scope.no_of_houses_identified ="";
               $scope.no_of_patient_identified =""; 
               $scope.Is_others_text = "";
               
           	$scope.Is_others_text_dis="true";
        	 $scope.changeDataType = function(form_TypeOfData) {
   	    	if(form_TypeOfData == '3'){
   	    		$scope.Is_others_text_dis="";    		
   	    	}else{
   	    		$scope.Is_others_text_dis="true";
   	    		$scope.Is_others_text="";
   	    	}
   	    }
               
           } else {
               console.log(response);
               ////////////////alert("4....");
               /*$scope.disablereport = true;
               $scope.submitDisabled = true;*/
               console.log("disable report" + $scope.disablereport + " response is ok");
               var obj = angular.fromJson(response.data);
               //populating the data 
               console.log("we r able to see DATA-------"+obj);
              // ////////////////alert("we r able to see DATA-------"+obj);
               //in the case when report has been submitted
               if( obj.flag_status == 2 ||obj.flag_status == 3 ){
               	//////////////////alert("kkkkk--"+ $scope.flag_status);
               	$scope.submitDisabled = true;
                   $scope.disablereport = true;
               	
               }else{
               	//in the case when  report has been saved
               	//////////////////alert("kkkkk--1"+ $scope.flag_status);
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
                   $scope.form_TypeOfData=obj.is_mnc;
                   if(obj.is_mnc == 3){
                 	  
                 	  $scope.Is_others_text = obj.other_data;
                 	  
                   }else{
                 	  
                 	  $scope.Is_others_text = "";  
                   }
                   ////alert("here--1"+$scope.form_TypeOfData);
                   }else{
                 	 
                   $scope.is_mnc=0;
                   }
               
               $scope.no_of_houses_identified =obj.no_of_houses_identified;
               $scope.no_of_patient_identified =obj.no_of_patient_identified;
               
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
   
    
    //this method is called when month/year is changed 
    $scope.changemonth = function(month,year) {
//    	////////////////alert("month);
    	////////alert(month);
        $scope.form_submitted=false;
    	$scope.form_not_submitted=false;
        $scope.form_submit_date_time="";
        //////////alert("hellowe r here");
        var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //////////alert("we r here 1212");
       	
//        for dhc login         
//        $scope.monthNames = Names;
//              
//        //change month
//        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
//        var year = $scope.form_ReportingYear;
//        var month = year + "-" + $scope.monthnumber + "-01";
//        
//
//        if(year == yyyy){
//            var inp=[];
//            var j=0;
//        //    ////////////////alert(mm);
//          	for(j=0;j<mm;j++){
//           		inp.push(Names[j]);
//           	}
//          // ////////////////alert(inp);
//
//           $scope.monthNames = inp;
//        }
//        	if(year<yyyy)
//        		{
//        			$scope.monthNames = Names;
//        		}
//        
        
     
        	
//        	var monthNumber = {
//    		        "January": "01",
//    		        "February": "02",
//    		        "March": "03",
//    		        "April": "04",
//    		        "May": "05",
//    		        "June": "06",
//    		        "July": "07",
//    		        "August": "08",
//    		        "September": "09",
//    		        "October": "10",
//    		        "November": "11",
//    		        "December": "12"
//    		}
//    	    
//    	    ////////////////alert("date fucking is " + $scope.form_DateOfReport);
//    	    var date = $scope.form_DateOfReport;
//    	    var day = date.getDate();
//    	    if(day<10){e r able t
//    	    	day = "0" + day;
//    	    }
//    	    var month = date.getMonth() + 1;
//    	    if(month < 10){
//    	    	month = "0" + month;
//    	    }
//    	    
//    	    var year = date.getFullYear();
//    	    var dateString = year + "-" + month + "-" + day;
//////////alert($rootScope.doctorType1);
        if($rootScope.doctorType1 == "dlp"){
//            	////////////////alert("thc name "+ $scope.form_thc_details);
        	
            	var parts = sessionStorage.ReportingDate.split("-");
                $scope.form_DateOfReport = new Date(parts[2], parts[1]-1, parts[0]);
                var date = $scope.form_DateOfReport;
                ////////////////alert("ready date is "+ $scope.form_DateOfReport);
               
                var month = date.getMonth()+1;
                var year = date.getFullYear();
                var day = date.getDate();
                
                if(month<10){
                	month = "0" + month;
                }
                
                if(day<10){
                	day = "0" + day;
                }
                
                var mydate = year + "-" + month + "-" + day;

                ////////////////alert("mydate is "+ mydate);
                
                fetchThcnames();

                urlPath = $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
        		sessionStorage.hospitalID + "/reports/" + $scope.form_thc_details + "?type=" +
        		sessionStorage.FacilityType+ "&date=" + mydate;
        
            }else{
            	
            	////////////////alert("rohil pa,");
            //	var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                
               		
                
                $scope.monthNames = Names;
            	
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

                      
                //change month
                $scope.monthnumber = monthNumber[month];
               // var year = $scope.form_ReportingYear;
                ////////alert("year ..." + $scope.form_ReportingYear);
                var month1 = year + "-" + $scope.monthnumber + "-01";
                
                         
                //////alert("month is " + month1);
                if(year == yyyy){
                    var inp=[];
                    var j=0;
                //    ////////////////alert(mm);
                  	for(j=0;j<mm;j++){
                   		inp.push(Names[j]);
                   	}
                  // ////////////////alert(inp);

                   $scope.monthNames = inp;
                }
               
                if(year<yyyy)
                	{
                		$scope.monthNames = Names;
                	}
                //////alert("month   "+$scope.form_ReportingMonth+"   year   "+$scope.monthNames);
                
            	urlPath = $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
            	sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + 
            	"&self=true" + "&month=" + month1;
        ////////alert(urlPath);
            	
        $scope.form_ReportingMonth=month;
        $scope.form_ReportingYear=year;
        
        
        ////////alert("3"+$scope.form_ReportingMonth);
            }
            
            ////////////////alert("urlpath in change"+ urlPath);

        	
        	
        	
       	  
        console.log($rootScope.urlName + $rootScope.projectName);
       ////////////////alert("thc details " + $scope.form_thc_details);
        $http({
        	 url: urlPath,
             method: "GET",
             dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
        	//////////////////alert("heresdx"+$scope.disablereport);
			//////////////////alert("sessionStorage.FacilityType"+sessionStorage.FacilityType);
        	//////////////////alert("inside change function");
        	//////////////////alert("doctor type " + $rootScope.doctorType1);
        	
        	
            console.log($scope.disablereport);
         //   $rootScope.doctorName = sessionStorage.Admname;
            console.log("doctor name" + $scope.form_Admname);
            if (response.status == 204) {
            	//////////////////alert("we r here");
            	////////////////alert("3...");
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
                $scope.form_TypeOfData="";
                $scope.Is_others_text="";
                }else{
                	
                $scope.is_mnc=0;
                }
                
                $scope.no_of_houses_identified ="";
                $scope.no_of_patient_identified =""; 
                
            } else {
                console.log(response);
                ////////////////alert("4....");
                /*$scope.disablereport = true;
                $scope.submitDisabled = true;*/
                console.log("disable report" + $scope.disablereport + " response is ok");
                var obj = angular.fromJson(response.data);
                //populating the data 
                console.log("we r able to see DATA-------"+obj);
               // ////////////////alert("we r able to see DATA-------"+obj);
                //in the case when report has been submitted
                if( obj.flag_status == 2 ||obj.flag_status == 3 ){
                	//////////////////alert("kkkkk--"+ $scope.flag_status);
                	$scope.submitDisabled = true;
                    $scope.disablereport = true;
                	
                }else{
                	//in the case when  report has been saved
                	//////////////////alert("kkkkk--1"+ $scope.flag_status);
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
                    $scope.is_mnc=1;
                    //////////////////alert("here--1"+$scope.form_thc_details);
                    }else{
                    	
                    $scope.is_mnc=0;
                    }
                
                $scope.no_of_houses_identified =obj.no_of_houses_identified;
                $scope.no_of_patient_identified =obj.no_of_patient_identified;
                
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
        
        ////////////////alert("end.. "+ $scope.form_ReportingMonth);
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
        //////////////////alert($scope.flag_status+"  submit click");
        //////////////////alert("kolarDDHHCC");
      
    };
    
    $scope.saveClick = function() {
        $scope.flag_status=1;
        $scope.buttonString = "Saved";
        //      $scope.required=false;
        $scope.formSubmit2("save");
        //$scope.flag_status = 1;
       // ////////////////alert($scope.flag_status+"  save click");
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
        		
                is_mnc:0,
                
                no_of_houses_identified: $scope.no_of_houses_identified,
                no_of_patient_identified: $scope.no_of_patient_identified
               
        		
        };
        
        
        
        var myJSON = JSON.stringify(Indata);
        console.log(myJSON);
		//////////alert(t);
        ////alert($scope.form_TypeOfData+" //alert:-3 ");
		 $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + t + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	
        
        //	////////////////alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
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
        	    
        	    ////////////////alert("date fucking is " + $scope.form_DateOfReport);
        	    var date = $scope.form_DateOfReport;
        	    var day = date.getDate();
        	    if(day<10){
        	    	day = "0" + day;
        	    }
        	    var month = date.getMonth() + 1;
        	    if(month < 10){
        	    	month = "0" + month;
        	    }
        	    
        	    var year = date.getFullYear();
        	    var dateString = year + "-" + month + "-" + day;


//            
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//////////////////alert("Inside 204");
            	
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
            
            //////////////////alert("here also---"+$scope.flag_status);
            
            
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
        	    is_mnc:1,
        	    no_of_houses_identified: $scope.no_of_houses_identified,
                no_of_patient_identified: $scope.no_of_patient_identified
                    
        };
        
        
        
        var myJSON = JSON.stringify(Indata);
        console.log(myJSON);
	//	////////////////alert(t);
        
      ////alert($scope.form_TypeOfData+" //alert:-1 ");
		
		 $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + t + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	//////////////////alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
            	

//            
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//////////////////alert("Inside 204");
            	
            	console.log("reposne staus 204" +$scope.submitDisabled +$scope.form_submitted + $scope.form_not_submitted);
            	}
            
            location.reload();              
        }, function errorCallback(response) {
            console.log(form_submitted_status);
        });
    
	}
	
	
	
	
	
	
	
    
    angular.element(document).ready(function() {
    
    	////////////////alert("bsck");
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhp';
    	$scope.form_NameOfPharmacist = sessionStorage.Admname;
//        var date = sessionStorage.ReportingDate;
        
    	
                //////////////////alert("thc name "+ $scope.form_thc_details);
        //////////////////alert("thc list " + $scope.hospitalName_array);
        var urlPath = "";
        ////////////////alert("start is "+ $scope.form_ReportingMonth);
        if($rootScope.doctorType1 == "dlp"){
//        	////////////////alert("thc name "+ $scope.form_thc_details);
        	
        	var parts = sessionStorage.ReportingDate.split("-");
            $scope.form_DateOfReport = new Date(parts[2], parts[1]-1, parts[0]);
            var date = $scope.form_DateOfReport;
            ////////////////alert("ready date is "+ $scope.form_DateOfReport);
           
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            var day = date.getDate();
            
            if(month<10){
            	month = "0" + month;
            }
            
            if(day<10){
            	day = "0" + day;
            }
            
            var mydate = year + "-" + month + "-" + day;

            ////////////////alert("mydate is "+ mydate);
            
            fetchThcnames();

            urlPath = $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
    		sessionStorage.hospitalID + "/reports/" + $scope.form_thc_details + "?type=" +
    		sessionStorage.FacilityType+ "&date=" + mydate;
    
        }else{
        	
            var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
           	
            
            $scope.monthNames = Names;
                  
            //change month
            $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
            var year = $scope.form_ReportingYear;
            var month = year + "-" + $scope.monthnumber + "-01";
            

            if(year == yyyy){
                var inp=[];
                var j=0;
            //    ////////////////alert(mm);
              	for(j=0;j<mm;j++){
               		inp.push(Names[j]);
               	}
              // ////////////////alert(inp);

               $scope.monthNames = inp;
            }
           
            if(year<yyyy)
            	{
            		$scope.monthNames = Names;
            	}

        	urlPath = $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 
        	sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + 
        	"&self=true" + "&month=" + month;
    
        }
        
        ////////////////alert("urlpath "+ urlPath);
        $http({
            url: urlPath,
            method: "GET",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
        	
        	//////////////////alert("pharma " + $scope.form_NameOfPharmacist);
        	console.log($scope.disablereport);
            $rootScope.doctorName = sessionStorage.Admname;
			$rootScope.doctorType1 = sessionStorage.FacilityType;
            $rootScope.login_not_submitted = 1;
            console.log("doctor name" + $scope.form_Admname);
         //  ////////////////alert("we r here--"+response);
            if (response.status == 204) {
            	////////////////alert("here-2");
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
                $scope.form_A_D_New_angularFemale = "";
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
                $scope.is_mnc=0; 
                $scope.no_of_houses_identified="";
                $scope.no_of_patient_identified="";
               
//                $scope.form_NameOfPharmacist =sessionStorage.Admname ;
                console.log(response);
               // ////////////////alert("disablereport " + $scope.disablereport);
                //////////////////alert("submitdisabled " + $scope.submitDisabled);
                
                $scope.disablereport = !$scope.disablereport;
            } else {
            	////////////////alert("here-3");
                //////////////////alert(response.data);
                var obj = angular.fromJson(response.data);
                
               // ////////////////alert("type----> "+sessionStorage.FacilityType+"  THC--->"+$scope.form_thc_details);
               
                //in the case when report is submitted
                if(obj.flag_status == 2 || obj.flag_status == 3){
            		
            		//////////////////alert("status 2 dis true");
                
                	$scope.submitDisabled = true;
                	$scope.disablereport = true;
                	console.log(" first time report submitted, response is success");
            	}else{
            		//in the case when report has been only saved
            		//////////////////alert("status 2 dis false");
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
                    $scope.is_mnc=1;
                    //////////////////alert("finally " + $scope.form_thc_details);
                	}else{
                    	
                    $scope.is_mnc=0;
                    }
                
                $scope.no_of_houses_identified=obj.no_of_houses_identified;
                $scope.no_of_patient_identified=obj.no_of_patient_identified;
                
                //////////////////alert("here-1");
               /* if( $scope.flag_status == 2 ){
                	
                	$scope.submitDisabled = true;
                    $scope.disablereport = true;
                	
                }else{
                	$scope.submitDisabled = false;
                    $scope.disablereport = false;
                	
                }*/
                console.log(obj.submittedby);
//                $scope.form_NameOfPharmacist = obj.submittedby;
                
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
    var oldform_NameOfPharmacist_psychiatricdisorders_male = $scope.form_PsyDis_Old_Male;
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
    var is_mnc=1;
    
    var no_of_houses_identified=$scope.no_of_houses_identified;
    var no_of_patient_identified=$scope.no_of_patient_identified;
    
//    $scope.submitDisabled = false;
    
//  
    
    $scope.formSubmit2 = function(buttonType) {
        
        //report form table
    	
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
	    
	    //////alert("date fuccumulativeking is " + $scope.form_DateOfReport);
	    //////alert("month is "+ $scope.form_ReportingMonth);
	   //////alert("year is "+ $scope.form_ReportingYear);
	    var dateString = "";
	    var is_mnc = 0;
	    if($rootScope.doctorType1 != "dlp"){
	    	
	    	   // $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
	          //  var year = $scope.form_ReportingYear;
	         //var month = year + "-" + $scope.monthnumber + "-01"
	    
	    	
	    	dateString = $scope.form_ReportingYear + "-" + monthNumber[$scope.form_ReportingMonth] + "-" + "01";
	    	////////alert("date is here finally we came to near"+dateString);
	    	$scope.is_mnc = 0;
	    }else{
	    	var date = $scope.form_DateOfReport;
		    var day = date.getDate();
		    if(day<10){
		    	day = "0" + day;
		    }
		    var month = date.getMonth() + 1;
		    if(month < 10){
		    	month = "0" + month;
		    }
		    
		    var year = date.getFullYear();
		    dateString = year + "-" + month + "-" + day;
		    ////alert("when posting data"+$scope.form_TypeOfData);
		    $scope.is_mnc = $scope.form_TypeOfData;
	    }
	    ////alert($scope.form_TypeOfData+" w "); 
	    
	   // $scope.Is_others_text_dis="true";
	    
	    $scope.changeDataType = function(form_TypeOfData) {
	    	
	    	////alert("came to "+form_TypeOfData);
	    	
	    	if(form_TypeOfData == '3'){
	    		
	    		$scope.Is_others_text_dis="";
	    		////alert("$scope.Is_others_text  "+$scope.Is_others_text);
	    		
	    	}else{
	    		$scope.Is_others_text_dis="true";
	    		$scope.Is_others_text ="";
	    		
	    	}
	    }
   	
   	////alert("Is_others_text  "+$scope.Is_others_text);
   //	$scope.is_mnc = $scope.form_TypeOfData;
//   	if($scope.is_mnc == "3"){
//   		
//   		$scope.Is_others_text = $scope.Is_others_text;
//   		
//   	}else{
//   		
//   		
//   	}
   	////alert("form_TypeOfData  "+$scope.Is_others_text);
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
                reportFor_month_year: dateString,
        
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
        		is_mnc:$scope.form_TypeOfData,
        		
        		no_of_houses_identified: $scope.no_of_houses_identified,
        		no_of_patient_identified: $scope.no_of_patient_identified,
        		other_data:$scope.Is_others_text
        };
        
        
      $scope.thcData = function(hospital_id,hospital_type,month) {
          	
             //////alert();
          	//////alert("month   "+  month+"  hospital  "+hospital_id+"type  "+hospital_type);
          	$http({
                url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + hospital_id + "/reportsThcValidation?type=" + hospital_type + "&month=" + month,
                method: "GET",
                dataType: "json",
                //contentType:"application/x-www-form-urlencoded"
            }).then(function(response) {
            	
             ///////alert(response);
            	
            	
            }, function errorCallback(response) {
//              console.log(form_submitted_status);
            });
	    };
        
        
        
        
        
        
        
       // ////////////////alert("here-3");
        var myJSON = JSON.stringify(Indata);
        
        console.log("HERE-----"+myJSON);
        //////alert(myJSON);
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
        	
        	//////////////////alert(sessionStorage.FacilityType);
        	if(sessionStorage.FacilityType=='dhc'){
        		//////////////////alert("THC NAME---"+$scope.form_thc_details+"HOSPITAL ID--"+sessionStorage.hospitalID+"REPORTING MONTH--"+$scope.form_ReportingYear + "-" + $scope.monthnumber + "-01");
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
        	//////////////////alert("button type " + buttonFlag + " buttonType "+ buttonType);
        	//////////////////alert("here-4");
      //  ////alert("myJSON" + myJSON);
        ////alert($scope.form_TypeOfData+" //alert:-2 ");
        $http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/reports",
            method: "POST",
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            //contentType:"application/x-www-form-urlencoded"
        }).then(function(response) {
            //  initializing 
        	//////////////////alert("response" + response.status);
//        	var obj = angular.fromJson(response.data);
           // console.log("mamam " + obj.flag_status + " remarks " + obj.remarks);
            if (response != null && response.status != 204) {
            	if($scope.flag_status == 2 || $scope.flag_status == 3){
            		//////////alert("status 2 dis true");
            		$scope.submitDisabled = true;
            		$scope.disablereport = true;

                	console.log(" first time report submitted, response is success");
            	}else{
            		
            	//////alert("status 2 dis false");
                	$scope.submitDisabled = false;	
                	$scope.disablereport = false;
                	

                }

              //$scope.submitDisabled = true;
            	
                console.log(" first time report submitted, response is success");
               
                $scope.form_submitted = true;
                $scope.form_not_submitted=false;
                var obj = angular.fromJson(response.data);
            }
            else
            	{
            	//////////////////alert("Inside 204");
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

//cumulativecontroller

app.controller("cumulativecontroller", function($scope, $http, $rootScope, Excel, $timeout) {
    
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
		$scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
		$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
	
    
    if(sessionStorage.FacilityType == 'dlp'){
    	
    	alert("dlp cumulative");
    	
    }else{
    	
    	alert("other cumulative "+sessionStorage.FacilityType);
    }
    
    //alert("came to here1212");	
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
    $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
    
    $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
    $scope.yearCount = function() {
        var input = [];
        for (i = sessionStorage.ReportingYear; i > 1973; i--) {
            input.push(i);
        }
        return input;
    }
    
    //////////////////alert("1.. "+ $scope.form_ReportingMonth);
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
    	////////alert("wre rhrh");
    	$scope.records="";
    alert("we r here @change month")
    	
        console.log("I am at cummulative mnth change ");
        var obj = $rootScope.mydata;	
        $scope.title = sessionStorage.hospitalName + " HOSPITAL ";
        $scope.disabledemo = "true";
        console.log("my data : ")
        console.log(obj);
        
        $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
        var year = $scope.form_ReportingYear;
        var month = year + "-" + $scope.monthnumber + "-01";
        
           alert($rootScope.urlName + $rootScope.projectName + "/api/hospitals/"+ sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month);
        	
        	 $scope.records="";
             $http({
                 url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/"
     				+ sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month,
                 method: "GET",
                 dataType: "json",
                 //contentType:"application/x-www-form-urlencoded"
             }).then(function(response) {
                 if (response != null && response.status != 204) {
                     //alert("cummulavtive data for dlp :");
                    // console.log("erpspdsdp" + response);
                     $rootScope.doctorName = sessionStorage.Admname;
     				 $rootScope.doctorType1 = sessionStorage.FacilityType;
                     var obj = angular.fromJson(response.data);
                     //console.log(obj);
                     $scope.records = obj;
                     //for array issue
                     var index = 0;
                     
                     //alert($scope.records);
                     angular.forEach(obj, function(value, key) {
                         var report = value.hospital_report;
                         var hospitalName = value.hospitalName;
                         var hospitalType = value.hospitalType;
                        //alert("hhghggh  "+hospitalType);
                         if (report != undefined && (report.flag_status == 2|| report.flag_status == 3|| report.flag_status == 4)) {
                         	
                             //hospital name and type
                             $scope.hospitalName_array[index] = hospitalName;
                             
                             //alert(report.flag_status+"helllo"+hospitalName);
                             
                             $scope.hospitalType_array[index] = (hospitalType);
                             $scope.form_SDM_Old_Male += report.old_smd_male;
                             $scope.form_SDM_Old_Female += report.old_smd_female;
                             $scope.form_SDM_New_Male += report.new_smd_male;
                             $scope.form_SDM_New_Female += report.new_smd_female;
                             //array
                             $scope.form_SDM_Old_Male_array[index] = (report.old_smd_male);
                             $scope.form_SDM_Old_Female_array[index] = (report.old_smd_female);
                             //////////alert(report.flag_status+"helllo"+report.old_smd_female);
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
                     
                 }
             }, function errorCallback(response) {
                // console.log(form_submitted_status);
             });
        
    
    }  	
        	
           
    
    
    angular.element(document).ready(function() {
    	
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'dmhp';
        $rootScope.doctorType1 = sessionStorage.FacilityType;
         //alert("2.. " + $scope.form_ReportingMonth);
        //alert("I am at cummulative report  ");
        var obj = $rootScope.mydata;	
        $scope.title = sessionStorage.hospitalName + " HOSPITAL ";
        $scope.disabledemo = "true";
        $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
        $scope.form_hospitalName = sessionStorage.hospitalName;
        console.log(obj);
       //alert("ssss" + sessionStorage.ReportingDate);
        var date = sessionStorage.ReportingDate;
        var mon = date.split("-")[1];
        var year = date.split("-")[2];
        var month=""
        if(mon>10){
        	  month = year + "-" + "0" + mon + "-01";	
        }else{
        	
        	  month = year + "-"  + mon + "-01";	
        }
        
     //alert(month); 
    //alert($rootScope.urlName + $rootScope.projectName + "/api/hospitals/"+ sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month);
        	 $scope.records="";
             $http({
                 url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/"
     				+ sessionStorage.hospitalID + "/reports?type=" + sessionStorage.FacilityType + "&month=" + month,
                 method: "GET",
                 dataType: "json",
                 //contentType:"application/x-www-form-urlencoded"
             }).then(function(response) {
            	 ////////////////alert("cumulative success");
            	 if (response != null && response.status != 204) {
                     ////alert("cummulavtive data :"+response);
                    // console.log("erpspdsdp" + response);
                     $rootScope.doctorName = sessionStorage.Admname;
     				$rootScope.doctorType1 = sessionStorage.FacilityType;
                     var obj = angular.fromJson(response.data);
                   //  console.log(obj);
                     $scope.records = obj;
                     //for array issue
                     var index = 0;
                     
                     
                     angular.forEach(obj, function(value, key) {
                    	 
                         var report = value.hospital_report;
                       // //alert(value.hospital_report);
                         var hospitalName = value.hospitalName;
                       //  //alert(hospitalName);
                         var hospitalType = value.hospitalType;
                         if (report != undefined && (report.flag_status == 2|| report.flag_status == 3|| report.flag_status == 4)) {
                         	
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
                     
                 }
             }, function errorCallback(response) {
               //  console.log(form_submitted_status);
            	 ////alert("came to error block");
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
    
    
   
   
});



