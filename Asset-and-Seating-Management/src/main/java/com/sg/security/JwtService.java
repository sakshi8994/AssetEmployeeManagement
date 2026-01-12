package com.sg.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sg.entities.Employee;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY =
        "mysupersecretkeymysupersecretkey123456"; 

    private static final long EXPIRATION_TIME = 1000L * 60 * 60 *24; 
    
//    private static final long ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; 
//    private static final long REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; 

//    public String generateAccessToken(UserDetails user) {
//       
//        		return Jwts.builder()
//        	            .setSubject(user.getUsername())
//        	            .claim(
//        	                "role",
//        	                user.getAuthorities().iterator().next().getAuthority()
//        	            )
//        	            .setIssuedAt(new Date())
//        	            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRY))
//        	            .signWith(getSigningKey())
//        	            .compact();
//    }
//    
//    public String generateRefreshToken(UserDetails user) {
//    	return Jwts.builder()
//                .setSubject(user.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRY))
//                .signWith(getSigningKey())
//                .compact();
//    }
      
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(Employee employee) {
        return Jwts.builder()
            .setSubject(employee.getEmail())
            .claim("role", employee.getRole())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(getSigningKey())
            .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public boolean isTokenValid(String token, Employee employee) {
        return extractUsername(token).equals(employee.getEmail())
            && !extractClaims(token).getExpiration().before(new Date());
    }
    
    
//    public boolean isTokenValid(String token, UserDetails user) {
//        return extractUsername(token).equals(user.getUsername())
//            && !extractClaims(token).getExpiration().before(new Date());
//    }
//
//    public boolean isValid(String token) {
//        try {
//            extractClaims(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
}
