package com.gasnet.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResp {
	
	private ResponseUserDto responseUserDto;
	private ApiResponse apiResponse;
	
	public ServiceResp(ResponseUserDto responseUserDto){
		this.responseUserDto = responseUserDto;
	}
	public ServiceResp(ApiResponse apiResponse){
		this.apiResponse = apiResponse;
	}
}
