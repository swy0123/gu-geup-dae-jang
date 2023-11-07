package com.codesmith.goojangcalling.infra.openfeign;

import com.codesmith.goojangcalling.calling.dto.request.CreateTransferRequest;
import com.codesmith.goojangcalling.calling.dto.response.CreateTransferResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "TRANSFER-SERVICE")
public interface TransferServiceClient {

    @PostMapping("/transfer")
    CreateTransferResponse createTransfer(@RequestBody CreateTransferRequest createTransferRequest);
}