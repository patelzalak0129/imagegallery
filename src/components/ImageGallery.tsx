
import React, { useState } from 'react';
import { ImageData } from '@/components/ImageCard';
import ImageCard from '@/components/ImageCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageGalleryProps {
  images: ImageData[];
  isLoading: boolean;
  onDeleteImage: (id: string) => Promise<void>;
  uniqueTags: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  isLoading, 
  onDeleteImage,
  uniqueTags
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const clearTagFilter = () => {
    setSelectedTag(null);
  };

  const filteredImages = selectedTag 
    ? images.filter(image => image.tags.includes(selectedTag))
    : images;

  // Loading skeletons
  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex gap-2 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {uniqueTags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Filter by tag:</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <Badge 
                key={tag} 
                variant={selectedTag === tag ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTag === tag 
                    ? "bg-teal-600 hover:bg-teal-700" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
            
            {selectedTag && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearTagFilter}
                className="flex items-center gap-1 h-7"
              >
                <X size={14} /> Clear filter
              </Button>
            )}
          </div>
        </div>
      )}

      {filteredImages.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {images.length === 0 
              ? "No images uploaded yet. Add your first image!" 
              : "No images found matching the selected filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <ImageCard 
              key={image._id} 
              image={image} 
              onDelete={onDeleteImage}
              onTagClick={handleTagClick}
              selectedTag={selectedTag}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
