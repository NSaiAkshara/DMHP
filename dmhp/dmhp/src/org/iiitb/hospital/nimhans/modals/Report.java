package org.iiitb.hospital.nimhans.modals;

import java.sql.Timestamp;
import java.sql.Date;

public class Report {
	private int hospital_id;
	private Timestamp reportTimeStamp;

	private int old_smd_male;
	private int old_smd_female;
	private int new_smd_male;
	private int new_smd_female;

	private int old_cmd_male;
	private int old_cmd_female;
	private int new_cmd_male;
	private int new_cmd_female;

	private int old_alcohal_male;
	private int old_alcohal_female;
	private int new_alcohal_male;
	private int new_alcohal_female;

	private int old_male_reffered_to_highercenters;
	private int old_female_reffered_to_highercenters;
	private int new_male_reffered_to_highercenters;
	private int new_female_reffered_to_highercenters;

	private int old_male_suicidecases;
	private int old_female_suicidecases;
	private int new_male_suicidecases;
	private int new_female_suicidecases;

	private Integer old_psychiatricdisorders_male;
	private Integer old_psychiatricdisorders_female;
	private Integer new_psychiatricdisorders_male;
	private Integer new_psychiatricdisorders_female;
	
	
//new fields
	
	
	private int new_o1_male;
	private int new_o1_female;
	private int old_o1_male;
	private int old_o1_female;
	private int new_o2_male;
	private int new_o2_female;
	private int old_o2_male;
	private int old_o2_female;
	private int new_o3_male;
	private int new_o3_female;
	private int old_o3_male;
	private int old_o3_female;
	private int new_o4_male;
	private int new_o4_female;
	private int old_o4_male;
	private int old_o4_female;
	private int new_o5_male;
	private int new_o5_female;
	private int old_o5_male;
	private int old_o5_female;
	
	private int no_of_inpatient;
	private int no_of_ect;
	private int no_of_mano_clinic;
	private int no_of_mr_certificate;
	private int no_of_mi_certificate;
	private String name_of_psychi;
	private String name_of_psycho;
	private String name_of_social_worker;

	private String remarks;	
	
	
	private String hospitalType;
	private String submittedby;

	private Date reportFor_month_year;
	private int flag_status;
	
	//DLC fields
	private String thc_details;
	private int is_mnc;
	
	//new DHC fields
	private int no_of_houses_identified;
	private int no_of_patient_identified;
	
	private String other_data;
	
	public Report() {
		super();
	}
	
	
	
