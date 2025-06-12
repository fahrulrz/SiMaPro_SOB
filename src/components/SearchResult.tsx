interface SearchResultProps {
  name: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ name }) => {
  return (
    <div
      className={`flex flex-col p-2 border-b-2 hover:bg-gray-200 cursor-pointer`}>
      <div>{name}</div>
    </div>
  );
};

export default SearchResult;
