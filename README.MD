# BrowserStack Automated Tests

[![Build Status](https://dev.azure.com/coreyjvernon/BrowserStack_2025/_apis/build/status%2Fcoreyjvernon.Browserstack?branchName=main)](https://dev.azure.com/coreyjvernon/BrowserStack_2025/_build/latest?definitionId=13&branchName=main)

This repository contains automated tests for the BrowserStack demo site using WebdriverIO and running on the BrowserStack Automate platform.

## Test Scenario

The test suite accomplishes the following tasks:
- Logs into www.bstackdemo.com using credentials from environment variables
- Filters products to display only Samsung devices
- Favorites the "Galaxy S20+" device
- Verifies the Galaxy S20+ is listed on the Favorites page

## Test Environment

Tests run in parallel across three browser configurations:
- Windows 10 Chrome
- macOS Ventura Firefox  
- Samsung Galaxy S22

## Setup & Execution

### Prerequisites
- Node.js v14 or higher
- BrowserStack account
- Azure DevOps account (for CI/CD)

### Local Setup
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the required environment variables
4. Run `npm run wdio` to execute tests

### CI/CD Pipeline
Tests automatically run on Azure DevOps when code is pushed to the main branch.

## Environment Variables

The following environment variables need to be set:
- BROWSERSTACK_USERNAME
- BROWSERSTACK_ACCESS_KEY
- BSTACK_USER
- BSTACK_PASS