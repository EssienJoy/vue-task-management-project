export async function signUpApi(userData) {
    try {
        const res = await fetch("http://localhost:3000/users", {
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
