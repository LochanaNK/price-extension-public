chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchPrice") {

    handleFetchPrice(msg,sendResponse);
    return true;
  }
});




async function handleFetchPrice(msg,sendResponse) {
    // Construct the URL using the URL API
    const targetUrl = new URL("https://unpliable-genoveva-penetratingly.ngrok-free.dev/compare");
    targetUrl.searchParams.append("url", msg.productUrl);

    try {
        await chrome.storage.local.set({ status: "loading", lastUrl: msg.productUrl });

        console.log("Forcing HTTP Fetch to:", targetUrl.toString());

        const response = await fetch(targetUrl.toString(), {
            method: "GET",
            headers:{
              "Content-Type":"application/json",
              "ngrok-skip-browser-warning": "true"
            },

        });

        if(!response.ok) throw new Error(`HTTP Error:${response.status}`);

        const data = await response.json();
        await chrome.storage.local.set({ status: "complete", results: data });

        sendResponse({status:"success",data:data});

    } catch (err) {
        console.error("The browser still blocked the request:", err);
        await chrome.storage.loacl.set({status:"error",errorMsg:err.toString()});

        sendResponse({status:"error",message:err.toString()});
    }
}