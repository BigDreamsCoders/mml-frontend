import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { GenreList } from "../../components/GenreList.js";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";

export const FirstTimeGenres = props => {
	const [data, setData] = useState({ genres: [], isFetching: false });
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				setData({ genres: data.genres, isFetching: true });
				const response = await withToken.get("/api/v1/genre/all", {
					headers: {
						Authorization: window.localStorage.getItem(
							Constants.TOKEN,
						),
					},
				});
				console.log(response);
				setData({ genres: response.data, isFetching: false });
			} catch (e) {
				console.log(e);
				setData({ genres: data.genres, isFetching: false });
			}
		};
		fetchGenres();
	}, []);

	return (
		<MainLayout title="Set up">
			<main></main>
			<GenreList list={data.genres} />
		</MainLayout>
	);
};
