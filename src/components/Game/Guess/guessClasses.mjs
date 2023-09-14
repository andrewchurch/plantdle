const guessClasses = {
    default: {
        wrapper: ['flex'],
        indicator: ['w-5', 'h-5', 'bg-gray-500'],
        input: ['border-2'],
        button: ['p-4']
    },
    active: {
        add: {
            wrapper: [''],
            indicator: ['bg-yellow-500'],
            input: ['border-yellow-500'],
            button: ['inline-block', 'bg-forest-800', 'text-white']
        }, 
        remove: {
            indicator: ['bg-gray-500']
        }
    },
    success: {
        add: {
            indicator: ['bg-green-500'],
            input: ['border-green-500']
        }, 
        remove: {
            indicator: ['bg-gray-500']
        }
    },
    failure: {
        add: {
            indicator: ['bg-red-500'],
            input: ['border-red-500']
        }, 
        remove: {
            indicator: ['bg-gray-500']
        }
    }
};

export default guessClasses;