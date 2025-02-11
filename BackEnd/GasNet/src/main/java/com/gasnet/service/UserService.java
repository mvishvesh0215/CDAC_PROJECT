package com.gasnet.service;

import com.gasnet.dtos.ApiResponse;
import com.gasnet.dtos.ServiceResp;
import com.gasnet.dtos.RequestUserDto;

public interface UserService {

	ServiceResp login(String Email,String Password);

	ApiResponse registerNewUser(RequestUserDto dto);

}
