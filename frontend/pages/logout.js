import { useRouter } from "next/router";
import { tokenService } from "../src/services/auth/tokenService";
import { HttpClient } from "../src/infra/httpClient/HttpClient";

export default function logoutPage() {
  const router = useRouter();

  React.useEffect(async () => {
    try {
      await HttpClient('/api/refresh', {
        method: 'DELETE'
      })
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <div>
      Você será redirecionado em instantes...
    </div>
  )
} 