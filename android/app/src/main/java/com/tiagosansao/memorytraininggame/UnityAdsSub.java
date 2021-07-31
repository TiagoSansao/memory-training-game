package com.tiagosansao.memorytraininggame;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.unity3d.ads.IUnityAdsListener;
import com.unity3d.ads.UnityAds;

public class UnityAdsSub extends AppCompatActivity {

    private String unityGameID = "4233797";
    private Boolean testMode = true;
    private String adUnitId = "interstitial";

//    @Override
//    protected void onCreate (Bundle savedInstanceState) {
//        super.onCreate (savedInstanceState);
//        System.out.println("OnCreate worked!");
//        setContentView (0);
//        // Declare a new listener:
//        final UnityAdsListener myAdsListener = new UnityAdsListener ();
//        // Add the listener to the SDK:
//        UnityAds.addListener(myAdsListener);
//        // Initialize the SDK:
//        UnityAds.initialize (this, unityGameID, testMode);
//    }

    // Implement a function to display an ad if the Ad Unit is ready:
//    public void DisplayInterstitialAd() {
//        System.out.println("Trying to display an AD");
//        System.out.println("Result from isReady: " + UnityAds.isReady(adUnitId));
//        if (UnityAds.isReady (adUnitId)) {
//            UnityAds.show (this, adUnitId);
//        }
//    }

    // Implement the IUnityAdsListener interface methods:
//    private class UnityAdsListener implements IUnityAdsListener {
//
//        @Override
//        public void onUnityAdsReady (String adUnitId) {
//            // Implement functionality for an ad being ready to show.
//            String hi = "Hello";
//        }
//
//        @Override
//        public void onUnityAdsStart (String adUnitId) {
//            // Implement functionality for a user starting to watch an ad.
//            String hi = "Hello";
//        }
//
//        @Override
//        public void onUnityAdsFinish (String adUnitId, UnityAds.FinishState finishState) {
//            // Implement functionality for a user finishing an ad.
//            String hi = "Hello";
//        }
//
//        @Override
//        public void onUnityAdsError (UnityAds.UnityAdsError error, String message) {
//            // Implement functionality for a Unity Ads service error occurring.
//            String hi = "Hello";
//        }
//    }
}