package com.havelsan.birthday.service;

import com.havelsan.filter.AuthSecurityContext;
import com.havelsan.filter.Secured;
import com.havelsan.model.Session;
import com.havelsan.model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.*;
import java.time.LocalDate;
import java.util.Date;

@Path("")
public class BirthService {

    @Context
    ContainerRequestContext requestContext;

    @GET
    @Path("/findMyBirthday")
    @Consumes("application/json")
    @Secured
    public String getMyName() {
        Client client = ClientBuilder.newClient();
        Response sessionResponse = client
                .target("http://localhost:8080/auth/control")
                .request(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION,
                        "Bearer " + ((AuthSecurityContext) requestContext.getSecurityContext()).getAuthenticationScheme())
                .get(Response.class);
        User user = sessionResponse.readEntity(User.class);
        String birthday = user.getBirthday().toString();
        return birthday;
    }
}



/*
    public LocalDate getMyName() {
        Client client = ClientBuilder.newClient();
        User user = client
                .target("http://localhost:8080/auth/control")
                .request(MediaType.APPLICATION_JSON)
                .get(User.class);
        LocalDate userBirthday = user.getBirthday();
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);
        long daysAlive = ChronoUnit.DAYS.between(userBirthday, today);
        System.out.print("Days alive: ");
        System.out.print("Birthday: " + userBirthday);
        System.out.println(daysAlive);
        return userBirthday;
    }

*/