	public Report(int hospital_id, Timestamp reportTimeStamp, int old_smd_male, int old_smd_female, int new_smd_male,
			int new_smd_female, int old_cmd_male, int old_cmd_female, int new_cmd_male, int new_cmd_female,
			int old_alcohal_male, int old_alcohal_female, int new_alcohal_male, int new_alcohal_female,
			int old_male_reffered_to_highercenters, int old_female_reffered_to_highercenters,
			int new_male_reffered_to_highercenters, int new_female_reffered_to_highercenters, int old_male_suicidecases,
			int old_female_suicidecases, int new_male_suicidecases, int new_female_suicidecases,
			Integer old_psychiatricdisorders_male, Integer old_psychiatricdisorders_female,
			Integer new_psychiatricdisorders_male, Integer new_psychiatricdisorders_female, int new_o1_male,
			int new_o1_female, int old_o1_male, int old_o1_female, int new_o2_male, int new_o2_female, int old_o2_male,
			int old_o2_female, int new_o3_male, int new_o3_female, int old_o3_male, int old_o3_female, int new_o4_male,
			int new_o4_female, int old_o4_male, int old_o4_female, int new_o5_male, int new_o5_female, int old_o5_male,
			int old_o5_female, int no_of_inpatient, int no_of_ect, int no_of_mano_clinic, int no_of_mr_certificate,
			int no_of_mi_certificate, String name_of_psychi, String name_of_psycho, String name_of_social_worker,
			String remarks, String hospitalType, String submittedby, Date reportFor_month_year,int flag_status,String thc_details,int is_mnc,int no_of_houses_identified,int no_of_patient_identified,String other_data) {
		super();
		this.hospital_id = hospital_id;
		this.reportTimeStamp = reportTimeStamp;
		this.old_smd_male = old_smd_male;
		this.old_smd_female = old_smd_female;
		this.new_smd_male = new_smd_male;
		this.new_smd_female = new_smd_female;
		this.old_cmd_male = old_cmd_male;
		this.old_cmd_female = old_cmd_female;
		this.new_cmd_male = new_cmd_male;
		this.new_cmd_female = new_cmd_female;
		this.old_alcohal_male = old_alcohal_male;
		this.old_alcohal_female = old_alcohal_female;
		this.new_alcohal_male = new_alcohal_male;
		this.new_alcohal_female = new_alcohal_female;
		this.old_male_reffered_to_highercenters = old_male_reffered_to_highercenters;
		this.old_female_reffered_to_highercenters = old_female_reffered_to_highercenters;
		this.new_male_reffered_to_highercenters = new_male_reffered_to_highercenters;
		this.new_female_reffered_to_highercenters = new_female_reffered_to_highercenters;
		this.old_male_suicidecases = old_male_suicidecases;
		this.old_female_suicidecases = old_female_suicidecases;
		this.new_male_suicidecases = new_male_suicidecases;
		this.new_female_suicidecases = new_female_suicidecases;
		this.old_psychiatricdisorders_male = old_psychiatricdisorders_male;
		this.old_psychiatricdisorders_female = old_psychiatricdisorders_female;
		this.new_psychiatricdisorders_male = new_psychiatricdisorders_male;
		this.new_psychiatricdisorders_female = new_psychiatricdisorders_female;
		this.new_o1_male = new_o1_male;
		this.new_o1_female = new_o1_female;
		this.old_o1_male = old_o1_male;
		this.old_o1_female = old_o1_female;
		this.new_o2_male = new_o2_male;
		this.new_o2_female = new_o2_female;
		this.old_o2_male = old_o2_male;
		this.old_o2_female = old_o2_female;
		this.new_o3_male = new_o3_male;
		this.new_o3_female = new_o3_female;
		this.old_o3_male = old_o3_male;
		this.old_o3_female = old_o3_female;
		this.new_o4_male = new_o4_male;
		this.new_o4_female = new_o4_female;
		this.old_o4_male = old_o4_male;
		this.old_o4_female = old_o4_female;
		this.new_o5_male = new_o5_male;
		this.new_o5_female = new_o5_female;
		this.old_o5_male = old_o5_male;
		this.old_o5_female = old_o5_female;
		this.no_of_inpatient = no_of_inpatient;
		this.no_of_ect = no_of_ect;
		this.no_of_mano_clinic = no_of_mano_clinic;
		this.no_of_mr_certificate = no_of_mr_certificate;
		this.no_of_mi_certificate = no_of_mi_certificate;
		this.name_of_psychi = name_of_psychi;
		this.name_of_psycho = name_of_psycho;
		this.name_of_social_worker = name_of_social_worker;
		this.remarks = remarks;
		this.hospitalType = hospitalType;
		this.submittedby = submittedby;
		this.reportFor_month_year = reportFor_month_year;
		this.flag_status = flag_status;
		this.thc_details =thc_details;
		this.is_mnc =is_mnc;
		this.no_of_houses_identified =no_of_houses_identified;
		this.no_of_patient_identified =no_of_patient_identified;
		this.other_data =other_data;
		
	}



	public int getNo_of_inpatient() {
		return no_of_inpatient;
	}

	public void setNo_of_inpatient(int no_of_inpatient) {
		this.no_of_inpatient = no_of_inpatient;
	}

	public int getNo_of_ect() {
		return no_of_ect;
	}

	public void setNo_of_ect(int no_of_ect) {
		this.no_of_ect = no_of_ect;
	}

	public int getNo_of_mano_clinic() {
		return no_of_mano_clinic;
	}

