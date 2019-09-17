package org.iiitb.hospital.nimhans.modals;

import java.sql.Timestamp;

import com.mysql.jdbc.Blob;

import java.sql.Date;

public class Training implements Comparable<Training>{
	
	//latest fields
	private int hospital_id;
	private Timestamp training_timestamp;
	private int training_id;
	
	
	private String no_of_events;
	private String specify_others;
	private Date event_from;
	private Date event_to;
	private String target_group;
	private int no_of_patients;
	private String name_of_facility;
	private String report; 
	private String resources_used;
	private String team_members;
	//private Blob training_Event_Img1;
	//private Blob training_Event_Img1;
	public Training(){
		super();
	}
	
	
	//in the last of constructor latest fields and make setter and getter

	public Training(int hospital_id, Timestamp training_timestamp, int training_id, String no_of_events,
			String specify_others, Date event_from, Date event_to, String target_group, int no_of_patients,
			String name_of_facility, String report, String resources_used, String team_members) {
		super();
		this.hospital_id = hospital_id;
		this.training_timestamp = training_timestamp;
		this.training_id = training_id;
		this.no_of_events = no_of_events;
		this.specify_others = specify_others;
		this.event_from = event_from;
		this.event_to = event_to;
		this.target_group = target_group;
		this.no_of_patients = no_of_patients;
		this.name_of_facility = name_of_facility;
		this.report = report;
		this.resources_used = resources_used;
		this.team_members = team_members;
		//this.training_Event_Img1 = training_Event_Img1;
	}

	
	

	public Timestamp getTraining_timestamp() {
		return training_timestamp;
	}

	public void setTraining_timestamp(Timestamp training_timestamp) {
		this.training_timestamp = training_timestamp;
	}

	public int getTraining_id() {
		return training_id;
	}

	public void setTraining_id(int training_id) {
		this.training_id = training_id;
	}

	public int getHospital_id() {
		return hospital_id;
	}

	public void setHospital_id(int hospital_id) {
		this.hospital_id = hospital_id;
	}

	public Timestamp getTrainingTimeStamp() {
		return training_timestamp;
	}

	public void setTrainingTimeStamp(Timestamp trainingTimeStamp) {
		this.training_timestamp = trainingTimeStamp;
	}

	public String getNo_of_events() {
		return no_of_events;
	}

	public void setNo_of_events(String no_of_events) {
		this.no_of_events = no_of_events;
	}

	public String getSpecify_others() {
		return specify_others;
	}

	public void setSpecify_others(String specify_others) {
		this.specify_others = specify_others;
	}

	public Date getEvent_from() {
		
		System.out.println("event_from -----"+event_from);
		return event_from;
	}

	public void setEvent_from(Date event_from) {
		this.event_from = event_from;
	}

	public Date getEvent_to() {
		System.out.println("event_to "+event_to);
		return event_to;
	}

	public void setEvent_to(Date event_to) {
		this.event_to = event_to;
	}

	public String getTarget_group() {
		return target_group;
	}

	public void setTarget_group(String target_group) {
		this.target_group = target_group;
	}

	public int getNo_of_patients() {
		return no_of_patients;
	}

	public void setNo_of_patients(int no_of_patients) {
		this.no_of_patients = no_of_patients;
	}

	public String getName_of_facility() {
		return name_of_facility;
	}

	public void setName_of_facility(String name_of_facility) {
		this.name_of_facility = name_of_facility;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}
	
	
	
	public String getResources_used() {
		return resources_used;
	}


	public void setResources_used(String resources_used) {
		this.resources_used = resources_used;
	}


	public String getTeam_members() {
		return team_members;
	}


	public void setTeam_members(String team_members) {
		this.team_members = team_members;
	}

	
	
	
	

	//latest fields
	@Override
	public String toString() {
		return "Training [no_of_events=" + no_of_events + ", specify_others=" + specify_others + ", event_from="
				+ event_from + ", event_to=" + event_to + ", target_group=" + target_group
				+ ", no_of_patients=" + no_of_patients + ", name_of_facility=" + name_of_facility + ", report="
				+ report + ",hospital_id=" + hospital_id + ",training_timestamp=" + training_timestamp + ",training_id=" + training_id + "]";

	}
	
	@Override
	public int compareTo(Training obj) {
		// TODO Auto-generated method stub
		return obj.getEvent_from().compareTo(this.getEvent_from());
		
	}


	
}

