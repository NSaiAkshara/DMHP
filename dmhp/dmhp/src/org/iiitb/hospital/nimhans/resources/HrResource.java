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
import org.iiitb.hospital.nimhans.modals.Report;
import org.iiitb.hospital.nimhans.modals.Training;
import org.iiitb.hospital.nimhans.modals.DhcBudget;
import org.iiitb.hospital.nimhans.modals.DhcHr;
import org.iiitb.hospital.nimhans.services.DhcBudgetService;
import org.iiitb.hospital.nimhans.services.DhcHrService;
import org.iiitb.hospital.nimhans.services.ReportService;

//@Path("/")
public class HrResource {	
	
	private DhcHrService service = new DhcHrService();
	 
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
public Response DhcHrReport(DhcHr DhcHr) {
		
		DhcHrService DhcHrService = new DhcHrService();
		
		System.out.println("we00ddd009jhjj00000000-------"+DhcHr.getInchargeTaluka());
		
		DhcHr DhcHrObj = DhcHrService.setDhcHrtInfo(DhcHr);
		
 if (DhcHrObj == null) {
	return Response.noContent().build();
	} else {
	System.out.println(" End of doctor ");
	return Response.ok().entity(DhcHr).build();
		
		}
	}
	
	//@Path("/{dhc_id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
public Response getDhcHrReport(@QueryParam("dhc_id") int dhc_id) {
		
		DhcHrService DhcHrService = new DhcHrService();
		
		System.out.println("finally came into function-------");
		
		List<DhcHr> DhcHrObj = DhcHrService.getDhcHrtInfo(dhc_id);
		
// if (DhcHrObj == null) {
//	return Response.noContent().build();
//	} else {
//	System.out.println(" End of doctor1 "+DhcHrObj);
//	return Response.ok().entity(DhcHrObj).build();
//		
//		}
 
		for(DhcHr DhcHr: DhcHrObj){
			System.out.println("Id: "+ DhcHr.getName());
		}
		if(DhcHrObj.isEmpty()){
			return Response.noContent().build();
		}else{
			return Response.ok().entity(new GenericEntity<List<DhcHr>>(DhcHrObj){}).build();
		}
 
 
 
	}
	
	@Path("/{dhcHrinfo_id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
public Response getDhcHrReport1(@PathParam("dhcHrinfo_id") int dhcHrinfo_id) {
		
		DhcHrService DhcHrService = new DhcHrService();
		
		DhcHr DhcHrObj = DhcHrService.getDHChrInfo(dhcHrinfo_id);
		

		if (DhcHrObj == null) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(DhcHrObj).build();
		}
		
		
	}
	
	
	@Path("/{dhcHrinfo_id}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTrainingData(DhcHr DhcHr , @PathParam("dhcHrinfo_id") int dhcHrinfo_id) {
		
		DhcHrService DhcHrService = new DhcHrService();
		
		DhcHr DhcHrObj = DhcHrService.updateDhcHrInfo(DhcHr, dhcHrinfo_id);
		if (DhcHrObj != null) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(DhcHrObj).build();
		}
	}
	
	
	
	
}


	
	
	
	



