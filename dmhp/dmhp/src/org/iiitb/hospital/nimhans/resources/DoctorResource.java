package org.iiitb.hospital.nimhans.resources;

import java.sql.Date;
import java.util.ArrayList;

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

import org.iiitb.hospital.nimhans.modals.Hospital;
import org.iiitb.hospital.nimhans.modals.Login;
import org.iiitb.hospital.nimhans.services.DoctorService;
import org.iiitb.hospital.nimhans.services.HospitalService;
import org.iiitb.hospital.nimhans.services.ReportService;

@Path("/")
public class DoctorResource {

	private DoctorService doctorService = new DoctorService();
	private HospitalService hospitalService = new HospitalService();
	private ReportService reportService = new ReportService();
//
//	@Path("/validate")
//	@GET
//	@Produces(MediaType.TEXT_PLAIN)
//	public Response validateUserName(@QueryParam("user") String userName) {
//		
//		int result = doctorService.validateUserName(userName);
//		if (result == 0) {
//			return Response.noContent().build();
//		} else {
//			return Response.ok().entity(result).build();
//		}
//	}
//	
//	

	@Path("/doctors")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response doctorLogin(Login login) {
		
		System.out.println(" Docotr " + login.getEmailID()+"  "+login.getPassword());
		
		Hospital hospital = hospitalService.getHospitalDoctorinfo(login.getEmailID(),login.getPassword());
		
		System.out.println("Hospital " + hospital);
		
		if (hospital == null) {
			return Response.noContent().build();
		} else {
			System.out.println(" End of doctor ");
			return Response.ok().entity(hospital).build();
		}
	}
	
	@Path("/doctor")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStateReport(@QueryParam("month") Date month ,@QueryParam("hospital_id") int hospital_id){
		ArrayList <Hospital> THCHospitals = new ArrayList<>();
		THCHospitals = doctorService.getAllTHCHospitals(hospital_id);
		//System.out.println("here hospital id working"+hospital_id);
		if(THCHospitals.isEmpty()){
			return Response.noContent().build();
		}
		else{
			ArrayList<Hospital> allHospitals = new ArrayList<Hospital>();
			for (Hospital hospital: THCHospitals){
				ArrayList <Hospital> childs = (ArrayList<Hospital>) reportService.getReportStatus(hospital.getHospital_id(), "thc", month);
				allHospitals.addAll(childs);
			}	
			return Response.ok().entity(new GenericEntity<ArrayList<Hospital>>(allHospitals){}).build();
		}
		
		
		
		
	}
	
	
	
	
}
