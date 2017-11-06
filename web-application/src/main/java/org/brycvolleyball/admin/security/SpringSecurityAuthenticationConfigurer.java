package org.brycvolleyball.admin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

/**
 * Created by Rob on 9/14/2016.
 */
@EnableWebSecurity
public class SpringSecurityAuthenticationConfigurer {

	@Autowired
	ApplicationUserDetailsManager applicationUserDetailsManager;

	@Autowired // need Autowired instead of Override here, not clear why!
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		// configure the repository user details service
//            PasswordEncoder encoder = new BCryptPasswordEncoder();
		auth.userDetailsService(applicationUserDetailsManager);
		// make sure we have the default user if it is not there
		if(!applicationUserDetailsManager.userExists("admin")) {
			ApplicationUser defaultApplicationUser = new ApplicationUser();
			defaultApplicationUser.setUsername("admin");
			defaultApplicationUser.setPassword("password");
			defaultApplicationUser.setEnabled(true);
			defaultApplicationUser.setAdminUser(true);
			applicationUserDetailsManager.createUser(new ApplicationUserDetails(defaultApplicationUser));
		}
	}
}
