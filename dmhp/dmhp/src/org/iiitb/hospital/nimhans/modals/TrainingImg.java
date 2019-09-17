package org.iiitb.hospital.nimhans.modals;

import java.sql.Timestamp;

import com.mysql.jdbc.Blob;

import java.sql.Date;

public class TrainingImg implements Comparable<TrainingImg>{
	
	//latest fields
	
	private Blob training_Event_Img1;
	public TrainingImg(){
		super();
	}
	
	
	//in the last of constructor latest fields and make setter and getter

	public TrainingImg( Blob training_Event_Img1) {
		super();
		
		this.training_Event_Img1 = training_Event_Img1;
	}

	public Object getTraining_Event_Img1() {
		return training_Event_Img1;
	}


	public void setTraining_Event_Img1(Blob training_Event_Img1) {
		this.training_Event_Img1 = training_Event_Img1;
	}


	@Override
	public int compareTo(TrainingImg arg0) {
		// TODO Auto-generated method stub
		return 0;
	}
	

	
}

