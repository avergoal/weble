# Weble legacy Android build

## Purpose

This document describes the current legacy Android build used as a baseline/test build before modernization.

## Current status

- Debug APK builds successfully.
- Debug APK installs on Android device.
- Backend WebSocket is available over HTTPS.
- Registration and login are partially restored.
- Media upload/save is not fully working.
- Password recovery is not working.
- Old APK versions are not supported.

## Environment

- Node.js: 10.24.1
- npm: 6.14.12
- Cordova CLI: 9
- Java: 8
- Gradle: 4.10.3
- Android SDK: legacy Cordova Android stack

## Backend

Socket endpoint:

```text
https://weble.club:7005/socket.io/