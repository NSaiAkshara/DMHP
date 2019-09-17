package org.iiitb.hospital.nimhans.resources;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.hospital.nimhans.modals.District_budget;
import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.Login;
import org.iiitb.hospital.nimhans.modals.Report;
import org.iiitb.hospital.nimhans.modals.State;
import org.iiitb.hospital.nimhans.modals.StateBudgetMaster;
import org.iiitb.hospital.nimhans.services.ReportService;
import org.iiitb.hospital.nimhans.services.StateBudgetService;
import org.iiitb.hospital.nimhans.services.StateService;

@Path("/")
public class StateResource {
	
	private StateService stateService = new StateService();
	private ReportService reportService = new ReportService();
	@Path("/state_admin")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStateReport(@QueryParam("month") Date month){
		ArrayList <Hospital> DHCHospitals = new ArrayList<>();
		DHCHospitals = stateService.getAllDistrictHospitals();
		
		if(DHCHospitals.isEmpty()){
			return Response.noContent().build();
		}
		else{
			ArrayList<Hospital> allHospitals = new ArrayList<Hospital>();
			for (Hospital hospital: DHCHospitals){
				ArrayList <Hospital> childs = (ArrayList<Hospital>) reportService.getReportStatus(hospital.getHospital_id(), "dhc", month);
				allHospitals.addAll(childs);
			}	
			return Response.ok().entity(new GenericEntity<ArrayList<Hospital>>(allHospitals){}).build();
		}
		
		
		
		
	}
	
	@Path("/validate")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public Response validateUserName(@QueryParam("user") String userName) {
		
		int result = stateService.validateUserName(userName);
		if (result == 0) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(result).build();
		}
	}
	
	@Path("/state_admin")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response stateLogin(Login login) {
		
		System.out.println(" Blah " + login.getEmailID()+"  "+login.getPassword());
		
//		int admin_id = stateService.getAdminID(login.getEmailID(),login.getPassword());
//		System.out.println("Blah Blah" + admin_id);
		
		State state = stateService.getStateInfo(login.getEmailID(),login.getPassword());
		
		System.out.println(" State " + state);
		System.out.println(" It is ok ");
		return Response.ok().entity(state).build();
	}
	
}
