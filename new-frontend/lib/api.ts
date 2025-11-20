import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth.access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("auth.refresh");
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("auth.access", response.data.access);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (error) {
          localStorage.removeItem("auth.access");
          localStorage.removeItem("auth.refresh");
          window.location.href = "/sign-in";
        }
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  // Backend uses username (which is phone_number) for authentication
  login: async (phoneNumber: string, password: string) => {
    const response = await api.post("/token/", {
      username: phoneNumber,
      password: password,
    });
    return response.data;
  },

  register: async (data: {
    user: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };
    first_name_persian: string;
    last_name_persian: string;
    phone_number: string;
    status: "J" | "S" | "P";
    gender: "M" | "F";
  }) => {
    const response = await api.post("/create-challenger/", data);
    return response.data;
  },

  requestConfirmationCode: async () => {
    const response = await api.get("/confirm-challenger/");
    return response.data;
  },

  confirmAccount: async (code: string) => {
    const response = await api.post("/confirm-challenger/", {
      confirmation_code: code,
    });
    return response.data;
  },

  requestPasswordReset: async (email: string) => {
    const response = await api.post("/password-reset/", { email });
    return response.data;
  },

  resetPassword: async (email: string, token: string, password: string) => {
    const response = await api.put("/password-reset/", {
      email,
      token: token,
      password,
    });
    return response.data;
  },
};

export const challengerAPI = {
  getProfile: async () => {
    const response = await api.get("/view-challenger/");
    return response.data;
  },

  updateProfile: async (data: {
    user: {
      first_name: string;
      last_name: string;
    };
    first_name_persian: string;
    last_name_persian: string;
    status: "J" | "S" | "P";
    gender: "M" | "F";
    bio: string;
    national_code: string;
    university: string;
    shirt_size: "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  }) => {
    const response = await api.put("/update-challenger/", data);
    return response.data;
  },

  uploadCV: async (file: File, phoneNumber: string) => {
    const formData = new FormData();
    formData.append("cv_file", file);
    formData.append("phone_number", phoneNumber);
    const response = await api.put("/cv/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  searchChallenger: async (name: string) => {
    // Encode the name parameter to handle Persian/Farsi characters correctly
    const encodedName = encodeURIComponent(name);
    const response = await api.get(`/search-challenger/?name=${encodedName}`);
    return response.data;
  },
};

export const teamAPI = {
  createTeam: async () => {
    const response = await api.post("/team/");
    return response.data;
  },

  getTeam: async () => {
    const response = await api.get("/team/");
    return response.data;
  },

  updateTeam: async (data: { name: string; description: string }) => {
    const response = await api.put("/team/", data);
    return response.data;
  },

  deleteTeam: async () => {
    const response = await api.delete("/team/");
    return response.data;
  },

  sendInvitation: async (challengerId: number) => {
    const response = await api.post("/invitation/", {
      challenger: challengerId,
    });
    return response.data;
  },

  getInvitations: async () => {
    const response = await api.get("/invitation/");
    return response.data;
  },

  acceptInvitation: async (invitationId: number, status: "A" | "R") => {
    const response = await api.put("/accept-invitation/", {
      id: invitationId,
      status,
    });
    return response.data;
  },
};

export const visitAPI = {
  trackVisit: async (url: string) => {
    const response = await api.post("/visit/", { url });
    return response.data;
  },
};

export const certAPI = {
  getCert: async (userId: string) => {
    const response = await api.get(`/get-cert/?user_id=${userId}`);
    return response.data;
  },
};
