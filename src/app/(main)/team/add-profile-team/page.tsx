"use client";

import SearchResult from "@/components/SearchResult";
import { Mahasiswa, searchMahasiswa } from "@/lib/Mahasiswa";
import { submitTeam, TeamMember } from "@/lib/Team";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddProfileTeam = () => {
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

  const [isLoading, setIsLoading] = useState(false);

  const [mahasiswas, setMahasiswas] = useState<Mahasiswa[]>([]);

  const [formData, setFormData] = useState<TeamMember>({
    nama_tim: "",
    member_pm: 0,
    member_fe: 0,
    member_be: 0,
    member_ui_ux: 0,
  });

  const [error, setError] = useState<string | null>(null);

  // State untuk validation errors
  const [validationErrors, setValidationErrors] = useState({
    nama_tim: "",
    member_pm: "",
    member_fe: "",
    member_be: "",
    member_ui_ux: "",
  });

  const router = useRouter();

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

  // Fungsi untuk clear error specific field
  const clearValidationError = (field: string) => {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Fungsi validasi form
  const validateForm = () => {
    const errors = {
      nama_tim: "",
      member_pm: "",
      member_fe: "",
      member_be: "",
      member_ui_ux: "",
    };

    if (!formData.nama_tim.trim()) {
      errors.nama_tim = "*Kolom wajib di isi";
    }

    if (formData.member_pm === 0) {
      errors.member_pm = "*Kolom wajib di isi";
    }

    if (formData.member_fe === 0) {
      errors.member_fe = "*Kolom wajib di isi";
    }

    if (formData.member_be === 0) {
      errors.member_be = "*Kolom wajib di isi";
    }

    if (formData.member_ui_ux === 0) {
      errors.member_ui_ux = "*Kolom wajib di isi";
    }

    setValidationErrors(errors);

    // Return true jika tidak ada error
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "pm") {
      setPmKeyword(value);
      // Clear error saat user mulai mengetik
      clearValidationError("member_pm");

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
      clearValidationError("member_fe");

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
      clearValidationError("member_be");

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
      clearValidationError("member_ui_ux");

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
      // Clear error saat user mulai mengetik
      clearValidationError("nama_tim");
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
      clearValidationError("member_pm");
    } else if (name == "fe") {
      setActiveFE(false);
      setFormData({
        ...formData,
        member_fe: id,
      });
      setFeKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_fe");
    } else if (name == "be") {
      setActiveBE(false);
      setFormData({
        ...formData,
        member_be: id,
      });
      setBeKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_be");
    } else if (name == "uiux") {
      setActiveUIUX(false);
      setFormData({
        ...formData,
        member_ui_ux: id,
      });
      setUiuxKeyword(fullName);
      setMahasiswas([]);
      clearValidationError("member_ui_ux");
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      return; // Stop submission jika ada error
    }

    setIsLoading(true);

    try {
      const res = await submitTeam(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (res.status === 201) {
        // setShowSuccessModal(true);
        setIsLoading(false);
        Swal.fire({
          title: "Upload Team Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/home" >OK</a></div>`,
        });
      }
    } catch (error) {
      // setShowFailedModal(true);
      setIsLoading(false);
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

  console.log(error);

  // const closeSuccessModal = () => {
  //   setShowSuccessModal(false);
  // };

  // const closeFailedModal = () => {
  //   setShowFailedModal(false);
  // };

  // const handleBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
  //   if (e.target === e.currentTarget) {
  //     closeModal();
  //   }
  // };

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
              <div>
                <div className="grid grid-cols-4">
                  <div></div>
                  {validationErrors.nama_tim && (
                    <p className="text-red-500 text-sm mb-1 col-span-3">
                      {validationErrors.nama_tim}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="teamName"
                    className="flex justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama Team
                  </label>
                  <div className="col-span-3">
                    <input
                      id="teamName"
                      name="teamName"
                      type="text"
                      onChange={handleChange}
                      placeholder="Team Name"
                      className={`placeholder:text-hint py-3 max-sm:py-2 max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full focus:ring-0 ${
                        validationErrors.nama_tim
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full items-end">
                  <p className="flex justify-center text-xl max-sm:text-base text-primary max-sm:col-span-3 max-sm:justify-normal">
                    Project Manager
                  </p>
                  {validationErrors.member_pm && (
                    <p className="text-red-500 text-sm mb-1">
                      {validationErrors.member_pm}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full h-full">
                  <label
                    htmlFor="projectManager"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="projectManager"
                      name="pm"
                      onChange={handleChange}
                      value={pmKeyword}
                      type="text"
                      placeholder="Nama Mahasiswa"
                      className={`placeholder:text-hint h-full max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        validationErrors.member_pm
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                  </div>
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

              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full items-end">
                  <p className="flex justify-center text-xl max-sm:text-base text-primary max-sm:col-span-3 max-sm:justify-start">
                    Front End
                  </p>
                  {validationErrors.member_fe && (
                    <p className="text-red-500 text-sm mb-1">
                      {validationErrors.member_fe}
                    </p>
                  )}
                </div>
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="frontEnd"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="frontEnd"
                      name="fe"
                      onChange={handleChange}
                      value={feKeyword}
                      type="text"
                      placeholder="Nama Mahasiswa"
                      className={`placeholder:text-hint h-full max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        validationErrors.member_fe
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                  </div>
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

              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full items-end">
                  <p className="flex justify-center text-xl max-sm:text-base max-sm:col-span-3 max-sm:justify-start text-primary">
                    Back End
                  </p>
                  {validationErrors.member_be && (
                    <p className="text-red-500 text-sm mb-1">
                      {validationErrors.member_be}
                    </p>
                  )}
                </div>
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="backEnd"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="backEnd"
                      name="be"
                      type="text"
                      onChange={handleChange}
                      value={beKeyword}
                      placeholder="Nama Mahasiswa"
                      className={`placeholder:text-hint h-full max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        validationErrors.member_be
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                  </div>
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

              <div className="mt-6 flex flex-col gap-2 max-sm:gap-1">
                <div className="grid grid-cols-4 gap-4 w-full items-end">
                  <p className="flex justify-center text-xl max-sm:text-base max-sm:col-span-3 max-sm:justify-start text-primary">
                    UI/UX
                  </p>
                  {validationErrors.member_ui_ux && (
                    <p className="text-red-500 text-sm mb-1">
                      {validationErrors.member_ui_ux}
                    </p>
                  )}
                </div>
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="uiux"
                    className="flex justify-center py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="uiux"
                      name="uiux"
                      type="text"
                      onChange={handleChange}
                      value={uiuxKeyword}
                      placeholder="Nama Mahasiswa"
                      className={`placeholder:text-hint h-full max-sm:placeholder:text-sm text-primary bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        validationErrors.member_ui_ux
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                  </div>
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
                  className="bg-primary px-10 py-2 max-sm:px-4 text-white font-medium rounded-md shadow-lg border-2 border-primary hover:border-white"
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 max-sm:px-4 text-primary font-medium rounded-md shadow-lg border-2 border-white hover:border-primary"
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
                  className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
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

        {/* modal success */}
        {/* <div
          className={`${
            showSuccessModal ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          onClick={(e) => handleBackdropClick(e, closeSuccessModal)}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  size="6x"
                  className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                />
                <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                  Team successfully added!
                </h3>

                <button
                  data-modal-hide="successModal"
                  type="button"
                  onClick={() => router.push("/home")}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* modal failed */}
        {/* <div
          id="failedModal"
          tabIndex={-1}
          className={`${
            showFailedModal ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          onClick={(e) => handleBackdropClick(e, closeFailedModal)}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="6x"
                  className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                />
                <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                  Team failed to upload!
                </h3>

                <button
                  onClick={closeFailedModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </form>
    </>
  );
};

export default AddProfileTeam;
