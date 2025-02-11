package com.gasnet.service;

import com.gasnet.dtos.ApiResponse;
import com.gasnet.dtos.UpdateVendorDto;
import com.gasnet.dtos.RequestUserDto;

public interface VendorService {

	ApiResponse updateVendorDetails(Long vendorId, UpdateVendorDto updateVendorDto);

	RequestUserDto fetchVendorDetails(Long vendorId);
	
}
