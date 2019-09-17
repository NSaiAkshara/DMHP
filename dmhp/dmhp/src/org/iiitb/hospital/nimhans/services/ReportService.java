package org.iiitb.hospital.nimhans.services;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.Report;

import com.mysql.jdbc.ResultSetMetaData;
import com.mysql.jdbc.StringUtils;

public class ReportService {
	private Connection connection;
	private HospitalService hospitalService = new HospitalService();
	//public static int hospital_id_1=0;

	public ReportService() {
		connection = DataAccessObject.getInstance().Connect();
	}

	public Report getReportInfo(int hospital_id, String hospitalType, Date reportMonth) {
		
		////System.out.println("getReportInfo function begin ! with id:" + hospital_id + " type :" + hospitalType + " report date" + reportMonth);
		

		hospitalType = hospitalType.toLowerCase();
		Report report = null;
		try {
			
			String sql ="";
			
			////System.out.println();
			
			if(hospitalType=="dlp"){
				
			//System.out.println("dlp query 5/9");
				
			sql = "SELECT CONCAT(DATE_FORMAT(`reportTimeStamp`, '%Y-%m-%d'),' 00:00:00') AS reportTimeStamp,CONCAT(DATE_FORMAT(`reportFor_month_year`, '%Y-%m'),'-01') AS  reportFor_month_year,SUM(`old_smd_male`) AS old_smd_male, SUM(`old_smd_female`) AS old_smd_female, SUM(`new_smd_male`) AS new_smd_male, SUM(`new_smd_female`) AS new_smd_female, SUM(`old_cmd_male`) AS old_cmd_male, SUM(`old_cmd_female`) AS old_cmd_female, SUM(`new_cmd_male`) AS new_cmd_male, SUM(`new_cmd_female`) AS new_cmd_female, SUM(`old_alcohal_male`) AS old_alcohal_male, SUM(`old_alcohal_female`) AS old_alcohal_female, SUM(`new_alcohal_male`) AS new_alcohal_male, SUM(`new_alcohal_female`) AS new_alcohal_female, SUM(`old_male_reffered_to_highercenters`) AS old_male_reffered_to_highercenters, SUM(`old_female_reffered_to_highercenters`) AS old_female_reffered_to_highercenters,SUM(`new_male_reffered_to_highercenters`) AS new_male_reffered_to_highercenters, SUM(`new_female_reffered_to_highercenters`) AS new_female_reffered_to_highercenters, SUM(`new_o1_male`) AS new_o1_male, SUM(`new_o1_female`) AS new_o1_female,SUM(`old_o1_male`) AS old_o1_male,SUM(`old_o1_female`) AS old_o1_female,SUM(`new_o2_male`) AS new_o2_male, SUM(`new_o2_female`) AS new_o2_female,SUM(`old_o2_male`) AS old_o2_male,SUM(`old_o2_female`) AS old_o2_female,SUM(`new_o3_male`) AS new_o3_male, SUM(`new_o3_female`) AS new_o3_female,SUM(`old_o3_male`) AS old_o3_male,SUM(`old_o3_female`) AS old_o3_female,SUM(`new_o4_male`) AS new_o4_male, SUM(`new_o4_female`) AS new_o4_female,SUM(`old_o4_male`) AS old_o4_male,SUM(`old_o4_female`) AS old_o4_female,SUM(`new_o5_male`)  AS new_o5_male, SUM(`new_o5_female`)  AS new_o5_female,SUM(`old_o5_male`) AS old_o5_male,SUM(`old_o5_female`) AS old_o5_female,SUM(`old_psychiatricdisorders_male`) AS old_psychiatricdisorders_male, SUM(`old_psychiatricdisorders_female`) AS old_psychiatricdisorders_female, SUM(`new_psychiatricdisorders_male`) AS new_psychiatricdisorders_male, SUM(`new_psychiatricdisorders_female`) AS new_psychiatricdisorders_female,SUM(`old_male_suicidecases`) AS old_male_suicidecases, SUM(`old_female_suicidecases`) AS old_female_suicidecases, SUM(`new_male_suicidecases`) AS new_male_suicidecases, SUM(`new_female_suicidecases`) AS new_female_suicidecases ,'' AS `remarks`,'' AS `submittedby`,0 AS `no_of_inpatient`, 0 AS `no_of_ect`, 0 AS `name_of_psychi`, 0 AS `name_of_psycho`, 0 AS `name_of_social_worker`, 0 AS `no_of_mano_clinic`, 0 AS `no_of_mr_certificate`, 0 AS `no_of_mi_certificate`, `flag_status`,1 AS `Is_mnc`,`thc_details`,0 AS`no_of_houses_identified`,0 AS `no_of_patient_identified`,`other_data` FROM `report` WHERE `hospital_id_fk` = ? AND LOWER(`hospitalType`) = ?  AND `reportFor_month_year` LIKE ? ";
			
			}else{
				System.out.println("step 4 enters");
			sql = "SELECT `reportTimeStamp`, reportFor_month_year,`old_smd_male`, `old_smd_female`, `new_smd_male`, `new_smd_female`, `old_cmd_male`, `old_cmd_female`, `new_cmd_male`, `new_cmd_female`, `old_alcohal_male`, `old_alcohal_female`, `new_alcohal_male`, `new_alcohal_female`, `old_male_reffered_to_highercenters`, `old_female_reffered_to_highercenters`, `new_male_reffered_to_highercenters`, `new_female_reffered_to_highercenters`, `new_o1_male`, `new_o1_female`,`old_o1_male`,`old_o1_female`,`new_o2_male`, `new_o2_female`,`old_o2_male`,`old_o2_female`,`new_o3_male`, `new_o3_female`,`old_o3_male`,`old_o3_female`,`new_o4_male`, `new_o4_female`,`old_o4_male`,`old_o4_female`,`new_o5_male`, `new_o5_female`,`old_o5_male`,`old_o5_female` ,`remarks`, `old_psychiatricdisorders_male`, `old_psychiatricdisorders_female`, `new_psychiatricdisorders_male`, `new_psychiatricdisorders_female`,`old_male_suicidecases`, `old_female_suicidecases`, `new_male_suicidecases`, `new_female_suicidecases` , `submittedby`, `no_of_inpatient`, `no_of_ect`, `name_of_psychi`, `name_of_psycho`, `name_of_social_worker`, `no_of_mano_clinic`, `no_of_mr_certificate`, `no_of_mi_certificate`, `flag_status`,`thc_details`,`Is_mnc`,`no_of_houses_identified`,`no_of_patient_identified`,`other_data` FROM report WHERE hospital_id_fk = ? AND hospitalType = ? AND reportFor_month_year LIKE ?";
			
			}

			    PreparedStatement pstatement;	
			    pstatement = connection.prepareStatement(sql);
				pstatement.setInt(1, hospital_id);
				pstatement.setString(2, hospitalType.toLowerCase());  
				int year = reportMonth.getYear() + 1900;
				int mon = reportMonth.getMonth() + 1;
				String month = mon / 10 == 0 ? "0" + mon : mon + "";
				pstatement.setString(3, year + "-" + month + "%");
				
				////System.out.println("dateeeee  "+year + "-" + month + "%");
					
			ResultSet rs = pstatement.executeQuery();
			
			////System.out.println(pstatement);
			
			if (rs.next()) {

				Timestamp reportTimeStamp = rs.getTimestamp("reportTimeStamp");
				int old_smd_male = rs.getInt("old_smd_male");
				int old_smd_female = rs.getInt("old_smd_female");
				int new_smd_male = rs.getInt("new_smd_male");
				
				//////System.out.println("data is here"+new_smd_male);
				
				
				int new_smd_female = rs.getInt("new_smd_female");
				int old_cmd_male = rs.getInt("old_cmd_male");
				int old_cmd_female = rs.getInt("old_cmd_female");
				int new_cmd_male = rs.getInt("new_cmd_male");
				int new_cmd_female = rs.getInt("new_cmd_female");
				int old_alcohal_male = rs.getInt("old_alcohal_male");
				int old_alcohal_female = rs.getInt("old_alcohal_female");
				int new_alcohal_male = rs.getInt("new_alcohal_male");
				int new_alcohal_female = rs.getInt("new_alcohal_female");
				int old_male_reffered_to_highercenters = rs.getInt("old_male_reffered_to_highercenters");
				int old_female_reffered_to_highercenters = rs.getInt("old_female_reffered_to_highercenters");
				int new_male_reffered_to_highercenters = rs.getInt("new_male_reffered_to_highercenters");
				int new_female_reffered_to_highercenters = rs.getInt("new_female_reffered_to_highercenters");

				// new fields
				int new_o1_male = rs.getInt("new_o1_male");
				int new_o1_female = rs.getInt("new_o1_female");
				int old_o1_male = rs.getInt("old_o1_male");
				int old_o1_female = rs.getInt("old_o1_female");
				int new_o2_male = rs.getInt("new_o2_male");
				int new_o2_female = rs.getInt("new_o2_female");
				int old_o2_male = rs.getInt("old_o2_male");
				int old_o2_female = rs.getInt("old_o2_female");
				int new_o3_male = rs.getInt("new_o3_male");
				int new_o3_female = rs.getInt("new_o3_female");
				int old_o3_male = rs.getInt("old_o3_male");
				int old_o3_female = rs.getInt("old_o3_female");
				int new_o4_male = rs.getInt("new_o4_male");
				int new_o4_female = rs.getInt("new_o4_female");
				int old_o4_male = rs.getInt("old_o4_male");
				int old_o4_female = rs.getInt("old_o4_female");
				int new_o5_male = rs.getInt("new_o5_male");
				int new_o5_female = rs.getInt("new_o5_female");
				int old_o5_male = rs.getInt("old_o5_male");
				int old_o5_female = rs.getInt("old_o5_female");

				String remarks = rs.getString("remarks");

				int old_psychiatricdisorders_male = rs.getInt("old_psychiatricdisorders_male");
				int old_psychiatricdisorders_female = rs.getInt("old_psychiatricdisorders_female");
				int new_psychiatricdisorders_male = rs.getInt("new_psychiatricdisorders_male");
				int new_psychiatricdisorders_female = rs.getInt("new_psychiatricdisorders_female");

				int old_male_suicidecases = rs.getInt("old_male_suicidecases");
				int old_female_suicidecases = rs.getInt("old_female_suicidecases");
				int new_male_suicidecases = rs.getInt("new_male_suicidecases");
				int new_female_suicidecases = rs.getInt("new_female_suicidecases");
				String submittedBy = rs.getString("submittedby");

				Date reportFor_month_year = rs.getDate("reportFor_month_year");

				int no_of_inpatient = rs.getInt("no_of_inpatient");
				int no_of_ect = rs.getInt("no_of_ect");
				String name_of_psychi = rs.getString("name_of_psychi");
				String name_of_psycho = rs.getString("name_of_psycho");
				String name_of_social_worker = rs.getString("name_of_social_worker");
				int no_of_mano_clinic = rs.getInt("no_of_mano_clinic");
				int no_of_mr_certificate = rs.getInt("no_of_mr_certificate");
				int no_of_mi_certificate = rs.getInt("no_of_mi_certificate");
				int flag_status = rs.getInt("flag_status");
				String thc_details = rs.getString("thc_details");
				int Is_mnc = rs.getInt("Is_mnc");
				int no_of_houses_identified = rs.getInt("no_of_houses_identified");
				int no_of_patient_identified = rs.getInt("no_of_patient_identified");
				String other_data = rs.getString("other_data");

				report = new Report(hospital_id, reportTimeStamp, old_smd_male, old_smd_female, new_smd_male,
						new_smd_female, old_cmd_male, old_cmd_female, new_cmd_male, new_cmd_female, old_alcohal_male,
						old_alcohal_female, new_alcohal_male, new_alcohal_female, old_male_reffered_to_highercenters,
						old_female_reffered_to_highercenters, new_male_reffered_to_highercenters,
						new_female_reffered_to_highercenters, old_male_suicidecases, old_female_suicidecases,
						new_male_suicidecases, new_female_suicidecases, old_psychiatricdisorders_male,
						old_psychiatricdisorders_female, new_psychiatricdisorders_male, new_psychiatricdisorders_female,
						new_o1_male, new_o1_female, old_o1_male, old_o1_female, new_o2_male, new_o2_female, old_o2_male,
						old_o2_female, new_o3_male, new_o3_female, old_o3_male, old_o3_female, new_o4_male,
						new_o4_female, old_o4_male, old_o4_female, new_o5_male, new_o5_female, old_o5_male,
						old_o5_female, no_of_inpatient, no_of_ect, no_of_mano_clinic, no_of_mr_certificate,
						no_of_mi_certificate, name_of_psychi, name_of_psycho, name_of_social_worker, remarks,
						hospitalType, submittedBy, reportFor_month_year, flag_status, thc_details, Is_mnc,no_of_houses_identified,no_of_patient_identified,other_data);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		////////System.out.println("getReportInfo function end ! with report data :" + report);

		return report;

	}

	public Report setReportInfo(Report report) {

//		////////System.out.println("REPORT DATA" + report);

		//System.out.println("sql2 " + report.getReportFor_month_year());
		
		//System.out.println("getthc_details() :  " + report.getthc_details());
		
		//System.out.println("sql2 " + report.getHospitalType());
		int yeardlp =  report.getReportFor_month_year().getYear() + 1900;
		int mondlp =  report.getReportFor_month_year().getMonth() + 1;

		String monthdlp = mondlp / 10 == 0 ? "0" + mondlp : mondlp + "";
		

		String dateofReportdlp="'"+ yeardlp + "-" + monthdlp + "%'";
		
		int result = 0;
		try {
			
			PreparedStatement pstatement1;
			if (report.getHospitalType().equals("dlp")) {
				
				//System.out.println("sql2 -" + report.getthc_details()); 
				
				if (StringUtils.isEmptyOrWhitespaceOnly(report.getthc_details())|| report.getthc_details()== null)
				{
					String sql2  = "SELECT * FROM `report` WHERE `hospital_id_fk` = '" + report.getHospital_id()
				+ "'  AND DATE_FORMAT(`reportFor_month_year`, '%Y-%m') like "+ dateofReportdlp+"  and `hospitalType`='" +  report.getHospitalType()+"' ";
					//System.out.println("sql2 -" + sql2);
				 pstatement1 = connection.prepareStatement(sql2);
				
				}
				else
				{
					
					String sql2_v = "SELECT * FROM `report` WHERE `hospital_id_fk` = '" + report.getHospital_id()
					+ "'  AND DATE_FORMAT(`reportFor_month_year`, '%Y-%m') like "+ dateofReportdlp+"  and `hospitalType`='" +  report.getHospitalType()+"' and `thc_details` = '"+report.getthc_details()+"' ";
					//System.out.println("sql2 -" + sql2_v);
					pstatement1 = connection.prepareStatement(sql2_v);
				}
				
				//System.out.println("THC Details " + report.getthc_details());
				

			} else {
				

				String sql1 = "select * from `report` where `hospital_id_fk`='" + report.getHospital_id()
				+ "' AND DATE_FORMAT(`reportFor_month_year`, '%Y-%m') like "+ dateofReportdlp+"  and `hospitalType`='" +  report.getHospitalType()+"' ";
				
				//System.out.println("sql1 -" + sql1);
				pstatement1 = connection.prepareStatement(sql1);

			}

			ResultSet rs = pstatement1.executeQuery();
			////System.out.println("ps "+ pstatement1);
			if (rs.next() == false) {
				//System.out.println("plural");
				String sql = "INSERT INTO `report` (`hospital_id_fk`, `reportTimeStamp`, `old_smd_male`, `old_smd_female`, `new_smd_male`, `new_smd_female`,"
						+ " `old_cmd_male`, `old_cmd_female`, `new_cmd_male`, `new_cmd_female`, `old_alcohal_male`,"
						+ " `old_alcohal_female`, `new_alcohal_male`, `new_alcohal_female`, `old_male_reffered_to_highercenters`,"
						+ " `old_female_reffered_to_highercenters`, `new_male_reffered_to_highercenters`, "
						+ "`new_female_reffered_to_highercenters`,`new_o1_male`, `new_o1_female`,`old_o1_male`,`old_o1_female`,"
						+ "`new_o2_male`, `new_o2_female`,`old_o2_male`,`old_o2_female`,`new_o3_male`, `new_o3_female`,`old_o3_male`,"
						+ "`old_o3_female`,`new_o4_male`, `new_o4_female`,`old_o4_male`,`old_o4_female`,`new_o5_male`, `new_o5_female`,"
						+ "`old_o5_male`,`old_o5_female`, `remarks`, `old_psychiatricdisorders_male`, `old_psychiatricdisorders_female`, "
						+ "`new_psychiatricdisorders_male`, `new_psychiatricdisorders_female`, `hospitalType`,`old_male_suicidecases`,"
						+ " `old_female_suicidecases`, `new_male_suicidecases`, `new_female_suicidecases`,`submittedby`,"
						+ "`reportFor_month_year`, `no_of_inpatient`, `no_of_ect`, `name_of_psychi`, `name_of_psycho`, "
						+ "`name_of_social_worker`, `no_of_mano_clinic`, `no_of_mr_certificate`, `no_of_mi_certificate`,"
						+ " `flag_status`,`thc_details`,`Is_mnc`,`no_of_houses_identified`,`no_of_patient_identified`,`other_data`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				PreparedStatement pstatement;

				pstatement = connection.prepareStatement(sql);
				////////System.out.println("qwerty1");
				pstatement.setInt(1, report.getHospital_id());

				java.util.Date date = new java.util.Date();
				Timestamp timstamp = new Timestamp(date.getTime());
				pstatement.setTimestamp(2, timstamp);

				pstatement.setInt(3, report.getOld_smd_male());
				pstatement.setInt(4, report.getOld_smd_female());
				pstatement.setInt(5, report.getNew_smd_male());
				pstatement.setInt(6, report.getNew_smd_female());

				pstatement.setInt(7, report.getOld_cmd_male());
				pstatement.setInt(8, report.getOld_cmd_female());
				pstatement.setInt(9, report.getNew_cmd_male());
				pstatement.setInt(10, report.getNew_cmd_female());

				pstatement.setInt(11, report.getOld_alcohal_male());
				pstatement.setInt(12, report.getOld_alcohal_female());
				pstatement.setInt(13, report.getNew_alcohal_male());
				pstatement.setInt(14, report.getNew_alcohal_female());

				pstatement.setInt(15, report.getOld_male_reffered_to_highercenters());
				pstatement.setInt(16, report.getOld_female_reffered_to_highercenters());
				pstatement.setInt(17, report.getNew_male_reffered_to_highercenters());
				pstatement.setInt(18, report.getNew_female_reffered_to_highercenters());

				// new fields
				pstatement.setInt(19, report.getNew_o1_male());
				pstatement.setInt(20, report.getNew_o1_female());
				pstatement.setInt(21, report.getOld_o1_male());
				pstatement.setInt(22, report.getOld_o1_female());
				pstatement.setInt(23, report.getNew_o2_male());
				pstatement.setInt(24, report.getNew_o2_female());
				pstatement.setInt(25, report.getOld_o2_male());
				pstatement.setInt(26, report.getOld_o2_female());
				pstatement.setInt(27, report.getNew_o3_male());
				pstatement.setInt(28, report.getNew_o3_female());
				pstatement.setInt(29, report.getOld_o3_male());
				pstatement.setInt(30, report.getOld_o3_female());
				pstatement.setInt(31, report.getNew_o4_male());
				pstatement.setInt(32, report.getNew_o4_female());
				pstatement.setInt(33, report.getOld_o4_male());
				pstatement.setInt(34, report.getOld_o4_female());
				pstatement.setInt(35, report.getNew_o5_male());
				pstatement.setInt(36, report.getNew_o5_female());
				pstatement.setInt(37, report.getOld_o5_male());
				pstatement.setInt(38, report.getOld_o5_female());

				pstatement.setString(39, report.getRemarks());

				pstatement.setInt(40, report.getOld_psychiatricdisorders_male());
				pstatement.setInt(41, report.getOld_psychiatricdisorders_female());
				pstatement.setInt(42, report.getNew_psychiatricdisorders_male());
				pstatement.setInt(43, report.getNew_psychiatricdisorders_female());

				pstatement.setString(44, report.getHospitalType());

				pstatement.setInt(45, report.getOld_male_suicidecases());
				pstatement.setInt(46, report.getOld_female_suicidecases());
				pstatement.setInt(47, report.getNew_male_suicidecases());
				pstatement.setInt(48, report.getNew_female_suicidecases());
				pstatement.setString(49, report.getSubmittedby());

				pstatement.setDate(50, report.getReportFor_month_year());

				pstatement.setInt(51, report.getNo_of_inpatient());
				pstatement.setInt(52, report.getNo_of_ect());
				pstatement.setString(53, report.getName_of_psychi());
				pstatement.setString(54, report.getName_of_psycho());
				pstatement.setString(55, report.getName_of_social_worker());
				pstatement.setInt(56, report.getNo_of_mano_clinic());
				pstatement.setInt(57, report.getNo_of_mr_certificate());
				pstatement.setInt(58, report.getNo_of_mi_certificate());
				pstatement.setInt(59, report.getflag_status());

				// DLP fielsds
				pstatement.setString(60, report.getthc_details());
				
				
			if(report.getHospitalType().equals("dlp")) {
				//System.out.println("its hacking here  "+report.getIs_mnc());
				pstatement.setInt(61, report.getIs_mnc());
			}else {
				pstatement.setInt(61, 0);
			}
				pstatement.setInt(62, report.getno_of_houses_identified());
				pstatement.setInt(63, report.getno_of_patient_identified());
				if(report.getIs_mnc() == 3) {
					pstatement.setString(64, report.getOther_data());
				}else {
					pstatement.setString(64, null);
				}
					
				////////System.out.println("psat "+ pstatement);
				////////System.out.println("qwerty2");
				result = pstatement.executeUpdate();
				////////System.out.println("qwerty3");
				report.setReportTimeStamp(timstamp);
				////////System.out.println("qwerty4");

			} else {
				//System.out.println("Data is comming to here     " + report.getHospitalType());

				if (report.getflag_status() == 3 || report.getflag_status() == 4) {
					//System.out.println("we r here"+report.getHospitalType());
					// approve and reject Query is here report.getHospitalType()
					if(report.getHospitalType().equals("dlp")){
						
				//	String sql = "UPDATE `report` SET  `flag_status`= ?  WHERE `reportFor_month_year`='"
					//		+ report.getReportFor_month_year() + "' and `hospital_id_fk`='" + report.getHospital_id()
						//	+ "'";
						////System.out.println(" upadte"+report.getReportFor_month_year());
						
						int year =  report.getReportFor_month_year().getYear() + 1900;
						int mon =  report.getReportFor_month_year().getMonth() + 1;

						String month = mon / 10 == 0 ? "0" + mon : mon + "";
						

						String dateofReport="'"+ year + "-" + month + "%'";
						
				    String sql = "UPDATE `report` SET `flag_status`="+report.getflag_status()+" WHERE `hospital_id_fk`= "+report.getHospital_id()+"  and DATE_FORMAT(`reportFor_month_year`, '%Y-%m')  LIKE "+ dateofReport+" and `hospitalType` ='"+ report.getHospitalType()+"' AND `flag_status`=2 AND `Is_mnc`=1";
				    ////System.out.println("update Query"+sql);
				    //System.out.println(sql);
					PreparedStatement pstatement;
					pstatement = connection.prepareStatement(sql);

					result = pstatement.executeUpdate();
					
					}else{
						
						String sql = "UPDATE `report` SET  `flag_status`= ?  WHERE `reportFor_month_year`='" + report.getReportFor_month_year() + "' and `hospital_id_fk`='" + report.getHospital_id()+ "' and `hospitalType` ='"+ report.getHospitalType()+"'";
						
						//System.out.println("we r here8888"+sql);
						
						PreparedStatement pstatement;
						pstatement = connection.prepareStatement(sql);
						pstatement.setInt(1, report.getflag_status());
						result = pstatement.executeUpdate();
						
					}

				} else {
					////////System.out.println("alalalala");
					
					PreparedStatement pstatement;
					if (StringUtils.isEmptyOrWhitespaceOnly(report.getthc_details())|| report.getthc_details()== null)
					//if (report.getthc_details()== null)
					{
						String sql = "UPDATE `report` SET `hospital_id_fk`= ?, `reportTimeStamp`= ?, `old_smd_male`= ?, `old_smd_female`= ?, `new_smd_male`= ?, `new_smd_female`= ?, `old_cmd_male`= ?, `old_cmd_female`= ?, `new_cmd_male`= ?, `new_cmd_female`= ?, `old_alcohal_male`= ?, `old_alcohal_female`= ?, `new_alcohal_male`= ?, `new_alcohal_female`= ?, `old_male_reffered_to_highercenters`= ?,`old_female_reffered_to_highercenters`= ?, `new_male_reffered_to_highercenters`= ?, `new_female_reffered_to_highercenters`= ?,`new_o1_male`=?,`new_o1_female`=?,`old_o1_male`=?,`old_o1_female`=?,`new_o2_male`=?,`new_o2_female`=?,`old_o2_male`=?,`old_o2_female`=?,`new_o3_male`=?,`new_o3_female`=?,`old_o3_male`=?,`old_o3_female`=?,`new_o4_male`=?,`new_o4_female`=?,`old_o4_male`=?,`old_o4_female`=?,`new_o5_male`=?,`new_o5_female`=?,`old_o5_male`=?,`old_o5_female`=?, `remarks`= ?, `old_psychiatricdisorders_male`= ?, `old_psychiatricdisorders_female`= ?, `new_psychiatricdisorders_male`= ?, `new_psychiatricdisorders_female`= ?, `hospitalType`= ?,`old_male_suicidecases`= ?, `old_female_suicidecases`= ?, `new_male_suicidecases`= ?, `new_female_suicidecases`= ?,`submittedby`= ?,`reportFor_month_year`= ?,`no_of_inpatient`= ?, `no_of_ect`= ?, `name_of_psychi`= ?, `name_of_psycho`= ?, `name_of_social_worker`= ?, `no_of_mano_clinic`= ?, `no_of_mr_certificate`= ?, `no_of_mi_certificate`= ?, `flag_status`= ?,`thc_details`= ? ,`no_of_houses_identified`= ? ,`no_of_patient_identified`= ? ,`Is_mnc`=? ,`other_data`=? WHERE `reportFor_month_year`='"
								+ report.getReportFor_month_year() + "' and `hospital_id_fk`='" + report.getHospital_id()
								+ "'  and `hospitalType` ='"+ report.getHospitalType()+"'";
						//System.out.println("sql null  -" + sql);
						pstatement = connection.prepareStatement(sql);
					
					}
					else
					{
						
						String sql = "UPDATE `report` SET `hospital_id_fk`= ?, `reportTimeStamp`= ?, `old_smd_male`= ?, `old_smd_female`= ?, `new_smd_male`= ?, `new_smd_female`= ?, `old_cmd_male`= ?, `old_cmd_female`= ?, `new_cmd_male`= ?, `new_cmd_female`= ?, `old_alcohal_male`= ?, `old_alcohal_female`= ?, `new_alcohal_male`= ?, `new_alcohal_female`= ?, `old_male_reffered_to_highercenters`= ?,`old_female_reffered_to_highercenters`= ?, `new_male_reffered_to_highercenters`= ?, `new_female_reffered_to_highercenters`= ?,`new_o1_male`=?,`new_o1_female`=?,`old_o1_male`=?,`old_o1_female`=?,`new_o2_male`=?,`new_o2_female`=?,`old_o2_male`=?,`old_o2_female`=?,`new_o3_male`=?,`new_o3_female`=?,`old_o3_male`=?,`old_o3_female`=?,`new_o4_male`=?,`new_o4_female`=?,`old_o4_male`=?,`old_o4_female`=?,`new_o5_male`=?,`new_o5_female`=?,`old_o5_male`=?,`old_o5_female`=?, `remarks`= ?, `old_psychiatricdisorders_male`= ?, `old_psychiatricdisorders_female`= ?, `new_psychiatricdisorders_male`= ?, `new_psychiatricdisorders_female`= ?, `hospitalType`= ?,`old_male_suicidecases`= ?, `old_female_suicidecases`= ?, `new_male_suicidecases`= ?, `new_female_suicidecases`= ?,`submittedby`= ?,`reportFor_month_year`= ?,`no_of_inpatient`= ?, `no_of_ect`= ?, `name_of_psychi`= ?, `name_of_psycho`= ?, `name_of_social_worker`= ?, `no_of_mano_clinic`= ?, `no_of_mr_certificate`= ?, `no_of_mi_certificate`= ?, `flag_status`= ?,`thc_details`= ? ,`no_of_houses_identified`= ? ,`no_of_patient_identified`= ?,`Is_mnc`=? ,`other_data`= ? WHERE `reportFor_month_year`='"
								+ report.getReportFor_month_year() + "' and `hospital_id_fk`='" + report.getHospital_id()
								+ "' and `thc_details`= '" + report.getthc_details() + "' and `hospitalType` ='"+ report.getHospitalType()+"'";
						//System.out.println("sql not  null  -" + sql);
						pstatement = connection.prepareStatement(sql);
					}
					
					
				
					
				
			
				

					pstatement.setInt(1, report.getHospital_id());

					java.util.Date date = new java.util.Date();
					Timestamp timstamp = new Timestamp(date.getTime());
					pstatement.setTimestamp(2, timstamp);

					pstatement.setInt(3, report.getOld_smd_male());
					pstatement.setInt(4, report.getOld_smd_female());
					pstatement.setInt(5, report.getNew_smd_male());
					pstatement.setInt(6, report.getNew_smd_female());

					pstatement.setInt(7, report.getOld_cmd_male());
					pstatement.setInt(8, report.getOld_cmd_female());
					pstatement.setInt(9, report.getNew_cmd_male());
					pstatement.setInt(10, report.getNew_cmd_female());

					pstatement.setInt(11, report.getOld_alcohal_male());
					pstatement.setInt(12, report.getOld_alcohal_female());
					pstatement.setInt(13, report.getNew_alcohal_male());
					pstatement.setInt(14, report.getNew_alcohal_female());

					pstatement.setInt(15, report.getOld_male_reffered_to_highercenters());
					pstatement.setInt(16, report.getOld_female_reffered_to_highercenters());
					pstatement.setInt(17, report.getNew_male_reffered_to_highercenters());
					pstatement.setInt(18, report.getNew_female_reffered_to_highercenters());

					// new fields
					pstatement.setInt(19, report.getNew_o1_male());
					pstatement.setInt(20, report.getNew_o1_female());
					pstatement.setInt(21, report.getOld_o1_male());
					pstatement.setInt(22, report.getOld_o1_female());
					pstatement.setInt(23, report.getNew_o2_male());
					pstatement.setInt(24, report.getNew_o2_female());
					pstatement.setInt(25, report.getOld_o2_male());
					pstatement.setInt(26, report.getOld_o2_female());
					pstatement.setInt(27, report.getNew_o3_male());
					pstatement.setInt(28, report.getNew_o3_female());
					pstatement.setInt(29, report.getOld_o3_male());
					pstatement.setInt(30, report.getOld_o3_female());
					pstatement.setInt(31, report.getNew_o4_male());
					pstatement.setInt(32, report.getNew_o4_female());
					pstatement.setInt(33, report.getOld_o4_male());
					pstatement.setInt(34, report.getOld_o4_female());
					pstatement.setInt(35, report.getNew_o5_male());
					pstatement.setInt(36, report.getNew_o5_female());
					pstatement.setInt(37, report.getOld_o5_male());
					pstatement.setInt(38, report.getOld_o5_female());

					pstatement.setString(39, report.getRemarks());

					pstatement.setInt(40, report.getOld_psychiatricdisorders_male());
					pstatement.setInt(41, report.getOld_psychiatricdisorders_female());
					pstatement.setInt(42, report.getNew_psychiatricdisorders_male());
					pstatement.setInt(43, report.getNew_psychiatricdisorders_female());

					pstatement.setString(44, report.getHospitalType());

					pstatement.setInt(45, report.getOld_male_suicidecases());
					pstatement.setInt(46, report.getOld_female_suicidecases());
					pstatement.setInt(47, report.getNew_male_suicidecases());
					pstatement.setInt(48, report.getNew_female_suicidecases());
					pstatement.setString(49, report.getSubmittedby());

					pstatement.setDate(50, report.getReportFor_month_year());
					pstatement.setInt(51, report.getNo_of_inpatient());
					pstatement.setInt(52, report.getNo_of_ect());
					pstatement.setString(53, report.getName_of_psychi());
					pstatement.setString(54, report.getName_of_psycho());
					pstatement.setString(55, report.getName_of_social_worker());
					pstatement.setInt(56, report.getNo_of_mano_clinic());
					pstatement.setInt(57, report.getNo_of_mr_certificate());
					pstatement.setInt(58, report.getNo_of_mi_certificate());
					pstatement.setInt(59, report.getflag_status());

					// dlp fields
					pstatement.setString(60, report.getthc_details());
					//
					
					pstatement.setInt(61, report.getno_of_houses_identified());
					pstatement.setInt(62, report.getno_of_patient_identified());
					if(report.getHospitalType().equals("dlp")) {
						pstatement.setInt(63, report.getIs_mnc());
						if(report.getIs_mnc() == 3) {
							 pstatement.setString(64, report.getOther_data());
						}else {
							 pstatement.setString(64, null);
						}
					 
					}else {
						pstatement.setInt(63, 0);
						pstatement.setString(64, null);
					}
					result = pstatement.executeUpdate();
					report.setReportTimeStamp(timstamp);

					////////System.out.println("else block");
				} // else condition end

			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		////////System.out.println(report.getSubmittedby() + "setReportinfo funciotn end with reslt :" + result);

		if (result <= 0) {

			report = null;
		}
		////////System.out.println("inside report sevice " + report);
		return report;
	}

	public List<Hospital> getReportStatus(int hospital_id, String hospitalType, Date reportMonth) {

		System.out.println("step 2 enters  "+hospitalType);
		hospitalType = hospitalType.toLowerCase();

		List<Hospital> listOfhospital = hospitalService.getAllChildHospital(hospital_id, hospitalType);
		////System.out.println("step 3 enters");
		//listOfhospital.remove(0);
		List<Hospital> list = new ArrayList<>();
		// if(hospitalType.equalsIgnoreCase("DLP")){
		// ////////System.out.println("fucking i am here ");allTHCManoReports
		// list = getHospitalsWhoSubmittedReport("dhc", reportMonth);
		// ////////System.out.println("size " + list.size());
		//
		// }else{
		//////////System.out.println("Are bhai ");
		list = getHospitalsWhoSubmittedReport(hospitalType, reportMonth,hospital_id);
		//////////System.out.println("mote size is " + list.size());
		// }

//		for (int i = 0; i < list.size(); ++i) {
//		//System.out.println(list.get(i).getHospitalName());
//		}
//		//System.out.println("i am here ");
		//listOfhospital.removeAll(list);
		for (int i = 0; i < listOfhospital.size(); i++) {

			if (list.contains(listOfhospital.get(i))) {
				////System.out.println("bsdk bada waala");
				listOfhospital.get(i).setReportStatus(1);
				String type;
				int id = listOfhospital.get(i).getHospital_id();
				String name = listOfhospital.get(i).getHospitalName();
				//////////System.out.println("id is " + id + " name is " + listOfhospital.get(i).getHospitalName());
				////System.out.println("magic "+hospitalType);
				// hospitalType.equalsIgnoreCase("DLP"));
				if (hospitalType.equalsIgnoreCase("DLP")) {
					System.out.println("step 3 enters here");
					type = "thc";
					try {
						//String sql = "select * from `report` where `hospital_id_fk`= ? and `hospitalType` = ? and  `reportFor_month_year` like ? ";
						String sql="SELECT CONCAT(DATE_FORMAT(`reportTimeStamp`, '%Y-%m-%d'),' 00:00:00') AS reportTimeStamp,CONCAT(DATE_FORMAT(`reportFor_month_year`, '%Y-%m'),'-01') AS  reportFor_month_year,SUM(`old_smd_male`) old_smd_male, SUM(`old_smd_female`) old_smd_female, SUM(`new_smd_male`) new_smd_male, SUM(`new_smd_female`) new_smd_female, SUM(`old_cmd_male`) old_cmd_male, SUM(`old_cmd_female`) old_cmd_female, SUM(`new_cmd_male`) new_cmd_male, SUM(`new_cmd_female`) new_cmd_female, SUM(`old_alcohal_male`) old_alcohal_male, SUM(`old_alcohal_female`) old_alcohal_female, SUM(`new_alcohal_male`) new_alcohal_male, SUM(`new_alcohal_female`) new_alcohal_female, SUM(`old_male_reffered_to_highercenters`) old_male_reffered_to_highercenters, SUM(`old_female_reffered_to_highercenters`) old_female_reffered_to_highercenters,SUM(`new_male_reffered_to_highercenters`) new_male_reffered_to_highercenters, SUM(`new_female_reffered_to_highercenters`) new_female_reffered_to_highercenters, SUM(`new_o1_male`) new_o1_male, SUM(`new_o1_female`) new_o1_female,SUM(`old_o1_male`) old_o1_male,SUM(`old_o1_female`) old_o1_female,SUM(`new_o2_male`) new_o2_male, SUM(`new_o2_female`) new_o2_female,SUM(`old_o2_male`) old_o2_male,SUM(`old_o2_female`) old_o2_female,SUM(`new_o3_male`) new_o3_male, SUM(`new_o3_female`) new_o3_female,SUM(`old_o3_male`) old_o3_male,SUM(`old_o3_female`) old_o3_female,SUM(`new_o4_male`) new_o4_male, SUM(`new_o4_female`) new_o4_female,SUM(`old_o4_male`) old_o4_male,SUM(`old_o4_female`) old_o4_female,SUM(`new_o5_male`) new_o5_male, SUM(`new_o5_female`) new_o5_female,SUM(`old_o5_male`) old_o5_male,SUM(`old_o5_female`) old_o5_female,SUM(`old_psychiatricdisorders_male`) old_psychiatricdisorders_male, SUM(`old_psychiatricdisorders_female`) old_psychiatricdisorders_female, SUM(`new_psychiatricdisorders_male`) new_psychiatricdisorders_male, SUM(`new_psychiatricdisorders_female`) new_psychiatricdisorders_female,SUM(`old_male_suicidecases`) old_male_suicidecases, SUM(`old_female_suicidecases`) old_female_suicidecases, SUM(`new_male_suicidecases`) new_male_suicidecases, SUM(`new_female_suicidecases`) new_female_suicidecases ,'' AS `remarks`,'' AS `submittedby`,0 AS `no_of_inpatient`, 0 AS `no_of_ect`, 0 AS `name_of_psychi`, 0 AS `name_of_psycho`, 0 AS `name_of_social_worker`, 0 AS `no_of_mano_clinic`, 0 AS `no_of_mr_certificate`, 0 AS `no_of_mi_certificate`, `flag_status`, 1 AS `Is_mnc`,`thc_details`,`no_of_houses_identified`,`no_of_patient_identified`,`other_data`  FROM `report` WHERE `hospital_id_fk` = ? AND `hospitalType` = ? AND `reportFor_month_year` LIKE ?   GROUP BY  `thc_details`;";
						PreparedStatement ps = connection.prepareStatement(sql);

						ps.setInt(1, hospital_id);
						ps.setString(2, hospitalType);

						int year = reportMonth.getYear() + 1900;
						int mon = reportMonth.getMonth() + 1;

						String month = mon / 10 == 0 ? "0" + mon : mon + "";

						//System.out.println("year combo :" + year + "-" + month + "%");

						ps.setString(3, year + "-" + month + "%");

						ResultSet rs = ps.executeQuery();

						while (rs.next()) {
							//System.out.println("year combo inside:--");
							String thc_details = rs.getString("thc_details");
							String[] parts = thc_details.split("_");
							String nameOfTHC = parts[0];
							int idOfTHC = Integer.parseInt(parts[1]);
							if (idOfTHC == id && name.equalsIgnoreCase(nameOfTHC)) {
								///////////////////
								Timestamp reportTimeStamp = rs.getTimestamp("reportTimeStamp");
								int old_smd_male = rs.getInt("old_smd_male");
								int old_smd_female = rs.getInt("old_smd_female");
								int new_smd_male = rs.getInt("new_smd_male");
								int new_smd_female = rs.getInt("new_smd_female");
								int old_cmd_male = rs.getInt("old_cmd_male");
								int old_cmd_female = rs.getInt("old_cmd_female");
								int new_cmd_male = rs.getInt("new_cmd_male");
								int new_cmd_female = rs.getInt("new_cmd_female");
								int old_alcohal_male = rs.getInt("old_alcohal_male");
								int old_alcohal_female = rs.getInt("old_alcohal_female");
								int new_alcohal_male = rs.getInt("new_alcohal_male");
								int new_alcohal_female = rs.getInt("new_alcohal_female");
								int old_male_reffered_to_highercenters = rs
										.getInt("old_male_reffered_to_highercenters");
								int old_female_reffered_to_highercenters = rs
										.getInt("old_female_reffered_to_highercenters");
								int new_male_reffered_to_highercenters = rs
										.getInt("new_male_reffered_to_highercenters");
								int new_female_reffered_to_highercenters = rs
										.getInt("new_female_reffered_to_highercenters");

								// new fields
								int new_o1_male = rs.getInt("new_o1_male");
								int new_o1_female = rs.getInt("new_o1_female");
								int old_o1_male = rs.getInt("old_o1_male");
								int old_o1_female = rs.getInt("old_o1_female");
								int new_o2_male = rs.getInt("new_o2_male");
								int new_o2_female = rs.getInt("new_o2_female");
								int old_o2_male = rs.getInt("old_o2_male");
								int old_o2_female = rs.getInt("old_o2_female");
								int new_o3_male = rs.getInt("new_o3_male");
								int new_o3_female = rs.getInt("new_o3_female");
								int old_o3_male = rs.getInt("old_o3_male");
								int old_o3_female = rs.getInt("old_o3_female");
								int new_o4_male = rs.getInt("new_o4_male");
								int new_o4_female = rs.getInt("new_o4_female");
								int old_o4_male = rs.getInt("old_o4_male");
								int old_o4_female = rs.getInt("old_o4_female");
								int new_o5_male = rs.getInt("new_o5_male");
								int new_o5_female = rs.getInt("new_o5_female");
								int old_o5_male = rs.getInt("old_o5_male");
								int old_o5_female = rs.getInt("old_o5_female");

								String remarks = rs.getString("remarks");

								int old_psychiatricdisorders_male = rs.getInt("old_psychiatricdisorders_male");
								int old_psychiatricdisorders_female = rs.getInt("old_psychiatricdisorders_female");
								int new_psychiatricdisorders_male = rs.getInt("new_psychiatricdisorders_male");
								int new_psychiatricdisorders_female = rs.getInt("new_psychiatricdisorders_female");

								int old_male_suicidecases = rs.getInt("old_male_suicidecases");
								int old_female_suicidecases = rs.getInt("old_female_suicidecases");
								int new_male_suicidecases = rs.getInt("new_male_suicidecases");
								int new_female_suicidecases = rs.getInt("new_female_suicidecases");
								String submittedBy = rs.getString("submittedby");

								Date reportFor_month_year = rs.getDate("reportFor_month_year");

								int no_of_inpatient = rs.getInt("no_of_inpatient");
								int no_of_ect = rs.getInt("no_of_ect");
								String name_of_psychi = rs.getString("name_of_psychi");
								String name_of_psycho = rs.getString("name_of_psycho");
								String name_of_social_worker = rs.getString("name_of_social_worker");
								int no_of_mano_clinic = rs.getInt("no_of_mano_clinic");
								int no_of_mr_certificate = rs.getInt("no_of_mr_certificate");
								int no_of_mi_certificate = rs.getInt("no_of_mi_certificate");
								int flag_status = rs.getInt("flag_status");
								int Is_mnc = rs.getInt("Is_mnc");
								
								int no_of_houses_identified = rs.getInt("no_of_houses_identified");
								int no_of_patient_identified = rs.getInt("no_of_patient_identified");
								
								String other_data = rs.getString("other_data");
								
								////System.out.println("name2 is " + other_data);
								
								Report report = new Report(idOfTHC, reportTimeStamp, old_smd_male, old_smd_female,
										new_smd_male, new_smd_female, old_cmd_male, old_cmd_female, new_cmd_male,
										new_cmd_female, old_alcohal_male, old_alcohal_female, new_alcohal_male,
										new_alcohal_female, old_male_reffered_to_highercenters,
										old_female_reffered_to_highercenters, new_male_reffered_to_highercenters,
										new_female_reffered_to_highercenters, old_male_suicidecases,
										old_female_suicidecases, new_male_suicidecases, new_female_suicidecases,
										old_psychiatricdisorders_male, old_psychiatricdisorders_female,
										new_psychiatricdisorders_male, new_psychiatricdisorders_female, new_o1_male,
										new_o1_female, old_o1_male, old_o1_female, new_o2_male, new_o2_female,
										old_o2_male, old_o2_female, new_o3_male, new_o3_female, old_o3_male,
										old_o3_female, new_o4_male, new_o4_female, old_o4_male, old_o4_female,
										new_o5_male, new_o5_female, old_o5_male, old_o5_female, no_of_inpatient,
										no_of_ect, no_of_mano_clinic, no_of_mr_certificate, no_of_mi_certificate,
										name_of_psychi, name_of_psycho, name_of_social_worker, remarks, "THC",
										submittedBy, reportFor_month_year, flag_status, thc_details, Is_mnc, no_of_houses_identified,no_of_patient_identified,other_data);

								listOfhospital.get(i).setHospital_report(report);
								

								break;

								///////////////////
							}
						}

					} catch (Exception e) {
						e.printStackTrace();
					}

				} else {
					
					type = listOfhospital.get(i).getHospitalType();
					listOfhospital.get(i).setHospital_report(getReportInfo(id, type, reportMonth));
					//////System.out.println("name1 is " + listOfhospital.get(i).getHospitalType());
				}

			} else {
				////////System.out.println("name is " + listOfhospital.get(i).getHospitalName());
				listOfhospital.get(i).setReportStatus(0);
			}

		}
		////////System.out.println("getReportStatus function end with list :" + listOfhospital);

		return listOfhospital;

	}

	// dlp THC list code here
	public List<Hospital> getReportStatusDLP(int hospital_id, String hospitalType) {
		try {
			String sql = "SELECT `dhc_id_fk` FROM `dlp` WHERE dlp_id= ?";
			PreparedStatement pstatement;
			pstatement = connection.prepareStatement(sql);
			pstatement.setInt(1, hospital_id);
			ResultSet rs = pstatement.executeQuery();
			if (rs.next()) {
				hospital_id = rs.getInt(1);
				hospitalType = "dhc";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		hospitalType = "dhc";
		List<Hospital> listOfhospital = hospitalService.getAllChildHospital(hospital_id, hospitalType);
		listOfhospital.remove(0);
		////////System.out.println("we are here" + listOfhospital);
		return listOfhospital;

	}

	public List<Hospital> getHospitalsWhoSubmittedReport(String hospitalType, Date reportMonth, int hospital_id) {

		////////System.out.println("getHospitalsWhoSubmittedReport function begins with type :" + hospitalType + " report date"
				//+ reportMonth);
		////System.out.println("heheheheh"+reportMonth);
		hospitalType = hospitalType.toLowerCase();

		List<Hospital> listOfHospital = null;

		StringBuilder sb = new StringBuilder();
		if (hospitalType.equalsIgnoreCase("DHC")) {
			sb.append("(hospitalType = 'DHC' or hospitalType ='THC' or hospitalType ='DLP')");
		} else if (hospitalType.equalsIgnoreCase("THC")) {
			sb.append("(hospitalType ='THC' or hospitalType ='CHC' or hospitalType ='PHC')");
		} else if (hospitalType.equalsIgnoreCase("DLP")) {
			//////
			//System.out.println("bhai matchm ho gaya   "+hospitalType + "-" + "89" + "%");
			try {
				String sql = "SELECT `thc_details` FROM `report` WHERE `hospitalType` = ?  AND `reportFor_month_year` LIKE ? AND `hospital_id_fk`="+hospital_id;
				// first i will fetch all the name of thc whose mnc records
				// exists in the table
				PreparedStatement ps = connection.prepareStatement(sql);
				ps.setString(1, hospitalType);
				int year = reportMonth.getYear() + 1900;
				int mon = reportMonth.getMonth() + 1;

				String month = mon / 10 == 0 ? "0" + mon : mon + "";

				ps.setString(2, year + "-" + month + "%");
			//System.out.println("bhai matchm ho gaya1  "+year + "-" + month + "%");
				ResultSet rs = ps.executeQuery();
				// now i have got all the names of thcs that have submitted the
				// report
				// now i will create objects for corresponding thcs
				List<Hospital> listOfTHCforDLP = new ArrayList<>();

				while (rs.next()) {
					String thc_details = rs.getString(1);
					String[] parts = thc_details.split("_");
					int thc_id = Integer.parseInt(parts[1]);
					//System.out.println("we r here9 999-"+thc_id);

					Hospital thcHospital = hospitalService.getHospitalInfo(thc_id, "thc");
					listOfTHCforDLP.add(thcHospital);

				}
				return listOfTHCforDLP;
			} catch (Exception e) {
				e.printStackTrace();
			}
			// sb.append("(hospitalType ='DLP')");
		} else if (hospitalType.equalsIgnoreCase("CHC")) {
			sb.append("(hospitalType ='CHC' or hospitalType ='PHC')");
		} else {
			sb.append("(hospitalType ='PHC')");
		}

		String sql = "SELECT hospital_id_fk,hospitalType FROM report WHERE (reportFor_month_year LIKE ?) AND "
				+ sb.toString();

		PreparedStatement pstatement;

		try {
			pstatement = connection.prepareStatement(sql);

			// for month

			int year = reportMonth.getYear() + 1900;
			int mon = reportMonth.getMonth() + 1;

			String month = mon / 10 == 0 ? "0" + mon : mon + "";

			pstatement.setString(1, year + "-" + month + "%");

			ResultSet rs = pstatement.executeQuery();
			listOfHospital = new ArrayList<>();

			while (rs.next()) {
				int hospital_id_1 = rs.getInt(1);
				String type = rs.getString(2);
				Hospital hospital = hospitalService.getHospitalInfo(hospital_id_1, type);
				listOfHospital.add(hospital);

			}
			////////System.out.println("listOfHospital size (submitted report :)" + listOfHospital.size());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		////////System.out.println("getHospitalsWhoSubmittedReport function ends with type :" + listOfHospital);

		return listOfHospital;
	}

	public Report getThcValidation(int hospital_id, String hospitalType, Date reportMonth) {

		Report Report = null;
		////////System.out.println("resultSET-------------   " + hospital_id + "   hospitalType   " + hospitalType + "  month  "
				//+ reportMonth);
		try {
			// String sql = "select r.hospital_id_fk,r.flag_status from report r
			// where reportFor_month_year ="+reportMonth+" AND r.hospital_id_fk
			// IN (SELECT t.thc_id FROM thc t WHERE t.dhc_id_fk IN (SELECT
			// dhc_id FROM dhc WHERE dhc_id ="+hospital_id+"))";

			String sql = "select thc_id from thc where dhc_id_fk=" + hospital_id;
			PreparedStatement pstatement;
			pstatement = connection.prepareStatement(sql);
			ResultSet rs = pstatement.executeQuery();
			// getount

			ArrayList<Integer> Thclist = new ArrayList<Integer>();
			while (rs.next()) {

				int i = 1;
				Thclist.add(rs.getInt(i));

				i++;
			}
			////////System.out.println("resultSET---1--1--1-1--1-1--" + Thclist.size());

			// for(int i=1;i<=Thclist.size();i++){

			// ////////System.out.println("select report_id from report where
			// hospital_id_fk="+Thclist.get(i-1)+" and reportFor_month_year =
			// "+reportMonth);

			String sql_rep = "select report_id from report ";// where
																// hospital_id_fk=
																// 23 and
																// reportFor_month_year
																// ="+reportMonth;
			PreparedStatement pstatement_rep;
			pstatement_rep = connection.prepareStatement(sql_rep);
			ResultSet rs1 = pstatement_rep.executeQuery();

			while (rs1.next()) {
				// int j=1;
				////////System.out.println("reporting data is here-----INS ");
				// j++;
			}

			// }

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return Report;

	}

	public List<Report> getAllTHCformonth(int dlp_id, String type, Date date) {
		// TODO Auto-generated method stub
		// get the records entered by this dlp for the selected month
		List<Report> allTHCManoReports = new ArrayList<>();
		try {
			
			//////System.out.println("enter final");
			String sql = "SELECT * FROM `report` WHERE `hospital_id_fk`= ? AND `Is_mnc` = 1 AND `reportFor_month_year` LIKE ? AND flag_status = 2 ";
			PreparedStatement ps = connection.prepareStatement(sql);

			ps.setInt(1, dlp_id);

			int year = date.getYear() + 1900;
			int mon = date.getMonth() + 1;

			String month = mon / 10 == 0 ? "0" + mon : mon + "";

			ps.setString(2, year + "-" + month + "%");

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Timestamp reportTimeStamp = rs.getTimestamp("reportTimeStamp");
				int old_smd_male = rs.getInt("old_smd_male");
				int old_smd_female = rs.getInt("old_smd_female");
				int new_smd_male = rs.getInt("new_smd_male");
				int new_smd_female = rs.getInt("new_smd_female");
				int old_cmd_male = rs.getInt("old_cmd_male");
				int old_cmd_female = rs.getInt("old_cmd_female");
				int new_cmd_male = rs.getInt("new_cmd_male");
				int new_cmd_female = rs.getInt("new_cmd_female");
				int old_alcohal_male = rs.getInt("old_alcohal_male");
				int old_alcohal_female = rs.getInt("old_alcohal_female");
				int new_alcohal_male = rs.getInt("new_alcohal_male");
				int new_alcohal_female = rs.getInt("new_alcohal_female");
				int old_male_reffered_to_highercenters = rs.getInt("old_male_reffered_to_highercenters");
				int old_female_reffered_to_highercenters = rs.getInt("old_female_reffered_to_highercenters");
				int new_male_reffered_to_highercenters = rs.getInt("new_male_reffered_to_highercenters");
				int new_female_reffered_to_highercenters = rs.getInt("new_female_reffered_to_highercenters");

				// new fields
				int new_o1_male = rs.getInt("new_o1_male");
				int new_o1_female = rs.getInt("new_o1_female");
				int old_o1_male = rs.getInt("old_o1_male");
				int old_o1_female = rs.getInt("old_o1_female");
				int new_o2_male = rs.getInt("new_o2_male");
				int new_o2_female = rs.getInt("new_o2_female");
				int old_o2_male = rs.getInt("old_o2_male");
				int old_o2_female = rs.getInt("old_o2_female");
				int new_o3_male = rs.getInt("new_o3_male");
				int new_o3_female = rs.getInt("new_o3_female");
				int old_o3_male = rs.getInt("old_o3_male");
				int old_o3_female = rs.getInt("old_o3_female");
				int new_o4_male = rs.getInt("new_o4_male");
				int new_o4_female = rs.getInt("new_o4_female");
				int old_o4_male = rs.getInt("old_o4_male");
				int old_o4_female = rs.getInt("old_o4_female");
				int new_o5_male = rs.getInt("new_o5_male");
				int new_o5_female = rs.getInt("new_o5_female");
				int old_o5_male = rs.getInt("old_o5_male");
				int old_o5_female = rs.getInt("old_o5_female");

				String remarks = rs.getString("remarks");

				int old_psychiatricdisorders_male = rs.getInt("old_psychiatricdisorders_male");
				int old_psychiatricdisorders_female = rs.getInt("old_psychiatricdisorders_female");
				int new_psychiatricdisorders_male = rs.getInt("new_psychiatricdisorders_male");
				int new_psychiatricdisorders_female = rs.getInt("new_psychiatricdisorders_female");

				int old_male_suicidecases = rs.getInt("old_male_suicidecases");
				int old_female_suicidecases = rs.getInt("old_female_suicidecases");
				int new_male_suicidecases = rs.getInt("new_male_suicidecases");
				int new_female_suicidecases = rs.getInt("new_female_suicidecases");
				String submittedBy = rs.getString("submittedby");

				Date reportFor_month_year = rs.getDate("reportFor_month_year");

				int no_of_inpatient = rs.getInt("no_of_inpatient");
				int no_of_ect = rs.getInt("no_of_ect");
				String name_of_psychi = rs.getString("name_of_psychi");
				String name_of_psycho = rs.getString("name_of_psycho");
				String name_of_social_worker = rs.getString("name_of_social_worker");
				int no_of_mano_clinic = rs.getInt("no_of_mano_clinic");
				int no_of_mr_certificate = rs.getInt("no_of_mr_certificate");
				int no_of_mi_certificate = rs.getInt("no_of_mi_certificate");
				int flag_status = rs.getInt("flag_status");
				String thc_details = rs.getString("thc_details");
				int Is_mnc = rs.getInt("Is_mnc");
				
				int no_of_houses_identified = rs.getInt("no_of_houses_identified");
				int no_of_patient_identified = rs.getInt("no_of_patient_identified");
				String other_data = rs.getString("other_data");

				Report report = new Report(dlp_id, reportTimeStamp, old_smd_male, old_smd_female, new_smd_male,
						new_smd_female, old_cmd_male, old_cmd_female, new_cmd_male, new_cmd_female, old_alcohal_male,
						old_alcohal_female, new_alcohal_male, new_alcohal_female, old_male_reffered_to_highercenters,
						old_female_reffered_to_highercenters, new_male_reffered_to_highercenters,
						new_female_reffered_to_highercenters, old_male_suicidecases, old_female_suicidecases,
						new_male_suicidecases, new_female_suicidecases, old_psychiatricdisorders_male,
						old_psychiatricdisorders_female, new_psychiatricdisorders_male, new_psychiatricdisorders_female,
						new_o1_male, new_o1_female, old_o1_male, old_o1_female, new_o2_male, new_o2_female, old_o2_male,
						old_o2_female, new_o3_male, new_o3_female, old_o3_male, old_o3_female, new_o4_male,
						new_o4_female, old_o4_male, old_o4_female, new_o5_male, new_o5_female, old_o5_male,
						old_o5_female, no_of_inpatient, no_of_ect, no_of_mano_clinic, no_of_mr_certificate,
						no_of_mi_certificate, name_of_psychi, name_of_psycho, name_of_social_worker, remarks, type,
						submittedBy, reportFor_month_year, flag_status, thc_details, Is_mnc,no_of_houses_identified,no_of_patient_identified,other_data);

				allTHCManoReports.add(report);
				////////System.out.println("ALL THC" + allTHCManoReports);

			}

			return allTHCManoReports;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public Report getTHCReportDLP(int dlp_id, String thcname, String type, Date date) {
		// TODO Auto-generated method stub

		try {

			String sql = "SELECT * FROM `report` WHERE `hospital_id_fk` = ? AND `hospitalType` = ? AND `reportFor_month_year` = ? AND `thc_details` = ?";
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setInt(1, dlp_id);
			ps.setString(2, type);
			
			//System.out.println("Ridu pal" + date);
		
			int year = date.getYear() + 1900;
			int mon = date.getMonth() + 1;
			int day = date.getDate();
			String month = mon / 10 == 0 ? "0" + mon : mon + "";
			String dayString = day / 10 == 0 ? "0" + day : day + "";
			
			ps.setString(3, year + "-" + month + "-" + dayString);

			ps.setString(4, thcname);

			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				// create a report object
				Timestamp reportTimeStamp = rs.getTimestamp("reportTimeStamp");
				int old_smd_male = rs.getInt("old_smd_male");
				int old_smd_female = rs.getInt("old_smd_female");
				int new_smd_male = rs.getInt("new_smd_male");
				int new_smd_female = rs.getInt("new_smd_female");
				int old_cmd_male = rs.getInt("old_cmd_male");
				int old_cmd_female = rs.getInt("old_cmd_female");
				int new_cmd_male = rs.getInt("new_cmd_male");
				int new_cmd_female = rs.getInt("new_cmd_female");
				int old_alcohal_male = rs.getInt("old_alcohal_male");
				int old_alcohal_female = rs.getInt("old_alcohal_female");
				int new_alcohal_male = rs.getInt("new_alcohal_male");
				int new_alcohal_female = rs.getInt("new_alcohal_female");
				int old_male_reffered_to_highercenters = rs.getInt("old_male_reffered_to_highercenters");
				int old_female_reffered_to_highercenters = rs.getInt("old_female_reffered_to_highercenters");
				int new_male_reffered_to_highercenters = rs.getInt("new_male_reffered_to_highercenters");
				int new_female_reffered_to_highercenters = rs.getInt("new_female_reffered_to_highercenters");

				// new fields
				int new_o1_male = rs.getInt("new_o1_male");
				int new_o1_female = rs.getInt("new_o1_female");
				int old_o1_male = rs.getInt("old_o1_male");
				int old_o1_female = rs.getInt("old_o1_female");
				int new_o2_male = rs.getInt("new_o2_male");
				int new_o2_female = rs.getInt("new_o2_female");
				int old_o2_male = rs.getInt("old_o2_male");
				int old_o2_female = rs.getInt("old_o2_female");
				int new_o3_male = rs.getInt("new_o3_male");
				int new_o3_female = rs.getInt("new_o3_female");
				int old_o3_male = rs.getInt("old_o3_male");
				int old_o3_female = rs.getInt("old_o3_female");
				int new_o4_male = rs.getInt("new_o4_male");
				int new_o4_female = rs.getInt("new_o4_female");
				int old_o4_male = rs.getInt("old_o4_male");
				int old_o4_female = rs.getInt("old_o4_female");
				int new_o5_male = rs.getInt("new_o5_male");
				int new_o5_female = rs.getInt("new_o5_female");
				int old_o5_male = rs.getInt("old_o5_male");
				int old_o5_female = rs.getInt("old_o5_female");

				String remarks = rs.getString("remarks");

				int old_psychiatricdisorders_male = rs.getInt("old_psychiatricdisorders_male");
				int old_psychiatricdisorders_female = rs.getInt("old_psychiatricdisorders_female");
				int new_psychiatricdisorders_male = rs.getInt("new_psychiatricdisorders_male");
				int new_psychiatricdisorders_female = rs.getInt("new_psychiatricdisorders_female");

				int old_male_suicidecases = rs.getInt("old_male_suicidecases");
				int old_female_suicidecases = rs.getInt("old_female_suicidecases");
				int new_male_suicidecases = rs.getInt("new_male_suicidecases");
				int new_female_suicidecases = rs.getInt("new_female_suicidecases");
				String submittedBy = rs.getString("submittedby");

				Date reportFor_month_year = rs.getDate("reportFor_month_year");

				int no_of_inpatient = rs.getInt("no_of_inpatient");
				int no_of_ect = rs.getInt("no_of_ect");
				String name_of_psychi = rs.getString("name_of_psychi");
				String name_of_psycho = rs.getString("name_of_psycho");
				String name_of_social_worker = rs.getString("name_of_social_worker");
				int no_of_mano_clinic = rs.getInt("no_of_mano_clinic");
				int no_of_mr_certificate = rs.getInt("no_of_mr_certificate");
				int no_of_mi_certificate = rs.getInt("no_of_mi_certificate");
				int flag_status = rs.getInt("flag_status");
				String thc_details = rs.getString("thc_details");
				int Is_mnc = rs.getInt("Is_mnc");
				
				int no_of_houses_identified = rs.getInt("no_of_houses_identified");
				int no_of_patient_identified = rs.getInt("no_of_patient_identified");
				String other_data = rs.getString("other_data");

				Report report = new Report(dlp_id, reportTimeStamp, old_smd_male, old_smd_female, new_smd_male,
						new_smd_female, old_cmd_male, old_cmd_female, new_cmd_male, new_cmd_female, old_alcohal_male,
						old_alcohal_female, new_alcohal_male, new_alcohal_female, old_male_reffered_to_highercenters,
						old_female_reffered_to_highercenters, new_male_reffered_to_highercenters,
						new_female_reffered_to_highercenters, old_male_suicidecases, old_female_suicidecases,
						new_male_suicidecases, new_female_suicidecases, old_psychiatricdisorders_male,
						old_psychiatricdisorders_female, new_psychiatricdisorders_male, new_psychiatricdisorders_female,
						new_o1_male, new_o1_female, old_o1_male, old_o1_female, new_o2_male, new_o2_female, old_o2_male,
						old_o2_female, new_o3_male, new_o3_female, old_o3_male, old_o3_female, new_o4_male,
						new_o4_female, old_o4_male, old_o4_female, new_o5_male, new_o5_female, old_o5_male,
						old_o5_female, no_of_inpatient, no_of_ect, no_of_mano_clinic, no_of_mr_certificate,
						no_of_mi_certificate, name_of_psychi, name_of_psycho, name_of_social_worker, remarks, type,
						submittedBy, reportFor_month_year, flag_status, thc_details, Is_mnc,no_of_houses_identified,no_of_patient_identified,other_data);

				return report;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
