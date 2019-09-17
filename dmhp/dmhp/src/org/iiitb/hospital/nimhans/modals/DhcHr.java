package org.iiitb.hospital.nimhans.modals;

import java.sql.Date;
import java.sql.Timestamp;

public class DhcHr {

	
	private int dhc_HrInfo_id;
	private String name;
	private String current_designation;
	private int age;
	private Date date_of_birth;
	private Date dateOfAppointment;
	private Date contarctPeriodfrom;
	private Date contarctPeriodTo;
	private String contractRefNo;
	private String remarks;
	private String contactNo;
	private String emailId;
	private String nameOfFacility;
	private String inchargeTaluka;
	private int shc_id;
	private int dhc_id;
	private String TalukaIds;
	private String PHCIds;
	private String CHCId;
	private int PCId;
	private String IsPC;
	private String CreatedBy;
	private int IsActive;
	

	public DhcHr() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DhcHr(int dhc_HrInfo_id,String name, String current_designation, int age, Date date_of_birth, Date dateOfAppointment, Date contarctPeriodfrom, Date contarctPeriodTo, String contractRefNo,
			String remarks, String contactNo, String emailId, String nameOfFacility, String inchargeTaluka, int shc_id, int dhc_id, String TalukaIds, String PHCIds, String CHCId, int PCId,
			String IsPC, String CreatedBy, int IsActive) {
		super();
		this.dhc_HrInfo_id = dhc_HrInfo_id;
		this.name = name;
		this.current_designation = current_designation;
		this.age = age;
		this.date_of_birth = date_of_birth;
		this.dateOfAppointment = dateOfAppointment;
		this.contarctPeriodfrom = contarctPeriodfrom;
		this.contarctPeriodTo = contarctPeriodTo;
		this.contractRefNo = contractRefNo;
		this.remarks = remarks;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.nameOfFacility = nameOfFacility;
		
		this.inchargeTaluka = inchargeTaluka;
		
		this.shc_id = shc_id;
		this.dhc_id = dhc_id;
		this.TalukaIds = TalukaIds;
		this.PHCIds = PHCIds;
		this.CHCId = CHCId;
		this.PCId = PCId;
		this.IsPC = IsPC;
		this.CreatedBy = CreatedBy;
		this.IsActive = IsActive;
	}

	
	//private int dhc_HrInfo_id;
	/**
	 * @return the dhc_HrInfo_id
	 */
//	public int getDhc_HrInfo_id() {
//		return dhc_HrInfo_id;
//	}
//
//	/**
//	 * @param dhc_HrInfo_id the dhc_HrInfo_id to set
//	 */
//	public void setDhc_HrInfo_id(int dhc_HrInfo_id) {
//		this.dhc_HrInfo_id = dhc_HrInfo_id;
//	}
	
	/**
	 * @return the age
	 */
	public int getDhc_HrInfo_id() {
		return dhc_HrInfo_id;
	}

	/**
	 * @param age the age to set
	 */
	public void setDhc_HrInfo_id(int dhc_HrInfo_id) {
		this.dhc_HrInfo_id = dhc_HrInfo_id;
	}


