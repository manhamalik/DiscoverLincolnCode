import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDoorOpen,
	faTrash,
	faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ConfirmationPopup from "./ConfirmationPopup";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

const AttractionCard = ({
	attraction,
	hasDelete = false,
	isPending = false,
}) => {
	let clickHref = `/attractions/${
		attraction?.attributes?.Slug ? attraction.attributes.Slug : "undefined"
	}`;

	const {jwt, username} = useContext(AuthContext);
	const router = useRouter();
	const [deleteConfirmOpen, setConfirmDeleteOpen] = useState(false);

	async function handleDelete(e) {
		e.preventDefault();
		e.stopPropagation();
		
		if (attraction?.attributes?.users_permissions_user?.data?.attributes?.username !== username) {
			toast.error("This attraction doesn't belong to you!", {position: "bottom-center"});
			setConfirmDeleteOpen(false);
			return;
		} else if (!window.location.href.includes("dashboard")) {
			toast.error("You can only delete things from your dashboard!", {position: "bottom-center"});
			setConfirmDeleteOpen(false);
			return;
		}
		

		const fetchData = 
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
		}

		try {
			const response = await toast.promise(
				fetch( `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/attractions/${attraction.id}`, fetchData)
				.then(async (res) => {
				  if (res.ok === false) {
					let error = await res.json().then((e) => {
					  return e.error.message;
					});
					throw new Error(error);
				  } else {
					return res.json();
				  }
				})
				.then((data) => {
					setTimeout(function(){
						window.location.reload();
					}, 500);
				}),
			  {
				loading: "Deleting...",
				success: "Deleted successfully!",
				error: "Error deleting attraction.",
			  }, 
			  { 
				toastId: "a-delete-toast",
				position: "bottom-center"
			  }
			);
		} catch (error) {
			toast.error(error.message, {position: "bottom-center"});
		}
	}

	return (
		
		<div className="outerContainer">
				<Link
				href={clickHref}
				style={{ textDecoration: "inherit", color: "inherit", width: "100%" }}
			>
				<div className="cardContainer">
					<div className="cardContent">
						{hasDelete && (
							<div className="buttons">
								<div
									className="edit-btn"
									onClick={(e) => {
										e.stopPropagation();
										router.push(
											`/edit/${
												attraction?.attributes?.Slug
													? attraction.attributes.Slug
													: "undefined"
											}`
										);
									}}
								>
									<FontAwesomeIcon icon={faPencil} />
								</div>
								<div
									className="delete-btn"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setConfirmDeleteOpen(true);
									}}
								>
									<FontAwesomeIcon icon={faTrash} />
								</div>
							</div>
						)}
						<div className="cardTop">
							{isPending && <div className="pending">Pending</div>}

							<div className="title-container">
								<h2 className="attractionName" title={attraction.attributes.Name}>
									{attraction.attributes.Name}
								</h2>
								<p>{attraction.attributes.Location.Address}</p>
							</div>
						</div>
						<div className="cardBottom">
							<FontAwesomeIcon icon={faDoorOpen} style={{ color: "#6C727D" }} />
							<span style={{ marginLeft: "6px", color: "forestgreen" }}>Open</span>
							<span style={{ color: "#6C727D" }}>
								&nbsp;until{" "}
								{new Date(`1970-01-01T${attraction.attributes.Dates.EndTime}`).toLocaleString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
							</span>
						</div>
					</div>
				</div>
				{deleteConfirmOpen && (
					<ConfirmationPopup
						onConfirm={handleDelete}
						message="Are you sure you want to delete this?"
						buttonsText={["Delete", "Cancel"]}
						onCancel={() => setConfirmDeleteOpen(false)}
					/>
				)}
			</Link>
			<style jsx>{`
				.cardContainer {
					box-sizing: border-box;
					position: relative;
					border-radius: 12px;
					background-color: #f9f8f8;
					height: 320px;
					width: 100%;
					background-image: url(${attraction.attributes.Images.data[0]
	.attributes.formats.large?.url || 
	attraction.attributes.Images.data[0].attributes.formats.medium?.url || 
	attraction.attributes.Images.data[0].attributes.formats.small?.url || 
	attraction.attributes.Images.data[0].attributes.formats.thumbnail.url});
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
					display: flex;
					flex-direction: column;
					justify-content: end;
					align-items: center;
					padding: 10px;
					transition: all 0.2s ease-out;
					box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
				}
				.cardContainer:hover {
					transform: scale(1.01);
					cursor: pointer;
				}
				.buttons {
					position: absolute;
					top: 16px;
					right: 16px;
					z-index: 2;
					display: flex;
					gap: 8px;
					font-size: 1.5rem;
				}
				.edit-btn {
					background-color: var(--color-tertiary);
					width: 48px;
					height: 48px;
					border-radius: 48px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.delete-btn {
					border: none;
					background-color: #ff3c3c;
					width: 48px;
					height: 48px;
					border-radius: 48px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.edit-btn:hover,
				.delete-btn:hover {
					transform: scale(1.15);
				}
				.cardContent {
					border-radius: 12px;
					background-color: #fefefe;
					height: 125px;
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.cardTop {
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: 12px;
					margin-bottom: 12px;
					margin-right: 15px;
					margin-left: 15px;
				}
				.cardBottom {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 12px;
					margin-bottom: 12px;
					margin-right: 24px;
					margin-left: 15px;
				}
				.icon {
					margin-right: 6px;
					margin-left: 6px;
				}
				.pending {
					position: absolute;
					top: -24px;
					left: -16px;
					background-color: var(--color-primary);
					color: white;
					width: 100px;
					height: 24px;
					text-align: center;
					border-radius: 8px;
				}
				p {
					color: #6c727d;
					margin: 0;
					font-size: 0.75rem;
				}
				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					margin: 0;
					font-size: 1.1rem;
				}
				.attractionName {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 250px; /* Adjust width as per your requirement */
				}

				.outerContainer{
					width: 320px;
				}

				.title-container{
					width: 100%;
				}

				@media screen and (max-width: 425px){
					.outerContainer{
						width: 280px;
						height: 280px;
					}
				}
			`}</style>
		</div>
	);
};

export default AttractionCard;
