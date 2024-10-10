import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { format } from 'date-fns';


const LandingEventCard = ({ event }) => {
    const eventName = event.attributes.Name || "Event Name";
    const address = event.attributes.Location?.Address || "123 Fake St, L6C 2S9";
    const streetAddress = address.split(",")[0].trim() || "Street not available"; // Extract street address (everything before the first comma)
    const startTime = event.attributes.Dates?.StartTime
        ? format(new Date(`1970-01-01T${event.attributes.Dates.StartTime}`), 'hh:mm a')
        : "9:00 AM";
    const endTime = event.attributes.Dates?.EndTime
        ? format(new Date(`1970-01-01T${event.attributes.Dates.EndTime}`), 'hh:mm a')
        : "5:00 PM";
    const startDate = event.attributes.Dates?.StartDate
        ? format(new Date(event.attributes.Dates.StartDate), 'MMM dd')
        : "Dec 25";
    const description = event.attributes.Description || "Join us for a free wine tasting event.";
    const host = event.attributes.users_permissions_user?.data?.attributes?.username || "Wine Tasterson";
    const hostImage = event.attributes.users_permissions_user?.data?.attributes?.profileImage || "https://imgur.com/JtlrLHW.jpg"; //need a host image component on strapi
    const clickHref = `/events/${event?.attributes?.Slug ? event.attributes.Slug : "undefined"}`;
    const backgroundImageUrl =
    event.attributes.Images?.data?.[0]?.attributes?.formats?.large?.url ||
    event.attributes.Images?.data?.[0]?.attributes?.formats?.medium?.url ||
    event.attributes.Images?.data?.[0]?.attributes?.formats?.small?.url ||
    "default-image-url.jpg";const router = useRouter();

    return (
        <>
            <div className="overall-container">
                <div
                    className="picture-container"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                >
                    <div className="card-title">
                        <div className="cardTop">
                            <div>
                                <h2>{eventName}</h2>
                            </div>
                        </div>
                        <div className="cardBottom">
                            <div className="card-info">
                                <p>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        style={{ marginRight: "6px" }}
                                    />
                                    {streetAddress}
                                </p>
                            </div>
                            <div className="card-info">
                                <p>
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        style={{ marginRight: "6px" }}
                                    />{" "}
                                    {startTime} - {endTime}
                                </p>
                            </div>
                            <div className="card-info">
                                <p>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ marginRight: "6px" }}
                                    />
                                    {startDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="white-container">
                    <div className="left-text-container">
                        <h4
                            className="hide-on-mobile"
                            style={{ fontWeight: "inherit", minWidth: "300px" }}
                        >
                            {description}
                        </h4>
                        <div className="horizontal-container">
                            <img
                                src={hostImage}
                                alt={host}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                }}
                            />
                            <p style={{ fontWeight: "500", fontSize: "0.8em" }}>
                                Hosted by {host}
                            </p>
                        </div>
                        <Link href={clickHref}>
                            <button>Learn more</button>
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .overall-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.1s ease-out;
                    border-radius: 12px;
                    width: 70vw;
                    min-width: 750px;
                }
                .horizontal-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin-top: 24px;
                    marign-bottom: 24px;
                }
                .picture-container {
                    position: relative;
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                    background-color: #f9f8f8;
                    height: 31.25em;
                    width: 50%;
                    min-width: 325px;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    display: flex;
                    flex-direction: column;
                    justify-content: end;
                    align-items: center;
                }
                .white-container {
                    position: relative;
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                    background-color: #f9f8f8;
                    height: 31.25em;
                    width: 50%;
                    min-width: 325px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .left-text-container {
                    width: 25vw;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-size: 1.25em;
                    font-weight: 500;
                }
                .card-title {
                    background-color: var(--color-secondary);
                    height: 90px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    color: white;
                    border-bottom-left-radius: 12px;
                }
                .cardTop {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 12px;
                    margin-right: 24px;
                    margin-left: 24px;
                }
                .cardBottom {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12px;
                }
                .card-info {
                    margin-left: 12px;
                    margin-right: 12px;
                    overflow: visible;
                }
                button {
                    opacity: 1;
                    font-size: 1.25em;
                    border-radius: 12px;
                    padding: 10px 20px;
                    border-outline: none;
                    border: none;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                    background-color: var(--color-secondary);
                    color: white;
                    cursor: pointer;
                    margin-top: 15px;
                    marign-bottom: 15px;
                    min-width: 12.5em;
                    transition: all 0.1s;
                }
                button:hover {
                    background-color: white;
                    color: var(--color-primary);
                    border: 1px solid var(--color-primary);
                }
                .hide-on-mobile {
                    visibility: visible;
                }
                @media only screen and (max-width: 768px) {
                    button {
                        font-size: 1.1em;
                        min-width: 10em;
                    }
                    .card-title {
                        background: #f9f8f8;
                        color: black;
                        border-radius: initial;
                    }
                    .hide-on-mobile {
                        display: none;
                    }
                    .overall-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        transition: all 0.1s ease-out;
                        border-radius: 12px;
                        width: 90vw;
                        min-width: 90vw;
                        height: 32em;
                    }
                    .picture-container {
                        position: relative;
                        border-radius: initial;
                        border-top-right-radius: 12px;
                        border-top-left-radius: 12px;
                        background-color: #f9f8f8;
                        height: 75%;
                        width: 100%;
                        min-width: initial;
                        display: flex;
                        flex-direction: column;
                        justify-content: end;
                        align-items: center;
                    }
                    .white-container {
                        position: relative;
                        border-radius: initial;
                        border-bottom-left-radius: 12px;
                        border-bottom-right-radius: 12px;
                        background-color: #f9f8f8;
                        height: 25%;
                        width: 100%;
                        min-width: initial;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .left-text-container {
                        width: 100%;
                    }
                    .horizontal-container {
                        margin: 0;
                    }
                }
                p {
                    margin: 0;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    margin: 0;
                }

                @media only screen and (max-width: 356px) {
                    .white-container {
                        height: 40%;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: center;
                    }
                    .left-text-container {
                        padding: 10px;
                        margin: 0;
                    }
                    button {
                        min-width: 10em;
                        margin-top: 5px;
                    }
                    .card-title {
                        height: 70px;
                        font-size: 1.2em;
                        z-index: 2;
                    }
                    .card-info {
                        font-size: 0.9em;
                    }
                }
            `}</style>
        </>
    );
};


export default LandingEventCard;