	public void setNo_of_mano_clinic(int no_of_mano_clinic) {
		this.no_of_mano_clinic = no_of_mano_clinic;
	}

	public int getNo_of_mr_certificate() {
		return no_of_mr_certificate;
	}

	public void setNo_of_mr_certificate(int no_of_mr_certificate) {
		this.no_of_mr_certificate = no_of_mr_certificate;
	}

	public int getNo_of_mi_certificate() {
		return no_of_mi_certificate;
	}

	public void setNo_of_mi_certificate(int no_of_mi_certificate) {
		this.no_of_mi_certificate = no_of_mi_certificate;
	}

	public String getName_of_psychi() {
		return name_of_psychi;
	}

	public void setName_of_psychi(String name_of_psychi) {
		this.name_of_psychi = name_of_psychi;
	}

	public String getName_of_psycho() {
		return name_of_psycho;
	}

	public void setName_of_psycho(String name_of_psycho) {
		this.name_of_psycho = name_of_psycho;
	}

	public String getName_of_social_worker() {
		return name_of_social_worker;
	}

	public void setName_of_social_worker(String name_of_social_worker) {
		this.name_of_social_worker = name_of_social_worker;
	}


	public int getNew_o1_male() {
		return new_o1_male;
	}

	public void setNew_o1_male(int new_o1_male) {
		this.new_o1_male = new_o1_male;
	}

	public int getNew_o1_female() {
		return new_o1_female;
	}

	public void setNew_o1_female(int new_o1_female) {
		this.new_o1_female = new_o1_female;
	}

	public int getOld_o1_male() {
		return old_o1_male;
	}

	public void setOld_o1_male(int old_o1_male) {
		this.old_o1_male = old_o1_male;
	}

	public int getOld_o1_female() {
		return old_o1_female;
	}

	public void setOld_o1_female(int old_o1_female) {
		this.old_o1_female = old_o1_female;
	}

	public int getNew_o2_male() {
		return new_o2_male;
	}

	public void setNew_o2_male(int new_o2_male) {
		this.new_o2_male = new_o2_male;
	}

	public int getNew_o2_female() {
		return new_o2_female;
	}

	public void setNew_o2_female(int new_o2_female) {
		this.new_o2_female = new_o2_female;
	}

	public int getOld_o2_male() {
		return old_o2_male;
	}

	public void setOld_o2_male(int old_o2_male) {
		this.old_o2_male = old_o2_male;
	}

	public int getOld_o2_female() {
		return old_o2_female;
	}

	public void setOld_o2_female(int old_o2_female) {
		this.old_o2_female = old_o2_female;
	}

	public int getNew_o3_male() {
		return new_o3_male;
	}

	public void setNew_o3_male(int new_o3_male) {
		this.new_o3_male = new_o3_male;
	}

	public int getNew_o3_female() {
		return new_o3_female;
	}

	public void setNew_o3_female(int new_o3_female) {
		this.new_o3_female = new_o3_female;
	}

	public int getOld_o3_male() {
		return old_o3_male;
	}

	public void setOld_o3_male(int old_o3_male) {
		this.old_o3_male = old_o3_male;
	}

	public int getOld_o3_female() {
		return old_o3_female;
	}

	public void setOld_o3_female(int old_o3_female) {
		this.old_o3_female = old_o3_female;
	}

	public int getNew_o4_male() {
		return new_o4_male;
	}

	public void setNew_o4_male(int new_o4_male) {
		this.new_o4_male = new_o4_male;
	}

	public int getNew_o4_female() {
		return new_o4_female;
	}

	public void setNew_o4_female(int new_o4_female) {
		this.new_o4_female = new_o4_female;
	}

	public int getOld_o4_male() {
		return old_o4_male;
	}

	public void setOld_o4_male(int old_o4_male) {
		this.old_o4_male = old_o4_male;
	}

	public int getOld_o4_female() {
		return old_o4_female;
	}

	public void setOld_o4_female(int old_o4_female) {
		this.old_o4_female = old_o4_female;
	}

