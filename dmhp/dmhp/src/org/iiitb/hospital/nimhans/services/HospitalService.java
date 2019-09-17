package org.iiitb.hospital.nimhans.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.Doctor;
import org.iiitb.hospital.nimhans.modals.Hospital;

public class HospitalService {
	private Connection connection;

	private DoctorService doctorService = new DoctorService();

	public HospitalService() {
		connection = DataAccessObject.getInstance().Connect();

	}

	public List<Hospital> sortHospitalsByType(List<Hospital> listOfHospital) {

		Collections.sort(listOfHospital, new Comparator<Hospital>() {
			@Override
			public int compare(Hospital o1, Hospital o2) {

				return o1.getHospitalType().compareToIgnoreCase(o2.getHospitalType());
			}
		});
		return listOfHospital;
	}

	public Hospital getHospitalInfo(int hospital_id, String hospitalType) {

		Hospital hospital = null;
//System.out.println("hospitalId"+hospital_id+"   "+hospitalType);
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

			//////System.out.println("getHospitalInfo :" + query.toString()+"hospitalType"+hospitalType);

			PreparedStatement pstatement = connection.prepareStatement(query.toString());
			pstatement.setInt(1, hospital_id);
			ResultSet rs = pstatement.executeQuery();
			//////System.out.println("resultSET"+rs.toString());
			if (rs.next()) {
               // ////System.out.println("resultSET"+rs.getString(1));
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

	public Hospital getHospitalInfoByDoctorID(int doctor_id) {

		Hospital hospital = null;
		int hospital_id = 0;
		String hospitalType = null;
		try {
			String sql = "SELECT hospital_id_fk, type FROM doctor_hospital_mapping WHERE doctor_id_fk=?";

			PreparedStatement pstatement;

			pstatement = connection.prepareStatement(sql);
			pstatement.setInt(1, doctor_id);
			ResultSet rs = pstatement.executeQuery();
			if (rs.next()) {
				hospital_id = rs.getInt(1);
				hospitalType = rs.getString(2);
			}

			// find hospital information
			hospitalType = hospitalType.toLowerCase();

			hospital = getHospitalInfo(hospital_id, hospitalType);
			Doctor doctor = doctorService.getDoctorInfo(doctor_id);

			hospital.setDoctor(doctor);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		// add date only for first timr login and district name
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		hospital.setCurrentDateTime(sdf.format(date));

		String districtName = gethospitalDistrict(hospital_id, hospitalType);

		hospital.setDistrictName(districtName);

		return hospital;
	}
	
	

	
	public List<Hospital> getAllChildHospital(int hospital_id, String hospitalType) {
		
		
		
		//////System.out.println("THIS is DHCid--"+hospital_id+"hospitalType---"+hospitalType);
				
		List<Hospital> lisOfAllChildHospitals = new ArrayList<>();

		if (hospitalType.equalsIgnoreCase("dhc")) {

			
			Hospital hospital = getHospitalInfo(hospital_id, hospitalType);
			if (hospital != null) {
				lisOfAllChildHospitals.add(hospital);

				List<Hospital> listOfTHC = new ArrayList<>();
				

				listOfTHC = getAllHospitals(hospital_id, "thc", "dhc");
				

				lisOfAllChildHospitals.addAll(listOfTHC);
				
				List<Hospital> listOfDLP = new ArrayList<>();
				
				listOfDLP = getAllHospitals(hospital_id, "dlp", "dhc");
				////System.out.println("enter step 3 here");
				
				lisOfAllChildHospitals.addAll(listOfDLP);
				
				//////System.out.println("we r herre--"+lisOfAllChildHospitals);
				
			}
		} else if (hospitalType.equalsIgnoreCase("thc")) {

			Hospital hospital = getHospitalInfo(hospital_id, hospitalType);
			if (hospital != null) {
				lisOfAllChildHospitals.add(hospital);

				List<Hospital> listOfCHC = getAllHospitals(hospital_id, "chc", "thc");

				List<Hospital> listOfPHC = getAllHospitals(hospital_id, "phc", "thc");

				// add all CHC hospitals
				lisOfAllChildHospitals.addAll(listOfCHC);

				// add all PHC hospitals
				lisOfAllChildHospitals.addAll(listOfPHC);

			}

		} else if (hospitalType.equalsIgnoreCase("chc")) {
			Hospital hospital = getHospitalInfo(hospital_id, hospitalType);
			lisOfAllChildHospitals.add(hospital);

		} else if (hospitalType.equalsIgnoreCase("phc")) {
			Hospital hospital = getHospitalInfo(hospital_id, hospitalType);
			lisOfAllChildHospitals.add(hospital);
			
		}else if (hospitalType.equalsIgnoreCase("dlp")) {
        // ////System.out.println("werbhrrrrr-----------ooo");
			//first we should get corresponding dhc_id then get all the child reports under it
			try{
				String sql = "SELECT `dhc_id_fk` FROM `dlp` WHERE `dlp_id` = ?";
				PreparedStatement ps = connection.prepareStatement(sql);
				ps.setInt(1, hospital_id);
				
				int dhc_id = 0;
				ResultSet result = ps.executeQuery();
				if(result.next()){
					dhc_id = result.getInt("dhc_id_fk");
					List<Hospital> allTHCHospitalsforDLP = getAllChildHospital(dhc_id, "dhc");
					allTHCHospitalsforDLP.remove(0);
					//////System.out.println("finally thc list " + allTHCHospitalsforDLP);
					
					
					
					return allTHCHospitalsforDLP;
					
					
				}
				Hospital hospital = getHospitalInfo(hospital_id, hospitalType);
				lisOfAllChildHospitals.add(hospital);
				
				
			}catch(Exception e){
				e.printStackTrace();
			}
			
		}

		return lisOfAllChildHospitals;
	}

	public List<Hospital> getAllHospitals(int hospital_id, String childHospitalType, String parentdHospitalType) {

		List<Hospital> listOfhospitals = null;
		try {

			String sql = "SELECT " + childHospitalType + "_id FROM " + childHospitalType + " WHERE "
					+ parentdHospitalType + "_id_fk = ?";

			//////System.out.println("getAllHospitals :" + sql + " id :" + hospital_id);

			////System.out.println("step 4 here");
			
			PreparedStatement pstatement = connection.prepareStatement(sql);
			pstatement.setInt(1, hospital_id);
			
			ResultSet rs = pstatement.executeQuery();

			listOfhospitals = new ArrayList<>();

			while (rs.next()) {
				int id = rs.getInt(1);
				Hospital hospital = getHospitalInfo(id, childHospitalType);
				listOfhospitals.add(hospital);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return listOfhospitals;
	}

	public Hospital getHospitalDoctorinfo(String emailId, String password) {

		int doctor_id = doctorService.getDoctorID(emailId, password);
		//////System.out.println(doctor_id + "kndjksnjfndkjnfkjsdn");
		Hospital hospital = null;
		if (doctor_id != 0) {
			int loginResult = doctorService.createLoginHistory(doctor_id);
			if (loginResult != 0) {
				hospital = getHospitalInfoByDoctorID(doctor_id);
			}
		}
		return hospital;
	}

	public String gethospitalDistrict(int hospital_id, String hospitalType) {

		hospitalType = hospitalType.toLowerCase();
		//////System.out.println("find disrict query1111111111111111 :" +hospitalType);
		StringBuilder query = new StringBuilder();

		if (hospitalType.equalsIgnoreCase("DHC")) {

			query.append("SELECT `districtName` FROM `dhc` WHERE dhc_id = ?");

		} else if (hospitalType.equalsIgnoreCase("THC")) {

			query.append(
					"SELECT `districtName` FROM `dhc` WHERE dhc_id = (SELECT DISTINCT dhc_id_fk FROM thc WHERE thc_id= ?)");

		} else if (hospitalType.equalsIgnoreCase("CHC")) {
			query.append(
					"SELECT `districtName` FROM `dhc` WHERE dhc_id = (SELECT DISTINCT dhc_id_fk FROM thc WHERE thc_id= (SELECT DISTINCT thc_id_fk FROM chc WHERE chc_id=?))");
		}else if (hospitalType.equalsIgnoreCase("PHC")) {
			query.append(
					"SELECT `districtName` FROM `dhc` WHERE dhc_id = (SELECT DISTINCT dhc_id_fk FROM thc WHERE thc_id= (SELECT DISTINCT thc_id_fk FROM phc WHERE phc_id=?))");
		} else if(hospitalType.equalsIgnoreCase("DLP")){
			query.append(
					"SELECT `districtName` FROM `dhc` WHERE dhc_id = (SELECT DISTINCT dhc_id_fk FROM dlp WHERE dlp_id= ?)");
		}

		//////System.out.println("find disrict query :" + query + " hospital id :" + hospital_id);

		String districtName = null;
		try {

			PreparedStatement pstatement = connection.prepareStatement(query.toString());
			pstatement.setInt(1, hospital_id);
			ResultSet rs = pstatement.executeQuery();

			if (rs.next()) {

				districtName = rs.getString(1);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return districtName;
	}

}
