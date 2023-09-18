import { useState, useRef } from 'react';
import AsyncSelect from 'react-select/async';

const loadOptions = (inputValue, callback) => {

    setTimeout(() => {
        const options = [
            {
                id: 1,
                commonName: 'Areca Palm',
                scientificName: 'Dypsis lutescens',
                aliases: [
                    'Golden Cane Palm',
                    'Yellow Palm',
                    'Butterfly Palm',
                    'Bamboo Palm',
                ]
            },
            {
                id: 2,
                commonName: 'Burro\'s Tail',
                scientificName: 'Sedum morganianum',
                aliases: [
                    'Donkey\'s Tail',
                    'Stonecrop',
                ]
            },
        ];
        callback(options);
    }, 500);
};

function Guesser({ onGuess }) {
    const [selectedGuess, setSelectedGuess] = useState(null);
    const inputRef = useRef();

    const handleGuessSubmission = (event) => {
        event.preventDefault();

        inputRef.current.clearValue();
        
        if (!selectedGuess) {

            // set error? or allow blank guesses
            return;
        }

        onGuess(selectedGuess.id, `${selectedGuess.commonName} (${selectedGuess.scientificName})`);
    };

    // custom filter to return options that match both the option label (common + scientific name) AND any aliases
    const customFilter = (option, searchText) => {
        if (searchText) {
            const searchIn = [option.label.toLowerCase(), ...option.data.aliases.map(alias => alias.toLowerCase())];
            return searchIn.some(searchItem => searchItem.includes(searchText.toLowerCase()));
        }
        return true;
    };

    return (
        <form onSubmit={handleGuessSubmission} className="flex gap-2 mt-2">
            <AsyncSelect
                cacheOptions
                components={{ LoadingIndicator: null }}
                defaultOptions
                filterOption={customFilter}
                getOptionLabel={option => `${option.commonName} (${option.scientificName})`}
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