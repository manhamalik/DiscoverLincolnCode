import React, { useState } from "react";
import PageComponent from "@/components/PageComponent";
import DetailImageCarousel from "@/components/DetailImageCarousel";
import { format, differenceInDays, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faClock,
  faDog,
  faEnvelope,
  faLink,
  faLocationDot,
  faPaperPlane,
  faParking,
  faPhone,
  faWheelchair,
  faUtensils,
  faRestroom,
  faCalendar,
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

// Utility function to format date range
const formatDateRange = (startDate, endDate) => {
  const adjustedStartDate = addDays(new Date(startDate), 1);
  const adjustedEndDate = endDate && startDate !== endDate
    ? addDays(new Date(endDate), 1)
    : null;

  const formattedStartDate = format(adjustedStartDate, 'MMMM dd, Y');
  const formattedEndDate = adjustedEndDate
    ? format(adjustedEndDate, 'MMMM dd, Y')
    : null;

  return formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : formattedStartDate;
};

// Utility function to format time
const formatTime = (time) => {
  return time ? format(new Date(`1970-01-01T${time}`), 'h:mm a') : null;
};

// Utility function to format phone number in (XXX) XXX-XXXX format
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  if (cleaned.length === 10) {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null;
  }
  return phoneNumber; // Returns original input if not exactly 10 digits
};

// Function to generate all dates between the start and end dates
const getDatesBetween = (startDate, endDate) => {
  const start = addDays(new Date(startDate), 1);
  const end = addDays(new Date(endDate), 1);
  const dates = [];

  for (let day = 0; day <= differenceInDays(end, start); day++) {
    const current = addDays(start, day);
    dates.push(format(current, 'MMMM dd, Y'));
  }

  return dates;
};

