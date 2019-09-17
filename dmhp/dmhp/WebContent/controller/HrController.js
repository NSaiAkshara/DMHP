//BudgetReport Controller
app.controller("HrController", function($scope, $http, $rootScope,$location, $window) {
	
	
////alert("yes its working for HR1");
////alert($scope.HRinfo_Name);
//submitHrData(),HRinfo_CurrentDesignation,HRinfo_DateofBirth,HRinfo_Email,HRinfo_mob1,HRinfo_mob2,HRinfo_1stAppoitment,
	
	$scope.HRinfo_Name = $scope.HRinfo_Name;
    $scope.HRinfo_CurrentDesignation = $scope.HRinfo_CurrentDesignation;
    $scope.HRinfo_DateofBirth = $scope.HRinfo_DateofBirth;
    $scope.HRinfo_Email = $scope.HRinfo_Email;
    $scope.HRinfo_mob1 = $scope.HRinfo_mob1;
    $scope.HRinfo_mob2 = $scope.HRinfo_mob2;
    $scope.HRinfo_1stAppoitment = $scope.HRinfo_1stAppoitment;
    $scope.HRinfo_ContarctRefNo = $scope.HRinfo_ContarctRefNo;
    $scope.HRinfo_ContractFrom = $scope.HRinfo_ContractFrom;
    $scope.HRinfo_ContractTo = $scope.HRinfo_ContractTo;
    $scope.HRinfo_NameOfFacility = $scope.HRinfo_NameOfFacility;
    $scope.HRinfo_InchargeTaluka = $scope.HRinfo_InchargeTaluka;
    $scope.HRinfo_Remarks = $scope.HRinfo_Remarks;
    //HRinfo_1stAppoitment = $scope.HRinfo_1stAppoitment;
   
    //List of THCs
    ////alert($rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType);
	$http({
		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType ,
		method: "GET",
		dataType: "json",
	}).then(function(response) {
		////alert("hello yes its working");
		
		
		var obj = angular.fromJson(response.data);
		var index = 0;
		var inp=[];
		$scope.hospitalName_array=[];
		angular.forEach(obj, function(value, key) {     
			var hospitalName = value.hospitalName; 
			var hospitalId = value.hospital_id;
			////alert(hospitalName+"  "+hospitalId+"  "+key);
			//$scope.hospitalName_array[key]=value;  
			$scope.hospitalName_array[key]=hospitalName+'_'+hospitalId;  
			index = index + 1;
		});
		console.log("hello  "+$scope.hospitalName_array);
	}, function errorCallback(response) {
	
	});
	
	
	
	//$scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];

	  // Selected fruits
	  $scope.selection = [];
	 // //alert(typeof $scope.selection);
	  // Toggle selection for a given fruit by name
	  $scope.toggleSelection = function toggleSelection(fruitName) {
		  //alert(fruitName);
	    var idx = $scope.selection.indexOf(fruitName);
        //alert(idx);
	    // Is currently selected
	    if (idx > -1) {
	    	//alert($scope.selection[idx]);
	      $scope.selection.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selection.push(fruitName);
	    }
	  };
	
	
	
	
	
    
    
	$scope.submitHrData = function ()
	  {
		
		//checkbox test
		 
		//alert($scope.selection);
		
		
		
		var myJSON1 = JSON.stringify($scope.selection);
		
		////alert("yes its c2222oming11 to here   "+myJSON1);
	   //console.log("yes its c22oming11 to here"+typeof myJSON1);
	   
		 //alert($scope.HRinfo_InchargeTaluk);
		 
		$scope.HRinfo_Name = $scope.HRinfo_Name;
	    $scope.HRinfo_CurrentDesignation = $scope.HRinfo_CurrentDesignation;
	    $scope.HRinfo_DateofBirth = $scope.HRinfo_DateofBirth;
	    $scope.HRinfo_Email = $scope.HRinfo_Email;
	    $scope.HRinfo_mob1 = $scope.HRinfo_mob1;
	    $scope.HRinfo_mob2 = $scope.HRinfo_mob2;
	    $scope.HRinfo_1stAppoitment = $scope.HRinfo_1stAppoitment;
	    $scope.HRinfo_ContarctRefNo = $scope.HRinfo_ContarctRefNo;
	    $scope.HRinfo_ContractFrom = $scope.HRinfo_ContractFrom;
	    $scope.HRinfo_ContractTo = $scope.HRinfo_ContractTo;
	    $scope.HRinfo_NameOfFacility = $scope.HRinfo_NameOfFacility;
	    $scope.HRinfo_InchargeTaluka = myJSON1;
	 //   $scope.HRinfo_InchargeTaluka = $scope.HRinfo_InchargeTaluka;
	    $scope.HRinfo_Remarks = $scope.HRinfo_Remarks;
	    //HRinfo_1stAppoitment = $scope.HRinfo_1stAppoitment;
	    
	   
	    
	    var Indata = {
	    		
	    		name:$scope.HRinfo_Name,
                current_designation:$scope.HRinfo_CurrentDesignation,
                age:4,
                date_of_birth:$scope.HRinfo_DateofBirth,
                dateOfAppointment:$scope.HRinfo_1stAppoitment,
                contarctPeriodfrom:$scope.HRinfo_ContractFrom,
		        contarctPeriodTo:$scope.HRinfo_ContractTo,
                contractRefNo:$scope.HRinfo_ContarctRefNo,
                remarks:$scope.HRinfo_Remarks,
                contactNo:$scope.HRinfo_mob1,
                emailId: $scope.HRinfo_Email,
                nameOfFacility:$scope.HRinfo_NameOfFacility,
                inchargeTaluka:$scope.HRinfo_InchargeTaluka,
                shc_id:1,
                dhc_id:sessionStorage.hospitalID,
                TalukaIds:22,
                PHCIds:33,
                CHCId:1,
                PCId:1,
                IsPC:1,
                CreatedBy:"DHC",
                IsActive:1,
		
	    };
		
	    var myJSON = JSON.stringify(Indata);
	    
	  //alert("here    "+myJSON);
	  // console.log("here   "+myJSON);
	    
	    $http({
	         url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcHr",
	         method: "POST",
	         data: myJSON,
	         contentType: "application/json",
	         dataType: "json",
	         //contentType:"application/x-www-form-urlencoded"
	     }).then(function(response) {
	    	 
	    	 ////alert("it might be saved");
	    	 if(response.status == 200){
	    		 
	    		 var x = document.getElementById("snackbar1")
		 	     x.className = "show";
		 	     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		 	    $scope.HRinfo_Name = "";
			    $scope.HRinfo_CurrentDesignation = "";
			    $scope.HRinfo_DateofBirth = "";
			    $scope.HRinfo_Email = "";
			    $scope.HRinfo_mob1 = "";
			    $scope.HRinfo_mob2 = "";
			    $scope.HRinfo_1stAppoitment = "";
			    $scope.HRinfo_ContarctRefNo = "";
			    $scope.HRinfo_ContractFrom = "";
			    $scope.HRinfo_ContractTo = "";
			    $scope.HRinfo_NameOfFacility = "";
			   // $scope.HRinfo_InchargeTaluka = "";
			  //  $scope.HRinfo_InchargeTaluka = "";
			    $scope.HRinfo_Remarks = "";
			    $scope.selection = [];
		 	     
		 	     
	    	 }else{
	    		 
	    		 var x = document.getElementById("snackbar2")
		 	     x.className = "show";
		 	     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		 	     
		 	    $scope.HRinfo_Name = $scope.HRinfo_Name;
			    $scope.HRinfo_CurrentDesignation = $scope.HRinfo_CurrentDesignation;
			    $scope.HRinfo_DateofBirth = $scope.HRinfo_DateofBirth;
			    $scope.HRinfo_Email = $scope.HRinfo_Email;
			    $scope.HRinfo_mob1 = $scope.HRinfo_mob1;
			    $scope.HRinfo_mob2 = $scope.HRinfo_mob2;
			    $scope.HRinfo_1stAppoitment = $scope.HRinfo_1stAppoitment;
			    $scope.HRinfo_ContarctRefNo = $scope.HRinfo_ContarctRefNo;
			    $scope.HRinfo_ContractFrom = $scope.HRinfo_ContractFrom;
			    $scope.HRinfo_ContractTo = $scope.HRinfo_ContractTo;
			    $scope.HRinfo_NameOfFacility = $scope.HRinfo_NameOfFacility;
			  //  $scope.HRinfo_InchargeTaluka = myJSON1;
			  //  $scope.HRinfo_InchargeTaluka = $scope.HRinfo_InchargeTaluka;
			    $scope.HRinfo_Remarks = $scope.HRinfo_Remarks;
	    	 }
	    	// $scope.disablefields_1="true";
	    	//$scope.submitDisabled="true";
	    //	$location.path('/dhcHrModule');
	    	// $window.location.reload();
	     }, function errorCallback(response) {
	        //console.log(form_submitted_status);
	     });
	    
	    ////alert("here    "+myJSON);
	    console.log("here   "+myJSON);
	  }
 
	
});

