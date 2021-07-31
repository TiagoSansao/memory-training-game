package com.tiagosansao.memorytraininggame;

import com.unity3d.ads.IUnityAdsListener;
import com.unity3d.ads.UnityAds;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.view.View;


public class UnityAdsModule extends ReactContextBaseJavaModule implements View.OnClickListener, IUnityAdsListener {

  UnityAdsModule(ReactApplicationContext context) {
    super(context);
  }

  UnityAdsSub sub = new UnityAdsSub();

  public String getName() {
    return "UnityAdsModule";
  }

  @ReactMethod
  public void test() {
    System.out.println("Test");
    sub.DisplayInterstitialAd();
  }

//

  @Override
  public void onClick(View v) {

  }

  @Override
  public void onUnityAdsReady(String s) {

  }

  @Override
  public void onUnityAdsStart(String s) {

  }

  @Override
  public void onUnityAdsFinish(String s, UnityAds.FinishState finishState) {

  }

  @Override
  public void onUnityAdsError(UnityAds.UnityAdsError unityAdsError, String s) {

  }
}
