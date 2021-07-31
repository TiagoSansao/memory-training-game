package com.tiagosansao.memorytraininggame;

import com.unity3d.ads.IUnityAdsListener;
import com.unity3d.ads.UnityAds;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;

public class UnityAdsModule extends ReactContextBaseJavaModule {

  UnityAdsModule(ReactApplicationContext context) {
    super(context);
  }

  public String getName() {
    return "UnityAdsModule";
  }

  private String unityGameID = "4233797";
  private Boolean testMode = true;
  private String adUnitId = "interstitial";

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  //

  @ReactMethod
  public void start() {
    System.out.println("MEMLOG - Started!");
    // Declare a new listener:
    IUnityAdsListener unityAdsListener = new IUnityAdsListener () {
      @Override
      public void onUnityAdsReady (String adUnitId) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", adUnitId);

        sendEvent("onReady", params);
      }

      @Override
      public void onUnityAdsStart (String adUnitId) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", adUnitId);

        sendEvent("onStart", params);
      }

      @Override
      public void onUnityAdsFinish (String adUnitId, UnityAds.FinishState finishState) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", adUnitId);
        params.putString("result", finishState.toString());

        sendEvent("onFinish", params);
      }

      @Override
      public void onUnityAdsError (UnityAds.UnityAdsError error, String message) {
        WritableMap params = Arguments.createMap();

        params.putString("error", error.toString());
        params.putString("message", message);

        sendEvent("onError", params);
      }
    };
    UnityAds.addListener(unityAdsListener);
    UnityAds.initialize (getCurrentActivity(), unityGameID, testMode);
    System.out.println("Initialized successfully");
  }

  @ReactMethod
  public void displayInterstitial() {
    System.out.println("Trying to display an AD");
    System.out.println("Result from isReady: " + UnityAds.isReady(adUnitId));
    if (UnityAds.isReady (adUnitId)) {
        UnityAds.show (getCurrentActivity(), adUnitId);
    }
  }

  @ReactMethod
  public void isReady(String adUnitId, final Callback callback) {
    callback.invoke(UnityAds.isReady(adUnitId));
  }




  //



}
