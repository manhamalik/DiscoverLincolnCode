import React, { useRef } from "react";
import { useState} from "react";
import PageComponent from "@/components/PageComponent";
import ImageUploaderComponent from "@/components/ImageUploaderComponent";
import Button from "@/components/Button";
import TextInputComponent from '@/components/TextInputComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { createContext } from "react";
import axios from "axios";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { resolve } from "styled-jsx/css";
import { FormProvider } from "@/contexts/FormContext";
import { FormContext }  from "@/contexts/FormContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const CreateForm = ({tagsData}) => {
    const formRef = useRef(null);
    const tagsList = new Map();
    const usersMap = new Map();

    const { jwt, username, email } = useContext(AuthContext);

    const tagDataObj = tagsData.tagsData; 
    tagsData.usersList.forEach(element => usersMap.set(element.username, element));
    tagDataObj.forEach(element => tagsList.set(element.attributes.type, {displayText: element.attributes.displayText, icon: icons[element.attributes.icon], id: element.id}));
    
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [catagory, setCatagory] = useState([true,false,false]);
    const catagoryName = ["events", "attractions", "businesses"];
    const [choiceIndex, setchoiceIndex] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState(false);
    
    const [selectedTags, setSelectedtags] = useState(new Set());
    const [description, setDescription] = useState('');
    const [selectedlatlng, setSelectedlatlng] = useState({});
    const [search, setSearch] = useState("");


    const choicesArray = [
        ["culturalEvent", "food", "community", "sports"],
        ["NaturalAttraction", "HistoricalAttraction", "CulturalAttraction", "RecreationalAttraction"],
        ["RestaurantBusiness", "RetailBusiness", "EntertainementBusiness", "HealthBusiness"]
    ]

    function handleTagSelect(event) {
        console.log(event.target.value);
        const newSelected = new Set(selectedTags);

        if (event.target.value !== "") {
            if (newSelected.has(event.target.value)) {
                newSelected.delete(event.target.value);
            } else {
                newSelected.add(event.target.value);
            }
        } else {
            newSelected.clear();
        }

        setSelectedtags(newSelected);
        console.log(selectedTags);
    }

    function handleTagClicked(value) {
        const newSelected = new Set(selectedTags);
        if (newSelected.has(value)) {
            newSelected.delete(value);
        } else {
            newSelected.add(value);
        }

        setSelectedtags(newSelected);
    }

    function handleCatagoryChange(catagoryNum){
        let newCatagories = [false,false,false];
        newCatagories[catagoryNum] = true;
        setchoiceIndex(catagoryNum);
        setCatagory(newCatagories);
    }

    function handleSubmitButton(event){
        setDisableSubmit(true);
        event.preventDefault(); // Prevent the default form submission
        if (formRef.current) {
            const formEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(formEvent);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(formRef);
            const data = new FormData(event.target);
            const newObj = {}
            console.log(Array.from(selectedTags));
            const selectedTagsId = [];

            Array.from(selectedTags).forEach(element => selectedTagsId.push({"id":(tagsList.get(element)).id}));
            data.forEach((element, key) => (newObj[key] = element));
            console.log(selectedTagsId);
            let userLink = null;
            if (jwt !== ""){
                userLink = {"id": (usersMap.get(username)).id}
            }     

        try{

            if (selectedlatlng.latLng.lat === undefined){
                throw new Error("Please check your location field");
            }
            const formExport = {
                "catagory": catagoryName[choiceIndex],
                "Name": data.get("Name"),
                "Slug": data.get("Name").trim().toLowerCase().replaceAll(" ", "-"),
                "PhoneNumber": data.get("PhoneNumber"),
                "Email": data.get("Email"),
                "Type": data.get("Type"),
                "Description": description,
                "Location":{
                    "Address": data.get("location")
                },
                "Dates":{
                    "StartDate": data.get("start-date"),
                    "EndDate": data.get("end-date"),
                    "StartTime": `${data.get("time-start")}:00`,
                    "EndTime": `${data.get("time-end")}:00`
                },
                "Location":{
                    "Latitude": selectedlatlng.latLng.lat,
                    "Longitude": selectedlatlng.latLng.lng,
                    "Address": selectedlatlng.address
                },
                "Type":data.get("Type"),
                "Website": data.get("Website"),
                "accessibility_tags": selectedTagsId,
                "users_permissions_user": userLink,
                "Organizer": username


            }

            console.log(formExport);
        

            sendForm(formExport, selectedFiles, catagoryName[choiceIndex]);
            event.target.reset();
            setSelectedlatlng({});
            setDescription("");
            setSelectedFiles([]);
            setSelectedtags(new Set());
            setSearch("");
            setDisableSubmit(false);
        } catch(error){
            toast.error(error.message, { position: "bottom-center"});
        }
        setDisableSubmit(false);
        
    }
    return (
        <>
                <style jsx>
                {`
                    .create-page-container{
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        padding: 0 2em;
                    }
                
                    .catagory-button-container{
                        display: flex;
                        margin: 1em 0 1em 0;
                        align-self: flex-start;
                        gap: 10%;
                    }
                    
                    .button-container{
                        height: 3em;
                        min-width: 10em;
                    }

                    .form-container{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: max-content;
                        border: 3px solid var(--color-beige);
                        border-radius: 8px;
                        box-shadow: 0 5px 6px rgba(0,0,0,0.2);
                        padding: 1em;
                        min-width: 100%
                    }

                    .line{
                        width: 2px;
                        height: 50em;
                        background-color: rgba(0,0,0,0.2);
                        align-self: center;
                        margin-right: 2em;
                    }

                    #submit-button{
                        height: 3em;
                        margin: 5em 2em 1em;
                        align-self: flex-end;
                    }

                    .form-inner-container{
                        display: flex;
                        height: max-content;
                        margin-bottom: 1em;
                        width: 100%;
                        justify-content: center;
                    }

                    .image-container{
                        height: 90%;
                        min-width: 40%;
                    }

                    .text-input-container{
                        height: 90%;
                        width: 50%
                    }

                    @media screen and (max-width: 768px){
                        .create-page-container{
                            height: fit-content;
                        }

                        .catagory-button-container{
                            flex-direction: column;
                            width: 100%;
                            gap: 10px;
                        }

                        .form-inner-container{
                            flex-direction: column;
                            align-items: center;
                        }

                        .line{
                            display: none;
                        }

                        
                        .image-container{
                            height: 90%;
                            min-width: 90%;
                        }

                        .text-input-container{
                            height: 90%;
                            width: 90%
                        }

                        
                        #submit-button{
                            height: 3em;
                            width: 100%;
                            align-self: center;
                        }


                    }
                
                `}
            </style>
            <div className="create-page-container">
                <div className="catagory-button-container">
                    <div className="button-container">
                        <Button type={!catagory[0] ? "inverted" : "primary"} onClick={() => handleCatagoryChange(0)}>Event</Button>
                    </div>
                    <div className="button-container">
                        <Button type={!catagory[1] ? "inverted" : "primary"} onClick={() => handleCatagoryChange(1)}>Attractions</Button>
                    </div>
                    <div className="button-container">
                        <Button type={!catagory[2] ? "inverted" : "primary"} onClick={() => handleCatagoryChange(2)}>Businesses</Button>
                    </div>
                </div>
                <form ref={formRef} className="form-container" onSubmit={(event) => handleSubmit(event)}>
                    <FormProvider value={{selectedTags: selectedTags, setSelectedtags: setSelectedtags, handleTagSelect: handleTagSelect, 
                        handleTagClicked: handleTagClicked, selectedFiles: selectedFiles, setSelectedFiles: setSelectedFiles, 
                        description: description, setDescription: setDescription, selectedlatlng: selectedlatlng, 
                        setSelectedlatlng: setSelectedlatlng, tagDataObj: tagDataObj, search: search, setSearch: setSearch}}>
                        <div className="form-inner-container">
                            <div className="image-container">
                                <ImageUploaderComponent/>
                            </div>
                            <div className="line">
                            </div>
                            <div className="text-input-container">
                                <TextInputComponent name={username} type={choicesArray[choiceIndex]} selectedTags={selectedTags} setSelectedtags={setSelectedtags}/>
                            </div>
                        </div>
                        <div className="button-container" id="submit-button">
                            <Button onClick={(event) => handleSubmitButton(event)} disabled={disableSubmit}>
                                Submit
                                <div style={{marginLeft:"1em"}}>
                                    <FontAwesomeIcon icon={faShare}/>    
                                </div>
                            </Button>
                        </div>                        
                    </FormProvider>
                    
                </form>
            </div>
        </>
    )
}