export async function getServerSideProps({ params }) {
  try {
    const eventRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/events?filters[Slug][$eq]=${params.slug}&populate=*`
    );

    if (!eventRes.ok) {
      throw new Error("Failed to fetch event data");
    }

    const eventData = await eventRes.json();
    const event = eventData.data?.[0] || null;

    return {
      props: {
        event,
      },
    };
  } catch (error) {
    console.error("Error fetching event data:", error);
    return {
      props: {
        event: null,
      },
    };
  }
}

export default function Event({ event }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);

  if (!event) {
    return <p>Event not found</p>;
  }

  const eventName = event?.attributes?.Name || "N/A";
  const ownerName = event?.attributes?.users_permissions_user?.data?.attributes?.username || "Anonymous User";
  const address = event?.attributes?.Location?.Address;
  const description = event?.attributes?.Description;
  const website = event?.attributes?.Website;
  const phoneNumber = event?.attributes?.PhoneNumber;
  const email = event?.attributes?.Email;
  const startDate = event.attributes.Dates?.StartDate;
  const endDate = event.attributes.Dates?.EndDate;
  const startTime = formatTime(event.attributes.Dates?.StartTime);
  const endTime = formatTime(event.attributes.Dates?.EndTime);
  const eventDateRange = formatDateRange(startDate, endDate);
  
  // Compare dates correctly by converting them to strings
  const isSingleDayEvent = new Date(startDate).toDateString() === new Date(endDate).toDateString(); 
  const dateList = !isSingleDayEvent ? getDatesBetween(startDate, endDate) : null;

  const images = event?.attributes?.Images?.data?.map((img) => 
    img.attributes?.formats?.large?.url ||
    img.attributes?.formats?.medium?.url ||
    img.attributes?.formats?.small?.url ||
    img.attributes?.formats?.thumbnail?.url
  ) || [
    "https://fontawesome.com/social/tree?f=classic&s=&v=5",
  ];
  
  const accessibilityTags = event?.attributes?.accessibility_tags?.data || [];

  const getAccessibilityIcon = (tagType) => {
    return accessibilityIcons[tagType] || faWheelchair;
  };

  const toggleSchedule = () => setScheduleOpen(!scheduleOpen);

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
  .additional-info {
    width: 40vw;
  }
  .additional-info p {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
  }
  .additional-info h3 {
    margin: 15px 0px;
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
  .accessibility {
    background-color: #ebebeb;
    padding: 5px 10px;
    border-radius: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    overflow: x-scroll;
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
  .address-and-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .address-and-time p {
    margin: 10px;
  }
  .time-popup {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border-radius: 15px;
    height: auto;
    width: 340px;
    transition: all ease 0.3s;
    background-color: #ebebeb;
    position: absolute;
    top: 220px;
    overflow: hidden;
    drop-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .time-popup p {
    font-weight: 500;
  }
  .time-popup div {
    border-bottom: 1px solid #c4c4c4;
  }
  .filler-bottom {
    width: 100vw;
    height: 15vh;
  }
  h1 {
    text-align: center;
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
        padding: 5px 3px;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size:0.8em;
      }
      .time-popup {
        top: 660px;
      }
    }
`}
</style>
      <PageComponent pageName="Event Details" showClipPath={false} includeBottomMargin={false}>
        <div className="content-container">
          {/* Event images carousel */}
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
            <h1>{eventName}</h1>

            {/* Organizer information */}
            <div className="horizontal-container">
              <img
                src="https://imgur.com/JtlrLHW.jpg"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <p style={{ fontWeight: "500" }}>Organized by {ownerName}</p>
            </div>

            <div className="address-and-time">
            {/* Conditionally display the address only if it exists */}
            {address && (
              <div id="address-container" className="horizontal-container">
                <FontAwesomeIcon icon={faLocationDot} transform="grow-5" style={{ padding: "5px" }}/>
                <p style={{ fontWeight: "500", marginLeft: "6px" }}>{address}</p>
              </div>
            )}

              {/* Conditionally display event date range if startDate exists */}
              {startDate && (
                <div
                id="date-container"
                  className="horizontal-container"
                  onClick={dateList && dateList.length > 0 ? toggleSchedule : undefined}
                  style={{ cursor: dateList && dateList.length > 0 ? "pointer" : "default" }}
                >
                  <FontAwesomeIcon icon={faCalendar} transform="grow-5" style={{ padding: "5px" }} />
                  <p style={{ fontWeight: "500", marginLeft: "6px" }}>
                    {endDate ? eventDateRange : format(new Date(startDate), 'MMMM dd, Y')}
                  </p>
                  {dateList && dateList.length > 0 && (
                    <FontAwesomeIcon icon={scheduleOpen ? faChevronUp : faChevronDown} style={{ marginLeft: "10px" }} />
                  )}
                </div>
              )}

              {/* Dropdown for dates between start and end date */}
              {scheduleOpen && dateList && (
                <div className="time-popup">
                  {dateList.map((date, index) => (
                    <div key={index}>
                      <p>{date}: {startTime} - {endTime}</p>
                    </div>
                  ))}
                </div>
              )}

            {/* Conditionally display time if both startTime and endTime exist */}
              {startTime && endTime && (
                <div className="horizontal-container">
                  <FontAwesomeIcon icon={faClock} transform="grow-2" />
                  <p style={{ fontWeight: "500", marginLeft: "6px" }}>
                    &nbsp;{startTime} - {endTime}
                  </p>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="vertical-container">
              <h3 style={{ marginBottom: "0px" }}>About this Event</h3>
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
                  <h3 style={{ fontWeight: "400", fontStyle: "italic" }}>Organizer Contact</h3>

                  {/* website */}
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

                  {/* phone number */}
                  {phoneNumber && (
                    <div id="phone-container" className="horizontal-container">
                      <FontAwesomeIcon icon={faPhone} />
                      <p>&nbsp;{formatPhoneNumber(phoneNumber)}</p>
                    </div>
                  )}

                  {/* email */}
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
                        <FontAwesomeIcon icon={getAccessibilityIcon(tag.attributes?.type)} style={{ padding: "3px" }} />
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