	public int getNew_o5_male() {
		return new_o5_male;
	}

	public void setNew_o5_male(int new_o5_male) {
		this.new_o5_male = new_o5_male;
	}

	public int getNew_o5_female() {
		return new_o5_female;
	}

	public void setNew_o5_female(int new_o5_female) {
		this.new_o5_female = new_o5_female;
	}

	public int getOld_o5_male() {
		return old_o5_male;
	}

	public void setOld_o5_male(int old_o5_male) {
		this.old_o5_male = old_o5_male;
	}

	public int getOld_o5_female() {
		return old_o5_female;
	}

	public void setOld_o5_female(int old_o5_female) {
		this.old_o5_female = old_o5_female;
	}

	public int getHospital_id() {
		return hospital_id;
	}

	public void setHospital_id(int hospital_id) {
		this.hospital_id = hospital_id;
	}

	public Timestamp getReportTimeStamp() {
		return reportTimeStamp;
	}

	public void setReportTimeStamp(Timestamp reportTimeStamp) {
		this.reportTimeStamp = reportTimeStamp;
	}

	public int getOld_smd_male() {
		return old_smd_male;
	}

	public void setOld_smd_male(int old_smd_male) {
		this.old_smd_male = old_smd_male;
	}

	public int getOld_smd_female() {
		return old_smd_female;
	}

	public void setOld_smd_female(int old_smd_female) {
		this.old_smd_female = old_smd_female;
	}

	public int getNew_smd_male() {
		return new_smd_male;
	}

	public void setNew_smd_male(int new_smd_male) {
		this.new_smd_male = new_smd_male;
	}

	public int getNew_smd_female() {
		return new_smd_female;
	}

	public void setNew_smd_female(int new_smd_female) {
		this.new_smd_female = new_smd_female;
	}

	public int getOld_cmd_male() {
		return old_cmd_male;
	}

	public void setOld_cmd_male(int old_cmd_male) {
		this.old_cmd_male = old_cmd_male;
	}

	public int getOld_cmd_female() {
		return old_cmd_female;
	}

	public void setOld_cmd_female(int old_cmd_female) {
		this.old_cmd_female = old_cmd_female;
	}

	public int getNew_cmd_male() {
		return new_cmd_male;
	}

	public void setNew_cmd_male(int new_cmd_male) {
		this.new_cmd_male = new_cmd_male;
	}

	public int getNew_cmd_female() {
		return new_cmd_female;
	}

	public void setNew_cmd_female(int new_cmd_female) {
		this.new_cmd_female = new_cmd_female;
	}

	public int getOld_alcohal_male() {
		return old_alcohal_male;
	}

	public void setOld_alcohal_male(int old_alcohal_male) {
		this.old_alcohal_male = old_alcohal_male;
	}

	public int getOld_alcohal_female() {
		return old_alcohal_female;
	}

	public void setOld_alcohal_female(int old_alcohal_female) {
		this.old_alcohal_female = old_alcohal_female;
	}

	public int getNew_alcohal_male() {
		return new_alcohal_male;
	}

	public void setNew_alcohal_male(int new_alcohal_male) {
		this.new_alcohal_male = new_alcohal_male;
	}

	public int getNew_alcohal_female() {
		return new_alcohal_female;
	}

	public void setNew_alcohal_female(int new_alcohal_female) {
		this.new_alcohal_female = new_alcohal_female;
	}

	public int getOld_male_reffered_to_highercenters() {
		return old_male_reffered_to_highercenters;
	}

	public void setOld_male_reffered_to_highercenters(int old_male_reffered_to_highercenters) {
		this.old_male_reffered_to_highercenters = old_male_reffered_to_highercenters;
	}

	public int getOld_female_reffered_to_highercenters() {
		return old_female_reffered_to_highercenters;
	}

	public void setOld_female_reffered_to_highercenters(int old_female_reffered_to_highercenters) {
		this.old_female_reffered_to_highercenters = old_female_reffered_to_highercenters;
	}

