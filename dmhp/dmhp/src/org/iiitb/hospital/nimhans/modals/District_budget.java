package org.iiitb.hospital.nimhans.modals;
import java.util.Date;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;
public class District_budget {

	String dhc_name;
	StateBudgetMaster statebudgetmaster;
	long quarter_amount1,quarter_amount2,quarter_amount3,quarter_amount4;
	Date amount_released_date1,amount_released_date2,amount_released_date3,amount_released_date4;
	int total_amt_spent;
	 int salary;
	 int infra;
	 int training;
	 int iec;
	 int targeted_interv;
	 int drugs;
	 int equipments;
	 int op_expenses;
	 int ambulance_services;
	 int misc_travel_contingency;

	

	public District_budget() {
		super();
		
	}


	

	public District_budget(String dhc_name, StateBudgetMaster statebudgetmaster, long quarter_amount1,
			long quarter_amount2, long quarter_amount3, long quarter_amount4, Date amount_released_date1,
			Date amount_released_date2, Date amount_released_date3, Date amount_released_date4, int total_amt_spent,
			int salary, int infra, int training, int iec, int targeted_interv, int drugs, int equipments,
			int op_expenses, int ambulance_services, int misc_travel_contingency) {
		super();
		this.dhc_name = dhc_name;
		this.statebudgetmaster = statebudgetmaster;
		this.quarter_amount1 = quarter_amount1;
		this.quarter_amount2 = quarter_amount2;
		this.quarter_amount3 = quarter_amount3;
		this.quarter_amount4 = quarter_amount4;
		this.amount_released_date1 = amount_released_date1;
		this.amount_released_date2 = amount_released_date2;
		this.amount_released_date3 = amount_released_date3;
		this.amount_released_date4 = amount_released_date4;
		this.total_amt_spent = total_amt_spent;
		this.salary = salary;
		this.infra = infra;
		this.training = training;
		this.iec = iec;
		this.targeted_interv = targeted_interv;
		this.drugs = drugs;
		this.equipments = equipments;
		this.op_expenses = op_expenses;
		this.ambulance_services = ambulance_services;
		this.misc_travel_contingency = misc_travel_contingency;
	}




	public String getDhc_name() {
		return dhc_name;
	}




	public void setDhc_name(String dhc_name) {
		this.dhc_name = dhc_name;
	}




	public StateBudgetMaster getStatebudgetmaster() {
		return statebudgetmaster;
	}




	public void setStatebudgetmaster(StateBudgetMaster statebudgetmaster) {
		this.statebudgetmaster = statebudgetmaster;
	}




	public long getQuarter_amount1() {
		return quarter_amount1;
	}




	public void setQuarter_amount1(long quarter_amount1) {
		this.quarter_amount1 = quarter_amount1;
	}




	public long getQuarter_amount2() {
		return quarter_amount2;
	}




	public void setQuarter_amount2(long quarter_amount2) {
		this.quarter_amount2 = quarter_amount2;
	}




	public long getQuarter_amount3() {
		return quarter_amount3;
	}




	public void setQuarter_amount3(long quarter_amount3) {
		this.quarter_amount3 = quarter_amount3;
	}




	public long getQuarter_amount4() {
		return quarter_amount4;
	}




	public void setQuarter_amount4(long quarter_amount4) {
		this.quarter_amount4 = quarter_amount4;
	}




	public Date getAmount_released_date1() {
		return amount_released_date1;
	}




	public void setAmount_released_date1(Date amount_released_date1) {
		this.amount_released_date1 = amount_released_date1;
	}




	public Date getAmount_released_date2() {
		return amount_released_date2;
	}




	public void setAmount_released_date2(Date amount_released_date2) {
		this.amount_released_date2 = amount_released_date2;
	}




	public Date getAmount_released_date3() {
		return amount_released_date3;
	}




	public void setAmount_released_date3(Date amount_released_date3) {
		this.amount_released_date3 = amount_released_date3;
	}




	public Date getAmount_released_date4() {
		return amount_released_date4;
	}




	public void setAmount_released_date4(Date amount_released_date4) {
		this.amount_released_date4 = amount_released_date4;
	}




	public int getTotal_amt_spent() {
		return total_amt_spent;
	}




	public void setTotal_amt_spent(int total_amt_spent) {
		this.total_amt_spent = total_amt_spent;
	}




	public int getSalary() {
		return salary;
	}




	public void setSalary(int salary) {
		this.salary = salary;
	}




	public int getInfra() {
		return infra;
	}




	public void setInfra(int infra) {
		this.infra = infra;
	}




	public int getTraining() {
		return training;
	}




	public void setTraining(int training) {
		this.training = training;
	}




	public int getIec() {
		return iec;
	}




	public void setIec(int iec) {
		this.iec = iec;
	}




	public int getTargeted_interv() {
		return targeted_interv;
	}




	public void setTargeted_interv(int targeted_interv) {
		this.targeted_interv = targeted_interv;
	}




	public int getDrugs() {
		return drugs;
	}




	public void setDrugs(int drugs) {
		this.drugs = drugs;
	}




	public int getEquipments() {
		return equipments;
	}




	public void setEquipments(int equipments) {
		this.equipments = equipments;
	}




	public int getOp_expenses() {
		return op_expenses;
	}




	public void setOp_expenses(int op_expenses) {
		this.op_expenses = op_expenses;
	}




	public int getAmbulance_services() {
		return ambulance_services;
	}




	public void setAmbulance_services(int ambulance_services) {
		this.ambulance_services = ambulance_services;
	}




	public int getMisc_travel_contingency() {
		return misc_travel_contingency;
	}




	public void setMisc_travel_contingency(int misc_travel_contingency) {
		this.misc_travel_contingency = misc_travel_contingency;
	}



	
}
