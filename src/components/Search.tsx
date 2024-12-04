import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const pathname = usePathname();

  const path = pathname.split("/");
  console.info("ini adalah info -> ", path);
  let search = "";

   if (path[path.length - 1] == "home") {
     search = "Search Projects....";
   } else if (path[path.length - 1] == "stakeholder") {
     search = "Search Stakeholder....";
   } else if (path[path.length - 1] == "mahasiswa") {
     search = "Search Mahasiswa....";
   } else if (path.length > 2) {
     search = "Search " + path[2]?.charAt(0)?.toUpperCase() + path[2].slice(1) + "....";
   }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Arahkan ke halaman pencarian lain dengan query keyword
    if (search === "Search Projects....") {
      router.push(`/search-results/projects?query=${keyword}`);
    } else if (search === "Search Stakeholder....") {
      router.push(`/search-results/stakeholder?query=${keyword}`);
    } else if (search === "Search Mahasiswa....") {
      router.push(`/search-results/mahasiswa?query=${keyword}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto max-sm:max-w-36">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ fontSize: "1.5rem" }}
            className="text-primary"
          />
        </span>
        <input
          className="placeholder:italic max-sm:placeholder:text-sm placeholder:text-[#92c7cfd0] text-primary block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder={search}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </label>
    </form>
  );
};

export default Search;
