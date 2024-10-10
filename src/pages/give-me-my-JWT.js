import React from "react";

export default function index({props}) {

  return <>
  <button onClick={JWTRequest}>Give me my JWT</button>
  </>
}

async function JWTRequest() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
    {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({identifier: "strapihater3000", password: "asdf123ASDF"}),
    }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const usersData = await response.json();
    console.log(usersData);
  } catch (error) {
    console.log(error.message)
  }
  return {
    props: {}
  }

}