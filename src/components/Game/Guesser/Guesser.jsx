import { useState, useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { getAll } from '../../../services/data.mjs';

function Guesser({ gameId, onGuess }) {
    const [selectedGuess, setSelectedGuess] = useState(null);
    const [guesserOptions, setGuesserOptions] = useState(JSON.parse(localStorage.getItem('guesserOptions')) || {});
    const inputRef = useRef();

    const loadOptions = (input, callback) => {
        if (guesserOptions.gameId === gameId && guesserOptions.options?.length) {
            callback(guesserOptions.options);
        } else {
            getAll().then((response => {
                let options = [];
                response.items.forEach(item => {
                    options.push({ ...item.fields });
                });
                callback(options);
                setGuesserOptions({
                    gameId: gameId,
                    options: options
                });
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
        onGuess(selectedGuess);
    };

    useEffect(() => {
        localStorage.setItem('guesserOptions', JSON.stringify(guesserOptions));
    }, [guesserOptions]);

    return (
        <form onSubmit={handleGuessSubmission} className="flex gap-2 mt-2 mb-2">
            <AsyncSelect
                cacheOptions
                className="w-full"
                classNames={{
                    menu: () => 'w-full text-xs',
                }}
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
            />
            <button className="bg-forest-800 shadow-sm rounded-md px-2 font-semibold text-white tracking-tight text-sm">Submit</button>
        </form>
    );
}

export default Guesser;