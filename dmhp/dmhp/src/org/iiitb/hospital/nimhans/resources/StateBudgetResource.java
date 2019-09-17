package org.iiitb.hospital.nimhans.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.hospital.nimhans.modals.DhcBudget;
import org.iiitb.hospital.nimhans.modals.DhcHr;
import org.iiitb.hospital.nimhans.modals.Dhcdata;
import org.iiitb.hospital.nimhans.modals.District_budget;
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.StateBudget;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;
import org.iiitb.hospital.nimhans.services.DhcBudgetService;
import org.iiitb.hospital.nimhans.services.DhcHrService;
import org.iiitb.hospital.nimhans.services.StateBudgetService;
import org.iiitb.hospital.nimhans.services.StateService;

//@Path("/")
public class StateBudgetResource {
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
public Response ShcBudgetReport(StateBudget StateBudget) {
		
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		System.out.println("we00ddd009jhjj00000000--simha-----");
		
		StateBudget ShcbudgetObj = stateBudgetService.setShcBudgetInfo(StateBudget);
		
 if (ShcbudgetObj == null) {
	return Response.noContent().build();
	} else {
	System.out.println(" End of doctor ");
	return Response.ok().entity(ShcbudgetObj).build();
		
		}
	}
	
	
	
	@Path("/dhclistforshc")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response getDhclistforshc(){
	System.out.println("cameto DHCLIST");
	
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		List<Dhcdata> listOfDhcHospital = stateBudgetService.getDhcList();
		System.out.println("Data resource  "+listOfDhcHospital);
		if (listOfDhcHospital.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<Dhcdata>>(listOfDhcHospital) {
			}).build();
		}	
		
		
	}
	
	
	@Path("/masterData")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
   public Response masterDataReport(StateBudgetMaster StateBudgetMaster) {
		
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		System.out.println("Master Table data is here reource");
		
		StateBudgetMaster ShcMasterbudgetObj = stateBudgetService.setShcMasterBudgetInfo(StateBudgetMaster);
		
 if (ShcMasterbudgetObj == null) {
	return Response.noContent().build();
	} else {
	System.out.println(" End of doctor ");
	return Response.ok().entity(ShcMasterbudgetObj).build();
		
		}
	}
	
	@Path("/masterData")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response masterDataReport( @QueryParam("dhc_id") String dhc_id, @QueryParam("financial_year") String financial_year){
		
		
		System.out.println("cameto ma");
	String[] array1= dhc_id.split("_");
	int dhc_id1 = Integer.parseInt(array1[1]);
	System.out.println("cameto DHCLIST"+array1[1]+"  "+array1[0]);
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		List<StateBudgetMaster> stateBudgetMaster = stateBudgetService.getMasterList(dhc_id1,financial_year);
		System.out.println("Data resource  "+stateBudgetMaster);
		if (stateBudgetMaster.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<StateBudgetMaster>>(stateBudgetMaster) {
			}).build();
		}	
		
		
	}
	
	@Path("/masterQData")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response masterQDataReport( @QueryParam("state_budget_master_id") int state_budget_master_id){
	
	
	System.out.println("cameto QQQQDHCLIST");
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		List<StateBudget> stateBudgetQMaster = stateBudgetService.getQMasterList(state_budget_master_id);
		//System.out.println("Data resource  "+stateBudgetMaster);
		if (stateBudgetQMaster.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<StateBudget>>(stateBudgetQMaster) {
			}).build();
		}	
		
		
	}
	
	
	@Path("/masterDataMaxid")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public String masterQDataReport(){
	
	
	//System.out.println("cameto QQQQDHCLIST");
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		String stateBudgetQMaster_id = stateBudgetService.getQMastermaxId();
		//System.out.println("Data resource  "+stateBudgetMaster);
		if (stateBudgetQMaster_id.isEmpty()) {
			return null;
		} else {
			return stateBudgetQMaster_id;
		}	
		
		
	}
	@Path("/stateDashboardData")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response Dashboard_Report( @QueryParam("financial_year") String financial_year){
		System.out.println("financial yearsssssssssssssssssssssssssssssssssssssssssssssssssssssss");

		StateBudgetService stateService = new StateBudgetService();	
		List<District_budget> stateBudgetMaster = stateService.get_state_budget_master(financial_year);
		System.out.println("66666666"+stateBudgetMaster);
		
		if (stateBudgetMaster.isEmpty()) {
			System.out.println("failed1234566");

			return Response.noContent().build();
		} else {
//			System.out.println("passed123456");
//			System.out.println(stateBudgetMaster.get(1).get_dhcname());
//			System.out.println(stateBudgetMaster.get(2).get_dhcname());
//			System.out.println(stateBudgetMaster.get(3).get_dhcname());
//			System.out.println(stateBudgetMaster.get(1).amt_budget());
//			System.out.println(stateBudgetMaster.get(2).amt_budget());
//			System.out.println(stateBudgetMaster.get(1).get_Q1());
//			System.out.println(stateBudgetMaster.get(1).get_Q2());
//			System.out.println(stateBudgetMaster.get(1).get_d1());
			return Response.ok().entity(new GenericEntity<List<District_budget>>(stateBudgetMaster) {
			}).build();

		}	
	}
}
