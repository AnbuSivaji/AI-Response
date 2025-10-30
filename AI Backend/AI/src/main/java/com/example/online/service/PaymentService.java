package com.example.online.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final JavaMailSender mailSender;

    public PaymentService(
            @Value("${razorpay.key_id}") String keyId,
            @Value("${razorpay.key_secret}") String keySecret,
            JavaMailSender mailSender
    ) throws Exception {
        this.razorpayClient = new RazorpayClient(keyId, keySecret);
        this.mailSender = mailSender;
    }

    // Create order
    public String createOrder(int amount, String currency, String receipt) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // amount in paise
        options.put("currency", currency);
        options.put("receipt", receipt);

        Order order = razorpayClient.orders.create(options);
        return order.toString();
    }

    // Send email after payment success/failure
    public void sendPaymentStatusEmail(String toEmail, boolean isSuccess) {
        String subject = isSuccess ? "Payment Successful" : "Payment Failed";
        String message = isSuccess
                ? "You have successfully completed the payment."
                : "Your payment has failed. Please try again.";

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(toEmail);
        mail.setSubject(subject);
        mail.setText(message);
        mailSender.send(mail);
    }
}
