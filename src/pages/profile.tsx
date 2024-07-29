"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFetch } from "@/redux/effects/profileFetchEffect";

export async function getServerSideProps(context: any) {
	const { req } = context;

	const token = req.cookies.accessToken;
	if (!token) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	const response = await fetch(`http://localhost:3005/profile`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	const {data} = await response.json();

	return {
		props: {
			data: data,
		},
	};
}

interface ProfileProps {
	data: string;
}

export default function Profile({ data }: ProfileProps): any {
	const dispatch = useDispatch();
	const profile = useSelector((state:any) => state.data);
  
	useEffect(() => {
	dispatch(profileFetch(data));
	}, [dispatch]);

	return <div>{JSON.stringify(profile)}</div>;
}
