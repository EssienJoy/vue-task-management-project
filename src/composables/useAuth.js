import { ref, readonly } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import loginApi from '../auth/login';


const isAuthenticated = ref(!!localStorage.getItem("userId"));
const loading = ref(false);
export function useAuth() {
    const router = useRouter();
    const toast = useToast();

    async function login({ email, password }) {
        if (password.length < 4) {
            toast.error("Password must be 4 digit numbers or letters");
            return;
        }


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format.");
            return;
        }

        try {
            loading.value = true;
            const data = await loginApi(email);
            const userData = data[0];

            if (!userData) {
                toast.error("User not found.");
                isAuthenticated.value = false;
                return;
            }

            if (userData.password === password) {
                localStorage.setItem("userId", userData.userId);
                isAuthenticated.value = true;
                router.push("/dashboard");
                toast.success("Welcome Back ✅");
            } else {
                toast.error("Incorrect password.");
                isAuthenticated.value = false;
            }
        } catch (err) {
            toast.error("Login failed. Try again later");
            isAuthenticated.value = false;
        } finally {
            loading.value = false;
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
        loading,
        login,
        logout
    };
}