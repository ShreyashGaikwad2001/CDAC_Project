package com.parkngo.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.parkngo.pojos.User;

@SuppressWarnings("serial")
public class CustomUserDetails implements UserDetails{
	
	User user;
	
	public CustomUserDetails(User user) {
		this.user = user;
	}
	
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(
				new SimpleGrantedAuthority(user.getRole().toString())
				);
	}
}