	public int getNew_male_reffered_to_highercenters() {
		return new_male_reffered_to_highercenters;
	}

	public void setNew_male_reffered_to_highercenters(int new_male_reffered_to_highercenters) {
		this.new_male_reffered_to_highercenters = new_male_reffered_to_highercenters;
	}

	public int getNew_female_reffered_to_highercenters() {
		return new_female_reffered_to_highercenters;
	}

	public void setNew_female_reffered_to_highercenters(int new_female_reffered_to_highercenters) {
		this.new_female_reffered_to_highercenters = new_female_reffered_to_highercenters;
	}

	public int getOld_male_suicidecases() {
		return old_male_suicidecases;
	}

	public void setOld_male_suicidecases(int old_male_suicidecases) {
		this.old_male_suicidecases = old_male_suicidecases;
	}

	public int getOld_female_suicidecases() {
		return old_female_suicidecases;
	}

	public void setOld_female_suicidecases(int old_female_suicidecases) {
		this.old_female_suicidecases = old_female_suicidecases;
	}

	public int getNew_male_suicidecases() {
		return new_male_suicidecases;
	}

	public void setNew_male_suicidecases(int new_male_suicidecases) {
		this.new_male_suicidecases = new_male_suicidecases;
	}

	public int getNew_female_suicidecases() {
		return new_female_suicidecases;
	}

	public void setNew_female_suicidecases(int new_female_suicidecases) {
		this.new_female_suicidecases = new_female_suicidecases;
	}

	public Integer getOld_psychiatricdisorders_male() {
		return old_psychiatricdisorders_male;
	}

	public void setOld_psychiatricdisorders_male(Integer old_psychiatricdisorders_male) {
		this.old_psychiatricdisorders_male = old_psychiatricdisorders_male;
	}

	public Integer getOld_psychiatricdisorders_female() {
		return old_psychiatricdisorders_female;
	}

	public void setOld_psychiatricdisorders_female(Integer old_psychiatricdisorders_female) {
		this.old_psychiatricdisorders_female = old_psychiatricdisorders_female;
	}

	public Integer getNew_psychiatricdisorders_male() {
		return new_psychiatricdisorders_male;
	}

	public void setNew_psychiatricdisorders_male(Integer new_psychiatricdisorders_male) {
		this.new_psychiatricdisorders_male = new_psychiatricdisorders_male;
	}

	public Integer getNew_psychiatricdisorders_female() {
		return new_psychiatricdisorders_female;
	}

