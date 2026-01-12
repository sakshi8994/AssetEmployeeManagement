package com.sg.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sg.entities.Employee;
import com.sg.repositories.EmployeeRepository;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
    private final EmployeeRepository employeeRepository;

   @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }

    String token = authHeader.substring(7);
    String email = jwtService.extractUsername(token);

    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        Employee employee = employeeRepository.findByEmail(email).orElse(null);

        if (employee != null && jwtService.isTokenValid(token, employee)) {

           
            CustomUserDetails userDetails =
                    new CustomUserDetails(
                            employee.getEmployeeId(),
                            employee.getEmail(),
                            employee.getRole()
                    );

            
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,                 
                            null,
                            userDetails.getAuthorities()  
                    );

           
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    filterChain.doFilter(request, response);
}

}
