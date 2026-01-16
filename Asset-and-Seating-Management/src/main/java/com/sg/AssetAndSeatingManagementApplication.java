package com.sg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AssetAndSeatingManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssetAndSeatingManagementApplication.class, args);
	}

}
