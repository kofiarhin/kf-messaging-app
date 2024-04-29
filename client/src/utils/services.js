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
