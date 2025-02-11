package com.gasnet.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomerResponse {
	
	private RequestUserDto userDto;
	private ApiResponse apiResponse;
	private TransactionDto transactionDto;
}
