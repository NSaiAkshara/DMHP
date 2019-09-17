package org.iiitb.hospital.nimhans.resources;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
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
import org.iiitb.hospital.nimhans.services.ReportService;

@Path("/")
public class ReportResource {

	private ReportService reportService = new ReportService();
	
	@Path("/reports")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response submitReportData(Report report) {
		
		//////System.out.println("vsdvsddvsv"+report.getSubmittedby());
		//////System.out.println("it is mnc "+ report.getIs_mnc());
		if(report.getNew_psychiatricdisorders_female()==null){
			report.setNew_psychiatricdisorders_female(0);
			report.setNew_psychiatricdisorders_male(0);
			report.setOld_psychiatricdisorders_female(0);
			report.setOld_psychiatricdisorders_male(0);
		}
		
		Report reportObj = reportService.setReportInfo(report);
		//////System.out.println("report " + reportObj);
		if (reportObj == null) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(reportObj).build();
		}
	}

	@Path("/reports")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updatetReportData(Report report) {
		Report reportObj = reportService.setReportInfo(report);
		if (report != null) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(reportObj).build();
		}
	}
	
	

	@Path("/reports")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllHospital(@PathParam("hospital_id") int hospital_id, @QueryParam("type") String type, @QueryParam("self") String self , @QueryParam("month") Date month) {
		System.out.println("coming to here------ "+self);
		if (self != null) {
			//System.out.println("step 2 enter here");
			Report report = reportService.getReportInfo(hospital_id, type, month);
			//System.out.println("coming to here------"+report);

			if (report == null) {
				return Response.noContent().build();
			} else {
				return Response.ok().entity(report).build();
			}
		} else {
             System.out.println("step 1 enter here  "+type);
			List<Hospital> listOfHospital = reportService.getReportStatus(hospital_id, type, month);
			//System.out.println("i can breakgdghhhjhjf9999999999566555555fdfdfd--- this" +listOfHospital);
			if (listOfHospital.isEmpty()) {
				return Response.noContent().build();
			} else {
				return Response.ok().entity(new GenericEntity<List<Hospital>>(listOfHospital) {
				}).build();
			}
		}
	}
	
	
	@Path("/thclistfordlp")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTHCHospitalForDLP(@PathParam("hospital_id") int hospital_id, @QueryParam("type") String type){
	
	
		
		List<Hospital> listOfHospital = reportService.getReportStatusDLP(hospital_id, type);
		if (listOfHospital.isEmpty()) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(new GenericEntity<List<Hospital>>(listOfHospital) {
			}).build();
		}	
		
		
	}
	
	//for fetching all the thcs records of a particular month for the dlp login session
	
	@Path("cumulative_dlp")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTHCformonth(@PathParam("hospital_id") int dlp_id, @QueryParam("type") String type, @QueryParam("month") Date month){
	////System.out.println("yes working cumulative_dlp  this one");
		List<Report> allTHCManoReports = new ArrayList<>();
		allTHCManoReports = reportService.getAllTHCformonth(dlp_id, type, month);
		if (allTHCManoReports == null || allTHCManoReports.isEmpty()) {
			
			return Response.noContent().build();
		} else {
			
			return Response.ok().entity(new GenericEntity<List<Report>>(allTHCManoReports) {
			}).build();
		}
	}
	
	@Path("/reportsThcValidation")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Report getAllHospital1(@PathParam("hospital_id") int hospital_id, @QueryParam("type") String type, @QueryParam("month") Date month) {

		
		 Report listOfHospital = reportService.getThcValidation(hospital_id, type, month);
		 
		// ////System.out.println("stmt is here------------"+listOfHospital);
		
		return listOfHospital;
		}
	
	
	
	@Path("/reports/{thcname}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTHCReportDLP(@PathParam("hospital_id") int hospital_id,  @PathParam("thcname") String thcname , @QueryParam("type") String type, @QueryParam("date") Date date){
		//System.out.println("date in java is "+ date);
		Report report = reportService.getTHCReportDLP(hospital_id, thcname, type, date );
		if(report == null){
			return Response.noContent().build();
		}else{
			////System.out.print("bhak bsdk");
			//////System.out.println(report.getIs_mnc());
			return Response.ok().entity(report).build();
		}
		
	}
	
	
}
