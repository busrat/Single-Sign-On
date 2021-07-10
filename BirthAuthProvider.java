package com.havelsan.birthday.app;

import com.havelsan.filter.AuthenticationFilter;
import com.havelsan.filter.Secured;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.ext.Provider;
@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class BirthAuthProvider extends AuthenticationFilter {
    public BirthAuthProvider() {
        this.authenticator=new BirthAuthAuthenticator();
    }
}
