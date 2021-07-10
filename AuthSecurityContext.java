package com.havelsan.filter;

import com.havelsan.model.Session;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class AuthSecurityContext implements SecurityContext {
    Session session;

    public AuthSecurityContext(Session session){
        this.session=session;
    }

    @Override
    public Principal getUserPrincipal() {
        return () -> session.getUserName();
    }

    @Override
    public boolean isUserInRole(String role) {
        return false;
    }

    @Override
    public boolean isSecure() {
        return false;
    }

    @Override
    public String getAuthenticationScheme() {
        return session.getToken();
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}











