import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <div className="bg-primary h-80 px-24 pt-24 justify-between flex flex-col">
      <div className="flex flex-row justify-between text-white">
        <div className="flex w-1/2 pe-24">
          <p className="text-xl tracking-wide font-medium ps-32">
            SimaPro.id adalah platform inovatif yang menyediakan solusi
            manajemen proyek berbasis aplikasi dasar, dirancang untuk
            mempermudah pengelolaan proyek secara efisien dan terstruktur.
          </p>
        </div>
        <div className="flex w-1/3 text-xl ">
          <div className="gap-6 pt-1 flex flex-col">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ fontSize: "1.3rem" }}
              className="text-inherit me-2"
            />
            <FontAwesomeIcon
              icon={faPhoneVolume}
              style={{ fontSize: "1.3rem" }}
              className="text-inherit me-2"
            />

            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ fontSize: "1.3rem" }}
              className="text-inherit me-2"
            />
          </div>
          <div className="ms-4 flex flex-col gap-4">
            <p>Universitas Gadjah Mada</p>
            <p>Fahrul (081228660482)</p>
            <p>muhamadfahrulrazi@mail.ugm.ac.id</p>
          </div>
        </div>
      </div>
      <div className=" text-white flex text-xl font-black justify-center items-center mb-4" >
        © 2024 SimaPro.id All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
