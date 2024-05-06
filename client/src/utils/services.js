export const getDataFetch = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postDataFetch = async (userData, url) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    console.log("xxxx", data);

    if (!res.ok) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
