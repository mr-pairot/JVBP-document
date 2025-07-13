async function getLookerUrl(buttonName) {
  const response = await fetch(`https://script.google.com/macros/s/AKfycbyfGJwJ72tjZ450U6STHXiUVcijGPJ_YNaNIffQjgUMFNZQ47uBJ1DOwhP4zq60tAc4ww/exec?buttonName=${buttonName}`);
  const data = await response.json();
  return data.lookerUrl;
}

async function initLiff() {
  document.getElementById('loader').style.display = 'block';
  await liff.init({ liffId: window.liffId });

  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
  } else {
    const lookerUrl = await getLookerUrl(window.buttonName);
    loadLooker(lookerUrl);
    sendDataToSheet(window.buttonName);
  }
}

function loadLooker(url) {
  document.getElementById('iframe-container').innerHTML = `<iframe src="${url}" width="100%" height="600px" frameborder="0"></iframe>`;
  document.getElementById('loader').style.display = 'none';
}

async function sendDataToSheet(buttonName) {
  const profile = await liff.getProfile();
  const data = {
    userId: profile.userId,
    displayName: profile.displayName,
    buttonClicked: buttonName
  };

  await fetch('https://script.google.com/macros/s/AKfycbyfGJwJ72tjZ450U6STHXiUVcijGPJ_YNaNIffQjgUMFNZQ47uBJ1DOwhP4zq60tAc4ww/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
