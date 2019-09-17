package org.iiitb.hospital.nimhans.modals;

import java.sql.Date;
import java.sql.Timestamp;

public class StateBudget {

	private int state_budget_id;
	private int state_budget_master_id;
	private String quarter_no;
	private long quarter_amount;
	private Date amount_release_date;
	private String remarks;
	private String released_by;
	private int flag_status;
	private Timestamp created_at;

	public StateBudget() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StateBudget(int state_budget_id, int state_budget_master_id, 
		    String quarter_no, long quarter_amount, Date amount_release_date, String remarks,
			String released_by, int flag_status, Timestamp created_at) {
		super();
		this.state_budget_id = state_budget_id;
		this.state_budget_master_id = state_budget_master_id;
		this.quarter_no = quarter_no;
		this.quarter_amount = quarter_amount;
		this.amount_release_date = amount_release_date;
		this.remarks = remarks;
		this.released_by = released_by;
		this.flag_status = flag_status;
		this.created_at = created_at;
	}

	public int getState_budget_id() {
		return state_budget_id;
	}

	public void setState_budget_id(int state_budget_id) {
		this.state_budget_id = state_budget_id;
	}

	public int getState_budget_master_id() {
		return state_budget_master_id;
	}

	public void setState_budget_master_id(int state_budget_master_id) {
		this.state_budget_master_id = state_budget_master_id;
	}


	public String getQuarter_no() {
		return quarter_no;
	}

	public void setQuarter_no(String quarter_no) {
		this.quarter_no = quarter_no;
	}

	public long getQuarter_amount() {
		return quarter_amount;
	}

	public void setQuarter_amount(long quarter_amount) {
		this.quarter_amount = quarter_amount;
	}

	public Date getAmount_release_date() {
		return amount_release_date;
	}

	public void setAmount_release_date(Date amount_release_date) {
		this.amount_release_date = amount_release_date;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getReleased_by() {
		return released_by;
	}

	public void setReleased_by(String released_by) {
		this.released_by = released_by;
	}

	public int getFlag_status() {
		return flag_status;
	}

	public void setFlag_status(int flag_status) {
		this.flag_status = flag_status;
	}

	public Timestamp getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}

}
