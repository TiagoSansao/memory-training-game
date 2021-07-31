package com.tiagosansao.memorytraininggame;

import com.unity3d.ads.IUnityAdsListener;
import com.unity3d.ads.UnityAds;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.view.View;
import android.widget.Toast;

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

  //

  @ReactMethod
  public void start() {
    System.out.println("MEMLOG - Started!");
    // Declare a new listener:
    IUnityAdsListener unityAdsListener = new IUnityAdsListener () {
      @Override
      public void onUnityAdsReady (String adUnitId) {
        // Implement functionality for an ad being ready to show.
        Toast.makeText(getCurrentActivity(), "Ad ready to show", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onUnityAdsStart (String adUnitId) {
        // Implement functionality for a user starting to watch an ad.
        Toast.makeText(getCurrentActivity(), "Ad started", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onUnityAdsFinish (String adUnitId, UnityAds.FinishState finishState) {
        // Implement functionality for a user finishing an ad.
        Toast.makeText(getCurrentActivity(), "Ad Finished", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onUnityAdsError (UnityAds.UnityAdsError error, String message) {
        // Implement functionality for a Unity Ads service error occurring.
        Toast.makeText(getCurrentActivity(), error.toString(), Toast.LENGTH_SHORT).show();
      }
    };
    // Add the listener to the SDK:
    UnityAds.addListener(unityAdsListener);
    // Initialize the SDK:
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

  //



}
