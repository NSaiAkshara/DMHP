package org.iiitb.hospital.nimhans.modals;

public class StateBudgetMaster {
	
	int state_budget_master_id;
	int dhc_id;
	int shc_id;
	String financial_year;
	double total_amount_budgeted;
	
	public StateBudgetMaster() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public StateBudgetMaster(int state_budget_master_id,int dhc_id,int shc_id,String financial_year,double total_amount_budgeted) {
		
		super();
		this.state_budget_master_id=state_budget_master_id;
		this.dhc_id=dhc_id;
		this.shc_id=shc_id;
		this.financial_year=financial_year;
		this.total_amount_budgeted=total_amount_budgeted;
	}
	
	
	/**
	 * @return the state_budget_master_id
	 */
	public int getState_budget_master_id() {
		return state_budget_master_id;
	}

	/**
	 * @param state_budget_master_id the state_budget_master_id to set
	 */
	public void setState_budget_master_id(int state_budget_master_id) {
		this.state_budget_master_id = state_budget_master_id;
	}

	/**
	 * @return the dhc_id
	 */
	public int getDhc_id() {
		return dhc_id;
	}

	/**
	 * @param dhc_id the dhc_id to set
	 */
	public void setDhc_id(int dhc_id) {
		this.dhc_id = dhc_id;
	}

	/**
	 * @return the shc_id
	 */
	public int getShc_id() {
		return shc_id;
	}

	/**
	 * @param shc_id the shc_id to set
	 */
	public void setShc_id(int shc_id) {
		this.shc_id = shc_id;
	}

	/**
	 * @return the financial_year
	 */
	public String getFinancial_year() {
		return financial_year;
	}

	/**
	 * @param financial_year the financial_year to set
	 */
	public void setFinancial_year(String financial_year) {
		this.financial_year = financial_year;
	}

	/**
	 * @return the total_amount_budgeted
	 */
	public double getTotal_amount_budgeted() {
		return total_amount_budgeted;
	}

	/**
	 * @param total_amount_budgeted the total_amount_budgeted to set
	 */
	public void setTotal_amount_budgeted(double total_amount_budgeted) {
		this.total_amount_budgeted = total_amount_budgeted;
	}
	
	

}
