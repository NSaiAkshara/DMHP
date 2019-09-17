package org.iiitb.hospital.nimhans.services;

import java.sql.Blob;
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
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.Report;
import org.iiitb.hospital.nimhans.modals.Training;
import org.iiitb.hospital.nimhans.modals.TrainingImg;


public class TrainingService {

	private Connection connection;

	public TrainingService() {
		connection = DataAccessObject.getInstance().Connect();
	}

	public Training setTrainingInfo(Training training) {
		
	//	System.out.println("training  --- " + training);
	//	System.out.println("yse is blob"+ training.getTraining_Event_Img1());
		
		int result = 0;
		try {
			String sql = "INSERT INTO `trainingreport`(`no_of_events`,`specify_others`,`event_from`,`event_to`,`target_group`,`no_of_patients`,`name_of_facility`,`report`,`hospital_id_fk`, `training_timestamp`,`training_id`, `resources_used`, `team_members`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement pstatement;

			pstatement = connection.prepareStatement(sql);

			pstatement.setString(1, training.getNo_of_events());
			/*java.util.Date date = new java.util.Date();*/
			//System.out.println("from date server  "+training.getEvent_from()+" to date server  "+training.getEvent_to());
			pstatement.setString(2, training.getSpecify_others());
			pstatement.setDate(3, training.getEvent_from());
			pstatement.setDate(4, training.getEvent_to());
			pstatement.setString(5, training.getTarget_group());
			pstatement.setInt(6, training.getNo_of_patients());
			pstatement.setString(7, training.getName_of_facility());
			pstatement.setString(8, training.getReport());
			//latest fields
		
			pstatement.setInt(9, training.getHospital_id());
			java.util.Date date = new java.util.Date();
			Timestamp timstamp = new Timestamp(date.getTime());
			pstatement.setTimestamp(10, timstamp);
			pstatement.setInt(11, training.getTraining_id());
			pstatement.setString(12, training.getResources_used());
			pstatement.setString(13, training.getTeam_members());
			//pstatement.setString(14, "its working path");
			
			result = pstatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (result <= 0) {

			training = null;
		}
		return training;
	}
	
	public List<Training> getTrainingInfo(int hospital_id, Date date){
		
		List<Training> trainingInfo = new ArrayList<Training>();
		try{
//			System.out.println("i aamam  "+ hospital_id);
			PreparedStatement ps;
			String sql = "SELECT * FROM `trainingreport` WHERE `hospital_id_fk` = ? AND `event_from` LIKE ?";
			ps = connection.prepareStatement(sql);
			ps.setInt(1, hospital_id);
			int year = date.getYear() + 1900;
			int month = date.getMonth() + 1;
			String month_string = month / 10 == 0 ? "0" + month : month + "";
			
			System.out.println("Date is " + year + " " + month_string);
			ps.setString(2, year + "-" + month_string + "%");
			
			
			ResultSet result = ps.executeQuery();
			while(result.next()){
				String no_of_events = result.getString(1);
				String specify_others = result.getString(2);
				Date event_from = result.getDate(3);
				Date event_to = result.getDate(4);
				String target_group = result.getString(5);
				int no_of_patients = result.getInt(6);
				String name_of_facility = result.getString(7);
				String report = result.getString(8);
				Timestamp current_timestamp = result.getTimestamp(10);
				int training_id = result.getInt(11);
				String resources_used = result.getString(12);
				String team_members = result.getString(13);
				//Blob training_Event_Img1 = result.getTraining_Event_Img1(14);
				
				//com.mysql.jdbc.Blob training_Event_Img1 = null;
				
				Training training_report = new Training(hospital_id, current_timestamp, training_id, no_of_events,
						specify_others, event_from, event_to, target_group, no_of_patients,
						name_of_facility, report,  resources_used, team_members);
				
				trainingInfo.add(training_report);
			}

			Collections.sort(trainingInfo);
			return trainingInfo;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}

	public Training updateTrainingInfo(Training training,  int training_id) {
		// TODO Auto-generated method stub
		
		int result = 0;
		try{
			String sql = "UPDATE `trainingreport` SET `no_of_events` = ?, `specify_others`= ?, `event_from` = ?, `event_to` = ?, `target_group` = ?, `no_of_patients` = ?, `name_of_facility` = ?, `report` = ?, `hospital_id_fk` = ?, `training_timestamp` = ?, `resources_used` = ?, `team_members` = ?  WHERE `training_id` = ?";
			PreparedStatement ps = connection.prepareStatement(sql);			
		
			ps.setString(1, training.getNo_of_events());
			ps.setString(2, training.getSpecify_others());
			ps.setDate(3,training.getEvent_from());
			ps.setDate(4, training.getEvent_to());
			ps.setString(5, training.getTarget_group());
			ps.setInt(6, training.getNo_of_patients());
			ps.setString(7, training.getName_of_facility());
			ps.setString(8, training.getReport());
			ps.setInt(9, training.getHospital_id());
		
			java.util.Date date = new java.util.Date();
			Timestamp timestamp = new Timestamp(date.getTime());
			ps.setTimestamp(10, timestamp);
			ps.setString(11, training.getResources_used());
			ps.setString(12, training.getTeam_members());
			
			ps.setInt(13, training_id);
			
			System.out.println("training" + training.getTeam_members());
			System.out.println("training" + training.getName_of_facility());
			System.out.println("training" + training_id);
			
			result = ps.executeUpdate();
			if (result <= 0){
				training = null;
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
		return training;
	}

	public int deleteTrainingInfo(int training_id) {
		// TODO Auto-generated method stub
		int result = 0;
		try{
			String sql = "DELETE FROM `trainingreport` WHERE `training_id` = ?";
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setInt(1, training_id);
			System.out.println("training_id " + training_id);
			result = ps.executeUpdate();
			System.out.println(result);
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return result;
	}
	
	
	//upload iMage code starts here
	
	public String getMaxTrainingID(int hospital_id) {
		// TODO Auto-generated method stub
		//int result = 0;
		int max_training_id1=0;
		try{
			String sql = "SELECT MAX(`training_id`) as `traing_max_id` FROM `trainingreport` WHERE `hospital_id_fk`= ?";
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setInt(1, hospital_id);
			//System.out.println("training_id " + hospital_id);
			ResultSet result = ps.executeQuery();
			
			while(result.next()){
				max_training_id1 = result.getInt("traing_max_id");
			}
			
		}catch(Exception e){
			
			e.printStackTrace();
			
		}
		String max_training_id = new Integer(max_training_id1).toString();
		return max_training_id;
	}
	
	public TrainingImg postTrainingImg(TrainingImg training,  int training_id) {
		// TODO Auto-generated method stub
		
		int result = 0;
		try{
			String sql = "UPDATE `trainingreport` SET `img1_path` = ?  WHERE `training_id` ="+ training_id;
			PreparedStatement ps = connection.prepareStatement(sql);			
		
			ps.setString(1, "data url");
			
			result = ps.executeUpdate();
			if (result <= 0){
				training = null;
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
		return training;
	}
	
	
}
