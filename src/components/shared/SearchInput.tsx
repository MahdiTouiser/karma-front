import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import KTextInput from "./TextInput";
interface SearchInputProps {
  onSubmit: (value: string) => void;
  searchTerm: string;
  placeholder?: string;
  id?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ onSubmit, searchTerm, placeholder = '', id = '' }) => {
  const [innerSearchTerm, setInnerSearchTerm] = useState<string>(searchTerm);
  const firstRender = useRef<boolean>(false);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInnerSearchTerm(event.target.value);
  };
  const debouncedSearch = useCallback(
    debounce((query) => onSubmit(query), 600),
    []
  );

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    // Apply debouncing to the search operation

    debouncedSearch(innerSearchTerm);

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [innerSearchTerm]);
  return <KTextInput id={id} value={innerSearchTerm} onChange={handleChange} placeholder={placeholder} />;
};

export default SearchInput;
