import axios from "axios";

export interface TeamMember {
  nama_tim: string;
  member_pm: number;
  member_fe: number;
  member_be: number;
  member_ui_ux: number;
}

export interface TeamRequest {
  nama_tim: string;
  member_pm: number;
  member_fe: number;
  member_be: number;
  member_ui_ux: number;
  _method: string;
}

export const submitTeam = async (formData: TeamMember) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/storeTeamMember`,
    formData,
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

export const updateTeam = async (formData: TeamMember, id: number) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/updateTeamMember/${id}`,
    formData,
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

export const deleteTeam = async (id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/deleteTeamMember/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

// Cari stakeholder
export const searchTeam = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/search/${keyword}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
