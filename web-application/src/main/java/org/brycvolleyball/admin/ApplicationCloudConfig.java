package org.brycvolleyball.admin;

import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.redis.connection.RedisConnectionFactory;

/**
 * Created by Rob on 3/10/2015.
 * This class is used to configure cloud components which may get resources from
 * environment variables or other locations.  We use the localconfig-connector
 * to run it locally without setting the cloud profile.
 */
@Configuration
public class ApplicationCloudConfig extends AbstractCloudConfig {

    @Bean
    public MongoDbFactory mongoDbFactory() {
        return connectionFactory().mongoDbFactory();
    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return connectionFactory().redisConnectionFactory();
    }
}
