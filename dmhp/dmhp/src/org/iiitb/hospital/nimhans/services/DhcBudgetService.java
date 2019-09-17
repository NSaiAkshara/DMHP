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
import org.iiitb.hospital.nimhans.modals.DhcBudget;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;

public class DhcBudgetService {

	private Connection connection;
	public DhcBudgetService() {
	
		connection = DataAccessObject.getInstance().Connect();
	}

	public List <DhcBudget> getAllDistrictExpenseInfo(int hospital_id, String reportDate) {
		// TODO Auto-generated method stub
		//this method returns the expenses of all the districts in a particular financial year
		try{
			
			String sql = "SELECT * FROM `dhc_budget_expense` WHERE `report_for_month` = ?";
			//with the above sql query I will get the budget expense for all districts in that
			//month and year
			PreparedStatement pstatement;
			pstatement = connection.prepareStatement(sql);
			
			//setting the date parameters for the preparedStatement
			
			//int report_year = reportDate.getYear() + 1900;
			//int mon = reportDate.getMonth() + 1;

			//String month = mon / 10 == 0 ? "0" + mon : mon + "";
			System.out.println(reportDate);

			//pstatement.setString(1, report_year + "-" + month + "%");
			pstatement.setString(1, reportDate);
			//after setting the parameters , I will execute the query
			
			ResultSet result = pstatement.executeQuery();
			
			//at this point i will get all the districts and their expenses in the selected month
			//now i need to create report objects and add them to a list, that I will return in the end
			
			List <DhcBudget> allDistrictInfo = new ArrayList<DhcBudget>();  
			
			while(result.next()){
				int expense_report_id = result.getInt(1);
				int dhc_id = result.getInt(2);
				int state_budget_master_id_fk =result.getInt(3);
				Date report_for_month = result.getDate(4);
				Timestamp date_of_reporting = result.getTimestamp(5);
				int salary = result.getInt(6);
				int infra = result.getInt(7);
				int training = result.getInt(8);
				int iec = result.getInt(9);
				int targeted_interv = result.getInt(10);
				int drugs = result.getInt(11);
				int equip = result.getInt(12);
				int op_expenses = result.getInt(13);
				int ambul_services = result.getInt(14);
				int misc_travel = result.getInt(15);
				String submittedBy = result.getString(16);
				String remarks = result.getString(17);
				int flag_status = result.getInt(18);
				DhcBudget report = new DhcBudget(expense_report_id, dhc_id,state_budget_master_id_fk, report_for_month, date_of_reporting,
						salary, infra, training, iec, targeted_interv, drugs, equip,
						op_expenses, ambul_services,  misc_travel, submittedBy, remarks, flag_status);
				
				allDistrictInfo.add(report);
				
			}
			
			return allDistrictInfo;

		
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}
	
	//dhc Budget cumulative and percentage
	
	public List<DhcBudget> cumulativebudgetDataReport(int dhc_id1, String report_date) {
		
		//StateBudgetMaster stateBudgetMaster = null;
		 System.out.println("cameto DHCLIST"+report_date);
	try{
			
			String sql = "SELECT SUM(`salary`) as `salary`,SUM(`infrastructure`) as `infrastructure`,SUM(`training`) as `training` ,SUM(`IEC`) as `IEC`,SUM(`targeted_interventions`) as `targeted_interventions`,SUM(`drugs`) as `drugs`,SUM(`equipments`) as `equipments`,SUM(`operational_expenses`) as `operational_expenses`,SUM(`ambulatory_services`) as `ambulatory_services`,SUM(`miscellaneous_travel_contingency`) as `miscellaneous_travel_contingency` FROM `dhc_budget_expense` where `dhc_id_fk`="+dhc_id1+" and `report_for_month` <= ?";
			System.out.println("sql   "+sql);
			PreparedStatement pstatement;
			pstatement = connection.prepareStatement(sql);	
			pstatement.setString(1, report_date);
			ResultSet result = pstatement.executeQuery();
			List <DhcBudget> allDistrictInfo = new ArrayList<DhcBudget>();  
			System.out.println("miscellaneous_travel_contingency");
			while(result.next()){
				int expense_report_id = 0;
				int dhc_id = dhc_id1;
				int state_budget_master_id_fk =0;
				Date report_for_month = null;
				Timestamp date_of_reporting = null;
				int salary = result.getInt("salary");
				int infra = result.getInt("infrastructure");
				int training = result.getInt("training");
				int iec = result.getInt("IEC");
				int targeted_interv = result.getInt("targeted_interventions");
				int drugs = result.getInt("drugs");
				int equip = result.getInt("equipments");
				int op_expenses = result.getInt("operational_expenses");
				int ambul_services = result.getInt("ambulatory_services");
				int misc_travel = result.getInt("miscellaneous_travel_contingency");
				String submittedBy = " ";
				String remarks = " ";
				int flag_status = 0;
				
				DhcBudget report = new DhcBudget(expense_report_id, dhc_id,state_budget_master_id_fk, report_for_month, date_of_reporting,
						salary, infra, training, iec, targeted_interv, drugs, equip,
						op_expenses, ambul_services,  misc_travel, submittedBy, remarks, flag_status);
				
				allDistrictInfo.add(report);
				
				System.out.println(result.getInt("miscellaneous_travel_contingency"));
				
			}
			
			return allDistrictInfo;

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		return null;
	}
	
	
	
	
	
	
	//DHC data entry...
	
	public   DhcBudget setDhcBudgetInfo(DhcBudget DhcBudget) {
		
		int result = 0;		
		 System.out.println(" IEC:   "+DhcBudget.getReport_for_month()+" flag status "+DhcBudget.getFlag_status()+" dhc_id "+DhcBudget.getDhc_id());
		 
		 
		 
		 
		try {
			String sql1 = "SELECT `dhc_budget_expense_id`,`report_for_month` FROM `dhc_budget_expense` WHERE `dhc_id_fk`="+DhcBudget.getDhc_id()+" and `report_for_month`= ?";
			 
            PreparedStatement pstatement1;
            pstatement1 = connection.prepareStatement(sql1);
            pstatement1.setDate(1, DhcBudget.getReport_for_month());
            ResultSet result1 = pstatement1.executeQuery();
       
            if(result1.next()) {
            	
            	int dhc_budget_expense_id = result1.getInt("dhc_budget_expense_id");
            	Date report_for_month = result1.getDate("report_for_month");
            	
            	String sql2="UPDATE `dhc_budget_expense` SET `salary`=?,`infrastructure`=?,`training`=?,`IEC`=?,`targeted_interventions`=?,`drugs`=?,`equipments`=?,`operational_expenses`=?,`ambulatory_services`=?,`miscellaneous_travel_contingency`=?,`remarks`=?,`flag_status`=? WHERE `dhc_budget_expense_id`=? AND`report_for_month`=?";
            	PreparedStatement pstatement2;
				pstatement2 = connection.prepareStatement(sql2);
				pstatement2.setInt(1, DhcBudget.getSalary());
    			pstatement2.setInt(2, DhcBudget.getInfra());
    			pstatement2.setInt(3, DhcBudget.getTraining());
    			pstatement2.setInt(4, DhcBudget.getIec());
    			pstatement2.setInt(5, DhcBudget.getTargeted_interv());
    			pstatement2.setInt(6, DhcBudget.getDrugs());
    			pstatement2.setInt(7, DhcBudget.getEquipments());
    			pstatement2.setInt(8, DhcBudget.getOp_expenses());
    			pstatement2.setInt(9, DhcBudget.getAmbulance_services());
    			pstatement2.setInt(10, DhcBudget.getMisc_travel_contingency());
    			pstatement2.setString(11, DhcBudget.getRemarks());
    			pstatement2.setInt(12, DhcBudget.getFlag_status());
    			pstatement2.setInt(13, dhc_budget_expense_id);
    			pstatement2.setDate(14, report_for_month);
				result = pstatement2.executeUpdate();
            	
            	
            	
            }else {
            	
            	String sql = "INSERT INTO `dhc_budget_expense`(`dhc_id_fk`, `state_budget_master_id_fk`, `report_for_month`, `date_of_reporting`, `salary`, `infrastructure`, `training`, `IEC`, `targeted_interventions`, `drugs`, `equipments`, `operational_expenses`, `ambulatory_services`, `miscellaneous_travel_contingency`, `submittedby`, `remarks`,`flag_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    			PreparedStatement pstatement;
                pstatement = connection.prepareStatement(sql);
    			java.util.Date date = new java.util.Date();
    			Timestamp timstamp = new Timestamp(date.getTime());
    			pstatement.setInt(1, DhcBudget.getDhc_id());
    			pstatement.setInt(2, DhcBudget.getState_budget_master_id_fk());
    			pstatement.setDate(3, DhcBudget.getReport_for_month());
    			pstatement.setTimestamp(4, timstamp);
    			pstatement.setInt(5, DhcBudget.getSalary());
    			pstatement.setInt(6, DhcBudget.getInfra());
    			pstatement.setInt(7, DhcBudget.getTraining());
    			pstatement.setInt(8, DhcBudget.getIec());
    			pstatement.setInt(9, DhcBudget.getTargeted_interv());
    			pstatement.setInt(10, DhcBudget.getDrugs());
    			pstatement.setInt(11, DhcBudget.getEquipments());
    			pstatement.setInt(12, DhcBudget.getOp_expenses());
    			pstatement.setInt(13, DhcBudget.getAmbulance_services());
    			pstatement.setInt(14, DhcBudget.getMisc_travel_contingency());
    			pstatement.setString(15, DhcBudget.getSubmitted_by());
    			pstatement.setString(16, DhcBudget.getRemarks());
    			pstatement.setInt(17, DhcBudget.getFlag_status());
    			result = pstatement.executeUpdate();	
            	
            }
            
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (result <= 0) {

			DhcBudget = null;
		}
		
		return DhcBudget;
		
	}
	
	
	public  List<DhcBudget> getDhcCumilativeInfo(int hospital_id,int month,int year) {
		
		try{
		//PreparedStatement ps;
		//String sql = "SELECT * FROM `trainingreport` WHERE `hospital_id_fk` = ? AND `event_from` LIKE ?";
		//ps = connection.prepareStatement(sql);
		//ps.setInt(1, hospital_id);
		//java.util.Date date = new java.util.Date();
		//Timestamp timstamp = new Timestamp(date.getTime());
		//ps.setTimestamp(2, timstamp);
		
		System.out.println("data here:"+month+"   "+year);
		
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
		
	}
		
}
