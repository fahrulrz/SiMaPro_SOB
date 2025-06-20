import axios from "axios";

export interface AddStakeholder {
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: File | null;
}

export interface Stakeholder {
  id: number;
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: string;
  projects: Project[];
}

export interface Image {
  id: number;
  link_gambar: string;
}

export interface Project {
  id: number;
  nama_proyek: string;
  logo: string;
  deskripsi: string;
  image: Image[];
}

export const submitStakeholder = async (formData: FormData) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/stakeholders/storeStakeholders`,
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

export const updateStakeholder = async (formData: FormData, id: number) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/stakeholders/updateStakeholders/${id}`,
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

export const deleteStakeholder = async (id: number) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/stakeholders/deleteStakeholders/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
};

// Cari stakeholder
export const searchStakeholder = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/stakeholders/search/${keyword}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
