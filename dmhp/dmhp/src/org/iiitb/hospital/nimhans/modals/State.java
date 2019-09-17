package org.iiitb.hospital.nimhans.modals;

import java.util.List;

public class State {
	private String state_name;
	private Integer state_id;
	private String currentDateTime;
	
	public State() {
		// TODO Auto-generated constructor stub
	}
	
	public State(int id, String state_name,String currentDateTime ){
		this.state_id=id;
		this.state_name = state_name;
		this.currentDateTime = currentDateTime;
	}
	
//	private List <Hospital> listOfAllDistricts;
	
	public String getState_name() {
		return state_name;
	}
	public void setState_name(String state_name) {
		this.state_name = state_name;
	}
	public String getCurrentDateTime() {
		return currentDateTime;
	}

	public void setCurrentDateTime(String currentDateTime) {
		this.currentDateTime = currentDateTime;
	}

	public Integer getState_id() {
		return state_id;
	}
	public void setState_id(Integer state_id) {
		this.state_id = state_id;
	}
//	public List <Hospital> getListOfAllDistricts() {
//		return listOfAllDistricts;
//	}
//	public void setListOfAllDistricts(List <Hospital> listOfAllDistricts) {
//		this.listOfAllDistricts = listOfAllDistricts;
//	}
//	
	
	
}
