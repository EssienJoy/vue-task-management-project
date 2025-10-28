import { ref, readonly } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import loginApi from '../auth/login';


const isAuthenticated = ref(false);
export function useAuth() {
    const router = useRouter();
    const toast = useToast();

    async function login({ email, password }) {
        if (password.length < 4) {
            toast.error("Password must be 4 digit numbers or letters");
            return;
        }

        if (email.includes("@") && email.includes(".com")) {
            const data = await loginApi(email);
            const userData = data[0];

            if (!userData) {
                toast.error("User not found.");
                return;
            }

            if (userData?.password === password) {
                isAuthenticated.value = true;
                localStorage.setItem("userId", userData.userId);
                router.push("/dashboard");
                toast.success("Welcome Back ✅");
            } else {
                toast.error("Incorrect password.");
            }
        } else {
            toast.error("❌ Incorrect, email must include @ and .com");
        }
    }

    function logout() {
        isAuthenticated.value = false;
        localStorage.removeItem("userId");
        router.push("/");
        toast.success("Logout Successful");
    }

    return {
        isAuthenticated: readonly(isAuthenticated),
        login,
        logout
    };
}