
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ImageData {
  _id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

interface ImageCardProps {
  image: ImageData;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  onDelete, 
  onTagClick,
  selectedTag
}) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={image.imageUrl} 
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(image._id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-semibold text-lg line-clamp-1">{image.title}</h3>
        <p className="text-xs text-muted-foreground">
          {new Date(image.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex flex-wrap gap-1">
        {image.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => onTagClick(tag)}
            className={cn(
              "text-xs px-2 py-1 rounded-full cursor-pointer transition-colors",
              selectedTag === tag 
                ? "bg-teal-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            {tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
