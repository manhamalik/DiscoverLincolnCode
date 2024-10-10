import { createContext } from 'react';

export const FormContext = createContext(
    {selectedTags: new Set(),
    setSelectedTags: (tags) => {},
    handleTagSelect: (tag) => {},
    handleTagClicked: (tag) => {},
    selectedFiles: [],
    setSelectedFiles: (files) => {},
    description: "",
    setDescription: (description) => {},
    selectedlatlng: {latLng: {lat: 0, lng: 0}},
    tagData: [],
    search: "",
    setSearch: (search) => {},
    }
);

export const FormProvider = ({children, value}) => {
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}