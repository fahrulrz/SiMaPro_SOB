import axios from "axios";

export interface AddMahasiswa {
    nama_lengkap: string;
    NIM: string;
    foto: File | null;
}

export interface Mahasiswa {
    id: number;
    nama_lengkap: string;
    NIM: string;
    foto: string;
}

// Menambahkan mahasiswa
export const submitMahasiswa = async (formData: FormData) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/storeMember`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
};

// Cari mahasiswa
export const searchMahasiswa = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/search/${keyword}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


// Ambil list mahasiswa
export const getMahasiswa = async (): Promise<Mahasiswa[]> => {
    const res = await axios.get<{ data: Mahasiswa[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa`
    );
    return res.data.data;
};