package com.duantotnghiep

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.listeners.PayOrderListener
import vn.zalopay.sdk.ZaloPayError
import android.content.Intent
import android.widget.Toast
import android.util.Log
import com.facebook.react.bridge.Promise

class ZaloPayBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName(): String {
        return "ZaloPayBridge"
    }

    @ReactMethod
    fun payOrder(zpTransToken: String, promise: Promise) {
        val currentActivity: Activity? = currentActivity
        if (currentActivity != null) {
            ZaloPaySDK.getInstance().payOrder(
                currentActivity,
                zpTransToken,
                "demozpdk://app", // URL scheme cần định nghĩa trong AndroidManifest
                object : PayOrderListener {
                    override fun onPaymentSucceeded(transactionId: String?, transToken: String?, appTransID: String?) {
                                            promise.resolve("success|$transactionId|$appTransID")

            }

                    override fun onPaymentCanceled(zpTransToken: String?, appTransID: String?) {
                                           promise.resolve("canceled|$appTransID")

                    }

                    override fun onPaymentError(error: ZaloPayError?, zpTransToken: String?, appTransID: String?) {
                                       promise.reject("error", "Lỗi rồi bạn ơiơi")

                    }
                }
            )
        }else{
                    promise.reject("error", "Current activity is null")

        }
    }
}
