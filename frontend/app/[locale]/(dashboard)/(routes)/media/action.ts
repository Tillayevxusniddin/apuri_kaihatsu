// // action.ts
// const API_URL = "http://localhost:3001";
//
// // Media yaratish
// export const createMedia = async (
//   token: string | undefined,
//   imageFile: File,
//   videoUrl: string,
//   title: string,
//   description: string
// ): Promise<any> => {
//   const formData = new FormData();
//   formData.append("image", imageFile);
//   formData.append("videoUrl", videoUrl);
//   formData.append("title", title);
//   formData.append("description", description);
//
//   const response = await fetch(`${API_URL}/media/create`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//
//   if (!response.ok) {
//     throw new Error("Mediya yaratishda xatolik yuz berdi.");
//   }
//
//   return response.json();
// };
//
// // Media o'chirish
// export const deleteMedia = async (
//   token: string | undefined,
//   mediaId: number
// ): Promise<void> => {
//   const response = await fetch(`${API_URL}/media/${mediaId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   if (!response.ok) {
//     throw new Error("Mediya o'chirishda xatolik yuz berdi.");
//   }
// };
//
// // Media yangilash
// export const updateMedia = async (
//   token: string | undefined,
//   mediaId: number,
//   imageFile: File | null,
//   videoUrl: string,
//   title: string,
//   description: string
// ): Promise<any> => {
//   const formData = new FormData();
//   if (imageFile) formData.append("image", imageFile);
//   formData.append("videoUrl", videoUrl);
//   formData.append("title", title);
//   formData.append("description", description);
//
//   const response = await fetch(`${API_URL}/media/${mediaId}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//
//   if (!response.ok) {
//     throw new Error("Mediya yangilashda xatolik yuz berdi.");
//   }
//
//   return response.json();
// };
//
// // Media ro'yxatini olish
// export const getMediaList = async (token: string | undefined): Promise<any[]> => {
//   const response = await fetch(`${API_URL}/media/list`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   if (!response.ok) {
//     throw new Error("Mediya ro'yxatini olishda xatolik yuz berdi.");
//   }
//
//   return response.json();
// };
//
// // Media tafsilotlarini olish
// export const getMediaDetail = async (
//   token: string | undefined,
//   mediaId: number
// ): Promise<any> => {
//   const response = await fetch(`${API_URL}/media/${mediaId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   if (!response.ok) {
//     throw new Error("Mediya tafsilotlarini olishda xatolik yuz berdi.");
//   }
//
//   return response.json();
// };


// 2 version

const API_URL = "http://localhost:3001";

// Media yaratish
export const createMedia = async (
  token: string | undefined,
  imageFiles: File[],  // bir nechta fayllar
  videoUrl: string,
  title: string,
  description: string
): Promise<any> => {
  const formData = new FormData();

  imageFiles.forEach(file => formData.append("image", file));  // fayllarni qo'shish
  formData.append("videoUrl", videoUrl);
  formData.append("title", title);
  formData.append("description", description);
  console.log(formData);

  const response = await fetch(`${API_URL}/media/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Mediya yaratishda xatolik yuz berdi.");
  }

  return response.json();
};

// Media o'chirish
export const deleteMedia = async (
  token: string | undefined,
  mediaId: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/media/${mediaId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Mediya o'chirishda xatolik yuz berdi.");
  }
};

// Media yangilash
export const updateMedia = async (
  token: string | undefined,
  mediaId: number,
  imageFiles: File[] | null,  // bir nechta fayllar
  videoUrl: string,
  title: string,
  description: string
): Promise<any> => {
  const formData = new FormData();

  if (imageFiles) {
    imageFiles.forEach(file => formData.append("image", file));  // fayllarni qo'shish
  }

  formData.append("videoUrl", videoUrl);
  formData.append("title", title);
  formData.append("description", description);

  const response = await fetch(`${API_URL}/media/${mediaId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Mediya yangilashda xatolik yuz berdi.");
  }

  return response.json();
};

// Media ro'yxatini olish
export const getMediaList = async (token: string | undefined): Promise<any[]> => {
  const response = await fetch(`${API_URL}/media/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Mediya ro'yxatini olishda xatolik yuz berdi.");
  }

  return response.json();
};

// Media tafsilotlarini olish
export const getMediaDetail = async (
  token: string | undefined,
  mediaId: number
): Promise<any> => {
  const response = await fetch(`${API_URL}/media/${mediaId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Mediya tafsilotlarini olishda xatolik yuz berdi.");
  }

  return response.json();
};

