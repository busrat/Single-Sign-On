package com.havelsan.birthday.app;

import com.havelsan.filter.Authenticator;
import com.havelsan.model.Session;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class BirthAuthAuthenticator implements Authenticator {
    @Override
    public Session checkToken(String token) {
        return getSession(token);
    }

    public Session getSession(String token) {
        Client client = ClientBuilder.newClient();
        Response response = client
                .target("http://localhost:8080/auth/getSession")
                .request(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .get(Response.class);
        Session session=response.readEntity(Session.class);
        return session;
    }

}
