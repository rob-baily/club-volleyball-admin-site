package org.brycvolleyball.admin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

/**
 * Created by Rob on 7/8/2015.
 */
@Component
public class ApplicationUserDetailsManager implements UserDetailsManager {
    @Autowired
    ApplicationUserRepository applicationUserRepository;

    @Override
    public void createUser(UserDetails userDetails) {
        ApplicationUserDetails applicationUserDetails = (ApplicationUserDetails)userDetails;
        applicationUserRepository.save(applicationUserDetails.getApplicationUser());
    }

    @Override
    public void updateUser(UserDetails userDetails) {
        ApplicationUserDetails applicationUserDetails = (ApplicationUserDetails)userDetails;
        applicationUserRepository.save(applicationUserDetails.getApplicationUser());
    }

    @Override
    public void deleteUser(String userName) {
        ApplicationUser applicationUser = findUserByUsername(userName);
        if (applicationUser != null) {
            applicationUserRepository.delete(applicationUser);
        }
    }

    @Override
    public void changePassword(String s, String s1) {

    }

    @Override
    public boolean userExists(String username) {
        return (findUserByUsername( username ) != null);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        ApplicationUser applicationUser = findUserByUsername(s);
        if (applicationUser == null) {
            throw new UsernameNotFoundException("ApplicationUser: " + s + " not found.");
        } else {
            return new ApplicationUserDetails(applicationUser);
        }
    }

    private ApplicationUser findUserByUsername( String username ) {
        return applicationUserRepository.findOneByUsernameIgnoreCase( username );
    }
}
