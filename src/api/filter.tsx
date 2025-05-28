export const filterProjects = async (
  category: Array<string>,
  year: Array<string>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/filter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, year }),
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
