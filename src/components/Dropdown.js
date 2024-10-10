import React from "react"
import AccessibilityTag from "./AccessibilityTag";

/**
 * 
 * isAccessibility: set it true or false to render the accessibility version or the normal dropdown menu
 *                  Accessibility version uses the accessibility tags
 * 
 * choices: array of stings of your choices that will be mapped to a div, if using accessibility tags, give it the tags from the tag component
 * controlVar: a variable that controls whether the dropdown menu is rendered or not
 * onClick: function that triggers when a option is chosen in the menu
 */


export default function Dropdown({isAccessibility, choices, controlVar, onClick = ()=>{}}){

    return (
        <div className="options-dropdown" id={isAccessibility ? !controlVar ? "options-dropdown-closed" : "access-indi-option" : !controlVar ? "options-dropdown-closed" : null}>
            <style jsx>
                {`
                    .options-dropdown{
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        height: 10em;
                        background-color: white;
                        overflow-y: auto;
                        border: 2px solid black;
                        border-radius: 4px;
					    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
                        z-index: 1;
                        flex-shrink: 0;
                    
                    }

                    #options-dropdown-closed{
                        display: none;
                    }

                    #access-indi-option{
                        width: 100%;
                        overflow-x: auto;
                    }
                    .choice-container{
                        padding: 1em;
                    }

                    .choice-container:hover{
                        background-color: rgba(0,0,0,0.2);
                    }

                    .tag-container{
                        width: max-content;
                        flex-shrink: 0;
                    }           

                `}
            </style>
            {isAccessibility ? 
                choices.map(element => (
                    <div className="tag-container">
                        <AccessibilityTag type={element} onClick={() => onClick(element)}/>
                    </div>
                )) : 

                choices.map((element) => (
                    <div className="choice-container" onClick={() => onClick(element)}>
                        {element}
                    </div>
                ))

            }

        </div>

    )


    if (isAccessibility){
        return (
            <div className="options-dropdown" id={!controlVar ? "options-dropdown-closed" : "access-indi-option"}>
            {tags.map(element => (
                <div className="tag-container">
                    <AccessibilityTag type={element} onClick={onClick}/>
                </div>
            ))}
            </div>
        )
    } else {
        <div className="options-dropdown" id={!controlVar ? "options-dropdown-closed" : null}>
        {choices.map(element => (
            <div className="choice-container" onClick={onClick}>
                {element}
            </div>
        ))}
        </div> 
    }

}