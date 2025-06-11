'use server';

import { cookies } from "next/headers";

export async function logout() {
    try {
        cookies().delete("user_session");
        return { success: "Logged out successfully" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
}
