import React, { useState } from "react";
import PageComponent from "@/components/PageComponent";
import DetailImageCarousel from "@/components/DetailImageCarousel";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDog,
  faEnvelope,
  faLink,
  faLocationDot,
  faPaperPlane,
  faParking,
  faPhone,
  faWheelchair,
  faChevronDown,
  faChevronUp,
  faUtensils,
  faRestroom,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

// Map tag types to icons
const accessibilityIcons = {
  parking: faParking,
  serviceAnimal: faDog,
  vegetarian: faUtensils,
  washroom: faRestroom,
  wheelChair: faWheelchair,
  wifi: faWifi,
};

// Utility function to add space between two words and capitalize the first letter
const capitalizeFirstLetter = (string) => {
  if (!string) return "";

  // Add a space before capital letters (except the first one)
  const formattedString = string.replace(/([A-Z])/g, ' $1');

  // Capitalize the first letter
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

// Utility function to format phone number
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Ensure the number is at least 10 digits long
  if (cleaned.length === 10) {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null;
  }

  // If number doesn't have exactly 10 digits, returns original input
  return phoneNumber;
};

export async function getServerSideProps({ params }) {
  try {
    const attractionsRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/attractions?filters[Slug][$eq]=${params.slug}&populate=*`
    );

    if (!attractionsRes.ok) {
      throw new Error("Failed to fetch attraction data");
    }

    const attractionData = await attractionsRes.json();
    const attraction = attractionData.data?.[0] || null;

    return {
      props: {
        attraction,
      },
    };
  } catch (error) {
    console.error("Error fetching attraction data:", error);
    return {
      props: {
        attraction: null,
      },
    };
  }
}

export default function Attraction({ attraction }) {
  const [scheduleOpen, showSchedule] = useState(false);
  
  if (!attraction) {
    return <p>Attraction not found</p>;
  }

  const attractionName = attraction?.attributes?.Name || "Attraction Name";
  const ownerName = attraction?.attributes?.users_permissions_user?.data?.attributes?.username || "Anonymous User";
  const address = attraction?.attributes?.Location?.Address || "N/A";
  const description = attraction?.attributes?.Description || "N/A";
  const website = attraction?.attributes?.Website;
  const phoneNumber = attraction?.attributes?.PhoneNumber;
  const email = attraction?.attributes?.Email;
  const ownerImage =
  attraction?.attributes?.users_permissions_user?.data?.attributes?.profileImage ||
    "https://imgur.com/JtlrLHW.jpg";
  const accessibilityTags = attraction?.attributes?.accessibility_tags?.data || [];
  const startTime = attraction.attributes.Dates?.StartTime 
      ? format(new Date(`1970-01-01T${attraction.attributes.Dates.StartTime}`), 'h:mm a') 
      : "9:00 AM";
  const endTime = attraction.attributes.Dates?.EndTime 
      ? format(new Date(`1970-01-01T${attraction.attributes.Dates.EndTime}`), 'h:mm a') 
      : "5:00 PM";
  const images = attraction?.attributes?.Images?.data?.map((img) => 
    img.attributes?.formats?.large?.url ||
    img.attributes?.formats?.medium?.url ||
    img.attributes?.formats?.small?.url ||
    img.attributes?.formats?.thumbnail?.url
  ) || [
    "https://fontawesome.com/social/tree?f=classic&s=&v=5",
  ];
  const currentDay = new Date().getDay(); // Get current day of the week (0 for Sunday, 1 for Monday, etc.)

  function toggleSchedule() {
    showSchedule(!scheduleOpen);
  }

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Function to get icon based on accessibility tag type
  const getAccessibilityIcon = (tagType) => {
    return accessibilityIcons[tagType] || faWheelchair;
  };

  return (
    <>
    <style jsx>
{`
  .content-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
  }
  .horizontal-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .horizontal-container-space-around {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    width: 100%;
    height: auto;
  }
  .vertical-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .vertical-container-align-start {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .vertical-container-align-end {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .paragraph-font {
    font-weight: 400;
    line-height: 1.8;
    font-size: 0.9em;
    text-align: center;
  }
  .paragraph-text {
    width: 35vw;
  }
  .paragraph-container {
    width: 38vw;
    max-height: 32vh;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .time-popup {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border-radius: 15px;
    height: auto;
    width: 275px;
    transition: all ease 0.3s;
    background-color: #ebebeb;
    position: absolute;
    top: 225px;
    overflow: hidden;
    drop-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .time-popup p {
    font-weight: 500;
  }
  .time-popup div {
    border-bottom: 1px solid #c4c4c4;
  }
  .additional-info {
    width: 40vw;
  }
  .truncate-website {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  .truncate-website a {
    color: inherit;
    text-decoration: none;
  }
  .additional-info p {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
  }
  .additional-info h3 {
    margin: 15px 0px;
  }
  .accessibility {
    background-color: #ebebeb;
    padding: 5px 10px;
    border-radius: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .accessibility p {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 5px;
  }
  .share-button {
    background-color: var(--color-primary);
    padding: 10px 20px;
    border-radius: 15px;
    margin: 10px;
    margin-top: 20px;
    outline: none;
    overflow: hidden;
    border: none;
    height: 40px;
    width: 240px;
  }
  .share-button h3 {
    color: white;
    fontweight: bold;
    margin-left: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .share-button:hover {
    cursor: pointer;
    transition: all 0.3s ease;
    filter: brightness(0.8);
  }
  h1 {
    text-align: center;
  }
  .filler-bottom {
    width: 100vw;
    height: 15vh;
  }
  .address-and-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .address-and-time p {
    margin: 10px;
  }
  @media only screen and (max-width: 768px) {
    .content-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .paragraph-text {
      width: 80vw;
    }
    .paragraph-container {
      width: 80vw;
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow: visible;
      max-height: none;
    }
    .additional-info {
      width: 80vw;
    }
    .address-and-time {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .mobile-only-margin {
      margin-bottom: 100px;
    }
    .filler-bottom {
      height: 36vh;
    }
    .time-popup {
    top: 610px;
  }
}
     @media only screen and (max-width: 378px) {
      #address-container {
        width:70%;
      }
      #date-container {
      width:70%;
      }
      #website-container {
        font-size:0.8em;
      }
      #phone-container {
      font-size:0.8em;
      }
      #email-container {
      font-size:0.8em;
      }
        .truncate-website {
    max-width: 100px;
  }
        .accessibility {
    padding: 5px 7px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size:0.8em;
  }
    .vertical-container-align-start{
    width:50%;
    }
         .time-popup {
    top: 660px;
  }
    }
`}
</style>
      <PageComponent pageName="Attraction Details" showClipPath={false} includeBottomMargin={false}>
        <div className="content-container">
          <DetailImageCarousel imageArray={images} key={"imageCarousel"} />
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* Attraction Name */}
            <h1>{attractionName}</h1>

            {/* Owner information */}
            <div className="horizontal-container">
              <img
                src={ownerImage}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <p style={{ fontWeight: "500" }}>Operated by {ownerName}</p>
            </div>

            {/* Address Section with conditional rendering */}
            {address && (
              <div id="address-container" className="address-and-time">
                <div className="horizontal-container">
                  <FontAwesomeIcon icon={faLocationDot} transform="grow-5" style={{ padding: "5px" }}/>
                  <p style={{ fontWeight: "500", marginLeft: "6px" }}>{address}</p>
                </div>
              </div>
            )}

            {/* Current day and closing time with conditional rendering */}
            {endTime && (
              <div id="date-container" className="horizontal-container" onClick={toggleSchedule} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faClock} transform="grow-2" style={{ padding: "5px" }}/>
                <p style={{ fontWeight: "500", marginLeft: "6px" }}>
                  &nbsp;{weekdays[currentDay]}: Open until {endTime}
                </p>
                <FontAwesomeIcon
                  icon={scheduleOpen ? faChevronUp : faChevronDown}
                  style={{ marginLeft: "10px", transition: "all ease 0.2s" }}
                />
              </div>
            )}

            {/* Dropdown for remaining days and times */}
            {scheduleOpen && (
              <div className="time-popup">
                {weekdays.map((day, index) => (
                  <div key={day}>
                    <p>{day}: {startTime} - {endTime}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Attraction Description */}
            <div className="vertical-container">
              <h3 style={{ marginBottom: "0px" }}>About this Attraction</h3>
              <div className="paragraph-container">
                <p className="paragraph-text paragraph-font">{description}</p>
              </div>
            </div>
            
           {/* Additional Info and Accessibility */}
           <div className="vertical-container additional-info">
              <h3 style={{ marginBottom: "0px" }}>Additional Information</h3>
              <div className="horizontal-container-space-around">
                {/* Contact Information */}
                <div className="vertical-container-align-start">
                  <h3 style={{ fontWeight: "400", fontStyle: "italic" }}>Owner Contact</h3>

                  {/* website field */}
                  {website && (
                    <div id="website-container" className="horizontal-container">
                      <FontAwesomeIcon icon={faLink} />
                      <p className="truncate-website" title={website}>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                          {website}
                        </a>
                      </p>
                    </div>
                  )}

                  {/* phone number field */}
                  {phoneNumber && (
                    <div id="phone-container" className="horizontal-container">
                      <FontAwesomeIcon icon={faPhone} />
                      <p>&nbsp;{formatPhoneNumber(phoneNumber)}</p>
                    </div>
                  )}

                  {/* email field */}
                  {email && (
                    <div id="email-container" className="horizontal-container">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>&nbsp;{email}</p>
                    </div>
                  )}
                </div>

                {/* Accessibility Information */} 
                  <div className="vertical-container-align-end">
                    <h3 style={{ fontWeight: "400", fontStyle: "italic" }}>Accessibility Info</h3>
                    {accessibilityTags.length > 0 ? (
                      accessibilityTags.map((tag, index) => (
                        <div className="horizontal-container accessibility" key={index}>
                          <FontAwesomeIcon icon={getAccessibilityIcon(tag.attributes?.type)} style={{ padding: "3px" }}/>
                          {/* Capitalize and format the tag type */}
                          <p>{capitalizeFirstLetter(tag.attributes?.type)}</p>
                        </div>
                      ))
                    ) : (
                      <p>No accessibility info available</p>
                    )}
                  </div>
              </div>

              {/* Share Button */}
              <button className="share-button horizontal-container mobile-only-margin">
                <FontAwesomeIcon icon={faPaperPlane} color="white" transform="grow-10" />
                <h3>Share</h3>
              </button>
            </div>
          </div>
        </div>
        <div className="filler-bottom"></div>
      </PageComponent>
    </>
  );
}