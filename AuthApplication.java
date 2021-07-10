package com.havelsan.auth.app;

import com.havelsan.auth.service.AuthService;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("")
public class AuthApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<>();
        // requestUserRegistration root resource
        classes.add(FilterAuthenticator.class);
        classes.add(FilterProvider.class);
        classes.add(AuthService.class);
        return classes;
    }
}
