package com.sg.security;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@EnableMethodSecurity  
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	 private final JwtAuthFilter jwtAuthFilter;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}

	 
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf(csrf -> csrf.disable())
	        .cors(Customizer.withDefaults())
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/api/auth/**").permitAll()
	            .requestMatchers("/api/dashboard/summary/**").hasAnyRole("USER", "ADMIN")
	            .requestMatchers("/api/assets/**").hasAnyRole("USER", "ADMIN")
	            .requestMatchers("/api/employee/**").hasAnyRole("USER", "ADMIN")
	            .requestMatchers("/api/seats/**").hasAnyRole( "USER","ADMIN")
	            .requestMatchers("/api/history/**").hasAnyRole( "USER","ADMIN")
	            .requestMatchers("/api/category/**").hasAnyRole( "USER","ADMIN")
	            .requestMatchers(
	                    "/auth/**",
	                    "/ws/**"        // ✅ ADD THIS
	                ).permitAll()
//	            .requestMatchers("/api/category/**").permitAll()
	            .anyRequest().authenticated()
	        )
	        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}


}
