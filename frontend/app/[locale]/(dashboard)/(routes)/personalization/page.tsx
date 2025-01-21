'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  imageGetList,
  uploadImage,
  deleteImage,
  activateImage
} from "@/app/[locale]/(dashboard)/(routes)/personalization/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, CheckCircle } from "lucide-react";

export default function ImageGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.sessionToken) {
      fetchImages();
    }
  }, [session]);

  const fetchImages = async () => {
    try {
      const imageList = await imageGetList(session?.sessionToken);
      setImages(imageList);
    } catch (error) {
      console.error("Rasmlarni olishda xatolik yuz berdi:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !session?.sessionToken) return;

    try {
      await uploadImage(session.sessionToken, selectedFile);
      fetchImages();
      setSelectedFile(null);
    } catch (error) {
      console.error("Rasm yuklashda xatolik yuz berdi:", error);
    }
  };

  const handleDelete = async (imageId: number) => {
    try {
      await deleteImage(session?.sessionToken, imageId);
      fetchImages();
    } catch (error) {
      console.error("Rasmni o'chirishda xatolik yuz berdi:", error);
    }
  };

  const handleActivate = async (imageId: number) => {
    try {
      await activateImage(session?.sessionToken, imageId);
      fetchImages();
    } catch (error) {
      console.error("Rasmni aktivatsiya qilishda xatolik yuz berdi:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload New Image</h2>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            onChange={(e) =>
              setSelectedFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">All Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => {
           return (
              <Card key={image.id}>
                <img src={image.url} alt={`Image ${image.id}`} className="w-full h-auto"/>
                <CardContent>
                  <h3 className="text-lg font-semibold">Image {image.id}</h3>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    onClick={() => handleActivate(image.id)}
                    disabled={image.isActive !== 0}
                  >
                    <CheckCircle className="mr-2 h-4 w-4"/> {image.isActive === 0 ? "Active" : "Activate"}
                  </Button>
                  <Button onClick={() => handleDelete(image.id)} disabled={image.isActive !== 0}>

                    <Trash2 className="mr-2 h-4 w-4"/> Delete
                  </Button>
                </CardFooter>
              </Card>
          )})}
        </div>
      </div>
    </div>
  );
}

