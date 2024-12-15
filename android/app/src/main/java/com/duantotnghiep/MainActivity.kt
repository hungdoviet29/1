package com.duantotnghiep

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import android.widget.Toast
import android.util.Log

import android.os.Bundle
import android.os.StrictMode
import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.Environment

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Gọi phương thức khởi tạo ZaloPay SDK
        initZaloPay()

    }

    private fun initZaloPay() {
        // Thiết lập StrictMode và khởi tạo SDK
        StrictMode.ThreadPolicy.Builder().permitAll().build()
            .also { StrictMode.setThreadPolicy(it) }
        ZaloPaySDK.init(2553, Environment.SANDBOX)
    }

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

      override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    if (intent != null) {
      Log.d("ON NEW INENT","INTENT ĐÃ ĐƯỢC GỌIGỌI")
        ZaloPaySDK.getInstance().onResult(intent) 
    }
}
}
