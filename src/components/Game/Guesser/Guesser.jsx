import { useState, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { getAll } from '../../../services/data.mjs';

function Guesser({ gameId, onGuess }) {
    const [selectedGuess, setSelectedGuess] = useState(null);
    const [allOptions, setAllOptions] = useState([]);
    const inputRef = useRef();

    const loadOptions = (input, callback) => {
        
        if (allOptions.length) {
            callback(allOptions);
        } else {
            getAll().then((response => {
                let options = [];
                response.items.forEach(item => {
                    options.push({ ...item.fields });
                });
                callback(options);
                setAllOptions(options);
            }));
        }
    };

    const getNameOutput = (option) => {
        return `${option.commonName} (${option.scientificNames.join(', ')})`;
    };

    // custom filter to return options that match both the option label (common + scientific name) AND any aliases
    const customFilter = (option, searchText) => {
        if (searchText) {
            const searchIn = [option.label.toLowerCase()];
            if (option.data.commonAliases) {
                searchIn.push(
                    ...option.data.commonAliases.map(alias => alias.toLowerCase())
                );
            }
            return searchIn.some(searchItem => searchItem.includes(searchText.toLowerCase()));
        }
        return true;
    };

    const handleGuessSubmission = (event) => {
        event.preventDefault();
        inputRef.current.clearValue();
        onGuess(selectedGuess.id, getNameOutput(selectedGuess));
    };

    return (
        <form onSubmit={handleGuessSubmission} className="flex gap-2 mt-2">
            <AsyncSelect
                cacheOptions
                components={{ LoadingIndicator: null }}
                defaultOptions
                filterOption={customFilter}
                getOptionLabel={getNameOutput}
                getOptionValue={option => option.id}
                isClearable={true}
                loadOptions={loadOptions}
                onChange={setSelectedGuess}
                placeholder="Search and select from list"
                ref={inputRef}
                required
                className="text-base w-full"
            />
            <button className="bg-forest-800 shadow-sm rounded-md px-2 font-semibold text-white tracking-tight text-sm">Submit</button>
        </form>
    );
}

export default Guesser;