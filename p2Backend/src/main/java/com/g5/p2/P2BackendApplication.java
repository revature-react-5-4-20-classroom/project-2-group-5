package com.g5.p2;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
public class P2BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(P2BackendApplication.class, args);
	}

	/**
	 * CORS Filter Bean to disable CORS
	 * 
	 * @return
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		// We're defining the class we're using inline here as a shortcut
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowCredentials(true)
						.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");

			}
		};
	}
	
	
	

	/**
	 * Swagger "Docket" Bean for all the controllers in our project
	 */
	@Bean
	public Docket catApi() {
		return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.basePackage("com.g5.p2"))
				.build();
	}

}
