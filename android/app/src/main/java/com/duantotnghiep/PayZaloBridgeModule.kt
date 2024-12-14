import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import vn.zalopay.sdk.ZaloPaySDK

class PayZaloBridgeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Khởi tạo ZaloPay SDK nếu cần thiết
    }

    override fun getName(): String {
        return "PayZaloBridge"
    }

    @ReactMethod
    fun payOrder(zpTransToken: String) {
        // Thực hiện thanh toán qua ZaloPay SDK
        ZaloPaySDK.getInstance().payOrder(
            currentActivity, // Activity hiện tại
            zpTransToken, // Token thanh toán
            { status, code, zpTranstoken ->
                // Gửi sự kiện đến React Native
                val eventEmitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                eventEmitter.emit("EventPayZalo", mapOf("returnCode" to code))
            }
        )
    }
}