	public void setNew_psychiatricdisorders_female(Integer new_psychiatricdisorders_female) {
		this.new_psychiatricdisorders_female = new_psychiatricdisorders_female;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getHospitalType() {
		return hospitalType;
	}

	public void setHospitalType(String hospitalType) {
		this.hospitalType = hospitalType;
	}

	public String getSubmittedby() {
		return submittedby;
	}

	public void setSubmittedby(String submittedby) {
		this.submittedby = submittedby;
	}

	public Date getReportFor_month_year() {
		return reportFor_month_year;
	}

	public void setReportFor_month_year(Date reportFor_month_year) {
		this.reportFor_month_year = reportFor_month_year;
	}

	public int getflag_status() {
		return flag_status;
	}

	public void setflag_status(int flag_status) {
		this.flag_status = flag_status;
	}

	public String getthc_details() {
		return thc_details;
	}

	public void setthc_details(String thc_details) {
		this.thc_details = thc_details;
	}
	public int getIs_mnc() {
		return is_mnc;
	}

	public void setIs_mnc(int is_mnc) {
		this.is_mnc = is_mnc;
	}
	
	public int getno_of_houses_identified() {
		return no_of_houses_identified;
	}

	public void setno_of_houses_identified(int no_of_houses_identified) {
		this.no_of_houses_identified = no_of_houses_identified;
	}
	
	public int getno_of_patient_identified() {
		return no_of_patient_identified;
	}

	public void setno_of_patient_identified(int no_of_patient_identified) {
		this.no_of_patient_identified = no_of_patient_identified;
	}
	
	public String getOther_data() {
		return other_data;
	}
	public void setOther_data(String other_data) {
		this.other_data = other_data;
	}
	
	@Override
	public String toString() {
/*		if(NoOfInpatient != null){
*/		return "Report [hospital_id=" + hospital_id + ", reportTimeStamp=" + reportTimeStamp + ", old_smd_male="
				+ old_smd_male + ", old_smd_female=" + old_smd_female + ", new_smd_male=" + new_smd_male
				+ ", new_smd_female=" + new_smd_female + ", old_cmd_male=" + old_cmd_male + ", old_cmd_female="
				+ old_cmd_female + ", new_cmd_male=" + new_cmd_male + ", new_cmd_female=" + new_cmd_female
				+ ", old_alcohal_male=" + old_alcohal_male + ", old_alcohal_female=" + old_alcohal_female
				+ ", new_alcohal_male=" + new_alcohal_male + ", new_alcohal_female=" + new_alcohal_female
				+ ", old_male_reffered_to_highercenters=" + old_male_reffered_to_highercenters
				+ ", old_female_reffered_to_highercenters=" + old_female_reffered_to_highercenters
				+ ", new_male_reffered_to_highercenters=" + new_male_reffered_to_highercenters
				+ ", new_female_reffered_to_highercenters=" + new_female_reffered_to_highercenters
				+ ", old_male_suicidecases=" + old_male_suicidecases + ", old_female_suicidecases="
				+ old_female_suicidecases + ", new_male_suicidecases=" + new_male_suicidecases
				+ ", new_female_suicidecases=" + new_female_suicidecases + ", old_psychiatricdisorders_male="
				+ old_psychiatricdisorders_male + ", old_psychiatricdisorders_female=" + old_psychiatricdisorders_female
				+ ", new_psychiatricdisorders_male=" + new_psychiatricdisorders_male
				+ ", new_psychiatricdisorders_female=" + new_psychiatricdisorders_female 
				+ ", new_o1_male=" + new_o1_male + " , new_o1_female=" + new_o1_female + ", old_o1_male=" + old_o1_male + " , old_o1_female=" + old_o1_female + " , new_o2_male=" + new_o2_male + " , new_o2_female=" + new_o2_female + " , old_o2_male=" + old_o2_male + " , old_o2_female=" + old_o2_female + " , new_o3_male=" + new_o3_male + " , new_o3_female=" + new_o3_female + " , old_o3_male=" + old_o3_male + " , old_o3_female=" + old_o3_female + " , new_o4_male=" + new_o4_male + " , new_o4_female=" + new_o4_female + " , old_o4_male=" + old_o4_male + " , old_o4_female=" + old_o4_female + " , new_o5_male=" + new_o5_male + " , new_o5_female=" + new_o5_female + " , old_o5_male=" + old_o5_male + " , old_o5_female=" + old_o5_female + "  ,"
				+ ", remarks=" + remarks
				+ ", hospitalType=" + hospitalType + ", submittedby=" + submittedby + ", reportFor_month_year="
				+ reportFor_month_year + ", hospitalType=" + hospitalType + ", thc_details=" + thc_details + ", is_mnc=" + is_mnc + ", no_of_houses_identified="+no_of_houses_identified+", no_of_patient_identified="+no_of_patient_identified+", other_data="+other_data+"]";
/*		}
*/		
/*		else{
			return "Report [hospital_id=" + hospital_id + ", NoOfInpatient=" + NoOfInpatient + ",NoOfECTAdmini_DuringTheMonth=" + NoOfECTAdmini_DuringTheMonth + ",NameOfPsychiatrist=" + NameOfPsychiatrist + ",NameOfPsychologist=" + NameOfPsychologist + ",NameOfPsychiatristSW=" + NameOfPsychiatristSW + ",NoOFMC_DuringTheMonth=" + NoOFMC_DuringTheMonth + ",NoOfDisability_MR=" + NoOfDisability_MR + ",NoOfDisability_MI=" + NoOfDisability_MI + "]";			
		}*/
		
	}
}
