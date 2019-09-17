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
import org.iiitb.hospital.nimhans.modals.DhcHr;
import org.iiitb.hospital.nimhans.modals.Dhcdata;
import org.iiitb.hospital.nimhans.modals.District_budget;
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.StateBudget;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;

import com.mysql.fabric.xmlrpc.base.Data;

import org.iiitb.hospital.nimhans.modals.StateBudget;

public class StateBudgetService {
	
	private Connection connection;
	public StateBudgetService(){
		connection = DataAccessObject.getInstance().Connect();
	}
	
	public List<StateBudget> getDistrictBudgetInfo(int hospital_id, String year) {
		// TODO Auto-generated method stub
		List <StateBudget> districtBudgetInfo = new ArrayList<StateBudget>(); 
		
		try{
			PreparedStatement ps;
			String sql = "SELECT * FROM `state_budget_allocation` WHERE `dhc_id_fk`=? AND `financial_year`= ?";
			ps = connection.prepareStatement(sql);
			
			ps.setInt(1, hospital_id);
			ps.setString(2, year);
			ResultSet result = ps.executeQuery();
			while(result.next()){
				//create a new StateBudget object 
				
				int state_budget_id = result.getInt(1);
				int state_budget_master_id = result.getInt(2);
				String quarter_no = result.getString(6);
				long quarter_amount = result.getLong(7);
				Date amount_release_date = result.getDate(8);
				String remarks = result.getString(9);
				String release_by = result.getString(10);
				int flag_status = result.getInt(11);
				Timestamp create_at = result.getTimestamp(12);
				
				StateBudget report = new StateBudget(state_budget_id, state_budget_master_id, 
						 quarter_no, quarter_amount, amount_release_date, remarks,
						release_by, flag_status, create_at);
				
				districtBudgetInfo.add(report);
				
			}
			
			return districtBudgetInfo;
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}

	//insert data to statebudget
	
public   StateBudget setShcBudgetInfo(StateBudget StateBudget) {
		
		int result = 0;		
		
		try {
			String sql = "INSERT INTO `state_budget_allocation`(`state_budget_master_id`,`quarter_no`, `quarter_amount`, `amount_relase_date`, `remarks`, `release_by`, `flag_status`) VALUES (?,?,?,?,?,?,?)";
		
			PreparedStatement pstatement;
			
            pstatement = connection.prepareStatement(sql);
            
            System.out.println(StateBudget.getAmount_release_date());
			java.util.Date date = new java.util.Date();
			Timestamp timstamp = new Timestamp(date.getTime());
			pstatement.setInt(1, StateBudget.getState_budget_master_id());
			pstatement.setString(2, StateBudget.getQuarter_no());
			pstatement.setLong(3, StateBudget.getQuarter_amount());
			pstatement.setDate(4,StateBudget.getAmount_release_date());
			pstatement.setString(5, StateBudget.getRemarks());
			pstatement.setString(6, StateBudget.getReleased_by());
			pstatement.setInt(7, StateBudget.getFlag_status());
			//pstatement.setInt(10, StateBudget.getReleased_by());
			result = pstatement.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (result <= 0) {

			StateBudget = null;
		}
		
		return StateBudget;
		
	}

public List<Dhcdata> getDhcList() {
	// TODO Auto-generated method stub
	
	List<Dhcdata> DhcinfoList = new ArrayList<Dhcdata>();
	try {
		String sql = "SELECT `dhc_id`,`hospitalName` FROM `dhc`";
		PreparedStatement pstatement;
		pstatement = connection.prepareStatement(sql);
		//pstatement.setInt(1, hospital_id);
		ResultSet rs = pstatement.executeQuery();
		while (rs.next()) {
		int	hospital_id = rs.getInt(1);
		String	hospitalName = rs.getString(2);
		Dhcdata listOfDhcHospital1 =new Dhcdata(hospital_id,hospitalName);
		DhcinfoList.add(listOfDhcHospital1);
		}
		
		return DhcinfoList;
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	
	//////System.out.println("we are here" + listOfhospital);
	//return listOfhospital;
	return null;
}

public StateBudgetMaster setShcMasterBudgetInfo(StateBudgetMaster stateBudgetMaster) {
	// TODO Auto-generated method stub
	int result = 0;		
	System.out.println("Master Table data is here service");
	try {
		String sql = "INSERT INTO `state_budget_master` (`dhc_id`, `shc_id`, `financial_year`, `total_amount_budgeted`) VALUES (?,?,?,?)";
	
		PreparedStatement pstatement;
		
        pstatement = connection.prepareStatement(sql);
        
		pstatement.setInt(1, stateBudgetMaster.getDhc_id());
		pstatement.setInt(2, stateBudgetMaster.getShc_id());
		pstatement.setString(3, stateBudgetMaster.getFinancial_year());
		pstatement.setDouble(4, stateBudgetMaster.getTotal_amount_budgeted());
		result = pstatement.executeUpdate();
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	if (result <= 0) {

		stateBudgetMaster = null;
	}
	
	return stateBudgetMaster;
	
	//return null;
}

public List<StateBudgetMaster> getMasterList(int dhc_id1, String financial_year1) {
	
	//StateBudgetMaster stateBudgetMaster = null;
	System.out.println("coming to here"+dhc_id1+" "+financial_year1);
	List<StateBudgetMaster> stateBudgetMaster =new ArrayList<StateBudgetMaster>();
	try {
		String sql = "SELECT `state_budget_master_id`,`dhc_id`,`shc_id`,`financial_year`,`total_amount_budgeted` FROM `state_budget_master` where `dhc_id`=? and `financial_year`=? ";
		PreparedStatement pstatement;
		pstatement = connection.prepareStatement(sql);
		pstatement.setInt(1, dhc_id1);
		pstatement.setString(2, financial_year1);
		ResultSet rs = pstatement.executeQuery();
		if (rs.next()) {
		int	state_budget_master_id = rs.getInt(1);
		int	dhc_id = rs.getInt(2);
		int	shc_id = rs.getInt(3);
		String financial_year = rs.getString(4);
		double	total_amount_budgeted = rs.getDouble(5);
		StateBudgetMaster stateBudgetMaster1 =new StateBudgetMaster(state_budget_master_id,dhc_id, shc_id, financial_year, total_amount_budgeted);
		stateBudgetMaster.add(stateBudgetMaster1);
		}
		
		return stateBudgetMaster;
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	
	return null;
}


//State biugect
public List<StateBudget> getQMasterList(int state_budget_master_id) {
	
	System.out.println("cameto QQQQDHCLIST232323");
	List<StateBudget> stateBudget =new ArrayList<StateBudget>();
	try {
		String sql = "SELECT `state_budget_id`,`state_budget_master_id`, `quarter_no`,`quarter_amount`,`amount_relase_date`,`remarks`,`release_by`,`flag_status`,`create_at` FROM `state_budget_allocation` WHERE `state_budget_master_id`=?";
		PreparedStatement pstatement;
		pstatement = connection.prepareStatement(sql);
		pstatement.setInt(1, state_budget_master_id);
		//pstatement.setString(2, financial_year1);
		ResultSet rs = pstatement.executeQuery();
		while (rs.next()) {
		int state_budget_id = rs.getInt(1);
		int state_budget_master_id1 = rs.getInt(2);
		String	quarter_no = rs.getString(3);
		long quarter_amount = rs.getInt(4);
		Date amount_relase_date = rs.getDate(5);
		String remarks = rs.getString(6);
		String	release_by = rs.getString(7);
	    int flag_status = rs.getInt(8);
		Timestamp created_at = rs.getTimestamp(9);
		
		
		//StateBudget stateBudget =new StateBudget(quarter_no,quarter_amount, amount_relase_date, remarks, release_by);
		StateBudget stateBudget1 =new StateBudget(state_budget_id,state_budget_master_id1,quarter_no,quarter_amount, amount_relase_date, remarks, release_by,flag_status,created_at);
		stateBudget.add(stateBudget1);
		}
		
		return stateBudget;
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	
	// TODO Auto-generated method stub
	return null;
}

public String getQMastermaxId() {
	String maxshc_id = null;
	try {
	String sql = "SELECT  MAX(`state_budget_master_id`) as `maxshc_id` FROM `state_budget_master`";
	PreparedStatement pstatement;
	pstatement = connection.prepareStatement(sql);
	ResultSet rs = pstatement.executeQuery();
	if(rs.next()) {
			maxshc_id = rs.getString(1);
	}
	
	System.out.println(maxshc_id);
	return maxshc_id;
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	
	// TODO Auto-generated method stub
	return null;
}
public String get_hospitalinfo(int dhc_id) {
	try
	{
		System.out.println("new functionvghvhgv---------------------------");

	String sql = "SELECT `hospitalName` FROM `dhc` where `dhc_id`=? ";
	PreparedStatement pstatement;
	pstatement = connection.prepareStatement(sql);
	pstatement.setInt(1,dhc_id);
	ResultSet rs = pstatement.executeQuery();
	String hospitalname=null;;
	if(rs.next()) {
		 hospitalname = rs.getString(1);
	}
	System.out.println(hospitalname+"---------------------------");

	return hospitalname;
	}
	 catch (SQLException e) {
			System.out.println("Error");

		}
		return null;
	
}
boolean checkif_dhc(String hospital_name,ArrayList<String> dhc_hospital_list) {
	 if(dhc_hospital_list.contains(hospital_name))
	 {
		 return true;
	 }
	return false;
}
public List<District_budget> get_state_budget_master(String financial_year1) {
	
	//StateBudgetMaster stateBudgetMaster = null;
	StateService stateService = new StateService();
	ArrayList <Hospital> DHCHospitals = new ArrayList<>();
	DHCHospitals = stateService.getAllDistrictHospitals();
	System.out.println("coming to here"+" "+financial_year1);
	List<StateBudgetMaster> stateBudgetMaster =new ArrayList<StateBudgetMaster>();
	List<District_budget > list_dhc=new ArrayList<District_budget >();
    ArrayList<String> dhc_budget_list= new ArrayList<String>();
	try {
		System.out.println("coming to siddu bvghhcf here"+" "+financial_year1);

		String sql = "SELECT `state_budget_master_id`,`dhc_id`,`shc_id`,`financial_year`,`total_amount_budgeted` FROM `state_budget_master` where `financial_year`=? ";
		PreparedStatement pstatement;
		pstatement = connection.prepareStatement(sql);
		pstatement.setString(1, financial_year1);
		ResultSet rs = pstatement.executeQuery();
		while (rs.next()) {
			
		int	state_budget_master_id = rs.getInt(1);
		int	dhc_id = rs.getInt(2);
		dhc_budget_list.add(get_hospitalinfo(dhc_id));
		int	shc_id = rs.getInt(3);
		
		String financial_year = rs.getString(4);
		double	total_amount_budgeted = rs.getDouble(5);
		System.out.println("budget"+" "+total_amount_budgeted);

		StateBudgetMaster stateBudgetMaster1 =new StateBudgetMaster(state_budget_master_id,dhc_id, shc_id, financial_year, total_amount_budgeted);
		stateBudgetMaster.add(stateBudgetMaster1);
		}
		int j=0;
		long Q1=0,Q2=0,Q3=0,Q4=0;
		Date d1 = null,d2 = null,d3 = null,d4 = null;
		
	//	StateBudgetService state_bs=new StateBudgetService();
		for (int i =0;i<DHCHospitals.size();i++){
			if(checkif_dhc(DHCHospitals.get(i).getHospitalName(),dhc_budget_list))
				{
	   			System.out.println(DHCHospitals.get(i).getHospitalName()+j);

				for(StateBudget sb:getQMasterList(stateBudgetMaster.get(j).getState_budget_master_id()))
		           {
		        	   if(sb.getQuarter_no().equals("Q1"))
		        	   {
		        		Q1=sb.getQuarter_amount();
		        		
		        		d1=sb.getAmount_release_date();
		        	   }
		        	   else if(sb.getQuarter_no().equals("Q2"))
		        	   {
		        		Q2=sb.getQuarter_amount();
		        		d2=sb.getAmount_release_date();
		        	   }
		        	   else if(sb.getQuarter_no().equals("Q3"))
		        	   {
		        		Q3=sb.getQuarter_amount();
		        		d3=sb.getAmount_release_date();
		        	   }
		        	   else if(sb.getQuarter_no().equals("Q4"))
		        	   {
		        		Q4=sb.getQuarter_amount();
		        		d4=sb.getAmount_release_date();
		        	   }
		   			System.out.println("date"+d1+d2+d3+d4);

		           }
				String year1=financial_year1.substring(6,10);
				String year2=financial_year1.substring(18,22);
	   			String Date_1=year1+"-04-01";
	   			String Date_2=year2+"-03-31";
	   			Date Date1=Date.valueOf(Date_1);
	   			Date Date2=Date.valueOf(Date_2);
	   			System.out.println(Date1+"--------------------------"+Date2);


				String sql1 = "SELECT `report_for_month`,`salary`,`infrastructure`,`training`,`IEC`,`targeted_interventions`,`drugs`,`equipments`,`operational_expenses`,`ambulatory_services` ,`miscellaneous_travel_contingency` FROM `dhc_budget_expense` where `state_budget_master_id_fk`=? ";
		   		PreparedStatement pstatement1;
				pstatement1 = connection.prepareStatement(sql1);
				pstatement1.setInt(1, stateBudgetMaster.get(j).getState_budget_master_id());
				ResultSet rs1 = pstatement1.executeQuery();
				int	salary =0;
				int	infrastructure = 0;
				int	training = 0;
				int	IEC =0;
				int	targeted_interventions = 0;
				int	drugs = 0;
				int	equipments =0;
				int	operational_expenses = 0;
				int	ambulatory_services = 0;
				int	miscellaneous_travel_contingency = 0;
				while (rs1.next()) {
					Date report_for_month=rs1.getDate(1);
					if(report_for_month.compareTo(Date1)>=0 &&report_for_month.compareTo(Date2)<=0)
					{			   			System.out.println("report_for_month");

			   			System.out.println(report_for_month);

					salary+=rs1.getInt(2);
					infrastructure+=rs1.getInt(3);
					training +=rs1.getInt(4);
					IEC+=rs1.getInt(5);
					targeted_interventions+=rs1.getInt(6);
					drugs+=rs1.getInt(7);
					equipments+=rs1.getInt(8);
					operational_expenses+=rs1.getInt(9);
					ambulatory_services+=rs1.getInt(10);
					miscellaneous_travel_contingency+=rs1.getInt(11);
					}
		   			System.out.println("salary"+"-->"+salary);

					}
				   int total_spent=salary+infrastructure+training+IEC+targeted_interventions+drugs+equipments+operational_expenses+ambulatory_services+miscellaneous_travel_contingency;
	   			     System.out.println("totalspent"+"-->"+total_spent);

		           District_budget disrtict_budget=new District_budget(get_hospitalinfo(stateBudgetMaster.get(j).getDhc_id()),stateBudgetMaster.get(j),Q1,Q2,Q3,Q4,d1,d2,d3,d4,total_spent,salary,infrastructure,training,IEC,targeted_interventions,drugs,equipments,operational_expenses,ambulatory_services,miscellaneous_travel_contingency);
		           list_dhc.add(disrtict_budget);
		           j++;
			}
			else
			{
				District_budget disrtict_budget=new District_budget(DHCHospitals.get(i).getHospitalName(),new StateBudgetMaster(0,0,0,"",0),0,0,0,0,null,null,null,null,0,0,0,0,0,0,0,0,0,0,0);
		        list_dhc.add(disrtict_budget);
			}
		}
			System.out.println("sidduvivek");
			for(int i=0;i<DHCHospitals.size();i++)
{
			System.out.println(DHCHospitals.get(i).getHospitalName()+"-"+checkif_dhc(DHCHospitals.get(i).getHospitalName(),dhc_budget_list));
}
			    

		return list_dhc;
		
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	
	return null;
}
	
	
	
	
	
}
