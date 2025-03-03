import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Button, SafeAreaView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { titleCase } from 'title-case';

import { Article } from '../types';

// Webview
export default function ArticleDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { article } = route.params as { article: Article };

  // Crediting chatGPT for removing the Ads
  const removeElementsScript = `
    function removeUnwantedElements() {
      const elementsToRemove = [
        'header', // Main site header
        'footer', // Footer section
        '.nav-bar', // Main navigation bar
        '.menu', // Side menu
        '.ad', // General ads
        '.ads-container', // Ad container
        '[id^="ad-"]', // Any ID starting with "ad-"
        '[class*="popup"]', // Elements containing "popup" in class name
        '.modal', // Pop-up modals
        '.overlay', // Overlays blocking scrolling
        '.sticky-banner', // Sticky ad banners
        '.cookie-banner', // Cookie consent banners
        '.subscribe-modal', // Subscription pop-ups
        '.floating-ad', // Floating ads
        '.share-buttons', // Common social media share buttons
        '.social-share', // Alternative class for share buttons
        '[aria-label="Share"]', // Buttons labeled "Share"
        '[class*="share"]', // Any class containing "share"
        '.sticky-share', // Sticky share bar
        '.share-bar', // Share bar under the article
        '.bottom-nav', // Bottom navigation bar
        '.site-footer', // Alternative footer class
        '.mobile-nav', // Mobile navigation
        '[role="navigation"]', // Role-based nav elements
        '[class*="floating"]', // Any floating UI elements
        '[class*="sticky"]', // Sticky elements that persist
        '.fab', // Floating action buttons (sometimes social share)
      ];

      elementsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });

      // Ensure body scrolling is enabled after removing overlays
      document.body.style.overflow = 'auto';
    }

    // Run function immediately
    removeUnwantedElements();

    // Use MutationObserver to continuously remove elements
    const observer = new MutationObserver(() => {
      removeUnwantedElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("Injected script running: Removing ads, pop-ups, share buttons, and bottom nav.");
  `;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#66858A' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#66858A',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="chevron-back" color="#000000" size={24} />,
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: '#FFFFFF' }}>
          {titleCase(article.source)}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="ellipsis-horizontal" color="#000000" size={24} />,
          </View>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: article.link }}
        style={{ flex: 1 }}
        injectedJavaScript={removeElementsScript}
        javaScriptEnabled
        startInLoadingState
      />
    </SafeAreaView>
  );
}
