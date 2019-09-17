package org.iiitb.hospital.nimhans.services;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.DhcBudget;
import org.iiitb.hospital.nimhans.modals.DhcHr;
import org.iiitb.hospital.nimhans.modals.Report;
import org.iiitb.hospital.nimhans.modals.Training;

public class DhcHrService {

	private  Connection connection;
	public DhcHrService() {
	
		connection = DataAccessObject.getInstance().Connect();
	}

	
//DHC-HR data entry...
	
public   DhcHr setDhcHrtInfo(DhcHr DhcHr) {
		
		int result = 0;	
		
		try {
			
			System.out.println("this is what11     "+DhcHr.getInchargeTaluka());
			
			String sql = "INSERT INTO `dhc_HrInfo`( `name`, `current_designation`, `age`, `date_of_birth`, `dateOfAppointment`, `contarctPeriodfrom`, `contarctPeriodTo`, `contractRefNo`, `remarks`, `contactNo`, `emailId`, `nameOfFacility`, `InchargeTaluka`, `shc_id`, `dhc_id`, `TalukaIds`, `PHCIds`, `CHCId`, `PCId`, `IsPC`, `CreatedBy`, `IsActive`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
			PreparedStatement pstatement;	
            pstatement = connection.prepareStatement(sql);
      
			//java.util.Date date = new java.util.Date();
			//Timestamp timstamp = new Timestamp(date.getTime());
			
			pstatement.setString(1, DhcHr.getName());
			pstatement.setString(2, DhcHr.getCurrent_designation());
			pstatement.setInt(3,0);
			
			pstatement.setDate(4, DhcHr.getDate_of_birth());
			pstatement.setDate(5, DhcHr.getDateOfAppointment());
			pstatement.setDate(6, DhcHr.getContarctPeriodfrom());
			pstatement.setDate(7, DhcHr.getContarctPeriodTo());
			pstatement.setString(8, DhcHr.getContractRefNo());
			
			pstatement.setString(9, DhcHr.getRemarks());
			pstatement.setString(10, DhcHr.getContactNo());
			pstatement.setString(11, DhcHr.getEmailId());
			pstatement.setString(12, DhcHr.getNameOfFacility());
			pstatement.setString(13, DhcHr.getInchargeTaluka());
			pstatement.setInt(14, 1);
			
			pstatement.setInt(15, DhcHr.getDhc_id());
			pstatement.setString(16, null);
			pstatement.setString(17, null);
			pstatement.setString(18, null);
			pstatement.setInt(19, 0);
			pstatement.setString(20,null);
			pstatement.setString(21, null);
			pstatement.setInt(22, 1);
			
			result = pstatement.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (result <= 0) {

			DhcHr = null;
		}
		
		return DhcHr;
		
	}
	
	public   List<DhcHr> getDhcHrtInfo(int dhc_id2) {
		//DhcHr DhcHr = null;
		
		List<DhcHr> DhcHrinfo = new ArrayList<DhcHr>();
		
		try {
		String sql = "SELECT `dhc_HrInfo_id`,`name`,`current_designation`,`age`,`date_of_birth`,`dateOfAppointment`,`contarctPeriodfrom`,`contarctPeriodTo`,`contractRefNo`,`remarks`,`contactNo`,`emailId`,`nameOfFacility`,`InchargeTaluka`,`shc_id`,`dhc_id`,`TalukaIds`,`PHCIds`,`CHCId`,`PCId`,`IsPC`,`CreatedBy`,`IsActive` FROM `dhc_hrinfo` WHERE `dhc_id`=?";
		PreparedStatement pstatement;	
        pstatement = connection.prepareStatement(sql);
        pstatement.setInt(1,dhc_id2);
        ResultSet rs = pstatement.executeQuery();
        while(rs.next()) {
        	
        	System.out.println("yyyyyyyyyyyyyyyyyyyyyy====");	
        	
        	 
        	  String name = rs.getString("name");
        	  String current_designation = rs.getString("current_designation");
        	  int age = rs.getInt("age");
        	  Date date_of_birth = rs.getDate("date_of_birth");
        	  Date dateOfAppointment = rs.getDate("dateOfAppointment");
        	  Date contarctPeriodfrom = rs.getDate("contarctPeriodfrom");
        	  Date contarctPeriodTo = rs.getDate("contarctPeriodTo");
        	  String contractRefNo = rs.getString("contractRefNo");
        	  String remarks = rs.getString("remarks");
        	  String contactNo = rs.getString("contactNo");
        	  String emailId = rs.getString("emailId");
        	  String nameOfFacility = rs.getString("nameOfFacility");
        	  String inchargeTaluka = rs.getString("InchargeTaluka");
        	  int shc_id = rs.getInt("shc_id");
        	  int dhc_id = rs.getInt("dhc_id");
        	  String TalukaIds = rs.getString("TalukaIds");
        	  String PHCIds = rs.getString("PHCIds");
        	  String CHCId = rs.getString("CHCId");
        	  int PCId = rs.getInt("PCId");
        	  String IsPC = rs.getString("IsPC");
        	  String CreatedBy = rs.getString("CreatedBy");
        	  int IsActive = rs.getInt("IsActive");
        	  int dhc_HrInfo_id = rs.getInt("dhc_HrInfo_id");
        	  
        	  DhcHr  DhcHr1 = new DhcHr(dhc_HrInfo_id,name,current_designation,age,date_of_birth,dateOfAppointment,
                      contarctPeriodfrom,contarctPeriodTo,contractRefNo,
                      remarks,contactNo,emailId,nameOfFacility,
                      inchargeTaluka,shc_id,dhc_id,TalukaIds,PHCIds,CHCId,PCId,IsPC,CreatedBy,IsActive); 	
        	  
        	  DhcHrinfo.add(DhcHr1);
        	
        }
        
      //  Collections.sort(DhcHrinfo);
        return DhcHrinfo;
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}


	public DhcHr getDHChrInfo(int dhcHrinfo_id) {
		// TODO Auto-generated method stub
		DhcHr DhcHr1 = null;
		System.out.println("=getDHChrInfo=getDHChrInfo=="+dhcHrinfo_id);
		
		try {
			String sql = "SELECT `dhc_HrInfo_id`,`name`,`current_designation`,`age`,`date_of_birth`,`dateOfAppointment`,`contarctPeriodfrom`,`contarctPeriodTo`,`contractRefNo`,`remarks`,`contactNo`,`emailId`,`nameOfFacility`,`InchargeTaluka`,`shc_id`,`dhc_id`,`TalukaIds`,`PHCIds`,`CHCId`,`PCId`,`IsPC`,`CreatedBy`,`IsActive` FROM `dhc_hrinfo` WHERE `dhc_HrInfo_id`=?";
			PreparedStatement pstatement;	
	        pstatement = connection.prepareStatement(sql);
	        pstatement.setInt(1,dhcHrinfo_id);
	        ResultSet rs = pstatement.executeQuery();
	        if(rs.next()) {
	        	
	        	System.out.println("NNNNNNNNNNNNNNNNNN====");	
	        	
	        	  String name = rs.getString("name");
	        	  String current_designation = rs.getString("current_designation");
	        	  int age = rs.getInt("age");
	        	  Date date_of_birth = rs.getDate("date_of_birth");
	        	  Date dateOfAppointment = rs.getDate("dateOfAppointment");
	        	  Date contarctPeriodfrom = rs.getDate("contarctPeriodfrom");
	        	  Date contarctPeriodTo = rs.getDate("contarctPeriodTo");
	        	  String contractRefNo = rs.getString("contractRefNo");
	        	  String remarks = rs.getString("remarks");
	        	  String contactNo = rs.getString("contactNo");
	        	  String emailId = rs.getString("emailId");
	        	  String nameOfFacility = rs.getString("nameOfFacility");
	        	  String InchargeTaluka = rs.getString("InchargeTaluka");
	        	  int shc_id = rs.getInt("shc_id");
	        	  int dhc_id = rs.getInt("dhc_id");
	        	  String TalukaIds = rs.getString("TalukaIds");
	        	  String PHCIds = rs.getString("PHCIds");
	        	  String CHCId = rs.getString("CHCId");
	        	  int PCId = rs.getInt("PCId");
	        	  String IsPC = rs.getString("IsPC");
	        	  String CreatedBy = rs.getString("CreatedBy");
	        	  int IsActive = rs.getInt("IsActive");
	        	  int dhc_HrInfo_id = rs.getInt("dhc_HrInfo_id");
	        	  
	        	   DhcHr1 = new DhcHr(dhc_HrInfo_id,name,current_designation,age,date_of_birth,dateOfAppointment,
	                      contarctPeriodfrom,contarctPeriodTo,contractRefNo,
	                      remarks,contactNo,emailId,nameOfFacility,
	                      InchargeTaluka,shc_id,dhc_id,TalukaIds,PHCIds,CHCId,PCId,IsPC,CreatedBy,IsActive); 	
	        	  
	        	 // return DhcHr1; 
	        	
	        }
	        
	         
	        return DhcHr1;
			
			}catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		
		
		return null;
	}

//Update Hr columns
public  DhcHr updateDhcHrInfo(DhcHr dhcHr, int dhcHrinfo_id) {
		// TODO Auto-generated method stub
	System.out.println("updateNAme  "+dhcHr.getName());
	int result = 0;
	try{
		String sql = "UPDATE `dhc_hrinfo` SET `name`=?,`current_designation` = ?, `date_of_birth` = ?, `dateOfAppointment` = ?, `contarctPeriodfrom` = ?, `contarctPeriodTo` = ?, `contractRefNo` = ?, `remarks` = ?, `contactNo` = ?, `emailId` = ?, `nameOfFacility` = ?, `InchargeTaluka` = ? WHERE `dhc_HrInfo_id` = ?";
		PreparedStatement ps = connection.prepareStatement(sql);			
	
		ps.setString(1, dhcHr.getName());
		ps.setString(2, dhcHr.getCurrent_designation());
		ps.setDate(3,dhcHr.getDate_of_birth());
		ps.setDate(4, dhcHr.getDateOfAppointment());
		ps.setDate(5, dhcHr.getContarctPeriodfrom());
		ps.setDate(6, dhcHr.getContarctPeriodTo());
		ps.setString(7, dhcHr.getContractRefNo());
		ps.setString(8, dhcHr.getRemarks());
		ps.setString(9, dhcHr.getContactNo());
		ps.setString(10, dhcHr.getEmailId());
		ps.setString(11, dhcHr.getNameOfFacility());
		ps.setString(12, dhcHr.getInchargeTaluka());
		//ps.setString(12, "INCHARGEtALUKA");
		ps.setInt(13, dhcHrinfo_id);
		result = ps.executeUpdate();
		if (result <= 0){
			dhcHr = null;
		}
		
	}catch (Exception e){
		e.printStackTrace();
	}
	

		return null;
	}
	
}
