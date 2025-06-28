import axios from "axios";

export const googleLogin = () => {
  // Arahkan langsung ke backend buat redirect ke Google
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect`;
};

export const getUser = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // const data = await res.json();
  console.info("isi dari response google->>>>", res);
  return res.data;
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
