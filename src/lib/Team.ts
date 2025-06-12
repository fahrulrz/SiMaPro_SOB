import axios from "axios";

export interface TeamMember {
    nama_tim: string;
    member_pm: number;
    member_fe: number;
    member_be: number;
    member_ui_ux: number;
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