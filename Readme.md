# 🛒 AliExpress vs. Daraz Price Comparator (Client)

A lightweight browser extension that helps you find the best prices in Sri Lanka. 

When you browse a product on **AliExpress**, this extension automatically searches for the same item on **Daraz.lk** and shows you a side-by-side price comparison, so you can decide where to buy.

> **⚠️ Important:** This extension connects to a private backend server. It will only function when the host server is online.

---

## ✨ Features

* **Instant Comparison:** View local Daraz prices without leaving the AliExpress product page.
* **Automatic Search:** Finds the most relevant matching item using smart title matching.
* **Simple UI:** Clean popup showing the lowest and highest price options.
* **Privacy Focused:** No browsing history is stored; it only scans the current product URL when you click the button.

---

## 📥 How to Install

Since this is a custom developer extension, you need to install it manually (it takes like 30 seconds).

### Step 1: Download
1.  Click the green **Code** button above and select **Download ZIP**.
2.  Extract the ZIP file to a folder on your computer.

### Step 2: Load into Browser
1.  Open **Google Chrome** (or Brave/Edge).
2.  Type `chrome://extensions/` in the address bar and hit Enter.
3.  Toggle **Developer Mode** to **ON** (top right corner).
4.  Click the **Load Unpacked** button (top left).
5.  Select the **folder** you extracted in Step 1 (select the folder containing `manifest.json`).

The extension icon should now appear in your browser toolbar! 🧩

---

## 🚀 How to Use

1.  Go to any product page on [AliExpress.com](https://www.aliexpress.com).
2.  Copy and Paste the link to the item(NOTE!: this is still under development so this won't work for every item.).
3.  Click the **Price Comparator** icon in your browser toolbar.
4.  Wait a few seconds for the scan to complete.
5.  See the price difference between AliExpress and Daraz.

---

## ❓ Troubleshooting

**"Server Connection Error" or Infinite Loading**
* This usually means the host server is currently **offline**. 
* Since this is a private tool, the backend server must be running for the extension to fetch prices. Please contact the developer to check server status.

**"No Products Found"**
* Sometimes a matching item simply doesn't exist on Daraz, or the titles are too different to match confidently.

---

## 📄 License

This project is for educational and personal use.