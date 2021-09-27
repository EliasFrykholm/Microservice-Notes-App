package com.loginservice.security.jwt;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Date;

import com.loginservice.security.MyUserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

@Component
public class JwtUtils {

    @Value("${loginservice.app.jwtSecret}")
    private String jwtSecret;

    @Value("${loginservice.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) throws UnsupportedEncodingException {

        MyUserDetails userPrincipal = (MyUserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setId(userPrincipal.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes("UTF-8"))
                .compact();
    }

    public String getUserNameFromJwtToken(String token) throws UnsupportedEncodingException {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes("UTF-8")).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) throws UnsupportedEncodingException {
        try {
            Jwts.parser().setSigningKey(jwtSecret.getBytes("UTF-8")).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: {}" + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: {}" + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: {}" + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: {}" + e.getMessage());
        }

        return false;
    }
}