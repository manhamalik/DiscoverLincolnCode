import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTree, faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

export default function NavBar({ pageName = "Discover Lincoln" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const router = useRouter();
  const { jwt } = useContext(AuthContext);

  const linkOptions = [
    { "page-name": "About", link: "/about-page" },
    { "page-name": "LincolnGuessr", link: "/lincolnguessr" },
    { "page-name": "Create", link: "/create-post" },
    // Conditionally render the Dashboard link only if the user is logged in
    ...(jwt ? [{ "page-name": "Dashboard", link: "/dashboard" }] : []),
  ];

  const exploreOptions = [
	{ "page-name": "Map", link: "/map" },
    { "page-name": "Events", link: "/events" },
    { "page-name": "Attractions", link: "/attractions" },
    { "page-name": "Businesses", link: "/businesses" },
  ];

  function handleLoginClick() {
    router.push(jwt ? "/logout" : "/login-signup");
  }

  return (
    <>
      <style jsx>{`
        .top {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 9999;
        }

        .NavBar {
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          background-color: var(--color-primary);
          width: 100%;
          height: 4em;
          padding-left: 2em;
          padding-right: 2em;
          color: white;
          align-items: center;
          box-sizing: border-box;
        }

        .NavBar-Element-Container {
          display: flex;
          align-items: center;
        }

        .link {
          margin-left: 0.5em;
          margin-right: 0.5em;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }

        h2 {
          margin-left: 0.5em;
          margin-right: 0.5em;
          white-space: nowrap;
        }

        .bar-icon {
          display: none;
        }

		// mobile version dropdown
        .dropdown-menu {
          background-color: var(--color-primary);
          width: 100%;
          flex-direction: column;
          height: 0;
          opacity: 0;
          visibility: hidden;
          transition: height 1s ease, opacity 1s ease;
        }

        .dropdown-menu.open {
          height: auto;
          opacity: 1;
          visibility: visible;
        }

        .dropdown-p {
          padding: 1em;
          font-size: 1rem;
          margin: 0;
		  color: white;
		  text-decoration: none;
		  padding: 0.5em;
		  display: block;
        }

        .button-container {
          margin-left: 1em;
          margin-right: 1em;
		  width: 7em;
		  height: 2em;
		  position: relative;
        }

		// explore dropdown
		.explore-dropdown {
			display: none;
			position: absolute;
			top: 100%;
			background-color: var(--color-primary);
			border: 1px solid #ddd;
			flex-direction: column;
			border-radius: 10px;
			padding-top: 0.5em;
			padding-bottom: 0.5em;
			width:100%;
		}

		.dropdown-p:hover {
			text-decoration: underline;
			color: white;
		}

		.button-container:hover .explore-dropdown {
			display: flex;
		}

        .tree-icon {
          cursor: pointer;
        }

        .underline {
          text-decoration: underline;
        }

        .hover-deco:hover {
        //   opacity: 0.5;
        //   transition: all 0.2s;
		//   filter: invert(1);
		text-decoration: underline;
        }

        @media screen and (max-width: 1230px) {
          .NavBar {
            padding-left: 1em;
          }
          #links {
            display: none;
          }
          .tree-icon {
            display: none;
          }
          .bar-icon {
            display: inline;
            font-size: 1.5rem;
          }
          .dropdown-menu {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="top">
        <div className="NavBar">
          <div className="NavBar-Element-Container">
            <div className="tree-icon" onClick={() => router.push("/")}>
              <FontAwesomeIcon icon={faTree} size="2x" />
            </div>

            <div className="bar-icon" onClick={() => setDropdownOpen((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <h2 style={{ cursor: "pointer" }}>Discover Lincoln</h2>
            </Link>
          </div>

          <div className="NavBar-Element-Container" id="links">
  <div
    className="button-container"
    style={{ cursor: "pointer", position: "relative" }}
  >
    <Button>
      <span style={{ fontWeight: "500" }}>
        Explore &nbsp;<FontAwesomeIcon icon={faSearch} />
      </span>
    </Button>
    <div className="explore-dropdown">
      {exploreOptions.map((option, i) => (
        <Link href={option.link} style={{textDecoration: "none"}}key={i}>
          <span className="dropdown-p">{option["page-name"]}</span>
        </Link>
      ))}
    </div>
  </div>

            {linkOptions.map((option, i) => (
              <div className="hover-deco" key={i}>
                <Link
                  href={option.link}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginLeft: "1em",
                    marginRight: "1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span className={`${router.pathname === option.link ? "underline" : ""}`}>
                    {option["page-name"]}
                  </span>
                </Link>
              </div>
            ))}

            <div className="button-container">
              <Button type="inverted" onClick={handleLoginClick}>
                {jwt ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        </div>

        <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
          {/* Mobile dropdown */}
          {exploreOptions.map((option, i) => (
            <Link href={option.link} style={{textDecoration: "none"}} key={i}>
              <span className="dropdown-p">{option["page-name"]}</span>
            </Link>
          ))}
          {linkOptions.map((option, i) => (
            <Link href={option.link} style={{textDecoration: "none"}}key={i}>
              <span className="dropdown-p">{option["page-name"]}</span>
            </Link>
          ))}
          <Link
            href={jwt ? "/logout" : "/login-signup"}
            style={{
              textDecoration: "none",
              color: "white",
			  padding: "0.5em",
			  paddingBottom:"0.75em",
              fontSize: "1rem",
              margin: "0",
            }}
          >
            {jwt ? "Logout" : "Login"}
          </Link>
        </div>
      </div>
    </>
  );
}
