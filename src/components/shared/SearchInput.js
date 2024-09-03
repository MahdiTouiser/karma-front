import { jsx as _jsx } from "react/jsx-runtime";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import KTextInput from "./TextInput";
const SearchInput = ({ onSubmit, searchTerm, placeholder = '', id = '' }) => {
    const [innerSearchTerm, setInnerSearchTerm] = useState(searchTerm);
    const firstRender = useRef(false);
    const handleChange = (event) => {
        setInnerSearchTerm(event.target.value);
    };
    const debouncedSearch = useCallback(debounce((query) => onSubmit(query), 600), []);
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
    return _jsx(KTextInput, { id: id, value: innerSearchTerm, onChange: handleChange, placeholder: placeholder });
};
export default SearchInput;
