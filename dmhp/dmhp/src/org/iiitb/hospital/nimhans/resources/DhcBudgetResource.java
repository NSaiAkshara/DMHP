package org.iiitb.hospital.nimhans.resources;


import java.sql.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;
import org.iiitb.hospital.nimhans.modals.Training;
import org.iiitb.hospital.nimhans.modals.DhcBudget;
import org.iiitb.hospital.nimhans.modals.DhcHr;
import org.iiitb.hospital.nimhans.services.DhcBudgetService;
import org.iiitb.hospital.nimhans.services.DhcHrService;
import org.iiitb.hospital.nimhans.services.ReportService;
import org.iiitb.hospital.nimhans.services.StateBudgetService;

//@Path("/")
public class DhcBudgetResource {	
	
	private DhcBudgetService service = new DhcBudgetService();
	
	
	@Path("/masterData")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response masterDataReport( @QueryParam("dhc_id") int dhc_id, @QueryParam("financial_year") String financial_year){
	
     //  System.out.println("cameto DHCLIST"+financial_year);cumulativebudgetData
		StateBudgetService stateBudgetService = new StateBudgetService();
		
		List<StateBudgetMaster> stateBudgetMaster = stateBudgetService.getMasterList(dhc_id,financial_year);
	// System.out.println("Data resource  "+stateBudgetMaster);
		if (stateBudgetMaster.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<StateBudgetMaster>>(stateBudgetMaster) {
			}).build();
		}	
		
		
	}
	
	@Path("/DhcBudgetReport")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response DhcBudgetReport( @QueryParam("dhc_id") int dhc_id, @QueryParam("report_date") String report_date){
	
     //  System.out.println("cameto DHCLIST"+financial_year);
	//	StateBudgetService stateBudgetService = new StateBudgetService();
		DhcBudgetService DhcBudgetservice = new DhcBudgetService();
		
		List<DhcBudget> dhcBudget= DhcBudgetservice.getAllDistrictExpenseInfo(dhc_id,report_date);
	// System.out.println("Data resource  "+stateBudgetMaster);
		if (dhcBudget.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<DhcBudget>>(dhcBudget) {
			}).build();
		}	
		
		
	}
	
	
	
	
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
public Response DhcBudgetReport(DhcBudget DhcBudget) {
		
		DhcBudgetService DhcBudgetservice = new DhcBudgetService();
		
		System.out.println("we00ddd009jhjj00000000-------"+DhcBudget);
		
		DhcBudget DhcbudgetObj = DhcBudgetservice.setDhcBudgetInfo(DhcBudget);
		
 if (DhcbudgetObj == null) {
	return Response.noContent().build();
	} else {
	System.out.println(" End of doctor ");
	return Response.ok().entity(DhcbudgetObj).build();
		
		}
	}
	
	
	//cumulative and percentage resources

	@Path("/cumulativebudgetData")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response cumulativebudgetDataReport( @QueryParam("dhc_id") int dhc_id, @QueryParam("report_date") String report_date){
	
      System.out.println("cameto DHCLIST11"+report_date);
		DhcBudgetService DhcBudgetservice = new DhcBudgetService();
		
		List<DhcBudget> dhcBudget = DhcBudgetservice.cumulativebudgetDataReport(dhc_id,report_date);
	// System.out.println("Data resource  "+stateBudgetMaster);
		if (dhcBudget.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<DhcBudget>>(dhcBudget) {
			}).build();
		}	
		
		
	}
	
	
	
	
}


	
	
	
	



