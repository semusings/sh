package dev.semusings.glowroot.tomcat;

import dev.semusings.glowroot.tomcat.config.AsyncSyncConfiguration;
import dev.semusings.glowroot.tomcat.config.EmbeddedSQL;
import dev.semusings.glowroot.tomcat.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { GlowroottomcatApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@EmbeddedSQL
public @interface IntegrationTest {
}
