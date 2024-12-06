export const login = async (name: string, password: string) => {
  try {
    const response = await fetch("https://be-pad.trpl.space/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    if (data.status === "true") {
      return data.data; // Kembalikan data pengguna jika login berhasil
    } else {
      throw new Error("Login failed. Invalid credentials or other issues.");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Lempar error agar bisa ditangkap di komponen
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log("response: test")
    const response = await fetch("https://be-pad.trpl.space/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("response:", response.status)

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
