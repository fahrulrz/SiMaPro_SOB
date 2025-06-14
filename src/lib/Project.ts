import axios from "axios";

export const submitProject = async (formData: FormData) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/storeProject`,
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

export const updateProject = async (formData: FormData, id: number) => {
    const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/updateProject/${id}`,
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
}

export const likeProject = async (id: number) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/like`,
        { id: id },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}

export const getLikeStatus = async (id: number) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/like`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}

export const getLikeCount = async (id: number) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/likes`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}

export const submitComment = async (id: number, comment: string) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/comments`,
        { comment: comment },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}

export const getComments = async (id: number) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/comments`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}