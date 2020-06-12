const { useEffect, useState } = React;

const HomePage = () => {
	const [infos, setInfos] = useState([]);

	// On page load, we retrieve all the informations from the API.
	useEffect(() => {
		const fetchDatas = async () => {
			try {
				const res = await axios.get("http://dummy.restapiexample.com/api/v1/employees");
				setInfos(res.data.data);
			}
			catch (error) {
				console.log("Could not retrieve informations from the API.");
			}
		};

		fetchDatas();
	}, []);

	return (
		<div className="layout">
			<header>
				<img className="stackadoc" src="https://res.cloudinary.com/denirtxt8/image/upload/v1591953535/Rectangle_4_2x_gf2zgz.png"/>				
				<h1 className="title">Current employees</h1>
			</header>

			<div className="container">
				{infos.map((elem, index) => {
					if (index % 2 === 0) {
						return (
							<div className="line" key={index}>
								<div className="employee-ctn">
									<div className="left">
										{elem.profile_image !== "" ?
											<img src={elem.profile_image} className="profil-pic"/>
											: <div className="profil-pic"></div>
										}
									</div>
									<div className="right">
										<h1 className="name">{elem.employee_name}</h1>
										<p className="age">{elem.employee_age} years old.</p>
										<p className="salary">{elem.employee_salary.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</p>
									</div>
								</div>

								<div className="employee-ctn">
									<div className="left">
										{infos[index + 1].profile_image !== "" ?
											<img src={infos[index + 1].profile_image} className="profil-pic"/>
											: <div className="profil-pic"></div>
										}
									</div>
									<div className="right">
										<h1 className="name">{infos[index + 1].employee_name}</h1>
										<p className="age">{infos[index + 1].employee_age} years old.</p>
										<p className="salary">{infos[index + 1].employee_salary.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</p>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

ReactDOM.render(
	<HomePage />,
	document.getElementById("root"),
);
