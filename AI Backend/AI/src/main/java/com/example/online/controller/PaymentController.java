package com.example.online.controller;

import com.example.online.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Step 1: Create Order (called from frontend)
    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount, @RequestParam String receipt) throws Exception {
        return paymentService.createOrder(amount, "INR", receipt);
    }

    // Step 2: Payment callback (success/failure)
    @PostMapping("/verify")
    public String verifyPayment(@RequestParam String email,
                                @RequestParam boolean success) {
        paymentService.sendPaymentStatusEmail(email, success);
        return success ? "Payment successful & email sent" : "Payment failed & email sent";
    }
}
