<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function vnpay_payment(Request $request): Response
    {
        error_log("calllll");

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:8000"; // URL callback sau khi thanh toán
        $vnp_TmnCode = "IQ6XVAES"; // Mã website tại VNPay 
        $vnp_HashSecret = "44WBULDQV7SX6NKO54OSAVLFXTPUZZF2"; // Chuỗi bí mật
        
        $vnp_TxnRef = '10000'; 
        $vnp_OrderInfo = "Thanh toán hóa đơn";
        $vnp_OrderType = "Pet shop";
        $vnp_Amount = 10000 * 100; // Số tiền phải nhân 100 vì VNPay tính bằng cent
        $vnp_Locale = "VN";
        $vnp_BankCode = "NCB";
        $vnp_IpAddr = $request->ip(); // Lấy IP từ Request
        
        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];
        
        if ($vnp_BankCode) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        
        ksort($inputData);
        $query = "";
        $hashdata = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i === 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        
        $vnp_Url = $vnp_Url . "?" . rtrim($query, '&');
        if ($vnp_HashSecret) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= '&vnp_SecureHash=' . $vnpSecureHash;
        }

        // Trả về JSON với URL thanh toán
        // return Inertia::render('Cart', [
        //     'paymentUrl' => $vnp_Url,
        // ]);
        // Hoặc nếu không dùng Inertia, trả JSON thuần:
        
        return response()->json([
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url,
        ]);
        
    }
}