import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { format } from 'date-fns';

const LandingAttractionCard = ({ attraction }) => {
    const attractionName = attraction.attributes.Name || "Attraction Name";
    const address = attraction.attributes.Location?.Address || "123 Fake St, L6C 2S9";
    const streetAddress = address ? address.split(",")[0].trim() : "Street not available";
    const postalCode = address ? address.match(/[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d/) : null;
    const startTime = attraction.attributes.Dates?.StartTime
        ? format(new Date(`1970-01-01T${attraction.attributes.Dates.StartTime}`), 'hh:mm a')
        : "9:00 AM";
    const endTime = attraction.attributes.Dates?.EndTime
        ? format(new Date(`1970-01-01T${attraction.attributes.Dates.EndTime}`), 'hh:mm a')
        : "5:00 PM";
    const startDate = attraction.attributes.Dates?.StartDate
        ? format(new Date(attraction.attributes.Dates.StartDate), 'MMM dd')
        : "Dec 25";
    const description = attraction.attributes.Description || "Check out this cool attraction.";
    const host = attraction.attributes.users_permissions_user?.data?.attributes?.username || "Wine Tasterson";
    const hostImage = attraction.attributes.users_permissions_user?.data?.attributes?.profileImage || "https://imgur.com/JtlrLHW.jpg";
    const clickHref = `/attractions/${attraction?.attributes?.Slug ? attraction.attributes.Slug : "undefined"}`;
    const backgroundImageUrl =
    attraction.attributes.Images?.data?.[0]?.attributes?.formats?.large?.url ||
    attraction.attributes.Images?.data?.[0]?.attributes?.formats?.medium?.url ||
    attraction.attributes.Images?.data?.[0]?.attributes?.formats?.small?.url ||
    "default-image-url.jpg";
    const router = useRouter();

    return (
        <>
            <div className="overall-container">
                <div className="white-container">
                    <div className="left-text-container">
                        <h4
                            className="hide-on-mobile"
                            style={{ fontWeight: "inherit", minWidth: "300px" }}
                        >
                            {description}
                        </h4>
                        <Link href={clickHref}>
                            <button>Learn more</button>
                        </Link>
                    </div>
                </div>
                <div
                    className="picture-container"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                >
                    <div className="card-title">
                        <div className="cardTop">
                            <div>
                                <h2>{attractionName}</h2>
                            </div>
                        </div>
                        <div className="cardBottom">
                            <div className="card-info">
                                <p>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        style={{ marginRight: "6px" }}
                                    />
                                    {streetAddress}, {postalCode ? postalCode[0] : ""}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        style={{ marginRight: "6px" }}
                                    />{" "}
                                    {startTime} - {endTime}
                                </p>
                            </div>
                        </div>
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
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
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
                    border-bottom-right-radius: 12px;
                }
                .cardTop {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 12px;
                    margin-bottom: 12px;
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
                }
                .icon {
                    margin-right: 6px;
                    margin-left: 6px;
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
                    cursor: pointer;
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
                        background: white;
                        color: black;
                    }
                    .hide-on-mobile {
                        display: none;
                    }
                    .overall-container {
                        display: flex;
                        flex-direction: column-reverse;
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
                    .card-title {
                        border-radius: initial;
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

            `}</style>
        </>
    );
};


export default LandingAttractionCard;


