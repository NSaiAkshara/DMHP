package org.iiitb.hospital.nimhans.modals;

public class DoctorHospital {

	private Doctor doctor;
	private Hospital hospital;

	public DoctorHospital() {
		super();
	}

	public DoctorHospital(Doctor doctor, Hospital hospital) {
		super();
		this.doctor = doctor;
		this.hospital = hospital;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Hospital getHospital() {
		return hospital;
	}

	public void setHospital(Hospital hospital) {
		this.hospital = hospital;
	}

	@Override
	public String toString() {
		return "DoctorHospital [doctor=" + doctor + ", hospital=" + hospital + "]";
	}

}
