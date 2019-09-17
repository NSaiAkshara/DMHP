package org.iiitb.hospital.nimhans.modals;

public class Doctor {
	
	private int doctor_id;
	private String first_name;
	private String middle_name;
	private String last_name;
	private String specialization;
	
	
	public Doctor() {
		super();
	}


	public Doctor(int doctor_id, String first_name, String middle_name, String lasr_name, String specialization) {
		super();
		this.doctor_id = doctor_id;
		this.first_name = first_name;
		this.middle_name = middle_name;
		this.last_name = lasr_name;
		this.specialization = specialization;
	}


	public int getDoctor_id() {
		return doctor_id;
	}


	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}


	public String getFirst_name() {
		return first_name;
	}


	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}


	public String getMiddle_name() {
		return middle_name;
	}


	public void setMiddle_name(String middle_name) {
		this.middle_name = middle_name;
	}


	public String getLasr_name() {
		return last_name;
	}


	public void setLasr_name(String lasr_name) {
		this.last_name = lasr_name;
	}


	public String getSpecialization() {
		return specialization;
	}


	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}


	@Override
	public String toString() {
		return "Doctor [doctor_id=" + doctor_id + ", first_name=" + first_name + ", middle_name=" + middle_name
				+ ", lasr_name=" + last_name + ", specialization=" + specialization + "]";
	}
}
