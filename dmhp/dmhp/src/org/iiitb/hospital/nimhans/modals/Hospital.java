package org.iiitb.hospital.nimhans.modals;

public class Hospital {

	private Integer hospital_id;
	private String name;
	private String districtName;
	private String hospitalName;
	private Integer sancBeds;
	private String G_O_NO_Date;
	private String hospitalType;
	private Doctor doctor;
	private Integer reportStatus;
	private String currentDateTime;

	private Report hospital_report;

	public Hospital() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Hospital(Integer hospital_id, String name, String districtName, String hospitalName, Integer sancBeds,
			String g_O_NO_Date, String hospitalType, Doctor doctor, Integer reportStatus, String currentDateTime,
			Report hospital_report) {
		super();
		this.hospital_id = hospital_id;
		this.name = name;
		this.districtName = districtName;
		this.hospitalName = hospitalName;
		this.sancBeds = sancBeds;
		G_O_NO_Date = g_O_NO_Date;
		this.hospitalType = hospitalType;
		this.doctor = doctor;
		this.reportStatus = reportStatus;
		this.currentDateTime = currentDateTime;
		this.hospital_report = hospital_report;
	}

	public Integer getHospital_id() {
		return hospital_id;
	}

	public void setHospital_id(Integer hospital_id) {
		this.hospital_id = hospital_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public Integer getSancBeds() {
		return sancBeds;
	}

	public void setSancBeds(Integer sancBeds) {
		this.sancBeds = sancBeds;
	}

	public String getG_O_NO_Date() {
		return G_O_NO_Date;
	}

	public void setG_O_NO_Date(String g_O_NO_Date) {
		G_O_NO_Date = g_O_NO_Date;
	}

	public String getHospitalType() {
		return hospitalType;
	}

	public void setHospitalType(String hospitalType) {
		this.hospitalType = hospitalType;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Integer getReportStatus() {
		return reportStatus;
	}

	public void setReportStatus(Integer reportStatus) {
		this.reportStatus = reportStatus;
	}

	public Report getHospital_report() {
		return hospital_report;
	}

	public void setHospital_report(Report hospital_report) {
		this.hospital_report = hospital_report;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((hospitalType == null) ? 0 : hospitalType.hashCode());
		result = prime * result + ((hospital_id == null) ? 0 : hospital_id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Hospital other = (Hospital) obj;
		if (hospitalType == null) {
			if (other.hospitalType != null)
				return false;
		} else if (!hospitalType.equals(other.hospitalType))
			return false;
		if (hospital_id == null) {
			if (other.hospital_id != null)
				return false;
		} else if (!hospital_id.equals(other.hospital_id))
			return false;
		return true;
	}

	public String getCurrentDateTime() {
		return currentDateTime;
	}

	public void setCurrentDateTime(String currentDateTime) {
		this.currentDateTime = currentDateTime;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

}
