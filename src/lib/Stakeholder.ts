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