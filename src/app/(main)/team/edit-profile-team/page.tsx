"use client";

import SearchResult from "@/components/SearchResult";
import { Mahasiswa, searchMahasiswa } from "@/lib/Mahasiswa";
import { TeamRequest, updateTeam } from "@/lib/Team";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditProfileTeam = () => {
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);

  const [pmKeyword, setPmKeyword] = useState("");
  const [feKeyword, setFeKeyword] = useState("");
  const [beKeyword, setBeKeyword] = useState("");
  const [uiuxKeyword, setUiuxKeyword] = useState("");

  const [activePM, setActivePM] = useState(false);
  const [activeFE, setActiveFE] = useState(false);
  const [activeBE, setActiveBE] = useState(false);
  const [activeUIUX, setActiveUIUX] = useState(false);

  const [mahasiswas, setMahasiswas] = useState<Mahasiswa[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<TeamRequest>({
    nama_tim: "",
    member_pm: 0,
    member_fe: 0,
    member_be: 0,
    member_ui_ux: 0,
    _method: "put",
  });

  // State untuk tracking error validasi
  const [validationErrors, setValidationErrors] = useState({
    nama_tim: false,
    member_pm: false,
    member_fe: false,
    member_be: false,
    member_ui_ux: false,
  });

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const [teamId, setTeamId] = useState<string>(" ");

  useEffect(() => {
    const teamIdUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setTeamId(teamIdUrl);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`)
      .then((response) => {
        setPmKeyword(response.data.data.team_member[0].member.nama_lengkap);
        setFeKeyword(response.data.data.team_member[1].member.nama_lengkap);
        setBeKeyword(response.data.data.team_member[2].member.nama_lengkap);
        setUiuxKeyword(response.data.data.team_member[3].member.nama_lengkap);
        setFormData({
          nama_tim: response.data.data.nama_tim,
          member_pm: response.data.data.team_member[0].member_id,
          member_be: response.data.data.team_member[2].member_id,
          member_fe: response.data.data.team_member[1].member_id,
          member_ui_ux: response.data.data.team_member[3].member_id,
          _method: "put",
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, [teamId]);

  useEffect(() => {
    const initializeFlowbite = async () => {
      if (typeof window !== "undefined") {
        const { initFlowbite } = await import("flowbite");
        initFlowbite();
      }
    };

    initializeFlowbite();

    // if (showFailedModal) {
    //   document.body.style.overflow = "hidden";
    //   document.body.style.paddingRight = "15px";
    // }
    // if (showSuccessModal) {
    //   document.body.style.overflow = "hidden";
    //   document.body.style.paddingRight = "15px";
    // } else {
    //   document.body.style.overflow = "unset";
    //   document.body.style.paddingRight = "0px";
    // }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      console.log("dipanggil terus");
    };
  }, []);

  // Fungsi untuk validasi form
  const validateForm = () => {
    const errors = {
      nama_tim: !formData.nama_tim.trim(),
      member_pm: formData.member_pm === 0 || !pmKeyword.trim(),
      member_fe: formData.member_fe === 0 || !feKeyword.trim(),
      member_be: formData.member_be === 0 || !beKeyword.trim(),
      member_ui_ux: formData.member_ui_ux === 0 || !uiuxKeyword.trim(),
    };

    setValidationErrors(errors);

    // Return true jika tidak ada error
    return !Object.values(errors).some((error) => error);
  };

  // Fungsi untuk clear error ketika user mulai mengetik
  const clearValidationError = (field: string) => {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "pm") {
      setPmKeyword(value);
      clearValidationError("member_pm"); // Clear error ketika user mengetik
      searchMahasiswa(value)
        .then((data) => {
          setMahasiswas(data);
        })
        .catch((err) => {
          setError(err);
        });
      setActivePM(true);
    } else if (name == "fe") {
      setFeKeyword(value);
      clearValidationError("member_fe"); // Clear error ketika user mengetik
      searchMahasiswa(value)
        .then((data) => {
          setMahasiswas(data);
        })
        .catch((err) => {
          setError(err);
        });
      setActiveFE(true);
    } else if (name == "be") {
      setBeKeyword(value);
      clearValidationError("member_be"); // Clear error ketika user mengetik
      searchMahasiswa(value)
        .then((data) => {
          setMahasiswas(data);
        })
        .catch((err) => {
          setError(err);
        });
      setActiveBE(true);
    } else if (name == "uiux") {
      setUiuxKeyword(value);
      clearValidationError("member_ui_ux"); // Clear error ketika user mengetik
      searchMahasiswa(value)
        .then((data) => {
          setMahasiswas(data);
        })
        .catch((err) => {
          setError(err);
        });
      setActiveUIUX(true);
    } else if (name == "teamName") {
      setFormData({
        ...formData,
        nama_tim: value,
      });
      clearValidationError("nama_tim"); // Clear error ketika user mengetik
    }
  };

  const handleClick = (name: string, id: number, fullName: string) => {
    if (name == "pm") {
      setActivePM(false);
      setFormData({
        ...formData,
        member_pm: id,
      });
      setPmKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_pm"); // Clear error ketika user memilih
    } else if (name == "fe") {
      setActiveFE(false);
      setFormData({
        ...formData,
        member_fe: id,
      });
      setFeKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_fe"); // Clear error ketika user memilih
    } else if (name == "be") {
      setActiveBE(false);
      setFormData({
        ...formData,
        member_be: id,
      });
      setBeKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_be"); // Clear error ketika user memilih
    } else if (name == "uiux") {
      setActiveUIUX(false);
      setFormData({
        ...formData,
        member_ui_ux: id,
      });
      setUiuxKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_ui_ux"); // Clear error ketika user memilih
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      if (validationErrors.nama_tim) {
        router.push("#teamName");
      } else if (validationErrors.member_pm) {
        router.push("#pm");
      } else if (validationErrors.member_fe) {
        router.push("#fe");
      } else if (validationErrors.member_be) {
        router.push("#be");
      } else if (validationErrors.member_ui_ux) {
        router.push("#uiux");
      }
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateTeam(formData, parseInt(teamId));
      if (res.status === 200) {
        setIsLoading(false);
        Swal.fire({
          title: "Update Team Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/home" >OK</a></div>`,
        });
      }
      console.log("Berhasil upload:", res);
    } catch (error) {
      // const errorMessage =
      //   error?.response?.data?.message || "Gagal upload data. Coba lagi ya.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        iconColor: "##f05252",
        background: "#white",
        color: "#000000",
        confirmButtonColor: "#1e293b",
        buttonsStyling: false,
        confirmButtonText: `<div class="text-white hover:bg-white hover:border-primary hover:text-primary border-2 bg-primary p-3 px-5 rounded-lg">OK</div>`,
      });
      console.error("Gagal upload:", error);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Team Not Found
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-20 max-sm:p-4 h-full w-full mb-14">
          <div className="flex flex-col gap-5">
            <div className=" flex w-full items-center justify-center">
              <div className="text-4xl max-sm:text-3xl font-bold text-primary">
                Profil Team
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-4 max-sm:gap-0 h-full">
              {/* Team Name Section */}
              <div className="flex flex-col">
                {validationErrors.nama_tim && (
                  <div className="text-red-500 text-sm mb-1 ml-1">
                    *Kolom wajib diisi
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="teamName"
                    className="flex justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama Team
                  </label>
                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    value={formData.nama_tim}
                    onChange={handleChange}
                    placeholder="Team Name"
                    className={`placeholder:text-hint py-3 max-sm:py-2 max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 focus:ring-0 ${
                      validationErrors.nama_tim ? "border-2 border-red-500" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Project Manager Section */}
              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <p className="flex justify-center text-xl max-sm:text-base text-primary max-sm:col-span-3 max-sm:justify-normal">
                    Project Manager
                  </p>
                  {validationErrors.member_pm && (
                    <div className="text-red-500 text-sm mb-1 ml-1">
                      *Kolom wajib diisi
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="projectManager"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="projectManager"
                    name="pm"
                    onChange={handleChange}
                    value={pmKeyword}
                    type="text"
                    placeholder="Nama Mahasiswa"
                    className={`placeholder:text-hint max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.member_pm
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                </div>
                <div className="w-full  -mt-3 relative">
                  <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                    <div className="col-span-1"></div>
                    <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                      {activePM && pmKeyword != "" ? (
                        mahasiswas && mahasiswas.length > 0 ? (
                          mahasiswas.map((mahasiswa) => (
                            <div
                              onClick={() =>
                                handleClick(
                                  "pm",
                                  mahasiswa.id,
                                  mahasiswa.nama_lengkap
                                )
                              }
                              key={mahasiswa.id}
                            >
                              <SearchResult name={mahasiswa.nama_lengkap} />
                            </div>
                          ))
                        ) : (
                          <div>
                            <SearchResult name="No Mahasiswa Found" />
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Front End Section */}
              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <p className="flex justify-center text-xl max-sm:text-base text-primary max-sm:col-span-3 max-sm:justify-start">
                    Front End
                  </p>
                  {validationErrors.member_fe && (
                    <div className="text-red-500 text-sm mb-1 ml-1">
                      *Kolom wajib diisi
                    </div>
                  )}
                </div>

                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="frontEnd"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="frontEnd"
                    name="fe"
                    onChange={handleChange}
                    value={feKeyword}
                    type="text"
                    placeholder="Nama Mahasiswa"
                    className={`placeholder:text-hint max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.member_fe
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                </div>
                <div className="w-full  -mt-3 relative">
                  <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                    <div className="col-span-1"></div>
                    <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                      {activeFE && feKeyword != "" ? (
                        mahasiswas && mahasiswas.length > 0 ? (
                          mahasiswas.map((mahasiswa) => (
                            <div
                              onClick={() =>
                                handleClick(
                                  "fe",
                                  mahasiswa.id,
                                  mahasiswa.nama_lengkap
                                )
                              }
                              key={mahasiswa.id}
                            >
                              <SearchResult name={mahasiswa.nama_lengkap} />
                            </div>
                          ))
                        ) : (
                          <div>
                            <SearchResult name="No Mahasiswa Found" />
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back End Section */}
              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <p className="flex justify-center text-xl max-sm:text-base max-sm:col-span-3 max-sm:justify-start text-primary">
                    Back End
                  </p>
                  {validationErrors.member_be && (
                    <div className="text-red-500 text-sm mb-1 ml-1">
                      *Kolom wajib diisi
                    </div>
                  )}
                </div>

                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="backEnd"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="backEnd"
                    name="be"
                    type="text"
                    onChange={handleChange}
                    value={beKeyword}
                    placeholder="Nama Mahasiswa"
                    className={`placeholder:text-hint max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.member_be
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                </div>
                <div className="w-full  -mt-3 relative">
                  <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                    <div className="col-span-1"></div>
                    <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                      {activeBE && beKeyword != "" ? (
                        mahasiswas && mahasiswas.length > 0 ? (
                          mahasiswas.map((mahasiswa) => (
                            <div
                              onClick={() =>
                                handleClick(
                                  "be",
                                  mahasiswa.id,
                                  mahasiswa.nama_lengkap
                                )
                              }
                              key={mahasiswa.id}
                            >
                              <SearchResult name={mahasiswa.nama_lengkap} />
                            </div>
                          ))
                        ) : (
                          <div>
                            <SearchResult name="No Mahasiswa Found" />
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* UI/UX Section */}
              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <p className="flex justify-center text-xl max-sm:text-base max-sm:col-span-3 max-sm:justify-start text-primary">
                    UI/UX
                  </p>
                  {validationErrors.member_ui_ux && (
                    <div className="text-red-500 text-sm mb-1 ml-1">
                      *Kolom wajib diisi
                    </div>
                  )}
                </div>

                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="uiux"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="uiux"
                    name="uiux"
                    type="text"
                    onChange={handleChange}
                    value={uiuxKeyword}
                    placeholder="Nama Mahasiswa"
                    className={`placeholder:text-hint max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.member_ui_ux
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                </div>
                <div className="w-full  -mt-3 relative">
                  <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                    <div className="col-span-1"></div>
                    <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                      {activeUIUX && uiuxKeyword != "" ? (
                        mahasiswas && mahasiswas.length > 0 ? (
                          mahasiswas.map((mahasiswa) => (
                            <div
                              onClick={() =>
                                handleClick(
                                  "uiux",
                                  mahasiswa.id,
                                  mahasiswa.nama_lengkap
                                )
                              }
                              key={mahasiswa.id}
                            >
                              <SearchResult name={mahasiswa.nama_lengkap} />
                            </div>
                          ))
                        ) : (
                          <div>
                            <SearchResult name="No Mahasiswa Found" />
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ml-auto max-sm:mt-6">
                <button
                  type="button"
                  data-modal-toggle="confirmModal"
                  data-modal-target="confirmModal"
                  className="bg-primary px-10 py-2 max-sm:px-4 text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 max-sm:px-4 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                  onClick={() => router.push("/home")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* confirm modal */}
        <div
          id="confirmModal"
          tabIndex={-1}
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                //close modal
                data-modal-hide="confirmModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                  Are you sure you want to add this profile? Please check all
                  information before continuing.
                </h3>
                <button
                  data-modal-hide="confirmModal"
                  type="submit"
                  className="text-primary bg-white hover:border-2 hover:border-white focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, Im sure
                </button>
                <button
                  data-modal-hide="confirmModal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            isLoading ? "flex animate-zoom-in" : "hidden animate-zoom-out"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="p-10 md:p-14 text-center bg-primary gap-8 flex flex-col justify-center items-center rounded-lg">
            <div className="p-4 md:p-5 text-center flex justify-center">
              <svg
                className="mr-3 size-5 w-12 h-12 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-5 font-normal text-white text-xl dark:text-gray-400">
              Uploading team...
            </h3>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfileTeam;
