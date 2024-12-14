package com.duantotnghiep

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.NativeModules
import com.facebook.react.bridge.ReactApplicationContext
import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.zalopay.sdk.PayZalo
import com.zalopay.sdk.model.ZaloPayResult
import com.zalopay.sdk.model.ZaloPayError

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "DuAnTotNghiep"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // Đây là nơi bạn có thể khởi tạo ZaloPay SDK nếu cần thiết hoặc xử lý sự kiện khi ứng dụng mở.
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Thêm logic xử lý khi nhận kết quả thanh toán từ ZaloPay
    PayZaloBridge.addListener("EventPayZalo", object : DeviceEventManagerModule.RCTDeviceEventEmitter {
        override fun emit(eventName: String, params: Any?) {
            Log.d("ZaloPay", "Payment result: $params")
            // Thực hiện xử lý khi thanh toán thành công hoặc thất bại
        }
    })
  }

  // Bạn có thể thêm các phương thức để gọi PayZalo từ React Native
  fun initiateZaloPayTransaction() {
    val payZalo = PayZalo()  // Khởi tạo đối tượng thanh toán ZaloPay
    val orderData = // Tạo dữ liệu đơn hàng từ phía ứng dụng của bạn

    payZalo.payOrder(orderData)
  }
}
