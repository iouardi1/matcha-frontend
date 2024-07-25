"use client";

import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function profile() {
	const router = useRouter();

	async function fetchProfile(token: any) {
		const res = await fetch(` http://localhost:3005/profile`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		// const test = await res.json()

		if (!res.ok) {
			router.push("./auth/login");
		}
	}

	useEffect(() => {
		const token = getCookie("accessToken");
		fetchProfile(token);
	}, []);
	return <div>profile</div>;
}