app.controller("HrViewController", function($scope, $http, $rootScope,$location) {
	 var hospital_id =  sessionStorage.hospitalID;
////alert(" this is HrViewController   "+hospital_id);
$scope.hr_records = "";

$http({
    url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcHr?dhc_id="+hospital_id,
    method: "GET",
    dataType: "json",
    //contentType:"application/x-www-form-urlencoded"
}).then(function(response) {
	 
	
	// var obj = angular.fromJson(response.data);
	 $scope.hr_records = angular.fromJson(response.data);
	// //alert($scope.hr_records);
	 console.log($scope.hr_records.inchargeTaluka);
	 
}, function errorCallback(response) {
   //console.log(form_submitted_status);
});



//Hr info edit click
	
	$scope.hr_edit_click = function (dhcHrinfo_id)
	{
	
		////alert("hr_edit_click  "+dhcHrinfo_id);
		
		sessionStorage.DhcHrEdit_id = dhcHrinfo_id;
		$location.path('/EditHrData');
		
		
		
		
		
	}
	
});

//HrEditContrller
app.controller("HrReportEditController", function($scope, $http, $rootScope,$location) {
	
	//alert("YES its working"+sessionStorage.DhcHrEdit_id);
			
			var dhcHrinfo_id=sessionStorage.DhcHrEdit_id;
		$scope.hr_records = "";

		$http({
		    url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcHr/"+dhcHrinfo_id,
		    method: "GET",
		    dataType: "json",
		    //contentType:"application/x-www-form-urlencoded"
		}).then(function(response) {
			 
			
			 var obj = angular.fromJson(response.data);
			 $scope.HRinfo_Name = obj.name;
			 $scope.HRinfo_CurrentDesignation = obj.current_designation;
			 $scope.HRinfo_DateofBirth = obj.date_of_birth;
			 $scope.HRinfo_Email = obj.emailId;
			 $scope.HRinfo_mob1 = obj.contactNo;
			 $scope.HRinfo_mob2 = obj.contactNo;
			 $scope.HRinfo_1stAppoitment = obj.dateOfAppointment;
			 $scope.HRinfo_ContarctRefNo = obj.contractRefNo;
			 $scope.HRinfo_ContractFrom = obj.contarctPeriodfrom;
			 $scope.HRinfo_ContractTo = obj.contarctPeriodTo;
			 $scope.HRinfo_NameOfFacility = obj.nameOfFacility;
			// $scope.HRinfo_InchargeTaluka=[];
			 $scope.HRinfo_InchargeTaluka = obj.inchargeTaluka;
			 $scope.HRinfo_Remarks = obj.remarks;
		
			 //UPdating Hr fields
			 
			 $http({
					url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/thclistfordlp?type=" + sessionStorage.FacilityType ,
					method: "GET",
					dataType: "json",
				}).then(function(response) {
					////alert("hello yes its working");
					
					
					var obj = angular.fromJson(response.data);
					var index = 0;
					var inp=[];
					$scope.hospitalName_array=[];
					angular.forEach(obj, function(value, key) {     
						var hospitalName = value.hospitalName; 
						var hospitalId = value.hospital_id;
						////alert(hospitalName+"  "+hospitalId+"  "+key);
						//$scope.hospitalName_array[key]=value;  
						$scope.hospitalName_array[key]=hospitalName+'_'+hospitalId;  
						index = index + 1;
					});
					console.log("hello  "+$scope.hospitalName_array);
				}, function errorCallback(response) {
				
				});
			 
			 
			 var myJSON_new= JSON.stringify($scope.HRinfo_InchargeTaluka);
		//	 //alert(typeof myJSON_new+" myJSON_new");
			//var singlwQ = myJSON_new.replace(/\'/g, "\"");
			// //alert(singlwQ);
			 
			// var res = myJSON_new.split(",");
			 
			// $scope.selection=[];
			
			 $scope.selection = myJSON_new;
			 
			// //alert(typeof $scope.selection+"  yes");
			  // Toggle selection for a given fruit by name
			  $scope.toggleSelection = function toggleSelection(fruitName) {
				   
				
			    var idx = $scope.selection.indexOf(fruitName);
			   // $scope.selection = $scope.selection.toString(); 
			    $scope.selection = $scope.selection.split(",");
			    //alert(idx)
			    // Is currently selected
			    if (idx > -1) {
			    	//alert("before "+$scope.selection[idx]);
			     // $scope.selection = $scope.selection.split(",");
			      $scope.selection.splice(idx, 1);
			    //  $scope.selection = $scope.selection.toString(); 
			      //alert("after "+$scope.selection);
			    }

			    // Is newly selected
			    else {
			    //	$scope.selection = $scope.selection.split(",");
			    	$scope.selection.push(fruitName);    	
			    }
			    $scope.selection = $scope.selection.toString();
			    
			  };
			 
			 
			////alert( $scope.selection1);
			 
			 $scope.submitHrData1 = function ()
				{	
					
				// //alert("new  "+$scope.selection_new.length);
				
				 
				// //alert("new "+ $scope.selection1);
				// $scope.selection=$scope.selection.replace(/\\\//g, " ");
				 
				   var selectionIndex=$scope.selection.indexOf("\\");
			      while(selectionIndex >= 0){
			    	  $scope.selection=$scope.selection.replace("\\", " ");
			    	  selectionIndex=$scope.selection.indexOf("\\");
			      }
				 
				 
				 //alert(" new1 "+$scope.selection);
				 var myJSON1 = $scope.selection;
				 
				 var Indata = {
					    		
					    		name:$scope.HRinfo_Name,
				                current_designation:$scope.HRinfo_CurrentDesignation,
				                age:4,
				                date_of_birth:$scope.HRinfo_DateofBirth,
				                dateOfAppointment:$scope.HRinfo_1stAppoitment,
				                contarctPeriodfrom:$scope.HRinfo_ContractFrom,
						        contarctPeriodTo:$scope.HRinfo_ContractTo,
				                contractRefNo:$scope.HRinfo_ContarctRefNo,
				                remarks:$scope.HRinfo_Remarks,
				                contactNo:$scope.HRinfo_mob1,
				                emailId: $scope.HRinfo_Email,
				                nameOfFacility:$scope.HRinfo_NameOfFacility,
				                inchargeTaluka:myJSON1,
				                shc_id:1,
				                dhc_id:sessionStorage.hospitalID,
				                TalukaIds:22,
				                PHCIds:33,
				                CHCId:1,
				                PCId:1,
				                IsPC:1,
				                CreatedBy:"DHC",
				                IsActive:1,
						
					    };
						
					var myJSON = JSON.stringify(Indata);
					//alert(myJSON);
					$http({
			    		   url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcHr/" +sessionStorage.DhcHrEdit_id,
			    		   method: "PUT",
			    		   data: myJSON,
			    		   contentType: "application/json",
			    		   dataType: "json",
			    		   
			    	   }).then(function(response){
			    		   ////alert("hurrah");
			    		   
			    		   
			    		   if(response.status == 200){
			  	    		 
			  	    		 var x = document.getElementById("snackbar1")
			  		 	     x.className = "show";
			  		 	     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			  		 	     
			  	    	 }else{
			  	    		 
			  	    		 var x = document.getElementById("snackbar2")
			  		 	     x.className = "show";
			  		 	     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000); 
			  	    	 }
			  	    	 $scope.disablefields_1="true";
			  	    	 $scope.submitDisabled="true";
			    		   
			    		 
			    		
			    		  // $location.path('/submittedHrData');
			    		   
			    	   }, function errorCallBack(response){
//			    		   $scope.form_submitted = false;
//			          	   $scope.form_not_submitted=true;
//			       
			    		   //alert("incorrect response");
			    	   })		
					
				}
			 			 
			 
		}, function errorCallback(response) {
		   //console.log(form_submitted_status);
		});
		
		
		


	});






