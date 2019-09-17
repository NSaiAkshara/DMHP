package org.iiitb.hospital.nimhans.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.District_budget;
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.State;
import org.iiitb.hospital.nimhans.modals.StateBudget;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;

public class StateService {
	private Connection connection;
	private ReportService reportService = new ReportService();
	private HospitalService hospitalService = new HospitalService();
	
	public StateService(){
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

	public int getAdminID(String emailId, String password) {
		PreparedStatement pst;
		try {
			pst = connection.prepareStatement("select doctor_id_fk from login where userName =  ? AND password = ?");
			
			pst.setString(1, emailId.trim());
			pst.setString(2, password.trim());

			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				// doctor exist
				
				int admin_id = rs.getInt(1);
				System.out.println(" ajsbajs " + admin_id);
				return admin_id;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		// return false;
		// doctor not found
		return 0;
	}

	public State getStateInfo(String emailID, String password) {
		State state = null;
		int state_id=0, state_id_fk;
		String type, state_name=null, currentDateTime;
		try {
			
			int admin_id = getAdminID(emailID, password);

			String sql = "SELECT `hospital_id_fk`, `type` FROM `doctor_hospital_mapping` WHERE `doctor_id_fk` = ?";
			PreparedStatement pstatement = connection.prepareStatement(sql);
			pstatement.setInt(1, admin_id);
			ResultSet rs1 = pstatement.executeQuery();
			System.out.println(" kdnankdnk " + rs1);
				
			if(rs1.next()){
					state_id_fk = rs1.getInt(1);
					type = rs1.getString(2);

					String sql1 = "SELECT `state_id`, `state_name` FROM `shc` WHERE `state_id`= ?";
					PreparedStatement pstatement1 = connection.prepareStatement(sql1);
					pstatement1.setInt(1, state_id_fk);
					
					ResultSet rs2 = pstatement1.executeQuery();
					System.out.println(" nadkand " + rs2);
							
					if(rs2.next()){
						state_id = rs2.getInt(1);
						state_name = rs2.getString(2);
						
					}
					
					System.out.println(" last of if ");
			}
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			currentDateTime = sdf.format(date);
			state = new State(state_id, state_name, currentDateTime);
			

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return state;
	}

	
	public int createLoginHistory(int admin_id) {
		PreparedStatement pst;
		try {
			pst = connection.prepareStatement("INSERT INTO loginhistory(`doctor_id_fk`, `timeStamp`) VALUES (?,?)");
			pst.setInt(1, admin_id);

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

	
	public ArrayList<Hospital> getAllDistrictHospitals(){
		
		ArrayList <Hospital> DHCHospitals = new ArrayList<>();

		try{
			//create a connection
			
			String sql = "Select dhc_id from dhc";
			PreparedStatement ps;
			
			ps = connection.prepareStatement(sql);
			
			ResultSet result = ps.executeQuery();
			System.out.println(result);
			
			while(result.next()){
				int id = result.getInt(1);
				String type = "dhc";
				System.out.println("jndsndkad" + type);
				Hospital hospital = hospitalService.getHospitalInfo(id, type);
				System.out.println("Hospital "+ hospital);
				DHCHospitals.add(hospital);
				
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return DHCHospitals;
	}
	
//	public Report getReportInfo(int id, String type, Date month){
//		return reportService.getReportInfo(id, type, month);
//	}
//	
//	
//	public List<Hospital> getReportStatus(int id, String type, Date month){
//		return reportService.getReportStatus(id, type, month);
//	}
	

}
