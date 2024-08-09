"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileFetch } from "../redux/features/profileSlice";
import Loading from "@/components/ui/loading";

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector((state: any) => state.profile.data);
	const loading = useSelector((state: any) => state.profile.loading);

	useEffect(() => {
		dispatch(profileFetch());
	}, [dispatch]);


	if (loading) {
			return <Loading/>
	}
	return (
			<div>
				<h1>Profile</h1>
				<div>{JSON.stringify(profile)}</div>
			</div>
	);
}
