// The boring video ID to redirect all requests to
const BORING_VIDEO_ID = "0iGdLDeyeso";

// Function to handle redirection for YouTube video URLs
function yt_redirector(details) {
  const url = new URL(details.url);

  // If the URL is a YouTube video, change it to the boring video URL
  if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
    const boringUrl = `https://www.youtube-nocookie.com/embed/${BORING_VIDEO_ID}`;
    console.log(`Redirecting YouTube video to boring video: ${boringUrl}`);

    // Redirect the tab (non-blocking)
    chrome.tabs.update(details.tabId, { url: boringUrl });
  }
}

// Function to handle redirection for YouTube Shorts URLs
function yts_redirector(details) {
  const url = new URL(details.url);

  // If it's a Shorts URL, redirect it to the boring video URL
  if (url.pathname.includes("/shorts/")) {
    const boringUrl = `https://www.youtube-nocookie.com/embed/${BORING_VIDEO_ID}`;
    console.log(`Redirecting YouTube Shorts to boring video: ${boringUrl}`);

    // Redirect the tab (non-blocking)
    chrome.tabs.update(details.tabId, { url: boringUrl });
  }
}

// Listen for requests to YouTube video URLs (non-blocking)
chrome.webRequest.onBeforeRequest.addListener(
  yt_redirector,
  {
    urls: [
      "*://www.youtube.com/watch*",
      "*://youtube.com/watch*"
    ]
  },
  ["requestBody"] // This does not block the request
);

// Listen for requests to YouTube Shorts URLs (non-blocking)
chrome.webRequest.onBeforeRequest.addListener(
  yts_redirector,
  {
    urls: [
      "*://www.youtube.com/shorts/*",
      "*://youtube.com/shorts/*"
    ]
  },
  ["requestBody"] // This does not block the request
);
