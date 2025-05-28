export const googleLogin = () => {
  // Arahkan langsung ke backend buat redirect ke Google
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect`;
};

export const getUser = async () => {
  const response = await fetch("http://localhost:8000/api/user", {
    method: "GET",
    credentials: "include", // Biar cookie otomatis dikirim
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log("response: test");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    console.log("response:", response.status);

    if (!response.ok) {
      // Jika respons tidak ok, lempar error
      const errorData = await response.json();
      console.error("Registration error:", errorData);
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    console.log(data);
    if (data.status === "true") {
      return data.data.messages; // Kembalikan data pengguna jika registrasi berhasil
    } else {
      throw new Error(data.message); // Jika ada error
    }
  } catch (error) {
    console.error("Register error:", error);
    throw error; // Lempar error agar bisa ditangkap di komponen
  }
};
