import { calculateAdsorption } from "@/lib/adsorption-mock";

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Api = {
  auth: {
    login: async (credentials) => {
      await delay();
      return { success: true, token: "mock-token", user: { email: credentials.email } };
    },
    register: async (data) => {
      await delay();
      return { success: true, user: { email: data.email } };
    },
  },

  drive: {
    list: async (path = "/") => {
      await delay();
      return { path, items: [] };
    },
    upload: async (file) => {
      await delay();
      return { success: true, fileName: file.name };
    },
  },

  calculations: {
    adsorption: async (modelIds, experimentalData) => {
      await delay();
      return calculateAdsorption(modelIds, experimentalData);
    },
  },
};
