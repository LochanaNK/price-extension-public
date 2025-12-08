document.addEventListener("DOMContentLoaded", () => {
  const ext = typeof browser !== "undefined" ? browser : chrome;
  
  const input = document.getElementById("productUrl");
  const fetchBtn = document.getElementById("fetchPrice");
  const resultsDiv = document.getElementById("results");
  const loading = document.getElementById("loading");

  // --- HELPER FUNCTIONS ---

  function sanitizeUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.origin + parsed.pathname;
    } catch {
      return url;
    }
  }

  function render(items) {
    loading.classList.add("hidden");
    
    // --- DEBUGGING START ---
    // 1. Log the full response to the console so you can inspect it
    console.log("Full Backend Response:", items);
    // -----------------------

    // Normalize data structure
    let data = items;

    if(!items)return "";

    if (!Array.isArray(items)) {
        if (items.lowest || items.highest) {
            data = Object.values(items);
        } else {
            // --- DEBUGGING CHANGE ---
            // Instead of just saying "Unexpected backend response", 
            // we print the actual JSON so you can see if it's an error message.
            resultsDiv.innerHTML = `
                <p style="color:red; font-weight:bold;">Unexpected Response:</p>
                <pre style="background:#f4f4f4; padding:5px; font-size:11px; overflow:auto;">
                    ${JSON.stringify(items, null, 2)}
                </pre>
            `;
            return;
            // ------------------------
        }
    }

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>No products found</p>";
      return;
    }

    resultsDiv.innerHTML = data.map(item => `
      <div style="border:1px solid #ddd; margin-bottom:10px; padding:10px;">
        <p><strong>Platform:</strong> ${item.platform}</p>
        <p><strong>Title:</strong> ${item.title}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Link:</strong> <a href="${item.link}" target="_blank">View Item</a></p>
      </div>
    `).join("");
  }

  function handleState(state) {
      if (state.status === "loading") {
          loading.classList.remove("hidden");
          resultsDiv.innerHTML = "";
      } else if (state.status === "complete") {
          render(state.results);
      } else if (state.status === "error") {
          loading.classList.add("hidden");
          resultsDiv.innerHTML = `<p style="color:red">Error: ${state.errorMsg}</p>`;
      }
  }

  // --- CORE LOGIC ---

  ext.storage.local.get(["status", "results", "errorMsg", "lastUrl"], (data) => {
      if (data.status) {
          if (data.lastUrl) input.value = data.lastUrl;
          handleState(data);
      }
  });


  ext.storage.onChanged.addListener((changes) => {

      if (changes.status) {

          ext.storage.local.get(["status", "results", "errorMsg"], (data) => {
              handleState(data);
          });
      }
  });


  fetchBtn.addEventListener("click", () => {
    const url = input.value.trim();
    if (!url) return;

    const sanitized = sanitizeUrl(url);


    loading.classList.remove("hidden");
    resultsDiv.innerHTML = "";


    ext.runtime.sendMessage({
      action: "fetchPrice",
      productUrl: sanitized
    });
  });
});