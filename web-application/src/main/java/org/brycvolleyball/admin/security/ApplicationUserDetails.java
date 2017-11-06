package org.brycvolleyball.admin.security;

import java.util.Collection;
import java.util.Vector;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Created by Rob on 7/8/2015.
 */
public class ApplicationUserDetails implements UserDetails {

    private final ApplicationUser applicationUser;

    public ApplicationUserDetails(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Vector<GrantedAuthority> authorities = new Vector<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        if (applicationUser.isAdminUser()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return applicationUser.getPassword();
    }

    @Override
    public String getUsername() {
        return applicationUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return applicationUser.isEnabled();
    }
}
