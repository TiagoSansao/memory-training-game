package com.tiagosansao.memorytraininggame;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.unity3d.ads.IUnityAdsListener;
import com.unity3d.ads.UnityAds;

public class UnityAdsSub extends AppCompatActivity {

    private String unityGameID = "4233797";
    private Boolean testMode = true;
    private String adUnitId = "video";

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
         setContentView(R.layout.main_activity);
        // Declare a new listener:
        final UnityAdsListener myAdsListener = new UnityAdsListener();
        // Add the listener to the SDK:
        UnityAds.addListener(myAdsListener);
        // Initialize the SDK:
        System.out.println("Initializing UnityAds!");
        UnityAds.initialize(this, unityGameID, testMode);
    }

    // Implement a function to display an ad if the Ad Unit is ready:

    public void DisplayInterstitialAd() {
        System.out.println("Trying to display AD!");
        if (UnityAds.isReady(adUnitId)) {
            System.out.println("Displaying AD!");
            UnityAds.show(this, adUnitId);
        }
    }

    // Implement the IUnityAdsListener interface methods:
    private class UnityAdsListener implements IUnityAdsListener {

        @Override
        public void onUnityAdsReady(String adUnitId) {
            // Implement functionality for an ad being ready to show.
        }

        @Override
        public void onUnityAdsStart(String adUnitId) {
            // Implement functionality for a user starting to watch an ad.
        }

        @Override
        public void onUnityAdsFinish(String adUnitId, UnityAds.FinishState finishState) {
            // Implement functionality for a user finishing an ad.
        }

        @Override
        public void onUnityAdsError(UnityAds.UnityAdsError error, String message) {
            // Implement functionality for a Unity Ads service error occurring.
        }
    }
}