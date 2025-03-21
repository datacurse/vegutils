'use client';

interface ImageWithCaptionProps {
  src: string;
  description?: string;
  className?: string;
}

export const ImageWithCaption = ({ src, description, className = '' }: ImageWithCaptionProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full border border-border rounded straight-corners:rounded-none overflow-hidden">
        <img
          src={src}
          alt={description}
          className="w-full h-auto max-w-full"
        />
      </div>
      {description && (
        <div className="mt-2 text-center text-sm text-text-muted">
          {description}
        </div>
      )}
    </div>
  );
};

