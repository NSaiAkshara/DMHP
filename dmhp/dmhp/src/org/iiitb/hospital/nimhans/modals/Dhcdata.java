package org.iiitb.hospital.nimhans.modals;

public class Dhcdata {
	
	int	hospital_id;
	String	hospitalName;
	
	
	public Dhcdata() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Dhcdata(int hospital_id,String hospitalName) {
		
		super();
		this.hospital_id = hospital_id;
		this.hospitalName = hospitalName;
	}
	
	public int getHospital_id() {
		return hospital_id;
	}

	/**
	 * @param age the age to set
	 */
	public void setHospital_id(int hospital_id) {
		this.hospital_id = hospital_id;
	}


	/**
	 * @return the name
	 */
	public String getHospitalName() {
		
		return hospitalName;
	}

	/**
	 * @param name the name to set
	 */
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}
	

}
