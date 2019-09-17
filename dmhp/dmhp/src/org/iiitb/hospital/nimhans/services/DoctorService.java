package org.iiitb.hospital.nimhans.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.sql.Timestamp;
import java.sql.Date;

import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.Doctor;
import org.iiitb.hospital.nimhans.modals.Hospital;

public class DoctorService {
	private Connection connection;
	//private HospitalService hospitalService = new HospitalService();

	public DoctorService() {
		connection = DataAccessObject.getInstance().Connect();
	}

	public int validateUserName(String emailId) {
		PreparedStatement pst;
		try {
			pst = connection.prepareStatement("select doctor_id_fk from login where userName LIKE  ? ");
			pst.setString(1, emailId);
			ResultSet rs = pst.executeQuery();
			if (rs.next()) {
				return 1; // userName exists
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return 0;
		// userName doesn't exist
	}

	public int getDoctorID(String emailId, String password) {
		PreparedStatement pst;
		try {
			pst = connection.prepareStatement("select doctor_id_fk from login where userName =  ? AND password = ?");
			
			pst.setString(1, emailId.trim());
			pst.setString(2, password.trim());

			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				// doctor exist
				
				int doctor_id = rs.getInt(1);
				System.out.println("we wre getting d_id"+doctor_id);
				return doctor_id;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		// return false;
		// doctor not found
		return 0;
	}

	public Doctor getDoctorInfo(int doctor_id) {
		Doctor doctor = null;

		try {
			String sql = "SELECT fname,mname,lname,specialization FROM doctor WHERE doctor_id = ?";
			PreparedStatement pstatement;

			pstatement = connection.prepareStatement(sql);
			pstatement.setInt(1, doctor_id);
			ResultSet rs = pstatement.executeQuery();
			if (rs.next()) {

				String firstName = rs.getString(1);
				String middleName = rs.getString(2);
				String lastName = rs.getString(3);
				String specialization = rs.getString(4);
				doctor = new Doctor(doctor_id, firstName, middleName, lastName, specialization);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return doctor;
	}

	public int createLoginHistory(int doctor_id) {
		PreparedStatement pst;
		try {
			pst = connection.prepareStatement("INSERT INTO loginhistory(`doctor_id_fk`, `timeStamp`) VALUES (?,?)");
			pst.setInt(1, doctor_id);

			java.util.Date date = new java.util.Date();
			Timestamp timstamp = new Timestamp(date.getTime());
			pst.setTimestamp(2, timstamp);

			int result = pst.executeUpdate();

			if (result>0) {
				return 1;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}
	//DHC dashboard:---
	
	public Hospital getHospitalInfo(int hospital_id, String hospitalType) {

		Hospital hospital = null;
System.out.println("hospitalId"+hospital_id);
		hospitalType = hospitalType.toLowerCase();

		StringBuilder query = new StringBuilder();

		if (hospitalType.equalsIgnoreCase("dhc")) {
			query.append("SELECT `districtName`, `hospitalName`, `sancBeds`, `G_O_NO_Date` FROM `dhc` WHERE ");
		} else if (hospitalType.equalsIgnoreCase("thc")) {
			query.append("SELECT `talukaName`, `hospitalName`, `sancBeds`, `G_O_NO_Date` FROM `thc` WHERE ");
		} else if (hospitalType.equalsIgnoreCase("chc")) {
			query.append("SELECT `communityName`, `hospitalName`, `sancBeds`, `G_O_NO_Date` FROM `chc` WHERE ");
		} else if(hospitalType.equalsIgnoreCase("phc")) {
			query.append("SELECT `primaryName`, `hospitalName`, `sancBeds`, `G_O_NO_Date` FROM `phc` WHERE ");
		}else if(hospitalType.equalsIgnoreCase("dlp")) {
			query.append("SELECT `dlpName`, `hospitalName`, `sancBeds`, `G_O_NO_Date` FROM `dlp` WHERE ");
			
		}
		try {
			query.append(hospitalType + "_id =?");

			System.out.println("getHospitalInfo :" + query.toString()+"hospitalType"+hospitalType);

			PreparedStatement pstatement = connection.prepareStatement(query.toString());
			pstatement.setInt(1, hospital_id);
			ResultSet rs = pstatement.executeQuery();
			System.out.println("resultSET"+rs.toString());
			if (rs.next()) {
                System.out.println("resultSET"+rs.getString(1));
				String name = rs.getString(1);
				String hospitalName = rs.getString(2);
				int sancBeds = rs.getInt(3);
				String G_O_NO_Date = rs.getString(4);
				hospital = new Hospital(hospital_id, name, null, hospitalName, sancBeds, G_O_NO_Date, hospitalType,
						null, null, null, null);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return hospital;
	}
	
	
	
	
public ArrayList<Hospital> getAllTHCHospitals( int hospital_id){
		
		ArrayList <Hospital> THCHospitals = new ArrayList<>();

		try{
			//create a connection
			
			String sql = "Select thc_id from thc where dhc_id_fk="+hospital_id;
			PreparedStatement ps;
			
			ps = connection.prepareStatement(sql);
			
			ResultSet result = ps.executeQuery();
			System.out.println("here the result+0+-+-+00+-"+result);
			
			while(result.next()){
				int id = result.getInt(1);
				String type = "thc";
				System.out.println("jndsndkad" + type);
				Hospital hospital = getHospitalInfo(id, type);
				System.out.println("Hospital "+ hospital);
				THCHospitals.add(hospital);
				
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return THCHospitals;
	}
	
	
	
	
	//dashboard of DHC
//	public Doctor getDHCInfom(String emailID, String password) {
//		Doctor doctor = null;
//		int dhc_id=0, state_id_fk;
//		String type, state_name=null, currentDateTime;
//		try {
//			
//			int doctor_id = getDoctorID(emailID, password);
//
//			String sql = "SELECT `hospital_id_fk`, `type` FROM `doctor_hospital_mapping` WHERE `doctor_id_fk` = ?";
//			PreparedStatement pstatement = connection.prepareStatement(sql);
//			//pstatement.setInt(1, doctor_id);
//			ResultSet rs1 = pstatement.executeQuery();
//			System.out.println(" kdnankdnk " + rs1);
//				
//			if(rs1.next()){
//					state_id_fk = rs1.getInt(1);
//					type = rs1.getString(2);
//
//					String sql1 = "SELECT `dhc_id`, `districtName` FROM `dhc` WHERE `dhc_id`= ?";
//					PreparedStatement pstatement1 = connection.prepareStatement(sql1);
//					//pstatement1.setInt(1, state_id_fk);
//					
//					ResultSet rs2 = pstatement1.executeQuery();
//					System.out.println(" nadkand " + rs2);
//							
//					if(rs2.next()){
//						dhc_id = rs2.getInt(1);
//						//districtName = rs2.getString(2);
//						
//					}
//					
//					System.out.println(" last of if ");
//			}
//			//Date date = new Date();
//		//SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
//			//currentDateTime = sdf.format(date);
//			//state = new State(state_id, state_name, currentDateTime);
//			
//
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//}
}
