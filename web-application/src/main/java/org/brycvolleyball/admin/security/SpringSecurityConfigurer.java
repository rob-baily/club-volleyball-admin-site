package org.brycvolleyball.admin.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by Rob on 2/27/2015.
 */
public class SpringSecurityConfigurer {

	@Configuration
	@ConfigurationProperties(prefix = "web-security")
    public static class DefaultWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

		@Configuration
		@Order(1)
		public static class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

			/** We expect that the URLs secured here are called as part of the application or via websocket. */
			protected void configure(HttpSecurity http) throws Exception {
				http
						.requestMatchers().antMatchers("/api/**").and()
						.authorizeRequests()
						.anyRequest().authenticated()
						.and()
						.httpBasic()
						.and()
						.csrf().disable();
			}
		}

		@Override
		public void configure(WebSecurity web) throws Exception {
			web
					.ignoring()
					// Spring Security should completely ignore URLs starting with /icons/ and /images/
					.antMatchers("/icons/**")
					.antMatchers("/images/**")
					.antMatchers("/favicon.ico");
		}

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            // configure our web security that uses a form login
            http
                    .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                    .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .and()
                    .logout()
                    .permitAll()
                    // note that this overrides CSRF for logout as it allows a GET to logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .and()
                    .rememberMe();
        }
    }
}
