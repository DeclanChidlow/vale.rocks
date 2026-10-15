---
title: Android WebView Browser
description: Basic web browser that loads pages in Android's System WebView to allow testing and experimenting. Complete with browser chrome and comprehensive settings which allow toggling features and functionality exactly like can be done when developing with WebViews in native applications.
og_description: A browser for testing Android's system WebView.
tags: [development]
accent_colour: "#3DDC84"
repository: tangled.org/vale.rocks/Android-WebView-Browser
---

Android has system WebViews that differ in subtle ways from typical browsers. I developed [Android WebView Browser](https://tangled.org/vale.rocks/Android-WebView-Browser), which supplies a WebView with some browser chrome and exposed settings, so you can load and test pages or sites in a convenient way.

<figure class="right">
<img src="https://mirror-fsn.tangled.network/xrpc/sh.tangled.git.temp.getBlob?path=app-mockup.avif&ref=main&repo=did%3Aplc%3Awspnuwwd62pptqfokl6c6yua" alt="Two Google Pixels showing the app. One shows a web page with a small amount of browser chrome at the top, while the other shows a settings menu listing browser options and is obscured behind it.">
</figure>

For the same reasons that it is important to test sites across popular browsers, it can be important to test them in Android's System WebView -- especially if you're expecting your page to be embedded in one. However, shy of developing an app to embed a page in a WebView, it is difficult to quickly and effectively experiment with them and test compatibility.

The Android System WebView has been Chromium-based since Android version 4.4 (KitKat), which released in 2013. Before 2013, Android's WebView system was WebKit-based. With Android 5 (Lollipop), the WebView was decoupled from the system and split into its own component, allowing it to be updated and managed separately.

As it can be managed separately, some devices run Android with differing System WebViews, which can be hard to get details on. Android WebView Browser significantly simplifies any efforts to get these details. Using Chrome's DevTools, one can debug and inspect pages loaded in the WebView, too, making it easy to fix problems.

Beyond being useful for testing with a WebView, it is also valuable simply for the ability to manage browser features -- such as security protections, resource access, text sizing, and JavaScript functionality -- which many browsers don't allow users to configure.

The app is the first I've developed for Android, having written it in **Kotlin** using the **IntelliJ IDEA**-based **Android Studio** and tested it on real devices as well as simulators. I took care to include compatibility for Android versions as low as Android 6 for optimal testing opportunities. As someone who typically develops for the web rather than a native target, the project taught me a lot.
