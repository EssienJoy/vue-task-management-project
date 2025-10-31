export function generateUserId() {
    return Math.floor(1000 + Math.random() * 9000);
}

export async function signUpApi(userData) {
    try {
        const res = await fetch("https://eazy-mart-users-data.onrender.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });


        return true;
    } catch (err) {
        throw new Error(
            err.message === "Failed to fetch"
                ? "❌ Account Could Not be Created"
                : err.message
        );
    }
}
