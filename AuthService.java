package com.havelsan.auth.service;

import com.havelsan.auth.app.Tokenizer;
import com.havelsan.filter.AuthSecurityContext;
import com.havelsan.filter.Secured;
import com.havelsan.model.Session;
import com.havelsan.model.User;
import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Path("")
public class AuthService {
    @Context ContainerRequestContext requestContext;

    private static final Map<String, Session> sessions = new HashMap<>();
    private static final Map<String, User> users= new HashMap<>();
    private final Tokenizer tokenizer = new Tokenizer();

    public AuthService() {
        users.put("busra", User.createUser("busra", "tabak", new Date("1995/12/12")));
        users.put("isa", User.createUser("isa", "dogan", new Date("1987/11/30")));
    }

    @POST
    @Path("/login")
    @Consumes("application/json")
    public String login(User temp) {
         if (users.containsKey(temp.getUserName())) {
             if (users.get(temp.getUserName()).getPassword().equals(temp.getPassword())) {
                 String token = tokenizer.generateKey();
                 Session session = new Session();
                 session.setToken(token);
                 session.setUserName(temp.getUserName());
                 sessions.put(token, session);
                 return token;
             }
        }
        return "false";
    }

    @GET
    @Path("/control")
    @Consumes("application/json")
    @Secured
    public Response getMyBirthday() {
        Session session AuthSecurityContext)requestContext.getSecurityContext()).getSession();
        if (session == null) {
            return null;
        }
        String username = session.getUserName();
        User user = users.get(username);
        return Response.ok(user).build();
    }

    @GET
    @Path("/getSession")
    @Secured
    @Produces("application/json")
    public Response getMySession(){
        Session session AuthSecurityContext)requestContext.getSecurityContext()).getSession();
        return Response.ok(session).build();
    }

    @POST
    @Secured
    @Path("/logout")
    @Consumes("application/json")
    public String logout() {
        Session session AuthSecurityContext)requestContext.getSecurityContext()).getSession();
        if(session==null) {
            return "session not exist";
        }
        sessions.remove(session.getToken());
        return "okey";
    }

    public static Session checkToken(String token) {
        if (sessions.containsKey(token)) {
            return sessions.get(token);
        }
        return null;
    }
}