	/**
	 * @return the name
	 */
	public String getName() {
		System.out.println("yes its givingName  "+name);
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the current_designation
	 */
	public String getCurrent_designation() {
		return current_designation;
	}

	/**
	 * @param current_designation the current_designation to set
	 */
	public void setCurrent_designation(String current_designation) {
		this.current_designation = current_designation;
	}

	/**
	 * @return the age
	 */
	public int getAge() {
		return age;
	}

	/**
	 * @param age the age to set
	 */
	public void setAge(int age) {
		this.age = age;
	}

	/**
	 * @return the date_of_birth
	 */
	public Date getDate_of_birth() {
		return date_of_birth;
	}

	/**
	 * @param date_of_birth the date_of_birth to set
	 */
	public void setDate_of_birth(Date date_of_birth) {
		this.date_of_birth = date_of_birth;
	}

	/**
	 * @return the dateOfAppointment
	 */
	public Date getDateOfAppointment() {
		return dateOfAppointment;
	}

	/**
	 * @param dateOfAppointment the dateOfAppointment to set
	 */
	public void setDateOfAppointment(Date dateOfAppointment) {
		this.dateOfAppointment = dateOfAppointment;
	}

	/**
	 * @return the contarctPeriodfrom
	 */
	public Date getContarctPeriodfrom() {
		return contarctPeriodfrom;
	}

	/**
	 * @param contarctPeriodfrom the contarctPeriodfrom to set
	 */
	public void setContarctPeriodfrom(Date contarctPeriodfrom) {
		this.contarctPeriodfrom = contarctPeriodfrom;
	}

	/**
	 * @return the contarctPeriodTo
	 */
	public Date getContarctPeriodTo() {
		return contarctPeriodTo;
	}

	/**
	 * @param contarctPeriodTo the contarctPeriodTo to set
	 */
	public void setContarctPeriodTo(Date contarctPeriodTo) {
		this.contarctPeriodTo = contarctPeriodTo;
	}

	/**
	 * @return the contractRefNo
	 */
	public String getContractRefNo() {
		return contractRefNo;
	}

	/**
	 * @param contractRefNo the contractRefNo to set
	 */
	public void setContractRefNo(String contractRefNo) {
		this.contractRefNo = contractRefNo;
	}

	/**
	 * @return the remarks
	 */
	public String getRemarks() {
		return remarks;
	}

	/**
	 * @param remarks the remarks to set
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**
	 * @return the contactNo
	 */
	public String getContactNo() {
		return contactNo;
	}

	/**
	 * @param contactNo the contactNo to set
	 */
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	/**
	 * @return the emailId
	 */
	public String getEmailId() {
		return emailId;
	}

	/**
	 * @param emailId the emailId to set
	 */
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	/**
	 * @return the nameOfFacility
	 */
	public String getNameOfFacility() {
		return nameOfFacility;
	}

	/**
	 * @param nameOfFacility the nameOfFacility to set
	 */
	public void setNameOfFacility(String nameOfFacility) {
		this.nameOfFacility = nameOfFacility;
	}

	/**
	 * @return the inchargeTaluka
	 */
	public String getInchargeTaluka() {
		
		//System.out.println("yes its giving  "+InchargeTaluka);
		return inchargeTaluka;
	}

	/**
	 * @param inchargeTaluka the inchargeTaluka to set
	 */
	public void setInchargeTaluka(String inchargeTaluka) {
		this.inchargeTaluka = inchargeTaluka;
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
	 * @return the talukaIds
	 */
	public String getTalukaIds() {
		return TalukaIds;
	}

	/**
	 * @param talukaIds the talukaIds to set
	 */
	public void setTalukaIds(String talukaIds) {
		TalukaIds = talukaIds;
	}

	/**
	 * @return the pHCIds
	 */
	public String getPHCIds() {
		return PHCIds;
	}

	/**
	 * @param pHCIds the pHCIds to set
	 */
	public void setPHCIds(String pHCIds) {
		PHCIds = pHCIds;
	}

	/**
	 * @return the cHCId
	 */
	public String getCHCId() {
		return CHCId;
	}

	/**
	 * @param cHCId the cHCId to set
	 */
	public void setCHCId(String cHCId) {
		CHCId = cHCId;
	}

	/**
	 * @return the pCId
	 */
	public int getPCId() {
		return PCId;
	}

	/**
	 * @param pCId the pCId to set
	 */
	public void setPCId(int pCId) {
		PCId = pCId;
	}

	/**
	 * @return the isPC
	 */
	public String getIsPC() {
		return IsPC;
	}

	/**
	 * @param isPC the isPC to set
	 */
	public void setIsPC(String isPC) {
		IsPC = isPC;
	}

	/**
	 * @return the createdBy
	 */
	public String getCreatedBy() {
		return CreatedBy;
	}

	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}

	/**
	 * @return the isActive
	 */
	public int getIsActive() {
		return IsActive;
	}

	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(int isActive) {
		IsActive = isActive;
	}
}
