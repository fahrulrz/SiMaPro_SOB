"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

// import Swal from "sweetalert2";

import Image from "next/image";

import "aos/dist/aos.css";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import "@/app/styles/style.css";
import { submitProject } from "@/lib/Project";
import myImageLoader from "@/lib/loader";
import { searchStakeholder, Stakeholder } from "@/lib/Stakeholder";
import SearchResult from "@/components/SearchResult";
import Team from "@/app/(main)/team/page";
import { searchTeam } from "@/lib/Team";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

interface NavigationItem {
  id: number;
  name: string;
}

interface ValidationErrors {
  projectName?: string;
  projectCategory?: string;
  year?: string;
  stakeholder?: string;
  team?: string;
  description?: string;
  images?: string;
}

const AddProject: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [activeStakeholder, setActiveStakeholder] = useState(false);
  const [stakeholderKeyword, setStakeholderKeyword] = useState<string>("");
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Team
  const [activeTeam, setActiveTeam] = useState(false);
  const [teams, setTeams] = useState<Team[]>();
  const [teamKeyword, setTeamKeyword] = useState<string>("");

  // Validation errors state
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState({
    projectName: "",
    stakeholder: 0,
    team: 0,
    year: 0,
    link_proyek: "",
    description: "",
    projectCategory: 0,
  });

  // State untuk menyimpan file dan URL file untuk setiap input
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [fileUrls, setFileUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleSelect = (item: NavigationItem) => {
    setFormData({ ...formData, projectCategory: item.id });
    setSelectedItem(item);
    // Clear error when field is filled
    if (errors.projectCategory) {
      setErrors({ ...errors, projectCategory: undefined });
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "*Kolom wajib di isi";
    }

    if (!formData.projectCategory || formData.projectCategory === 0) {
      newErrors.projectCategory = "*Kolom wajib di isi";
    }

    if (!formData.year || formData.year === 0) {
      newErrors.year = "*Kolom wajib di isi";
    }

    if (!formData.stakeholder || formData.stakeholder === 0) {
      newErrors.stakeholder = "*Kolom wajib di isi";
    }

    if (!formData.team || formData.team === 0) {
      newErrors.team = "*Kolom wajib di isi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "*Kolom wajib di isi";
    }

    // Check if at least one image is uploaded
    const hasImage = selectedFiles.some((file) => file !== null);
    if (!hasImage) {
      newErrors.images = "*Minimal satu gambar wajib di upload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    };
  }, []);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { id: 1, name: "PAD 1" },
    { id: 2, name: "PAD 2" },
  ];

  // Menangani perubahan file untuk input file tertentu
  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files && files.length > 0) {
        const file = files[0];
        const newSelectedFiles = [...selectedFiles];
        const newFileUrls = [...fileUrls];

        newSelectedFiles[index] = file; // Simpan file yang dipilih
        newFileUrls[index] = URL.createObjectURL(file); // Buat URL sementara dan simpan

        setSelectedFiles(newSelectedFiles);
        setFileUrls(newFileUrls);

        // Clear image error when file is uploaded
        if (errors.images) {
          setErrors({ ...errors, images: undefined });
        }
      }
    };

  if (typeof window != "undefined") {
    import("aos").then((Aos) => {
      Aos.init();
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name == "stakeholder") {
      setStakeholderKeyword(value);

      if (value == "") {
        setActiveStakeholder(false);
        // Clear timeout jika ada
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        return;
      }

      // Clear timeout sebelumnya
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set timeout baru dengan delay 500ms
      searchTimeoutRef.current = setTimeout(() => {
        searchStakeholder(value)
          .then((data) => {
            setStakeholders(data);
            setActiveStakeholder(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    } else if (name == "team") {
      setTeamKeyword(value);

      if (value == "") {
        setActiveTeam(false);
        // Clear timeout jika ada
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        return;
      }

      // Clear timeout sebelumnya
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        searchTeam(value)
          .then((data) => {
            setTeams(data);
            setActiveTeam(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear error when field is being filled
      if (errors[name as keyof ValidationErrors]) {
        setErrors({ ...errors, [name]: undefined });
      }
    }
  };

  const handleClick = (name: string, id: number, fullName: string) => {
    if (name == "stakeholder") {
      setActiveStakeholder(false);
      setFormData({
        ...formData,
        stakeholder: id,
      });
      setStakeholderKeyword(fullName);
      setStakeholders([]);
      // Clear error when stakeholder is selected
      if (errors.stakeholder) {
        setErrors({ ...errors, stakeholder: undefined });
      }
    } else if (name == "team") {
      setActiveTeam(false);
      setFormData({
        ...formData,
        team: id,
      });
      setTeamKeyword(fullName);
      setTeams([]);
      // Clear error when team is selected
      if (errors.team) {
        setErrors({ ...errors, team: undefined });
      }
    }
  };

  // Menangani submit form
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      if (errors.images != "") {
        router.push("#images");
      } else if (errors.projectName != "") {
        router.push("#project-name");
      } else if (errors.stakeholder != "") {
        router.push("#stakeholder");
      } else if (errors.team != "") {
        router.push("#team");
      } else if (errors.year != "") {
        router.push("#year");
      } else if (errors.description != "") {
        router.push("#description");
      } else if (errors.projectCategory != "") {
        router.push("#project-category");
      }
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("nama_proyek", formData.projectName);
    data.append("stakeholder_id", formData.stakeholder.toString());
    data.append("team_id", formData.team.toString());
    data.append("link_proyek", formData.link_proyek);
    data.append("year", formData.year.toString());
    data.append("deskripsi", formData.description);
    data.append("category_project", formData.projectCategory.toString());

    selectedFiles.forEach((file) => {
      if (file) {
        data.append("images[]", file as Blob);
      }
    });

    console.log("Isi FormData:");
    console.log(Array.from(data.entries()));

    try {
      const res = await submitProject(data);
      if (res.status === 201) {
        // setShowSuccessModal(true);
        setIsLoading(false);
        Swal.fire({
          title: "Upload Project Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/home/project?id=${res.data.data.id}" class="h-full w-full flex p-3 px-5 justify-center items-center">OK</a></div>`,
        });
      }
    } catch (error: unknown) {
      // setShowFailedModal(true);
      setIsLoading(false);
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;
      const errorMessage =
        err?.response?.data?.message || "Gagal upload data. Coba lagi ya.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        iconColor: "##f05252",
        background: "#white",
        color: "#000000",
        confirmButtonColor: "#1e293b",
        buttonsStyling: false,
        confirmButtonText: `<div class="text-white hover:bg-white hover:border-primary hover:text-primary border-2 bg-primary p-3 px-5 rounded-lg">OK</div>`,
      });
      console.log("gagal upload project", error);
    }
  };

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
    <div>
      <div className="px-36 py-20 max-sm:px-2 max-sm:py-4">
        <form
          onSubmit={submitHandler}
          method="post"
          className="flex flex-col gap-4 h-full px-10 max-sm:px-2"
        >
          {/* Image Upload Section */}
          <div className="flex flex-col gap-4 h-[48rem] max-sm:h-80">
            {errors.images && (
              <div className="text-red-500 text-sm font-medium mb-2">
                {errors.images}
              </div>
            )}
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              className=" h-full  "
            >
              <label
                htmlFor="image-upload-1"
                className="bg-inputAddProject relative hover:cursor-pointer w-full font-medium tracking-wide text-xl text-primary h-full justify-center items-center flex"
              >
                {fileUrls[0] ? (
                  <div className="absolute flex w-full h-full">
                    <Image
                      loader={myImageLoader}
                      src={fileUrls[0]}
                      alt={selectedFiles[0]?.name || "Uploaded Image"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  "Add New File"
                )}
              </label>
              <input
                id="image-upload-1"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange(0)}
              />
            </div>
            <div className="flex gap-4 w-full h-2/5 columns-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  className="flex flex-auto h-full w-full"
                >
                  <label
                    htmlFor={`image-upload-${index + 2}`}
                    className="bg-inputAddProject hover:cursor-pointer w-full font-medium tracking-wide text-xl max-sm:text-sm text-primary flex justify-center items-center"
                  >
                    {fileUrls[index + 1] ? (
                      <div className="absolute flex w-full h-full">
                        <Image
                          loader={myImageLoader}
                          src={fileUrls[index + 1] || ""} // Pastikan selalu memberikan string default
                          alt={
                            selectedFiles[index + 1]?.name || "Uploaded Image"
                          }
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      "Add New File"
                    )}
                  </label>
                  <input
                    id={`image-upload-${index + 2}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 max-sm:mt-8">
            <div className="flex flex-col gap-4 max-sm:gap-2 w-full">
              {/* Project Name */}
              <div className="flex flex-col">
                {errors.projectName && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.projectName}
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="project-name"
                    className="flex justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Project Name
                  </label>
                  <input
                    id="project-name"
                    type="text"
                    name="projectName"
                    onChange={handleChange}
                    placeholder="Project Name"
                    className={`placeholder:text-hint max-sm:placeholder:text-sm text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 ${errors.projectName ? "border-red-500 border-2" : ""}`}
                  />
                </div>
              </div>

              {/* PAD Dropdown */}
              <div className="flex flex-col">
                {errors.projectCategory && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.projectCategory}
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="selectedProject"
                    className="flex justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    PAD
                  </label>
                  {/* dropdown jenis pad */}
                  <Menu
                    as="div"
                    className="relative insline-block text-left w-full col-span-3"
                  >
                    <Menu.Button
                      className={`inline-flex w-full h-full items-center gap-x-1.5 rounded-md ${selectedItem ? "bg-white" : "bg-primary"}  hover:bg-gray-50 px-3 py-2 max-sm:py-3 text-lg max-sm:text-sm ${isHovered ? "text-primary" : `${selectedItem ? "text-primary" : "text-white"}`} shadow-sm ${errors.projectCategory ? "border-red-500 border-2" : ""}`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {selectedItem ? selectedItem.name : "Select Project"}{" "}
                      <ChevronDownIcon className="h-5 w-5 ms-auto me-0" />
                    </Menu.Button>

                    <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-primary rounded-md shadow-lg overflow-hidden">
                      {navigationItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <button
                              onClick={() => handleSelect(item)}
                              className={`${
                                active
                                  ? "bg-gray-100 text-primary"
                                  : "text-white"
                              } block w-full text-left px-4 py-2 text-lg max-sm:text-sm`}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </div>
              </div>

              {/* Year */}
              <div className="flex flex-col">
                {errors.year && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.year}
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="year"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Year
                  </label>
                  <input
                    id="year"
                    type="number"
                    onChange={handleChange}
                    name="year"
                    placeholder="e.g. 2022"
                    className={`placeholder:text-hint max-sm:placeholder:text-base text-primary bg-inputAddProject  focus:ring-primary text-lg border-none rounded-md p-2 w-full col-span-3 ${errors.year ? "border-red-500 border-2" : ""}`}
                  />
                </div>
              </div>

              {/* Stakeholder */}
              <div className="flex flex-col">
                {errors.stakeholder && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.stakeholder}
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="stakeholder"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Stakeholder
                  </label>
                  <input
                    id="stakeholder"
                    type="text"
                    name="stakeholder"
                    value={stakeholderKeyword}
                    onChange={handleChange}
                    placeholder="Stakeholder"
                    className={`placeholder:text-hint max-sm:placeholder:text-base text-primary bg-inputAddProject focus:ring-primary text-lg border-none rounded-md p-2 w-full col-span-3 ${errors.stakeholder ? "border-red-500 border-2" : ""}`}
                  />
                </div>
              </div>

              <div className="w-full -mt-3 relative">
                <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                  <div className="col-span-1"></div>
                  <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                    {activeStakeholder && stakeholderKeyword != "" ? (
                      stakeholders && stakeholders.length > 0 ? (
                        stakeholders.map((stakeholder) => (
                          <div
                            onClick={() =>
                              handleClick(
                                "stakeholder",
                                stakeholder.id,
                                stakeholder.nama
                              )
                            }
                            key={stakeholder.id}
                          >
                            <SearchResult name={stakeholder.nama} />
                          </div>
                        ))
                      ) : (
                        <div>
                          <SearchResult name="No Stakeholder Found" />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="flex flex-col">
                {errors.team && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.team}
                  </div>
                )}
                <div className="grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="group-name"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Group Name
                  </label>
                  <input
                    id="group-name"
                    type="text"
                    placeholder="Team Name"
                    value={teamKeyword}
                    onChange={handleChange}
                    name="team"
                    className={`placeholder:text-hint max-sm:placeholder:text-base focus:ring-primary text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 ${errors.team ? "border-red-500 border-2" : ""}`}
                  />
                </div>
              </div>

              <div className="w-full -mt-3 relative">
                <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                  <div className="col-span-1"></div>
                  <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                    {activeTeam && teamKeyword != "" ? (
                      teams && teams.length > 0 ? (
                        teams.map((team) => (
                          <div
                            onClick={() =>
                              handleClick("team", team.id, team.nama_tim)
                            }
                            key={team.id}
                          >
                            <SearchResult name={team.nama_tim} />
                          </div>
                        ))
                      ) : (
                        <div>
                          <SearchResult name="No teams Found" />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Project Link */}
              <div className="flex flex-col">
                <div className="grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="project-link"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Project Link
                  </label>
                  <input
                    id="project-link"
                    type="text"
                    placeholder="Project Link (Optional)"
                    onChange={handleChange}
                    name="link_proyek"
                    className={`placeholder:text-hint max-sm:placeholder:text-base focus:ring-primary text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3`}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                {errors.description && (
                  <div className="text-red-500 text-sm font-medium mb-1">
                    {errors.description}
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-4 max-sm:gap-2 w-full">
                  <label
                    htmlFor="description"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full h-fit py-2 bg-inputAddProject col-span-1 rounded-md"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={8}
                    onChange={handleChange}
                    name="description"
                    className={`placeholder:text-hint max-sm:placeholder:text-base text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 ${errors.description ? "border-red-500 border-2" : ""}`}
                    placeholder="Add your project description here"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-sm:gap-2 ml-auto">
            <button
              type="button"
              data-modal-toggle="defaultModal"
              data-modal-target="defaultModal"
              className="bg-primary px-10 max-sm:px-5 py-2 text-white font-medium rounded-md shadow-lg hover:bg-white hover:text-primary border border-primary hover:border-primary"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-white px-10 max-sm:px-5 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-primary hover:text-white border border-primary hover:border-white"
              onClick={() => router.push("/home")}
            >
              Cancel
            </button>
          </div>

          {/* modal confirm */}
          <div
            id="defaultModal"
            tabIndex={-1}
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  //close modal
                  data-modal-hide="defaultModal"
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
                    Are you sure you want to add this project? Please review all
                    project details before proceeding.
                  </h3>
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    onClick={submitHandler}
                    className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, Im sure
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                Uploading project...
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
                    Project upload success!
                  </h3>

                  <button
                    data-modal-hide="successModal"
                    type="button"
                    onClick={() => router.push(`/home/project?id=${id}`)}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* modal failed
          <div
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
                    Project upload failed! Please try again.
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
      </div>
    </div>
  );
};

export default AddProject;
