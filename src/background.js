chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchPrice") {

    hanldeFetchPrice(msg);
    return true;
  }
});

//     // const backend = "https://unpliable-genoveva-penetratingly.ngrok-free.dev"
//     const backend = "http://192.168.1.83:8080";


async function hanldeFetchPrice(msg){
  const backend = "http://127.0.0.1:8080";
  const apiUrl = `${backend}/compare?url=${encodeURIComponent(msg.productUrl)}`;

  try{
    await chrome.storage.local.set({status:"loading",lastUrl:msg.productUrl});

    const res = await fetch(apiUrl,{
      method:"GET",
      mode:"cors",
      headers:{"Content-Type":"application/json"}
    });

    if(!res.ok){
      throw new Error(`Server status: ${res.status}`);
    }

    const data = await res.json();
    await chrome.storage.local.set({status:"complete",results:data});
    console.log("Success:",data);
  
  }catch(err){
    console.error("Network/Cors Error:",err);
    await chrome.storage.local.set({
      status:"error",
      errorMsg:"Ensure your phone server is running and on the same Wi-Fi"
    });
  }
}