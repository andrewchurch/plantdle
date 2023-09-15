import { useState } from 'react';
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

    const handleGuessSubmission = (event) => {
        event.preventDefault();

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
        <form onSubmit={handleGuessSubmission}>
            <AsyncSelect
                cacheOptions
                defaultOptions
                filterOption={customFilter}
                getOptionLabel={option => `${option.commonName} (${option.scientificName})`}
                getOptionValue={option => option.id}
                isClearable={true}
                loadOptions={loadOptions}
                onChange={setSelectedGuess}
                placeholder="Type to search or select from list"
                required
            />
            <button className="bg-forest-500">Submit</button>
        </form>
    );
}

export default Guesser;