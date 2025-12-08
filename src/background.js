chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchPrice") {
    // const backend = "https://price-extension.onrender.com";
    const backend = "https://unpliable-genoveva-penetratingly.ngrok-free.dev"
    // const backend = "http://127.0.0.1:8080";


    chrome.storage.local.set({ status: "loading", lastUrl: msg.productUrl });


    const apiUrl = `${backend}/compare?url=${encodeURIComponent(msg.productUrl)}`;

    fetch(apiUrl,{
      method:"GET",
      headers: {
        "ngrok-skip-browser-warning": "true", // <--- THIS IS THE MAGIC KEY
        "Content-Type": "application/json"
      }
    })
      .then(res =>{
        if(!res.ok){
            throw new Error(`Server status: ${res.status}`);
        }
        return res.text();
      })
      .then(text =>{
        try{
            const data = JSON.parse(text);
            chrome.storage.local.set({
                status: "complete",
                results: data
            });
            console.log(data)
        }catch(e){
            console.error("CRITICAL BACKEND ERROR: Response was not JSON.");
            console.error("Server returned: ",text);

            throw new Error("Invalid JSON response from server");
        }
      })
      .catch(err=>{
        console.error(err);
        chrome.storage.local.set({
            status:"error",
            errorMsg:err.toString()
        });
      });

    return false;
  }
});