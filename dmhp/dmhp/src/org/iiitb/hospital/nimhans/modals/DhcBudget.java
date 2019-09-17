package org.iiitb.hospital.nimhans.modals;

import java.sql.Date;
import java.sql.Timestamp;

public class DhcBudget {

	private int dhc_budget_expense_id;
	private int dhc_id;
	private int state_budget_master_id_fk;
	private Date report_for_month;
	private Timestamp date_of_reporting;

	//budget heads
	private int salary;
	private int infra;
	private int training;
	private int iec;
	private int targeted_interv;
	private int drugs;
	private int equipments;
	private int op_expenses;
	private int ambulance_services;
	private int misc_travel_contingency;
	private String submitted_by;
	private String remarks;
	
	private int flag_status;

	public DhcBudget() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DhcBudget(int dhc_budget_expense_id, int dhc_id,int state_budget_master_id_fk, Date report_for_month, Timestamp date_of_reporting,
			int salary, int infra, int training, int iec, int targeted_interv, int drugs, int equipments,
			int op_expenses, int ambulance_services, int misc_travel_contingency, String submitted_by, String remarks ,int flag_status) {
		super();
		this.dhc_budget_expense_id = dhc_budget_expense_id;
		this.dhc_id = dhc_id;
		this.state_budget_master_id_fk = state_budget_master_id_fk;
		this.report_for_month = report_for_month;
		this.date_of_reporting = date_of_reporting;
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
		this.submitted_by = submitted_by;
		this.remarks = remarks;
		this.flag_status = flag_status;
	}

	public int getDhc_budget_expense_id() {
		return dhc_budget_expense_id;
	}

	public void setDhc_budget_expense_id(int dhc_budget_expense_id) {
		this.dhc_budget_expense_id = dhc_budget_expense_id;
	}

	public int getState_budget_master_id_fk() {
		return state_budget_master_id_fk;
	}

	public void setState_budget_master_id_fk(int state_budget_master_id_fk) {
		this.state_budget_master_id_fk = state_budget_master_id_fk;
	}

	public int getDhc_id() {
		return dhc_id;
	}

	public void setDhc_id(int dhc_id) {
		this.dhc_id = dhc_id;
	}

	
	public Date getReport_for_month() {
		return report_for_month;
	}

	public void setReport_for_month(Date report_for_month) {
		this.report_for_month = report_for_month;
	}

	public Timestamp getDate_of_reporting() {
		return date_of_reporting;
	}

	public void setDate_of_reporting(Timestamp date_of_reporting) {
		this.date_of_reporting = date_of_reporting;
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

	public String getSubmitted_by() {
		return submitted_by;
	}

	public void setSubmitted_by(String submitted_by) {
		this.submitted_by = submitted_by;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public int getFlag_status() {
		return flag_status;
	}

	public void setFlag_status(int flag_status) {
		this.flag_status = flag_status;
	}

}
