import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <div className="bg-primary h-80 px-24 pt-24 max-sm:px-0 max-sm:pt-0 justify-between flex flex-col">
      <div className="flex flex-row max-sm:flex-col max-sm:gap-10 max-sm:p-6 justify-between max-sm:justify-normal text-white">
        <div className="flex w-1/2 max-sm:w-full pe-24 max-sm:pe-0">
          <p className="text-xl tracking-wide font-medium ps-32 max-sm:ps-4 max-sm:text-base">
            SimaPro.id adalah platform inovatif yang menyediakan solusi
            manajemen proyek berbasis aplikasi dasar, dirancang untuk
            mempermudah pengelolaan proyek secara efisien dan terstruktur.
          </p>
        </div>
        <div className="flex w-1/3 max-sm:w-full text-xl max-sm:text-base max-sm:ms-4">
          <div className="gap-6 max-sm:gap-2 pt-1 flex flex-col">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ fontSize: "max-sm:1rem 1.3rem" }}
              className="text-inherit me-2"
            />
            <FontAwesomeIcon
              icon={faPhoneVolume}
              style={{ fontSize: "max-sm:1rem 1.3rem" }}
              className="text-inherit me-2"
            />

            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ fontSize: "max-sm:1rem 1.3rem" }}
              className="text-inherit me-2"
            />
          </div>
          <div className="ms-4 max-sm:ms-1 flex flex-col gap-[.93rem] max-sm:gap-0 max-sm:text-base">
            <p>Universitas Gadjah Mada</p>
            <p>Fahrul (081228660482)</p>
            <p>muhamadfahrulrazi@mail.ugm.ac.id</p>
          </div>
        </div>
      </div>
      <div className=" text-white flex text-xl max-sm:text-base font-black justify-center items-center mb-4">
        © 2024 SimaPro.id All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
