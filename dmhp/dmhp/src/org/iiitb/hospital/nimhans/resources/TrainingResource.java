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


import java.io.File;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;

import org.glassfish.jersey.media.multipart.BodyPartEntity;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

import org.iiitb.hospital.nimhans.modals.Training;
import org.iiitb.hospital.nimhans.modals.TrainingImg;
import org.iiitb.hospital.nimhans.services.TrainingService;


@Path("/")
public class TrainingResource {

	private TrainingService trainingService = new TrainingService();
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response submitTrainingData(Training training) {
		System.out.println("hhhhhhhhh   "+training);
		Training trainingObj = trainingService.setTrainingInfo(training);

		if (trainingObj == null) {
			System.out.println("no fraing form DATA");
			return Response.noContent().build();
		} else {
			System.out.println("traindata is there---->"+trainingObj);
			System.out.println("taanadna "+ trainingObj);
			return Response.ok().entity(trainingObj).build();
		}
	}
	

	
	
	
	
	@Path("{training_id}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTrainingData(Training training , @PathParam("training_id") int training_id) {
		Training trainingObj = trainingService.updateTrainingInfo(training, training_id);
		if (trainingObj != null) {
			return Response.noContent().build();
		} else {
			return Response.ok().entity(trainingObj).build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getTrainingData(@PathParam("hospital_id") int hospital_id,  @QueryParam("date") Date date){
		//get the training events entered by a particular hospital in the requested month
		
		
		// firstly the parameter "date" here refers to the event_from date, 
		//so a SQL query will first fetch all the events having a event_from date same as the requested date
		//(ignoring the day , only month and year matters)
		//Then after fetching the events sort them in reverse chronological order and hence, 
		//the list thus generated will be the final list that needs to be returned as a response
		
		
		
		
		List<Training> trainingEvents = trainingService.getTrainingInfo(hospital_id, date);
		for(Training training: trainingEvents){
			System.out.println("Id: "+ training.getTraining_id());
		}
		if(trainingEvents.isEmpty()){
			return Response.noContent().build();
		}else{
			return Response.ok().entity(new GenericEntity<List<Training>>(trainingEvents){}).build();
		}
		

	}
	
	
	@Path("{training_id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteTrainingData(@PathParam("training_id") int training_id){
		System.out.println("in resourcse " + training_id);
		int result = trainingService.deleteTrainingInfo(training_id);
		if (result <= 0){
			return Response.noContent().build();
		}else{
			return Response.status(200).build();
		}
		
		
	}
	
	//image upload code max id
	@Path("max_train_id")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getMax_train_id(@PathParam("hospital_id") int hospital_id){
		//get the training events entered by a particular hospital in the requested month
		
		String max_id = trainingService.getMaxTrainingID(hospital_id);
		
		System.out.println("coming to resource max id  "+max_id);
	//	return ;
		return Response.status(200).entity(max_id).build();
		 
		//return max_id;
	}
	
	
	@Path("postimg")
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response postTrainingImages(@FormDataParam("file") InputStream uploadedInputStream, @FormDataParam("file") FormDataContentDisposition fileDetail,String NoOfParticipants) throws IOException {
		
		System.out.println("postImage is working");
		String uploadedFileLocation = "C:/Users/EHRC/Desktop/uploads/" + fileDetail.getFileName();
		
		writeToFile(uploadedInputStream, uploadedFileLocation);
		
		String output = "File uploaded to : " + uploadedFileLocation;

		System.out.println(output);
		System.out.println(NoOfParticipants);
		
		//return Response.status(200).entity(output).build();
		//Response.sendRedirect("http://www.javatpoint.com"); 
		
		return null;
  
	}
	
	
	// save uploaded file to new location
		private void writeToFile(InputStream uploadedInputStream,
			String uploadedFileLocation) {

			try {
				OutputStream out = new FileOutputStream(new File(
						uploadedFileLocation));
				int read = 0;
				byte[] bytes = new byte[1024];

				out = new FileOutputStream(new File(uploadedFileLocation));
				while ((read = uploadedInputStream.read(bytes)) != -1) {
					out.write(bytes, 0, read);
				}
				out.flush();
				out.close();
			} catch (IOException e) {

				e.printStackTrace();
			}

		}

	

	
	
	
	
}
