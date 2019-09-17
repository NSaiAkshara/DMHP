package org.iiitb.hospital.nimhans.resources;

import javax.ws.rs.Path;

@Path("/hospitals")
public class HospitalResource {

	@Path("/{hospital_id}")
	public ReportResource getHospitalReport() {
		////System.out.println("Insside report reeoisrr");
		
		return new ReportResource();
	}
	
	@Path("/{hospital_id}/training")
	public TrainingResource getTrainingReport() {
		return new TrainingResource();
	}
	
	@Path("/{hospital_id}/dhcBudget")
	public DhcBudgetResource getDistrictBudgetInfo(){
		//System.out.println("mdaraaa");
		return new DhcBudgetResource();
	}
	
	
	@Path("/{hospital_id}/shcBudget")
	public StateBudgetResource getStateBudgetInfo(){
		//System.out.println("mdaraaa");
		return new StateBudgetResource();
	}
	
	
	@Path("/{hospital_id}/statebudgetdashboard")
	public DhcBudgetResource getAllDistrictExpenseInfo(){
		return new DhcBudgetResource();
		
	
	}

	@Path("/{hospital_id}/dhcbudgetreport")
	public DhcBudgetResource getDhcBudgetReport() {
		return new DhcBudgetResource();
	}
	
	@Path("/{hospital_id}/dhcHr")
	public HrResource DhcHrReport(){
		//System.out.println("mdaraaa");
		return new HrResource();
	}
	

}