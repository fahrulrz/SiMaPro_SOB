export const filterProjects = async (
  category: Array<string>,
  year: Array<string>
) => {
  try {
    const response = await fetch("https://be-pad.trpl.space/api/projects/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, year }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
