// const API_URL = "http://localhost:3001";
//
//
// // Rasmni yuklash
// export const uploadImage = async (token: string|undefined, imageFile: File): Promise<any> => {
//   const formData = new FormData();
//   formData.append("image", imageFile);
//
//   const response = await fetch(`${API_URL}/image/create`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//
//   if (!response.ok) {
//     console.log("Rasmni yuklashda xatolik yuz berdi.");
//   }
//
//   return response.json(); // Yuklangan rasm ma'lumotlarini qaytaradi
// };
//
// // Rasmni yangilash
// export const updateImage = async (
//   token: string|undefined,
//   imageId: number,
//   newImageFile: File
// ): Promise<any> => {
//   const formData = new FormData();
//   formData.append("image", newImageFile);
//
//   const response = await fetch(`${API_URL}/image/${imageId}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//
//   if (!response.ok) {
//     throw new Error("Rasmni yangilashda xatolik yuz berdi.");
//   }
//
//   return response.json(); // Yangilangan rasm ma'lumotlarini qaytaradi
// };
//
// // Rasmni o'chirish
// export const deleteImage = async (token: string|undefined,imageId: number): Promise<void> => {
//   const response = await fetch(`${API_URL}/image/${imageId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   if (!response.ok) {
//     console.error("Rasmni o'chirishda xatolik yuz berdi.");
//   }
// };



const API_URL = "http://localhost:3001";

// Rasmni yuklash
export const uploadImage = async (token: string | undefined, imageFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/image/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.log("Rasmni yuklashda xatolik yuz berdi.");
  }

  return response.json(); // Yuklangan rasm ma'lumotlarini qaytaradi
};

// Rasmni yangilash
export const updateImage = async (
  token: string | undefined,
  imageId: number,
  newImageFile: File
): Promise<any> => {
  const formData = new FormData();
  formData.append("image", newImageFile);

  const response = await fetch(`${API_URL}/image/${imageId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Rasmni yangilashda xatolik yuz berdi.");
  }

  return response.json(); // Yangilangan rasm ma'lumotlarini qaytaradi
};

// Rasmni o'chirish
export const deleteImage = async (token: string | undefined, imageId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/image/${imageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Rasmni o'chirishda xatolik yuz berdi.");
  }
};

// // Rasm ro'yxatini olish
export const imageGetList = async (token: string | undefined): Promise<any[]> => {
  const response = await fetch(`${API_URL}/image/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Rasm ro'yxatini olishda xatolik yuz berdi.");
  }

  return response.json(); // Rasm ro'yxatini qaytaradi
};

export const getImageDetails = async (token: string | undefined, imageId: number): Promise<any> => {
  const response = await fetch(`${API_URL}/image/${imageId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Rasm ma'lumotlarini olishda xatolik yuz berdi: ${response.statusText}`);
  }

  return response.json(); // Rasm detallari qaytariladi
};
