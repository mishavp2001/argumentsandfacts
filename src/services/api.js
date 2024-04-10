export const fetchGPTPrompt = async (argument, action = '') => {
try {
    const resp = await fetch("https://9xsl4q3gdk.execute-api.us-east-2.amazonaws.com/Prod/getPrompt", {
    method: "POST",
    body: JSON.stringify({
      data: action + ':' + argument
    }
    ),
    headers: {
      "Content-type": "application/json;"
    }
  });
  const body = await resp.body;
  const reader = body.getReader();
  //console.dir(reader);
  const txt = await reader.read();
  return new TextDecoder().decode(txt.value);
} catch (error) {
    console.log(error.message)
}
}