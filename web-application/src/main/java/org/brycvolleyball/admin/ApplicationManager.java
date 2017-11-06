package org.brycvolleyball.admin;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * Created by Rob on 2/12/2015.
 */
@SpringBootApplication
@EnableRedisHttpSession
public class ApplicationManager {
    private static Log log = LogFactory.getLog(ApplicationManager.class);

    public static void main( String[] args )
    {
        ApplicationContext applicationContext = SpringApplication.run(ApplicationManager.class, args);
    }
}
