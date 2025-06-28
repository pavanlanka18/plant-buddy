import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  // Check camera support on component mount
  useEffect(() => {
    const checkCameraSupport = () => {
      const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      setIsCameraSupported(isSupported);
    };
    
    checkCameraSupport();
  }, []);

  // Cleanup stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const validateImage = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file (JPG, PNG, WEBP, etc.)");
      return false;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return false;
    }

    // Check if file is empty
    if (file.size === 0) {
      toast.error("The selected file is empty");
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name, file.type, file.size);
    
    if (!validateImage(file)) {
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const imageUrl = e.target?.result as string;
        if (!imageUrl) {
          throw new Error("Failed to read image data");
        }
        
        console.log("Image processed successfully, size:", imageUrl.length);
        
        // Create a temporary image to validate the data URL
        const img = new Image();
        img.onload = () => {
          console.log("Image validation successful, dimensions:", img.width, "x", img.height);
          onImageUpload(imageUrl);
          toast.success("Image uploaded successfully!");
          setIsLoading(false);
        };
        img.onerror = () => {
          console.error("Image validation failed");
          toast.error("Invalid image file");
          setIsLoading(false);
        };
        img.src = imageUrl;
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("Failed to process image file");
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      console.error("FileReader error");
      toast.error("Failed to read image file");
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
      // Reset input value so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      console.log("Starting camera...");
      
      // Check if media devices are supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access not supported in this browser");
      }

      console.log("Media devices supported, requesting camera access...");
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Use back camera if available
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Camera access granted, stream tracks:", mediaStream.getTracks().length);
      
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      // Set video source and play
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        console.log("Video started playing");
      }
      
      toast.success("Camera started successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Could not access camera. Please check permissions.";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Camera access denied. Please allow camera permissions and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "No camera found on this device.";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "Camera not supported in this browser.";
        } else if (error.name === 'NotReadableError') {
          errorMessage = "Camera is already in use by another application.";
        }
      }
      
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        toast.error("Failed to capture photo");
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      // Stop camera and upload image
      stopCamera();
      onImageUpload(imageUrl);
      toast.success("Photo captured successfully!");
    } catch (error) {
      console.error("Error capturing photo:", error);
      toast.error("Failed to capture photo");
    }
  };

  if (isCameraOpen) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Take a Photo
            </h2>
            <p className="text-gray-600 text-lg">
              Position the plant leaf in the camera view and capture
            </p>
          </div>

          <div className="relative bg-black rounded-xl overflow-hidden mb-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-80 object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={capturePhoto}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              disabled={isLoading}
            >
              <Camera className="w-5 h-5 mr-2" />
              Capture Photo
            </Button>
            
            <Button
              variant="outline"
              onClick={stopCamera}
              className="border-red-200 text-red-700 hover:bg-red-50 px-6 py-3"
              disabled={isLoading}
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t.uploadTitle}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t.uploadDescription}
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-green-400 bg-green-50'
              : 'border-green-200 hover:border-green-300 hover:bg-green-50/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openFileDialog();
            }
          }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
              ) : (
                <Upload className="w-10 h-10 text-green-600" />
              )}
            </div>
          </div>

          <h3 className="text-xl font-medium text-gray-900 mb-3">
            {t.dropImageHere}
          </h3>
          <p className="text-gray-500 mb-8">
            {t.orClickToBrowse}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openFileDialog}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              disabled={isLoading}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              {t.chooseFile}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              capture="environment"
              aria-label="Upload image file"
            />
            
            {isCameraSupported && (
              <Button
                variant="outline"
                onClick={startCamera}
                className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-3"
                disabled={isLoading}
              >
                <Camera className="w-5 h-5 mr-2" />
                {t.takePhoto}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t.supportedFormats}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
