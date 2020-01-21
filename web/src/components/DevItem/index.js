import React from 'react';
import { MdDeleteForever } from "react-icons/md";

import "./style.css"

function DevItem({dev, handleDelete}) {

	return(
		<li className="dev-item">
			<header>
				<div className="header-info">
					<img src={dev.avatar_url} alt={dev.name} />
					<div className="user-info">
						<strong>{dev.name}</strong>
						<span>
							{dev.techs.map(t => t.charAt(0).toUpperCase() 
                  			+ t.slice(1)).join(", ")}
				 		</span>
					</div>
				</div>
				<button
					type="button"
					className="delete-button"
					onClick={() => handleDelete(dev._id)}
				>
					<MdDeleteForever size={24} color="#ED254E" />
        		</button>
			</header>
			<p>{dev.bio}</p>
			<a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
		</li>
	);
}

export default DevItem;