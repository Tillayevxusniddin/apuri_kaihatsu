
const API_URL = "http://localhost:3001";

// Rasm yuklash
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
    throw new Error("Rasm yuklashda xatolik yuz berdi.");
  }

  return response.json();
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
    throw new Error("Rasmni o'chirishda xatolik yuz berdi.");
  }
};

// Rasmni aktivatsiya qilish
export const activateImage = async (token: string | undefined, imageId: number): Promise<any> => {
  const response = await fetch(`${API_URL}/image/active/${imageId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Rasmni aktivatsiya qilishda xatolik yuz berdi.");
  }

  return response.json();
};

// Rasm ro'yxatini olish
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

  return response.json();
};