export default function EventCreationPage(props){
    return(
        <PageComponent pageName="Create Post" showClipPath={false} includeBottomMargin={true}>
            <CreateForm tagsData={props}/>
        </PageComponent>

    )
}

async function sendForm(formData, images, categoryName){
    const endpoint = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${formData.catagory}`;
    console.log(endpoint);

    try{
        const imageIds = await toast.promise(uploadImage(images),
        {
            loading: "Uploading images",
            success: "Images successfully uploaded",
            error: "Images unable to send",
            position: "bottom-center"
        });
        console.log(imageIds);  
        formData.Images = imageIds.data;
        formData.OwnerImage = imageIds.data[0];
        console.log(formData);


        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data: formData})
        })
        
        const response = await res.json();
        console.log(response);        
        if (!res.ok){
            throw new Error(`Form was unable to be submitted: ${response.error.message}`)
        } else {
            toast.success(`Successfully uploaded your ${categoryName === "businesses" ? "business" : categoryName.slice(0,categoryName.length-1)}, please wait for it to be approved`
            , { position: "bottom-center"});
            setTimeout(function () {
                window.location.replace("/dashboard");
            }, 1000);
        }



    } catch(error){
        console.log(`Form was unable to send: ${error.message}`)
        toast.error(`Your ${categoryName === "businesses" ? "business" : categoryName.slice(0,categoryName.length-1)} was unable to be submitted: ${error.message}`
                    , { position: "bottom-center"});
    }
}

async function uploadImage(images) {
    return new Promise(async (resolve, reject) => {
        try {
            // Use Promise.all with map to ensure all images are uploaded
            const imageIds = await Promise.all(images.map(async (element) => {
                const data = new FormData();
                data.append("files", element);

                const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload/`, data);
                console.log(response);
                return {"id": response.data[0].id};  // Return image ID after upload
            }));

            resolve({"data": imageIds});  // Resolve with all image IDs
        } catch (error) {
            console.log(error);
            reject("Images were not uploaded");
        }
    });
}

export async function getServerSideProps() {
	try {
		const [response, users] = await Promise.all(
            [await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/accessibility-tags`
		    ),
            await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users&pagination[pageSize]=1000`
            )
        ])


		if (!response.ok && !users.ok) {
            console.log(response.status);
            console.log(users.status);
			throw new Error(`HTTP error! Status: ${response.status}`);
		} else {
            console.log(response);
            console.log(users);
        }

		const data = await response.json();
        const userList = await users.json();
		// Pass the data to the page component via props
		return {
			props: {
				tagsData: data.data || [], // Ensuring there's always an array
                usersList: userList || []
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				tagsData: [],
                usersList: []
			},
		};
	}
}
